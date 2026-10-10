---
sidebar_label: Changelog tecnico
---

# Changelog tecnico

Questa pagina elenca ciò che conta a chi aggiorna o scrive Modules: il protocollo di rete e i cambi che rompono la compatibilità. Per le novità per versione vedi [Versioni](../intro/roadmap.md).

## Protocollo di rete

Un client che ha QRM deve avere la stessa versione del protocollo del server, quindi la stessa versione del mod. Un client senza QRM entra comunque. Il protocollo attuale è **12** per `qrm`, **2** per `qrm_bank` e **1** per `qrm_locker`.

| Versione del mod | Cambio | Protocollo `qrm` |
| --- | --- | --- |
| 0.5 | HUD e hub: il server invia lo stato del Player a ogni cambiamento. | 2 |
| 0.6 | La configurazione dell'interfaccia cambia formato; `gui.hud.elements` accetta righe dei Modules. | 3 |
| 0.8 | Menu staff (poi sostituito). | 4, 5 |
| 0.9 | Tessera Banca nel menu staff. | 6 |
| 0.10 | Pannello staff HUD: accesso staff, canale dati del pannello, azioni sul Player. Job e Organizations nello snapshot dei Players. Il vecchio menu `/qrm staff` viene rimosso. | 7, 8, 9 |
| 0.12 | Registro delle azioni staff: richiesta e pagina del registro, azione *History* sul Player. | 10 |
| 0.13 | Moderazione: azioni Mute, Unmute, Warn, Note, Warnings, Notes; stato di moderazione nello snapshot dei Players; pagine generiche (registro, mute, avvertimenti). | 11 |
| 0.14 | Punti di interazione: il server invia a ogni Player l'elenco dei punti che può vedere. | 12 |

Il protocollo di Bank è alla versione 2 dalla 0.9 (tessera Banca nel menu staff, poi voce del pannello). Il protocollo di Locker è alla versione 1 dalla 0.15; il canale è facoltativo.

## Cambi di compatibilità dell'API

- **0.3:** `JobDefinition` ha un componente in più, `orgId`. Il costruttore a tre argomenti resta, ma i *record deconstruction pattern* a tre componenti non compilano più.
- **0.10:** `StaffAccessService`, `StaffNodes` e i nodi delle Permissions staff entrano in `qrm-api`; `StaffEntries` e `StaffPlayerActions` in `qrm-client-api`. `StaffTiles` e il menu `/qrm staff` vengono rimossi.
- **0.11:** nessun cambio all'API. Si aggiungono le forme brevi dei comandi e l'opzione `commands.shortAliases`.
- **0.12:** `StaffLogService`, `StaffLogEntry` e `StaffNodes.LOGS` entrano in `qrm-api`. Nessun cambio che rompa la compatibilità. Il database passa alla versione di schema 5 (tabella `qrm_staff_log`).
- **0.13:** `ModerationService`, `Mute`, `Warning`, `StaffNote` e `MuteChangedEvent` entrano in `qrm-api`; `StaffNodes.MODERATION`. Nessun cambio che rompa la compatibilità. Il database passa alla versione di schema 6 (tabelle `qrm_mute`, `qrm_warning`, `qrm_staff_note`).
- **0.13.1:** nessun cambio all'API né al protocollo né allo schema. Cambia il comportamento: le azioni del pannello che modificano lo stato rifiutano un bersaglio operatore se chi agisce non lo è, e il limite giornaliero di Bank considera tutte le Transactions delle ultime 24 ore.
- **0.14:** `PointTypeRegistry`, `PointService`, `PointType`, `PointHandler`, `InteractionPoint` e gli eventi `PointCreatedEvent`, `PointChangedEvent`, `PointRemovedEvent` entrano in `qrm-api` (pacchetto `dev.qrm.api.point`). Nessun cambio che rompa la compatibilità: `JobDefinition` e gli altri tipi non cambiano. Il database passa alla versione di schema 8 (tabella `qrm_interaction_point`, con la colonna `face`).
- **0.15:** nessun cambio a `qrm-api`, al protocollo di `qrm` né allo schema del database (la versione dell'API sale solo per restare allineata). Entra il Module `qrm_locker`, che salva i dati in `qrm_mod_data` con il namespace `qrm_locker`.

## Related

- [Versioni](../intro/roadmap.md)
- [Versioni e stabilità](../intro/stabilita.md)
