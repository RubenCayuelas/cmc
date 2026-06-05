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

  function init() { paint(); reveal(); stickyShadow(); }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
  window.CMC = { paint, reveal };
})();
