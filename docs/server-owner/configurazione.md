---
sidebar_label: Configurazione
---

# Configurazione

## `config/qrm-common.toml`

Si applica al riavvio.

| Chiave | Predefinito | Cosa fa |
| --- | --- | --- |
| `database.url` | vuoto | URL JDBC. Vuoto = SQLite in `<world>/qrm/qrm.db`. Oggi è incluso solo il driver SQLite. |
| `database.user`, `database.password` | vuoto | Credenziali per un database esterno. |
| `characters.slots` | `3` (1–50) | Slot personaggio per giocatore. |
| `characters.nameMinLength`, `characters.nameMaxLength` | `2`, `24` (1–64) | Lunghezza di nome e cognome. |
| `characters.namePattern` | `^[\p{L}][\p{L}' -]*$` | Espressione regolare valida per nome e cognome. |
| `characters.uniqueNames` | `true` | Rifiuta nomi completi già in uso. |
| `economy.defaultCurrency` | `QRM` | Valuta usata dai comandi quando non specificata e mostrata nell'HUD. |
| `jobs.selfDuty` | `true` | I giocatori entrano/escono di servizio da soli (`/qrm duty`, pulsante dell'hub). Se `false` lo cambiano solo i moduli; il logout mette comunque fuori servizio. |
| `gui.hub.tabs` | `accounts`, `job`, `orgs` | Schede dell'hub, nell'ordine indicato. Elenco vuoto = hub non disponibile. |
| `gui.hud.elements` | `name`, `balance`, `job` | Righe dell'HUD nell'ordine indicato; i moduli aggiungono le proprie (es. `bank:debt`). Elenco vuoto = HUD nascosto. |

## Valute

Un file per valuta in `<world>/qrm/data/currencies/*.json`:

```json
{ "code": "USD", "symbol": "$", "decimals": 2 }
```

Gli importi sono sempre in unità minime: `1250` con 2 decimali vale 12,50.

## Banca

`config/qrm_bank-server.toml` e `config/qrm_bank/cash.json` sono descritti nella pagina della banca.

## Client

`hud.visible` (predefinito `true`) in `config/qrm-client.toml`. L'HUD si attiva e disattiva anche con il tasto **H**.
