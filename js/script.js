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

  // 3. Lógica del Carrusel Corregida
  const contenedor = document.querySelector('.carrusel-contenedor');
  const btnPrev = document.querySelector('.prev-btn');
  const btnNext = document.querySelector('.next-btn');
  
  if (contenedor && btnPrev && btnNext) {
    btnNext.addEventListener('click', () => {
      // Calcula el ancho exacto de la tarjeta visible + su superposición
      const cardWidth = document.querySelector('.card').offsetWidth;
      contenedor.scrollBy({ left: cardWidth, behavior: 'smooth' });
    });

    btnPrev.addEventListener('click', () => {
      const cardWidth = document.querySelector('.card').offsetWidth;
      contenedor.scrollBy({ left: -cardWidth, behavior: 'smooth' });
    });
  }
});
