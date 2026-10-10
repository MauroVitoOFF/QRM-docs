---
sidebar_label: Punti di interazione
---

# Punti di interazione

Questa pagina documenta `PointTypeRegistry`, `PointService` e gli eventi dei punti (`dev.qrm.api.point`). È rivolta agli sviluppatori di Modules che vogliono offrire una funzionalità in un luogo del mondo. Disponibile dalla 0.14.

:::caution Experimental
API `0.x`: può cambiare tra una minor e l'altra.
:::

## Overview

Un [punto di interazione](../../server-owner/punti-di-interazione.md) è un blocco marcato dallo staff. QRM gestisce posizione, comandi staff, regola di accesso, sincronizzazione con il client e icona. Un Module registra un **tipo di punto** e fornisce solo la logica del click.

QRM registra il proprio tipo `duty` con la stessa API: un Module di terzi non ha bisogno di modificare il Core.

## How it works

1. Il Module registra un `PointType` nel costruttore del mod, con un `PointHandler`.
2. Lo staff crea punti di quel tipo con `/qrm admin point create <tipo> ...`.
3. Al click destro su un punto, QRM verifica che il Character sia autorizzato (vedi la regola nella [pagina per i server owner](../../server-owner/punti-di-interazione.md)) e solo allora chiama `PointHandler.onUse` sul thread del server.

`qrm-api` non dipende da Minecraft: `PointUse` porta l'id del Player e del Character, non un `ServerPlayer`. Il Module ricava il `ServerPlayer` dall'id con le API di NeoForge.

## API

### `PointType`

```java
new PointType(String id, String labelKey, Set<PointOwner.Kind> owners, boolean requiresDuty, PointHandler handler)
```

| Campo | Significato |
| --- | --- |
| `id` | Formato `[a-z][a-z0-9_]{0,31}`, come i Jobs. Lo scrive lo staff nei comandi. |
| `labelKey` | Chiave di traduzione del nome del tipo. |
| `owners` | Proprietari accettati: `JOB`, `ORGANIZATION` o entrambi (almeno uno). |
| `requiresDuty` | Se `true` e il proprietario è un Job, serve essere in servizio. Per le Organizations non si applica. |
| `handler` | `void onUse(PointUse use)`. |

`PointUse` contiene `player` (`PlayerId`), `character` (`CharacterId`) e `point` (`InteractionPoint`).

### `PointTypeRegistry`

`QRM.get(PointTypeRegistry.class)` è disponibile già nel costruttore del mod, come `JobRegistry`.

| Metodo | Cosa fa |
| --- | --- |
| `register(PointType)` | Registra un tipo. La stessa definizione è ammessa; una diversa con lo stesso id lancia `IllegalArgumentException`. |
| `find(String id)` | Il tipo, se registrato. |
| `all()` | Tutti i tipi registrati. |

### `PointService`

Disponibile all'avvio del server, come gli altri servizi. Non controlla chi chiama: l'integrazione con NeoForge impone i permessi staff sui comandi.

| Metodo | Cosa fa |
| --- | --- |
| `create(typeId, owner, position, minGradeId, name)` | Crea un punto con l'icona su tutte le facce. `minGradeId` e `name` possono essere `null`. |
| `create(typeId, owner, position, minGradeId, name, face)` | Come sopra, con la faccia dell'icona (`PointFace`, `null` = tutte e quattro). |
| `find(id)`, `findAt(position)` | Per id o per posizione. |
| `all()`, `ownedBy(owner)` | Ordinati per id. |
| `setMinGrade(id, gradeId)` | Cambia il grado minimo (`null` lo toglie). |
| `setPublicVisible(id, boolean)` | Cambia la visibilità. |
| `setName(id, name)` | Cambia il nome (`null` lo toglie). |
| `setFace(id, face)` | Cambia la faccia dell'icona (`null` = tutte). |
| `move(id, position)` | Sposta il punto; id e dati collegati restano. |
| `remove(id)` | Rimuove il punto; `false` se non esiste. |
| `inactiveReason(point)` | La causa di inattività valutabile dal Core (`UNKNOWN_TYPE`, `UNKNOWN_OWNER`, `UNKNOWN_GRADE`), o vuoto. |
| `canUse(character, point)` | La regola di accesso. Non verifica il mondo né che il Character sia quello attivo del Player. |

Le operazioni di scrittura restituiscono `PointResult<InteractionPoint>`: `Ok` con il punto o `Failed` con un `PointError` (`UnknownType`, `OwnerNotAllowed`, `UnknownOwner`, `UnknownGrade`, `PositionTaken`, `NotFound`). Gli errori attesi non lanciano eccezioni.

I valori sono record: `PointOwner(Kind kind, String id)`, `PointPosition(String dimension, int x, int y, int z)` e `InteractionPoint(id, typeId, owner, position, minGradeId, publicVisible, name, face, createdAt)`.

### Eventi

| Evento | Annullabile | Campi | Quando |
| --- | --- | --- | --- |
| `PointCreatedEvent` | no | `point` | Dopo la creazione. |
| `PointChangedEvent` | no | `before`, `after` | Dopo una modifica o uno spostamento. Non parte se non cambia nulla. |
| `PointRemovedEvent` | no | `point` | Dopo la rimozione. |

## Examples

Un Module che registra un tipo `locker` per Jobs e Organizations, valido solo in servizio per i Jobs:

```java
@Mod("mymod")
public final class MyMod {
    public MyMod() {
        QRM.get(PointTypeRegistry.class).register(new PointType(
                "locker", "mymod.point.locker",
                Set.of(PointOwner.Kind.JOB, PointOwner.Kind.ORGANIZATION), true,
                use -> {
                    ServerPlayer player = ServerLifecycleHooks.getCurrentServer()
                            .getPlayerList().getPlayer(use.player().value());
                    if (player != null) openLocker(player, use.point().owner());
                }));
    }
}
```

Un armadietto condiviso salva i dati con chiave il **proprietario** (`use.point().owner()`), non l'id del punto: più punti dello stesso proprietario aprono lo stesso deposito, e spostare un punto non perde nulla. Per salvare i dati usa `ModDataService`.

## Limitations

- Il click destro è l'unica interazione disponibile. Interazione con entità o NPC, e punti senza blocco, non sono disponibili.
- Un punto il cui tipo non è registrato (per esempio perché il Module è stato rimosso) resta salvato e inattivo; QRM non lo cancella.
- L'icona nel mondo usa `qrm:textures/point/<id del tipo>.png` (32×32), con `default.png` come ripiego. Un Module può fornire la propria texture con un file sotto `assets/qrm/textures/point/`. `labelKey` viaggia fino al client ma oggi non viene mostrata.
- Un handler lento rallenta il thread del server. Se lancia un'eccezione, QRM la registra nel log e blocca comunque il click sul blocco.
- Non esiste un bypass per staff o operatori nella regola di accesso.

## Related

- [Punti di interazione per i server owner](../../server-owner/punti-di-interazione.md)
- [Jobs](lavori.md)
- [Organizations](organizzazioni.md)
- [Dati dei Modules](dati-mod.md)
- [Registro dei servizi](../registro-servizi.md)
