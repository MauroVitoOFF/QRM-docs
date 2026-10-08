---
sidebar_label: Personaggi
---

# Personaggi

Un giocatore ha fino a `characters.slots` personaggi (predefinito 3) e ne usa uno alla volta, quello **attivo**. Lavoro, conto, saldo e organizzazioni appartengono al personaggio, non al giocatore.

## Creare e scegliere

I giocatori usano la schermata Personaggi (tasto **O**) oppure i comandi. `/char` è la forma breve di `/qrm character`.

| Comando | Cosa fa |
| --- | --- |
| `/char create <nome> <cognome> <nascita>` | Crea un personaggio. La data è `AAAA-MM-GG`; nome e cognome con spazi vanno fra virgolette. |
| `/char list` | Elenca i propri personaggi. `/char` da solo fa lo stesso. |
| `/char select <n>` | Rende attivo il personaggio numero `n`. |
| `/char archive <n>` | Archivia il personaggio numero `n`. |

La creazione fallisce se gli slot sono pieni, se nome o cognome non rispettano `characters.nameMinLength`, `nameMaxLength` e `namePattern`, o se il nome completo è già in uso e `characters.uniqueNames` è `true`. Vedi [Configurazione](configurazione.md).

## Denaro

`/money` raccoglie i comandi per il denaro. Restano validi anche `/balance`, `/bal`, `/pay` e i comandi `/qrm …` equivalenti.

| Comando | Chi | Cosa fa |
| --- | --- | --- |
| `/money` (o `/balance`, `/bal`) | giocatori | Mostra i saldi del personaggio attivo. |
| `/money pay <giocatore> <importo> [valuta]` (o `/pay …`) | giocatori | Paga il personaggio attivo di un altro giocatore. L'importo è decimale (`12.50`). |
| `/money give <giocatore> <importo> [valuta]` | operatori | Crea denaro dal conto di sistema verso il personaggio attivo del giocatore (motivo `admin.grant`). |
| `/money take <giocatore> <importo> [valuta]` | operatori | Sposta denaro dal personaggio attivo al conto di sistema (motivo `admin.take`). |
| `/qrm admin audit` | operatori | Verifica che i saldi siano coerenti con il registro delle transazioni; segnala ogni incoerenza con saldo atteso e trovato. |

Se non indichi la valuta si usa `economy.defaultCurrency`; il Tab propone le valute esistenti. Come ogni trasferimento, `take` e `pay` falliscono se i fondi non bastano o se un conto è congelato.

Chi è "operatore" è chi ha il livello di comando *gamemaster* di Minecraft, lo stesso richiesto da tutto il ramo `/qrm admin`. I sottocomandi per operatori non compaiono agli altri giocatori.

Equivalenze con la forma lunga: `/money give` = `/qrm admin grant`, `/money take` = `/qrm admin take`, `/money pay` = `/qrm pay`.
