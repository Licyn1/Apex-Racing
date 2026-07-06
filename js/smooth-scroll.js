/* ==========================================================================
   SMOOTH-SCROLL.JS
   Responsabilidad única: al hacer click en un link interno (#seccion), anima
   el scroll con una curva de easing propia en vez de depender del
   scroll-behavior:smooth nativo del navegador (que en distancias largas se
   siente abrupto y con velocidad pareja de principio a fin).
   ========================================================================== */

const ApexSmoothScroll = (() => {

  function easeInOutCubic(t) {
    return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
  }

  function scrollToY(targetY, duration = 900) {
    const startY = window.scrollY;
    const distance = targetY - startY;
    const startTime = performance.now();

    function step(now) {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      window.scrollTo({ top: startY + distance * easeInOutCubic(progress), left: 0, behavior: 'instant' });
      if (progress < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  }

  function init() {
    document.querySelectorAll('a[href^="#"]').forEach((link) => {
      link.addEventListener('click', (e) => {
        const id = link.getAttribute('href').slice(1);
        const target = document.getElementById(id);
        if (!target) return;
        e.preventDefault();
        const navbarClearance = 90;
        const targetY = target.getBoundingClientRect().top + window.scrollY - navbarClearance;
        scrollToY(Math.max(targetY, 0));
        history.pushState(null, '', `#${id}`);
      });
    });
  }

  return { init };
})();
