---
sidebar_label: Pannello staff
---

# Pannello staff

Questa pagina descrive il pannello staff e le Permissions che ne regolano l'uso. È rivolta ai server owner e allo staff. Disponibile dalla 0.10; sostituisce il vecchio menu `/qrm staff`. Il registro delle azioni è disponibile dalla 0.12.

## Overview

Il pannello staff è un overlay in alto a sinistra che non blocca il gameplay. Organizza le funzioni in sezioni, mostra solo ciò che l'account può fare e ha una scheda per ogni Player online con le azioni dentro. Richiede il client di QRM. Dalla 0.12 ogni azione dello staff che cambia qualcosa viene scritta in un registro persistente, consultabile dal pannello e da comando.

## How it works

La Home mostra il numero di Players online e le sezioni: *Player Management*, *Server Management*, *Moderation*, *Economy*, *Organizations*, *Logs & Transactions*, *Quick Actions*. Una sezione senza voci consentite è visibile ma attenuata e non si può aprire.

Oggi QRM registra nel pannello la lista **Players** con la scheda Player e, dalla 0.12, la voce **Ultime azioni** in *Logs & Transactions*; il Module Bank aggiunge la voce **Banca** in *Economy*. Le altre sezioni sono vuote finché un Module non vi aggiunge voci.

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
| `staff.bank` | La voce Banca (con Bank installato). |
| `staff.logs` | Vedere il registro delle azioni: la voce *Ultime azioni* e l'azione *History* della scheda Player (0.12). |
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
| History | `staff.logs` | Mostra le azioni del [registro](#registro-delle-azioni) in cui il Player è lo staff o il bersaglio (al massimo 60 righe). Dalla 0.12. |

Le azioni con campi (Give item, Kick, Ban) aprono una finestrella: Invio conferma, Esc annulla, il gioco non va in pausa. L'esito appare sopra la barra dell'inventario.

### Registro delle azioni

Dalla 0.12 QRM scrive in un registro persistente (tabella `qrm_staff_log` del database) ogni azione dello staff che **cambia qualcosa**. Ogni voce contiene: istante, staff (UUID e nome al momento dell'azione), azione, bersaglio, dettaglio (al massimo 256 caratteri) ed esito.

| Origine | Azioni registrate |
| --- | --- |
| Pannello | `panel.teleport_to`, `panel.bring`, `panel.freeze`, `panel.heal`, `panel.give_item`, `panel.set_gamemode`, `panel.kick`, `panel.ban`. Il dettaglio è l'argomento (`diamond 16`, `7d \| spam`, `creative`). |
| Schermata Banca | `bank.grant`, `bank.take`, `bank.freeze`, `bank.unfreeze`, `bank.give_atm`. Per dai e togli il dettaglio contiene importo e valuta. |
| Comandi | `cmd.money.grant`, `cmd.money.take`, `cmd.job.set`, `cmd.job.fire`, `cmd.perm.grant`, `cmd.perm.deny`, `cmd.perm.clear`, `cmd.org.create`, `cmd.org.archive`, `cmd.org.rank_set`, `cmd.org.rank_remove`, `cmd.org.member_add`, `cmd.org.member_set_rank`, `cmd.org.member_remove`, `cmd.staff.grant`, `cmd.staff.revoke`, `cmd.bank.freeze`, `cmd.bank.unfreeze`, `cmd.bank.atm_give`, `cmd.log.prune`. Il dettaglio è il testo del comando. |

Non si registrano le letture: View character, View permissions, History, lo stato e l'audit della Banca, `list`, `info`, `balance`, `audit`, `staff list` e `log`. Per le azioni del pannello e della Banca si registrano anche i **tentativi senza il nodo richiesto**, con esito `DENIED`. Bersaglio assente, dati non validi e limite di frequenza non cambiano nulla e non si registrano.

Dalla console lo staff compare come `Server`.

**Consultare il registro**

- Nel pannello, *Logs & Transactions* → *Ultime azioni* mostra le ultime 60 azioni. Ogni riga ha data (`gg/MM HH:mm`, fuso orario del server) e staff sopra, azione con bersaglio e dettaglio sotto. I tentativi negati iniziano con `✗`. Serve `staff.logs`.
- Nella scheda di un Player, *History* mostra solo le azioni che lo riguardano.
- Da comando, solo per gli operatori:

| Comando | Cosa fa |
| --- | --- |
| `/qrm admin log` | Le ultime 20 azioni. |
| `/qrm admin log <player> [n]` | Le azioni in cui il Player è staff o bersaglio; `n` da 1 a 200 (predefinito 20). Il Player deve essere online. |
| `/qrm admin log prune <days>` | Cancella le voci più vecchie di `<days>` giorni e risponde con quante. L'operazione si registra come `cmd.log.prune`. |

Le voci non scadono mai: il database cresce finché non si usa `prune`. Se la scrittura nel registro fallisce, l'azione dello staff riesce comunque e l'errore compare nel log del server.

### Sicurezza

Il server ricontrolla il nodo a **ogni** azione, limita la frequenza a una richiesta ogni 250 ms, verifica che il bersaglio sia online e scrive nel log operatore, azione, bersaglio e argomento. Le azioni che cambiano qualcosa finiscono anche nel [registro delle azioni](#registro-delle-azioni).

## Limitations

- Le azioni funzionano solo su Players online.
- Le sezioni *Player Management*, *Server Management*, *Moderation*, *Organizations* e *Quick Actions* non hanno voci: This functionality is not currently available. *Economy* ha la voce di Bank e *Logs & Transactions* la voce *Ultime azioni*.
- Il registro non filtra per data o per azione nel pannello, mostra al massimo 60 righe per pagina e non registra i tentativi sui comandi senza permesso (il comando non è visibile a chi non lo può usare).
- Il pannello non ha schermate per Jobs, Organizations e Permissions: si usano `/job`, `/org` e `/perm`.
- Serve il client di QRM; i Players senza client non vedono il pannello.

## Related

- [Comandi di Bank](../modules/bank/comandi.md)
- [Permissions](permessi.md)
- [Nodi di Permission (riferimento)](../riferimento/nodi-permesso.md)
- [Staff per sviluppatori](../sviluppatori/servizi/staff.md)
- [Client API](../sviluppatori/client-api.md)
