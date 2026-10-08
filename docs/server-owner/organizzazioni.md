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
| `/qrm org list` | giocatori | Elenca le organizzazioni. |
| `/qrm org info <org>` | membri e operatori | Mostra i dettagli dell'organizzazione. |
| `/qrm admin org create <id> <nome>` | operatori | Crea un'organizzazione. |
| `/qrm admin org archive <id>` | operatori | Archivia l'organizzazione. |
| `/qrm admin org rank set <org> <rank> <livello> [nodi…]` | operatori | Crea o modifica un rank. L'etichetta coincide con l'id. |
| `/qrm admin org rank remove <org> <rank>` | operatori | Rimuove un rank. |
| `/qrm admin org member add <org> <giocatore> <rank>` | operatori | Aggiunge un membro. |
| `/qrm admin org member setrank <org> <giocatore> <rank>` | operatori | Cambia il rank di un membro. |
| `/qrm admin org member remove <org> <giocatore>` | operatori | Rimuove un membro. |
