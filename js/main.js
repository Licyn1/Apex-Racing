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
});
