---
sidebar_label: Glossario
---

# Glossario

**Account (conto).** Un conto di denaro, con un titolare (`OwnerRef`), uno stato (`ACTIVE` o `FROZEN`) e saldi in più valute. Non va confuso con l'account del giocatore, usato dai permessi staff.

**Account del giocatore.** L'identità di chi gioca (il suo UUID). I permessi dello staff sono legati a questo, non al personaggio.

**ATM.** Lo sportello della banca: il blocco `qrm_bank:atm`.

**Cassa (`BANK_VAULT`).** Il conto della banca il cui saldo è esattamente il contante in circolazione.

**Core.** `qrm-core`: l'implementazione dei servizi dell'API. Un dettaglio interno.

**Duty (servizio).** Se il personaggio è in servizio o no. I nodi del lavoro valgono solo in servizio.

**Framework.** Le parti di QRM dentro il jar `qrm`: `qrm-api`, `qrm-core`, `qrm-client-api`, `qrm-neoforge`. Vedi [Framework e moduli](../intro/moduli.md).

**Grade.** Un livello di un lavoro (per esempio *Recluta* o *Comandante*), con un `level` numerico e dei nodi di permesso.

**Idempotency key (chiave di idempotenza).** Una chiave stabile che identifica un'operazione logica: ripeterla non duplica il pagamento, ma restituisce `Duplicate`.

**Job (lavoro).** Una professione con dei grade. Un personaggio ne ha al massimo uno.

**Modulo.** Un mod a sé che estende QRM usando solo `qrm-api` e `qrm-client-api`. `qrm_bank` è il primo modulo ufficiale.

**Nodo.** Una stringa di permesso come `police.arrest`. Un *pattern* termina con `.*` oppure è `*`.

**Operatore.** Chi ha il livello di comando *gamemaster* di Minecraft. Ha accesso a tutto il ramo admin e a ogni nodo staff.

**Override.** Un `GRANT` o `DENY` dato direttamente a un personaggio per un nodo. Batte sempre i nodi del lavoro.

**Personaggio.** L'identità di gioco di un giocatore. Un giocatore ne ha più d'uno e uno solo è attivo; lavoro, conti e organizzazioni appartengono al personaggio.

**Rank.** Un livello di un'organizzazione, con un `level` e dei nodi. È l'equivalente del grade per le organizzazioni.

**Sealed.** Un tipo Java con un insieme chiuso di sottotipi. Gli esiti dei servizi (`TransferResult`, `AssignResult`, `OrgResult`, ...) lo sono: si gestiscono con uno `switch` esaustivo.

**Unità minime.** Gli importi di denaro sono interi nella più piccola frazione della valuta: `1250` con 2 decimali vale 12,50.
