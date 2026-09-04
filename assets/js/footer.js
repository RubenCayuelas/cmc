/* Cayuelas — shared footer. Injects footer HTML into <footer data-footer>. */
(function () {
  const FB = "https://es-es.facebook.com/carpinteriametalicacayuelas.canalejo";
  const IG = "https://www.instagram.com/carpinteria_metalica_cayuelas_";
  const BASE_URL = window.CMC_BASE || "";
  const html = `
  <div class="container-wide">
    <div class="ft-grid">
      <div>
        <span class="cay-logo on-dark">
          <span class="plaque"></span>
          <span class="wordmark"><span class="name">Cayuelas</span><span class="sub">Hierro y aluminio</span></span>
        </span>
        <p class="desc">Carpintería metálica de hierro y aluminio Cayuelas en Priego de Córdoba. Diseño, fabricación e instalación a medida en la Subbética Cordobesa y toda Andalucía.</p>
        <div class="ic-row">
          <a href="${IG}" target="_blank" rel="noopener" aria-label="Instagram"><i class="fa-brands fa-instagram" aria-hidden="true"></i></a>
          <a href="${FB}" target="_blank" rel="noopener" aria-label="Facebook"><i class="fa-brands fa-facebook-f" aria-hidden="true"></i></a>
        </div>
      </div>
      <div>
        <h5>Servicios</h5>
        <ul>
          <li><a href="${BASE_URL}servicios/#cancelas">Cancelas y herrería</a></li>
          <li><a href="${BASE_URL}servicios/#forja">Forja</a></li>
          <li><a href="${BASE_URL}servicios/#aluminio">Aluminio y cerramientos</a></li>
          <li><a href="${BASE_URL}servicios/#aluminio">Mamparas de baño</a></li>
        </ul>
      </div>
      <div>
        <h5>Web</h5>
        <ul>
          <li><a href="${BASE_URL || './'}">Inicio</a></li>
          <li><a href="${BASE_URL}galeria/">Galería</a></li>
          <li><a href="${BASE_URL}contacto/">Contacto</a></li>
        </ul>
      </div>
      <div>
        <h5>Contacto</h5>
        <ul>
          <li class="row"><i class="fa-solid fa-location-dot" aria-hidden="true"></i> Pol. Ind. La Salinilla, nave 17 · 14800 Priego de Córdoba</li>
          <li class="row"><i class="fa-solid fa-phone" aria-hidden="true"></i> 957 54 71 06 · 658 76 73 99</li>
          <li class="row"><i class="fa-solid fa-envelope" aria-hidden="true"></i> cmcayuelas@gmail.com</li>
        </ul>
      </div>
    </div>
    <div class="ft-bottom">
      <span>© 2026 Carpintería Metálica Cayuelas</span>
      <span>Priego de Córdoba · Andalucía</span>
    </div>
  </div>`;
  function init(){
    document.querySelectorAll('footer[data-footer]').forEach(f => { f.innerHTML = html; });
    if (window.CMC && window.CMC.paint) window.CMC.paint();
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
