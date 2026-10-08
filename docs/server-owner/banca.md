---
sidebar_label: Banca e ATM
---

# Banca e ATM

Il modulo `qrm_bank` è facoltativo e richiede `qrm`. Aggiunge un conto per personaggio, lo sportello ATM, il contante fisico e i bonifici. A differenza di `qrm`, che sui client è facoltativo, la banca registra un blocco e degli item: va installata su server **e client**, alla stessa versione di QRM.

## Come funziona

- **Conto:** ogni personaggio ha un conto multi-valuta, aperto al primo uso dell'ATM.
- **Contante:** item fisici, uno per taglio e per valuta; il valore sta nella definizione dell'item.
- **Cassa:** un conto dedicato (`BANK_VAULT`) il cui saldo è esattamente il contante in circolazione. Il ritiro lo aumenta, il deposito lo diminuisce. Un deposito oltre il saldo della cassa (contante non emesso dalla banca) viene rifiutato.
- **ATM:** il blocco `qrm_bank:atm` si trova nella creativa, in "Blocchi funzionali", oppure con `/bank atm give`. Il click destro apre una schermata con le schede Conto, Contanti e Bonifico. Il server decide tutto: personaggio attivo, distanza, permessi, limiti e frequenza delle richieste.
- **Bonifici:** a "Nome Cognome" (maiuscole indifferenti) o a `@idOrganizzazione`, con una causale facoltativa fino a 64 caratteri. Se più personaggi hanno lo stesso nome il bonifico è rifiutato come ambiguo. Il destinatario con quel personaggio attivo e online riceve un avviso in chat.
- **Storico:** ogni movimento mostra la controparte e la causale.
- **Sessione ATM:** la schermata si chiude da sola se il blocco viene rotto o ci si allontana oltre `atm.maxDistance`.

## I tagli: `config/qrm_bank/cash.json`

Creato con valori predefiniti al primo avvio. Viene letto una volta all'avvio: **le modifiche richiedono il riavvio**.

```json
{
  "QRM": { "decimals": 2, "denominations": [100, 500, 1000, 5000, 10000] }
}
```

Regole:

- il codice valuta è `[A-Z0-9_]{2,16}`;
- `decimals` va da 0 a 8 e deve coincidere con la valuta registrata in QRM;
- i tagli sono interi maggiori di 0, distinti, in unità minime, e **ognuno multiplo del più piccolo precedente**;
- un file invalido impedisce l'avvio del mod con un messaggio che indica il file.

:::warning
Server e client devono avere lo **stesso `cash.json`**. Gli item dei tagli si registrano in base a questo file: se differisce, il client viene respinto per registro non corrispondente. Distribuiscilo con il modpack.
:::

## Configurazione: `config/qrm_bank-server.toml`

Le modifiche si applicano senza riavvio.

| Chiave | Predefinito | Cosa fa |
| --- | --- | --- |
| `atm.maxDistance` | `6.0` (2–16) | Distanza massima in blocchi dall'ATM aperto. |
| `atm.minIntervalMillis` | `250` (0–5000) | Intervallo minimo fra due richieste dello stesso giocatore. |
| `atm.historyRows` | `20` (1–50) | Movimenti mostrati nello storico. |
| `atm.transfersEnabled` | `true` | Abilita i bonifici dall'ATM. |
| `limits.maxPerOperation` | `100000` | Ritiro massimo per operazione, in unità minime. |
| `limits.maxPerDay` | `500000` | Ritiro massimo nelle ultime 24 ore per personaggio, in unità minime. |
| `limits.overrides` | vuoto | Limiti per valuta, voci `"CODICE:perOperazione:alGiorno"`, per esempio `"EUR:50000:200000"`. |

Il limite giornaliero somma i ritiri delle ultime 24 ore leggendo le 500 transazioni più recenti del conto.

## Permessi

`bank.atm.use` e `bank.transfer` sono **consentiti a tutti salvo un DENY esplicito** sul personaggio, per esempio con `/perm deny <giocatore> bank.transfer`.

## Comandi (operatori)

| Comando | Cosa fa |
| --- | --- |
| `/bank atm give [giocatore]` | Dà un ATM. |
| `/bank balance <Nome Cognome>` | Mostra i saldi di un personaggio. |
| `/bank freeze <Nome Cognome>` | Congela il conto. |
| `/bank unfreeze <Nome Cognome>` | Scongela il conto. |
| `/bank audit` | Controlla la coerenza del registro e confronta il contante dei giocatori online con il saldo della cassa. |

Per dare o togliere denaro a un giocatore ci sono `/money give` e `/money take`, descritti in [Personaggi](personaggi.md).

## Nel pannello staff

Con la banca installata, il [pannello staff](pannello-staff.md) ha la voce **Banca** in *Economy* (nodo `staff.bank`). Serve un giocatore come bersaglio. Mostra lo stato del conto, i saldi e gli ultimi movimenti, e ha sei azioni: **Dai** e **Togli** denaro (come `/money give` e `/money take`), **Congela** e **Scongela**, **Dai ATM** e **Audit**. Il server ricontrolla il permesso a ogni pacchetto e registra ogni azione riuscita nel log.

## Limiti noti

- Il contante non è tracciato per singolo item: un item perso o distrutto lascia denaro nella cassa.
- Il contante duplicato oltre il saldo della cassa non è depositabile, ma può essere speso finché la cassa lo copre. `/bank audit` lo segnala solo per i giocatori online.
- Il nome mostrato sulle banconote usa i decimali di `cash.json`, non quelli della valuta QRM.
- Conti multipli o cointestati, interessi, prestiti e cambio valuta non sono previsti.
