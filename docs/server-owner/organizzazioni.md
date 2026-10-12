---
sidebar_label: Organizations
---

# Organizations

Questa pagina descrive come creare e gestire le Organizations. È rivolta ai server owner. Disponibile dalla 0.3.

## Overview

Un'Organization ha un id, un'etichetta, dei **Ranks** (con livello e Permissions), dei **membri** e un **Account** in comune, multi-Currency. Un Character può stare in più Organizations.

## How it works

- Ogni [Job](lavori.md) ha un'Organization con il proprio id, creata all'avvio se manca (0.19). Le altre Organizations (gang, aziende dei Players) si creano a runtime con `/org create` o con l'API, non da file.
- Si **archiviano** e il loro Account viene congelato; un'Organization archiviata si può riattivare (0.18). Si eliminano solo se archiviate, senza membri e con l'Account a saldo zero (0.17).
- L'Organization di un Job ne segue l'etichetta: cambiala nel file del Job e riavvia. L'id non si cambia (0.19: `/org rename` è stato rimosso).
- I Ranks ereditano i Permissions dei Ranks con `level` inferiore della stessa Organization.
- Il Permission `org.account.withdraw` controlla i prelievi dall'Account dell'Organization.
- Chi ha il [Job](lavori.md) di un'Organization, in servizio, è membro implicito e usa i Permissions del proprio Grade. Non serve un Rank né `/org member add`.

## Usage

| Comando | Chi | Cosa fa |
| --- | --- | --- |
| `/org` (o `/org list`) | Players | Elenca le Organizations del Character attivo. |
| `/org info <org>` | membri e operatori | Mostra i dettagli dell'Organization. |
| `/org create <id> <label>` | operatori | Crea un'Organization. |
| `/org archive <id>` | operatori | Archivia l'Organization e congela l'Account. |
| `/org unarchive <id>` | operatori | Riattiva un'Organization archiviata e scongela l'Account (0.18). |
| `/org delete <id>` | operatori | Elimina un'Organization archiviata, senza membri e con l'Account a saldo zero (0.17). |
| `/org rank set <org> <rank> <level> [nodes…]` | operatori | Crea o modifica un Rank. L'etichetta coincide con l'id. |
| `/org rank remove <org> <rank>` | operatori | Rimuove un Rank. |
| `/org member add <org> <player> <rank>` | operatori | Aggiunge un membro. |
| `/org member setrank <org> <player> <rank>` | operatori | Cambia il Rank di un membro. |
| `/org member remove <org> <player>` | operatori | Rimuove un membro. |

Il Tab propone le Organizations esistenti e i loro Ranks. I sottocomandi per operatori non compaiono agli altri Players. `/qrm org` ha gli stessi sottocomandi di `/org`.

## Limitations

- Le Organizations dei Jobs nascono dai file dei Jobs; le altre non si definiscono da file.
- `/org delete` non è reversibile. Rimuove l'Organization, i suoi Ranks e i suoi punti di interazione; l'Account resta congelato per lo storico delle Transactions ma non è più collegato all'id, che torna libero.
- Se togli un Job dai file, la sua Organization resta com'è: per eliminarla serve archiviarla e poi `/org delete`.
- Se archivi l'Organization di un Job ancora definito, il Job non dà più Permissions dell'Organization finché non la riattivi con `/org unarchive`; all'avvio compare un avviso.
- Con `/org rank set` l'etichetta del Rank coincide con l'id; per un'etichetta leggibile serve l'API.
- Il Core non paga stipendi dall'Account dell'Organization: lo fa un Module.
- Il pannello staff non ha una schermata per le Organizations: si usano i comandi.

## Related

- [Jobs](lavori.md)
- [Permissions](permessi.md)
- [Organizations per sviluppatori](../sviluppatori/servizi/organizzazioni.md)
