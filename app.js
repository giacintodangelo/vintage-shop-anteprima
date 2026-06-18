/* Vintage Shop — interazioni & animazioni dell'anteprima */
(function () {
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

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

  /* ---- Upgrade link di categoria del menu (→ catalogo.html?cat=...) ---- */
  var catMap = { 'mobili':'mobili', 'cristalli':'cristalli', 'ceramiche':'ceramiche', 'collezionismo':'collezionismo' };
  document.querySelectorAll('a[href="catalogo.html"]').forEach(function (a) {
    var k = a.textContent.trim().toLowerCase();
    if (catMap[k]) a.setAttribute('href', 'catalogo.html?cat=' + catMap[k]);
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
})();
