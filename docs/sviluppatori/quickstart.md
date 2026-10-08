---
sidebar_label: Quickstart
---

# Quickstart: il tuo primo Module

Questa pagina mostra il minimo necessario per scrivere un Module: la dipendenza, i metadati e un po' di codice. È rivolta a chi sviluppa mod NeoForge. Il Module `qrm-example` del repository è un esempio completo.

## Overview

Un Module è un mod NeoForge normale che dichiara QRM come dipendenza e lo usa tramite l'API. Non dipende da `qrm-core` né da `qrm-neoforge`: sono dettagli interni e possono cambiare.

## Usage

### 1. La dipendenza

```groovy
dependencies {
    compileOnly 'dev.qrm:qrm-api:0.11.0'
    // solo se il Module ha schermate lato client: vedi la nota qui sotto
}
```

Usa `compileOnly`: a runtime le librerie le porta già il jar `qrm`, che le contiene (`qrm-api` e `qrm-core` come jar-in-jar, le classi di `qrm-client-api` nel proprio jar).

:::note
QRM non pubblica ancora gli artefatti su un repository Maven. `qrm-api` si ottiene con `./gradlew publishToMavenLocal` dal progetto QRM. `qrm-client-api` non ha ancora una pubblicazione Maven: le sue classi sono dentro il jar `qrm`, che per le schermate puoi usare in compilazione come file (`compileOnly files('libs/qrm-0.11.0.jar')`).
:::

### 2. I metadati del mod

In `META-INF/neoforge.mods.toml` dichiara QRM come dipendenza obbligatoria, caricata prima del tuo mod:

```toml
[[dependencies.mymod]]
modId = "qrm"
type = "required"
versionRange = "[0.11.0,)"
ordering = "AFTER"
side = "BOTH"
```

`side = "BOTH"` indica che la dipendenza vale su entrambi i lati. Il client di QRM è comunque facoltativo per chi gioca: non dare per scontato che i Players abbiano la GUI di QRM.

### 3. Il codice

```java
@Mod("mymod")
public final class MyMod {
    private static final Logger LOGGER = LoggerFactory.getLogger("mymod");
    private static final String OWNER = "mymod";

    public MyMod(IEventBus modBus) {
        QRM.get(CurrencyRegistry.class).register(new Currency("EXC", "E", 2));

        QRM.events().register(TransactionPostEvent.class, OWNER, e ->
                LOGGER.info("Transaction {}: {} {}", e.transaction().id(),
                        e.transaction().amount().amount(), e.transaction().amount().currency()));
    }
}
```

Il codice registra una Currency e un handler che scrive nel log ogni Transaction completata. Nel costruttore sono già disponibili `EventBus`, `CurrencyRegistry` e `JobRegistry`. Gli altri servizi (Economy, Characters, Organizations, ...) arrivano all'avvio del server: usali in un handler di `QrmReadyEvent` o più tardi ([registro dei servizi](registro-servizi.md)).

### 4. Provalo

Avvia il server di sviluppo del tuo progetto con QRM nel classpath di runtime. In `qrm-example` si fa con `compileOnly project(':qrm-api')` più `runtimeOnly(project(':qrm-neoforge')) { transitive = false }`, poi `./gradlew :qrm-example:runServer`. Vedi [Build del progetto](build.md).

## Limitations

- Non c'è un repository Maven pubblico: l'API si ottiene con `publishToMavenLocal`.
- `qrm-client-api` non ha una pubblicazione Maven.

## Related

- [Registro dei servizi](registro-servizi.md)
- [Economy](servizi/economia.md)
- [Eventi](eventi.md)
- [Client API](client-api.md)
