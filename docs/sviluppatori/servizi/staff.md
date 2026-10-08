---
sidebar_label: Staff
---

# Staff

Questa pagina documenta `StaffAccessService` e `StaffNodes`: le Permissions del [pannello staff](../../server-owner/pannello-staff.md). È rivolta agli sviluppatori di Modules. Disponibile dalla 0.10.

:::caution Experimental
API `0.x`: può cambiare tra una minor e l'altra.
:::

## Overview

Le Permissions del pannello staff sono legate all'**account** (l'UUID del Player), non al Character, e sono indipendenti da `PermissionService`.

```java
StaffAccessService staff = QRM.get(StaffAccessService.class);
boolean allowed = staff.has(player.getUUID(), "staff.module.mymod");
```

## How it works

Un account ha un insieme di pattern concessi (`staff.*`, `staff.player.kick`, `*`). `has` confronta un nodo esatto con quei pattern. Gli operatori (livello *gamemaster* di Minecraft) hanno ogni nodo; questo lo decide l'integrazione con NeoForge, non `StaffAccessService`. Chi scrive il lato server di una voce del pannello deve controllare entrambe le cose.

## API

| Metodo | Cosa fa |
| --- | --- |
| `has(UUID account, node)` | L'account ha il nodo? Il nodo deve essere **esatto**: con un pattern o un nodo malformato lancia `IllegalArgumentException`. |
| `grantsOf(UUID account)` | L'insieme dei pattern concessi all'account. |
| `grant(UUID account, pattern)` | Concede un pattern; `false` se già presente. |
| `revoke(UUID account, pattern)` | Toglie un pattern; `false` se non c'era. |

`grant` accetta solo `*` oppure pattern che iniziano con `staff.`; altrimenti lancia `IllegalArgumentException` (`StaffNodes.isGrantable`).

### `StaffNodes`

| Costante | Valore |
| --- | --- |
| `PANEL` | `staff.panel` |
| `JOBS` | `staff.jobs` |
| `ORGS` | `staff.orgs` |
| `PERMS` | `staff.perms` |
| `BANK` | `staff.bank` |
| `MODULE_PREFIX` | `staff.module.` (poi l'id del Module) |
| `PLAYER_PREFIX` | `staff.player.` (poi l'azione) |

`StaffNodes.matches(pattern, node)` e `matchesAny(patterns, node)` confrontano un nodo con i pattern concessi.

## Examples

Controllo lato server per una voce del pannello di un Module:

```java
boolean ok = isOp(player) || QRM.get(StaffAccessService.class).has(player.getUUID(), "staff.module.mymod");
```

`isOp` è il controllo del livello *gamemaster* della tua integrazione con NeoForge. **Ricontrolla il nodo a ogni pacchetto** che il tuo Module riceve dal client: il filtro del client è solo comodità. È ciò che fa `StaffBankServer` per Bank.

## Limitations

- `staff.jobs`, `staff.orgs` e `staff.perms` sono definiti ma oggi nessuna voce di QRM li usa.
- Le Permissions sono per account: non esistono per Character.

## Related

- [Client API](../client-api.md): voci e azioni del pannello.
- [Permissions](permessi.md)
- [Pannello staff per server owner](../../server-owner/pannello-staff.md)
