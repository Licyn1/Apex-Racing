/* ==========================================================================
   ACCORDION.JS
   Responsabilidad única: comportamiento de las 5 tech cards
   (expansión horizontal en desktop/tablet, acordeón vertical en mobile).
   ========================================================================== */

const ApexAccordion = (() => {

  function initTechPanels() {
    const panels = document.querySelectorAll('[data-tech]');
    if (!panels.length) return;

    const isMobile = () => window.matchMedia('(max-width: 640px)').matches;

    function openPanel(panel) {
      panels.forEach((p) => p.classList.toggle('is-open', p === panel));
    }

    panels.forEach((panel) => {
      // Desktop/Tablet: hover expande.
      panel.addEventListener('mouseenter', () => {
        if (!isMobile()) openPanel(panel);
      });

      // Mobile y teclado: click/Enter alterna como acordeón.
      panel.addEventListener('click', () => {
        if (isMobile()) {
          panel.classList.toggle('is-open');
        } else {
          openPanel(panel);
        }
      });

      panel.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          panel.click();
        }
      });
    });
  }

  return { initTechPanels };
})();
