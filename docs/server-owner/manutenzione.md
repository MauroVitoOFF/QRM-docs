---
sidebar_label: Manutenzione
---

# Manutenzione e risoluzione problemi

Questa pagina descrive i backup, i controlli di coerenza e i problemi più frequenti. È rivolta ai server owner.

## Overview

Tutto ciò che QRM salva sta in `<world>/qrm/` (database e dati) più alcuni file in `config/`. Due comandi controllano la coerenza dei saldi.

## Usage

### Backup

Con il server fermo, copia:

- `<world>/qrm/`: il database `qrm.db` e la cartella `data/` con Jobs e Currencies;
- `config/qrm-common.toml`, `config/qrm_bank-server.toml` e `config/qrm_bank/cash.json`.

Fai una copia prima di ogni aggiornamento di QRM.

### Controllo dei saldi

| Comando | Cosa controlla |
| --- | --- |
| `/qrm admin audit` | Confronta il saldo di ogni Account con la somma delle sue Transactions. Se è tutto coerente risponde che i saldi sono coerenti; altrimenti elenca ogni Account e Currency con saldo atteso e trovato. |
| `/bank audit` | Con Bank: la coerenza del registro e il confronto fra il contante dei Players online e il saldo della cassa. Un item duplicato oltre la cassa lo segnala solo per i Players online. |

### Problemi frequenti

| Sintomo | Causa probabile |
| --- | --- |
| Il client viene respinto per registro non corrispondente. | `config/qrm_bank/cash.json` diverso fra client e server, oppure versioni diverse di QRM o di Bank. Distribuisci lo stesso file e gli stessi jar. |
| Bank non parte e il log indica `cash.json`. | Il file è illeggibile o invalido: controlla le regole in [Configurazione di Bank](../modules/bank/configurazione.md). |
| Nel log: `cash.json: la valuta X non e' registrata in QRM`. | Manca la Currency in `<world>/qrm/data/currencies/`: il contante di quella Currency non è utilizzabile finché non la aggiungi. |
| Nel log: `cash.json: X ha N decimali ma la valuta QRM ne ha M`. | `decimals` in `cash.json` non coincide con quello della Currency. |
| Nel log: `Invalid job file <file>`. | Il file del Job è invalido, per esempio la Currency di `salary` non esiste. Il Job viene scartato. |
| Nel log: `Invalid currency file <file>`. | Il file della Currency è invalido e viene scartato. |
| Nel log: `economy.defaultCurrency 'X' is not a registered currency`. | La Currency indicata in `economy.defaultCurrency` non esiste: l'HUD mostra un'altra Currency come principale. |
| Un membro dello staff non vede il pannello. | Manca il nodo `staff.panel`. Controlla con `/qrm admin staff list <player>` e concedilo con `/qrm admin staff grant <player> staff.panel`. |
| Il database cresce per il registro delle azioni staff. | Le voci non scadono mai. Cancella le più vecchie con `/qrm admin log prune <days>`. |
| Un'azione dello staff o dell'ATM non fa nulla e nel log compare `... failed for <uuid>`. | Errore lato server: l'eccezione è nel log subito sotto il messaggio. |
| Un Job sparito dai file non dà più Permissions. | È voluto: l'assegnazione resta nel database ma vale solo finché il Job esiste. |
| `/job`, `/money` o altri comandi brevi fanno un'altra cosa. | Un altro mod usa gli stessi nomi: imposta `commands.shortAliases = false` e usa i comandi `/qrm …`. |

## Limitations

- Non esiste un comando di backup: la copia dei file è manuale.

## Related

- [Installazione](installazione.md)
- [Configurazione](configurazione.md)
- [Bank](../modules/bank/index.md)
