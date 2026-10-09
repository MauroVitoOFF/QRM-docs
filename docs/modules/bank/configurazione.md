---
sidebar_label: Configurazione
---

# Configurazione di Bank

Questa pagina descrive l'installazione e la configurazione del Module `qrm_bank`: i tagli del contante, le chiavi di `qrm_bank-server.toml` e le Permissions. È rivolta ai server owner.

## Overview

Bank ha due file di configurazione:

| File | Cosa contiene | Quando si applica |
| --- | --- | --- |
| `config/qrm_bank/cash.json` | I tagli del contante per Currency. | Al riavvio. |
| `config/qrm_bank-server.toml` | Distanza dell'ATM, limiti, bonifici. | Subito, senza riavvio. |

Il jar `qrm_bank-<versione>.jar` va in `mods/` del server **e di ogni client**.

## How it works

### I tagli: `cash.json`

Creato con valori predefiniti al primo avvio. Viene letto una volta all'avvio, perché gli item si registrano prima dei datapack.

```json
{
  "QRM": { "decimals": 2, "denominations": [100, 500, 1000, 5000, 10000] }
}
```

Regole:

- il codice Currency è `[A-Z0-9_]{2,16}`;
- `decimals` va da 0 a 8 e deve coincidere con la Currency registrata in QRM;
- i tagli sono interi maggiori di 0, distinti, in unità minime, e **ognuno multiplo del più piccolo precedente**;
- un file invalido impedisce l'avvio del Module con un messaggio che indica il file.

:::warning
Server e client devono avere lo **stesso `cash.json`**. Gli item dei tagli si registrano in base a questo file: se differisce, il client viene respinto per registro non corrispondente. Distribuiscilo con il modpack.
:::

### `qrm_bank-server.toml`

| Chiave | Predefinito | Cosa fa |
| --- | --- | --- |
| `atm.maxDistance` | `6.0` (2–16) | Distanza massima in blocchi dall'ATM aperto. |
| `atm.minIntervalMillis` | `250` (0–5000) | Intervallo minimo fra due richieste dello stesso Player. |
| `atm.historyRows` | `20` (1–50) | Movimenti mostrati nello storico. |
| `atm.transfersEnabled` | `true` | Abilita i bonifici dall'ATM. |
| `limits.maxPerOperation` | `100000` | Ritiro massimo per operazione, in unità minime. |
| `limits.maxPerDay` | `500000` | Ritiro massimo nelle ultime 24 ore per Character, in unità minime. |
| `limits.overrides` | vuoto | Limiti per Currency, voci `"CODICE:perOperazione:alGiorno"`, per esempio `"EUR:50000:200000"`. |

Il limite giornaliero somma i ritiri delle ultime 24 ore. Dalla 0.13.1 legge lo storico dell'Account finché non supera le 24 ore, fino a 64 000 Transactions; oltre quel numero in un giorno l'Account è considerato al limite. Fino alla 0.13.0 leggeva solo le 500 Transactions più recenti: molti movimenti recenti potevano escludere i ritiri dal conteggio.

### Permissions

`bank.atm.use` e `bank.transfer` sono **consentiti a tutti salvo un DENY esplicito** sul Character, per esempio con `/perm deny <player> bank.transfer`.

## Limitations

- Le modifiche a `cash.json` richiedono il riavvio del server.
- Il limite giornaliero considera solo le 500 Transactions più recenti dell'Account.
- Se `cash.json` differisce tra server e client, il client viene respinto.

## Related

- [Bank](index.md)
- [Comandi](comandi.md)
- [Permissions](../../server-owner/permessi.md)
- [Manutenzione](../../server-owner/manutenzione.md)
