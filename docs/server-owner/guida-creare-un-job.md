---
sidebar_label: "Guida: creare un Job"
---

# Guida: creare un Job

Questa guida porta dal file vuoto a un Job funzionante, con un capo e dei dipendenti. L'esempio è un'officina meccanica. È rivolta ai server owner. Per il riferimento completo vedi [Jobs](lavori.md) e [Organizations](organizzazioni.md).

## Overview

Alla fine avrai:

- un Job `mechanic` con tre Grades: apprendista, meccanico e titolare;
- la sua [Organization](organizzazioni.md) `mechanic`, con il conto aziendale, creata in automatico;
- un titolare che gestisce i dipendenti, e dei dipendenti che entrano ed escono di servizio.

Servono i permessi di operatore e l'accesso alla cartella del mondo del server.

## Passo 1: scrivere il file del Job

Crea `<world>/qrm/data/jobs/mechanic.json`:

```json
{
  "id": "mechanic",
  "label": "Meccanico",
  "grades": [
    { "id": "apprentice", "label": "Apprendista", "level": 1,
      "permissions": ["mechanic.repair"],
      "salary": { "currency": "QRM", "amount": "900.00" } },
    { "id": "mechanic", "label": "Meccanico", "level": 2,
      "permissions": ["mechanic.tune"],
      "salary": { "currency": "QRM", "amount": "1500.00" } },
    { "id": "boss", "label": "Titolare", "level": 4,
      "permissions": ["mechanic.*", "boss.*", "org.account.*"],
      "salary": { "currency": "QRM", "amount": "2500.00" } }
  ]
}
```

Le regole da ricordare:

- `id` del Job e dei Grades: minuscolo, inizia con una lettera, solo lettere, cifre e `_`, al massimo 32 caratteri. L'`id` del Job è anche l'id della sua Organization.
- `label`: da 1 a 64 caratteri.
- `level`: ogni Grade ha un livello diverso. Un Grade **eredita** i Permissions dei Grades con livello inferiore, quindi il meccanico ha anche `mechanic.repair`.
- `permissions`: nodi a tua scelta, per esempio `mechanic.repair`. Valgono **solo in servizio**. Il jolly `mechanic.*` li concede tutti.
- `salary` è facoltativo. La Currency (qui `QRM`) deve già esistere (vedi [Economia](economia.md)): se non esiste, il file viene scartato e l'errore compare nel log. Il Core non paga gli stipendi: lo fa un Module.
- Non scrivere la chiave `"org"`: dalla 0.19 non serve e viene ignorata con un avviso.

## Passo 2: riavviare il server

I file dei Jobs si leggono all'avvio del server. Dopo ogni modifica **riavvia**. Nel log trovi `QRM started (… jobs)` e, se un file non è valido, una riga di errore con il nome del file.

All'avvio il Core crea anche l'Organization `mechanic`, con il suo conto, se non esiste già.

## Passo 3: assegnare il titolare

Con il Player online e un Character attivo:

```
/job set <player> mechanic boss
```

Il Tab propone i Jobs esistenti e poi i Grades del Job scelto. Il Player controlla con `/job`:

```
Lavoro: Meccanico - Titolare  (fuori servizio)
```

Per usare i Permissions del Grade deve mettersi in servizio con `/duty on`. Se hai impostato `jobs.selfDuty` a `false` ([Configurazione](configurazione.md)), il servizio si gestisce con un punto di interazione (passo 5).

## Passo 4: assegnare i dipendenti

```
/job set <player> mechanic apprentice
/job set <player> mechanic mechanic
```

Un Character ha un solo Job per volta: assegnarne un altro sostituisce il primo. Per licenziare:

```
/job remove <player>
```

Con il Module Boss, un titolare in servizio può assumere, promuovere e licenziare da solo dal menu `/boss`, senza comandi dello staff. Il menu mostra solo i dipendenti di livello pari o inferiore al suo e assegna Grades che non superano il suo. Il Module è ancora in sviluppo.

## Passo 5: i punti di interazione (facoltativo)

Per far entrare e uscire di servizio dal blocco giusto, guarda il blocco e scrivi:

```
/qrm admin point create duty job mechanic
```

Per un grado minimo: `/qrm admin point create duty job mechanic mechanic`. Vedi [Punti di interazione](punti-di-interazione.md) per le altre opzioni.

## Verifica

1. Il titolare scrive `/job`: vede Job e Grade corretti.
2. Dopo `/duty on`, i nodi del Grade sono attivi. Lo vedi dai Permissions elencati in `/job`.
3. `/org info mechanic` mostra l'Organization e il suo saldo.
4. L'apprendista ha solo `mechanic.repair`; il titolare ha anche `boss.*`.

## Problemi comuni

| Sintomo | Causa |
| --- | --- |
| `Lavoro sconosciuto` in `/job set` | Il file non è stato letto: controlla il log all'avvio e riavvia. |
| `Grado sconosciuto` | L'`id` del Grade non coincide con quello del file. |
| Il file viene scartato | Currency del `salary` inesistente, `level` duplicati o `id` non valido: il motivo è nel log. |
| I Permissions non funzionano | Il Character è fuori servizio (`/duty on`). |
| `/duty` risponde "Il servizio si gestisce in azienda." | `jobs.selfDuty` è `false`: serve un punto di tipo `duty`. |
| Un Job tolto dai file | L'assegnazione resta nel database ma non dà Permissions; l'Organization resta e in console compare un avviso. |

## Limitations

- I Jobs si definiscono solo da file (o da un Module) e si leggono all'avvio, non a caldo.
- Il Core non paga gli stipendi.
- Se cambi l'`id` di un Job, per il Core è un altro Job: i Characters restano assegnati al vecchio `id`.

## Related

- [Jobs](lavori.md)
- [Organizations](organizzazioni.md)
- [Permissions](permessi.md)
- [Punti di interazione](punti-di-interazione.md)
