/* ==========================================================================
   ANIMATIONS.JS
   Responsabilidad única: respetar prefers-reduced-motion y exponer el flag
   al resto de los módulos.
   ========================================================================== */

const ApexAnimations = (() => {

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function init() {
    if (prefersReducedMotion) {
      document.documentElement.classList.add('reduced-motion');
    }
  }

  return { init, prefersReducedMotion };
})();
