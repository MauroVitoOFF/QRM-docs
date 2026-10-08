---
sidebar_label: Framework e moduli
---

# Com'è fatto QRM: framework e moduli

QRM ha due tipi di parti, e conviene non confonderli.

## Il framework

È il cuore: personaggi, economia, lavori, organizzazioni, permessi, GUI e pannello staff. Si installa come **un solo jar**, `qrm`, che contiene quattro parti del progetto:

| Parte | Cosa è |
| --- | --- |
| `qrm-api` | Il contratto pubblico: interfacce, eventi e tipi (`dev.qrm.api`). È l'unica dipendenza di compilazione per chi scrive un mod su QRM. |
| `qrm-core` | L'implementazione dei servizi dell'API, con il database SQLite. È un dettaglio interno: nessun mod deve dipenderne. |
| `qrm-client-api` | Il contratto lato client: righe HUD, schede dell'hub, frammenti di tema, sezioni e azioni del pannello staff. |
| `qrm-neoforge` | L'adattatore verso Minecraft e NeoForge: comandi, configurazione, rete, GUI, HUD e pannello staff. Mette insieme le altre tre parti nel jar. |

`api`, `core` e `client-api` non sono mod separati e non si installano da soli.

## I moduli

Un **modulo** è un mod a sé, con un proprio jar, un proprio `modId` e una propria configurazione, che aggiunge funzioni a QRM usando **solo** `qrm-api` e `qrm-client-api`, esattamente come farebbe un mod di terzi. Il framework non dipende da nessun modulo, e un server può installarne quanti ne vuole o nessuno.

| Modulo | Cosa fa |
| --- | --- |
| `qrm-bank` (`qrm_bank`) | Il primo modulo ufficiale: conto per personaggio, ATM, contante fisico e bonifici. Facoltativo. |
| `qrm-example` | Modulo di esempio per chi sviluppa: mostra come registrare una valuta, un lavoro, un handler di eventi e un frammento di tema. Non va installato su un server di gioco. |

`qrm-bank` non è quindi un pezzo del framework: è un addon, costruito con gli stessi strumenti che QRM offre a tutti. Questo è anche il modo in cui puoi scrivere i tuoi moduli (vedi la sezione Sviluppatori).

## Cosa installare

Un server installa `qrm` e, se vuole la banca, anche `qrm_bank` (che richiede `qrm`). `qrm` sui client è facoltativo (HUD, hub, schermate); `qrm_bank` invece va installato anche sui client. Un client che ha un jar di QRM deve averlo alla stessa versione del server.
