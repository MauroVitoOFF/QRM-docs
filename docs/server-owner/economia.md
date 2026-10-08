---
sidebar_label: Economy
---

# Economy

Questa pagina descrive le Currencies, gli Accounts e i comandi per il denaro. È rivolta ai server owner.

## Overview

Ogni movimento di denaro è una **Transaction** tra due **Accounts**, in una **Currency**. Un Character ha un Account; il sistema ha un Account speciale da cui nasce e verso cui torna il denaro creato o distrutto. Gli importi sono interi in unità minime: `1250` con 2 decimali vale 12,50.

## How it works

- Una Transaction sposta denaro tra due Accounts. Fallisce se i fondi non bastano, se un Account è congelato o se la Currency non esiste.
- Per creare denaro si trasferisce dall'Account di sistema a un Account; per distruggerlo, dall'Account all'Account di sistema.
- Ogni Transaction ha un motivo (`reason`), per esempio `player.pay`, `admin.grant`, `admin.take`.
- Un audit confronta il saldo di ogni Account con la somma delle sue Transactions.

## Currencies

Una Currency si definisce con un file in `<world>/qrm/data/currencies/*.json`:

```json
{ "code": "USD", "symbol": "$", "decimals": 2 }
```

Il `code` è `[A-Z0-9_]{2,16}` e `decimals` va da 0 a 8. La Currency principale, usata dai comandi quando non indicata e mostrata nell'HUD, è `economy.defaultCurrency` ([Configurazione](configurazione.md)).

## Usage

`/money` raccoglie i comandi per il denaro. Restano validi anche `/balance`, `/bal`, `/pay` e i comandi `/qrm …` equivalenti.

| Comando | Chi | Cosa fa |
| --- | --- | --- |
| `/money` (o `/balance`, `/bal`) | Players | Mostra i saldi del Character attivo. |
| `/money pay <player> <amount> [currency]` (o `/pay …`) | Players | Paga il Character attivo di un altro Player. `<amount>` è decimale (`12.50`). |
| `/money give <player> <amount> [currency]` | operatori | Crea denaro dall'Account di sistema verso il Character attivo del Player (motivo `admin.grant`). |
| `/money take <player> <amount> [currency]` | operatori | Sposta denaro dal Character attivo all'Account di sistema (motivo `admin.take`). |
| `/qrm admin audit` | operatori | Verifica la coerenza dei saldi con le Transactions e segnala ogni incoerenza con saldo atteso e trovato. |

Se non indichi la Currency si usa `economy.defaultCurrency`; il Tab propone le Currencies esistenti. I sottocomandi per operatori non compaiono agli altri Players.

Equivalenze con la forma lunga: `/money give` = `/qrm admin grant`, `/money take` = `/qrm admin take`, `/money pay` = `/qrm pay`.

"Operatore" è chi ha il livello di comando *gamemaster* di Minecraft, lo stesso richiesto da tutto il ramo `/qrm admin`.

## Limitations

- I comandi agiscono sul Character **attivo** del Player: con i comandi, un Player senza Character attivo non può pagare né ricevere.
- Non esiste il cambio tra Currencies.
- Un Account congelato non muove denaro. I comandi di QRM non congelano gli Accounts dei Characters: lo fa `/bank freeze` del Module `qrm_bank` ([Bank](../modules/bank/comandi.md)), oppure l'API.

## Related

- [Bank](../modules/bank/index.md)
- [Manutenzione](manutenzione.md)
- [Economy per sviluppatori](../sviluppatori/servizi/economia.md)
