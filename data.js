/* Vintage Shop — archivio dati prodotti (fonte unica per catalogo e schede)
   Dati reali estratti dal sito vintage-shop.it */

window.VS_CATS = {
  mobili:        'Mobili e Arredamento',
  cristalli:     'Vetri e Cristalli',
  ceramiche:     'Ceramiche e Porcellane',
  collezionismo: 'Collezionismo'
};

window.VS_PRODUCTS = [
  /* ---------- MOBILI E ARREDAMENTO ---------- */
  {
    id:'sedie-anni60', cat:'mobili',
    nome:'Set 6 Sedie Design Anni \'60 — Cantilever in Legno',
    price:792, old:880, img:'assets/p1.jpg', big:'assets/big1.jpg',
    epoca:'1960–1970', materiali:'Legno · Sky', dimensioni:'45×48 cm · seduta h 47 · schienale h 86',
    stato:'Buonissime, lievi segni del tempo', origine:'Made in Italy (Cantù)',
    desc:'Fantastico set di sei sedie di design anni 60/70, struttura in legno con seduta e schienale imbottiti e rivestiti in sky beige. Arredamento collezionistico di alta qualità, ideale sia all\'uso sia come pezzo da collezione.'
  },
  {
    id:'camino-impero', cat:'mobili',
    nome:'Antico Camino Impero 1800 — Marmo di Carrara e Bronzo',
    price:4410, old:4900, img:'assets/m_camino.jpg',
    epoca:'1800 · Stile Impero', materiali:'Marmo di Carrara · Bronzo dorato', dimensioni:'157 × 118 × 40 cm · ~200 kg',
    stato:'Buone, segni del tempo (graffi, piccole sbeccature)', origine:'Italia',
    desc:'Splendida cornice per camino d\'epoca in marmo di Carrara con bronzetti dorati e formelle in graniglia rosa. Camino di grandi dimensioni e originale d\'epoca, utilizzabile anche come consolle decorativa. Pezzo raro per collezionisti e appassionati di antiquariato.'
  },
  {
    id:'specchio-sarfatti', cat:'mobili',
    nome:'Specchio Illuminato Gino Sarfatti per Arteluce — Mod. 51/b',
    price:4499.25, old:5999, img:'assets/m_specchio.jpg',
    epoca:'1971 · Anni \'70', materiali:'Alluminio · Specchio · Vetro', dimensioni:'Ø 65 cm · prof. 5 cm',
    stato:'Buone, impianto elettrico funzionante; lievi segni', origine:'Italia · Arteluce',
    desc:'Rarissimo specchio illuminato di design italiano realizzato da Gino Sarfatti per Arteluce, modello 51/b. Struttura in alluminio bianco con specchio rotondo centrale circondato da 20 piccole luci integrate. Un pezzo da collezione di grande valore storico ed estetico.'
  },

  /* ---------- VETRI E CRISTALLI ---------- */
  {
    id:'calici-toledo1', cat:'cristalli',
    nome:'Set 6 Calici Acqua "Toledo" — Arnolfo di Cambio',
    price:216, old:240, img:'assets/p2.jpg', big:'assets/big2.jpg',
    epoca:'Anni \'60/\'70', materiali:'Cristallo molato', dimensioni:'h 17,2 cm · piede Ø 7 cm',
    stato:'Ottime, mai utilizzati', origine:'Italia · Arnolfo di Cambio',
    desc:'Raffinato set di sei calici acqua in cristallo molato modello "Toledo" di Arnolfo di Cambio, con elegante taglio geometrico sulla coppa. Anni \'70, con etichetta originale sulla base e confezione originale: praticamente nuovi, mai utilizzati.'
  },
  {
    id:'calici-toledo2', cat:'cristalli',
    nome:'Set 6 Calici Vino "Toledo 2" — Arnolfo di Cambio',
    price:207, old:230, img:'assets/p3.jpg',
    epoca:'Anni \'60/\'70', materiali:'Cristallo molato', dimensioni:'h 16,5 cm · base Ø 6,5 cm',
    stato:'Ottime, mai utilizzati', origine:'Italia · Arnolfo di Cambio',
    desc:'Magnifico set di 6 calici da vino in cristallo molato con raffinato taglio geometrico sulla coppa. Prodotti negli anni \'70 dalla rinomata vetreria toscana Arnolfo di Cambio, con etichetta originale e imballo iniziale, in condizioni pressoché nuove.'
  },
  {
    id:'flute-valdemossa', cat:'cristalli',
    nome:'Set 6 Flûte Cristallo "Valdemossa" — Taglio 1000',
    price:216, old:240, img:'assets/p8.jpg',
    epoca:'Anni \'70', materiali:'Cristallo', dimensioni:'Ø 4,8 cm · h 22 cm',
    stato:'Ottime, mai utilizzati', origine:'Italia (Toscana) · Arnolfo di Cambio',
    desc:'Straordinario set di 6 flûte da champagne modello "Valdemossa", dal design sfaccettato tipico degli anni \'70, della rinomata vetreria Arnolfo di Cambio. Pari al nuovo e conservati nell\'imballo originale: un pezzo di grande valore collezionistico.'
  },

  /* ---------- CERAMICHE E PORCELLANE ---------- */
  {
    id:'vaso-bertoncello', cat:'ceramiche',
    nome:'Vaso Scultura in Ceramica Bertoncello 864',
    price:216, old:240, img:'assets/p6.jpg', big:'assets/big6.jpg',
    epoca:'Anni \'60/\'70', materiali:'Ceramica · smalto policromo', dimensioni:'27 × 8 cm · h 25 cm',
    stato:'Vintage, ottime condizioni', origine:'Italia · Bertoncello',
    desc:'Stupendo vaso modernista realizzato dallo studio ceramico italiano Bertoncello, caratterizzato da forma dinamica astratta e brillante smalto verde policromo. Numerato "864" sulla base, si presenta in eccellenti condizioni.'
  },
  {
    id:'vaso-amarena', cat:'ceramiche',
    nome:'Vaso Pubblicitario Amarena Sanley — Vignola',
    price:206.10, old:229, img:'assets/c_amarena.jpg',
    epoca:'Metà \'900', materiali:'Ceramica smaltata dipinta a mano', dimensioni:'h 25,2 cm · Ø 24 cm',
    stato:'Molto buone, manca il tappo', origine:'Italia · Vignola',
    desc:'Straordinario vaso pubblicitario in ceramica smaltata per Amarena Sanley di Vignola, dipinto a mano su fondo bianco con decori in marrone e oro. Esemplare rarissimo con firma SV sul fondo, privo del tappo originale ma in ottime condizioni d\'uso.'
  },
  {
    id:'vaso-chamaleon', cat:'ceramiche',
    nome:'Vaso Anfora Art Nouveau "Chamaleon" — Paul Dachsel 1906',
    price:5017.50, old:6690, img:'assets/c_chamaleon.jpg',
    epoca:'1906 ca.', materiali:'Ceramica smaltata', dimensioni:'h 40 cm · Ø 22 cm',
    stato:'Buone, lievi segni d\'uso', origine:'Turn-Teplitz (Austria) · Paul Dachsel',
    desc:'Splendido vaso Art Nouveau/Jugendstil in ceramica smaltata marrone con decoro naturalistico: i manici sono rami stilizzati con foglie esotiche dorate e bacche perlacee, su cui è modellato un camaleonte. Prodotto da Turn-Teplitz, Austria, design di Paul Dachsel, 1906 circa.'
  },

  /* ---------- COLLEZIONISMO ---------- */
  {
    id:'medaglia-pomodoro', cat:'collezionismo',
    nome:'Arnaldo Pomodoro — Medaglia Pendente Triangolare in Bronzo',
    price:719.10, old:799, img:'assets/p5.jpg', big:'assets/big5.jpg',
    epoca:'Anni \'80', materiali:'Bronzo dorato', dimensioni:'≈ 4,2 × 5 cm · ~25 g',
    stato:'Ottime, patina naturale', origine:'Edizione limitata · Amica / Sangemini',
    desc:'Preziosa medaglia-ciondolo triangolare dell\'artista Arnaldo Pomodoro, multiplo d\'artista in edizione limitata realizzato negli anni \'80 per la collaborazione tra la rivista Amica e Acqua Sangemini. Presenta la firma dell\'autore e un\'incisione al verso.'
  },
  {
    id:'centrotavola-vittoria', cat:'collezionismo',
    nome:'Centrotavola Vittoria Alata in Bronzo — Francia, fine \'800',
    price:1494, old:1660, img:'assets/col_vittoria.jpg',
    epoca:'Fine \'800', materiali:'Bronzo dorato · Smalto', dimensioni:'Ø 38 cm · h 58 cm · ~5,5 kg',
    stato:'Buonissime, pronto all\'uso', origine:'Francia',
    desc:'Magnifico centrotavola francese di grandi dimensioni: scultura di Vittoria alata in bronzo dorato su contenitore in rame smaltato. Rappresentativo dello stile eclettico francese del tardo Ottocento, elegante e raffinato, ideale per collezionismo e decorazione d\'interni.'
  },
  {
    id:'modellino-catamarano', cat:'collezionismo',
    nome:'Grande Modellino di Catamarano in Ferro — 107 cm',
    price:449.10, old:499, img:'assets/col_catamarano.jpg',
    epoca:'Anni 2000', materiali:'Ferro artigianale', dimensioni:'107 × 77 × 38 cm · 13 kg',
    stato:'Molto buone condizioni', origine:'Artigianale',
    desc:'Fantastico grande modellino di catamarano realizzato interamente in ferro con lavorazione artigianale. Un pezzo pregevole per collezionisti e appassionati di modellismo navale, perfetto anche come elemento decorativo per interni.'
  }
];

/* ---------- Helper condivisi ---------- */
window.VS = {
  money: function (n) {
    return '€ ' + Number(n).toLocaleString('it-IT', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  },
  param: function (k) {
    return new URLSearchParams(location.search).get(k);
  },
  byId: function (id) {
    return window.VS_PRODUCTS.filter(function (p) { return p.id === id; })[0];
  },
  byCat: function (cat) {
    return window.VS_PRODUCTS.filter(function (p) { return !cat || p.cat === cat; });
  },
  cardHTML: function (p) {
    var pct = p.old ? Math.round((1 - p.price / p.old) * 100) : 0;
    var tag = pct
      ? '<span class="tag sale">−' + pct + '%</span>'
      : '<span class="tag">Autentico</span>';
    var was = p.old ? '<span class="was">' + this.money(p.old) + '</span>' : '';
    return '<a class="card" href="prodotto.html?id=' + p.id + '">' +
      '<div class="ph">' + tag + '<img src="' + p.img + '" alt="' + p.nome + '"></div>' +
      '<div class="body">' +
        '<span class="cat-name">' + window.VS_CATS[p.cat] + '</span>' +
        '<h3>' + p.nome + '</h3>' +
        '<div class="price"><span class="now">' + this.money(p.price) + '</span>' + was + '</div>' +
        '<span class="add">Scopri il pezzo</span>' +
      '</div></a>';
  }
};
