---
sidebar_label: Bank
---

# Bank

Questa pagina descrive il Module `qrm_bank`: cosa fa e come funziona. È rivolta ai server owner e agli sviluppatori. Disponibile dalla 0.7. Stato: Experimental.

## Overview

`qrm_bank` aggiunge un Account bancario per Character, lo sportello ATM, il contante fisico e i bonifici. Richiede `qrm`.

A differenza di `qrm`, che sui client è facoltativo, Bank registra un blocco e degli item: va installato su server **e client**, alla stessa versione di QRM.

## How it works

- **Account:** ogni Character ha un Account multi-Currency, aperto al primo uso dell'ATM.
- **Contante:** item fisici, uno per taglio e per Currency; il valore sta nella definizione dell'item.
- **Cassa:** un Account dedicato (`BANK_VAULT`) il cui saldo è esattamente il contante in circolazione. Il ritiro lo aumenta, il deposito lo diminuisce. Un deposito oltre il saldo della cassa (contante non emesso dalla banca) viene rifiutato.
- **ATM:** il blocco `qrm_bank:atm` si trova nella creativa, in "Blocchi funzionali", oppure con `/bank atm give`. Il click destro apre una schermata con le schede Conto, Contanti e Bonifico. Il server decide tutto: Character attivo, distanza, Permissions, limiti e frequenza delle richieste.
- **Bonifici:** a "Nome Cognome" (maiuscole indifferenti) o a `@idOrganization`, con una causale facoltativa fino a 64 caratteri. Se più Characters hanno lo stesso nome il bonifico è rifiutato come ambiguo. Il destinatario con quel Character attivo e online riceve un avviso in chat.
- **Storico:** ogni movimento mostra la controparte e la causale.
- **Sessione ATM:** la schermata si chiude da sola se il blocco viene rotto o ci si allontana oltre `atm.maxDistance`.

## Usage

- Per installare e configurare Bank: [Configurazione](configurazione.md).
- Per i comandi e la voce nel pannello staff: [Comandi](comandi.md).
- Per integrarsi dal codice: [API](api.md).

## Limitations

- Il contante non è tracciato per singolo item: un item perso o distrutto lascia denaro nella cassa.
- Il contante duplicato oltre il saldo della cassa non è depositabile, ma può essere speso finché la cassa lo copre. `/bank audit` lo segnala solo per i Players online.
- Il nome mostrato sulle banconote usa i decimali di `cash.json`, non quelli della Currency QRM.
- Accounts multipli o cointestati, interessi, prestiti e cambio Currency: This functionality is not currently available.

## Related

- [Economy](../../server-owner/economia.md)
- [Pannello staff](../../server-owner/pannello-staff.md)
- [Modules ufficiali](../index.md)
