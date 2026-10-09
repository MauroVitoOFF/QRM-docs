---
sidebar_label: Nodi di Permission
---

# Nodi di Permission

Questa pagina elenca tutti i nodi che QRM e il Module Bank riconoscono. Sono due sistemi distinti: i nodi **di gioco** si danno ai Characters, i nodi **staff** agli account. Le regole di forma e di risoluzione sono in [Permissions](../sviluppatori/servizi/permessi.md) e [Staff](../sviluppatori/servizi/staff.md).

## Nodi di gioco (per Character)

| Nodo | Definito da | Significato |
| --- | --- | --- |
| `org.account.withdraw` | Core | Prelevare dall'Account di un'Organization. |
| `bank.atm.use` | `qrm_bank` | Usare l'ATM. Consentito a tutti salvo `DENY` esplicito. |
| `bank.transfer` | `qrm_bank` | Fare bonifici dall'ATM. Consentito a tutti salvo `DENY` esplicito. |

I nodi `org.*` sono riservati al Core. Gli altri nodi (`police.arrest`, ...) li definiscono i Jobs, le Organizations e i Modules del server.

## Nodi staff (per account)

Gli operatori (livello *gamemaster*) hanno ogni nodo. Per gli altri si concedono con `/qrm admin staff grant <player> <node>`; si possono usare `*` e pattern sotto `staff.`.

| Nodo | Cosa permette |
| --- | --- |
| `staff.panel` | Aprire il pannello staff. |
| `staff.jobs`, `staff.orgs`, `staff.perms` | Riservati a voci di Jobs, Organizations e Permissions. Oggi nessuna voce di QRM li usa. |
| `staff.bank` | La voce Banca del pannello. |
| `staff.logs` | Il registro delle azioni staff: la voce *Ultime azioni* e l'azione *History* (0.12). |
| `staff.moderation` | Le voci *Mute attivi* e *Ultimi avvertimenti* della sezione *Moderation* (0.13). |
| `staff.module.<id>` | Le voci aggiunte da un Module. |
| `staff.player.teleport_to` | Teleport to. |
| `staff.player.bring` | Bring here. |
| `staff.player.freeze` | Freeze. |
| `staff.player.heal` | Heal. |
| `staff.player.give_item` | Give item. |
| `staff.player.set_gamemode` | Set gamemode. |
| `staff.player.kick` | Kick. |
| `staff.player.ban` | Ban. |
| `staff.player.view_character` | View character. |
| `staff.player.view_permissions` | View permissions. |
| `staff.player.mute` | Mute (0.13). |
| `staff.player.unmute` | Unmute (0.13). |
| `staff.player.warn` | Warn (0.13). |
| `staff.player.note` | Note (0.13). |
| `staff.player.warnings` | Warnings (0.13). |
| `staff.player.notes` | Notes (0.13). |
| `staff.player.*` | Tutte le azioni della scheda Player. |
| `staff.*` | Tutti i nodi staff. |

## Related

- [Permissions (server owner)](../server-owner/permessi.md)
- [Pannello staff](../server-owner/pannello-staff.md)
