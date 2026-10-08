---
sidebar_label: Eventi
---

# Eventi

Tutti gli eventi di QRM (`dev.qrm.api…`) e della banca (`dev.qrm.bank.api`). Come registrare un handler, le priorità e le regole sono in [Eventi](../sviluppatori/eventi.md).

**Annullabile** significa che estende `CancellableEvent`: un handler può chiamare `cancel(by, reason)` e l'azione viene bloccata.

## Core

| Evento | Annullabile | Campi | Quando |
| --- | --- | --- | --- |
| `QrmReadyEvent` | no | | I servizi del Core sono pronti (avvio del server). |
| `PlayerJoinEvent` | no | `playerId` | Un giocatore entra. |
| `PlayerLeaveEvent` | no | `playerId` | Un giocatore esce. |
| `CharacterCreatedEvent` | no | `character` | Dopo la creazione di un personaggio. |
| `CharacterSelectedEvent` | no | `character` | Dopo la selezione. |
| `CharacterArchivedEvent` | no | `character` | Dopo l'archiviazione. |
| `AccountCreatedEvent` | no | `account` | Dopo la creazione di un conto. |
| `TransactionPreEvent` | **sì** | `request()` | Prima di un trasferimento. `setAmount(Money)` cambia l'importo (stessa valuta). |
| `TransactionPostEvent` | no | `transaction` | Dopo un trasferimento riuscito. |
| `JobChangePreEvent` | **sì** | `character()`, `from()`, `toJobId()`, `toGradeId()` | Prima di un cambio di lavoro o grade. |
| `JobChangedEvent` | no | `character`, `before`, `after` | Dopo il cambio. |
| `DutyChangedEvent` | no | `character`, `onDuty`, `reason` | Dopo un cambio di servizio. |
| `PermissionChangedEvent` | no | `character`, `node`, `effect` | Dopo la modifica di un override. |
| `MembershipChangePreEvent` | **sì** | `orgId()`, `character()`, `from()`, `to()` | Prima di un ingresso, cambio rank o uscita. |
| `MembershipChangedEvent` | no | `orgId`, `character`, `before`, `after` | Dopo il cambio. |
| `OrganizationCreatedEvent` | no | `org` | Dopo la creazione. |
| `OrganizationArchivedEvent` | no | `org` | Dopo l'archiviazione. |

## Banca (`qrm_bank`)

| Evento | Annullabile | Campi |
| --- | --- | --- |
| `BankWithdrawEvent` | no | `character`, `amount`, `transaction` |
| `BankDepositEvent` | no | `character`, `amount`, `transaction` |
| `BankTransferEvent` | no | `from`, `toCharacter`, `toOrganization`, `amount`, `note`, `transaction` |

Per intervenire **prima** di un'operazione della banca usa `TransactionPreEvent` e il `reason` della richiesta (`bank.withdraw`, `bank.deposit`, `bank.transfer`). Vedi [API della banca](../sviluppatori/api-banca.md).
