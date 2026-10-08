---
sidebar_label: Eventi
---

# Eventi

QRM ha un proprio bus di eventi (`dev.qrm.api.event.EventBus`), separato da quello di NeoForge. Serve a due cose: **reagire** a ciò che è successo e **intervenire** prima che succeda.

```java
QRM.events().register(TransactionPreEvent.class, "mymod", e -> {
    if (e.request().reason().startsWith("illegal.")) e.cancel("mymod", "blocked");
});
```

Il secondo argomento è il nome del tuo mod: finisce nei log se il tuo handler lancia un'eccezione e in `cancelledBy` quando annulli.

## Eventi `Pre` e `Post`

- Gli eventi **`…Pre…`** partono prima dell'azione e sono annullabili: estendono `CancellableEvent`, e `cancel(by, reason)` blocca l'azione. Dove previsto sono anche modificabili, per esempio `TransactionPreEvent.setAmount(...)` (stessa valuta).
- Gli eventi **`…Changed`, `…Created`, `…Post…`** partono dopo l'azione e non si possono annullare.
- Il chiamante di un'azione annullata riceve un esito `Cancelled(by, reason)` (nei risultati sealed come `TransferResult` o `AssignResult`).

Il [riferimento degli eventi](../riferimento/eventi.md) elenca tutti gli eventi disponibili.

## Priorità

```java
EventBus.register(Class<E> type, Priority priority, boolean ignoreCancelled, String owner, Consumer<? super E> handler)
```

`Priority` va da `EARLIEST` a `LATEST` (`EARLIEST`, `EARLY`, `NORMAL`, `LATE`, `LATEST`). Gli handler girano in quest'ordine e, a pari priorità, nell'ordine di registrazione. Con `ignoreCancelled = true` l'handler viene saltato se l'evento è già stato annullato da qualcun altro. La forma corta `register(type, owner, handler)` usa `NORMAL` e `ignoreCancelled = false`.

`register(...)` restituisce una `Registration`: `unregister()` toglie l'handler.

## Cose da sapere

- Gli eventi sono **sincroni**, sul thread del server. Tieni gli handler veloci.
- Un handler che lancia un'eccezione viene isolato: l'errore è scritto nel log col nome del tuo mod e gli altri handler girano comunque.
- `QRM.events()` è disponibile già nel costruttore del tuo mod.
- Per intervenire sui movimenti di denaro, anche della banca, usa `TransactionPreEvent` e il campo `reason` della richiesta (per esempio `bank.withdraw`). Vedi [API della banca](api-banca.md).
