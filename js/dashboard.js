/* ==========================================================================
   DASHBOARD.JS
   Responsabilidad única: la sección Resultados — gráfico SVG que se dibuja
   progresivamente, contadores animados y timeline de evolución.
   ========================================================================== */

const ApexDashboard = (() => {

  function animateCounter(el) {
    const target = parseFloat(el.dataset.counter);
    const decimals = parseInt(el.dataset.decimal || '0', 10);
    const prefix = el.dataset.prefix || '+';
    const suffix = el.dataset.suffix || '';
    const duration = 1200;
    const start = performance.now();

    function frame(now) {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3); // ease-out cúbico, sin rebote
      const value = (target * eased).toFixed(decimals);
      el.textContent = `${prefix}${value}${suffix}`;
      if (progress < 1) requestAnimationFrame(frame);
    }
    requestAnimationFrame(frame);
  }

  function initDashboard() {
    const dashboard = document.querySelector('[data-dashboard]');
    const timeline = document.querySelector('[data-timeline]');
    if (!dashboard) return;

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;

        if (entry.target === dashboard) {
          dashboard.classList.add('is-drawn');
          dashboard.querySelectorAll('[data-counter]').forEach(animateCounter);
        }
        if (entry.target === timeline) {
          timeline.classList.add('is-active');
        }
        observer.unobserve(entry.target);
      });
    }, { threshold: 0.35 });

    observer.observe(dashboard);
    if (timeline) observer.observe(timeline);
  }

  return { initDashboard };
})();
