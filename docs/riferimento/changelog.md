---
sidebar_label: Changelog tecnico
---

# Changelog tecnico

Per l'elenco delle novità per versione vedi la [roadmap](../intro/roadmap.md). Qui solo ciò che conta a chi aggiorna o scrive moduli: il protocollo di rete e i cambi che rompono la compatibilità.

## Protocollo di rete

Un client che ha QRM deve avere la stessa versione del protocollo del server, quindi la stessa versione del mod. Un client senza QRM entra comunque. Il protocollo attuale è **9** per `qrm` e **2** per `qrm_bank`.

| Versione del mod | Cambio | Protocollo `qrm` |
| --- | --- | --- |
| 0.5 | HUD e hub: il server invia lo stato del giocatore a ogni cambiamento. | 2 |
| 0.6 | La configurazione dell'interfaccia cambia formato; `gui.hud.elements` accetta righe dei moduli. | 3 |
| 0.8 | Menu staff (poi sostituito). | 6 |
| 0.10 | Pannello staff HUD: accesso staff, canale dati del pannello, azioni sul giocatore. Lavoro e organizzazioni nello snapshot dei giocatori. Il vecchio menu `/qrm staff` viene rimosso. | 7, 8, 9 |

Il protocollo della banca è alla versione 2 dalla 0.9 (tessera Banca nel menu staff, poi voce del pannello).

## Cambi di compatibilità dell'API

- **0.3:** `JobDefinition` ha un componente in più, `orgId`. Il costruttore a tre argomenti resta, ma i *record deconstruction pattern* a tre componenti non compilano più.
- **0.10:** `StaffAccessService`, `StaffNodes` e i nodi dei permessi staff entrano in `qrm-api`; `StaffEntries` e `StaffPlayerActions` in `qrm-client-api`. `StaffTiles` e il menu `/qrm staff` vengono rimossi.
- **0.11:** nessun cambio all'API. Si aggiungono le scorciatoie dei comandi e l'opzione `commands.shortAliases`.

Finché la versione è `0.x` l'API può cambiare tra una minor e l'altra; ogni rimozione passa prima da `@Deprecated` per almeno una minor.
