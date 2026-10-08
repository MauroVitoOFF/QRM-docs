---
sidebar_label: Glossario
---

# Glossario

I termini di QRM, in ordine alfabetico. I termini scritti in inglese sono i nomi dei concetti e dell'API di QRM e restano tali anche nel testo italiano.

**Account.** Un conto di denaro, con un titolare (`OwnerRef`), uno stato (`ACTIVE` o `FROZEN`) e saldi in più Currencies. Non va confuso con l'account del Player, usato dalle Permissions staff.

**Account del Player.** L'identità di chi gioca (il suo UUID). Le Permissions dello staff sono legate a questo, non al Character.

**API.** L'interfaccia pubblica di QRM: `qrm-api` (server) e `qrm-client-api` (client).

**ATM.** Lo sportello della banca: il blocco `qrm_bank:atm`.

**Cassa (`BANK_VAULT`).** L'Account della banca il cui saldo è esattamente il contante in circolazione.

**Character.** L'identità di gioco di un Player. Un Player ne ha più d'uno e uno solo è attivo; Job, Accounts e Organizations appartengono al Character.

**Core.** `qrm-core`: l'implementazione dei servizi dell'API. Un dettaglio interno.

**Currency.** Una valuta, con codice, simbolo e decimali.

**Duty (servizio).** Se il Character è in servizio o no. I Permissions del Job valgono solo in servizio.

**Framework.** Le parti di QRM dentro il jar `qrm`: `qrm-api`, `qrm-core`, `qrm-client-api`, `qrm-neoforge`. Vedi [Framework e Modules](../intro/moduli.md).

**Grade.** Un livello di un Job (per esempio *Recluta* o *Comandante*), con un `level` numerico e dei Permissions.

**Idempotency key (chiave di idempotenza).** Una chiave stabile che identifica un'operazione logica: ripeterla non duplica la Transaction, ma restituisce `Duplicate`.

**Job.** Una professione con dei Grades. Un Character ne ha al massimo uno.

**Module.** Un mod a sé che estende QRM usando solo `qrm-api` e `qrm-client-api`. `qrm_bank` è il primo Module ufficiale.

**Nodo.** Una stringa di Permission come `police.arrest`. Un *pattern* termina con `.*` oppure è `*`.

**NeoForge.** Il mod loader su cui gira QRM. `qrm-neoforge` è l'integrazione con NeoForge.

**Operatore.** Chi ha il livello di comando *gamemaster* di Minecraft. Ha accesso a tutto il ramo admin e a ogni nodo staff.

**Organization.** Un gruppo con Ranks, membri e un Account in comune.

**Override.** Un `GRANT` o `DENY` dato direttamente a un Character per un nodo. Batte sempre i nodi del Job.

**Permission.** Un permesso, rappresentato da un nodo.

**Player.** Il giocatore Minecraft. Ha uno o più Characters.

**Rank.** Un livello di un'Organization, con un `level` e dei nodi. È l'equivalente del Grade per le Organizations.

**Sealed.** Un tipo Java con un insieme chiuso di sottotipi. Gli esiti dei servizi (`TransferResult`, `AssignResult`, `OrgResult`, ...) lo sono: si gestiscono con uno `switch` esaustivo.

**Transaction.** Un movimento di denaro tra due Accounts, in una Currency, con un motivo (`reason`).

**Unità minime.** Gli importi di denaro sono interi nella più piccola frazione della Currency: `1250` con 2 decimali vale 12,50.
