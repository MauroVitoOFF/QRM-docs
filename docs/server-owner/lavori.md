---
sidebar_label: Lavori
---

# Lavori

Un personaggio ha al massimo **un lavoro** con un **grade** e può essere **in servizio** o no. Il personaggio va fuori servizio al logout e quando il giocatore seleziona un altro personaggio.

## Definire un lavoro

Un file per lavoro in `<world>/qrm/data/jobs/<id>.json`:

```json
{ "id": "police", "label": "Polizia", "grades": [
  { "id": "cadet", "label": "Recluta", "level": 1, "permissions": ["police.duty"],
    "salary": { "currency": "USD", "amount": "1200.00" } },
  { "id": "chief", "label": "Comandante", "level": 5, "permissions": ["police.*"] } ] }
```

- Ogni grade **eredita** i nodi dei grade con `level` inferiore dello stesso lavoro.
- I nodi del lavoro valgono **solo in servizio**.
- La valuta di `salary` deve già esistere, altrimenti il file del lavoro viene scartato con un errore nel log.
- Lo stipendio è solo un dato: il Core non paga, lo fa un modulo.
- Un lavoro può dichiarare `"org": "<id>"` per collegarsi a un'[organizzazione](organizzazioni.md): chi lo ha, in servizio, è membro implicito.
- Se un lavoro sparisce dai file, l'assegnazione resta nel database ma non dà permessi finché il lavoro non torna.

## Comandi

| Comando | Chi | Cosa fa |
| --- | --- | --- |
| `/qrm job info` | giocatori | Mostra lavoro e grade del personaggio attivo. |
| `/qrm duty on` / `/qrm duty off` | giocatori | Entra o esce di servizio. Disponibile se `jobs.selfDuty` è `true`. |
| `/qrm admin job list` | operatori | Elenca i lavori registrati. |
| `/qrm admin job set <giocatore> <job> <grade>` | operatori | Assegna lavoro e grade. |
| `/qrm admin job fire <giocatore>` | operatori | Licenzia. |
