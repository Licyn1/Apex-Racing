/* ==========================================================================
   REVEAL-COMPARE.JS
   Sección 4 · Comparación. El cursor actúa como revelador: mueve una
   máscara circular (mask-image) sobre la capa F1 para dejar ver la capa
   del Simulador Apex exactamente debajo del puntero. Un panel de texto
   FIJO (no sigue al mouse) cambia de contenido según el cuadrante donde
   está ubicado el cursor.
 
   Además, cuando el mouse NO está interactuando, la máscara hace un barrido
   idle automático (curva de Lissajous) para que el bloque no se vea estático
   e invite a pasar el cursor. Ese barrido solo corre mientras la sección es
   visible en pantalla (IntersectionObserver), y se detiene apenas el usuario
   toma el control con el mouse, retomando con una pausa al salir.
   ========================================================================== */
 
const ApexRevealCompare = (() => {
 
  const QUADRANT_TEXT = {
    tl: 'Telemetría en tiempo real',
    tr: 'Misma precisión de frenada',
    bl: 'Feedback instantáneo',
    br: 'Progresión medible',
  };
 
  const IDLE_RESUME_DELAY = 900; // ms de pausa tras salir el mouse antes de retomar el barrido
  const IDLE_PERIOD_X = 9000;    // ms por ciclo horizontal del Lissajous
  const IDLE_PERIOD_Y = 6200;    // ms por ciclo vertical (distinto => trayectoria no repetitiva)
  const LABEL_SWAP_MS = 160;     // duración del crossfade al cambiar de mensaje
 
  function init() {
    const root = document.getElementById('revealCompare');
    if (!root) return;
    const label = document.getElementById('revealPanelLabel');
    let swapTimer = null;
 
    // Posición objetivo (donde está el mouse, o donde apunta el barrido idle)
    // vs. posición actual de la máscara, que se acerca a la objetivo con un
    // lerp: esto evita el salto brusco y da la sensación de transición natural.
    let targetX = 50, targetY = 50;
    let currentX = 50, currentY = 50;
    let rafId = null;
    let active = false;      // true mientras el usuario controla con el mouse
    let idleEnabled = false; // true cuando el barrido automático debe correr
    let idleStart = null;
    let resumeTimer = null;
    let idlePhaseX = 0, idlePhaseY = Math.PI / 2; // offset para que no arranque en seco
 
    function quadrantFor(x, y) {
      const vertical = y < 50 ? 't' : 'b';
      const horizontal = x < 50 ? 'l' : 'r';
      return vertical + horizontal;
    }
 
    // El panel permanece siempre en el mismo lugar: lo único que cambia es
    // el contenido del label, con un crossfade breve entre mensajes.
    function setLabelText(text) {
      if (label.textContent === text) return;
      clearTimeout(swapTimer);
      label.classList.add('is-swapping');
      swapTimer = setTimeout(() => {
        label.textContent = text;
        label.classList.remove('is-swapping');
      }, LABEL_SWAP_MS);
    }
 
    function setMaskPosition(x, y) {
  root.style.setProperty('--rx', x + '%');
  root.style.setProperty('--ry', y + '%');
}
 
    function updateIdleTarget(timestamp) {
      if (idleStart === null) idleStart = timestamp;
      const elapsed = timestamp - idleStart;
      // Curva de Lissajous suave, acotada a un rango central (28%-72%) para
      // que el barrido siempre quede dentro del área visible del cuadro.
      const wx = (elapsed / IDLE_PERIOD_X) * Math.PI * 2 + idlePhaseX;
      const wy = (elapsed / IDLE_PERIOD_Y) * Math.PI * 2 + idlePhaseY;
      targetX = 50 + Math.sin(wx) * 22;
      targetY = 50 + Math.sin(wy) * 22;
    }
 
    function tick(timestamp) {
      if (idleEnabled && !active) updateIdleTarget(timestamp);
 
      currentX += (targetX - currentX) * 0.16;
      currentY += (targetY - currentY) * 0.16;
      setMaskPosition(currentX, currentY);
 
      const closeEnough = Math.abs(targetX - currentX) < 0.05 && Math.abs(targetY - currentY) < 0.05;
      if (active || idleEnabled || !closeEnough) {
        rafId = requestAnimationFrame(tick);
      } else {
        rafId = null;
      }
    }
 
    function ensureLoop() {
      if (!rafId) rafId = requestAnimationFrame(tick);
    }
 
    function startIdle() {
      idleEnabled = true;
      idleStart = null;
      root.classList.add('is-idle');
      ensureLoop();
    }
 
    function stopIdle() {
      idleEnabled = false;
      root.classList.remove('is-idle');
    }
 
    function onMove(e) {
      clearTimeout(resumeTimer);
      stopIdle();
 
      const rect = root.getBoundingClientRect();
      const px = e.clientX - rect.left;
      const py = e.clientY - rect.top;
      targetX = Math.max(0, Math.min(100, (px / rect.width) * 100));
      targetY = Math.max(0, Math.min(100, (py / rect.height) * 100));
      active = true;
 
      ensureLoop();
    }
 
    function onLeave() {
      active = false;
      // Retoma el barrido idle tras una pausa breve, arrancando la fase
      // desde la posición actual para que no haya salto visual.
      resumeTimer = setTimeout(() => {
        idlePhaseX = Math.asin(Math.max(-1, Math.min(1, (currentX - 50) / 22)));
        idlePhaseY = Math.asin(Math.max(-1, Math.min(1, (currentY - 50) / 22)));
        startIdle();
      }, IDLE_RESUME_DELAY);
    }
 
    root.addEventListener('mousemove', onMove);
    root.addEventListener('mouseleave', onLeave);
 
    // El barrido idle solo corre mientras la sección está en pantalla, para
    // no animar de más fuera de vista.
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && !active) {
          startIdle();
        } else if (!entry.isIntersecting) {
          clearTimeout(resumeTimer);
          stopIdle();
        }
      });
    }, { threshold: 0.15 });
    observer.observe(root);
  }
 
  return { init };
})();
document.addEventListener('DOMContentLoaded', () => {
  ApexRevealCompare.init();
});