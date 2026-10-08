---
sidebar_label: Temi
---

# Temi e aspetto della GUI

La GUI di QRM non ha asset nel codice: colori, misure e texture arrivano da un **manifesto JSON** e da file PNG che un resource pack può sostituire, senza ricompilare nulla.

## Distribuire un tema

- **Resource pack del server:** imposta `resource-pack` (e, se serve, `resource-pack-sha1` e `require-resource-pack`) in `server.properties`. Il client lo applica e ricarica le risorse. Finché il pack non è arrivato si usa il tema incluso nel mod.
- **Pack locale:** copia la cartella o lo zip del pack in `resourcepacks/` del client e attivalo nelle opzioni.
- Il pack deve avere un `pack.mcmeta` valido per la versione di Minecraft in uso.
- Dopo ogni modifica ai file del pack, **F3+T** ricarica le risorse e quindi il tema, senza riavvio.

Un esempio pronto è nel repository della documentazione: [`samples/qrm-sample-pack`](https://github.com/MauroVitoOFF/QRM-docs/tree/main/samples/qrm-sample-pack).

## Cosa può fornire un pack

```text
assets/qrm/theme/default.json            manifesto
assets/qrm/textures/gui/common/*.png     texture comuni (pannello, pulsanti, icone)
assets/qrm/textures/gui/character/*.png  texture della schermata Personaggi
```

Un pack può contenere **solo** il manifesto, per cambiare i colori, oppure solo alcuni PNG. Le chiavi sconosciute del manifesto vengono ignorate.

## Colori

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

Il manifesto contiene anche `metrics` (misure in pixel) e i riferimenti alle texture. Il contratto completo con tutte le chiavi, per chi scrive un tema da zero, arriva con la sezione Sviluppatori.
