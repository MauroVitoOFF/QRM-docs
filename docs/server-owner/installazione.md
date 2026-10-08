---
sidebar_label: Installazione
---

# Installazione

1. Installa NeoForge 26.2.0.88 (o successiva) con Java 25 sul server e sui client.
2. Copia `qrm-<versione>.jar` nella cartella `mods/` del **server e di ogni client**.
3. (Facoltativo) Copia anche `qrm_bank-<versione>.jar` in `mods/` di server e client per abilitare la banca.
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

Sostituisci il jar in `mods/` di server e client con la stessa versione. Prima di aggiornare fai una copia di `<world>/qrm/`. Server e client devono sempre avere la stessa versione di QRM e della banca.
