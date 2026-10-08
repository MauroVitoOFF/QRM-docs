---
sidebar_label: Permessi
---

# Permessi

I permessi di gioco sono **nodi** stringa, come `police.arrest`: lettere minuscole, cifre e `_`, separati da punti, fino a 128 caratteri. Un *pattern* può finire con `.*` (`police.*`) oppure essere `*` da solo.

## Da dove arrivano

- **Dal lavoro:** i nodi del grade (e dei grade inferiori) valgono solo mentre il personaggio è in servizio.
- **Override per personaggio:** un operatore può concedere (`grant`) o negare (`deny`) un nodo a un singolo personaggio, anche con pattern.

## Come si risolvono

- L'override più specifico vince.
- A parità di specificità vince `deny`.
- Un override batte sempre i nodi del lavoro.

## Comandi

| Comando | Cosa fa |
| --- | --- |
| `/perm grant <giocatore> <nodo>` | Concede il nodo al personaggio attivo. |
| `/perm deny <giocatore> <nodo>` | Nega il nodo. |
| `/perm clear <giocatore> <nodo>` | Rimuove l'override. |

Il nodo può contenere il jolly: `police.*`. Solo per operatori. Resta valida anche la forma `/qrm admin perm …`.

## Permessi dello staff

I permessi del [pannello staff](pannello-staff.md) sono un sistema separato: sono per **account**, non per personaggio, e usano nodi `staff.*`.
