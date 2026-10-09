---
sidebar_label: Sviluppatori
---

# Sviluppatori

Questa sezione è per chi scrive Modules che estendono QRM. Un Module è un mod NeoForge a sé che usa l'API (`qrm-api`) e, per le schermate, la Client API (`qrm-client-api`). Un Module non dipende mai da `qrm-core` né da `qrm-neoforge`. Per la differenza tra framework e Module vedi [Framework e Modules](../intro/moduli.md).

:::caution Experimental
L'API è alla versione `0.x`: può cambiare tra una minor e l'altra. Ogni rimozione passa prima da `@Deprecated` per almeno una minor. Vedi [Versioni e stabilità](../intro/stabilita.md).
:::

## Da dove cominciare

- [Quickstart](quickstart.md): la dipendenza, i metadati e un primo Module.
- [Registro dei servizi](registro-servizi.md): come ottenere i servizi e quando sono disponibili.
- [Eventi](eventi.md): come reagire a ciò che succede e come bloccarlo.

## I servizi

| Pagina | Per cosa |
| --- | --- |
| [Economy](servizi/economia.md) | Accounts, Currencies, importi e Transactions con chiave di idempotenza. |
| [Characters](servizi/personaggi.md) | Creare, scegliere e cercare i Characters dei Players. |
| [Jobs](servizi/lavori.md) | Definire Jobs e Grades, assegnarli, gestire il servizio. |
| [Organizations](servizi/organizzazioni.md) | Ranks, membri e Account in comune. |
| [Permissions](servizi/permessi.md) | Nodi per Character, override e risoluzione. |
| [Staff](servizi/staff.md) | Le Permissions del pannello staff, per account; il registro delle azioni e la moderazione. |
| [Module data](servizi/dati-mod.md) | JSON persistente per titolare, con il namespace del tuo Module. |

## Interfaccia e altri Modules

- [Client API](client-api.md): righe HUD, frammenti di tema, widget, voci e azioni del pannello staff.
- [Tema della GUI](tema-gui.md): il contratto del manifesto per chi crea uno stile.
- [Modules ufficiali](../modules/index.md): le API dei Modules, come gli eventi di Bank ([API di Bank](../modules/bank/api.md)).
- [Build del progetto](build.md): toolchain, comandi Gradle e il Module di esempio.

## Related

- [Riferimento](../riferimento/index.md): Permissions, eventi, glossario, changelog tecnico.
