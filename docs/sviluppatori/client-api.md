---
sidebar_label: Client API
---

# Client API

Questa pagina documenta `qrm-client-api`: tema, widget, righe HUD e voci del pannello staff. È rivolta agli sviluppatori di Modules con interfaccia. Disponibile dalla 0.6; le parti sul pannello staff dalla 0.10.

:::caution Experimental
API `0.x`: può cambiare tra una minor e l'altra.
:::

## Overview

Un Module con interfaccia dipende da `qrm-api` (server) e da `qrm-client-api`; non dipende mai da `qrm-neoforge`.

```groovy
dependencies {
    compileOnly 'dev.qrm:qrm-api:0.11.0'
    compileOnly files('libs/qrm-0.11.0.jar')   // contiene le classi di qrm-client-api
}
```

`qrm-client-api` non ha ancora una pubblicazione Maven: le sue classi sono dentro il jar `qrm`, che qui usi in compilazione come file. Nel progetto QRM (come in `qrm-example`) è invece un sottoprogetto: `compileOnly project(':qrm-client-api')`. A runtime non vanno aggiunte al tuo mod, perché le porta già il jar `qrm`.

:::warning Solo lato client
`qrm-client-api` usa classi `net.minecraft.client.*`. **Tutto il codice che la usa deve stare in classi caricate solo sul client** (`@Mod(value = "...", dist = Dist.CLIENT)`), altrimenti il server dedicato fallisce al caricamento. Il Module `qrm-example` mostra lo schema completo (`ExampleClient`, `ExampleScreen`).
:::

## How it works

### Tema

Le chiavi di QRM (`panel`, `button.*`, `character.field`, `character.idcard`, `text`, `accent`, `padding`, ...) si usano così:

```java
ThemeRenderer.draw(g, "panel", x, y, w, h);              // g è un GuiGraphicsExtractor
int color = ThemeRenderer.color("accent");
double padding = QrmTheme.current().metric("padding");
```

Fanno parte dell'API (vedi [Tema della GUI](tema-gui.md)): non vengono rinominate senza cambiare versione maggiore.

### Widget

- `QrmScreen`: schermata base con sfondo a vetro appannato, che non mette in pausa il gioco.
- `ThemedButton`, con gli stili `DEFAULT`, `CONFIRM` e `DANGER`.
- `ThemedToggle`: interruttore con texture configurabili.
- `ThemedField`: casella di testo con lo sfondo del tema.
- `IconSlot`: slot quadrato con icona, usato dalle schermate dei Modules (per esempio il pulsante "Indietro").
- `TextFit.fit(font, text, width)`: accorcia il testo per farlo stare in una larghezza.

## Usage

### Il tuo frammento di tema

Registra un frammento nel costruttore client del Module:

```java
ThemeFragments.register("bank", Identifier.fromNamespaceAndPath("bank", "theme/qrm.json"));
```

La risorsa `assets/bank/theme/qrm.json` ha lo stesso formato di `default.json` (versione 1), e le sue chiavi **devono iniziare per `bank.`** (per esempio `bank.atm.panel`). Chiavi senza prefisso o già esistenti vengono scartate con un avviso `QRM theme (bank): ...` nel log. Un resource pack può sostituire il frammento (stesso percorso), chiave per chiave. L'id del Module è `[a-z][a-z0-9_]{0,31}` e si registra una sola volta.

### Righe dell'HUD

```java
HudRows.register("bank:debt", () -> Optional.of(new HudLine("Debito: 5 Q", "statusOff", null)));
```

`HudRow.line()` è chiamata a ogni disegno, quindi deve essere leggera. Restituisce un `HudLine(text, colorKey, dotColorKey)`: il testo, la chiave di tema del colore del testo (assente o sconosciuta: `text`) e la chiave facoltativa del colore di un quadratino di stato, oppure `null`. `Optional.empty()` significa che non c'è nulla da mostrare. `HudLine.of("text")` è la scorciatoia per una riga semplice.

L'id ha la forma `spazio:nome` (minuscolo, al massimo 48 caratteri). **Una riga compare solo se il server la elenca** in `gui.hud.elements` di `qrm-common.toml`, per esempio `["name", "balance", "job", "bank:debt"]`: l'ordine dell'elenco è l'ordine delle righe. Se la riga lancia un'eccezione viene saltata e segnalata una volta sola nel log.

### Voci del pannello staff

Il [pannello staff](../server-owner/pannello-staff.md) ha sezioni (`StaffEntries.Section`): *Players*, *Player Management*, *Server Management*, *Moderation*, *Economy*, *Organizations*, *Logs & Transactions*, *Quick Actions*. Un Module vi aggiunge una voce così:

```java
StaffEntries.register(new StaffEntries.Entry("bank", StaffEntries.Section.ECONOMY, "qrm_bank.staff.tile",
        StaffNodes.BANK, true, () -> serverHasBank(),
        ctx -> Minecraft.getInstance().setScreenAndShow(new StaffBankScreen(ctx))));
```

- `id`: `[a-z][a-z0-9_]{0,31}`, unico (un id già registrato lancia `IllegalStateException`).
- `section`: una delle sezioni, tranne `PLAYERS`.
- `labelKey`: chiave di traduzione dell'etichetta.
- `node`: nodo esatto richiesto per vedere la voce (per esempio `staff.bank`).
- `requiresTarget`: se vero, la voce è disattivata finché non c'è un bersaglio.
- `available`: valutata a ogni tick, deve essere leggera; falso = la voce non compare (tipico: il server non ha il tuo Module, per esempio `connection.hasChannel(YourPayload.TYPE)`).
- `open` riceve un `StaffEntries.Context(target, targetName, back)`: il bersaglio (`Optional<UUID>`: la scheda aperta o, se non c'è, il Player inquadrato), il suo nome e `back()`, che chiude la schermata e torna al gioco.

La voce è solo l'ingresso: **schermata e pacchetti sono del tuo Module**, e il tuo server deve ricontrollare il nodo a ogni pacchetto (vedi [Staff](servizi/staff.md)).

### Azioni della scheda Player

Un'azione ha una di tre forme. Il pannello si occupa dell'interfaccia e passa il risultato in `Context.arg()`; `Context` ha anche `player()`, `name()` e `back()`.

```java
// semplice: una pressione
StaffPlayerActions.register(Action.of("heal", "my.staff.heal", "staff.player.heal", false,
        ctx -> MyClient.heal(ctx.player())));

// a scelte: il pannello apre una pagina di voci; la scelta arriva in ctx.arg()
StaffPlayerActions.register(Action.withChoices("set_gamemode", "my.staff.gm", "staff.player.set_gamemode", false,
        List.of(new Choice("creative", "my.gm.creative")), ctx -> MyClient.gm(ctx.player(), ctx.arg())));

// con input: una finestrella con i campi; i valori arrivano in ctx.arg(), uno per riga
StaffPlayerActions.register(Action.withInput("kick", "my.staff.kick", "staff.player.kick", true,
        List.of(new Field("my.reason", "my.reason.hint", 128, false)), ctx -> MyClient.kick(ctx.player(), ctx.arg())));
```

`Action`, `Choice` e `Field` sono i record annidati di `StaffPlayerActions`.

- `danger`: riga in rosso. L'azione semplice chiede una seconda pressione ("Premi di nuovo per confermare"); quelle con input hanno già la finestrella come conferma.
- `Field(labelKey, hintKey, maxLength, required)` descrive un campo di input.
- `Action.planned(id, labelKey, node, danger)`: l'azione è visibile ma disattivata con l'etichetta "presto". Serve per annunciare funzioni non ancora pronte.
- Un'azione non può avere insieme scelte e campi.
- Le dieci azioni di QRM (`teleport_to`, `bring`, `freeze`, `heal`, `give_item`, `set_gamemode`, `kick`, `ban`, `view_character`, `view_permissions`) hanno nodo `staff.player.<id>` e sono eseguite dal server.
- Un'azione informativa (come *View permissions*) fa rispondere il server con righe (chiave di etichetta, valore) e il pannello le mostra in una pagina; `←` la chiude.

### Permissions

- La voce o azione compare solo se l'account ha il nodo: l'operatore ha tutto, gli altri i grant di `/qrm admin staff grant <player> <node>` (anche `staff.*`, `staff.player.*`, `staff.module.*`). I nodi sono legati all'**account**.
- Il filtro del client è solo comodità: **il server del Module deve ricontrollare il nodo a ogni pacchetto**.

## Limitations

- Schede dell'hub dei Modules e aiuti di rete: This functionality is not currently available. Un Module registra i propri pacchetti con NeoForge e apre le proprie schermate con un tasto o un'interazione propri.
- `qrm-client-api` non ha una pubblicazione Maven.
- Una riga HUD compare solo se il server la elenca in `gui.hud.elements`.

## Related

- [Tema della GUI](tema-gui.md)
- [Staff](servizi/staff.md)
- [Pannello staff](../server-owner/pannello-staff.md)
- [Build del progetto](build.md)
