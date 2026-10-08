---
sidebar_label: Moduli
---

# I moduli di QRM

| Modulo | Cosa è | Chi lo usa |
| --- | --- | --- |
| `qrm-api` | Interfacce, eventi e tipi pubblici (`dev.qrm.api`). L'unica dipendenza di compilazione per i tuoi mod. | Sviluppatori |
| `qrm-core` | Implementazione dei servizi (database SQLite, economia, personaggi, lavori, organizzazioni, permessi). Dettaglio d'implementazione: non dipenderne. | Interno |
| `qrm-client-api` | API lato client per aggiungere righe HUD, schede dell'hub, frammenti di tema, sezioni e azioni del pannello staff. | Sviluppatori |
| `qrm-neoforge` | Il mod `qrm`: comandi, configurazione, GUI, HUD, pannello staff. È il jar che installi. | Server owner |
| `qrm-bank` | Mod separato `qrm_bank`: conto per personaggio, ATM, contante fisico, bonifici. Facoltativo. | Server owner |
| `qrm-example` | Mod di esempio che usa l'API. | Sviluppatori |

Un server installa `qrm` e, se vuole la banca, anche `qrm_bank` (che richiede `qrm`).
