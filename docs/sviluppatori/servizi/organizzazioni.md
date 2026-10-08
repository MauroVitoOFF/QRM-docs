---
sidebar_label: Organizations
---

# Organizations

Questa pagina documenta `OrganizationService` e `OrganizationBankService`. È rivolta agli sviluppatori di Modules. Per i comandi lato server vedi [Organizations](../../server-owner/organizzazioni.md).

:::caution Experimental
API `0.x` (dalla 0.3): può cambiare tra una minor e l'altra.
:::

## Overview

Un'Organization ha un id, un'etichetta, dei **Ranks** (con livello e Permissions), dei **membri** e un **Account** in comune multi-Currency (titolare `OwnerRef("ORGANIZATION", …)`). Un Character può stare in più Organizations.

## How it works

- Le Organizations si creano solo a runtime (API o comandi), non da file, e non si cancellano: si **archiviano** e il loro Account viene congelato.
- I Ranks **ereditano** i Permissions dei Ranks con `level` inferiore della stessa Organization. `*` e `x.*` sono ammessi nei Ranks.
- Il nodo `org.account.withdraw` ha un significato definito dal Core (prelievo dall'Account). Per convenzione i nodi `org.*` sono riservati al Core: i tuoi Modules usano il proprio prefisso.
- Un Job può dichiarare `"org": "<id>"` (nel file JSON o con `new JobDefinition(id, label, grades, orgId)`). Chi ha quel Job, **in servizio**, è membro **implicito**: `can` usa i nodi del suo Grade (`PermissionService.has`). I membri impliciti non compaiono in `membersOf` ma sì in `organizationsOf`. L'Organization indicata può non esistere ancora quando il Job viene registrato.

## Usage

```java
OrganizationService orgs = QRM.get(OrganizationService.class);
orgs.create("acme", "Acme");
orgs.defineRank("acme", new Rank("boss", "Capo", 5, Set.of("org.account.withdraw", "shop.*")));
orgs.addMember("acme", characterId, "boss");
if (orgs.can(characterId, "acme", "shop.refund")) { /* ... */ }
```

### Prelievi dall'Account

```java
BankResult r = QRM.get(OrganizationBankService.class)
        .transfer(by, orgId, toAccount, money, "org:" + orgId + ":refund:" + id);
```

Richiede il nodo `org.account.withdraw` (`OrganizationBankService.WITHDRAW_NODE`) e poi delega a `TransactionService`. `BankResult` è **sealed**: `Transferred(result)`, `Denied(node)`, `Failed(error)`. I depositi sono Transactions normali verso `Organization.account()`.

- Chi usa `TransactionService` direttamente non è controllato.
- Lo spazio delle `idempotencyKey` è globale: usa un prefisso come `"org:<orgId>:<scope>:<id>"`.
- L'Account è sempre `Organization.account()`: non cercarlo con `accountsOf(Organization.ownerOf(id))`.
- Un override globale `GRANT` (`*` o `org.*`) e un pattern `*` in un Rank o Grade includono `org.account.withdraw`; un `DENY` globale blocca solo il ramo implicito da Job.

## API

| Metodo di `OrganizationService` | Cosa fa |
| --- | --- |
| `create(id, label)`, `find(id)`, `all()`, `archive(id)` | Ciclo di vita. |
| `defineRank(orgId, Rank)`, `removeRank(orgId, rankId)`, `ranksOf(orgId)` | Gestione dei Ranks. |
| `addMember(orgId, character, rankId)`, `setRank(...)`, `removeMember(...)` | Gestione dei membri. |
| `membersOf(orgId)`, `organizationsOf(character)` | Interrogazioni. |
| `can(character, orgId, node)` | Il Character ha quel nodo nell'Organization? **Solo nodi esatti, mai jolly.** |

I metodi che possono fallire restituiscono `OrgResult<T>`, **sealed**: `Ok(value)` o `Failed(OrgError)`. Gli errori sono `UnknownOrg`, `Archived`, `Exists`, `UnknownRank`, `RankInUse`, `LevelTaken`, `UnknownCharacter`, `NotUsable`, `AlreadyMember`, `NotMember`, `Cancelled`.

### Eventi

| Evento | Quando |
| --- | --- |
| `MembershipChangePreEvent` (annullabile) | Prima di ogni ingresso, cambio Rank o uscita: `orgId()`, `character()`, `from()`, `to()`. |
| `MembershipChangedEvent(orgId, character, before, after)` | Dopo il cambio. |
| `OrganizationCreatedEvent(org)`, `OrganizationArchivedEvent(org)` | Dopo creazione e archiviazione. |

## Limitations

- Le Organizations non si cancellano e non si definiscono da file.
- Il Core non paga stipendi dall'Account dell'Organization: lo fa un Module.
- `can` non accetta pattern.

## Related

- [Jobs](lavori.md)
- [Permissions](permessi.md)
- [Economy](economia.md)
- [Organizations per server owner](../../server-owner/organizzazioni.md)
