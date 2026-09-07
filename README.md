# Menù digitale — Osteria Lo Spietato

Menù sfogliabile per i clienti + area gestori con login.

## File
- `Menu Cliente.dc.html` — menù per i clienti (apri questo, o rinominalo `index.html`)
- `Admin.dc.html` — area gestori (login: vedi gestore)
- `menu-data.js` — dati predefiniti del menù
- `support.js` — runtime necessario alle pagine
- `logo.png` — logo

## Deploy gratis su GitHub Pages
1. Crea un repo su github.com (es. `menu-lo-spietato`, pubblico).
2. Carica questi 5 file (Add file → Upload files):
   `index.html`, `admin.html`, `support.js`, `menu-data.js`, `logo.png`.
3. Settings → Pages → Source: branch `main`, cartella `/ (root)` → Save.
4. Dopo ~1 minuto il menù è online su `https://TUOUTENTE.github.io/menu-lo-spietato/`.
   Genera un QR code di quell'indirizzo per i tavoli.

Alternative gratuite senza account GitHub: netlify.com (trascini la cartella su
"Netlify Drop") oppure vercel.com.

## Limite importante (prototipo)
Le modifiche fatte dall'area gestori sono salvate **solo nel browser che le fa**
(localStorage): sul sito pubblicato i clienti vedranno sempre il menù di
`menu-data.js`. Per aggiornare il menù online: modifica `menu-data.js` nel repo
(GitHub Pages ripubblica da solo), oppure collega un piccolo backend gratuito
(es. Supabase/Firebase) per rendere l'area gestori davvero condivisa.
