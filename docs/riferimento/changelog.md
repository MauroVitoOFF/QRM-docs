---
sidebar_label: Changelog tecnico
---

# Changelog tecnico

Questa pagina elenca ciò che conta a chi aggiorna o scrive Modules: il protocollo di rete e i cambi che rompono la compatibilità. Per le novità per versione vedi [Versioni](../intro/roadmap.md).

## Protocollo di rete

Un client che ha QRM deve avere la stessa versione del protocollo del server, quindi la stessa versione del mod. Un client senza QRM entra comunque. Il protocollo attuale è **11** per `qrm` e **2** per `qrm_bank`.

| Versione del mod | Cambio | Protocollo `qrm` |
| --- | --- | --- |
| 0.5 | HUD e hub: il server invia lo stato del Player a ogni cambiamento. | 2 |
| 0.6 | La configurazione dell'interfaccia cambia formato; `gui.hud.elements` accetta righe dei Modules. | 3 |
| 0.8 | Menu staff (poi sostituito). | 6 |
| 0.10 | Pannello staff HUD: accesso staff, canale dati del pannello, azioni sul Player. Job e Organizations nello snapshot dei Players. Il vecchio menu `/qrm staff` viene rimosso. | 7, 8, 9 |
| 0.12 | Registro delle azioni staff: richiesta e pagina del registro, azione *History* sul Player. | 10 |
| 0.13 | Moderazione: azioni Mute, Unmute, Warn, Note, Warnings, Notes; stato di moderazione nello snapshot dei Players; pagine generiche (registro, mute, avvertimenti). | 11 |

Il protocollo di Bank è alla versione 2 dalla 0.9 (tessera Banca nel menu staff, poi voce del pannello).

## Cambi di compatibilità dell'API

- **0.3:** `JobDefinition` ha un componente in più, `orgId`. Il costruttore a tre argomenti resta, ma i *record deconstruction pattern* a tre componenti non compilano più.
- **0.10:** `StaffAccessService`, `StaffNodes` e i nodi delle Permissions staff entrano in `qrm-api`; `StaffEntries` e `StaffPlayerActions` in `qrm-client-api`. `StaffTiles` e il menu `/qrm staff` vengono rimossi.
- **0.11:** nessun cambio all'API. Si aggiungono le forme brevi dei comandi e l'opzione `commands.shortAliases`.
- **0.12:** `StaffLogService`, `StaffLogEntry` e `StaffNodes.LOGS` entrano in `qrm-api`. Nessun cambio che rompa la compatibilità. Il database passa alla versione di schema 5 (tabella `qrm_staff_log`).
- **0.13:** `ModerationService`, `Mute`, `Warning`, `StaffNote` e `MuteChangedEvent` entrano in `qrm-api`; `StaffNodes.MODERATION`. Nessun cambio che rompa la compatibilità. Il database passa alla versione di schema 6 (tabelle `qrm_mute`, `qrm_warning`, `qrm_staff_note`).

## Related

- [Versioni](../intro/roadmap.md)
- [Versioni e stabilità](../intro/stabilita.md)
