---
sidebar_label: Nodi di permesso
---

# Nodi di permesso

Due sistemi distinti: i nodi **di gioco** si danno ai personaggi, i nodi **staff** agli account. Le regole di forma e di risoluzione sono in [Permessi](../sviluppatori/servizi/permessi.md) e [Staff](../sviluppatori/servizi/staff.md).

## Nodi di gioco (per personaggio)

| Nodo | Definito da | Significato |
| --- | --- | --- |
| `org.account.withdraw` | QRM (core) | Prelevare dal conto di un'organizzazione. |
| `bank.atm.use` | `qrm_bank` | Usare l'ATM. Consentito a tutti salvo `DENY` esplicito. |
| `bank.transfer` | `qrm_bank` | Fare bonifici dall'ATM. Consentito a tutti salvo `DENY` esplicito. |

I nodi `org.*` sono riservati al Core. Gli altri nodi (`police.arrest`, ...) li definiscono i lavori, le organizzazioni e i moduli del server.

## Nodi staff (per account)

Gli operatori (livello *gamemaster*) hanno ogni nodo. Per gli altri si concedono con `/qrm admin staff grant <giocatore> <nodo>`; si possono usare `*` e pattern sotto `staff.`.

| Nodo | Cosa permette |
| --- | --- |
| `staff.panel` | Aprire il pannello staff. |
| `staff.jobs`, `staff.orgs`, `staff.perms` | Riservati alle voci di lavori, organizzazioni e permessi. Oggi nessuna voce di QRM li usa. |
| `staff.bank` | La voce Banca del pannello. |
| `staff.module.<id>` | Le voci aggiunte da un modulo. |
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
| `staff.player.*` | Tutte le azioni della scheda giocatore. |
| `staff.*` | Tutti i nodi staff. |
