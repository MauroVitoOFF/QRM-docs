---
sidebar_label: API della banca
---

# API della banca

`qrm_bank` è un [modulo](../intro/moduli.md), non parte del framework. Per integrarti con la banca hai due strade: gli **eventi** che pubblica, e i **motivi** (`reason`) delle sue transazioni, su cui puoi intervenire con `TransactionPreEvent`. Per i concetti generali (ATM, cassa, contante) vedi [Banca e ATM](../server-owner/banca.md).

## Eventi

Pacchetto `dev.qrm.bank.api`. Partono **dopo** l'operazione e non sono annullabili.

| Evento | Campi |
| --- | --- |
| `BankWithdrawEvent` | `character`, `amount`, `transaction` |
| `BankDepositEvent` | `character`, `amount`, `transaction` |
| `BankTransferEvent` | `from`, `toCharacter`, `toOrganization`, `amount`, `note`, `transaction` |

In `BankTransferEvent` il destinatario è un personaggio (`toCharacter`) oppure un'organizzazione (`toOrganization`, l'id): l'altro campo è `null`. `note` è la causale scritta dal giocatore.

```java
QRM.events().register(BankTransferEvent.class, "mymod", e ->
        LOGGER.info("Bonifico di {} {}", e.amount().amount(), e.amount().currency()));
```

Per usare questi eventi il tuo mod deve avere `qrm_bank` in compilazione (`compileOnly`) e, se non vuoi imporlo ai server, dichiararlo come dipendenza facoltativa.

## Intervenire prima dell'operazione

Le operazioni della banca passano da `TransactionService`, quindi `TransactionPreEvent` le vede prima che avvengano. Il campo `reason` della richiesta le distingue:

| `reason` | Operazione |
| --- | --- |
| `bank.withdraw` | Ritiro dall'ATM. |
| `bank.deposit` | Deposito all'ATM. |
| `bank.transfer` | Bonifico. |
| `bank.deposit.revert` | Storno interno di un deposito. |

```java
QRM.events().register(TransactionPreEvent.class, "mymod", e -> {
    if (e.request().reason().equals("bank.transfer") && vietato(e.request())) {
        e.cancel("mymod", "bonifici sospesi");
    }
});
```

Se un handler **cambia l'importo** di un ritiro o di un deposito con `setAmount`, la banca annulla l'operazione e la storna.

## Senza dipendere dalla banca

- Il conto bancario di un personaggio è il suo conto di QRM: `AccountService.accountsOf(OwnerRef.character(id))`, il primo.
- Per trovare un personaggio per nome: `CharacterService.findByName("Nome Cognome")`.
- I permessi `bank.atm.use` e `bank.transfer` sono consentiti a tutti salvo un `DENY` esplicito: controllali come descritto in [Permessi](servizi/permessi.md).
