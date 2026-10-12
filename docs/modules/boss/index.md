---
sidebar_label: Boss
---

# Boss

Questa pagina descrive il Module `qrm_boss`: cosa fa e come funziona. È rivolta ai server owner. Disponibile dalla 0.19 (la gestione dei membri tramite il grado del Job dalla 0.20). Stato: Experimental.

## Overview

`qrm_boss` è il **menu del boss aziendale**: una schermata a tema QRM con cui chi ha i Permissions giusti gestisce la propria Organization senza comandi. Ha tre sezioni:

| Sezione | Cosa mostra | Permission |
| --- | --- | --- |
| Panoramica | Nome e stato dell'azienda, il tuo rank o grado, numero di membri, saldo. | `boss.menu` |
| Membri | Elenco dei membri; aggiungere, promuovere, declassare, licenziare. | `boss.members.manage` |
| Conto | Saldo, deposito e prelievo. | `boss.bank.view`, `boss.bank.deposit`, `org.account.withdraw` |

Si apre in due modi: con il comando `/boss [azienda]` e con una **scrivania del boss**, un [punto di interazione](../../server-owner/punti-di-interazione.md) di tipo `boss_desk` che lo staff piazza su un blocco.

Richiede `qrm` (stessa versione del Module) e va installato su server **e client**: senza il mod sul client il menu non si apre. Un client senza il Module entra comunque nel server.

## How it works

- **Chi è il boss:** non esiste un ruolo speciale. È boss chi ha i nodi `boss.*` nell'azienda, tramite il Rank (Organization) oppure tramite il Grade del Job collegato. Il server **ricontrolla il nodo a ogni azione**: un client modificato non ottiene nulla.
- **Sezioni visibili:** si vedono solo quelle per cui hai un nodo. La sezione Conto compare con almeno uno tra `boss.bank.view`, `boss.bank.deposit` e `org.account.withdraw`; le azioni non permesse restano visibili ma disattivate. Senza `boss.bank.view` il saldo è nascosto.
- **Più aziende:** `/boss` senza argomento apre il menu se hai `boss.menu` in una sola azienda; se ne hai più di una, mostra un selettore. Con `/boss <azienda>` il Tab propone solo le tue.
- **Scrivania:** il tipo `boss_desk` accetta solo Organizations come proprietario e non richiede il servizio. Chi può usare il punto lo decide il Core; poi il Module ricontrolla `boss.menu`.
- **Stato:** il Module non ha tabelle né dati propri. Il server manda uno snapshot completo dopo ogni azione e il client lo mostra, senza applicare nulla in locale.
- **Frequenza:** le richieste di un Player sono limitate (una ogni 250 ms circa): un doppio clic non esegue due volte.

### Membri

Come si gestiscono dipende dall'azienda.

**Azienda con un Job** (ogni [Job dei file](../../server-owner/lavori.md) ha la sua Organization con lo stesso id):

- i membri sono i Characters con quel Job, anche fuori servizio, e i "rank" sono i **Grades**;
- **Aggiungi** assegna il Grade più basso che puoi dare; **Promuovi** e **Declassa** cambiano il Grade; **Licenzia** toglie il Job;
- il boss non ha bisogno di appartenere all'Organization: basta un Grade con `boss.*` e `/duty on` (fuori servizio il menu non si apre);
- si possono assumere solo Characters senza lavoro: chi ha già un altro Job riceve «Questa persona ha già un lavoro.».

**Azienda senza Job** (gang, gruppi creati con `/org create`): i membri sono quelli dell'Organization e si usano i suoi Ranks. Serve un'appartenenza esplicita con un Rank.

In entrambi i casi valgono le stesse regole:

- si agisce solo su membri di livello **pari o inferiore** al proprio e mai su se stessi;
- si assegnano solo livelli pari o inferiori al proprio;
- i candidati da aggiungere sono i Characters attivi dei Players **online** che non sono già membri;
- licenziare chiede una seconda conferma («Conferma?»);
- chi arriva al menu senza un livello (per esempio con un Rank esplicito in un'azienda gestita da Job) vede i membri in sola lettura.

### Conto

- **Deposito:** trasferimento dal conto personale del Character al conto dell'azienda, con causale «Deposito aziendale».
- **Prelievo:** dal conto dell'azienda al conto personale; il Core controlla `org.account.withdraw`.
- **Importi:** 500, 25%, 50%, Tutto o un valore libero. Le percentuali si calcolano sul saldo di partenza (personale per il deposito, aziendale per il prelievo) e si arrotondano per difetto. Importi nulli, negativi o oltre il saldo non muovono nulla.
- **Conto personale:** se il Character non ne ha uno, il deposito dà errore e non lo crea (lo apre la banca al primo uso).
- **Currency:** una sola, la prima registrata.
- Ogni operazione è una Transaction registrata dal Core, con chiave di idempotenza.

## Usage

1. Installa `qrm_boss` in `mods/` del server **e dei client**, alla stessa versione di `qrm`.
2. Dai i nodi al grado del boss. Con un Job, nel file del Job:

```json
{ "id": "boss", "label": "Titolare", "level": 4,
  "permissions": ["mechanic.*", "boss.*", "org.account.*"] }
```

   Per un'Organization senza Job: `/org rank set <org> boss 30 boss.* org.account.*`. Per un vice che assume ma non tocca i soldi: solo `boss.menu boss.members.manage`.

3. Il boss scrive `/boss` (in servizio, se il suo Grade viene da un Job).
4. Facoltativo, la scrivania: inquadra un blocco e scrivi `/qrm admin point create boss_desk org <org>`.

Passo per passo con un Job: [Guida: creare un Job](../../server-owner/guida-creare-un-job.md).

### Comandi

| Comando | Chi | Cosa fa |
| --- | --- | --- |
| `/boss` | Players | Apre il menu (o il selettore se hai più aziende). |
| `/boss <azienda>` | Players | Apre il menu di quell'azienda. |

### Permissions

| Nodo | Effetto |
| --- | --- |
| `boss.menu` | Apre il menu e mostra la Panoramica. |
| `boss.members.manage` | Mostra la sezione Membri e abilita le azioni. |
| `boss.bank.view` | Mostra il saldo. |
| `boss.bank.deposit` | Abilita il deposito. |
| `org.account.withdraw` | Abilita il prelievo (nodo del Core). |

`boss.*` concede tutti i nodi `boss.`; per il prelievo serve anche `org.account.*` (o `org.account.withdraw`).

## Limitations

- Fuori dalla prima versione: i punti di interazione dell'azienda, l'editor dei Ranks e dei loro Permissions, lo storico delle Transactions e il registro delle azioni del boss, il selettore di Currency e i conti multipli, i trasferimenti dell'azienda verso conti diversi dal personale, l'apertura dall'hub.
- Si possono aggiungere solo Players online.
- Un Job non può essere "rubato": chi ha già un altro lavoro va prima licenziato dall'altra azienda o dallo staff.
- Il Module non ha file di configurazione né un'API pubblica: usa solo `qrm-api` e `qrm-client-api`.
- Il Module è `0.x` come il resto di QRM: comandi, nodi e comportamento possono cambiare tra una minor e l'altra ([Versioni e stabilità](../../intro/stabilita.md)).

## Related

- [Guida: creare un Job](../../server-owner/guida-creare-un-job.md)
- [Jobs](../../server-owner/lavori.md)
- [Organizations](../../server-owner/organizzazioni.md)
- [Punti di interazione](../../server-owner/punti-di-interazione.md)
- [Modules ufficiali](../index.md)
