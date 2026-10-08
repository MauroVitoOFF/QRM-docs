---
sidebar_label: Characters
---

# Characters

Questa pagina documenta `CharacterService` e `PlayerService`. È rivolta agli sviluppatori di Modules. Per i comandi lato server vedi [Characters](../../server-owner/personaggi.md).

:::caution Experimental
API `0.x`: può cambiare tra una minor e l'altra.
:::

## Overview

Un Player (`PlayerId`) ha uno o più Characters (`PlayerCharacter`) e uno solo è **attivo**. Job, Accounts, Permissions e Organizations appartengono al Character.

```java
CharacterService characters = QRM.get(CharacterService.class);
Optional<PlayerCharacter> pc = characters.activeOf(new PlayerId(player.getUUID()));
```

## How it works

`PlayerCharacter` ha `id`, `playerId`, `firstName`, `lastName`, `birthDate`, `status` (`ACTIVE`, `ARCHIVED`, `DECEASED`) e `createdAt`.

I limiti (slot, lunghezza e forma del nome, nomi unici) vengono dalla configurazione del server: vedi [Configurazione](../../server-owner/configurazione.md).

`PlayerService` tiene traccia dei Players: `onJoin(PlayerId)` (lo chiama QRM all'ingresso) e `find(PlayerId)`, che restituisce un `QrmPlayer(id, firstSeen, lastSeen, characterSlots)`.

## API

| Metodo | Cosa fa |
| --- | --- |
| `create(PlayerId, firstName, lastName, LocalDate birthDate)` | Crea un Character. |
| `select(PlayerId, CharacterId)` | Lo rende attivo. |
| `archive(PlayerId, CharacterId)` | Lo archivia; restituisce `boolean`. |
| `activeOf(PlayerId)` | Il Character attivo, se c'è. |
| `listOf(PlayerId)` | Tutti i Characters del Player. |
| `find(CharacterId)` | Un Character per id. |
| `findByName(String fullName)` | I Characters con quel "Nome Cognome" (più d'uno se `characters.uniqueNames` è `false`). |

Gli esiti sono **sealed**: usa uno `switch` esaustivo.

- `CreateCharacterResult`: `Created(character)`, `UnknownPlayer`, `SlotsFull`, `InvalidName(reason)`, `NameTaken`.
- `SelectCharacterResult`: `Selected(character)`, `NotFound`, `NotOwner`, `NotUsable(status)`.

### Eventi

| Evento | Quando |
| --- | --- |
| `CharacterCreatedEvent(character)` | Dopo la creazione. |
| `CharacterSelectedEvent(character)` | Dopo la selezione. |
| `CharacterArchivedEvent(character)` | Dopo l'archiviazione. |
| `PlayerJoinEvent(playerId)`, `PlayerLeaveEvent(playerId)` | Ingresso e uscita di un Player. |

## Examples

Trovare il Character attivo e il suo Account:

```java
Optional<Account> account = characters.activeOf(new PlayerId(player.getUUID()))
        .flatMap(pc -> QRM.get(AccountService.class)
                .accountsOf(OwnerRef.character(pc.id())).stream().findFirst());
```

## Limitations

- Non esiste un'operazione per riattivare un Character archiviato.
- Gli eventi di creazione, selezione e archiviazione non sono annullabili.

## Related

- [Economy](economia.md)
- [Jobs](lavori.md)
- [Eventi](../eventi.md)
