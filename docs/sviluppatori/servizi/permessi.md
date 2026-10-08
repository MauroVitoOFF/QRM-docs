---
sidebar_label: Permessi
---

# Permessi

I permessi di gioco sono **nodi** stringa, come `police.arrest`, valutati per **personaggio**. `PermissionService` li risolve; `PermissionNodes` li valida.

```java
PermissionService perms = QRM.get(PermissionService.class);
if (perms.has(characterId, "police.arrest")) { /* ... */ }
```

## Forma dei nodi

- Un nodo esatto è `[a-z0-9_]+` separato da punti, fino a 128 caratteri (`PermissionNodes.isExactNode`).
- Un *pattern* può finire con `.*` (`police.*`) oppure essere `*` da solo (`PermissionNodes.isPattern`).
- `PermissionNodes.requirePattern(s)` restituisce `s` o lancia `IllegalArgumentException`.

## Da dove arrivano

- **Dal lavoro:** i nodi del grade, ereditati dai grade inferiori, valgono solo mentre il personaggio è in servizio.
- **Override per personaggio:** `grant` e `deny`, anche con pattern.

## Come si risolvono

- L'override più specifico vince.
- A parità di specificità vince `deny`.
- Un override batte sempre i nodi del lavoro.

## Il servizio

| Metodo | Cosa fa |
| --- | --- |
| `has(CharacterId, node)` | Il personaggio ha il nodo? |
| `effective(CharacterId)` | L'insieme dei nodi effettivi. |
| `grant`, `deny`, `clear` `(CharacterId, node)` | Imposta o rimuove un override. Un pattern non valido lancia `IllegalArgumentException`. |
| `overridesOf(CharacterId)` | Gli override, come mappa nodo → `PermissionEffect` (`GRANT`, `DENY`, `CLEARED`). |

`PermissionChangedEvent(character, node, effect)` parte dopo ogni modifica.

## Permessi "concessi per impostazione predefinita"

`PermissionService` non ha il concetto di "consentito a tutti". Se vuoi un nodo permesso di base e negabile (come fa la banca con `bank.atm.use`), controlla l'assenza di un `DENY`:

```java
boolean allowed = permissions.overridesOf(character).get("mymod.use") != PermissionEffect.DENY;
```

## Permessi dello staff

Il pannello staff usa un sistema separato, per **account** e non per personaggio: vedi [Staff](staff.md).
