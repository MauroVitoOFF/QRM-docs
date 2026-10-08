---
sidebar_label: Organizzazioni
---

# Organizzazioni

Un'organizzazione ha un id, un'etichetta, dei **rank** personalizzati (con livello e nodi di permesso), dei **membri** e un **conto in comune** multi-valuta (titolare `OwnerRef("ORGANIZATION", …)`). Un personaggio può stare in più organizzazioni.

Si creano **solo a runtime** (API o comandi), non da file, e non si cancellano: si **archiviano** e il loro conto viene congelato.

```java
OrganizationService orgs = QRM.get(OrganizationService.class);
orgs.create("acme", "Acme");
orgs.defineRank("acme", new Rank("boss", "Capo", 5, Set.of("org.account.withdraw", "shop.*")));
orgs.addMember("acme", characterId, "boss");
if (orgs.can(characterId, "acme", "shop.refund")) { /* ... */ }
```

## Il servizio

| Metodo | Cosa fa |
| --- | --- |
| `create(id, label)`, `find(id)`, `all()`, `archive(id)` | Ciclo di vita. |
| `defineRank(orgId, Rank)`, `removeRank(orgId, rankId)`, `ranksOf(orgId)` | Gestione dei rank. |
| `addMember(orgId, character, rankId)`, `setRank(...)`, `removeMember(...)` | Gestione dei membri. |
| `membersOf(orgId)`, `organizationsOf(character)` | Interrogazioni. |
| `can(character, orgId, node)` | Il personaggio ha quel nodo nell'organizzazione? **Solo nodi esatti, mai jolly.** |

I metodi che possono fallire restituiscono `OrgResult<T>`, **sealed**: `Ok(value)` o `Failed(OrgError)`. Fai uno `switch` esaustivo sugli errori: `UnknownOrg`, `Archived`, `Exists`, `UnknownRank`, `RankInUse`, `LevelTaken`, `UnknownCharacter`, `NotUsable`, `AlreadyMember`, `NotMember`, `Cancelled`.

## Rank e nodi

- I rank **ereditano** i nodi dei rank con `level` inferiore della stessa organizzazione.
- `*` e `x.*` sono ammessi nei rank.
- Il nodo `org.account.withdraw` ha un significato definito dal Core (prelievo dal conto). Per convenzione i nodi `org.*` sono riservati al Core: i tuoi moduli usano il proprio prefisso.

## Organizzazione collegata a un lavoro

Un lavoro può dichiarare `"org": "<id>"` (nel file JSON o con `new JobDefinition(id, label, grades, orgId)`). Chi ha quel lavoro, **in servizio**, è membro **implicito**: `can` usa i nodi del suo grade (`PermissionService.has`). I membri impliciti non compaiono in `membersOf` ma sì in `organizationsOf`. L'organizzazione indicata può non esistere ancora quando il lavoro viene registrato.

## Prelievi dal conto

```java
BankResult r = QRM.get(OrganizationBankService.class)
        .transfer(by, orgId, toAccount, money, "org:" + orgId + ":rimborso:" + id);
```

Richiede il nodo `org.account.withdraw` (`OrganizationBankService.WITHDRAW_NODE`) e poi delega a `TransactionService`. `BankResult` è **sealed**: `Transferred(result)`, `Denied(node)`, `Failed(error)`. I depositi sono trasferimenti normali verso `Organization.account()`.

- Chi usa `TransactionService` direttamente non è controllato.
- Lo spazio delle `idempotencyKey` è globale: usa un prefisso come `"org:<orgId>:<scopo>:<id>"`.
- Il conto è sempre `Organization.account()`: non cercarlo con `accountsOf(Organization.ownerOf(id))`.
- Un override globale `GRANT` (`*` o `org.*`) e un pattern `*` in un rank o grade includono `org.account.withdraw`; un `DENY` globale blocca solo il ramo implicito da lavoro.
- Il Core non paga stipendi dal conto dell'organizzazione: lo fa un modulo.

## Eventi

| Evento | Quando |
| --- | --- |
| `MembershipChangePreEvent` (annullabile) | Prima di ogni ingresso, cambio rank o uscita: `orgId()`, `character()`, `from()`, `to()`. |
| `MembershipChangedEvent(orgId, character, before, after)` | Dopo il cambio. |
| `OrganizationCreatedEvent(org)`, `OrganizationArchivedEvent(org)` | Dopo creazione e archiviazione. |
