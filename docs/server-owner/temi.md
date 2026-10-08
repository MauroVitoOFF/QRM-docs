---
sidebar_label: Temi
---

# Temi e aspetto della GUI

Questa pagina descrive come cambiare l'aspetto della GUI di QRM con un resource pack. È rivolta ai server owner. Disponibile dalla 0.4.

## Overview

La GUI di QRM non ha asset nel codice: colori, misure e texture arrivano da un **manifesto JSON** e da file PNG che un resource pack può sostituire, senza ricompilare nulla.

## How it works

Il tema è il manifesto `assets/qrm/theme/default.json` del mod, più le texture. Un pack può fornire gli stessi percorsi, e vince il pack con priorità più alta tra quelli che li forniscono. Finché il pack non è arrivato al client si usa il tema incluso nel mod.

```text
assets/qrm/theme/default.json            manifesto
assets/qrm/textures/gui/common/*.png     texture comuni (pannello, pulsanti, icone)
assets/qrm/textures/gui/character/*.png  texture della schermata Characters
```

Un pack può contenere **solo** il manifesto, per cambiare i colori, oppure solo alcuni PNG. Le chiavi sconosciute del manifesto vengono ignorate.

## Usage

- **Resource pack del server:** imposta `resource-pack` (e, se serve, `resource-pack-sha1` e `require-resource-pack`) in `server.properties`. Il client lo applica e ricarica le risorse.
- **Pack locale:** copia la cartella o lo zip del pack in `resourcepacks/` del client e attivalo nelle opzioni.
- Il pack deve avere un `pack.mcmeta` valido per la versione di Minecraft in uso.
- Dopo ogni modifica ai file del pack, **F3+T** ricarica le risorse e quindi il tema, senza riavvio.

Un esempio pronto è nel repository della documentazione: [`samples/qrm-sample-pack`](https://github.com/MauroVitoOFF/QRM-docs/tree/main/samples/qrm-sample-pack).

### Colori

Nella sezione `colors` del manifesto, nel formato `#RRGGBB` (opaco) oppure `#AARRGGBB` (con trasparenza).

:::tip
Mantieni opachi i colori del testo: con alpha `00` il testo diventa invisibile.
:::

| Chiave | Predefinito | Uso |
| --- | --- | --- |
| `text` | `#E6EDF5` | Testo principale. |
| `muted` | `#8A98A8` | Testo secondario. |
| `accent` | `#3EC9E6` | Colore d'accento. |
| `accent2` | `#F2B13C` | Secondo accento. |
| `error` | `#FF6B6B` | Errori. |
| `scrim` | `#A00F141B` | Velo dietro le schermate. |
| `worldDim` | `#660F141B` | Velo scuro sul mondo dietro la carta d'identità, nella creazione. |
| `worldFrost` | `#1CDCEBFF` | Velo chiaro "appannato" sopra il blur del mondo, nella creazione. |
| `statusOn` | `#5EE08A` | Quadratino "in servizio" di HUD e hub. |
| `statusOff` | `#FF6B6B` | Quadratino "fuori servizio". |
| `staffGold` | `#F5C75B` | Pannello staff: titolo, selezione, etichette. |
| `staffGoldDark` | `#B07A1E` | Pannello staff: filo ornamentale e freccia indietro. |
| `staffCream` | `#F6EBD2` | Pannello staff: testo e valori. |
| `staffMuted` | `#A89BB8` | Pannello staff: testo secondario, voci disattivate, suggerimenti. |
| `staffDanger` | `#FF7B7B` | Pannello staff: azioni pericolose. |

## Limitations

- Il manifesto ha una versione (`1`); una versione diversa scarta tutto il manifesto del pack.
- Il controllo non verifica che i PNG esistano: una texture con id valido ma file mancante appare come texture mancante di Minecraft.
- Le chiavi sono quelle del manifesto di QRM: un pack può ridefinirne i valori, non aggiungerne.

## Related

- [Contratto del tema della GUI](../sviluppatori/tema-gui.md): metriche, texture e regole di validazione.
- [Pannello staff](pannello-staff.md)
