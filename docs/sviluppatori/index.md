---
sidebar_label: Sviluppatori
---

# Sviluppatori

QRM si estende scrivendo **moduli**: mod NeoForge a sé che usano `qrm-api` (server) e, per le schermate, `qrm-client-api`. Un modulo non dipende mai da `qrm-core` né da `qrm-neoforge`. Se non hai ancora chiaro cosa è un modulo e cosa è il framework, leggi prima [Framework e moduli](../intro/moduli.md).

## Da dove cominciare

- [Quickstart](quickstart.md): la dipendenza, i metadati e un primo modulo che registra una valuta e reagisce a un evento.
- [Registro dei servizi](registro-servizi.md): come ottenere i servizi e quando sono disponibili.
- [Eventi](eventi.md): come reagire a ciò che succede e come bloccarlo.

## I servizi

| Pagina | Per cosa |
| --- | --- |
| [Economia](servizi/economia.md) | Conti, valute, importi e trasferimenti con chiave di idempotenza. |
| [Personaggi](servizi/personaggi.md) | Creare, scegliere e cercare i personaggi dei giocatori. |
| [Lavori](servizi/lavori.md) | Definire lavori e grade, assegnarli, gestire il servizio. |
| [Organizzazioni](servizi/organizzazioni.md) | Rank, membri e conto in comune. |
| [Permessi](servizi/permessi.md) | Nodi per personaggio, override e risoluzione. |
| [Staff](servizi/staff.md) | I permessi del pannello staff, per account. |
| [Dati del mod](servizi/dati-mod.md) | JSON persistente per titolare, con il tuo namespace. |

## Interfaccia e altri moduli

- [Client API](client-api.md): righe HUD, frammenti di tema, widget, voci e azioni del pannello staff.
- [Tema della GUI](tema-gui.md): il contratto del manifesto per chi crea uno stile.
- [API della banca](api-banca.md): gli eventi di `qrm_bank`.
- [Build del progetto](build.md): toolchain, comandi Gradle e il modulo di esempio.

## Stabilità

`qrm-api` segue il semantic versioning. Finché la versione è `0.x` l'API può cambiare tra una minor e l'altra. Ogni rimozione passa prima da `@Deprecated` per almeno una minor. Le classi in pacchetti `…internal` non sono API.

Per controllare la compatibilità binaria contro una versione già pubblicata su Maven si usa `./gradlew :qrm-api:japicmp -PapiBaseline=<versione>`; senza `-PapiBaseline` il controllo non è attivo.
