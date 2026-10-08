---
sidebar_label: API della banca
---

# API della banca

Questa pagina descrive come integrarsi con il Module `qrm_bank`. È rivolta agli sviluppatori di Modules. Disponibile dalla 0.7. Per l'uso lato server vedi [Banca e ATM](../server-owner/banca.md).

:::caution Experimental
API `0.x`: può cambiare tra una minor e l'altra.
:::

## Overview

`qrm_bank` è un [Module](../intro/moduli.md), non parte del framework. Per integrarti hai due strade: gli **eventi** che pubblica, e i **motivi** (`reason`) delle sue Transactions, su cui puoi intervenire con `TransactionPreEvent`.

## How it works

Le operazioni della banca passano da `TransactionService`, quindi `TransactionPreEvent` le vede prima che avvengano. Il campo `reason` della richiesta le distingue:

| `reason` | Operazione |
| --- | --- |
| `bank.withdraw` | Ritiro dall'ATM. |
| `bank.deposit` | Deposito all'ATM. |
| `bank.transfer` | Bonifico. |
| `bank.deposit.revert` | Storno interno di un deposito. |

Se un handler **cambia l'importo** di un ritiro o di un deposito con `setAmount`, la banca annulla l'operazione e la storna.

## API

Pacchetto `dev.qrm.bank.api`. Gli eventi partono **dopo** l'operazione e non sono annullabili.

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

### Senza dipendere dalla banca

- L'Account bancario di un Character è il suo Account di QRM: `AccountService.accountsOf(OwnerRef.character(id))`, il primo.
- Per trovare un Character per nome: `CharacterService.findByName("Nome Cognome")`.
- Le Permissions `bank.atm.use` e `bank.transfer` sono consentite a tutti salvo un `DENY` esplicito: controllale come descritto in [Permissions](servizi/permessi.md).

## Limitations

- Gli eventi della banca non sono annullabili: per intervenire prima usa `TransactionPreEvent`.
- L'API della banca è nel Module `qrm_bank`, non in `qrm-api`.

## Related

- [Eventi](eventi.md)
- [Economy](servizi/economia.md)
- [Banca e ATM](../server-owner/banca.md)
