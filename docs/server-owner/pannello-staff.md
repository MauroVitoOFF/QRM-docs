---
sidebar_label: Pannello staff
---

# Pannello staff

Un pannello sempre in overlay in alto a sinistra, rapido, che non blocca il gameplay. Organizza le funzioni in sezioni, mostra solo ciò che l'account può fare e ha una scheda per ogni giocatore con le azioni dentro.

## Usarlo

| Tasto | Cosa fa |
| --- | --- |
| **F7** | Mostra o nasconde il pannello (`key.qrm.staff`). |
| ↑ / ↓ | Sposta la selezione. |
| → / Invio | Entra nella voce o esegue l'azione. |
| ← / Backspace | Torna indietro; dalla Home chiude il pannello. |
| **Alt sinistro** (tenuto premuto) | Libera il cursore per usare il mouse: clic sulle righe, clic sul titolo per tornare indietro, rotella per scorrere (`key.qrm.staff.cursor`). |

Entrambi i tasti si cambiano in Opzioni → Controlli. Ogni altro tasto, movimento incluso, passa al gioco.

## Sezioni

La Home mostra il numero di giocatori online e le sezioni: *Player Management*, *Server Management*, *Moderation*, *Economy*, *Organizations*, *Logs & Transactions*, *Quick Actions*. Una sezione senza voci consentite è visibile ma attenuata e non si può aprire.

Oggi QRM registra nel pannello la lista **Players** con la scheda giocatore, e la banca aggiunge la voce **Banca** in *Economy*. Le altre sezioni compaiono vuote finché un modulo non vi aggiunge voci. Per lavori, organizzazioni e permessi si usano i comandi `/job`, `/org` e `/perm`.

## Chi può usarlo

I permessi del pannello sono **per account**, non per personaggio. Gli operatori (livello *gamemaster*) hanno ogni nodo. Per tutti gli altri:

| Comando | Cosa fa |
| --- | --- |
| `/qrm admin staff grant <giocatore> <nodo>` | Concede un nodo o un pattern all'account. |
| `/qrm admin staff revoke <giocatore> <nodo>` | Toglie un nodo. |
| `/qrm admin staff list <giocatore>` | Elenca i nodi dell'account. |

Si possono concedere `*` oppure pattern che iniziano con `staff.` (per esempio `staff.*`).

| Nodo | Cosa permette |
| --- | --- |
| `staff.panel` | Aprire il pannello. Senza, non si vede nulla. |
| `staff.bank` | La voce Banca (con la banca installata). |
| `staff.module.<id>` | Le voci aggiunte da un modulo. |
| `staff.player.<azione>` | Una singola azione della scheda giocatore; `staff.player.*` le concede tutte. |
| `staff.jobs`, `staff.orgs`, `staff.perms` | Nodi riservati alle voci di lavori, organizzazioni e permessi. Oggi nessuna voce di QRM li usa. |

## La scheda giocatore

Aprendo un giocatore dalla lista si vedono *Online*, *Character*, *Job* e *Organization*, poi le azioni consentite all'account. Le azioni e il nodo di ciascuna:

| Azione | Nodo | Cosa fa il server |
| --- | --- | --- |
| Teleport to | `staff.player.teleport_to` | Porta lo staff dal giocatore, anche tra dimensioni. |
| Bring here | `staff.player.bring` | Porta il giocatore dallo staff. |
| Freeze | `staff.player.freeze` | Blocca il giocatore dove si trova finché non viene scongelato (interruttore). Si azzera al logout. |
| Heal | `staff.player.heal` | Vita e fame al massimo, spegne il fuoco. |
| Give item | `staff.player.give_item` | Chiede `[namespace:]oggetto [quantità]` (1–2304). Ciò che non entra nell'inventario cade a terra. |
| Set gamemode | `staff.player.set_gamemode` | Sceglie fra `survival`, `creative`, `adventure`, `spectator`. |
| Kick | `staff.player.kick` | Chiede un motivo e disconnette il giocatore. |
| Ban | `staff.player.ban` | Chiede durata e motivo. Durata `30m`, `12h`, `7d`, `2w`; vuota = permanente; massimo 3650 giorni. Usa la lista ban di Minecraft. |
| View character | `staff.player.view_character` | Mostra nome, nascita, stato, lavoro e grado, servizio, organizzazioni con rango. |
| View permissions | `staff.player.view_permissions` | Mostra permessi effettivi e override (al massimo 60 righe). |

Le azioni con campi (Give item, Kick, Ban) aprono una finestrella con Invio per confermare ed Esc per annullare; il gioco non va in pausa. L'esito appare sopra la barra dell'inventario.

## Sicurezza

Il server ricontrolla il nodo a **ogni** azione, limita la frequenza a una richiesta ogni 250 ms, verifica che il bersaglio sia online e scrive nel log operatore, azione, bersaglio e argomento.
