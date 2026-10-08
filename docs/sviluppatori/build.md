---
sidebar_label: Build del progetto
---

# Build del progetto

## Toolchain

| Voce | Valore |
| --- | --- |
| Minecraft | 26.2 |
| NeoForge | 26.2.0.88 |
| ModDevGradle | 2.0.148 (`id 'net.neoforged.moddev'`) |
| Gradle | 9.2.1, tramite il wrapper `./gradlew` |
| Java | 25 (`java.toolchain.languageVersion = JavaLanguageVersion.of(25)`) |

Il progetto segue lo stile dell'MDK di NeoForge. Nel `gradle.properties` di QRM la versione del mod è `qrm_version`: è l'unica fonte da cui leggono i metadati `neoforge.mods.toml` e gli intervalli di versione.

## Differenze API da sapere (Minecraft 26.2)

Se arrivi da una versione più vecchia di Minecraft:

- `ResourceLocation` è sostituito da `net.minecraft.resources.Identifier` (`Identifier.parse("minecraft:iron_ingot")`, `Identifier.fromNamespaceAndPath(ns, path)`).
- Il livello operatore di un comando non si controlla più con `hasPermission(2)`: si usa `source.permissions().hasPermission(Permissions.COMMANDS_GAMEMASTER)` (`net.minecraft.server.permissions.Permissions`), oppure `.requires(...)` con lo stesso controllo.
- `ModContainer` è in `net.neoforged.fml.ModContainer` e `ModConfig` in `net.neoforged.fml.config.ModConfig`; `@Mod` è in `net.neoforged.fml.common.Mod`.

## Comandi Gradle utili

```bash
./gradlew build                    # compila e testa tutti i moduli
./gradlew :qrm-example:runServer   # server di sviluppo con il modulo di esempio
./gradlew :qrm-example:runClient   # client di sviluppo
./gradlew :qrm-api:japicmp -PapiBaseline=<versione>   # compatibilità binaria dell'API
```

:::warning Evita `clean`
`./gradlew clean` cancella i file degli argomenti di avvio generati da ModDevGradle (`build/moddev/...RunVmArgs.txt`), e gli avvii dall'IDE falliscono finché non li rigeneri con `./gradlew :qrm-example:prepareClientRun :qrm-example:prepareServerRun`. Per una build da zero preferisci `./gradlew build --rerun-tasks`.
:::

## Il modulo di esempio

`qrm-example` è un modulo che dipende solo da `qrm-api` e `qrm-client-api`, come dovrebbe fare il tuo. Mostra come:

- registrare una valuta (`EXC`) e un lavoro (`example_worker`, collegato a un'organizzazione) nel costruttore;
- intervenire prima di una transazione e reagire dopo (`TransactionPreEvent`, `TransactionPostEvent`);
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

## Test

I test delle parti pure (senza classi di Minecraft) si scrivono con JUnit come in qualunque progetto Java. Per quelli che usano classi di Minecraft, `qrm-client-api` e il codice del mod devono stare nello stesso livello di classi: in `qrm-neoforge` i due sourceSet sono dichiarati insieme nel blocco `mods { qrm { ... } }`.
