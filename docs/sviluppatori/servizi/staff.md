---
sidebar_label: Staff
---

# Staff

I permessi del [pannello staff](../../server-owner/pannello-staff.md) sono legati all'**account** (l'UUID del giocatore), non al personaggio, e sono indipendenti da `PermissionService`. Li gestisce `StaffAccessService`.

```java
StaffAccessService staff = QRM.get(StaffAccessService.class);
boolean allowed = staff.has(player.getUUID(), "staff.module.mymod");
```

## Il servizio

| Metodo | Cosa fa |
| --- | --- |
| `has(UUID account, node)` | L'account ha il nodo? Tiene conto dei pattern concessi (`staff.*`, `*`). Il nodo deve essere **esatto**: con un pattern o un nodo malformato lancia `IllegalArgumentException`. |
| `grantsOf(UUID account)` | L'insieme dei pattern concessi all'account. |
| `grant(UUID account, pattern)` | Concede un pattern; `false` se già presente. |
| `revoke(UUID account, pattern)` | Toglie un pattern; `false` se non c'era. |

`grant` accetta solo `*` oppure pattern che iniziano con `staff.`; altrimenti lancia `IllegalArgumentException` (`StaffNodes.isGrantable`).

## I nodi: `StaffNodes`

| Costante | Valore |
| --- | --- |
| `PANEL` | `staff.panel` |
| `JOBS` | `staff.jobs` |
| `ORGS` | `staff.orgs` |
| `PERMS` | `staff.perms` |
| `BANK` | `staff.bank` |
| `MODULE_PREFIX` | `staff.module.` (poi l'id del modulo) |
| `PLAYER_PREFIX` | `staff.player.` (poi l'azione) |

`StaffNodes.matches(pattern, node)` e `matchesAny(patterns, node)` confrontano un nodo con i pattern concessi.

## Gli operatori

Chi ha il livello *gamemaster* di Minecraft ha ogni nodo. Questo lo decide l'adattatore NeoForge, non `StaffAccessService`: se scrivi il lato server di una voce del pannello, controlla entrambe le cose.

```java
boolean ok = isOp(player) || QRM.get(StaffAccessService.class).has(player.getUUID(), "staff.module.mymod");
```

**Ricontrolla il nodo a ogni pacchetto** che il tuo modulo riceve dal client: il filtro del client è solo comodità. È ciò che fa `StaffBankServer` per la banca. Per aggiungere voci e azioni al pannello vedi la [Client API](../client-api.md).
