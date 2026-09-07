export const MENU_KEY = 'spietato-menu-v1';
export const ALLERGENI = {
  G: 'Glutine', L: 'Latte e derivati', P: 'Pesce', N: 'Frutta a guscio',
  U: 'Uova', M: 'Molluschi', SE: 'Sedano', SO: 'Solfiti'
};
export const DEFAULT_MENU = {
  coperto: 2,
  info: {
    indirizzo: "Via San Francesco d'Assisi 28, 61032 Fano (PU)",
    telefono: '+39 393 691 1169',
    orari: 'Lunedì chiuso\nMartedì–Venerdì 18:30–24:00\nSabato 18:00–23:00\nDomenica 12:00–24:00'
  },
  categorie: [
    { id: 'antipasti', nome: 'Antipasti', voci: [
      { id: 'a1', nome: 'Tartare di manzo', desc: 'Chips di pane, nocciole tostate, salsa senape e miele', prezzo: 15, allergeni: ['G','N'], nascosto: false, delGiorno: false },
      { id: 'a2', nome: 'Tagliere di salumi e formaggi', desc: '', prezzo: 18, allergeni: ['L'], nascosto: false, delGiorno: false },
      { id: 'a3', nome: 'Alici del Cantabrico', desc: 'Crostini di pane, burro e mozzarella (caseificio “Pupetta”)', prezzo: 15, allergeni: ['G','L','P'], nascosto: false, delGiorno: false },
      { id: 'a4', nome: 'Caprese croccante', desc: 'Mozzarella (caseificio “Pupetta”) panata e fritta, pomodoro cuore di bue su un letto di rucola e basilico', prezzo: 15, allergeni: ['G','L'], nascosto: false, delGiorno: false },
      { id: 'a5', nome: 'Piadina nostrana', desc: '', prezzo: 2, allergeni: ['G'], nascosto: false, delGiorno: false }
    ]},
    { id: 'primi', nome: 'Primi', voci: [
      { id: 'p1', nome: 'Spaghettone alle cozze con datterini', desc: '', prezzo: 14, allergeni: ['G','M'], nascosto: false, delGiorno: true },
      { id: 'p2', nome: 'Gnocchi su passata di pomodoro di San Cesareo e ricotta salata', desc: '', prezzo: 10, allergeni: ['G','L'], nascosto: false, delGiorno: false },
      { id: 'p3', nome: 'Ravioli con scaglie di tartufo', desc: 'Patate, squacquerone e parmigiano', prezzo: 12, allergeni: ['G','L','U'], nascosto: false, delGiorno: false },
      { id: 'p4', nome: 'Tagliatelline con ragù e Fassona tagliata al coltello', desc: '', prezzo: 12, allergeni: ['G','U','SE'], nascosto: false, delGiorno: false },
      { id: 'p5', nome: 'Spaghettone con vongole e bottarga di muggine', desc: '', prezzo: 12, allergeni: ['G','M','P'], nascosto: false, delGiorno: false }
    ]},
    { id: 'secondi', nome: 'Secondi', voci: [
      { id: 's1', nome: 'Polpo su panzanella e salsa di cetriolo e menta', desc: '', prezzo: 15, allergeni: ['G','M'], nascosto: false, delGiorno: false },
      { id: 's2', nome: 'Rollè di pollo', desc: 'Ripieno con cicoria e scamorza affumicata, patate al forno sabbiate', prezzo: 13, allergeni: ['L'], nascosto: false, delGiorno: false },
      { id: 's3', nome: 'Tagliata di bovino con sale di Cervia e rosmarino', desc: 'Pendolini, rucola e grana', prezzo: 20, allergeni: ['L'], nascosto: false, delGiorno: false }
    ]},
    { id: 'contorni', nome: 'Contorni', voci: [
      { id: 'c1', nome: 'Patate al forno sabbiate', desc: '', prezzo: 5, allergeni: [], nascosto: false, delGiorno: false },
      { id: 'c2', nome: 'Verdure di stagione alla griglia', desc: '', prezzo: 5, allergeni: [], nascosto: false, delGiorno: false },
      { id: 'c3', nome: 'Insalata mista', desc: '', prezzo: 4, allergeni: [], nascosto: false, delGiorno: false }
    ]},
    { id: 'dolci', nome: 'Dolci', voci: [
      { id: 'd1', nome: 'Tiramisù della casa', desc: '', prezzo: 6, allergeni: ['G','L','U'], nascosto: false, delGiorno: false },
      { id: 'd2', nome: 'Panna cotta con coulis di frutti rossi', desc: '', prezzo: 6, allergeni: ['L'], nascosto: false, delGiorno: false },
      { id: 'd3', nome: 'Sorbetto al limone', desc: '', prezzo: 4, allergeni: [], nascosto: false, delGiorno: false }
    ]},
    { id: 'bevande', nome: 'Bevande', voci: [
      { id: 'b1', nome: 'Acqua naturale o frizzante 75 cl', desc: '', prezzo: 2.5, allergeni: [], nascosto: false, delGiorno: false },
      { id: 'b2', nome: 'Bibite in lattina 33 cl', desc: '', prezzo: 3, allergeni: [], nascosto: false, delGiorno: false },
      { id: 'b3', nome: 'Birra artigianale 40 cl', desc: '', prezzo: 6, allergeni: ['G'], nascosto: false, delGiorno: false },
      { id: 'b4', nome: 'Calice di vino della casa', desc: '', prezzo: 5, allergeni: ['SO'], nascosto: false, delGiorno: false },
      { id: 'b5', nome: 'Caffè', desc: '', prezzo: 1.5, allergeni: [], nascosto: false, delGiorno: false }
    ]},
    { id: 'amari', nome: 'Amari', voci: [
      { id: 'm1', nome: 'Amaro del Capo', desc: '', prezzo: 4, allergeni: [], nascosto: false, delGiorno: false },
      { id: 'm2', nome: 'Montenegro', desc: '', prezzo: 4, allergeni: [], nascosto: false, delGiorno: false },
      { id: 'm3', nome: 'Limoncello artigianale', desc: '', prezzo: 4, allergeni: [], nascosto: false, delGiorno: false },
      { id: 'm4', nome: 'Grappa bianca', desc: '', prezzo: 5, allergeni: ['SO'], nascosto: false, delGiorno: false }
    ]}
  ]
};
