---
sidebar_label: Tema della GUI
---

# Contratto del tema della GUI

Questa pagina è il contratto del manifesto del tema. È rivolta a chi crea uno stile grafico (un resource pack) per un server QRM e a chi scrive un Module che disegna con il tema. Disponibile dalla 0.4.

:::caution Experimental
Le chiavi del tema di QRM fanno parte dell'API e non vengono rinominate senza cambiare versione maggiore, ma l'insieme di chiavi può crescere tra una minor e l'altra.
:::

## Overview

La GUI di QRM non contiene asset nel codice: colori, misure e texture arrivano da un **manifesto JSON** e da file PNG che un resource pack può sostituire senza toccare il mod. Il codice legge solo le chiavi elencate qui sotto.

Come un server distribuisce un tema (resource pack del server o locale, `F3+T`) è spiegato in [Temi](../server-owner/temi.md), insieme alla **tabella dei colori**.

## How it works

Il manifesto di QRM è `assets/qrm/theme/default.json` (versione `1`). Ha tre sezioni:

- `colors`: vedi [Temi](../server-owner/temi.md) per le chiavi e i valori predefiniti.
- `metrics`: misure, descritte sotto.
- `textures`: le texture, descritte sotto.

Le chiavi sono quelle elencate e solo quelle: le chiavi sconosciute nel manifesto di un pack vengono ignorate. Un pack può contenere **solo** il manifesto (per cambiare i colori), oppure solo alcuni PNG.

### Metriche

Numeri maggiori di 0 (anche decimali), in pixel della GUI salvo `carouselScale`, che è un fattore.

| Chiave | Predefinito | Significato |
| --- | --- | --- |
| `padding` | `8` | Spaziatura di base della schermata. |
| `cardWidth` | `120` | Larghezza di una carta del carosello. |
| `cardHeight` | `160` | Altezza di una carta del carosello. |
| `carouselScale` | `0.82` | Scala delle carte laterali rispetto a quella centrale. |
| `carouselGap` | `12` | Spazio fra due carte affiancate. |
| `idCardWidth` | `280` | Larghezza della carta d'identità nella creazione (ridotta se lo schermo è più stretto). |
| `hudMaxWidth` | `150` | Larghezza massima del pannello HUD. |

### Texture

Ogni voce ha `id` (il percorso della risorsa), `size` (`[larghezza, altezza]` in pixel del PNG) e, per le texture ridimensionabili (*nine-slice*), `slice` (`[sinistra, alto, destra, basso]`: i bordi in pixel che non vengono stirati). **`size` deve coincidere con le dimensioni reali del PNG**: il codice usa il valore del manifesto per il disegno.

| Chiave | `id` | `size` | `slice` |
| --- | --- | --- | --- |
| `panel` | `qrm:textures/gui/common/panel.png` | 48 × 48 | 6, 6, 6, 6 |
| `button.normal`, `.hover`, `.pressed`, `.disabled` | `qrm:textures/gui/common/button_<stato>.png` | 32 × 20 | 4, 4, 4, 4 |
| `button.confirm.normal`, `.hover`, `.pressed` | `qrm:textures/gui/common/button_confirm_<stato>.png` | 32 × 20 | 4, 4, 4, 4 |
| `button.danger.normal`, `.hover`, `.pressed` | `qrm:textures/gui/common/button_danger_<stato>.png` | 32 × 20 | 4, 4, 4, 4 |
| `icon.fingerprint` | `qrm:textures/gui/common/icon_fingerprint.png` | 20 × 20 | nessuno |
| `icon.play`, `.plus`, `.lock`, `.archive` | `qrm:textures/gui/common/icon_<nome>.png` | 16 × 16 | nessuno |
| `character.card`, `.selected`, `.new`, `.locked` | `qrm:textures/gui/character/card[_<stato>].png` | 120 × 160 | 8, 8, 8, 8 |
| `character.avatar` | `qrm:textures/gui/character/avatar.png` | 48 × 56 | nessuno |
| `character.idcard` | `qrm:textures/gui/character/id_card.png` | 48 × 48 | 10, 10, 10, 10 |
| `character.photo` | `qrm:textures/gui/character/photo_frame.png` | 24 × 24 | 3, 3, 3, 3 |
| `character.field`, `.focus` | `qrm:textures/gui/character/field[_focus].png` | 24 × 16 | 3, 3, 3, 3 |
| `character.toggle`, `.selected` | `qrm:textures/gui/character/toggle[_selected].png` | 20 × 16 | 3, 3, 3, 3 |
| `hud.panel` | `qrm:textures/gui/hud/panel.png` | 32 × 32 | 6, 6, 6, 6 |
| `hub.tab`, `.selected` | `qrm:textures/gui/hub/tab[_selected].png` | 40 × 16 | 3, 3, 3, 3 |
| `staff.slot` | `qrm:textures/gui/staff/slot.png` | 24 × 24 | 4, 4, 4, 4 |
| `staff.icon.back`, `.refresh`, `.close` | `qrm:textures/gui/staff/icon_<nome>.png` | 16 × 16 | nessuno |
| `staffpanel.frame` | `qrm:textures/gui/staffpanel/frame.png` | 48 × 48 | 12, 12, 12, 12 |
| `staffpanel.row`, `.row.selected`, `.row.soon`, `.row.danger` | `qrm:textures/gui/staffpanel/row[_<stato>].png` | 32 × 16 | 6, 6, 6, 6 |
| `staffpanel.inset` | `qrm:textures/gui/staffpanel/inset.png` | 24 × 24 | 5, 5, 5, 5 |
| `staffpanel.chip` | `qrm:textures/gui/staffpanel/chip.png` | 24 × 12 | 4, 4, 4, 4 |
| `staffpanel.gem.<sezione>` | `qrm:textures/gui/staffpanel/gem_<sezione>.png` | 14 × 14 | nessuno |

Le sezioni delle gemme sono `players`, `player_management`, `server_management`, `moderation`, `economy`, `organizations`, `logs` e `quick_actions`.

:::note Chiavi del vecchio menu staff
Il manifesto contiene ancora le chiavi del menu staff rimosso nella 0.10. Restano valide, ma il codice attuale non disegna più `staff.frame`, `staff.plate`, `staff.tile.player|jobs|orgs|perms|off` e `staff.icon.player|jobs|orgs|perms`. Sono invece ancora usate dal widget `IconSlot` delle schermate dei Modules (per esempio quella della banca) `staff.slot` e le icone `staff.icon.back`, `staff.icon.refresh` e `staff.icon.close`.
:::

### Dove vengono usate

- **Creazione del Character:** una carta d'identità. `character.idcard` è lo sfondo, `character.photo` la cornice della foto (con la testa 3D del Player, o `character.avatar` se manca), `character.field` e `character.field.focus` lo sfondo dei campi di testo, `character.toggle*` i pulsanti M/F. "Conferma e crea" e "Annulla" usano `button.confirm.*` e `button.danger.*`; `button.disabled` è comune a tutti gli stili.
- **Carosello:** le carte `character.card*` sono mini carte d'identità. "Gioca" e "Nuovo" usano `button.confirm.*`, "Archivia" `button.danger.*`. Lo sfondo è il mondo di gioco sfocato (`worldDim` e `worldFrost`): non c'è una texture di sfondo.
- **HUD e hub:** `hud.panel` per l'HUD in alto a sinistra; schede `hub.tab*` e pannello `character.idcard` per l'hub; il quadratino di servizio usa `statusOn` e `statusOff`.
- **Pannello staff:** `staffpanel.*` e i colori `staff*`. Cornice con doppio bordo dorato, righe a placca (`selected` per la selezione, `soon` per le azioni non ancora pronte, `danger` per quelle pericolose), riquadro incassato per le informazioni, pillola "presto" e una gemma da 14 pixel per sezione. Se il manifesto di un pack non ha queste chiavi, il pannello ripiega su un aspetto piatto.
- `panel` resta nel tema per le schermate future.

## Usage

### Usare arte propria

Sostituisci i PNG, nel mod o in un pack, agli stessi percorsi, **mantenendo le dimensioni** della tabella. Se cambi dimensioni o bordi, aggiorna nel manifesto `size` e `slice` della voce corrispondente. Nei nine-slice i bordi indicati in `slice` restano invariati e la parte centrale viene stirata.

### Frammenti di tema dei Modules

Un Module con interfaccia può registrare un proprio manifesto (`ThemeFragments.register`, vedi [Client API](client-api.md)) nello stesso formato di `default.json`. Le sue chiavi iniziano per `<idmodule>.`; chiavi senza prefisso o già esistenti sono scartate con un avviso. Un resource pack sostituisce un frammento allo stesso modo del tema di QRM: stesso percorso della risorsa del Module, e chiavi mancanti o invalide ricadono sul predefinito del Module.

## Regole di validazione

- `version` deve essere il numero `1`. Una versione diversa o assente scarta **tutto** il manifesto del pack.
- Colori: stringa `#RRGGBB` o `#AARRGGBB` (cifre esadecimali, maiuscole o minuscole).
- Metriche: numeri finiti e maggiori di 0.
- Texture: `id` nel formato `namespace:percorso` in minuscolo (nel namespace `a-z`, `0-9`, `_`, `.`, `-`; nel percorso anche `/`). `size` sono due interi fra 1 e 4096. `slice`, facoltativo, sono quattro interi `>= 0` con sinistra + destra < larghezza e alto + basso < altezza. Gli interi degli array devono stare entro ±100000.
- **Chiave mancante o invalida** (valore sbagliato, tipo sbagliato, voce texture non valida): quella chiave usa il valore predefinito del mod e nel log compare un avviso `QRM theme: ...`. Le altre chiavi valide del pack restano in uso. Una texture è valida o no per intero: se `slice` è sbagliato, l'intera voce (`id`, `size`, `slice`) torna al predefinito.
- **JSON rotto, radice che non è un oggetto o versione sconosciuta:** si usa l'intero tema del mod e nel log compare un errore (`QRM theme manifest from the active pack is invalid: using the built-in theme`).
- Il controllo non verifica che il PNG esista: una texture con `id` valido ma file mancante viene mostrata da Minecraft come texture mancante.

## Limitations

- Un pack può ridefinire i valori delle chiavi esistenti, non aggiungerne.
- Il campo Genere della creazione del Character è solo grafico: non viene inviato né salvato.

## Related

- [Temi (server owner)](../server-owner/temi.md)
- [Client API](client-api.md)
