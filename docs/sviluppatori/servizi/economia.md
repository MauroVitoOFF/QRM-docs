---
sidebar_label: Economia
---

# Economia

Tre servizi lavorano insieme: `CurrencyRegistry` (le valute), `AccountService` (i conti) e `TransactionService` (i movimenti). Gli importi sono sempre in **unità minime**.

## Importi: `Money`

```java
Money.of("USD", 1250)   // 12,50 USD se la valuta ha 2 decimali
```

`Money(String currency, long amount)` non accetta importi negativi né valute vuote. `plus` e `minus` richiedono la stessa valuta e lanciano `IllegalArgumentException` altrimenti (e se il risultato di `minus` sarebbe negativo).

## Valute

Una valuta si registra con un file in `<world>/qrm/data/currencies/*.json`:

```json
{ "code": "USD", "symbol": "$", "decimals": 2 }
```

oppure dal codice, già nel costruttore del tuo mod:

```java
QRM.get(CurrencyRegistry.class).register(new Currency("USD", "$", 2));
```

Il codice è `[A-Z0-9_]{2,16}` e `decimals` va da 0 a 8. `Currency.parseAmount("12.50")` converte un testo decimale in unità minime e `format(long)` fa il contrario (`"12.50 $"`). `CurrencyRegistry` ha anche `find(code)` e `all()`.

## Conti

```java
AccountService accounts = QRM.get(AccountService.class);
Optional<Account> acc = accounts.accountsOf(OwnerRef.character(characterId)).stream().findFirst();
Money saldo = accounts.balance(acc.get().id(), "USD");
```

Un conto appartiene a un `OwnerRef(type, id)`: `OwnerRef.character(id)`, `OwnerRef.system()`, o un tipo tuo (`[A-Z0-9_]{1,32}`). `AccountService` offre `create`, `find`, `accountsOf`, `systemAccount`, `balance`, `balances` e `setStatus(id, ACTIVE | FROZEN)`. Un conto congelato non muove denaro.

## Trasferimenti

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
- **`idempotencyKey`:** da 1 a 128 caratteri. Usa una chiave **stabile** per l'operazione logica (per esempio `"payroll-2026-10-<charId>"`): ripetere la stessa richiesta non duplica il pagamento e restituisce `Duplicate`. Lo spazio delle chiavi è globale a `TransactionService`: una chiave già usata da qualunque altra transazione restituisce `Duplicate`, quindi usa un prefisso del tuo mod.
- **`metadataJson`:** JSON libero allegato alla transazione (predefinito `{}`). `groupId` raggruppa più transazioni collegate.

`transfer` restituisce un `TransferResult` **sealed**; gestiscilo con uno `switch` esaustivo:

| Esito | Significato |
| --- | --- |
| `Success(transaction)` | Fatto. |
| `Duplicate(original)` | La chiave di idempotenza era già stata usata. |
| `InsufficientFunds(requested, available)` | Fondi insufficienti. |
| `AccountNotFound(id)` | Conto inesistente. |
| `AccountFrozen(id)` | Conto congelato. |
| `UnknownCurrency(code)` | Valuta non registrata. |
| `InvalidRequest(reason)` | Richiesta non valida. |
| `Cancelled(by, reason)` | Annullata da un handler di `TransactionPreEvent`. |

Altri metodi: `findByKey(String idempotencyKey)` e `history(AccountId, int limit)`.

## Intervenire sui movimenti

- `TransactionPreEvent` (annullabile): `request()`, `cancel(...)`, `setAmount(...)` (stessa valuta).
- `TransactionPostEvent(transaction)`: dopo il movimento.
- `AccountCreatedEvent(account)`.

## Audit

`AuditService.verify()` confronta ogni saldo con la somma delle transazioni e restituisce la lista degli `AuditIssue(account, currency, expected, actual)`; lista vuota significa tutto coerente. È ciò che usa `/qrm admin audit`.
