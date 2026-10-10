---
sidebar_label: Registro dei servizi
---

# Registro dei servizi

Questa pagina descrive `dev.qrm.api.QRM`, il punto da cui un Module ottiene i servizi dell'API, e spiega quando ogni servizio è disponibile. È rivolta agli sviluppatori di Modules.

## Overview

`QRM` è un registro statico di servizi indicizzati per tipo.

```java
AccountService accounts = QRM.get(AccountService.class);
EventBus bus = QRM.events();   // scorciatoia per QRM.get(EventBus.class)
```

`QRM.get(...)` lancia `IllegalStateException` se il servizio non è disponibile: il messaggio ricorda di aspettare `QrmReadyEvent`.

## How it works

Alcuni servizi esistono prima del server, gli altri nascono quando il Core apre il database.

| Servizio | Disponibile |
| --- | --- |
| `EventBus`, `CurrencyRegistry`, `JobRegistry`, `PointTypeRegistry` (0.14) | Già nel costruttore del tuo mod (li registra il costruttore del mod QRM). |
| `PlayerService`, `CharacterService`, `AccountService`, `TransactionService`, `AuditService`, `ModDataService`, `JobService`, `PermissionService`, `OrganizationService`, `OrganizationBankService`, `StaffAccessService`, `StaffLogService` (0.12), `ModerationService` (0.13), `PointService` (0.14) | All'avvio del server, quando il Core registra i servizi. Subito dopo viene pubblicato `QrmReadyEvent`. |

Chiamare uno di questi servizi prima dell'avvio del server lancia `IllegalStateException`.

## Usage

Il modo più semplice di usare i servizi del Core è partire da `QrmReadyEvent`:

```java
QRM.events().register(QrmReadyEvent.class, "mymod", e -> {
    AccountService accounts = QRM.get(AccountService.class);
    // da qui in poi i servizi del Core esistono
});
```

### Registrare un servizio proprio

`QRM.register(Class<T>, T)` aggiunge un servizio al registro e lancia `IllegalStateException` se quel tipo è già registrato. Serve a un Module che fornisce un servizio ad altri Modules. `QRM.unregister(Class)` e `QRM.clear()` esistono soprattutto per i test.

## Limitations

- Gli errori del database emergono come `RuntimeException`.
- Il registro non gestisce versioni dei servizi: un tipo è registrato una volta sola.

## Related

- [Quickstart](quickstart.md)
- [Eventi](eventi.md)
