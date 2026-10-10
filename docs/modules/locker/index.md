---
sidebar_label: Locker
---

# Locker

Questa pagina descrive il Module `qrm_locker`: cosa fa e come funziona. È rivolta ai server owner e agli sviluppatori. Disponibile dalla 0.15. Stato: Experimental.

## Overview

`qrm_locker` offre un **armadietto personale** nei blocchi che lo staff marca come [punti di interazione](../../server-owner/punti-di-interazione.md) di tipo `locker`. Un Character autorizzato fa click destro sul punto, apre il proprio armadietto, deposita e ritira oggetti. Il contenuto appartiene al Character: resta se cambia Character, se il server riparte e se il punto viene spostato.

Richiede `qrm` (versione uguale a quella del Module). Sui client è **facoltativo**: il Module non registra blocchi, item né tipi di menu. Un client senza il mod entra nel server e usa un normale baule. Un client con il mod vede la stessa schermata con il tema di QRM.

## How it works

- **Tipo di punto:** `locker`, con proprietario Job o Organization. Non richiede il servizio, così l'armadietto serve anche a posare la divisa a fine turno. Chi può usare il punto lo decide il Core, prima che il Module venga chiamato (grado, appartenenza, Character attivo).
- **Di chi è il contenuto:** di un Character per ciascun proprietario del punto. Più punti dello stesso Job o della stessa Organization aprono lo **stesso** armadietto. Proprietari diversi (per esempio due Jobs) hanno armadietti **separati**.
- **Dimensione:** 27 slot (tre righe), fissa. Gli slot si comportano come in un baule vanilla.
- **Titolo:** il nome del punto, se lo staff ne ha scelto uno; altrimenti «Armadietto» (o «Locker»).
- **Un armadietto per volta:** se un Player ne ha uno aperto, un nuovo click non fa nulla.
- **Chiusura automatica:** il menu si chiude da solo se il punto viene rimosso o spostato, se il Character perde l'accesso (grado, Job), se il Character attivo cambia, se il Character viene archiviato o se il Player si allontana oltre 8 blocchi. Ciò che è stato depositato resta salvato.
- **Salvataggio:** ogni modifica viene scritta a fine tick, alla chiusura del menu e allo spegnimento del server. Un crash del server può far perdere al massimo le modifiche dell'ultimo tick e non duplica oggetti.
- **Dati:** nessuna tabella nuova. Il contenuto sta nei [dati dei Modules](../../sviluppatori/servizi/dati-mod.md) di QRM; il formato è in [API](api.md).
- **Oggetti di mod rimossi:** se un oggetto non si legge più (il mod che lo definiva non c'è), l'armadietto si apre senza e il suo contenuto resta salvato tale e quale. Se il mod torna, l'oggetto riappare nel suo slot, purché sia libero.
- **Dati non validi:** se il documento di un armadietto è corrotto o di una versione sconosciuta, l'armadietto non si apre e non viene sovrascritto. Il Player riceve un messaggio che lo invita a contattare lo staff e il log del server riporta chiave e Character.

## Usage

1. Installa `qrm_locker` in `mods/` del server, alla stessa versione di `qrm`. Sui client è facoltativo: chi lo installa vede la schermata a tema.
2. Inquadra un blocco (per esempio una cassa) e crea il punto:

```text
/qrm admin point create locker job police
/qrm admin point set name Spogliatoio
```

3. I Characters con il Job `police` vedono l'icona sul blocco e, con il click destro, aprono il proprio armadietto. Per limitarlo a un grado: `/qrm admin point set grade sergeant`.

Per un armadietto di un'Organization: `/qrm admin point create locker org <org>`.

Non ci sono comandi né file di configurazione propri. I comandi dei punti sono descritti in [Punti di interazione](../../server-owner/punti-di-interazione.md).

## Limitations

- Il Module non cancella mai un armadietto: il contenuto resta nel database anche se il punto o il proprietario non esistono più. Non c'è un comando per svuotarlo.
- Una schermata o un comando staff per ispezionare l'armadietto di un altro Character: This functionality is not currently available.
- Numero di righe configurabile, armadietto condiviso dal proprietario, limiti per tipo di oggetto, registro dei depositi e dei ritiri, permessi di rank diversi per depositare e ritirare: This functionality is not currently available.
- Il tema a schermo vale per una sola apertura, subito dopo il click sul punto. Un baule vanilla aperto in altro modo resta vanilla.
- Il Module è `0.x` come il resto di QRM: dati e comportamento possono cambiare tra una minor e l'altra ([Versioni e stabilità](../../intro/stabilita.md)).

## Related

- [Punti di interazione](../../server-owner/punti-di-interazione.md)
- [API di Locker](api.md)
- [Modules ufficiali](../index.md)
