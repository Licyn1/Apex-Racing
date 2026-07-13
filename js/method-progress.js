/* ==========================================================================
   METHOD-PROGRESS.JS
   Tiñe la línea de tiempo (Metodología) de celeste a naranja (Accent)
   mientras la sección queda fija (scroll-jack: .method mide 300vh,
   .method__sticky se pin-ea con position:sticky). El progreso 0→1
   corresponde exactamente a la duración del pin, así que al completarse
   el círculo 3 el scroll ya está por soltar hacia Resultados.
   Los 3 círculos se completan en secuencia (cada uno ocupa un tercio del
   recorrido). Sin dependencias de color-mix(): interpola RGB a mano para
   máxima compatibilidad.
   ========================================================================== */

const ApexMethodProgress = (() => {
  const CELESTE = [44, 85, 120];   // --color-celeste #2c5578
  const ACCENT  = [238, 114, 28];    // --color-accent  #ee721c

  function mix(from, to, t) {
    const r = Math.round(from[0] + (to[0] - from[0]) * t);
    const g = Math.round(from[1] + (to[1] - from[1]) * t);
    const b = Math.round(from[2] + (to[2] - from[2]) * t);
    return `rgb(${r}, ${g}, ${b})`;
  }

  function clamp01(n) {
    return Math.min(1, Math.max(0, n));
  }

  function initMethodProgress() {
    const section = document.querySelector('.method');
    const line = document.querySelector('.method__line');
    const dots = [...document.querySelectorAll('.method__dot')];
    if (!section || !line || dots.length === 0) return;

    let ticking = false;

    function update() {
      const rect = section.getBoundingClientRect();
      const scrollable = (rect.height - window.innerHeight) * 0.7;
      let progress;
      if (scrollable <= 0) {
        progress = rect.top <= 0 ? 1 : 0;
      } else {
        progress = clamp01(-rect.top / scrollable);
      }

      line.style.backgroundColor = mix(CELESTE, ACCENT, progress);

      dots.forEach((dot, i) => {
        const local = clamp01((progress - i / dots.length) * dots.length);
        dot.style.backgroundColor = mix(CELESTE, ACCENT, local);
      });

      ticking = false;
    }

    window.addEventListener('scroll', () => {
      if (!ticking) {
        requestAnimationFrame(update);
        ticking = true;
      }
    }, { passive: true });

    update();
  }

  return { initMethodProgress };
})();
