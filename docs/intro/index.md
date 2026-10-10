---
slug: /
sidebar_label: Cos'è QRM
---

# QRM (Quorum)

QRM è un framework per server roleplay su NeoForge. Questa documentazione è per chi gestisce un server (server owner) e per chi scrive Modules che usano QRM.

Versione documentata: **0.13.0** (Minecraft 26.2, NeoForge 26.2.0.88, Java 25).

## Overview

QRM separa il Character dal Player. Un Player ha uno o più Characters e ne usa uno alla volta. Job, Accounts e Organizations appartengono al Character, non al Player.

QRM fornisce:

- **Characters**, creati e scelti dai Players.
- **Economy**: Currencies, Accounts e Transactions.
- **Jobs** con Grades, e **Organizations** con Ranks e un Account in comune.
- **Permissions** per Character e Permissions dello staff per account.
- Un client facoltativo con HUD, hub, schermata Characters e pannello staff.
- Un'**API** per scrivere Modules, come il Module `qrm_bank`.

## How the documentation is organized

| Se sei... | Parti da |
| --- | --- |
| un server owner | [Server owner](../server-owner/index.md): installazione, configurazione, gestione dei Characters, dei Jobs, delle Organizations e dello staff. |
| uno sviluppatore | [Sviluppatori](../sviluppatori/index.md): quickstart, servizi dell'API, eventi, Client API. |
| interessato ai Modules ufficiali | [Modules](../modules/index.md): Bank, Locker e i Modules futuri, ognuno con installazione, configurazione, comandi e API. |
| alla ricerca di una tabella | [Riferimento](../riferimento/index.md): Permissions, eventi, glossario, changelog tecnico. |

Per sapere cosa è il framework e cosa è un Module leggi [Framework e Modules](moduli.md). Per sapere cosa significano le etichette di stato (Stable, Experimental, Planned, Deprecated) leggi [Versioni e stabilità](stabilita.md).

## Limitations

- QRM è alla versione 0.x: comandi, configurazione e API possono cambiare tra una minor e l'altra. Vedi [Versioni e stabilità](stabilita.md).
- Funziona solo con Minecraft 26.2 e NeoForge 26.2.0.88 o successiva.
