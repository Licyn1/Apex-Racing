document.addEventListener('DOMContentLoaded', () => {

  // 1. Smooth scroll al CTA
  const ctaBtn = document.querySelector('.cta-btn');
  ctaBtn?.addEventListener('click', (e) => {
    e.preventDefault();
    const target = document.querySelector('#cursos');
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  });

  // 2. Activar nav-link 
  const navLinks = document.querySelectorAll('.nav-link');
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      navLinks.forEach(l => l.classList.remove('active'));
      link.classList.add('active');
    });
  });

document.addEventListener('DOMContentLoaded', () => {
  const contenedor = document.querySelector('.carrusel-contenedor');
  const btnPrev = document.querySelector('.prev-btn');
  const btnNext = document.querySelector('.next-btn');

  if (contenedor && btnPrev && btnNext) {
    let IDAnimacion = null;
    const velocidad = 6; // <-- Cambiá este número para regular qué tan rápido avanza al mantener apretado

    // Función que ejecuta el scroll en bucle frame por frame
    const iniciarScrollContinuo = (direccion) => {
      if (IDAnimacion) return; // Evita que se duplique la velocidad si buglean el click

      const bucle = () => {
        contenedor.scrollLeft += direccion * velocidad;
        IDAnimacion = requestAnimationFrame(bucle);
      };
      
      IDAnimacion = requestAnimationFrame(bucle);
    };

    // Función que frena el motor inmediatamente
    const detenerScrollContinuo = () => {
      if (IDAnimacion) {
        cancelAnimationFrame(IDAnimacion);
        IDAnimacion = null;
      }
    };

    /* --- EVENTOS PARA EL BOTÓN SIGUIENTE (DERECHA) --- */
    // Al apretar con el mouse o tocar en el celu, arranca hacia adelante (1)
    btnNext.addEventListener('mousedown', () => iniciarScrollContinuo(1));
    btnNext.addEventListener('touchstart', (e) => { e.preventDefault(); iniciarScrollContinuo(1); });

    // Al soltar o salir del botón, frena
    btnNext.addEventListener('mouseup', detenerScrollContinuo);
    btnNext.addEventListener('mouseleave', detenerScrollContinuo);
    btnNext.addEventListener('touchend', detenerScrollContinuo);

    /* --- EVENTOS PARA EL BOTÓN ANTERIOR (IZQUIERDA) --- */
    // Al apretar con el mouse o tocar en el celu, arranca hacia atrás (-1)
    btnPrev.addEventListener('mousedown', () => iniciarScrollContinuo(-1));
    btnPrev.addEventListener('touchstart', (e) => { e.preventDefault(); iniciarScrollContinuo(-1); });

    // Al soltar o salir del botón, frena
    btnPrev.addEventListener('mouseup', detenerScrollContinuo);
    btnPrev.addEventListener('mouseleave', detenerScrollContinuo);
    btnPrev.addEventListener('touchend', detenerScrollContinuo);
  }
});