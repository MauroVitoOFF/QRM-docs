---
sidebar_label: Eventi
---

# Eventi

Questa pagina elenca tutti gli eventi di QRM (`dev.qrm.api…`) e del Module Bank (`dev.qrm.bank.api`). Come registrare un handler, le priorità e le regole sono in [Eventi](../sviluppatori/eventi.md).

**Annullabile** significa che l'evento estende `CancellableEvent`: un handler può chiamare `cancel(by, reason)` e l'azione viene bloccata.

## Core

| Evento | Annullabile | Campi | Quando |
| --- | --- | --- | --- |
| `QrmReadyEvent` | no | | I servizi del Core sono pronti (avvio del server). |
| `PlayerJoinEvent` | no | `playerId` | Un Player entra. |
| `PlayerLeaveEvent` | no | `playerId` | Un Player esce. |
| `CharacterCreatedEvent` | no | `character` | Dopo la creazione di un Character. |
| `CharacterSelectedEvent` | no | `character` | Dopo la selezione. |
| `CharacterArchivedEvent` | no | `character` | Dopo l'archiviazione. |
| `AccountCreatedEvent` | no | `account` | Dopo la creazione di un Account. |
| `TransactionPreEvent` | **sì** | `request()` | Prima di un trasferimento. `setAmount(Money)` cambia l'importo (stessa Currency). |
| `TransactionPostEvent` | no | `transaction` | Dopo un trasferimento riuscito. |
| `JobChangePreEvent` | **sì** | `character()`, `from()`, `toJobId()`, `toGradeId()` | Prima di un cambio di Job o Grade. |
| `JobChangedEvent` | no | `character`, `before`, `after` | Dopo il cambio. |
| `DutyChangedEvent` | no | `character`, `onDuty`, `reason` | Dopo un cambio di servizio. |
| `MuteChangedEvent` | no | `player` | Dopo `mute` e `unmute` di `ModerationService` (0.13). Non parte quando un mute a tempo scade da solo. |
| `PointCreatedEvent` | no | `point` | Dopo la creazione di un punto di interazione (0.14). |
| `PointChangedEvent` | no | `before`, `after` | Dopo la modifica o lo spostamento di un punto (0.14). |
| `PointRemovedEvent` | no | `point` | Dopo la rimozione di un punto (0.14). |
| `PermissionChangedEvent` | no | `character`, `node`, `effect` | Dopo la modifica di un override. |
| `MembershipChangePreEvent` | **sì** | `orgId()`, `character()`, `from()`, `to()` | Prima di un ingresso, cambio Rank o uscita. |
| `MembershipChangedEvent` | no | `orgId`, `character`, `before`, `after` | Dopo il cambio. |
| `OrganizationCreatedEvent` | no | `org` | Dopo la creazione. |
| `OrganizationArchivedEvent` | no | `org` | Dopo l'archiviazione. |

## Bank (`qrm_bank`)

| Evento | Annullabile | Campi |
| --- | --- | --- |
| `BankWithdrawEvent` | no | `character`, `amount`, `transaction` |
| `BankDepositEvent` | no | `character`, `amount`, `transaction` |
| `BankTransferEvent` | no | `from`, `toCharacter`, `toOrganization`, `amount`, `note`, `transaction` |

Per intervenire **prima** di un'operazione di Bank usa `TransactionPreEvent` e il `reason` della richiesta (`bank.withdraw`, `bank.deposit`, `bank.transfer`). Vedi [API di Bank](../modules/bank/api.md).

## Related

- [Eventi (sviluppatori)](../sviluppatori/eventi.md)
- [API di Bank](../modules/bank/api.md)
