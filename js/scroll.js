/* ==========================================================================
   SCROLL.JS
   Utilidades de scroll: reveal genérico, sección activa e inmersiva.
   Responsabilidad única: observar scroll/posición y disparar clases de estado.
   ========================================================================== */

const ApexScroll = (() => {

  /** Revela elementos .reveal cuando entran en viewport (usa Intersection Observer, no eventos de scroll continuos). */
  function initReveal() {
    const targets = document.querySelectorAll('.reveal');
    if (!targets.length) return;

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15, rootMargin: '0px 0px -60px 0px' });

    targets.forEach((el) => observer.observe(el));
  }

  /** Devuelve el ID de sección actualmente visible, para uso de navbar.js */
 function initActiveSection(onChange) {
  const sections = document.querySelectorAll('main section[id]');
  if (!sections.length) return;

  const observer = new IntersectionObserver((entries) => {
    const visible = entries
      .filter(entry => entry.isIntersecting)
      .sort((a, b) => b.intersectionRatio - a.intersectionRatio);

    if (visible.length) {
      onChange(visible[0].target.id);
    }

  }, {
    threshold: [0.2, 0.4, 0.6],
    rootMargin: '-30% 0px -30% 0px'
  });

  sections.forEach((el) => observer.observe(el));
}

  return { initReveal, initActiveSection };
})();
