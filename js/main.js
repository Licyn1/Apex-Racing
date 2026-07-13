/* ==========================================================================
   MAIN.JS
   Punto de entrada. Inicializa cada módulo con una única responsabilidad.
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {

  ApexAnimations.init();
  ApexScroll.initReveal();
  ApexNavbar.init();
  ApexAccordion.initTechPanels();
  ApexCarousel.init();
  ApexTilt.initTilt();
  ApexMethodProgress.initMethodProgress();

  /* ==========================================================
     TESTIMONIOS · Pausar carrusel al tocar en mobile
     ========================================================== */

  const marquee = document.querySelector('.testimonials-marquee');
  const track = document.querySelector('.testimonials-marquee__track');

  if (!marquee || !track) return;

  marquee.addEventListener('touchstart', () => {
    track.style.animationPlayState = 'paused';
  }, { passive: true });

  marquee.addEventListener('touchend', () => {
    track.style.animationPlayState = 'running';
  });

  marquee.addEventListener('touchcancel', () => {
    track.style.animationPlayState = 'running';
  });

});