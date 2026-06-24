// =========================================================
// Hero Section — interaction logic
// Pure vanilla JS, no dependencies.
// =========================================================

document.addEventListener('DOMContentLoaded', () => {
  const navLinks = document.querySelectorAll('.nav__link');

  // Set active nav link on click (simple SPA-style state, no routing)
  navLinks.forEach((link) => {
    link.addEventListener('click', (e) => {
      // If using real hrefs/routing, remove this preventDefault.
      navLinks.forEach((l) => l.classList.remove('is-active'));
      link.classList.add('is-active');
    });
  });

  // Smooth-scroll for in-page anchors (Cursos / Contacto / Ver cursos)
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', (e) => {
      const targetId = anchor.getAttribute('href');
      const target = document.querySelector(targetId);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });
});