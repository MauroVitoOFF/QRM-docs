---
sidebar_label: Staff
---

# Staff

Questa pagina documenta `StaffAccessService`, `StaffNodes` e `StaffLogService`: le Permissions del [pannello staff](../../server-owner/pannello-staff.md) e il registro delle azioni staff. È rivolta agli sviluppatori di Modules. Disponibile dalla 0.10; il registro dalla 0.12.

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
| `LOGS` | `staff.logs` (0.12) |
| `MODULE_PREFIX` | `staff.module.` (poi l'id del Module) |
| `PLAYER_PREFIX` | `staff.player.` (poi l'azione) |

`StaffNodes.matches(pattern, node)` e `matchesAny(patterns, node)` confrontano un nodo con i pattern concessi.

## Registro delle azioni

`StaffLogService` (0.12) è il registro persistente delle azioni staff che cambiano qualcosa. Un Module che aggiunge azioni staff proprie le scrive qui, così compaiono in *Ultime azioni* e in *History*.

```java
QRM.get(StaffLogService.class).record(
        Optional.of(staff.getUUID()), staff.getGameProfile().name(),
        "mymod.reset_stats", Optional.of(target.getUUID()),
        Optional.of(target.getGameProfile().name()), "stats azzerate", StaffLogEntry.Outcome.OK);
```

| Metodo | Cosa fa |
| --- | --- |
| `record(staffId, staffName, action, targetId, targetName, detail, outcome)` | Scrive una voce con l'istante corrente. `staffId` vuoto = la console. `detail` oltre 256 caratteri viene troncato. |
| `recent(limit)` | Le voci più recenti per prime; `limit` è limitato a 1–200. |
| `about(UUID player, limit)` | Le voci in cui il Player è lo staff o il bersaglio; stessi limiti. |
| `pruneOlderThan(Instant cutoff)` | Cancella le voci precedenti a `cutoff` e restituisce quante. |

`StaffLogEntry` ha: `id` (progressivo), `at`, `staffId`, `staffName`, `action`, `targetId`, `targetName`, `detail`, `outcome` (`OK` o `DENIED`). `action` è un identificatore libero; QRM usa i prefissi `panel.`, `bank.` e `cmd.`, per i tuoi usa il prefisso del Module.

Una scrittura può lanciare se il database è in errore: **non lasciare che blocchi l'azione dello staff**. Cattura l'eccezione, scrivi l'errore nel log e prosegui, come fanno il pannello e Bank. Non registrare le letture.

## Examples

Controllo lato server per una voce del pannello di un Module:

```java
boolean ok = isOp(player) || QRM.get(StaffAccessService.class).has(player.getUUID(), "staff.module.mymod");
```

`isOp` è il controllo del livello *gamemaster* della tua integrazione con NeoForge. **Ricontrolla il nodo a ogni pacchetto** che il tuo Module riceve dal client: il filtro del client è solo comodità. È ciò che fa `StaffBankServer` per Bank.

## Limitations

- `staff.jobs`, `staff.orgs` e `staff.perms` sono definiti ma oggi nessuna voce di QRM li usa.
- Le Permissions sono per account: non esistono per Character.
- Il registro non ha filtri per data o per azione e non scade da solo: la pulizia è manuale (`/qrm admin log prune <days>`).

## Related

- [Client API](../client-api.md): voci e azioni del pannello.
- [Permissions](permessi.md)
- [Pannello staff per server owner](../../server-owner/pannello-staff.md)
