/* ==========================================================================
   NAVBAR.JS
   Responsabilidad única: comportamiento de la navbar (scroll, sección activa,
   menú mobile).
   ========================================================================== */

const ApexNavbar = (() => {
  function initScrollBehavior() {
    const navbar = document.getElementById('navbar');
    if (!navbar) return;

    window.addEventListener('scroll', () => {
      const current = window.scrollY;

      // Navbar fija: nunca cambia de posición ni se oculta al scrollear.
      // Solo ajusta un estilo cosmético (más compacta y opaca) tras dejar el Hero.
      navbar.classList.toggle('is-scrolled', current > window.innerHeight * 0.6);
    }, { passive: true });
  }

  function initActiveLink() {
    const links = document.querySelectorAll('[data-nav-link]');
    if (!links.length) return;

    ApexScroll.initActiveSection((sectionId) => {
      links.forEach((link) => {
        const target = link.getAttribute('href').replace('#', '');
        link.classList.toggle('is-active', target === sectionId);
      });
    });
  }

  function initMobileMenu() {
    const burger = document.getElementById('burgerBtn');
    const menu = document.getElementById('mobileMenu');
    if (!burger || !menu) return;

    function closeMenu() {
      burger.setAttribute('aria-expanded', 'false');
      burger.setAttribute('aria-label', 'Abrir menú');
      menu.dataset.state = 'closed';
      document.body.style.overflow = '';
    }

    function openMenu() {
      burger.setAttribute('aria-expanded', 'true');
      burger.setAttribute('aria-label', 'Cerrar menú');
      menu.dataset.state = 'open';
      document.body.style.overflow = 'hidden';
    }

    burger.addEventListener('click', () => {
      const isOpen = burger.getAttribute('aria-expanded') === 'true';
      isOpen ? closeMenu() : openMenu();
    });

    menu.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', closeMenu);
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') closeMenu();
    });
  }

  function init() {
    initScrollBehavior();
    initActiveLink();
    initMobileMenu();
  }

  return { init };
})();
