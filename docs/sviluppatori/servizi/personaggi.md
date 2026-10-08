---
sidebar_label: Personaggi
---

# Personaggi

Un giocatore (`PlayerId`) ha uno o più personaggi (`PlayerCharacter`) e uno solo è **attivo**. Lavoro, conti, permessi e organizzazioni appartengono al personaggio.

```java
CharacterService characters = QRM.get(CharacterService.class);
Optional<PlayerCharacter> pc = characters.activeOf(new PlayerId(player.getUUID()));
```

## Il servizio

| Metodo | Cosa fa |
| --- | --- |
| `create(PlayerId, firstName, lastName, LocalDate birthDate)` | Crea un personaggio. |
| `select(PlayerId, CharacterId)` | Lo rende attivo. |
| `archive(PlayerId, CharacterId)` | Lo archivia; restituisce `boolean`. |
| `activeOf(PlayerId)` | Il personaggio attivo, se c'è. |
| `listOf(PlayerId)` | Tutti i personaggi del giocatore. |
| `find(CharacterId)` | Un personaggio per id. |
| `findByName(String fullName)` | I personaggi con quel "Nome Cognome" (può essere più di uno se `characters.uniqueNames` è `false`). |

`PlayerCharacter` ha `id`, `playerId`, `firstName`, `lastName`, `birthDate`, `status` (`ACTIVE`, `ARCHIVED`, `DECEASED`) e `createdAt`.

## Esiti

Entrambi sono **sealed**: usa uno `switch` esaustivo.

`CreateCharacterResult`: `Created(character)`, `UnknownPlayer`, `SlotsFull`, `InvalidName(reason)`, `NameTaken`.

`SelectCharacterResult`: `Selected(character)`, `NotFound`, `NotOwner`, `NotUsable(status)`.

I limiti (slot, lunghezza e forma del nome, nomi unici) vengono dalla configurazione del server: vedi [Configurazione](../../server-owner/configurazione.md).

## Giocatori

`PlayerService` tiene traccia dei giocatori: `onJoin(PlayerId)` (lo chiama QRM all'ingresso) e `find(PlayerId)`, che restituisce un `QrmPlayer(id, firstSeen, lastSeen, characterSlots)`.

## Eventi

| Evento | Quando |
| --- | --- |
| `CharacterCreatedEvent(character)` | Dopo la creazione. |
| `CharacterSelectedEvent(character)` | Dopo la selezione. |
| `CharacterArchivedEvent(character)` | Dopo l'archiviazione. |
| `PlayerJoinEvent(playerId)`, `PlayerLeaveEvent(playerId)` | Ingresso e uscita di un giocatore. |
