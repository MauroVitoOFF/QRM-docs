---
sidebar_label: Personaggi
---

# Personaggi

Un giocatore ha fino a `characters.slots` personaggi (predefinito 3) e ne usa uno alla volta, quello **attivo**. Lavoro, conto, saldo e organizzazioni appartengono al personaggio, non al giocatore.

## Creare e scegliere

I giocatori usano la schermata Personaggi (tasto **O**) oppure i comandi:

| Comando | Cosa fa |
| --- | --- |
| `/qrm character create <nome> <cognome> <nascita>` | Crea un personaggio. La data è `AAAA-MM-GG`; nome e cognome con spazi vanno fra virgolette. |
| `/qrm character list` | Elenca i propri personaggi. |
| `/qrm character select <n>` | Rende attivo il personaggio numero `n`. |
| `/qrm character archive <n>` | Archivia il personaggio numero `n`. |

La creazione fallisce se gli slot sono pieni, se nome o cognome non rispettano `characters.nameMinLength`, `nameMaxLength` e `namePattern`, o se il nome completo è già in uso e `characters.uniqueNames` è `true`. Vedi [Configurazione](configurazione.md).

## Denaro

| Comando | Chi | Cosa fa |
| --- | --- | --- |
| `/qrm balance` | giocatori | Mostra i saldi del personaggio attivo. |
| `/qrm pay <giocatore> <importo> [valuta]` | giocatori | Paga il personaggio attivo di un altro giocatore. L'importo è decimale (`12.50`). |
| `/qrm admin grant <giocatore> <importo> [valuta]` | operatori | Crea denaro dal conto di sistema verso il personaggio attivo del giocatore (motivo `admin.grant`). |
| `/qrm admin take <giocatore> <importo> [valuta]` | operatori | Sposta denaro dal personaggio attivo al conto di sistema (motivo `admin.take`). |
| `/qrm admin audit` | operatori | Verifica che i saldi siano coerenti con il registro delle transazioni; segnala ogni incoerenza con saldo atteso e trovato. |

Se non indichi la valuta si usa `economy.defaultCurrency`. Come ogni trasferimento, `take` e `pay` falliscono se i fondi non bastano o se un conto è congelato.

Chi è "operatore" è chi ha il livello di comando *gamemaster* di Minecraft, lo stesso richiesto da tutto il ramo `/qrm admin`.
