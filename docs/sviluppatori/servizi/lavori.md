---
sidebar_label: Lavori
---

# Lavori

Un personaggio ha al massimo **un lavoro** con un **grade**, e può essere **in servizio** o no. I lavori si descrivono con `JobDefinition`; si assegnano con `JobService`.

## Definire un lavoro

Da file, in `<world>/qrm/data/jobs/<id>.json`:

```json
{ "id": "police", "label": "Polizia", "grades": [
  { "id": "cadet", "label": "Recluta", "level": 1, "permissions": ["police.duty"],
    "salary": { "currency": "USD", "amount": "1200.00" } },
  { "id": "chief", "label": "Comandante", "level": 5, "permissions": ["police.*"] } ] }
```

Oppure dal codice, già nel costruttore del tuo mod:

```java
QRM.get(JobRegistry.class).register(new JobDefinition("police", "Polizia", List.of(
        new GradeDefinition("cadet", "Recluta", 1, Set.of("police.duty"), Money.of("USD", 120_000)),
        new GradeDefinition("chief", "Comandante", 5, Set.of("police.*"), null))));
```

- `JobDefinition(id, label, grades)` o, con un'organizzazione collegata, `JobDefinition(id, label, grades, orgId)`. L'id è `[a-z][a-z0-9_]{0,31}`.
- `GradeDefinition(id, label, level, permissions, salary)`: l'etichetta è lunga da 1 a 64 caratteri, `level` è `>= 0`, `salary` può essere `null`, i permessi sono nodi o pattern validi.
- La valuta di `salary` deve già essere registrata, altrimenti il file del lavoro viene scartato con un errore nel log.
- Lo stipendio è solo un dato: il Core non paga, lo fa un modulo (leggi `GradeDefinition.salary()`).
- `JobRegistry` offre anche `find(id)` e `all()`.

## Permessi dei grade

Un grade **eredita** i nodi dei grade con `level` inferiore dello stesso lavoro. I nodi del lavoro valgono **solo in servizio**. Vedi [Permessi](permessi.md) per l'insieme.

## Usare il servizio

```java
JobService jobs = QRM.get(JobService.class);

if (jobs.assign(characterId, "police", "cadet") instanceof AssignResult.Assigned assigned) {
    // assigned.assignment()
}
jobs.setOnDuty(characterId, true, DutyReason.MANUAL);
```

| Metodo | Cosa fa |
| --- | --- |
| `assignmentOf(CharacterId)` | L'`Assignment` corrente, se c'è. |
| `assign(CharacterId, jobId, gradeId)` | Assegna lavoro e grade. |
| `setGrade(CharacterId, gradeId)` | Cambia solo il grade. |
| `dismiss(CharacterId)` | Licenzia; `boolean`. |
| `setOnDuty(CharacterId, boolean, DutyReason)` | Cambia il servizio; `boolean`. |
| `membersOf(jobId)` | I personaggi con quel lavoro. |

`AssignResult` è **sealed**: `Assigned`, `UnknownCharacter`, `NotUsable(status)`, `UnknownJob(jobId)`, `UnknownGrade(gradeId)`, `NoAssignment`, `Cancelled(by, reason)`. `DutyReason` è `MANUAL`, `LOGOUT`, `SWITCH` o `JOB_CHANGE`.

`Assignment` ha `character`, `jobId`, `gradeId`, `onDuty`, `since` e `known`. Se un lavoro sparisce dai file, l'assegnazione resta nel database con `known() == false` e non dà permessi finché il lavoro non torna.

Il personaggio va fuori servizio al logout e quando il giocatore seleziona un altro personaggio.

## Imporre regole

`JobService` non controlla chi lo chiama. Per imporre regole (per esempio "solo un comandante assume") registra un handler su `JobChangePreEvent` e chiama `cancel(...)`.

| Evento | Quando |
| --- | --- |
| `JobChangePreEvent` (annullabile) | Prima di un cambio di lavoro o grade: `character()`, `from()`, `toJobId()`, `toGradeId()`. |
| `JobChangedEvent(character, before, after)` | Dopo il cambio. |
| `DutyChangedEvent(character, onDuty, reason)` | Dopo un cambio di servizio. |
