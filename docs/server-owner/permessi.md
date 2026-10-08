---
sidebar_label: Permissions
---

# Permissions

Questa pagina descrive come funzionano le Permissions di gioco e come assegnarle. È rivolta ai server owner. Disponibile dalla 0.2.

## Overview

Una Permission è un **nodo**, una stringa come `police.arrest`, valutata per Character. Il nodo ha la forma `[a-z0-9_]+` separato da punti, fino a 128 caratteri. Un *pattern* può finire con `.*` (`police.*`) oppure essere `*` da solo.

Le Permissions dello staff sono un sistema separato, per account e non per Character: vedi [Pannello staff](pannello-staff.md).

## How it works

Un Character ottiene una Permission da due sorgenti:

- **dal Job:** i nodi del Grade, e dei Grades inferiori, valgono solo mentre il Character è in servizio;
- **da un override:** un operatore può concedere (`grant`) o negare (`deny`) un nodo a un singolo Character, anche con pattern.

Regole di risoluzione:

- l'override più specifico vince;
- a parità di specificità vince `deny`;
- un override batte sempre i nodi del Job.

## Usage

| Comando | Cosa fa |
| --- | --- |
| `/perm grant <player> <node>` | Concede il nodo al Character attivo. |
| `/perm deny <player> <node>` | Nega il nodo. |
| `/perm clear <player> <node>` | Rimuove l'override. |

`<node>` può contenere il jolly (`police.*`). I comandi sono solo per operatori. Resta valida anche la forma `/qrm admin perm …`.

## Limitations

- Non esiste un nodo "consentito a tutti per impostazione predefinita": un Module che lo vuole controlla l'assenza di un `DENY`, come fa la banca per `bank.atm.use` e `bank.transfer`.
- Gli override agiscono sul Character attivo del Player.

## Related

- [Jobs](lavori.md)
- [Organizations](organizzazioni.md)
- [Nodi di Permission (riferimento)](../riferimento/nodi-permesso.md)
- [Permissions per sviluppatori](../sviluppatori/servizi/permessi.md)
