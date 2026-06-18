document.addEventListener("DOMContentLoaded", function() {

    // CONTROL DEL COVERFLOW (INTERCAMBIO DE CLASES MAESTRAS)
    const btnPrev = document.querySelector('.btn-nav-arrow.prev');
    const btnNext = document.querySelector('.btn-nav-arrow.next');
    const cardLeft = document.getElementById('card-left');
    const cardCenter = document.getElementById('card-center');
    const cardRight = document.getElementById('card-right');

    let step = 0;

    function renderCoverflow() {
        if (step === 0) {
            cardLeft.className = "coverflow-card side-card left";
            cardCenter.className = "coverflow-card center-card";
            cardRight.className = "coverflow-card side-card right";
        } else if (step === 1) {
            cardLeft.className = "coverflow-card side-card right";
            cardCenter.className = "coverflow-card side-card left";
            cardRight.className = "coverflow-card center-card";
        } else {
            cardLeft.className = "coverflow-card center-card";
            cardCenter.className = "coverflow-card side-card right";
            cardRight.className = "coverflow-card side-card left";
        }
    }

    if(btnPrev && btnNext) {
        btnNext.addEventListener('click', () => {
            step = (step + 1) % 3;
            renderCoverflow();
        });

        btnPrev.addEventListener('click', () => {
            step = (step - 1 + 3) % 3;
            renderCoverflow();
        });
    }

    // INTERRUPTOR DE PESTAÑAS (TABS)
    const tabButtons = document.querySelectorAll('.tab-button');
    tabButtons.forEach(button => {
        button.addEventListener('click', function() {
            tabButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
        });
    });
});