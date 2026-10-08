---
sidebar_label: Eventi
---

# Eventi

Questa pagina descrive il bus di eventi di QRM: come registrare un handler, come bloccare un'azione e quali regole valgono. È rivolta agli sviluppatori di Modules. Tutti gli eventi sono elencati nel [riferimento](../riferimento/eventi.md).

## Overview

QRM ha un proprio bus di eventi (`dev.qrm.api.event.EventBus`), separato da quello di NeoForge. Serve a due cose: **reagire** a ciò che è successo e **intervenire** prima che succeda.

## How it works

- Gli eventi **`…Pre…`** partono prima dell'azione e sono annullabili: estendono `CancellableEvent`, e `cancel(by, reason)` blocca l'azione. Dove previsto sono anche modificabili, per esempio `TransactionPreEvent.setAmount(...)` (stessa Currency).
- Gli eventi **`…Changed`, `…Created`, `…Post…`** partono dopo l'azione e non si possono annullare.
- Il chiamante di un'azione annullata riceve un esito `Cancelled(by, reason)` (nei risultati sealed come `TransferResult` o `AssignResult`).
- Gli handler girano per priorità, da `EARLIEST` a `LATEST`, e a pari priorità nell'ordine di registrazione.
- Gli eventi sono **sincroni**, sul thread del server.
- Un handler che lancia un'eccezione viene isolato: l'errore è scritto nel log col nome del tuo mod e gli altri handler girano comunque.

## Usage

```java
QRM.events().register(TransactionPreEvent.class, "mymod", e -> {
    if (e.request().reason().startsWith("illegal.")) e.cancel("mymod", "blocked");
});
```

Il secondo argomento è il nome del tuo mod: finisce nei log se il tuo handler lancia un'eccezione e in `cancelledBy` quando annulli.

## API

```java
EventBus.register(Class<E> type, Priority priority, boolean ignoreCancelled, String owner, Consumer<? super E> handler)
```

`Priority` è `EARLIEST`, `EARLY`, `NORMAL`, `LATE`, `LATEST`. Con `ignoreCancelled = true` l'handler viene saltato se l'evento è già stato annullato da qualcun altro. La forma corta `register(type, owner, handler)` usa `NORMAL` e `ignoreCancelled = false`. `register(...)` restituisce una `Registration`: `unregister()` toglie l'handler. `QRM.events()` è disponibile già nel costruttore del tuo mod.

## Limitations

- Un handler lento rallenta il thread del server.
- Gli eventi `Post` e `Changed` non possono annullare un'azione già avvenuta.
- Per intervenire sulle operazioni di denaro, anche di Bank, usa `TransactionPreEvent` e il campo `reason` della richiesta (per esempio `bank.withdraw`). Vedi [API di Bank](../modules/bank/api.md).

## Related

- [Riferimento degli eventi](../riferimento/eventi.md)
- [Registro dei servizi](registro-servizi.md)
- [Economy](servizi/economia.md)
