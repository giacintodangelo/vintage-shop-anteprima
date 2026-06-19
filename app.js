/* Vintage Shop — interazioni & animazioni dell'anteprima */
(function () {
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---- Topbar scorrevole (marquee continuo) ---- */
  (function () {
    var tb = document.querySelector('.topbar');
    if (!tb || reduce) return;
    var msgs = [].slice.call(tb.querySelectorAll('.container > span'))
      .map(function (s) { return s.textContent.trim().replace(/^✦\s*/, ''); })
      .filter(Boolean);
    if (!msgs.length) return;
    var block = msgs.map(function (m) {
      return '<span class="ti">' + m + '</span><span class="sep">✦</span>';
    }).join('');
    tb.innerHTML = '<div class="marq"><div class="marq-track" id="marqTrack">' + block + block + '</div></div>';
    tb.classList.add('is-marquee');
    var track = document.getElementById('marqTrack');
    var blockW = track.scrollWidth / 2;        // larghezza di una copia
    track.style.animationDuration = Math.max(18, blockW / 70).toFixed(1) + 's'; // ~70px/s
  })();

  /* ---- Hero slideshow (dissolvenza tra le immagini) ---- */
  (function () {
    var slides = [].slice.call(document.querySelectorAll('.hero-slides .slide'));
    if (slides.length < 2) return;
    var dotsWrap = document.querySelector('.hero-dots');
    var dots = [];
    var i = 0, timer = null;

    function go(n) {
      slides[i].classList.remove('active');
      if (dots[i]) dots[i].classList.remove('on');
      i = (n + slides.length) % slides.length;
      slides[i].classList.add('active');
      if (dots[i]) dots[i].classList.add('on');
    }
    function restart() {
      if (timer) clearInterval(timer);
      if (!reduce) timer = setInterval(function () { go(i + 1); }, 4800);
    }
    if (dotsWrap) {
      slides.forEach(function (_, idx) {
        var b = document.createElement('button');
        b.setAttribute('aria-label', 'Vai all\'immagine ' + (idx + 1));
        if (idx === 0) b.classList.add('on');
        b.addEventListener('click', function () { go(idx); restart(); });
        dotsWrap.appendChild(b);
        dots.push(b);
      });
    }
    restart();
  })();

  /* ---- Reveal allo scroll (auto-applicato, niente classi nell'HTML) ---- */
  var groups = [
    { sel: '.section-head', stagger: 0 },
    { sel: '.cat', stagger: 110 },
    { sel: '.products .card', stagger: 90 },
    { sel: '.value', stagger: 90 },
    { sel: '.story .txt', stagger: 0 },
    { sel: '.story .img-wrap', stagger: 0 },
    { sel: '.social .eyebrow, .social h2, .social .lead', stagger: 120 },
    { sel: '.ig-grid .ig', stagger: 70 },
    { sel: '.news .eyebrow, .news h2, .news p, .news form', stagger: 90 },
    { sel: '.footer-grid > div', stagger: 110 },
    { sel: '.pdp .gallery, .pdp-info', stagger: 120 },
    { sel: '.breadcrumb', stagger: 0 },
    { sel: '.service', stagger: 90 },
    { sel: '.step-card', stagger: 90 },
    { sel: '.info-item', stagger: 80 },
    { sel: '.contact-form', stagger: 0 },
    { sel: '.cta-band .inner', stagger: 0 }
  ];

  var io = ('IntersectionObserver' in window) && !reduce
    ? new IntersectionObserver(function (entries) {
        entries.forEach(function (e) {
          if (!e.isIntersecting) return;
          var el = e.target;
          el.classList.add('is-visible');
          io.unobserve(el);
          // ripulisce la classe reveal a fine transizione, così l'hover torna reattivo
          setTimeout(function () { el.classList.remove('reveal'); }, 1000);
        });
      }, { threshold: 0.12, rootMargin: '0px 0px -8% 0px' })
    : null;

  groups.forEach(function (g) {
    var els = document.querySelectorAll(g.sel);
    els.forEach(function (el, i) {
      if (!io) return; // reduced motion: resta visibile naturalmente
      el.classList.add('reveal');
      if (g.stagger) el.style.transitionDelay = (i % 8) * g.stagger + 'ms';
      io.observe(el);
    });
  });

  /* ---- Header dinamico ---- */
  var header = document.querySelector('.site-header');
  var story = document.querySelector('.story .img-wrap img');
  function onScroll() {
    if (header) header.classList.toggle('scrolled', window.scrollY > 24);
    if (toTop) toTop.classList.toggle('show', window.scrollY > 600);
    if (story && !reduce) {
      var r = story.getBoundingClientRect();
      var off = (r.top + r.height / 2 - window.innerHeight / 2) * -0.04;
      story.style.transform = 'translateY(' + off.toFixed(1) + 'px)';
    }
  }

  /* ---- Pulsante torna su ---- */
  var toTop = document.createElement('button');
  toTop.className = 'to-top';
  toTop.setAttribute('aria-label', 'Torna su');
  toTop.innerHTML = '↑';
  toTop.addEventListener('click', function () {
    window.scrollTo({ top: 0, behavior: reduce ? 'auto' : 'smooth' });
  });
  document.body.appendChild(toTop);

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* ---- Count-up del badge "30+" ---- */
  var badge = document.querySelector('.story .badge b');
  if (badge && !reduce) {
    var raw = badge.textContent.trim();
    var target = parseInt(raw, 10) || 0;
    var suffix = raw.replace(/[0-9]/g, '');
    var bio = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (!e.isIntersecting) return;
        bio.unobserve(badge);
        var start = null, dur = 1300;
        function tick(t) {
          if (!start) start = t;
          var p = Math.min((t - start) / dur, 1);
          var eased = 1 - Math.pow(1 - p, 3);
          badge.textContent = Math.round(eased * target) + suffix;
          if (p < 1) requestAnimationFrame(tick);
        }
        requestAnimationFrame(tick);
      });
    }, { threshold: 0.6 });
    bio.observe(badge);
  }

  /* ---- Logo / identità di marca (SVG inline, eredita i font del sito) ---- */
  var LOGO =
    '<svg class="brand-logo" viewBox="0 0 322 64" role="img" aria-label="Vintage Shop">' +
      '<circle class="lg-ring" cx="32" cy="32" r="29" stroke-width="1.5"/>' +
      '<circle class="lg-ring" cx="32" cy="32" r="23" stroke-width="0.8" opacity="0.55"/>' +
      '<text class="lg-mono" x="32" y="41" text-anchor="middle">VS</text>' +
      '<text class="lg-wm" x="71" y="31">VINTAGE SHOP</text>' +
      '<text class="lg-sub" x="72" y="47">ANTIQUARIATO · MODERNARIATO · DESIGN</text>' +
    '</svg>';
  document.querySelectorAll('a.brand').forEach(function (a) {
    a.setAttribute('aria-label', 'Vintage Shop — home');
    a.innerHTML = LOGO;
  });
  document.querySelectorAll('.site-footer .name').forEach(function (el) { el.innerHTML = LOGO; });

  // Favicon coordinata (emblema)
  var favSvg = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">' +
    '<rect width="64" height="64" rx="12" fill="#121009"/>' +
    '<circle cx="32" cy="32" r="26" fill="none" stroke="#c2a875" stroke-width="2.5"/>' +
    '<text x="32" y="42" text-anchor="middle" font-family="Georgia,serif" font-weight="600" font-size="27" fill="#dac49b">VS</text></svg>';
  var fav = document.createElement('link');
  fav.rel = 'icon';
  fav.type = 'image/svg+xml';
  fav.href = 'data:image/svg+xml,' + encodeURIComponent(favSvg);
  document.head.appendChild(fav);

  /* ---- Iconografia SVG coerente (sostituisce i simboli unicode) ---- */
  (function () {
    function S(inner) {
      return '<svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">' + inner + '</svg>';
    }
    var I = {
      search: S('<circle cx="11" cy="11" r="7"/><path d="M16.5 16.5 21 21"/>'),
      cart:   S('<path d="M3 4h2l2.2 11.2a1 1 0 0 0 1 .8h8.6a1 1 0 0 0 1-.8L20 8H6"/><circle cx="9" cy="20" r="1.3"/><circle cx="18" cy="20" r="1.3"/>'),
      menu:   S('<path d="M4 7h16M4 12h16M4 17h16"/>'),
      gem:    S('<path d="M6 3h12l3 5-9 13L3 8z"/><path d="M3 8h18M9 3 6 8l6 13 6-13-3-5"/>'),
      cash:   S('<rect x="2.5" y="6" width="19" height="12" rx="2"/><circle cx="12" cy="12" r="2.6"/><path d="M6 10v4M18 10v4"/>'),
      brush:  S('<path d="M15 5l4 4"/><path d="M17.5 2.5a2.1 2.1 0 0 1 3 3L12 14l-3 .8.8-3z"/><path d="M8.6 12.4C6 13 5 15 4.5 18c3-.5 5-1.5 5.6-4.1z"/>'),
      tag:    S('<path d="M4 4h7l9 9-7 7-9-9V4z"/><circle cx="8" cy="8" r="1.4"/>'),
      seal:   S('<path d="M12 2.5l2.4 1.6 2.9-.2.7 2.8 2.3 1.7-1.3 2.6 1.3 2.6-2.3 1.7-.7 2.8-2.9-.2L12 21.5l-2.4-1.6-2.9.2-.7-2.8-2.3-1.7 1.3-2.6-1.3-2.6 2.3-1.7.7-2.8 2.9.2z"/><path d="M9 12l2 2 4-4"/>'),
      globe:  S('<circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3c2.6 2.6 2.6 15.4 0 18M12 3c-2.6 2.6-2.6 15.4 0 18"/>'),
      cube:   S('<path d="M12 2.5l8.5 4.8v9.4L12 21.5 3.5 16.7V7.3z"/><path d="M3.7 7.3 12 12l8.3-4.7M12 12v9.5"/>'),
      location:S('<path d="M12 21s6.5-5.8 6.5-10.5a6.5 6.5 0 1 0-13 0C5.5 15.2 12 21 12 21z"/><circle cx="12" cy="10.5" r="2.4"/>'),
      phone:  S('<path d="M5 4h3l2 5-2.5 1.5a11 11 0 0 0 5 5L14 13l5 2v3a2 2 0 0 1-2 2A15 15 0 0 1 3 6a2 2 0 0 1 2-2z"/>'),
      mail:   S('<rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3.5 6.5 12 13l8.5-6.5"/>'),
      clock:  S('<circle cx="12" cy="12" r="9"/><path d="M12 7v5.2l3.2 1.9"/>'),
      instagram:S('<rect x="3.5" y="3.5" width="17" height="17" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.2" cy="6.8" r="1.1" fill="currentColor" stroke="none"/>'),
      facebook:S('<path d="M14.5 8.5H17V5.6h-2.6C12.6 5.6 11 7 11 9.2V11H8.6v3H11v6.4h3V14h2.2l.5-3H14V9.3c0-.5.2-.8.5-.8z"/>'),
      pinterest:S('<circle cx="12" cy="12" r="9"/><path d="M9.6 19c-.3-1.5-.1-3 .3-4.5l1-4.2c-.3-.5-.4-1.2-.4-1.8 0-1.7 1-3 2.3-3 1.1 0 1.7.8 1.7 1.9 0 1.2-.8 2.9-1.1 4.5-.3 1.2.6 2.2 1.8 2.2 2.2 0 3.6-2.3 3.6-4.9 0-2.6-1.8-4.5-4.7-4.5-3.2 0-5.1 2.2-5.1 4.7 0 .9.3 1.7.8 2.2"/>'),
      store:  S('<path d="M4 9.5 5.5 4h13L20 9.5M4 9.5v9a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1v-9M9.5 20v-5h5v5"/><path d="M4 9.5a2 2 0 0 0 4 0 2 2 0 0 0 4 0 2 2 0 0 0 4 0 2 2 0 0 0 4 0"/>'),
      arrowUp:S('<path d="M12 19V5M6 11l6-6 6 6"/>')
    };
    function pick(text, map, fb) {
      text = (text || '').toLowerCase();
      for (var k in map) { if (text.indexOf(k) >= 0) return map[k]; }
      return fb;
    }
    function txt(el, sel) { var n = el.querySelector(sel); return n ? n.textContent : ''; }

    // Header: cerca / carrello
    document.querySelectorAll('.icon-btn').forEach(function (b) {
      var t = (b.getAttribute('title') || '').toLowerCase();
      if (t.indexOf('cerc') >= 0) b.innerHTML = I.search;
      else if (t.indexOf('carr') >= 0) {
        var small = b.querySelector('small');
        b.innerHTML = I.cart + ' ';
        if (small) b.appendChild(small);
      }
    });
    document.querySelectorAll('.burger').forEach(function (b) { b.innerHTML = I.menu; });

    // Valori (home)
    document.querySelectorAll('.value .vi').forEach(function (vi) {
      var label = txt(vi.parentElement, 'b');
      vi.innerHTML = pick(label, { 'restauro': I.brush, 'valutazion': I.gem, 'autenticit': I.seal, 'spedizion': I.globe }, I.seal);
    });

    // Servizi
    document.querySelectorAll('.service .ic').forEach(function (ic) {
      var h = txt(ic.parentElement, 'h3');
      ic.innerHTML = pick(h, { 'valutazion': I.gem, 'acquisto': I.cash, 'ritiro': I.cash, 'restauro': I.brush, 'noleggio': I.tag, 'virtual': I.cube, 'tour': I.cube, 'spedizion': I.globe, 'mondo': I.globe, 'imballo': I.cube, 'tempi': I.clock, 'garanz': I.seal }, I.seal);
    });

    // Contatti
    document.querySelectorAll('.info-item .ic').forEach(function (ic) {
      var h = txt(ic.parentElement, 'h4');
      ic.innerHTML = pick(h, { 'indiriz': I.location, 'telefono': I.phone, 'email': I.mail, 'orari': I.clock, 'segui': I.instagram }, I.location);
    });

    // Footer social
    document.querySelectorAll('.foot-social a').forEach(function (a) {
      var t = (a.getAttribute('title') || '').toLowerCase();
      a.innerHTML = pick(t, { 'insta': I.instagram, 'face': I.facebook, 'pinte': I.pinterest, 'ebay': I.store }, I.store);
    });

    // Torna su
    var tt = document.querySelector('.to-top');
    if (tt) tt.innerHTML = I.arrowUp;
  })();

  /* ---- Upgrade link di categoria del menu (→ catalogo.html?cat=...) ---- */
  var catMap = { 'mobili':'mobili', 'cristalli':'cristalli', 'ceramiche':'ceramiche', 'collezionismo':'collezionismo' };
  document.querySelectorAll('a[href="catalogo.html"]').forEach(function (a) {
    var k = a.textContent.trim().toLowerCase();
    if (catMap[k]) a.setAttribute('href', 'catalogo.html?cat=' + catMap[k]);
  });

  /* ---- FAQ accordion (home / spedizioni) ---- */
  document.querySelectorAll('.faq-q').forEach(function (q) {
    q.addEventListener('click', function () { q.parentElement.classList.toggle('open'); });
  });

  /* ---- Link nuove pagine nel footer (colonna Servizi) ---- */
  document.querySelectorAll('.site-footer .footer-grid > div').forEach(function (col) {
    var h = col.querySelector('h4');
    if (h && h.textContent.toLowerCase().indexOf('serviz') >= 0) {
      var ul = col.querySelector('ul');
      if (ul) ul.insertAdjacentHTML('beforeend',
        '<li><a href="spedizioni.html">Spedizioni & resi</a></li>' +
        '<li><a href="storie.html">Storie degli oggetti</a></li>');
    }
  });

  /* ---- Menu mobile (condiviso) ---- */
  var burger = document.getElementById('burger');
  var mobileNav = document.getElementById('mobileNav');
  if (burger && mobileNav) {
    burger.addEventListener('click', function () { mobileNav.classList.toggle('open'); });
    mobileNav.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', function () { mobileNav.classList.remove('open'); });
    });
  }

  /* ---- Transizione morbida tra le pagine (dissolvenza in uscita) ---- */
  if (!reduce) {
    document.addEventListener('click', function (e) {
      var a = e.target.closest && e.target.closest('a');
      if (!a) return;
      var href = a.getAttribute('href');
      if (!href || href.charAt(0) === '#' || a.target === '_blank' ||
          /^(mailto:|tel:|javascript:)/i.test(href) || a.hasAttribute('download')) return;
      var url;
      try { url = new URL(a.href, location.href); } catch (err) { return; }
      if (url.origin !== location.origin) return;
      // link a un'ancora della stessa pagina → comportamento normale
      if (url.pathname === location.pathname && url.search === location.search && url.hash) return;
      e.preventDefault();
      document.body.classList.add('page-leaving');
      setTimeout(function () { location.href = a.href; }, 280);
    });
    // ripristina lo stato tornando indietro dalla cache del browser
    window.addEventListener('pageshow', function (e) {
      if (e.persisted) document.body.classList.remove('page-leaving');
    });
  }
})();
