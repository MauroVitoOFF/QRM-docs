# QRM Docs

Documentazione di [QRM (Quorum)](https://maurovitooff.github.io/QRM-docs/), il framework per server roleplay su NeoForge. Sito [Docusaurus](https://docusaurus.io/), in italiano, con due percorsi: **server owner** e **sviluppatori**.

## Sviluppo

Serve Node 20 o successivo.

```bash
npm install
npm start        # anteprima locale con ricarica
npm run build    # build di produzione; un link rotto fa fallire il build
```

Le pagine sono in `docs/`, la sidebar in `sidebars.js`. Il sito si pubblica da solo su GitHub Pages a ogni push su `main`.

## Contenuti di esempio

`samples/qrm-sample-pack/` è un resource pack di esempio per cambiare i colori della GUI di QRM (vedi la pagina Temi).

## Licenza

Apache-2.0, come QRM.
