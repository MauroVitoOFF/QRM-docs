---
sidebar_label: Quickstart
---

# Quickstart: il tuo primo modulo

Un modulo è un mod NeoForge normale che dichiara QRM come dipendenza e lo usa tramite `qrm-api`. Il modulo `qrm-example` del repository è un esempio completo; qui il minimo indispensabile.

## 1. La dipendenza

```groovy
dependencies {
    compileOnly 'dev.qrm:qrm-api:0.11.0'
    // solo se il tuo modulo ha schermate lato client: vedi la nota qui sotto
}
```

Usa `compileOnly`: a runtime le librerie le porta già il jar `qrm`, che le contiene (`qrm-api` e `qrm-core` come jar-in-jar, le classi di `qrm-client-api` nel proprio jar). Non dipendere mai da `qrm-core` o da `qrm-neoforge`: sono dettagli interni e possono cambiare.

:::note
QRM non pubblica ancora gli artefatti su un repository Maven. `qrm-api` si ottiene con `./gradlew publishToMavenLocal` dal progetto QRM. `qrm-client-api` non ha ancora una pubblicazione Maven: le sue classi sono dentro il jar `qrm`, che per le schermate puoi usare in compilazione come file (`compileOnly files('libs/qrm-0.11.0.jar')`).
:::

## 2. I metadati del mod

In `META-INF/neoforge.mods.toml` dichiara QRM come dipendenza obbligatoria, caricata prima del tuo mod:

```toml
[[dependencies.mymod]]
modId = "qrm"
type = "required"
versionRange = "[0.11.0,)"
ordering = "AFTER"
side = "BOTH"
```

`side = "BOTH"` indica che la dipendenza vale su entrambi i lati; il client di QRM è comunque facoltativo per chi gioca, quindi non dare per scontato che i giocatori abbiano la GUI di QRM.

## 3. Il codice

```java
@Mod("mymod")
public final class MyMod {
    private static final String OWNER = "mymod";

    public MyMod(IEventBus modBus) {
        // Già nel costruttore: valute, lavori ed eventi si possono registrare subito.
        QRM.get(CurrencyRegistry.class).register(new Currency("EXC", "E", 2));

        QRM.events().register(TransactionPostEvent.class, OWNER, e ->
                LOGGER.info("Transazione {}: {} {}", e.transaction().id(),
                        e.transaction().amount().amount(), e.transaction().amount().currency()));
    }
}
```

Nel costruttore sono già disponibili `EventBus`, `CurrencyRegistry` e `JobRegistry`. Tutti gli altri servizi (economia, personaggi, organizzazioni, ...) arrivano all'avvio del server: usali dentro un handler di `QrmReadyEvent` o più tardi, come spiega il [registro dei servizi](registro-servizi.md).

## 4. Provalo

Avvia il server di sviluppo del tuo progetto con QRM nel classpath di runtime. In `qrm-example` si fa con `compileOnly project(':qrm-api')` più `runtimeOnly(project(':qrm-neoforge')) { transitive = false }`, e poi `./gradlew :qrm-example:runServer`. Maggiori dettagli in [Build del progetto](build.md).

## Dove andare dopo

- Per muovere denaro: [Economia](servizi/economia.md).
- Per bloccare o modificare azioni di altri: [Eventi](eventi.md).
- Per aggiungere una schermata o una riga all'HUD: [Client API](client-api.md).
