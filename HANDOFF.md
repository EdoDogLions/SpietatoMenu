# Handoff: Menù digitale — Osteria Lo Spietato

## Overview
Sistema client/server per il menù di un ristorante (Osteria Lo Spietato, Fano).
Due interfacce:
- **Menù cliente**: libretto sfogliabile con effetto voltapagina, pensato per
  smartphone raggiunti da QR code sul tavolo. Sette categorie (antipasti, primi,
  secondi, contorni, dolci, bevande, amari) + copertina + pagina informazioni.
- **Area gestori**: login email/password, CRUD sui piatti, riordino, nascondi
  (esaurito), allergeni, piatto del giorno, coperto e dati del locale.

Backend: **Supabase** (Postgres + Auth). Il menù è un singolo documento JSON in
una riga di tabella; le pagine sono statiche e possono stare su qualunque host.

## About the Design Files
I file HTML in questo bundle sono **riferimenti di design realizzati in HTML**:
prototipi funzionanti che mostrano aspetto e comportamento previsti, non codice
di produzione da copiare così com'è. Il compito è **ricreare questi design
nell'ambiente del codebase di destinazione** (React/Next, Vue, SwiftUI, native…)
usando i pattern e le librerie già in uso. Se non esiste ancora un ambiente,
scegliere il framework più adatto e implementare lì.

Nota tecnica: i `.dc.html` usano un runtime di prototipazione (`support.js`) con
template e una classe di logica. La logica utile da portare è quella nella classe
`Component` (stato, paginazione, chiamate a Supabase); il runtime non va portato.
`index.html` / `admin.html` sono le copie pubblicate delle stesse due pagine.

## Fidelity
**High-fidelity.** Colori, tipografia, spaziature, stati e copy sono definitivi e
vanno riprodotti fedelmente. Il codice cliente/server è funzionante: la
persistenza su Supabase, la cache locale e il login sono reali, non simulati.

## Screens / Views

### 1. Menù cliente — copertina
- **Purpose**: primo schermo dopo la scansione del QR; identifica il locale e
  invita a sfogliare.
- **Layout**: pagina centrata verticalmente e orizzontalmente (flex column,
  `align-items:center; justify-content:center`), padding `32px 0`, testo
  centrato. La "pagina" è un contenitore `min(430px,100%)` centrato su fondo
  `#A87A2F`, con `border-radius:4px` e `box-shadow:0 10px 30px rgba(35,24,8,.35)`.
- **Components**:
  - Logo: `logo.png`, `width:220px; max-width:80%`, `margin:0 auto`,
    `box-shadow:0 6px 18px rgba(35,24,8,.25)`. Alt text "Osteria Lo Spietato".
  - Dicitura "menù": 13px, `letter-spacing:.35em`, uppercase, `margin-top:14px`.
  - Badge coperto: bordo `1.5px solid #1a1712`, padding `5px 14px`, 13px.
  - Badge piatto del giorno (solo se presente): fondo `#A87A2F`, testo `#fff`,
    padding `12px 16px`, `max-width:280px`; etichetta 10px uppercase
    `letter-spacing:.25em`, nome piatto 14px bold.
  - Riga d'aiuto: 12px, `#4a4438`, "Sfoglia il menù con le frecce qui sotto →".

### 2. Menù cliente — pagina categoria
- **Purpose**: leggere i piatti di una categoria.
- **Layout**: area scrollabile con padding `26px 26px 18px 34px` (il padding
  sinistro maggiore lascia spazio alla "piega" del libretto: overlay largo 14px
  con gradiente `rgba(35,24,8,.18) → 0`, `pointer-events:none`).
- **Components**:
  - Titolo categoria: `<h2>` inline-block, fondo `#1a1712`, testo `#f5f0e6`,
    15px bold, `letter-spacing:.2em`, uppercase, padding `4px 12px`.
  - Lista `<ul>` senza bullet, `display:flex; flex-direction:column; gap:18px`.
  - Voce: riga con nome (13.5px bold uppercase), leader punteggiato
    (`flex:1; border-bottom:2px dotted #9a8f7c`), prezzo (13.5px bold,
    `white-space:nowrap`) allineati su `align-items:baseline`, `gap:8px`.
  - Descrizione: 12px, `line-height:1.5`, colore `#4a4438`.
  - Badge "Piatto del giorno": fondo `#A87A2F`, testo bianco, 9px uppercase.
  - Allergeni: `<abbr>` con codice (G, L, P, N, U, M, SE, SO), bordo
    `1px solid #9a8f7c`, 9px, `text-decoration:none`, `title` e `aria-label`
    con il nome completo ("Contiene Glutine").

### 3. Menù cliente — pagina informazioni
- **Purpose**: contatti, orari, coperto, legenda allergeni.
- **Layout**: stesso header della categoria; corpo 13px `line-height:1.7`,
  blocchi in flex column `gap:14px`. Orari con `white-space:pre-line`.
- **Components**: indirizzo, telefono come link `tel:` (numero senza spazi),
  orari multilinea, coperto, legenda allergeni come lista di badge + nome.

### 4. Menù cliente — indice
- **Purpose**: salto rapido a una categoria.
- **Layout**: overlay `position:absolute; inset:0`, fondo `#f5f0e6`, `z-index:6`,
  `role="dialog"`, `aria-label="Indice del menù"`.
- **Components**: un bottone per pagina, `min-height:48px`, testo a sinistra +
  freccia a destra, bordo `1.5px solid #1a1712`, hover invertito (fondo
  `#1a1712`, testo `#f5f0e6`). In fondo "Chiudi indice", fondo `#A87A2F`.

### 5. Menù cliente — barra di navigazione (fissa in basso alla pagina)
- `border-top:1.5px solid #1a1712`, fondo `#f0e9db`, padding `10px 14px`,
  `gap:8px`, `z-index:7`.
- Bottone precedente/successivo: 48×48px, fondo `#1a1712`, glifi `‹` / `›` 20px,
  `aria-label` "Pagina precedente"/"Pagina successiva", `disabled` ai due estremi.
- Bottone centrale (apre l'indice): `flex:1`, `min-height:48px`, bordo
  `1.5px solid #1a1712`, etichetta `"<Categoria> · <n>/<tot>"` 12px uppercase.

### 6. Area gestori — login
- **Layout**: schermo intero fondo `#A87A2F`, card `min(360px,100%)` fondo
  `#f5f0e6`, padding `34px 30px`, flex column `gap:14px`.
- **Components**: lockup testuale del logo ("osteria" 12px `letter-spacing:.8em`,
  filetto 150×2.5px, "LO SP!ETATO" Archivio Black 26px, "Area gestori" 11px
  uppercase `#4a4438`); campi Email (`type="email"`, `autocomplete="username"`)
  e Password (`autocomplete="current-password"`), input `min-height:44px` bordo
  `1.5px solid #1a1712` fondo `#fff`; bottone "Accedi" `min-height:48px` fondo
  `#1a1712`; link "← Torna al menù".
- **Stati**: `role="alert"` rosso `#9c2b1a` per credenziali non valide; secondo
  `role="alert"` per sessione scaduta ("…L'ultima modifica non è stata salvata
  online — dopo l'accesso ripetila.").

### 7. Area gestori — pannello
- **Layout**: header `#A87A2F` con titolo, link "Vedi menù" e bottone "Esci";
  `<main>` `max-width:760px` centrato, padding `20px 16px 60px`.
- **Sezione Impostazioni**: card `#f5f0e6` bordo `1.5px solid #1a1712`,
  padding 18px; campi coperto (`flex:1 1 130px`), indirizzo (`flex:1`,
  `min-width:220px`), telefono (`flex:1 1 200px`), orari (`textarea` 4 righe).
  Tutti i gruppi sono `flex-wrap:wrap` → su mobile si impilano.
- **Tab categorie**: `role="tablist"` di bottoni `min-height:44px`,
  `aria-selected`, attivo fondo `#1a1712`/testo `#f5f0e6`, inattivo invertito.
- **Card piatto**: `article` fondo `#f5f0e6` bordo `1.5px solid #1a1712`,
  padding `12px 14px`, `opacity:.55` se nascosto. Nome uppercase 13px, prezzo a
  destra, badge "Del giorno" (`#A87A2F`) e "Nascosto" (`#4a4438`), riga allergeni
  10px. Azioni: ↑ ↓ (44×40px), Modifica (fondo `#1a1712`), Nascondi/Mostra,
  Elimina (bordo e testo `#9c2b1a`).
- **Form piatto** (inline, appare sopra "Aggiungi piatto"): card `#fff` bordo
  `2px solid #A87A2F`; nome, descrizione (textarea), prezzo, checkbox "Piatto del
  giorno" (20×20px), 8 toggle allergeni (`aria-pressed`, attivo `#A87A2F`/bianco);
  "Salva piatto" e "Annulla".
- **Bottone aggiungi**: full width, `min-height:48px`, fondo `#A87A2F`.
- **Footer azioni**: "Ripristina menù predefinito" (bordo `#9c2b1a`, con
  `confirm()`) e nota "Le modifiche vengono salvate online e viste da tutti i
  clienti."
- **Toast**: `role="status"` `position:fixed` bottom/right 16px, fondo `#1a1712`,
  testo `#f5f0e6`, 12px, padding `10px 16px`; messaggi "Salvataggio…",
  "Salvato online ✓", "Ordine aggiornato ✓", "Piatto nascosto ✓",
  "Salvato solo localmente: connessione assente".

## Interactions & Behavior
- **Sfoglio**: le pagine sono un array `[copertina, …categorie non vuote, info]`.
  Cambio pagina → overlay `position:absolute; inset:0` fondo `#f0e9db`,
  `transform-origin:left center`, animazione 450ms:
  - avanti `flipNext`: `perspective(1600px) rotateY(0 → -104deg)`,
    `opacity 1 → .15`, `ease-in`;
  - indietro `flipPrev`: l'inverso, `ease-out`.
  L'overlay si smonta su `animationend`. Il contenuto entra con `pageIn`
  (opacity 0→1, 300ms).
- **Swipe**: `touchstart`/`touchend` sull'area contenuto, soglia 60px.
- **Reduced motion**: `matchMedia('(prefers-reduced-motion: reduce)')` disattiva
  il voltapagina (cambio istantaneo).
- **Accessibilità**: l'area contenuto è `role="region"` `aria-live="polite"` con
  `aria-label` "Menù, pagina N di M: <titolo>"; i prezzi hanno `aria-label`
  parlato ("15 euro"); target ≥44px; contrasto testo su fondo chiaro ≥4.5:1.
- **Sync cliente**: fetch del menù al mount, su `focus`, su evento `storage` e
  ogni 60s. La risposta valida viene messa in `localStorage` come cache; se il
  fetch fallisce resta la cache (poi il default compilato).
- **Login**: POST alle credenziali → `access_token` in `sessionStorage`. Errore →
  flag `err`.
- **Salvataggio admin**: ogni mutazione scrive prima in `localStorage` e
  nello stato (UI ottimistica), poi PATCH su Supabase. 401/403 → logout con flag
  `sessionExpired`; altro errore → toast "salvato solo localmente".
- **Conferme distruttive**: `confirm()` su eliminazione piatto e ripristino menù.

## State Management
**Menù cliente**: `{ idx, flip: 'next'|'prev'|null, showIndex, data, legend }`.
Derivati: elenco pagine (categorie con almeno una voce non nascosta), voce
corrente, piatto del giorno (prima voce con `delGiorno && !nascosto`).

**Area gestori**: `{ authed, token, u, p, err, sessionExpired, data, cat,
editing: null|'new'|<id>, draft, toast }`. Le mutazioni clonano `data`
(`JSON.parse(JSON.stringify)`), applicano la modifica e salvano.

**Dati remoti**: tabella `menu`, riga `id = 1`, colonna `data jsonb` con la forma
di `menu-data.js` (`coperto`, `info{indirizzo,telefono,orari}`,
`categorie[{id,nome,voci[{id,nome,desc,prezzo,allergeni[],nascosto,delGiorno}]}]`).

**Endpoint usati** (`supa.js`, REST diretto, nessun SDK):
- `GET  /rest/v1/menu?id=eq.1&select=data` — header `apikey`, `Authorization: Bearer <anon>`
- `PATCH /rest/v1/menu?id=eq.1` — `Authorization: Bearer <access_token>`, `Prefer: return=minimal`
- `POST /auth/v1/token?grant_type=password` — `{email,password}` → `access_token`

RLS: `select` pubblica, `all` per `authenticated`. La publishable key può stare
nel client; `service_role` mai.

## Design Tokens
Colori: `#A87A2F` (ottone, brand/accento) · `#1a1712` (inchiostro) ·
`#f5f0e6` (carta) · `#f0e9db` (carta 2, barra nav e pagina in volo) ·
`#eee6d6` (fondo admin) · `#4a4438` (testo secondario) · `#9a8f7c` (hairline,
leader punteggiato) · `#d8cfba` (bordi tabella) · `#9c2b1a` (errore/distruttivo) ·
`#8a5f1e` link, `#5f3f0f` link hover · `#fdf6e8` (link su ottone).

Tipografia: **Space Mono** 400/700 (tutto il testo) · **Archivo Black** (wordmark
e titoli guida). Scala: 9 · 10 · 11 · 12 · 12.5 · 13 · 13.5 · 14 · 15 · 17 · 18 ·
26 · 31 · 38px. `letter-spacing` ricorrenti: `.08em` `.1em` `.12em` `.15em`
`.2em` `.25em` `.35em` `.8em` `.9em`.

Spaziature: 4 · 6 · 8 · 10 · 12 · 14 · 16 · 18 · 22 · 26 · 30 · 34px.
Raggi: 0 (tutto squadrato) tranne la carta del menù (`4px`).
Bordi: `1.5px solid #1a1712` (standard), `2px solid #A87A2F` (form attivo),
`2px dotted #9a8f7c` (leader), `1px solid #d8cfba` (righe tabella).
Ombre: `0 10px 30px rgba(35,24,8,.35)` (carta) · `0 6px 18px rgba(35,24,8,.25)`
(logo) · `6px 0 18px rgba(35,24,8,.25)` (pagina in volo) ·
`0 4px 14px rgba(0,0,0,.3)` (toast).
Target minimo: 44px (48px per le azioni primarie). Larghezza menù: `min(430px,100%)`.

## Assets
- `logo.png` — logo ufficiale fornito dal cliente (copertina del menù).
- Font da Google Fonts: Space Mono, Archivo Black.
- Nessuna icona esterna: le frecce sono glifi testuali (`‹ › ↑ ↓ →`).

## Files
- `Menu Cliente.dc.html` — menù cliente (prototipo con runtime)
- `Admin.dc.html` — area gestori (prototipo con runtime)
- `index.html` / `admin.html` — le stesse due pagine, versione pubblicata
- `menu-data.js` — schema dati + menù predefinito + codici allergeni
- `supa.js` — client Supabase (URL, publishable key, fetch/push/signIn)
- `support.js` — runtime del prototipo (**non** da portare)
- `Guida Configurazione.dc.html` — guida operativa per il ristoratore
  (setup Supabase, deploy, QR code)
- `README.md` (root progetto) — istruzioni di deploy
- `logo.png`

## Note aperte
- Contorni, dolci, bevande e amari in `menu-data.js` sono voci di esempio: le
  voci reali vanno raccolte dal ristorante.
- Il documento JSON unico è comodo per un menù di questa dimensione; se in futuro
  servono più utenti che modificano insieme, conviene passare a tabelle
  `categorie` / `piatti` con `order_index`.
- Non c'è ancora traduzione multilingua né gestione immagini dei piatti.
