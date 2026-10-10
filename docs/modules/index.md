---
sidebar_label: Modules
---

# Modules ufficiali

Questa sezione descrive i Modules ufficiali di QRM: mod separati, distribuiti con il progetto, che aggiungono funzioni al framework. È rivolta ai server owner e agli sviluppatori che vogliono integrarsi con un Module.

## Overview

Un Module è un mod a sé, con un proprio jar, un proprio `modId` e una propria configurazione. Usa solo `qrm-api` e `qrm-client-api` e il framework non dipende da nessun Module. Un server installa i Modules che vuole, o nessuno. La differenza tra framework e Module è spiegata in [Framework e Modules](../intro/moduli.md).

| Module | `modId` | Dalla versione | Stato | Cosa fa |
| --- | --- | --- | --- | --- |
| [Bank](bank/index.md) | `qrm_bank` | 0.7 | Experimental | Account bancario per Character, ATM, contante fisico e bonifici. |
| [Locker](locker/index.md) | `qrm_locker` | 0.15 | Experimental | Armadietto personale per Character nei punti di interazione di tipo `locker`. |

I Modules ufficiali sono Bank e Locker. Per chi sviluppa sono anche il riferimento di Modules che dipendono solo da `qrm-api` e `qrm-client-api` ([Build del progetto](../sviluppatori/build.md)); Locker mostra in più come costruire una funzione sui [punti di interazione](../sviluppatori/servizi/punti.md).

## How a Module section is organized

Ogni Module ha una cartella con le stesse pagine, così sai sempre dove cercare:

| Pagina | Contenuto | Per chi |
| --- | --- | --- |
| Overview | Cosa fa, come funziona, limiti. | Tutti |
| Configurazione | File e chiavi di configurazione, Permissions. | Server owner |
| Comandi | Comandi per operatori e integrazione con il pannello staff. | Server owner |
| API | Eventi e punti di integrazione. | Sviluppatori |

Un Module senza comandi o senza API pubblica non ha la pagina corrispondente.

## Usage

- Ogni Module si installa copiando il suo jar in `mods/`. La pagina Overview del Module dice se serve anche sui client.
- Un client che ha un jar di QRM o di un Module deve averlo alla stessa versione del server.
- Per scrivere un Module tuo parti dal [Quickstart](../sviluppatori/quickstart.md).

## Limitations

- Bank richiede il mod anche sui client; Locker no (vedi la pagina di ciascun Module).
- I Modules sono `0.x` come il resto di QRM: comandi, configurazione e API possono cambiare tra una minor e l'altra ([Versioni e stabilità](../intro/stabilita.md)).

## Related

- [Framework e Modules](../intro/moduli.md)
- [Installazione](../server-owner/installazione.md)
- [Quickstart per sviluppatori](../sviluppatori/quickstart.md)
