---
sidebar_label: Server owner
---

# Per i server owner

Questa sezione descrive come installare, configurare e gestire QRM su un server.

## Pagine

| Pagina | Contenuto |
| --- | --- |
| [Installazione](installazione.md) | Jar da installare, posizione dei file, aggiornamento. |
| [Configurazione](configurazione.md) | Le chiavi di `qrm-common.toml` e del client. |
| [Characters](personaggi.md) | Creare, scegliere e archiviare Characters. |
| [Economy](economia.md) | Currencies, Accounts, pagamenti e audit. |
| [Jobs](lavori.md) | Definire Jobs e Grades, assegnarli, gestire il servizio. |
| [Organizations](organizzazioni.md) | Creare Organizations, Ranks e membri. |
| [Permissions](permessi.md) | Nodi, override e comandi. |
| [Pannello staff](pannello-staff.md) | Il pannello in overlay e le Permissions dello staff. |
| [Banca e ATM](banca.md) | Il Module `qrm_bank`. |
| [Temi](temi.md) | Cambiare l'aspetto della GUI con un resource pack. |
| [Manutenzione](manutenzione.md) | Backup, audit e risoluzione dei problemi. |

## Comandi in breve

Dalla 0.11 i comandi hanno una forma breve, una radice per argomento: `/job`, `/duty`, `/money`, `/char`, `/org`, `/perm`. I comandi lunghi `/qrm …` restano validi. I sottocomandi per operatori non compaiono agli altri Players. Se un altro mod usa gli stessi nomi, la chiave `commands.shortAliases` disattiva le forme brevi: vedi [Configurazione](configurazione.md).
