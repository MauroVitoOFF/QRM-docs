---
sidebar_label: API
---

# API di Locker

Questa pagina descrive come `qrm_locker` si integra con QRM e il formato dei suoi dati. È rivolta agli sviluppatori di Modules. Disponibile dalla 0.15.

:::caution Experimental
API `0.x`: può cambiare tra una minor e l'altra.
:::

## Overview

`qrm_locker` non pubblica eventi né classi da usare: non ha un pacchetto `api`. Due cose interessano a chi sviluppa: il **tipo di punto** `locker`, che altri Modules possono usare per creare punti, e il **formato dei dati**, che un Module o uno strumento può leggere.

Locker è anche un esempio di Module costruito solo sull'API pubblica: compila contro `qrm-api` e `qrm-client-api` e non modifica il Core. Per la guida ai punti vedi [Punti di interazione per sviluppatori](../../sviluppatori/servizi/punti.md).

## How it works

All'avvio il Module registra questo tipo con `PointTypeRegistry`:

| Campo | Valore |
| --- | --- |
| `id` | `locker` |
| `labelKey` | `qrm_locker.point.locker` |
| `owners` | `JOB`, `ORGANIZATION` |
| `requiresDuty` | `false` |

Il handler riceve un `PointUse` solo dopo che il Core ha verificato l'accesso. Mentre l'armadietto è aperto il Module richiama `PointService.canUse` e confronta il Character attivo con `CharacterService.activeOf`, perché `canUse` non verifica che il Character sia quello attivo del Player.

Apre un baule vanilla da tre righe (`MenuType.GENERIC_9x3`) su un container proprio. Non registra menu, blocchi né item, quindi non tocca i registri del gioco.

## API

### Dati

I dati sono salvati con `ModDataService`:

| Elemento | Valore |
| --- | --- |
| namespace | `qrm_locker` |
| titolare | `OwnerRef.character(characterId)` |
| chiave | `locker.job.<id>` oppure `locker.org.<id>` (id del proprietario del punto, in minuscolo) |

Il valore è un documento JSON con `version` a `1`. Lo schema è questo; il contenuto di `item` dipende dal codec di Minecraft e qui è solo indicativo:

```json
{
  "version": 1,
  "slots": [
    { "slot": 0, "item": { "id": "minecraft:diamond_sword", "count": 1 } },
    { "slot": 5, "item": { "id": "minecraft:bread", "count": 12 } }
  ]
}
```

- `slots` contiene solo gli slot occupati (da 0 a 26, senza duplicati). `item` è la serializzazione JSON dell'`ItemStack` con il codec di Minecraft, componenti compresi, quindi nomi, incantesimi e dati di altri mod sopravvivono.
- `unreadable` compare solo se serve: elenca, come `{"slot": n, "item": ...}`, gli oggetti che non si leggono più, e viene riscritto invariato.
- Un documento con `version` diversa da `1` o con slot non validi non viene aperto né sovrascritto da `qrm_locker`.

### Canale di rete

Il canale `qrm_locker` (protocollo `1`) è facoltativo e ha un solo pacchetto, S→C e senza campi: indica al client che la prossima schermata di baule da 27 slot è un armadietto da disegnare con il tema. Il server lo invia solo ai client che hanno il canale.

## Examples

Creare un punto armadietto da un altro Module:

```java
PointService points = QRM.get(PointService.class);
PointResult<InteractionPoint> result = points.create("locker", PointOwner.job("police"),
        new PointPosition("minecraft:overworld", 100, 64, -20), null, "Spogliatoio");
```

Se `qrm_locker` non è installato il tipo non esiste e `create` restituisce l'errore `PointError.UnknownType`. I punti già salvati restano inattivi, senza perdere dati.

## Limitations

- Non c'è un'API per leggere o modificare un armadietto da un altro Module. Il formato dei dati è documentato, ma modificare un documento mentre l'armadietto è aperto non è supportato: il contenuto aperto lo sovrascrive.
- Il formato è `version` `1` e può cambiare tra una minor e l'altra.

## Related

- [Locker](index.md)
- [Punti di interazione per sviluppatori](../../sviluppatori/servizi/punti.md)
- [Dati dei Modules](../../sviluppatori/servizi/dati-mod.md)
