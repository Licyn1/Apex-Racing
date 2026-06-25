// main.js
// Por ahora no hay lógica dinámica requerida para esta sección.
// Este archivo queda disponible para futuras interacciones (menú mobile, scroll effects, etc.)

document.addEventListener('DOMContentLoaded', () => {

  // Smooth scroll al CTA
  const ctaBtn = document.querySelector('.cta-btn');
  ctaBtn?.addEventListener('click', (e) => {
    e.preventDefault();
    const target = document.querySelector('#cursos');
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  });

  // Activar nav-link según sección visible (extensible)
  const navLinks = document.querySelectorAll('.nav-link');
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      navLinks.forEach(l => l.classList.remove('active'));
      link.classList.add('active');
    });
  });
document.addEventListener('DOMContentLoaded', () => {
    const track = document.getElementById('carouselTrack');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');

    let currentIndex = 0;

    // Función para mover el carrusel calculando el ancho dinámico de una tarjeta
    function moveCarousel() {
        const cardWidth = document.querySelector('.benefit-card').getBoundingClientRect().width;
        const gap = 20; // El mismo gap declarado en el CSS
        
        // Calculamos cuánto debe desplazarse el contenedor
        const amountToMove = currentIndex * (cardWidth + gap);
        track.style.transform = `translateX(-${amountToMove}px)`;
    }

    // Evento botón Siguiente
    nextBtn.addEventListener('click', () => {
        const cards = document.querySelectorAll('.benefit-card');
        // Evitamos que avance si ya llegó al límite visible de elementos
        if (currentIndex < cards.length - 1) {
            currentIndex++;
            moveCarousel();
        }
    });

    // Evento botón Anterior
    prevBtn.addEventListener('click', () => {
        if (currentIndex > 0) {
            currentIndex--;
            moveCarousel();
        }
    });

    // Reajustar posición si el usuario cambia el tamaño de la ventana
    window.addEventListener('resize', moveCarousel);
});
});