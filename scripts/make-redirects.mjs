// Genera in site/ una pagina di rimando per ogni indirizzo della vecchia wiki.
// La wiki di QRM vive ora nella repository Quorum: https://maurovitooff.github.io/Quorum/docs/
// Uso: node scripts/make-redirects.mjs   (nessuna dipendenza)
import { mkdirSync, rmSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const NEW = 'https://maurovitooff.github.io/Quorum/docs/';

/** Vecchio percorso -> pagina della nuova wiki ('' = pagina iniziale). */
const MOVED = {
  '': '',
  'intro/moduli': '',
  'intro/requisiti': 'per-iniziare/installazione/',
  'intro/roadmap': 'riferimento/versioni/',
  'intro/stabilita': 'riferimento/versioni/',

  'server-owner': '',
  'server-owner/installazione': 'per-iniziare/installazione/',
  'server-owner/configurazione': 'riferimento/configurazione/',
  'server-owner/personaggi': 'sistemi/personaggi/',
  'server-owner/economia': 'sistemi/economia/',
  'server-owner/lavori': 'sistemi/lavori/',
  'server-owner/guida-creare-un-job': 'guide/creare-un-lavoro/',
  'server-owner/organizzazioni': 'sistemi/organizzazioni/',
  'server-owner/punti-di-interazione': 'sistemi/punti-di-interazione/',
  'server-owner/permessi': 'sistemi/permessi/',
  'server-owner/pannello-staff': 'sistemi/pannello-staff/',
  'server-owner/temi': 'guide/aspetto-interfaccia/',
  'server-owner/manutenzione': 'guide/backup-e-saldi/',

  'modules': '',
  'modules/bank': 'modules/bank/',
  'modules/bank/configurazione': 'modules/bank/',
  'modules/bank/comandi': 'modules/bank/',
  'modules/bank/api': 'modules/bank/',
  'modules/locker': 'modules/locker/',
  'modules/locker/api': 'modules/locker/',
  'modules/boss': 'modules/boss/',

  'riferimento': 'riferimento/comandi/',
  'riferimento/nodi-permesso': 'riferimento/nodi-di-permesso/',
  'riferimento/changelog': 'riferimento/versioni/',
  // Senza un equivalente nella nuova wiki: portano alla pagina iniziale.
  'riferimento/eventi': '',
  'riferimento/glossario': '',

  // La nuova wiki non ha la sezione per sviluppatori.
  'sviluppatori': '',
  'sviluppatori/quickstart': '',
  'sviluppatori/registro-servizi': '',
  'sviluppatori/eventi': '',
  'sviluppatori/client-api': '',
  'sviluppatori/build': '',
  'sviluppatori/tema-gui': 'riferimento/manifesto-del-tema/',
  'sviluppatori/servizi/economia': '',
  'sviluppatori/servizi/personaggi': '',
  'sviluppatori/servizi/lavori': '',
  'sviluppatori/servizi/organizzazioni': '',
  'sviluppatori/servizi/punti': '',
  'sviluppatori/servizi/permessi': '',
  'sviluppatori/servizi/staff': '',
  'sviluppatori/servizi/dati-mod': '',

  'search': '',
};

const page = (target) => `<!doctype html>
<html lang="it">
<head>
<meta charset="utf-8">
<title>La wiki di QRM si è spostata</title>
<meta name="robots" content="noindex">
<link rel="canonical" href="${target}">
<meta http-equiv="refresh" content="0; url=${target}">
<script>location.replace(${JSON.stringify(target)} + location.hash);</script>
<style>body{font:1rem/1.5 system-ui,sans-serif;max-width:34rem;margin:15vh auto;padding:0 1rem;background:#0b121b;color:#eaf0f6}a{color:#f5c75b}</style>
</head>
<body>
<h1>La wiki di QRM si è spostata</h1>
<p>Questa pagina ora si trova qui: <a href="${target}">${target}</a></p>
</body>
</html>
`;

const out = join(dirname(fileURLToPath(import.meta.url)), '..', 'site');
rmSync(out, { recursive: true, force: true });
for (const [old, moved] of Object.entries(MOVED)) {
  const dir = join(out, old);
  mkdirSync(dir, { recursive: true });
  writeFileSync(join(dir, 'index.html'), page(NEW + moved));
}
// Qualsiasi altro indirizzo: GitHub Pages serve 404.html, che rimanda alla pagina iniziale.
writeFileSync(join(out, '404.html'), page(NEW));
writeFileSync(join(out, '.nojekyll'), '');
console.log(`scritte ${Object.keys(MOVED).length + 1} pagine di rimando in site/`);
