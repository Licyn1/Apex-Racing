/* ==========================================================================
   CAROUSEL.JS
   Responsabilidad única: comportamiento genérico de carruseles horizontales
   (Pilotos y Testimonios). Soporta drag, wheel, touch y botones laterales.
   ========================================================================== */

const ApexCarousel = (() => {

  function initCarousel(root) {
    const track = root.querySelector('[data-carousel-track]');
    const prevBtn = root.querySelector('[data-carousel-prev]');
    const nextBtn = root.querySelector('[data-carousel-next]');
    if (!track) return;

    function step() {
      const card = track.firstElementChild;
      return card ? card.getBoundingClientRect().width + 24 : 320;
    }

    prevBtn?.addEventListener('click', () => {
      track.scrollBy({ left: -step(), behavior: 'smooth' });
    });
    nextBtn?.addEventListener('click', () => {
      track.scrollBy({ left: step(), behavior: 'smooth' });
    });

    // Drag con mouse.
    let isDown = false;
    let startX = 0;
    let scrollStart = 0;

    track.addEventListener('mousedown', (e) => {
      isDown = true;
      startX = e.pageX;
      scrollStart = track.scrollLeft;
      track.style.scrollSnapType = 'none';
    });
    window.addEventListener('mouseup', () => {
      isDown = false;
      track.style.scrollSnapType = 'x mandatory';
    });
    window.addEventListener('mousemove', (e) => {
      if (!isDown) return;
      track.scrollLeft = scrollStart - (e.pageX - startX);
    });

    // Rueda horizontal: si el usuario hace scroll vertical sobre el carrusel, lo traducimos a horizontal.
    track.addEventListener('wheel', (e) => {
      if (Math.abs(e.deltaY) > Math.abs(e.deltaX)) {
        track.scrollLeft += e.deltaY;
        e.preventDefault();
      }
    }, { passive: false });

    // Touch: el navegador ya maneja scroll-snap nativo, no requiere JS adicional.
  }

  function init() {
    document.querySelectorAll('[data-carousel]').forEach(initCarousel);
  }

  return { init };
})();
