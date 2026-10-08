---
sidebar_label: Jobs
---

# Jobs

Questa pagina documenta `JobRegistry`, `JobDefinition` e `JobService`. È rivolta agli sviluppatori di Modules. Per definire i Jobs da file e per i comandi vedi [Jobs](../../server-owner/lavori.md).

:::caution Experimental
API `0.x` (dalla 0.2): può cambiare tra una minor e l'altra.
:::

## Overview

Un Character ha al massimo **un Job** con un **Grade**, e può essere **in servizio** o no. I Jobs si descrivono con `JobDefinition`; si assegnano con `JobService`.

## How it works

- Un Grade **eredita** i Permissions dei Grades con `level` inferiore dello stesso Job.
- I Permissions del Job valgono **solo in servizio**.
- Il Character va fuori servizio al logout e quando il Player seleziona un altro Character.
- Se un Job sparisce dai file, l'`Assignment` resta nel database con `known() == false` e non dà Permissions finché il Job non torna.
- `JobService` non controlla chi lo chiama. Per imporre regole (per esempio "solo un comandante assume") registra un handler su `JobChangePreEvent` e chiama `cancel(...)`.

## Usage

### Definire un Job dal codice

Già nel costruttore del tuo mod:

```java
QRM.get(JobRegistry.class).register(new JobDefinition("police", "Polizia", List.of(
        new GradeDefinition("cadet", "Recluta", 1, Set.of("police.duty"), Money.of("USD", 120_000)),
        new GradeDefinition("chief", "Comandante", 5, Set.of("police.*"), null))));
```

- `JobDefinition(id, label, grades)` o, con un'Organization collegata, `JobDefinition(id, label, grades, orgId)`. L'id è `[a-z][a-z0-9_]{0,31}`.
- `GradeDefinition(id, label, level, permissions, salary)`: l'etichetta è lunga da 1 a 64 caratteri, `level` è `>= 0`, `salary` può essere `null`, i Permissions sono nodi o pattern validi.
- La Currency di `salary` deve già essere registrata.
- Lo stipendio è solo un dato: il Core non paga, lo fa un Module (leggi `GradeDefinition.salary()`).

### Assegnare un Job

```java
JobService jobs = QRM.get(JobService.class);

if (jobs.assign(characterId, "police", "cadet") instanceof AssignResult.Assigned assigned) {
    // assigned.assignment()
}
jobs.setOnDuty(characterId, true, DutyReason.MANUAL);
```

## API

| Metodo | Cosa fa |
| --- | --- |
| `assignmentOf(CharacterId)` | L'`Assignment` corrente, se c'è. |
| `assign(CharacterId, jobId, gradeId)` | Assegna Job e Grade. |
| `setGrade(CharacterId, gradeId)` | Cambia solo il Grade. |
| `dismiss(CharacterId)` | Licenzia; `boolean`. |
| `setOnDuty(CharacterId, boolean, DutyReason)` | Cambia il servizio; `boolean`. |
| `membersOf(jobId)` | I Characters con quel Job. |

`JobRegistry` offre `register`, `find(id)` e `all()`.

`AssignResult` è **sealed**: `Assigned`, `UnknownCharacter`, `NotUsable(status)`, `UnknownJob(jobId)`, `UnknownGrade(gradeId)`, `NoAssignment`, `Cancelled(by, reason)`. `DutyReason` è `MANUAL`, `LOGOUT`, `SWITCH` o `JOB_CHANGE`. `Assignment` ha `character`, `jobId`, `gradeId`, `onDuty`, `since` e `known`.

### Eventi

| Evento | Quando |
| --- | --- |
| `JobChangePreEvent` (annullabile) | Prima di un cambio di Job o Grade: `character()`, `from()`, `toJobId()`, `toGradeId()`. |
| `JobChangedEvent(character, before, after)` | Dopo il cambio. |
| `DutyChangedEvent(character, onDuty, reason)` | Dopo un cambio di servizio. |

## Limitations

- Un Character ha un solo Job alla volta.
- Il Core non paga gli stipendi.

## Related

- [Permissions](permessi.md)
- [Organizations](organizzazioni.md)
- [Eventi](../eventi.md)
