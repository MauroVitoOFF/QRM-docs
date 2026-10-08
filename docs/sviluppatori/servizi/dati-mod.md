---
sidebar_label: Module data
---

# Module data

Questa pagina documenta `ModDataService`. È rivolta agli sviluppatori di Modules.

:::caution Experimental
API `0.x`: può cambiare tra una minor e l'altra.
:::

## Overview

`ModDataService` salva JSON persistente per titolare, in un **namespace** del tuo Module, nello stesso database di QRM. Serve per dati piccoli legati a un Character, a un'Organization o al sistema, senza gestire un database a parte.

## How it works

Ogni valore è identificato da `(namespace, owner, key)`. Il titolare è un `OwnerRef` (`OwnerRef.character(id)`, `OwnerRef.system()`, o un tipo tuo). Il valore è una stringa JSON: serializzarla e leggerla è compito del Module. Usa come namespace l'id del tuo mod.

## Usage

```java
ModDataService data = QRM.get(ModDataService.class);
OwnerRef owner = OwnerRef.character(characterId);

data.put("mymod", owner, "badge", "{\"n\":7}");
Optional<String> badge = data.get("mymod", owner, "badge");
data.delete("mymod", owner, "badge");
```

## API

| Metodo | Cosa fa |
| --- | --- |
| `put(namespace, owner, key, json)` | Salva (o sostituisce) il valore. |
| `get(namespace, owner, key)` | Legge il valore, se c'è. |
| `delete(namespace, owner, key)` | Cancella il valore. |
| `purgeNamespace(namespace)` | Cancella tutto ciò che il namespace ha salvato; restituisce quante voci ha tolto. |

## Limitations

- QRM non valida né interpreta il JSON.
- L'API legge e scrive un valore per chiave: non ci sono ricerche sul contenuto dei valori.

## Related

- [Registro dei servizi](../registro-servizi.md)
- [Economy](economia.md): `OwnerRef`.
