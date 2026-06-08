/* Cayuelas — shared utilities: monogram, forja ornament, reveal */
(function () {
  const MONOGRAM = `
    <svg viewBox="0 0 40 40" aria-hidden="true">
      <path d="M27 9 A13.5 13.5 0 1 0 27 31" fill="none" stroke="#BDBDBD" stroke-width="3.6" stroke-linecap="round"/>
      <path d="M13 9 A13.5 13.5 0 1 1 13 31" fill="none" stroke="#C8281C" stroke-width="3.6" stroke-linecap="round"/>
      <text x="20" y="27.5" text-anchor="middle" font-family="Georgia, 'Times New Roman', serif" font-weight="700" font-size="20" fill="#FFFFFF">M</text>
    </svg>`;

  const RIGHT = `
    <path d="M2 14 H30"/>
    <path d="M30 14 C30 5 46 5 46 14 C46 20.5 37 20.5 37 14"/>
    <path d="M46 14 H70"/>
    <path d="M70 14 C70 23 86 23 86 14 C86 7.5 77 7.5 77 14"/>
    <path d="M86 14 H112"/>
    <circle cx="116" cy="14" r="2.6" fill="currentColor" stroke="none"/>`;

  const FORJA = `
    <svg viewBox="0 0 240 28" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" aria-hidden="true">
      <path d="M120 7 L125 14 L120 21 L115 14 Z" fill="currentColor" stroke="none"/>
      <g transform="translate(120,0)">${RIGHT}</g>
      <g transform="translate(120,0) scale(-1,1)">${RIGHT}</g>
    </svg>`;

  function paint() {
    document.querySelectorAll('.plaque:not([data-done])').forEach(el => { el.innerHTML = MONOGRAM; el.dataset.done = '1'; });
    document.querySelectorAll('.forja-divider:not([data-done])').forEach(el => { el.innerHTML = FORJA; el.dataset.done = '1'; });
  }

  function reveal() {
    const els = document.querySelectorAll('.reveal');
    if (!els.length) return;
    if (!('IntersectionObserver' in window) || matchMedia('(prefers-reduced-motion: reduce)').matches) {
      els.forEach(e => e.classList.add('in')); return;
    }
    const io = new IntersectionObserver((ents) => {
      ents.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } });
    }, { threshold: 0.12, rootMargin: '0px 0px -8% 0px' });
    els.forEach((e, i) => { e.style.transitionDelay = Math.min(i % 4 * 70, 210) + 'ms'; io.observe(e); });
  }

  // Add header shadow on scroll
  function stickyShadow() {
    const h = document.querySelector('[data-sticky]');
    if (!h) return;
    const on = () => h.classList.toggle('scrolled', window.scrollY > 8);
    on(); window.addEventListener('scroll', on, { passive: true });
  }

  // Mobile navigation: build a hamburger toggle + slide-down drawer from the
  // existing desktop nav, which is hidden below 900px.
  function mobileNav() {
    const hdr = document.querySelector('.hdr');
    if (!hdr || hdr.querySelector('.nav-toggle')) return;
    const bar = hdr.querySelector('.container-wide');
    const nav = hdr.querySelector('.nav');
    if (!bar || !nav) return;

    const toggle = document.createElement('button');
    toggle.type = 'button';
    toggle.className = 'nav-toggle';
    toggle.setAttribute('aria-label', 'Abrir menú');
    toggle.setAttribute('aria-expanded', 'false');
    toggle.setAttribute('aria-controls', 'mobile-nav');
    toggle.innerHTML = '<span class="bars" aria-hidden="true"></span>';
    bar.appendChild(toggle);

    const drawer = document.createElement('div');
    drawer.className = 'mobile-nav';
    drawer.id = 'mobile-nav';

    const links = document.createElement('nav');
    links.className = 'mnav-links';
    links.setAttribute('aria-label', 'Navegación principal');
    nav.querySelectorAll('a').forEach(a => links.appendChild(a.cloneNode(true)));
    drawer.appendChild(links);

    const phone = bar.querySelector('.phone');
    if (phone) {
      const p = phone.cloneNode(true);
      p.classList.remove('phone'); p.classList.add('mnav-phone');
      drawer.appendChild(p);
    }
    const cta = bar.querySelector('.btn-primary');
    if (cta) drawer.appendChild(cta.cloneNode(true));

    hdr.appendChild(drawer);

    const backdrop = document.createElement('div');
    backdrop.className = 'nav-backdrop';
    document.body.appendChild(backdrop);

    const isOpen = () => hdr.classList.contains('nav-open');
    const open = () => {
      hdr.classList.add('nav-open');
      backdrop.classList.add('show');
      toggle.setAttribute('aria-expanded', 'true');
      toggle.setAttribute('aria-label', 'Cerrar menú');
      document.body.style.overflow = 'hidden';
    };
    const close = () => {
      hdr.classList.remove('nav-open');
      backdrop.classList.remove('show');
      toggle.setAttribute('aria-expanded', 'false');
      toggle.setAttribute('aria-label', 'Abrir menú');
      document.body.style.overflow = '';
    };

    toggle.addEventListener('click', () => isOpen() ? close() : open());
    backdrop.addEventListener('click', close);
    drawer.addEventListener('click', e => { if (e.target.closest('a')) close(); });
    document.addEventListener('keydown', e => { if (e.key === 'Escape' && isOpen()) { close(); toggle.focus(); } });
    window.addEventListener('resize', () => { if (window.innerWidth > 900 && isOpen()) close(); }, { passive: true });
  }

  function init() { paint(); reveal(); stickyShadow(); mobileNav(); }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
  window.CMC = { paint, reveal };
})();
