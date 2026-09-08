# Menù digitale — Osteria Lo Spietato

Menù sfogliabile per i clienti (via QR code sul tavolo) + area gestori con login,
con salvataggio condiviso su **Supabase**. Nessun framework, nessun build: sono
pagine statiche che funzionano su qualunque hosting.

- **Menù cliente** → [`index.html`](index.html): libretto con **sfogliamento che
  segue il dito** (trascini la pagina e si gira; frecce e indice come alternativa),
  sette categorie (antipasti, primi, secondi, contorni, dolci, bevande, amari),
  coperto, allergeni, piatto del giorno e pagina informazioni. **Multilingua**
  (IT/EN/ES/DE/FR) con selettore in alto a destra. Compatibile con VoiceOver.
- **Area gestori** → [`admin.html`](admin.html): login email/password, modifica di
  piatti, prezzi, descrizioni, allergeni, riordino, "esaurito" (nascondi), piatto
  del giorno, coperto e dati del locale. Le modifiche vanno online e le vedono tutti.

## Indirizzi (dopo la pubblicazione)

Repository: `EdoDogLions/SpietatoMenu` → con GitHub Pages su branch `main`:

- Menù clienti: **https://edodoglions.github.io/SpietatoMenu/**
- Area gestori: **https://edodoglions.github.io/SpietatoMenu/admin.html**

Il QR sui tavoli deve puntare al **primo** indirizzo (senza `admin.html`).

## Stato attuale del setup

| Passo | Stato |
|---|---|
| Tabella `menu` su Supabase (progetto `oxredhrvfoyngyauogad`) | ✅ creata |
| Regole di accesso (lettura pubblica, scrittura solo dopo login) | ✅ attive |
| Riga unica `id = 1` | ✅ presente |
| **Primo caricamento del menù nel database** | ⏳ **da fare** (vedi sotto) |
| Utente gestore confermato + registrazioni pubbliche disattivate | ⚠️ **da verificare in dashboard** |
| Pubblicazione su GitHub Pages | ⏳ da attivare |

Finché il primo caricamento non è fatto, il database è vuoto e i clienti vedono il
menù di partenza scritto in `menu-data.js` (funziona comunque, come fallback).

## Come renderlo operativo

### 1 · Verifiche su Supabase (una volta sola)
Dalla dashboard di [supabase.com](https://supabase.com), progetto già creato:

- **Authentication → Users**: l'utente `milena.amadori13@gmail.com` deve esistere
  ed essere *confermato*. È l'account per entrare nell'area gestori.
- **Authentication → Providers → Email**: disattiva *Allow new users to sign up*,
  così nessun estraneo può registrarsi come gestore.

> La tabella e le regole di accesso sono già configurate. Lo script SQL di
> riferimento è nella [Guida Configurazione](Guida%20Configurazione.dc.html),
> sezione "Script della tabella", nel caso servisse ricrearle.

### 2 · Pubblicare le pagine
Il repository ha già il remote GitHub. Pubblica il sito:

```bash
git add -A
git commit -m "Menù con integrazione Supabase"
git push
```

Poi su GitHub: **Settings → Pages → Source: branch `main`, cartella `/ (root)` → Save**.
Dopo circa un minuto gli indirizzi qui sopra sono attivi.

> Alternativa senza GitHub: trascina i file di produzione (vedi elenco) su
> [Netlify Drop](https://app.netlify.com/drop) e ottieni subito un indirizzo.

### 3 · Primo caricamento del menù
Apri l'area gestori, accedi, cambia un valore qualsiasi (es. il coperto) e
riportalo com'era. Quando compare **"Salvato online ✓"** il menù è nel database e
da quel momento ogni modifica passa da lì per tutti i clienti.

Ricontrolla i piatti: **contorni, dolci, bevande e amari** in `menu-data.js` sono
voci di esempio, da sostituire con quelle reali dell'osteria.

### 4 · Distribuire via QR code
Genera un QR **statico** (senza abbonamento/scadenza) dell'indirizzo del menù
clienti, ad esempio con [qr-code-generator.com](https://www.qr-code-generator.com).
Scaricalo in SVG o PNG ad alta risoluzione, stampalo ad almeno 3×3 cm in nero su
fondo chiaro, con l'indirizzo scritto anche in chiaro sotto. Dettagli e checklist
di stampa nella [Guida Configurazione](Guida%20Configurazione.dc.html).

## Come funziona (in breve)

- Il menù è un **unico documento JSON** nella riga `id = 1` della tabella `menu`.
- Il menù cliente lo legge all'apertura, al rientro sulla pagina e ogni 60s; tiene
  una copia in `localStorage` come cache offline; se manca tutto usa il default.
- L'area gestori salva in modo *ottimistico*: prima in locale, poi su Supabase.
  Scrittura possibile solo dopo login (token in `sessionStorage`).
- Nessun SDK: chiamate REST dirette a Supabase in [`supa.js`](supa.js).
- **Traduzioni**: le voci fisse (categorie, etichette, allergeni) sono tradotte a
  mano in [`i18n.js`](i18n.js). Nomi, descrizioni e orari del menù attuale sono
  **pre-tradotti** in [`translations.js`](translations.js): compaiono subito al
  primo caricamento in qualsiasi lingua, anche offline, senza chiamate di rete.
  I piatti aggiunti in futuro dai gestori vengono tradotti automaticamente al volo
  (servizio gratuito MyMemory) e messi in cache nel browser. Se una traduzione
  manca e il servizio non risponde, si resta all'italiano. Nessuna chiave richiesta.
  Per rigenerare i pre-tradotti dopo modifiche importanti al menù:
  `node tools/pretranslate.mjs > translations.js`.

## File

**Produzione** (bastano questi per il sito live):

| File | Ruolo |
|---|---|
| `index.html` | Menù cliente (autonomo, JavaScript vanilla) |
| `admin.html` | Area gestori (login + modifica) |
| `supa.js` | Client Supabase — URL e *publishable key* già inseriti |
| `menu-data.js` | Menù predefinito + codici allergeni (fallback) |
| `i18n.js` | Traduzioni multilingua + traduzione automatica con cache |
| `translations.js` | Traduzioni pre-calcolate del menù (istantanee, offline) |
| `support.js` | Runtime che disegna l'area gestori |
| `logo.png` | Logo dell'osteria |

Strumenti (non serviti dal sito): `tools/pretranslate.mjs` rigenera `translations.js`.

**Documentazione / riferimento** (non necessari al sito):

| File | Ruolo |
|---|---|
| `Guida Configurazione.dc.html` | Guida operativa per il ristoratore (setup, deploy, QR) |
| `doc-page.js` | Runtime della guida |
| `Menu Cliente.dc.html`, `Admin.dc.html` | Prototipi di design di riferimento |
| `HANDOFF.md` | Specifica di design (colori, tipografia, comportamenti) |

## Sicurezza

La *publishable key* (anon) in `supa.js` è pensata per stare nel client: da sola
consente solo la lettura pubblica e il login. La chiave `service_role`, invece,
**non va mai** inserita nel sito né condivisa. La scrittura sul menù è protetta dal
login del gestore.
