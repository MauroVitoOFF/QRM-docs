---
sidebar_label: Build del progetto
---

# Build del progetto

Questa pagina descrive la toolchain di QRM, i comandi Gradle utili e il Module di esempio. È rivolta agli sviluppatori di Modules.

## Overview

| Voce | Valore |
| --- | --- |
| Minecraft | 26.2 |
| NeoForge | 26.2.0.88 |
| ModDevGradle | 2.0.148 (`id 'net.neoforged.moddev'`) |
| Gradle | 9.2.1, tramite il wrapper `./gradlew` |
| Java | 25 (`java.toolchain.languageVersion = JavaLanguageVersion.of(25)`) |

Il progetto segue lo stile dell'MDK di NeoForge. Nel `gradle.properties` di QRM la versione del mod è `qrm_version`: è l'unica fonte da cui leggono i metadati `neoforge.mods.toml` e gli intervalli di versione.

## How it works

### Differenze API da sapere (Minecraft 26.2)

Se arrivi da una versione più vecchia di Minecraft:

- `ResourceLocation` è sostituito da `net.minecraft.resources.Identifier` (`Identifier.parse("minecraft:iron_ingot")`, `Identifier.fromNamespaceAndPath(ns, path)`).
- Il livello operatore di un comando non si controlla più con `hasPermission(2)`: si usa `source.permissions().hasPermission(Permissions.COMMANDS_GAMEMASTER)` (`net.minecraft.server.permissions.Permissions`), oppure `.requires(...)` con lo stesso controllo.
- `ModContainer` è in `net.neoforged.fml.ModContainer` e `ModConfig` in `net.neoforged.fml.config.ModConfig`; `@Mod` è in `net.neoforged.fml.common.Mod`.

### Il Module di esempio

`qrm-example` è un Module che dipende solo da `qrm-api` e `qrm-client-api`, come dovrebbe fare il tuo. Mostra come:

- registrare una Currency (`EXC`) e un Job (`example_worker`, collegato a un'Organization) nel costruttore;
- intervenire prima di una Transaction e reagire dopo (`TransactionPreEvent`, `TransactionPostEvent`);
- aggiungere comandi (`/example paycheck|work|shop`);
- lato client, registrare un frammento di tema e una riga dell'HUD (`ExampleClient`, `ExampleScreen`).

Nel suo `build.gradle` le dipendenze sono:

```groovy
dependencies {
    compileOnly project(':qrm-api')
    compileOnly project(':qrm-client-api')
    runtimeOnly(project(':qrm-neoforge')) { transitive = false }
}
```

`runtimeOnly` porta il jar `qrm` (con `qrm-api` e `qrm-core` come jar-in-jar) nel classpath di avvio del server di sviluppo, senza trascinare le sue dipendenze. In un progetto esterno, dove QRM non è un sottoprogetto, il jar di QRM va aggiunto allo stesso modo come dipendenza di solo runtime locale (`localRuntime` nello schema dell'MDK).

## Usage

```bash
./gradlew build                    # compila e testa tutti i sottoprogetti
./gradlew :qrm-example:runServer   # server di sviluppo con il Module di esempio
./gradlew :qrm-example:runClient   # client di sviluppo
./gradlew :qrm-neoforge:runServer   # server di sviluppo di QRM, con valuta e Jobs di prova (0.14)
./gradlew :qrm-neoforge:runClient   # client di sviluppo di QRM (0.14)
./gradlew :qrm-api:japicmp -PapiBaseline=<versione>   # compatibilità binaria dell'API
```

Con `runClient` senza il prefisso del sottoprogetto Gradle avvia il client di ogni sottoprogetto che lo definisce: indica sempre `:qrm-neoforge:` o `:qrm-example:`.

Dalla 0.14 il server di sviluppo di `qrm-neoforge` legge la tastiera: si scrivono i comandi nella finestra da cui è stato avviato (`./gradlew :qrm-neoforge:runServer --console=plain`). Prima dell'avvio il task `seedDevData` copia in `run/world/qrm/data` la valuta e i Jobs di prova che stanno in `qrm-neoforge/dev-data`, senza sovrascrivere i file già presenti.

:::warning Evita `clean`
`./gradlew clean` cancella i file degli argomenti di avvio generati da ModDevGradle (`build/moddev/...RunVmArgs.txt`), e gli avvii dall'IDE falliscono finché non li rigeneri con `./gradlew :qrm-example:prepareClientRun :qrm-example:prepareServerRun`. Per una build da zero preferisci `./gradlew build --rerun-tasks`.
:::

### Test

I test delle parti pure (senza classi di Minecraft) si scrivono con JUnit come in qualunque progetto Java. Per quelli che usano classi di Minecraft, `qrm-client-api` e il codice del mod devono stare nello stesso livello di classi: in `qrm-neoforge` i due sourceSet sono dichiarati insieme nel blocco `mods { qrm { ... } }`.

## Limitations

- Solo Minecraft 26.2 e NeoForge 26.2.0.88 sono supportati.
- `qrm-api` non ha un repository Maven pubblico: funziona `publishToMavenLocal`.

## Related

- [Quickstart](quickstart.md)
- [Client API](client-api.md)
- [Requisiti](../intro/requisiti.md)
