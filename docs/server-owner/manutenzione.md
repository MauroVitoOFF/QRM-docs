---
sidebar_label: Manutenzione
---

# Manutenzione e risoluzione problemi

## Backup

Con il server fermo, copia:

- `<world>/qrm/`: il database `qrm.db` e la cartella `data/` con lavori e valute;
- `config/qrm-common.toml`, `config/qrm_bank-server.toml` e `config/qrm_bank/cash.json`.

Fai una copia prima di ogni aggiornamento di QRM.

## Controllo dei saldi

| Comando | Cosa controlla |
| --- | --- |
| `/qrm admin audit` | Confronta il saldo di ogni conto con la somma delle sue transazioni. Se è tutto coerente risponde che i saldi sono coerenti; altrimenti elenca ogni conto e valuta con saldo atteso e trovato. |
| `/bank audit` | Con la banca: la coerenza del registro e il confronto fra il contante dei giocatori online e il saldo della cassa. Un item duplicato oltre la cassa lo segnala solo per i giocatori online. |

## Problemi frequenti

| Sintomo | Causa probabile |
| --- | --- |
| Il client viene respinto per registro non corrispondente. | `config/qrm_bank/cash.json` diverso fra client e server, oppure versioni diverse di QRM o della banca. Distribuisci lo stesso file e gli stessi jar. |
| La banca non parte e il log indica `cash.json`. | Il file è illeggibile o invalido: controlla le regole nella pagina della banca. |
| Nel log: `cash.json: la valuta X non e' registrata in QRM`. | Manca la valuta in `<world>/qrm/data/currencies/`: il contante di quella valuta non è utilizzabile finché non la aggiungi. |
| Nel log: `cash.json: X ha N decimali ma la valuta QRM ne ha M`. | `decimals` in `cash.json` non coincide con quello della valuta. |
| Nel log: `Invalid job file <file>`. | Il file del lavoro è invalido, per esempio la valuta di `salary` non esiste. Il lavoro viene scartato. |
| Nel log: `Invalid currency file <file>`. | Il file della valuta è invalido e viene scartato. |
| Nel log: `economy.defaultCurrency 'X' is not a registered currency`. | La valuta indicata in `economy.defaultCurrency` non esiste: l'HUD mostra un'altra valuta come principale. |
| Un giocatore dello staff non vede il pannello. | Manca il nodo `staff.panel`. Controlla con `/qrm admin staff list <giocatore>` e concedilo con `/qrm admin staff grant <giocatore> staff.panel`. |
| Un'azione dello staff o dell'ATM non fa nulla e nel log compare `... failed for <uuid>`. | Errore lato server: l'eccezione è nel log subito sotto il messaggio. |
| Un lavoro sparito dai file non dà più permessi. | È voluto: l'assegnazione resta nel database ma vale solo finché il lavoro esiste. |
