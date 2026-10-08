---
sidebar_label: Organizzazioni
---

# Organizzazioni

Un'organizzazione ha un id, un'etichetta, dei **rank** personalizzati (con livello e nodi di permesso), dei **membri** e un **conto in comune** multi-valuta. Un personaggio può stare in più organizzazioni.

- Si creano solo a runtime (comandi o API), non da file.
- Non si cancellano: si **archiviano** e il loro conto viene congelato.
- I rank ereditano i nodi dei rank con `level` inferiore della stessa organizzazione.
- Il nodo `org.account.withdraw` controlla i prelievi dal conto dell'organizzazione.
- Il Core non paga stipendi dal conto dell'organizzazione: lo fa un modulo.

Un lavoro può collegarsi a un'organizzazione (`"org": "<id>"` nel file del [lavoro](lavori.md)): chi ha quel lavoro, in servizio, è membro implicito e usa i nodi del proprio grade.

## Comandi

| Comando | Chi | Cosa fa |
| --- | --- | --- |
| `/org` (o `/org list`) | giocatori | Elenca le organizzazioni del personaggio attivo. |
| `/org info <org>` | membri e operatori | Mostra i dettagli dell'organizzazione. |
| `/org create <id> <nome>` | operatori | Crea un'organizzazione. |
| `/org archive <id>` | operatori | Archivia l'organizzazione. |
| `/org rank set <org> <rank> <livello> [nodi…]` | operatori | Crea o modifica un rank. L'etichetta coincide con l'id. |
| `/org rank remove <org> <rank>` | operatori | Rimuove un rank. |
| `/org member add <org> <giocatore> <rank>` | operatori | Aggiunge un membro. |
| `/org member setrank <org> <giocatore> <rank>` | operatori | Cambia il rank di un membro. |
| `/org member remove <org> <giocatore>` | operatori | Rimuove un membro. |

Il Tab propone le organizzazioni esistenti e i loro rank. I sottocomandi per operatori non compaiono agli altri giocatori. Restano validi anche `/qrm org list|info` e `/qrm admin org …`.
