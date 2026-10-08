---
sidebar_label: Versioni e stabilità
---

# Versioni e stabilità

Questa pagina spiega come si numerano le versioni di QRM e cosa significano le etichette di stato usate nella documentazione. È rivolta a server owner e sviluppatori.

## Overview

QRM è alla versione `0.x`. Finché non esce una 1.0, **nessuna parte di QRM è Stable**: comandi, chiavi di configurazione e API possono cambiare tra una minor e l'altra.

## Etichette di stato

| Stato | Significato |
| --- | --- |
| **Stable** | Non cambia in modo incompatibile all'interno della stessa major. Oggi nessuna parte di QRM ha questo stato. |
| **Experimental** | Funziona e fa parte del progetto, ma può cambiare tra una minor e l'altra. È lo stato di tutto ciò che è in `0.x`. |
| **Planned** | Previsto ma non implementato. |
| **Deprecated** | Ancora presente, da non usare in codice nuovo. Viene rimosso dopo almeno una minor. |

Una pagina usa "This functionality is not currently available" quando descrive qualcosa che non esiste ancora e non c'è un piano dichiarato.

## Numerazione

Una nuova versione di roadmap incrementa la minor (`0.10` → `0.11`). Le correzioni e le rifiniture senza nuove funzioni incrementano la patch (`0.7.1`). L'elenco è in [Versioni](roadmap.md).

## Compatibilità dell'API

- `qrm-api` segue il semantic versioning. Finché la versione è `0.x` l'API può cambiare tra una minor e l'altra.
- Ogni rimozione passa prima da `@Deprecated` per almeno una minor.
- Le classi nei pacchetti `…internal` non sono API.
- La compatibilità binaria contro una versione già pubblicata si controlla con `./gradlew :qrm-api:japicmp -PapiBaseline=<versione>`.

## Compatibilità di rete

Un client che ha QRM deve avere la stessa versione del server: il protocollo di rete cambia con le versioni del mod. Un client senza QRM entra comunque. I numeri di protocollo sono nel [changelog tecnico](../riferimento/changelog.md).

## Related

- [Versioni](roadmap.md)
- [Changelog tecnico](../riferimento/changelog.md)
