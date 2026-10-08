---
sidebar_label: Characters
---

# Characters

Questa pagina descrive come i Players creano e scelgono i Characters e quali comandi esistono. È rivolta ai server owner.

## Overview

Un Player ha fino a `characters.slots` Characters (predefinito 3) e ne usa uno alla volta, quello **attivo**. Job, Accounts, Permissions e Organizations appartengono al Character, non al Player. L'Economy è descritta in [Economy](economia.md).

## How it works

- Un Character ha nome, cognome e data di nascita.
- La creazione fallisce se gli slot sono pieni, se nome o cognome non rispettano `characters.nameMinLength`, `nameMaxLength` e `namePattern`, o se il nome completo è già in uso e `characters.uniqueNames` è `true`.
- Un Character può essere archiviato. Un Character archiviato non è più utilizzabile.

I limiti sono in [Configurazione](configurazione.md).

## Usage

Con il client i Players usano la schermata Characters (tasto **O**). Senza client, o in alternativa, usano i comandi. `/char` è la forma breve di `/qrm character`.

| Comando | Cosa fa |
| --- | --- |
| `/char create <first> <last> <birth>` | Crea un Character. `<birth>` è `AAAA-MM-GG`; nome e cognome con spazi vanno fra virgolette. |
| `/char list` | Elenca i propri Characters. `/char` da solo fa lo stesso. |
| `/char select <n>` | Rende attivo il Character numero `n`. |
| `/char archive <n>` | Archivia il Character numero `n`. |

## Limitations

- Il campo Genere della schermata di creazione è solo grafico: non viene inviato né salvato.
- Non esiste un comando per riattivare un Character archiviato.

## Related

- [Economy](economia.md)
- [Jobs](lavori.md)
- [Configurazione](configurazione.md)
- [Characters per sviluppatori](../sviluppatori/servizi/personaggi.md)
