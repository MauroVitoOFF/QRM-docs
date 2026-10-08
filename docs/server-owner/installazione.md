---
sidebar_label: Installazione
---

# Installazione

Questa pagina descrive quali jar installare, dove finiscono i file di QRM e come aggiornare. È rivolta ai server owner.

## Overview

QRM si installa copiando uno o due jar in `mods/`. Il jar `qrm` contiene il framework; `qrm_bank` è un [Module](../intro/moduli.md) facoltativo. Per i requisiti di versione vedi [Requisiti](../intro/requisiti.md).

## Usage

1. Installa NeoForge 26.2.0.88 (o successiva) con Java 25 sul server e su ogni client che lo userà.
2. Copia `qrm-<versione>.jar` nella cartella `mods/` del **server**. Sui client è facoltativo: senza, il Player entra e usa i comandi; con, ha anche HUD, hub, schermata Characters e, per lo staff, il pannello.
3. (Facoltativo) Per abilitare Bank copia `qrm_bank-<versione>.jar` in `mods/` del server **e di ogni client**: registra blocchi e item, quindi sui client è obbligatorio.
4. Avvia il server una volta: vengono creati la configurazione e il database.

## File creati

| File | Posizione |
| --- | --- |
| Configurazione di QRM | `config/qrm-common.toml` |
| Configurazione di Bank | `config/qrm_bank-server.toml` |
| Configurazione client | `config/qrm-client.toml` |
| Database | `<world>/qrm/qrm.db` (SQLite, se `database.url` è vuoto) |
| Jobs | `<world>/qrm/data/jobs/<id>.json` |
| Currencies | `<world>/qrm/data/currencies/*.json` |
| Contante di Bank | `config/qrm_bank/cash.json` |

## Aggiornare

Sostituisci il jar in `mods/` del server e dei client che lo hanno. Prima di aggiornare fai una copia di `<world>/qrm/`. Un client che ha QRM (o Bank) deve averlo alla stessa versione del server.

## Limitations

- Un client con una versione diversa di QRM dal server non è supportato.
- Il database esterno non è disponibile: oggi è incluso solo il driver SQLite.

## Related

- [Configurazione](configurazione.md)
- [Manutenzione](manutenzione.md)
- [Bank](../modules/bank/configurazione.md)
