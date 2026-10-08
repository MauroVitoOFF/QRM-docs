---
sidebar_label: Requisiti
---

# Requisiti

Questa pagina elenca ciò che serve per far girare QRM. È rivolta ai server owner.

## Overview

| Componente | Versione |
| --- | --- |
| Minecraft | 26.2 |
| NeoForge | 26.2.0.88 o successiva |
| Java | 25 |

## How it works

QRM va installato sul **server**. Il client è **facoltativo**: un Player che non lo installa entra comunque e usa i comandi. Chi lo installa ha in più l'HUD, l'hub, la schermata Characters e, per lo staff, il pannello. Un client che ha QRM deve avere **la stessa versione** del server.

Il Module `qrm_bank` registra blocchi e item, quindi, se lo installi, serve **anche sui client**, alla stessa versione.

Il database predefinito è SQLite e non richiede nulla di installato.

## Limitations

- Nessun'altra versione di Minecraft o di NeoForge è supportata.
- Oggi è incluso solo il driver SQLite: un database esterno non è disponibile.

## Related

- [Installazione](../server-owner/installazione.md)
- [Configurazione](../server-owner/configurazione.md)
