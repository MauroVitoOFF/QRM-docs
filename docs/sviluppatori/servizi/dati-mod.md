---
sidebar_label: Dati del mod
---

# Dati del mod

`ModDataService` salva JSON persistente per titolare, in un **namespace** tuo, nello stesso database di QRM. Serve per dati piccoli del tuo modulo legati a un personaggio, un'organizzazione o al sistema, senza gestire un database a parte.

```java
ModDataService data = QRM.get(ModDataService.class);
OwnerRef owner = OwnerRef.character(characterId);

data.put("mymod", owner, "badge", "{\"n\":7}");
Optional<String> badge = data.get("mymod", owner, "badge");
data.delete("mymod", owner, "badge");
```

| Metodo | Cosa fa |
| --- | --- |
| `put(namespace, owner, key, json)` | Salva (o sostituisce) il valore. |
| `get(namespace, owner, key)` | Legge il valore, se c'è. |
| `delete(namespace, owner, key)` | Cancella il valore. |
| `purgeNamespace(namespace)` | Cancella tutto ciò che il namespace ha salvato; restituisce quante voci ha tolto. |

Usa come namespace l'id del tuo mod. Il valore è una stringa JSON: serializzarla e leggerla è compito tuo.
