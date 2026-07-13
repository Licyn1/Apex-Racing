document.querySelectorAll('.carousel').forEach(carousel => {
  const track = carousel.querySelector('.carousel__track');
  const prev = carousel.querySelector('.carousel__btn--prev');
  const next = carousel.querySelector('.carousel__btn--next');

  if (!track || !prev || !next) return;

  let interval;

  function move(direction) {
    interval = setInterval(() => {
      track.scrollLeft += direction * 5;
    }, 10);
  }

  function stop() {
    clearInterval(interval);
  }

  next.addEventListener('mousedown', () => move(1));
  prev.addEventListener('mousedown', () => move(-1));

  next.addEventListener('mouseup', stop);
  prev.addEventListener('mouseup', stop);

  next.addEventListener('mouseleave', stop);
  prev.addEventListener('mouseleave', stop);

  next.addEventListener('touchstart', () => move(1));
  prev.addEventListener('touchstart', () => move(-1));

  next.addEventListener('touchend', stop);
  prev.addEventListener('touchend', stop);
});