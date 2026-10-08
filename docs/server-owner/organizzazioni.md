---
sidebar_label: Organizations
---

# Organizations

Questa pagina descrive come creare e gestire le Organizations. È rivolta ai server owner. Disponibile dalla 0.3.

## Overview

Un'Organization ha un id, un'etichetta, dei **Ranks** (con livello e Permissions), dei **membri** e un **Account** in comune, multi-Currency. Un Character può stare in più Organizations.

## How it works

- Le Organizations si creano solo a runtime (comandi o API), non da file.
- Non si cancellano: si **archiviano** e il loro Account viene congelato.
- I Ranks ereditano i Permissions dei Ranks con `level` inferiore della stessa Organization.
- Il Permission `org.account.withdraw` controlla i prelievi dall'Account dell'Organization.
- Un [Job](lavori.md) può collegarsi a un'Organization (`"org": "<id>"`): chi ha quel Job, in servizio, è membro implicito e usa i Permissions del proprio Grade.

## Usage

| Comando | Chi | Cosa fa |
| --- | --- | --- |
| `/org` (o `/org list`) | Players | Elenca le Organizations del Character attivo. |
| `/org info <org>` | membri e operatori | Mostra i dettagli dell'Organization. |
| `/org create <id> <label>` | operatori | Crea un'Organization. |
| `/org archive <id>` | operatori | Archivia l'Organization. |
| `/org rank set <org> <rank> <level> [nodes…]` | operatori | Crea o modifica un Rank. L'etichetta coincide con l'id. |
| `/org rank remove <org> <rank>` | operatori | Rimuove un Rank. |
| `/org member add <org> <player> <rank>` | operatori | Aggiunge un membro. |
| `/org member setrank <org> <player> <rank>` | operatori | Cambia il Rank di un membro. |
| `/org member remove <org> <player>` | operatori | Rimuove un membro. |

Il Tab propone le Organizations esistenti e i loro Ranks. I sottocomandi per operatori non compaiono agli altri Players. Restano validi anche `/qrm org list|info` e `/qrm admin org …`.

## Limitations

- Le Organizations non si cancellano e non si definiscono da file.
- Con `/org rank set` l'etichetta del Rank coincide con l'id; per un'etichetta leggibile serve l'API.
- Il Core non paga stipendi dall'Account dell'Organization: lo fa un Module.
- Il pannello staff non ha una schermata per le Organizations: si usano i comandi.

## Related

- [Jobs](lavori.md)
- [Permissions](permessi.md)
- [Organizations per sviluppatori](../sviluppatori/servizi/organizzazioni.md)
