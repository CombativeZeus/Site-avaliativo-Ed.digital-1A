// --- GESTÃO DE DADOS ---
const pokemonData = [
    { id: 1, name: "Bulbasaur", type: "Planta/Veneno", desc: "Uma semente cresce em suas costas." },
    { id: 4, name: "Charmander", type: "Fogo", desc: "A chama na ponta da cauda indica sua saúde." },
    { id: 7, name: "Squirtle", type: "Água", desc: "Retrai-se para dentro de sua carapaça." },
    { id: 25, name: "Pikachu", type: "Elétrico", desc: "Armazena eletricidade em suas bochechas." }
];

const faqs = [
    { q: "O que é um Pokémon Shiny?", a: "São variantes raras com cores diferentes das normais." },
    { q: "Como evoluir Pokémons?", a: "Através de experiência, pedras especiais ou trocas." }
];

// --- INICIALIZAÇÃO ---
document.addEventListener('DOMContentLoaded', () => {
    renderGrid();
    renderCarousel();
    renderAccordion();
    initScrollReveal();
});

// --- RENDERIZAÇÃO DINÂMICA ---
function renderGrid() {
    const grid = document.getElementById('pokemon-grid');
    grid.innerHTML = pokemonData.map(p => `
        <article class="card">
            <h3>${p.name}</h3>
            <p><strong>Tipo:</strong> ${p.type}</p>
            <p>${p.desc}</p>
        </article>
    `).join('');
}

// --- ACESSIBILIDADE: TAMANHO DA FONTE ---
let currentFontSize = 16;
function changeFontSize(action) {
    currentFontSize += (action === 'increase' ? 2 : -2);
    document.documentElement.style.setProperty('--font-base', currentFontSize + 'px');
}

// --- ACESSIBILIDADE: ALTO CONTRASTE ---
function toggleHighContrast() {
    document.body.classList.toggle('high-contrast');
}

// --- COMPONENTE: CARROSSEL ---
let currentSlide = 0;
function renderCarousel() {
    const track = document.getElementById('carousel-track');
    track.innerHTML = pokemonData.map(p => `
        <div class="carousel-item" role="group" aria-label="Destaque: ${p.name}">
            <h3>Destaque: ${p.name}</h3>
        </div>
    `).join('');
}

document.getElementById('nextBtn')?.addEventListener('click', () => {
    currentSlide = (currentSlide + 1) % pokemonData.length;
    updateCarousel();
});

document.getElementById('prevBtn')?.addEventListener('click', () => {
    currentSlide = (currentSlide - 1 + pokemonData.length) % pokemonData.length;
    updateCarousel();
});

function updateCarousel() {
    const track = document.getElementById('carousel-track');
    track.style.transform = `translateX(-${currentSlide * 100}%)`;
}

// --- COMPONENTE: ACORDEÃO (FAQ) ---
function renderAccordion() {
    const faqContainer = document.getElementById('faq-accordion');
    faqContainer.innerHTML = faqs.map((f, i) => `
        <div class="accordion-item">
            <button aria-expanded="false" onclick="toggleAccordion(this)">
                ${f.q}
            </button>
            <div class="content" hidden>
                <p>${f.a}</p>
            </div>
        </div>
    `).join('');
}

function toggleAccordion(btn) {
    const expanded = btn.getAttribute('aria-expanded') === 'true';
    btn.setAttribute('aria-expanded', !expanded);
    btn.nextElementSibling.hidden = expanded;
}

// --- ANIMAÇÃO SCROLL REVEAL ---
function initScrollReveal() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
}
