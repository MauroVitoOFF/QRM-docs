---
sidebar_label: Permissions
---

# Permissions

Questa pagina documenta `PermissionService` e `PermissionNodes`. È rivolta agli sviluppatori di Modules. Per l'uso lato server vedi [Permissions](../../server-owner/permessi.md).

:::caution Experimental
API `0.x` (dalla 0.2): può cambiare tra una minor e l'altra.
:::

## Overview

Le Permissions di gioco sono **nodi** stringa, come `police.arrest`, valutati per **Character**. `PermissionService` li risolve; `PermissionNodes` li valida.

```java
PermissionService perms = QRM.get(PermissionService.class);
if (perms.has(characterId, "police.arrest")) { /* ... */ }
```

## How it works

### Forma dei nodi

- Un nodo esatto è `[a-z0-9_]+` separato da punti, fino a 128 caratteri (`PermissionNodes.isExactNode`).
- Un *pattern* può finire con `.*` (`police.*`) oppure essere `*` da solo (`PermissionNodes.isPattern`).
- `PermissionNodes.requirePattern(s)` restituisce `s` o lancia `IllegalArgumentException`.

### Sorgenti e risoluzione

- **Dal Job:** i nodi del Grade, ereditati dai Grades inferiori, valgono solo mentre il Character è in servizio.
- **Override per Character:** `grant` e `deny`, anche con pattern.
- L'override più specifico vince; a parità di specificità vince `deny`; un override batte sempre i nodi del Job.

## API

| Metodo | Cosa fa |
| --- | --- |
| `has(CharacterId, node)` | Il Character ha il nodo? |
| `effective(CharacterId)` | L'insieme dei nodi effettivi. |
| `grant`, `deny`, `clear` `(CharacterId, node)` | Imposta o rimuove un override. Un pattern non valido lancia `IllegalArgumentException`. |
| `overridesOf(CharacterId)` | Gli override, come mappa nodo → `PermissionEffect` (`GRANT` o `DENY`). `CLEARED` compare solo in `PermissionChangedEvent`, quando un override viene rimosso. |

`PermissionChangedEvent(character, node, effect)` parte dopo ogni modifica.

## Examples

`PermissionService` non ha il concetto di "consentito a tutti". Per un nodo consentito di base ma negabile (come `bank.atm.use` di Bank), controlla l'assenza di un `DENY`:

```java
boolean allowed = permissions.overridesOf(character).get("mymod.use") != PermissionEffect.DENY;
```

## Limitations

- Non esiste una Permission "consentita per impostazione predefinita": vedi l'esempio sopra.
- Le Permissions dello staff sono un sistema separato, per account: vedi [Staff](staff.md).

## Related

- [Jobs](lavori.md)
- [Organizations](organizzazioni.md)
- [Staff](staff.md)
- [Nodi di Permission (riferimento)](../../riferimento/nodi-permesso.md)
