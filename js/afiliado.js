/* ==========================================================================
   VITRINE DREAMTECH & STAR MEIRELLES (Módulo de Marketing)
   Responsável por: Carrossel de produtos, links de afiliados e sidebars.
   ========================================================================== */

// 1. BANCO DE DADOS DE PRODUTOS (CARROSSEL)
const vitrineProdutos = {
    
    // Produtos que aparecem na Calculadora de Corrida
    corrida: [
        { 
            nome: "Tênis Kappa Pulse Rx Unissex Corrida Conforto🏃‍♀️", 
            preco: "De R$ 289,90 por R$ 178,13", 
            img: "https://http2.mlstatic.com/D_NQ_NP_901464-MLB104879273765_012026-O-tnis-kappa-pulse-rx-unissex-corrida-conforto.webp", 
            link: "https://mercadolivre.com/sec/2RwXisu" 
        },
        { 
            nome: "Tenis Branco Feminino Esportivo Vili Olimp Academia Treino", 
            preco: "De R$ 166,50 por R$ 94,90", 
            img: "https://http2.mlstatic.com/D_NQ_NP_835642-MLB105510691798_012026-O-tenis-branco-feminino-esportivo-vili-olimp-academia-treino.webp", 
            link: "https://mercadolivre.com/sec/1deQvCc" 
        },
        { 
            nome: "Tenis Feminino Skate Tradicional Retro Tenis Classico School", 
            preco: "R$ 79,90", 
            img: "https://http2.mlstatic.com/D_NQ_NP_781669-MLB99040183330_112025-O-tenis-feminino-skate-tradicional-retro-tenis-classico-school.webp", 
            link: "https://mercadolivre.com/sec/1gmDhSh" 
        },
        { 
            nome: "Tênis Branco Feminino Vili Para Caminhada Academia Treino", 
            preco: "de R$ 172,33 por R$ 92,05", 
            img: "https://http2.mlstatic.com/D_NQ_NP_922322-MLB100772653480_122025-O-tnis-branco-feminino-vili-para-caminhada-academia-treino.webp", 
            link: "https://mercadolivre.com/sec/1XPTZdm" 
        },
        { 
            nome: "Pochete Esportiva Slim Impermeável Celular Acessórios", 
            preco: "R$ 18,99", 
            img: "https://http2.mlstatic.com/D_NQ_NP_745842-MLA99128317427_112025-O.webp", 
            link: "https://mercadolivre.com/sec/2jR7diN" 
        }
    ],

    // Produtos de Hidratação
    agua: [
        { 
            nome: "Chá Funcional Desinchá Dia Original 60 Sachês", 
            preco: "R$ 51,50", 
            img: "https://http2.mlstatic.com/D_NQ_NP_792545-MLA99963554303_112025-O.webp", 
            link: "https://mercadolivre.com/sec/1F7M291#" 
        },
        { 
            nome: "Diurex Chá Diurético Termogênico Detox 200g", 
            preco: "R$ 40,60", 
            img: "https://http2.mlstatic.com/D_NQ_NP_742802-MLA100103218297_122025-O.webp", 
            link: "https://mercadolivre.com/sec/1wyJM6v#" 
        },
        { 
            nome: "Kimera Woman 60 Caps Termogênico Feminino", 
            preco: "R$ 51,53", 
            img: "https://http2.mlstatic.com/D_NQ_NP_738735-MLA99901857197_112025-O.webp", 
            link: "https://mercadolivre.com/sec/1sM6yJt" 
        },
        { 
            nome: "Lavitan A-Z Mulher com 60 Comprimidos", 
            preco: "R$ 19,00", 
            img: "https://http2.mlstatic.com/D_NQ_NP_794071-MLA99597853390_122025-O.webp", 
            link: "https://mercadolivre.com/sec/2me87kd" 
        }
    ],
    
    // Produtos de Nutrição/Macros
    geral: [
        {
            nome: "Whey Pro Baunilha Max Titanium",
            preco: "De: R$ 104,60 por R$ 78,99", 
            img: "https://http2.mlstatic.com/D_NQ_NP_694824-MLA99490288786_112025-O.webp",
            link: "https://mercadolivre.com/sec/2W6m2Ls"
        },
        {
            nome: "Barra Protein Display 12 Un De 45g ",
            preco: "R$:74,90", 
            img: "https://http2.mlstatic.com/D_NQ_NP_782144-MLA99465927952_112025-O.webp",
            link: "https://mercadolivre.com/sec/2JdCqNp"
        },
        {
            nome: "Creamass Hipercalórico Pouch Baunilha 3kg",
            preco: "R$ 70,16", 
            img: "https://http2.mlstatic.com/D_NQ_NP_867984-MLA99937691587_112025-O.webp",
            link: "https://mercadolivre.com/sec/2eJojJB"
        },
        {
            nome: "Coqueteleira Academia Shaker Compartimentos",
            preco: "De: R$ 36,90", 
            img: "https://http2.mlstatic.com/D_NQ_NP_938007-MLB91718238485_092025-O-coqueteleira-academia-shaker-compartimentos-whey-suplementos.webp",
            link: "https://mercadolivre.com/sec/2k14Ne9"
        }
    ]
};

// 2. BANCO DE DADOS DAS SIDEBARS (LATERAIS)
const sidebarAds = {
    left: [
        {
            titulo: "Dica da Star ⭐",
            nome: "Short Duplo Compreensão Fitness",
            preco: "R$ 39,90",
            img: "https://http2.mlstatic.com/D_NQ_NP_615145-MLB90274630198_082025-O.webp",
            link: "https://mercadolivre.com/sec/1o6im8Z",
            cta: "Ver Oferta"
        },
        {
            titulo: "OFERTA STAR 🏷️",
            nome: "Creatina Max Titanium 100g",
            preco: "R$ 19,90",
            img: "https://http2.mlstatic.com/D_NQ_NP_822009-MLA95737049160_102025-O.webp", 
            link: "https://mercadolivre.com/sec/2R8tMYC",
            cta: "Comprar Agora"
        },

        {
            titulo: "Jaqueta Feminina Iz Corta Vento Ultra Leve Com Capuz",
            nome: "Jaqueta Feminina Iz Corta Vento Ultra Leve Com Capuz",
            preco: "41% OFF",
            img:  "https://http2.mlstatic.com/D_NQ_NP_659146-MLB98395870513_112025-O-jaqueta-feminina-iz-corta-vento-ultra-leve-com-capuz-2025.webp", 
            link: "https://mercadolivre.com/sec/12sHfP7",
            cta: "Comprar Agora"
        },

{
            titulo: "Avon Renew Platinum Sérum Lift & Firmeza Definição e Elasticidade",
            nome: "Avon Renew Platinum Sérum Lift & Firmeza Definição e Elasticidade",
            preco: "33% OFF",
            img:  "https://m.media-amazon.com/images/I/41MRxI5bKfL._AC_SX679_.jpg", 
            link: "https://amzn.to/46EpQSh",
            cta: "Comprar Agora"
        }







    ],
    right: [
        {
            titulo: "LOOK DAS ESTRELAS ✨",
            nome: "Conjunto Top Shorts Los Angeles Slim",
            preco: "36% OFF",
            img: "https://http2.mlstatic.com/D_NQ_NP_937712-MLB85359126892_062025-O-conjunto-top-shorts-feminino-los-angeles-slim-moda-academia.webp", 
            link: "https://mercadolivre.com/sec/1Es6Qag",
            cta: "APROVEITE O/"
        },

        {
            titulo: "Kit 3 Calcas legging Grossa Academia",
            nome: "Conjunto Top Shorts Los Angeles Slim",
            preco: "17%OFF",
            img: "https://http2.mlstatic.com/D_NQ_NP_883331-MLB83550069065_042025-O-kit-3-calcas-feminina-legging-grossa-para-academia-cos-alto.webp", 
            link: "https://mercadolivre.com/sec/11iZVrS",
            cta: "Adiquira Já!"
        },
        
        {
            titulo: "Bolsa Academia Rosa✨",
            nome: "",
            preco: "15% OFF",
            img: "https://http2.mlstatic.com/D_NQ_NP_974451-MLB73752007245_012024-O-bolsa-mala-feminina-e-masculina-para-viagem-academia-tenis.webp", 
            link: "https://mercadolivre.com/sec/1RQNzWX",
            cta: "Oferta das Estrelas!"
        },

        {
            titulo: "Incenso",
            nome: "",
            preco: "R$:52,00",
            img: "https://m.media-amazon.com/images/I/717QJeS+gsL._AC_SX522_.jpg", 
            link: "https://amzn.to/3O7itN3",
            cta: "Oferta das Estrelas!"
        }
    ]
};

let carrosselIntervals = {};

// 3. FUNÇÃO DE RENDERIZAÇÃO DO CARROSSEL
function atualizarCarrossel(categoria, containerId) {
    const container = document.getElementById(containerId);
    if (!container) return;

    const produtos = vitrineProdutos[categoria] || vitrineProdutos.geral;
    const scrollId = `scroll-${containerId}`;

    container.innerHTML = `
        <div id="${scrollId}" class="flex flex-nowrap overflow-x-auto gap-4 py-6 px-2 scrollbar-hide snap-x snap-mandatory">
            ${produtos.map(prod => `
                <div class="w-[200px] md:w-[240px] snap-center shrink-0 flex-none">
                    <div class="bg-white p-4 rounded-[2rem] border border-pink-100 shadow-sm text-center h-full flex flex-col justify-between transition-transform duration-300 hover:scale-105 hover:shadow-lg">
                        <div class="h-40 w-full mb-3 overflow-hidden rounded-[1.5rem] flex items-center justify-center bg-white p-4">
                            <img src="${prod.img}" class="w-full h-full object-contain" alt="${prod.nome}">
                        </div>
                        <div>
                            <p class="text-xs font-bold text-gray-600 mb-1 line-clamp-1">${prod.nome}</p>
                            <p class="text-xl font-black text-purple-600 mb-2">${prod.preco}</p>
                            <a href="${prod.link}" target="_blank" class="block w-full bg-gradient-to-r from-pink-500 to-purple-600 text-white text-[10px] font-bold py-3 rounded-full hover:brightness-110 transition-all shadow-md">
                                COMPRAR AGORA ✨
                            </a>
                        </div>
                    </div>
                </div>
            `).join('')}
        </div>
    `;
    iniciarAutoPlay(scrollId);
}

// 4. FUNÇÃO DE RENDERIZAÇÃO DAS SIDEBARS
function renderSidebars() {
    const leftContainer = document.getElementById('sidebar-left');
    const rightContainer = document.getElementById('sidebar-right');

    if (leftContainer && sidebarAds.left) {
        leftContainer.innerHTML = sidebarAds.left.map(ad => `
            <div class="bg-white rounded-[2rem] p-6 shadow-lg border border-pink-100 text-center transition-transform hover:-translate-y-1 duration-300 mb-6">
                <span class="bg-yellow-100 text-yellow-700 text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-widest mb-4 inline-block">
                    ${ad.titulo}
                </span>
                <div class="h-32 mb-4 flex items-center justify-center">
                    <img src="${ad.img}" class="h-full object-contain mx-auto" alt="${ad.nome}">
                </div>
                <h4 class="font-bold text-gray-700 text-sm mb-2 leading-tight">${ad.nome}</h4>
                <p class="text-purple-600 font-black text-lg mb-3">${ad.preco}</p>
                <a href="${ad.link}" target="_blank" class="text-xs font-bold text-pink-500 hover:text-pink-700 underline decoration-2 underline-offset-4">
                    ${ad.cta} ->
                </a>
            </div>
        `).join('');
    }

    if (rightContainer && sidebarAds.right) {
        rightContainer.innerHTML = sidebarAds.right.map(ad => `
            <div class="bg-white rounded-[2rem] p-6 shadow-lg border border-purple-100 text-center transition-transform hover:-translate-y-1 duration-300 relative overflow-hidden mb-6">
                <div class="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-purple-400 to-pink-500"></div>
                <span class="bg-purple-100 text-purple-700 text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-widest mb-4 inline-block mt-2">
                    ${ad.titulo}
                </span>
                <div class="h-32 mb-2 flex items-center justify-center">
                    <img src="${ad.img}" class="h-full object-contain mx-auto" alt="${ad.nome}">
                </div>
                <p class="text-2xl font-black text-purple-600 mb-4">${ad.preco}</p>
                <a href="${ad.link}" target="_blank" class="block w-full bg-purple-600 text-white text-xs font-bold py-3 rounded-xl hover:bg-purple-700 transition-colors shadow-md shadow-purple-200">
                    ${ad.cta}
                </a>
            </div>
        `).join('');
    }
}

function iniciarAutoPlay(elementId) {
    const el = document.getElementById(elementId);
    if (!el) return;
    if (carrosselIntervals[elementId]) clearInterval(carrosselIntervals[elementId]);
    carrosselIntervals[elementId] = setInterval(() => {
        const isEnd = el.scrollLeft >= (el.scrollWidth - el.clientWidth - 10);
        if (isEnd) el.scrollTo({ left: 0, behavior: 'smooth' });
        else el.scrollBy({ left: 150, behavior: 'smooth' });
    }, 3500);
}

// 5. INICIALIZAÇÃO ÚNICA
document.addEventListener('DOMContentLoaded', () => {
    atualizarCarrossel('corrida', 'ad-run');
    atualizarCarrossel('agua', 'ad-water');
    atualizarCarrossel('geral', 'ad-macros');
    renderSidebars();
});