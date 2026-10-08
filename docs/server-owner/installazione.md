---
sidebar_label: Installazione
---

# Installazione

1. Installa NeoForge 26.2.0.88 (o successiva) con Java 25 sul server e su ogni client che lo userà.
2. Copia `qrm-<versione>.jar` nella cartella `mods/` del **server**. Sui client è facoltativo: senza, il giocatore entra e usa i comandi; con, ha anche HUD, hub, schermata Personaggi e (per lo staff) il pannello.
3. (Facoltativo) Per abilitare la banca copia `qrm_bank-<versione>.jar` in `mods/` del server **e di ogni client**: registra blocchi e item, quindi sui client è obbligatorio.
4. Avvia il server una volta: vengono creati la configurazione e il database.

## Dove finiscono i file

| File | Posizione |
| --- | --- |
| Configurazione di QRM | `config/qrm-common.toml` |
| Configurazione della banca | `config/qrm_bank-server.toml` |
| Configurazione client | `config/qrm-client.toml` |
| Database | `<world>/qrm/qrm.db` (SQLite, se `database.url` è vuoto) |
| Lavori | `<world>/qrm/data/jobs/<id>.json` |
| Valute | `<world>/qrm/data/currencies/*.json` |
| Contante della banca | `config/qrm_bank/cash.json` |

## Aggiornare

Sostituisci il jar in `mods/` del server e dei client che lo hanno. Prima di aggiornare fai una copia di `<world>/qrm/`. Un client che ha QRM (o la banca) deve averlo alla stessa versione del server.
