---
sidebar_label: Registro dei servizi
---

# Registro dei servizi

Tutto passa da `dev.qrm.api.QRM`, un registro statico di servizi indicizzati per tipo.

```java
AccountService accounts = QRM.get(AccountService.class);
EventBus bus = QRM.events();   // scorciatoia per QRM.get(EventBus.class)
```

`QRM.get(...)` lancia `IllegalStateException` se il servizio non è disponibile: il messaggio ricorda di aspettare `QrmReadyEvent`.

## Quando i servizi sono disponibili

| Servizio | Disponibile |
| --- | --- |
| `EventBus`, `CurrencyRegistry`, `JobRegistry` | Già nel costruttore del tuo mod (li registra il costruttore del mod QRM). |
| `PlayerService`, `CharacterService`, `AccountService`, `TransactionService`, `AuditService`, `ModDataService`, `JobService`, `PermissionService`, `OrganizationService`, `OrganizationBankService`, `StaffAccessService` | All'avvio del server, quando il Core apre il database e registra i servizi. Subito dopo viene pubblicato `QrmReadyEvent`. |

Chiamare uno di questi servizi prima dell'avvio del server lancia `IllegalStateException`. Il modo più semplice è partire da `QrmReadyEvent`:

```java
QRM.events().register(QrmReadyEvent.class, "mymod", e -> {
    AccountService accounts = QRM.get(AccountService.class);
    // da qui in poi i servizi del Core esistono
});
```

## Registrare un servizio proprio

`QRM.register(Class<T>, T)` aggiunge un servizio al registro e lancia `IllegalStateException` se quel tipo è già registrato. Serve a chi fornisce un servizio ad altri moduli. `QRM.unregister(Class)` e `QRM.clear()` esistono soprattutto per i test.

## Errori del database

Gli errori del database emergono come `RuntimeException`.
