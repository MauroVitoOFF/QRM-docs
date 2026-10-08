---
sidebar_label: Pannello staff
---

# Pannello staff

Questa pagina descrive il pannello staff e le Permissions che ne regolano l'uso. È rivolta ai server owner e allo staff. Disponibile dalla 0.10; sostituisce il vecchio menu `/qrm staff`.

## Overview

Il pannello staff è un overlay in alto a sinistra che non blocca il gameplay. Organizza le funzioni in sezioni, mostra solo ciò che l'account può fare e ha una scheda per ogni Player online con le azioni dentro. Richiede il client di QRM.

## How it works

La Home mostra il numero di Players online e le sezioni: *Player Management*, *Server Management*, *Moderation*, *Economy*, *Organizations*, *Logs & Transactions*, *Quick Actions*. Una sezione senza voci consentite è visibile ma attenuata e non si può aprire.

Oggi QRM registra nel pannello la lista **Players** con la scheda Player; il Module banca aggiunge la voce **Banca** in *Economy*. Le altre sezioni sono vuote finché un Module non vi aggiunge voci.

Le Permissions del pannello sono **per account**, non per Character. Gli operatori (livello *gamemaster*) hanno ogni nodo.

## Usage

### Tasti

| Tasto | Cosa fa |
| --- | --- |
| **F7** | Mostra o nasconde il pannello (`key.qrm.staff`). |
| ↑ / ↓ | Sposta la selezione. |
| → / Invio | Entra nella voce o esegue l'azione. |
| ← / Backspace | Torna indietro; dalla Home chiude il pannello. |
| **Alt sinistro** (tenuto premuto) | Libera il cursore per usare il mouse: clic sulle righe, clic sul titolo per tornare indietro, rotella per scorrere (`key.qrm.staff.cursor`). |

Entrambi i tasti si cambiano in Opzioni → Controlli. Ogni altro tasto, movimento incluso, passa al gioco.

### Assegnare le Permissions

| Comando | Cosa fa |
| --- | --- |
| `/qrm admin staff grant <player> <node>` | Concede un nodo o un pattern all'account. |
| `/qrm admin staff revoke <player> <node>` | Toglie un nodo. |
| `/qrm admin staff list <player>` | Elenca i nodi dell'account. |

Si possono concedere `*` oppure pattern che iniziano con `staff.` (per esempio `staff.*`). L'elenco dei nodi è in [Nodi di Permission](../riferimento/nodi-permesso.md).

| Nodo | Cosa permette |
| --- | --- |
| `staff.panel` | Aprire il pannello. Senza, non si vede nulla. |
| `staff.bank` | La voce Banca (con la banca installata). |
| `staff.module.<id>` | Le voci aggiunte da un Module. |
| `staff.player.<action>` | Una singola azione della scheda Player; `staff.player.*` le concede tutte. |
| `staff.jobs`, `staff.orgs`, `staff.perms` | Riservati a voci di Jobs, Organizations e Permissions. Oggi nessuna voce di QRM li usa. |

### La scheda Player

Aprendo un Player dalla lista si vedono *Online*, *Character*, *Job* e *Organization*, poi le azioni consentite all'account.

| Azione | Nodo | Cosa fa il server |
| --- | --- | --- |
| Teleport to | `staff.player.teleport_to` | Porta lo staff dal Player, anche tra dimensioni. |
| Bring here | `staff.player.bring` | Porta il Player dallo staff. |
| Freeze | `staff.player.freeze` | Blocca il Player dove si trova finché non viene scongelato (interruttore). Si azzera al logout. |
| Heal | `staff.player.heal` | Vita e fame al massimo, spegne il fuoco. |
| Give item | `staff.player.give_item` | Chiede `[namespace:]oggetto [quantità]` (1–2304). Ciò che non entra nell'inventario cade a terra. |
| Set gamemode | `staff.player.set_gamemode` | Sceglie fra `survival`, `creative`, `adventure`, `spectator`. |
| Kick | `staff.player.kick` | Chiede un motivo e disconnette il Player. |
| Ban | `staff.player.ban` | Chiede durata e motivo. Durata `30m`, `12h`, `7d`, `2w`; vuota = permanente; massimo 3650 giorni. Usa la lista ban di Minecraft. |
| View character | `staff.player.view_character` | Mostra nome, nascita, stato, Job e Grade, servizio, Organizations con Rank. |
| View permissions | `staff.player.view_permissions` | Mostra Permissions effettive e override (al massimo 60 righe). |

Le azioni con campi (Give item, Kick, Ban) aprono una finestrella: Invio conferma, Esc annulla, il gioco non va in pausa. L'esito appare sopra la barra dell'inventario.

### Sicurezza

Il server ricontrolla il nodo a **ogni** azione, limita la frequenza a una richiesta ogni 250 ms, verifica che il bersaglio sia online e scrive nel log operatore, azione, bersaglio e argomento.

## Limitations

- Le azioni funzionano solo su Players online.
- Le sezioni *Player Management*, *Server Management*, *Moderation*, *Organizations*, *Logs & Transactions* e *Quick Actions* non hanno voci: This functionality is not currently available. Solo *Economy* ha una voce, quella della banca.
- Il pannello non ha schermate per Jobs, Organizations e Permissions: si usano `/job`, `/org` e `/perm`.
- Serve il client di QRM; i Players senza client non vedono il pannello.

## Related

- [Banca e ATM](banca.md)
- [Permissions](permessi.md)
- [Nodi di Permission (riferimento)](../riferimento/nodi-permesso.md)
- [Staff per sviluppatori](../sviluppatori/servizi/staff.md)
- [Client API](../sviluppatori/client-api.md)
