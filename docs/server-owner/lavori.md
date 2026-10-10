---
sidebar_label: Jobs
---

# Jobs

Questa pagina descrive come definire i Jobs e come assegnarli ai Characters. È rivolta ai server owner. Disponibile dalla 0.2.

## Overview

Un Character ha al massimo **un Job** con un **Grade**, e può essere **in servizio** o no. I Permissions del Job valgono solo in servizio. Un Job è un file JSON oppure è registrato da un Module.

## How it works

- Ogni Grade **eredita** i Permissions dei Grades con `level` inferiore dello stesso Job.
- Il Character va fuori servizio al logout e quando il Player seleziona un altro Character.
- Se `jobs.selfDuty` è `false`, solo i Modules cambiano lo stato di servizio. Un [punto di interazione](punti-di-interazione.md) di tipo `duty` resta utilizzabile.
- Se un Job sparisce dai file, l'assegnazione resta nel database ma non dà Permissions finché il Job non torna.
- Un Job può dichiarare `"org": "<id>"` per collegarsi a un'[Organization](organizzazioni.md): chi lo ha, in servizio, è membro implicito.

## Usage

### Definire un Job

Un file per Job in `<world>/qrm/data/jobs/<id>.json`:

```json
{ "id": "police", "label": "Polizia", "grades": [
  { "id": "cadet", "label": "Recluta", "level": 1, "permissions": ["police.duty"],
    "salary": { "currency": "USD", "amount": "1200.00" } },
  { "id": "chief", "label": "Comandante", "level": 5, "permissions": ["police.*"] } ] }
```

La Currency di `salary` deve già esistere, altrimenti il file del Job viene scartato con un errore nel log.

### Comandi

| Comando | Chi | Cosa fa |
| --- | --- | --- |
| `/job` (o `/job info`) | Players | Mostra Job e Grade del Character attivo. |
| `/duty` | Players | Inverte il servizio: entra se è fuori, esce se è dentro. Disponibile se `jobs.selfDuty` è `true`. |
| `/duty on` / `/duty off` | Players | Entra o esce di servizio in modo esplicito. |
| `/job list` | operatori | Elenca i Jobs registrati. |
| `/job set <player> <job> <grade>` | operatori | Assegna Job e Grade. Il Tab propone i Jobs esistenti e poi i Grades del Job scelto. |
| `/job remove <player>` | operatori | Licenzia. |

I sottocomandi per operatori non compaiono agli altri Players. Restano validi i comandi lunghi `/qrm job info`, `/qrm duty` e `/qrm admin job list|set|fire`.

## Limitations

- Lo stipendio (`salary`) è solo un dato: il Core non lo paga. Lo fa un Module.
- Un Character ha un solo Job alla volta.
- Il pannello staff non ha una schermata per i Jobs: si usano i comandi.

## Related

- [Organizations](organizzazioni.md)
- [Punti di interazione](punti-di-interazione.md)
- [Permissions](permessi.md)
- [Configurazione](configurazione.md)
- [Jobs per sviluppatori](../sviluppatori/servizi/lavori.md)
