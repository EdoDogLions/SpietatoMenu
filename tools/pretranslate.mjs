// Pre-traduce nomi, descrizioni e orari del menù in EN/ES/DE/FR e stampa
// un modulo `translations.js` con le traduzioni pre-calcolate (istantanee, offline).
//
// Uso:  node tools/pretranslate.mjs > translations.js
//
// Legge il menù reale da Supabase (fallback al menù predefinito). Le voci fisse
// (categorie, etichette, allergeni) NON servono qui: sono già tradotte in i18n.js.
import { fetchMenu } from '../supa.js';
import { DEFAULT_MENU } from '../menu-data.js';

const LANGS = ['en', 'es', 'de', 'fr'];
const sleep = ms => new Promise(r => setTimeout(r, ms));
const decode = s => String(s)
  .replace(/&#(\d+);/g, (_, n) => String.fromCharCode(+n))
  .replace(/&quot;/g, '"').replace(/&#39;/g, "'").replace(/&apos;/g, "'")
  .replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&amp;/g, '&');

async function mm(text, lang) {
  const url = 'https://api.mymemory.translated.net/get?q=' + encodeURIComponent(text) + '&langpair=it|' + lang;
  try {
    const r = await fetch(url);
    const j = await r.json();
    const out = j && j.responseData && j.responseData.translatedText;
    const st = j && j.responseStatus;
    if (!out || (st && st !== 200) || /MYMEMORY WARNING|QUERY LENGTH|INVALID/i.test(out)) return null;
    return decode(out).trim();
  } catch (e) { return null; }
}

const live = await fetchMenu().catch(() => null);

// Unione di menù reale (Supabase) + menù predefinito (fallback offline),
// così le traduzioni sono pronte comunque venga servito il menù.
const strings = new Set();
for (const menu of [live, DEFAULT_MENU]) {
  if (!menu) continue;
  for (const c of menu.categorie) for (const v of c.voci) {
    if (v.nome) strings.add(v.nome);
    if (v.desc) strings.add(v.desc);
  }
  if (menu.info && menu.info.orari) menu.info.orari.split('\n').forEach(l => l.trim() && strings.add(l.trim()));
}
const list = [...strings];
process.stderr.write('Stringhe da tradurre: ' + list.length + ' x ' + LANGS.length + ' lingue\n');

const PRE = {};
for (const lang of LANGS) {
  PRE[lang] = {};
  for (const s of list) {
    let tx = null;
    for (let a = 0; a < 3 && tx == null; a++) { tx = await mm(s, lang); if (tx == null) await sleep(1000); }
    if (tx) PRE[lang][s] = tx;               // salva anche se uguale: niente chiamate a runtime
    process.stderr.write(tx ? '.' : 'x');
    await sleep(250);
  }
  process.stderr.write(' [' + lang + ' ' + Object.keys(PRE[lang]).length + '/' + list.length + ']\n');
}

const header =
  '// GENERATO da tools/pretranslate.mjs — traduzioni pre-calcolate del menù (EN/ES/DE/FR).\n' +
  '// Rigenera dopo modifiche importanti al menù:  node tools/pretranslate.mjs > translations.js\n';
process.stdout.write(header + 'export const PRE = ' + JSON.stringify(PRE, null, 1) + ';\n');
