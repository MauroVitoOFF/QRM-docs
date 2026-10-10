---
sidebar_label: Configurazione
---

# Configurazione

Questa pagina elenca le chiavi di configurazione di QRM. È rivolta ai server owner. La configurazione di Bank è in [Configurazione di Bank](../modules/bank/configurazione.md).

## `config/qrm-common.toml`

Le modifiche si applicano al riavvio.

| Chiave | Predefinito | Cosa fa |
| --- | --- | --- |
| `database.url` | vuoto | URL JDBC. Vuoto = SQLite in `<world>/qrm/qrm.db`. Oggi è incluso solo il driver SQLite. |
| `database.user`, `database.password` | vuoto | Credenziali per un database esterno. |
| `characters.slots` | `3` (1–50) | Slot Character per Player. |
| `characters.nameMinLength`, `characters.nameMaxLength` | `2`, `24` (1–64) | Lunghezza di nome e cognome. |
| `characters.namePattern` | `^[\p{L}][\p{L}' -]*$` | Espressione regolare valida per nome e cognome. |
| `characters.uniqueNames` | `true` | Rifiuta nomi completi già in uso. |
| `economy.defaultCurrency` | `QRM` | Currency usata dai comandi quando non specificata e mostrata nell'HUD. |
| `jobs.selfDuty` | `true` | I Players entrano ed escono di servizio da soli (`/duty`, pulsante dell'hub). Se `false` lo cambiano solo i Modules (e i punti `duty`); il logout mette comunque fuori servizio. |
| `commands.shortAliases` | `true` | Registra le forme brevi `/job`, `/duty`, `/money` (`/balance`, `/bal`, `/pay`), `/char`, `/org` e `/perm`, oltre ai comandi `/qrm`. Disponibile dalla 0.11. Metti `false` se un altro mod usa gli stessi nomi. Si applica al riavvio o con `/reload`. |
| `gui.hub.tabs` | `accounts`, `job`, `orgs` | Schede dell'hub, nell'ordine indicato. Elenco vuoto = hub non disponibile. |
| `gui.hud.elements` | `name`, `balance`, `job` | Righe dell'HUD nell'ordine indicato; i Modules aggiungono le proprie (per esempio `bank:debt`). Elenco vuoto = HUD nascosto. |

Le chiavi `jobs.selfDuty`, `gui.hub.tabs` e `gui.hud.elements` sono disponibili dalla 0.5.

## Currencies

Una Currency si definisce con un file in `<world>/qrm/data/currencies/*.json`. Vedi [Economy](economia.md).

## Client

`hud.visible` (predefinito `true`) in `config/qrm-client.toml`. L'HUD si attiva e disattiva anche con il tasto **H**.

## Limitations

- `database.url` accetta solo l'URL SQLite predefinito: un database esterno non è disponibile.
- Le chiavi di `qrm-common.toml` si applicano al riavvio, tranne `commands.shortAliases` che si applica anche con `/reload`.

## Related

- [Installazione](installazione.md)
- [Bank](../modules/bank/index.md)
- [Jobs](lavori.md)
