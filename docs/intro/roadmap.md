---
sidebar_label: Versioni
---

# Versioni

Questa pagina elenca cosa introduce ogni versione di QRM. Per i cambi di protocollo e di compatibilità vedi il [changelog tecnico](../riferimento/changelog.md).

| Versione | Novità |
| --- | --- |
| 0.1 | Core: Characters, Accounts e Transactions, Currencies, eventi, integrazione con NeoForge e mod di esempio. |
| 0.2 | Jobs, Grades e Permissions. |
| 0.3 | Organizations con Ranks, membri e Account in comune. |
| 0.4 | Fondamenta della GUI: rete, schermata Characters con carta d'identità, asset configurabili da tema. |
| 0.5 | HUD del Character e hub, configurabili; servizio da hub. |
| 0.6 | Client API per i Modules (`qrm-client-api`). |
| 0.7 | Module Bank (`qrm-bank`): Account, ATM, contante fisico, bonifici. Poi causale, avvisi e storico con controparte (0.7.1), banconote (0.7.2), testi dello storico (0.7.3). |
| 0.8 | Menu staff a tessere, poi sostituito; tessera Economy (0.8.1). |
| 0.9 | Tessera Banca con la gestione del denaro. |
| 0.10 | Pannello staff HUD con sezioni, scheda Player e azioni, Permissions staff per account. Il vecchio menu staff è rimosso. |
| 0.11 | Comandi brevi (`/job`, `/duty`, `/money`, `/char`, `/org`, `/perm`), `/duty` a interruttore, completamento con Tab, opzione `commands.shortAliases`. |
| 0.12 | Registro delle azioni staff: ogni azione che cambia qualcosa è registrata (pannello, Banca, comandi) e consultabile da pannello e da `/qrm admin log`. |
| 0.13 | Moderazione dal pannello: mute della chat e dei messaggi privati, avvertimenti con storico, note private dello staff. |
| 0.13.1 | Correzioni: il limite di ritiro giornaliero di Bank non si aggira più con molti movimenti; lo staff delegato non può agire su un operatore. |

Per il significato delle etichette di stato vedi [Versioni e stabilità](stabilita.md).
