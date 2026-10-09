---
sidebar_label: Staff
---

# Staff

Questa pagina documenta `StaffAccessService`, `StaffNodes`, `StaffLogService` e `ModerationService`: le Permissions del [pannello staff](../../server-owner/pannello-staff.md), il registro delle azioni staff e la moderazione. È rivolta agli sviluppatori di Modules. Disponibile dalla 0.10; il registro dalla 0.12, la moderazione dalla 0.13.

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
| `MODERATION` | `staff.moderation` (0.13) |
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

## Moderazione

`ModerationService` (0.13) conserva mute, avvertimenti e note dello staff, legati all'UUID del Player. Un Module può leggerli o scriverli; l'**applicazione** del mute (chat e comandi) la fa QRM.

```java
ModerationService moderation = QRM.get(ModerationService.class);
Optional<Mute> mute = moderation.activeMute(player.getUUID());
int warnings = moderation.warningCount(player.getUUID());
```

| Metodo | Cosa fa |
| --- | --- |
| `mute(player, playerName, staffId, staffName, reason, Optional<Duration>)` | Silenzia il Player, sostituendo un mute precedente. Durata vuota = permanente. |
| `unmute(player)` | Toglie il mute; `false` se non era silenziato. |
| `activeMute(player)` | Il mute attivo; un mute scaduto non c'è più. |
| `activeMutes(limit)` | I mute attivi, anche di Players offline. |
| `warn(player, playerName, staffId, staffName, reason)` | Registra un avvertimento e restituisce il numero di avvertimenti del Player. |
| `warningsOf(player, limit)`, `warningCount(player)`, `recentWarnings(limit)` | Lettura degli avvertimenti. |
| `addNote(player, playerName, staffId, staffName, text)` | Aggiunge una nota. |
| `notesOf(player, limit)`, `noteCount(player)` | Lettura delle note. |

Motivo e testo vengono troncati (128 e 200 caratteri) e i limiti sono portati a 1–200.

`mute` e `unmute` pubblicano `MuteChangedEvent(UUID player)`: QRM lo ascolta e aggiorna la cache dei mute dei Players online, quindi il mute vale subito anche se lo scrive un Module. Un mute che scade da solo non pubblica l'evento.

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
