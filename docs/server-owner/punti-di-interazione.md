---
sidebar_label: Punti di interazione
---

# Punti di interazione

Questa pagina descrive come marcare un blocco del mondo perché un Job o un'Organization offra una funzionalità in quel luogo. È rivolta ai server owner e allo staff. Disponibile dalla 0.14.

:::caution Experimental
La funzione è nuova: i comandi e il comportamento possono cambiare tra una minor e l'altra.
:::

## Overview

Un **punto di interazione** è un blocco esistente (di vanilla o di un altro mod) marcato dallo staff. Il blocco non cambia: cambia ciò che succede al click destro. Il punto appartiene a un Job o a un'Organization; solo i Characters autorizzati lo usano.

QRM include un solo tipo di punto, `duty`: un click inverte il servizio del Character. Gli altri tipi li aggiungono i Modules: il Module [Locker](../modules/locker/index.md) (dalla 0.15) aggiunge `locker`, un armadietto personale per Character. Depositi condivisi e gestione del personale non sono ancora disponibili. Vedi [Punti di interazione per sviluppatori](../sviluppatori/servizi/punti.md).

## How it works

Un punto ha: un **tipo**, un **proprietario** (un Job o un'Organization), una **posizione** (dimensione e coordinate del blocco), un **grado minimo** facoltativo, un **nome** facoltativo, una **faccia** per l'icona e un'impostazione di **visibilità**. Un blocco ospita al massimo un punto.

### Chi può usarlo

Un Character usa un punto se tutte queste condizioni sono vere:

1. È il Character attivo del Player ed è `ACTIVE`.
2. Il punto è attivo (vedi sotto).
3. Proprietario **Job**: il Character ha quel Job, l'assegnazione è nota e il `level` del suo Grade è maggiore o uguale a quello del grado minimo, se impostato.
4. Proprietario **Organization**: l'Organization è `ACTIVE`, il Character ne è membro esplicito e il `level` del suo Rank è maggiore o uguale a quello del grado minimo, se impostato. I membri impliciti (un Job collegato, in servizio) non contano.
5. Se il tipo richiede il servizio e il proprietario è un Job, il Character è in servizio. Per le Organizations il requisito non si applica. Il tipo `duty` non lo richiede.

Non c'è un bypass per staff o operatori: un operatore senza il Job giusto non usa il punto. L'accesso dipende da proprietario e livello, non dai nodi Permission, così lo staff configura tutto sul posto.

### Icona e visibilità

Il client mostra sul blocco una targhetta 32×32 in alto a sinistra della faccia vista da fuori. Si disegna sulle quattro facce laterali oppure su una sola, a scelta dello staff. Non si disegna sopra e sotto.

- Con `public off` (predefinito) il server comunica il punto solo ai Players il cui Character attivo può usarlo. Gli altri non lo vedono.
- Con `public on` lo comunica a tutti, ma lo usa solo chi soddisfa le regole sopra.

Il filtro è sul server: un client non riceve mai un punto che non deve vedere. Un client senza il mod QRM non vede l'icona, ma il click funziona lo stesso.

### Punti inattivi

Un punto resta salvato ma **inattivo** (invisibile, non utilizzabile, segnalato da `list` e `info`) se:

- il tipo non è registrato (per esempio il Module è stato rimosso);
- il proprietario non esiste più (Job tolto dai file, Organization archiviata);
- il grado minimo non esiste più nel proprietario;
- la dimensione non esiste;
- il blocco alla posizione è aria.

QRM non cancella mai un punto inattivo: un Module può avervi collegato dei dati. Se la causa sparisce (il Job torna nei file, si rimette un blocco) il punto torna attivo.

### Click e protezione

Al click destro su un punto attivo l'uso normale del blocco è annullato: una cassa marcata non si apre. Il click è gestito una sola volta (la mano secondaria non fa nulla) e c'è un limite di frequenza di 250 ms per Player. Se l'accesso è negato il Player riceve un messaggio.

Rompere un blocco marcato è impedito a chiunque, anche in creative: si rimuove prima il punto. Esplosioni, pistoni e modifiche esterne alla mappa non sono intercettati: se il blocco sparisce, il punto diventa inattivo.

## Usage

I comandi stanno sotto `/qrm admin point` e richiedono il livello operatore. Quelli che agiscono su un blocco usano il blocco **inquadrato**, entro 6 blocchi. Ogni comando riuscito che cambia qualcosa è registrato nel [registro dello staff](pannello-staff.md) con l'azione `cmd.point.create`, `cmd.point.set`, `cmd.point.move` o `cmd.point.remove`.

| Comando | Cosa fa |
| --- | --- |
| `/qrm admin point create <tipo> job <job> [grado]` | Crea un punto del Job sul blocco inquadrato. |
| `/qrm admin point create <tipo> org <org> [rank]` | Crea un punto dell'Organization. |
| `/qrm admin point set grade <grado\|none>` | Cambia il grado minimo del punto inquadrato. `none` apre a tutti i membri. |
| `/qrm admin point set public <true\|false>` | Cambia la visibilità. |
| `/qrm admin point set name <testo\|none>` | Cambia il nome (1–64 caratteri). `none` lo toglie. |
| `/qrm admin point set face <all\|here\|north\|south\|east\|west>` | Sceglie la faccia dell'icona. |
| `/qrm admin point move <id>` | Sposta il punto sul blocco inquadrato. L'id e i dati collegati restano. |
| `/qrm admin point remove [id]` | Rimuove il punto inquadrato, o quello indicato. |
| `/qrm admin point list [job <job>\|org <org>]` | Elenca id, tipo, proprietario, posizione e stato (attivo, o la causa dell'inattività). |
| `/qrm admin point info` | Dettagli del punto inquadrato. |

Il Tab propone i tipi registrati, i Jobs, le Organizations e i gradi del proprietario già scritto.

### Esempio: un timbracartellino di polizia

Si inquadra un blocco nella centrale (il lato che deve mostrare l'icona) e:

```text
/qrm admin point create duty job police
/qrm admin point set name Centrale di polizia
```

Gli agenti con il Job `police` vedono l'icona sul blocco e, cliccandolo, entrano o escono di servizio. Con `/qrm admin point set grade sergeant` solo dal Grade `sergeant` in su.

### Faccia dell'icona

`create` parte dalla faccia che si sta guardando. Se si guarda il blocco dall'alto o dal basso, l'icona è su tutte e quattro le facce laterali. `set face here` usa la faccia inquadrata (con errore se si guarda sopra o sotto), `north|south|east|west` ne fissa una, `all` torna alle quattro.

### Il tipo `duty`

Un click inverte il servizio e il Player riceve «Sei in servizio.» o «Sei fuori servizio.». Funziona anche con `jobs.selfDuty` a `false`: l'opzione governa solo `/duty` e il pulsante dell'hub. È il modo previsto per i server che vogliono entrare in servizio solo sul posto di lavoro.

## Limitations

- Il tipo `duty` è l'unico incluso in QRM. Il tipo `locker` arriva con il Module Locker. Depositi condivisi e gestione del personale non sono ancora disponibili.
- Un tipo di punto accetta solo i proprietari che dichiara: `duty` accetta solo Jobs.
- L'icona si disegna solo sulle facce laterali e solo per il tipo `duty` ha una grafica propria; gli altri tipi usano un'icona generica.
- Non c'è una schermata staff per i punti: si usano i comandi.
- Non si può cambiare per il singolo punto se il tipo richiede il servizio.
- Un Player riceve al massimo 512 punti; gli altri non vengono comunicati.
- I punti senza blocco (coordinate nel vuoto) e l'interazione con entità o NPC non sono disponibili.

## Related

- [Jobs](lavori.md)
- [Organizations](organizzazioni.md)
- [Pannello staff](pannello-staff.md)
- [Punti di interazione per sviluppatori](../sviluppatori/servizi/punti.md)
