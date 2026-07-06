/* ==========================================================================
   REST.JS
   Responsabilidad única: Sección de descanso (Sección 8). Mientras la
   sección permanece fija en pantalla, el scroll hace avanzar la palabra
   activa: Mentalidad -> Progreso -> Resultados.
   ========================================================================== */

const ApexRest = (() => {

  function initRest() {
    const root = document.querySelector('[data-rest]');
    if (!root) return;

    const words = Array.from(root.querySelectorAll('[data-rest-word]'));
    if (!words.length) return;

    function update() {
      const rect = root.getBoundingClientRect();
      const total = rect.height - window.innerHeight;
      if (total <= 0) return;

      const scrolled = Math.min(Math.max(-rect.top, 0), total);
      const progress = scrolled / total;

      const activeIndex = Math.min(words.length - 1, Math.floor(progress * words.length));
      words.forEach((word, i) => word.classList.toggle('is-active', i === activeIndex));
    }

    let ticking = false;
    window.addEventListener('scroll', () => {
      if (!ticking) {
        requestAnimationFrame(() => { update(); ticking = false; });
        ticking = true;
      }
    }, { passive: true });

    update();
  }

  return { initRest };
})();
