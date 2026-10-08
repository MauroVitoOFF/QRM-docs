---
sidebar_label: Economy
---

# Economy

Questa pagina documenta i servizi dell'Economy: Currencies, Accounts e Transactions. È rivolta agli sviluppatori di Modules. Per i comandi e la configurazione lato server vedi [Economy](../../server-owner/economia.md).

:::caution Experimental
API `0.x`: può cambiare tra una minor e l'altra.
:::

## Overview

Tre servizi lavorano insieme: `CurrencyRegistry` (le Currencies), `AccountService` (gli Accounts) e `TransactionService` (i movimenti). Gli importi sono sempre in **unità minime**.

## How it works

### Importi: `Money`

`Money(String currency, long amount)` non accetta importi negativi né Currencies vuote. `plus` e `minus` richiedono la stessa Currency e lanciano `IllegalArgumentException` altrimenti (e se il risultato di `minus` sarebbe negativo).

```java
Money.of("USD", 1250)   // 12,50 USD se la Currency ha 2 decimali
```

### Currencies

Il codice è `[A-Z0-9_]{2,16}` e `decimals` va da 0 a 8. `Currency.parseAmount("12.50")` converte un testo decimale in unità minime e `format(long)` fa il contrario (`"12.50 $"`). `CurrencyRegistry` ha `register`, `find(code)` e `all()`.

### Accounts

Un Account appartiene a un `OwnerRef(type, id)`: `OwnerRef.character(id)`, `OwnerRef.system()`, o un tipo tuo (`[A-Z0-9_]{1,32}`). Uno stato può essere `ACTIVE` o `FROZEN`; un Account congelato non muove denaro.

### Transactions

`transfer` restituisce un `TransferResult` **sealed**:

| Esito | Significato |
| --- | --- |
| `Success(transaction)` | Fatto. |
| `Duplicate(original)` | La chiave di idempotenza era già stata usata. |
| `InsufficientFunds(requested, available)` | Fondi insufficienti. |
| `AccountNotFound(id)` | Account inesistente. |
| `AccountFrozen(id)` | Account congelato. |
| `UnknownCurrency(code)` | Currency non registrata. |
| `InvalidRequest(reason)` | Richiesta non valida. |
| `Cancelled(by, reason)` | Annullata da un handler di `TransactionPreEvent`. |

## Usage

### Registrare una Currency

Con un file in `<world>/qrm/data/currencies/*.json`:

```json
{ "code": "USD", "symbol": "$", "decimals": 2 }
```

oppure dal codice, già nel costruttore del tuo mod:

```java
QRM.get(CurrencyRegistry.class).register(new Currency("USD", "$", 2));
```

### Leggere un saldo

```java
AccountService accounts = QRM.get(AccountService.class);
Optional<Account> acc = accounts.accountsOf(OwnerRef.character(characterId)).stream().findFirst();
Money balance = accounts.balance(acc.get().id(), "USD");
```

### Muovere denaro

```java
TransferResult r = QRM.get(TransactionService.class).transfer(TransferRequest.builder()
        .from(accounts.systemAccount().id()).to(target.id())
        .amount(Money.of("USD", 10_000))
        .reason("mymod.paycheck")
        .idempotencyKey("payroll-2026-10-" + characterId.value())
        .build());
```

- **Creare o distruggere denaro:** trasferisci da o verso `AccountService.systemAccount()`.
- **`reason`:** da 1 a 128 caratteri; è ciò su cui filtrano gli eventi (`TransactionPreEvent`) e lo storico.
- **`idempotencyKey`:** da 1 a 128 caratteri. Usa una chiave **stabile** per l'operazione logica: ripetere la stessa richiesta non duplica il pagamento e restituisce `Duplicate`. Lo spazio delle chiavi è globale: una chiave già usata da qualunque altra Transaction restituisce `Duplicate`, quindi usa un prefisso del tuo mod.
- **`metadataJson`:** JSON libero allegato alla Transaction (predefinito `{}`). `groupId` raggruppa più Transactions collegate.

## API

| Servizio | Metodi |
| --- | --- |
| `AccountService` | `create`, `find`, `accountsOf`, `systemAccount`, `balance`, `balances`, `setStatus` |
| `TransactionService` | `transfer`, `findByKey(idempotencyKey)`, `history(AccountId, limit)` |
| `CurrencyRegistry` | `register`, `find`, `all` |
| `AuditService` | `verify()`: confronta ogni saldo con la somma delle Transactions e restituisce la lista di `AuditIssue(account, currency, expected, actual)`; vuota = coerente |

Eventi: `TransactionPreEvent` (annullabile: `request()`, `cancel(...)`, `setAmount(...)` con la stessa Currency), `TransactionPostEvent(transaction)`, `AccountCreatedEvent(account)`.

## Limitations

- Non esiste un cambio tra Currencies.
- L'API non ha un'operazione di storno: per annullare un movimento già eseguito si esegue una Transaction inversa (la banca usa il motivo `bank.deposit.revert`).
- Lo spazio delle `idempotencyKey` è unico per tutti i Modules.

## Related

- [Eventi](../eventi.md)
- [Organizations](organizzazioni.md): prelievi da un Account di Organization.
- [API della banca](../api-banca.md)
- [Economy per server owner](../../server-owner/economia.md)
