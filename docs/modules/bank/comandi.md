---
sidebar_label: Comandi
---

# Comandi di Bank

Questa pagina elenca i comandi del Module `qrm_bank` e descrive la sua voce nel pannello staff. È rivolta ai server owner e allo staff.

## Overview

I comandi `/bank` sono riservati agli operatori (livello *gamemaster*). Il pannello staff ha in più la voce **Banca**, che richiede il nodo `staff.bank`.

## Usage

### Comandi (operatori)

| Comando | Cosa fa |
| --- | --- |
| `/bank atm give [player]` | Dà un ATM. |
| `/bank balance <name>` | Mostra i saldi di un Character (`<name>` = "Nome Cognome"). |
| `/bank freeze <name>` | Congela l'Account. |
| `/bank unfreeze <name>` | Scongela l'Account. |
| `/bank audit` | Controlla la coerenza del registro e confronta il contante dei Players online con il saldo della cassa. |

Per dare o togliere denaro a un Player ci sono `/money give` e `/money take`, descritti in [Economy](../../server-owner/economia.md).

### Nel pannello staff

Con Bank installato, il [pannello staff](../../server-owner/pannello-staff.md) ha la voce **Banca** in *Economy* (nodo `staff.bank`). Serve un Player come bersaglio. Mostra lo stato dell'Account, i saldi e gli ultimi movimenti, e ha sei azioni:

| Azione | Equivale a |
| --- | --- |
| **Dai** | `/money give` |
| **Togli** | `/money take` |
| **Congela** | `/bank freeze` |
| **Scongela** | `/bank unfreeze` |
| **Dai ATM** | `/bank atm give` |
| **Audit** | `/bank audit` |

Il server ricontrolla la Permission a ogni pacchetto e registra ogni azione riuscita nel log.

## Limitations

- I comandi `/bank` non hanno una forma breve: non rientrano in `commands.shortAliases`.
- Le azioni del pannello agiscono su un Player online.

## Related

- [Bank](index.md)
- [Configurazione](configurazione.md)
- [Pannello staff](../../server-owner/pannello-staff.md)
- [Economy](../../server-owner/economia.md)
