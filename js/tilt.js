/* ==========================================================================
   TILT.JS
   Responsabilidad única: efecto de inclinación 3D en las cards de Programas
   (Sección 5), adaptado del concepto de referencia (perspective + rotateX/Y
   en hover). La referencia original lo hacía solo con CSS a un ángulo fijo;
   acá se calcula el ángulo según la posición del mouse dentro de la card
   para que la inclinación responda al punto exacto donde se apoya el cursor.
   ========================================================================== */

const ApexTilt = (() => {

  const MAX_TILT = 8; // grados

  function initTilt() {
    if (window.matchMedia('(pointer: coarse)').matches) return; // sin tilt en touch, no aplica en dispositivos sin mouse

    document.querySelectorAll('[data-tilt]').forEach((card) => {
      function onMove(e) {
        const rect = card.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width - 0.5;
        const y = (e.clientY - rect.top) / rect.height - 0.5;
        card.style.transform =
          `rotateY(${x * MAX_TILT * 2}deg) rotateX(${-y * MAX_TILT * 2}deg) translateZ(6px)`;
        card.style.setProperty('--mx', `${(x + 0.5) * 100}%`);
        card.style.setProperty('--my', `${(y + 0.5) * 100}%`);
      }
      function onLeave() {
        card.style.transform = 'rotateY(0) rotateX(0) translateZ(0)';
      }
      card.addEventListener('mousemove', onMove);
      card.addEventListener('mouseleave', onLeave);
    });
  }

  return { initTilt };
})();