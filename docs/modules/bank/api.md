---
sidebar_label: API
---

# API di Bank

Questa pagina descrive come integrarsi con il Module `qrm_bank` dal codice. È rivolta agli sviluppatori di Modules. Disponibile dalla 0.7.

:::caution Experimental
API `0.x`: può cambiare tra una minor e l'altra.
:::

## Overview

Per integrarti con Bank hai due strade: gli **eventi** che pubblica, e i **motivi** (`reason`) delle sue Transactions, su cui puoi intervenire con `TransactionPreEvent`. L'API di Bank è nel Module `qrm_bank` (pacchetto `dev.qrm.bank.api`), non in `qrm-api`.

## How it works

Le operazioni di Bank passano da `TransactionService`, quindi `TransactionPreEvent` le vede prima che avvengano. Il campo `reason` della richiesta le distingue:

| `reason` | Operazione |
| --- | --- |
| `bank.withdraw` | Ritiro dall'ATM. |
| `bank.deposit` | Deposito all'ATM. |
| `bank.transfer` | Bonifico. |
| `bank.deposit.revert` | Storno interno di un deposito. |

Se un handler **cambia l'importo** di un ritiro o di un deposito con `setAmount`, Bank annulla l'operazione e la storna.

## API

Gli eventi partono **dopo** l'operazione e non sono annullabili.

| Evento | Campi |
| --- | --- |
| `BankWithdrawEvent` | `character`, `amount`, `transaction` |
| `BankDepositEvent` | `character`, `amount`, `transaction` |
| `BankTransferEvent` | `from`, `toCharacter`, `toOrganization`, `amount`, `note`, `transaction` |

In `BankTransferEvent` il destinatario è un Character (`toCharacter`) oppure un'Organization (`toOrganization`, l'id): l'altro campo è `null`. `note` è la causale scritta dal Player.

Per usare questi eventi il tuo mod deve avere `qrm_bank` in compilazione (`compileOnly`) e, se non vuoi imporlo ai server, dichiararlo come dipendenza facoltativa.

## Examples

Reagire a un bonifico:

```java
QRM.events().register(BankTransferEvent.class, "mymod", e ->
        LOGGER.info("Bonifico di {} {}", e.amount().amount(), e.amount().currency()));
```

Bloccare i bonifici:

```java
QRM.events().register(TransactionPreEvent.class, "mymod", e -> {
    if (e.request().reason().equals("bank.transfer") && vietato(e.request())) {
        e.cancel("mymod", "bonifici sospesi");
    }
});
```

`vietato` è una funzione del tuo Module.

### Senza dipendere da Bank

- L'Account bancario di un Character è il suo Account di QRM: `AccountService.accountsOf(OwnerRef.character(id))`, il primo.
- Per trovare un Character per nome: `CharacterService.findByName("Nome Cognome")`.
- Le Permissions `bank.atm.use` e `bank.transfer` sono consentite a tutti salvo un `DENY` esplicito: controllale come descritto in [Permissions](../../sviluppatori/servizi/permessi.md).

## Limitations

- Gli eventi di Bank non sono annullabili: per intervenire prima usa `TransactionPreEvent`.
- L'API richiede il Module `qrm_bank` nel classpath di compilazione.

## Related

- [Bank](index.md)
- [Eventi](../../sviluppatori/eventi.md)
- [Economy](../../sviluppatori/servizi/economia.md)
- [Riferimento degli eventi](../../riferimento/eventi.md)
