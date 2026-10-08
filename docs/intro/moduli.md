---
sidebar_label: Framework e Modules
---

# Framework e Modules

Questa pagina spiega le parti di cui è fatto QRM e la differenza tra il framework e un Module. È rivolta a server owner e sviluppatori.

## Overview

QRM ha due tipi di parti:

- il **framework**, che si installa come un solo jar, `qrm`;
- i **Modules**, mod separati che si appoggiano al framework.

## How it works

### Il framework

Il framework contiene Characters, Economy, Jobs, Organizations, Permissions, GUI e pannello staff. Il jar `qrm` include quattro parti del progetto:

| Parte | Cosa è |
| --- | --- |
| `qrm-api` | L'API pubblica: interfacce, eventi e tipi (`dev.qrm.api`). È l'unica dipendenza di compilazione per chi scrive un Module. |
| `qrm-core` | Il Core: l'implementazione dei servizi dell'API, con il database SQLite. È un dettaglio interno: nessun Module deve dipenderne. |
| `qrm-client-api` | L'API lato client: righe HUD, schede dell'hub, frammenti di tema, sezioni e azioni del pannello staff. |
| `qrm-neoforge` | L'integrazione con NeoForge: comandi, configurazione, rete, GUI, HUD e pannello staff. Mette insieme le altre tre parti nel jar. |

`qrm-api`, `qrm-core` e `qrm-client-api` non sono mod separati e non si installano da soli.

### I Modules

Un **Module** è un mod a sé, con un proprio jar, un proprio `modId` e una propria configurazione. Aggiunge funzioni a QRM usando solo `qrm-api` e `qrm-client-api`, come farebbe un mod di terzi. Il framework non dipende da nessun Module, e un server può installarne quanti ne vuole o nessuno.

| Module | Cosa fa |
| --- | --- |
| `qrm-bank` (`qrm_bank`) | Il primo Module ufficiale: Account bancario per Character, ATM, contante fisico e bonifici. Facoltativo. |
| `qrm-example` | Module di esempio per chi sviluppa: registra una Currency, un Job, handler di eventi e un frammento di tema. Non va installato su un server di gioco. |

`qrm-bank` non è quindi una parte del framework: è costruito con gli stessi strumenti che QRM offre a tutti. Per scrivere un Module vedi il [Quickstart](../sviluppatori/quickstart.md).

## Usage

Un server installa `qrm` e, se vuole Bank, anche `qrm_bank` (che richiede `qrm`).

- Il client di `qrm` è facoltativo: abilita HUD, hub e schermate.
- `qrm_bank` registra un blocco e degli item, quindi va installato anche sui client.
- Un client che ha un jar di QRM deve averlo alla stessa versione del server.

## Related

- [Modules ufficiali](../modules/index.md)
- [Requisiti](requisiti.md)
- [Installazione](../server-owner/installazione.md)
- [Quickstart per sviluppatori](../sviluppatori/quickstart.md)
