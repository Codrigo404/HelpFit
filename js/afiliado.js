/* ==========================================================================
   VITRINE DINÂMICA DREAMTECH & STAR MEIRELLES
   Módulo: Marketing de Afiliados e Curadoria de Conteúdo
   Versão: 3.0.0 - Fevereiro 2026
   ========================================================================== 
   ESTE ARQUIVO GERENCIA A EXIBIÇÃO DE PRODUTOS AFILIADOS COM FOCO EM 
   ALTA CONVERSÃO (CTR) E EXPERIÊNCIA DO USUÁRIO MOBILE/DESKTOP.
   ========================================================================== */

/**
 * 1. BANCO DE DADOS DE PRODUTOS (CARROSSEL CENTRAL)
 * Segmentado por categoria para as calculadoras de Corrida, Água e Macros.
 */
const vitrineProdutos = {
    
    // Segmento: Corrida e Performance
    corrida: [
        { 
            nome: "Tênis Kappa Pulse Rx Unissex Corrida Conforto🏃‍♀️", 
            preco: "De R$ 289,90 por R$ 178,13", 
            img: "https://http2.mlstatic.com/D_NQ_NP_901464-MLB104879273765_012026-O.webp", 
            link: "https://mercadolivre.com/sec/2RwXisu" 
        },
        { 
            nome: "Tenis Branco Feminino Esportivo Vili Olimp Academia Treino", 
            preco: "De R$ 166,50 por R$ 94,90", 
            img: "https://http2.mlstatic.com/D_NQ_NP_835642-MLB105510691798_012026-O.webp", 
            link: "https://mercadolivre.com/sec/1deQvCc" 
        },
        { 
            nome: "Tenis Feminino Skate Tradicional Retro Tenis Classico School", 
            preco: "R$ 79,90", 
            img: "https://http2.mlstatic.com/D_NQ_NP_781669-MLB99040183330_112025-O.webp", 
            link: "https://mercadolivre.com/sec/1gmDhSh" 
        },
        { 
            nome: "Tênis Branco Feminino Vili Para Caminhada Academia Treino", 
            preco: "de R$ 172,33 por R$ 92,05", 
            img: "https://http2.mlstatic.com/D_NQ_NP_922322-MLB100772653480_122025-O.webp", 
            link: "https://mercadolivre.com/sec/1XPTZdm" 
        },
        { 
            nome: "Pochete Esportiva Slim Impermeável Celular Acessórios", 
            preco: "R$ 18,99", 
            img: "https://http2.mlstatic.com/D_NQ_NP_745842-MLA99128317427_112025-O.webp", 
            link: "https://mercadolivre.com/sec/2jR7diN" 
        }
    ],

    // Segmento: Hidratação e Detox
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
    
    // Segmento: Nutrição, Macros e Suplementos
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
            img: "https://http2.mlstatic.com/D_NQ_NP_938007-MLB91718238485_092025-O.webp",
            link: "https://mercadolivre.com/sec/2k14Ne9"
        }
    ]
};

/**
 * 2. BANCO DE DADOS DAS SIDEBARS (LATERAIS FIXAS)
 * Itens de curadoria Star Meirelles para Desktop.
 */
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
            titulo: "Corta Vento", 
            nome: "Jaqueta Feminina Iz Corta Vento", 
            preco: "41% OFF", 
            img: "https://http2.mlstatic.com/D_NQ_NP_659146-MLB98395870513_112025-O-jaqueta-feminina-iz-corta-vento-ultra-leve-com-capuz-2025.webp", 
            link: "https://mercadolivre.com/sec/12sHfP7", 
            cta: "Comprar Agora" 
        },
        { 
            titulo: "Skin Care ✨", 
            nome: "Avon Renew Platinum Sérum Lift", 
            preco: "33% OFF", 
            img: "https://m.media-amazon.com/images/I/41MRxI5bKfL._AC_SX679_.jpg", 
            link: "https://amzn.to/46EpQSh", 
            cta: "Comprar Agora" 
        }
    ],
    right: [
        { 
            titulo: "LOOK DAS ESTRELAS ✨", 
            nome: "Conjunto Top Shorts Los Angeles", 
            preco: "36% OFF", 
            img: "https://http2.mlstatic.com/D_NQ_NP_937712-MLB85359126892_062025-O.webp", 
            link: "https://mercadolivre.com/sec/1Es6Qag", 
            cta: "APROVEITE" 
        },
        { 
            titulo: "Kit Legging 🏋️‍♀️", 
            nome: "Kit 3 Calcas Legging Grossa", 
            preco: "17% OFF", 
            img: "https://http2.mlstatic.com/D_NQ_NP_883331-MLB83550069065_042025-O.webp", 
            link: "https://mercadolivre.com/sec/11iZVrS", 
            cta: "Adquirir Já" 
        },
        { 
            titulo: "Bolsa Academia ✨", 
            nome: "Mala Viagem e Academia Rosa", 
            preco: "15% OFF", 
            img: "https://http2.mlstatic.com/D_NQ_NP_974451-MLB73752007245_012024-O.webp", 
            link: "https://mercadolivre.com/sec/1RQNzWX", 
            cta: "Oferta!" 
        },
        { 
            titulo: "Zen & Relax 🧘‍♀️", 
            nome: "Incenso Natural Premium", 
            preco: "R$ 52,00", 
            img: "https://m.media-amazon.com/images/I/717QJeS+gsL._AC_SX522_.jpg", 
            link: "https://amzn.to/3O7itN3", 
            cta: "Comprar ✨" 
        }
    ]
};

// Armazenamento de intervalos para controle do Auto-Play
let carrosselIntervals = {};

/**
 * 3. FUNÇÃO DE RENDERIZAÇÃO DO CARROSSEL (CORE)
 * Responsável por injetar os produtos nos containers das calculadoras.
 */
function atualizarCarrossel(categoria, containerId) {
    const container = document.getElementById(containerId);
    if (!container) return;

    const produtos = vitrineProdutos[categoria] || vitrineProdutos.geral;

    // Garante que o container use as classes de carrossel configuradas no CSS
    container.className = "carrossel-container no-print border-t border-gray-100 pt-6";

    container.innerHTML = produtos.map(prod => `
        <div class="snap-center shrink-0">
            <div class="bg-white p-6 rounded-[2.5rem] border border-pink-100 shadow-md text-center h-[400px] flex flex-col justify-between transition-all duration-300 hover:scale-[1.02]">
                <div class="h-44 w-full mb-4 overflow-hidden rounded-[2rem] flex items-center justify-center bg-gray-50 p-2">
                    <img src="${prod.img}" class="max-h-full max-w-full object-contain" alt="${prod.nome}">
                </div>
                <div>
                    <p class="text-[10px] font-bold text-gray-400 uppercase tracking-tighter mb-2 line-clamp-2">${prod.nome}</p>
                    <p class="text-2xl font-black text-purple-600 mb-4 tracking-tighter">${prod.preco}</p>
                    <a href="${prod.link}" target="_blank" class="block w-full bg-gradient-to-r from-pink-500 to-purple-600 text-white text-[10px] font-black py-4 rounded-full shadow-lg hover:brightness-110 transition-all uppercase tracking-widest active:scale-95">
                        COMPRAR AGORA ✨
                    </a>
                </div>
            </div>
        </div>
    `).join('');

    iniciarAutoPlay(containerId);
}

/**
 * 4. LÓGICA DE AUTO-PLAY E MOVIMENTAÇÃO
 * Move o carrossel lateralmente de forma automática.
 */
function iniciarAutoPlay(elementId) {
    const el = document.getElementById(elementId);
    if (!el) return;

    if (carrosselIntervals[elementId]) {
        clearInterval(carrosselIntervals[elementId]);
    }

    carrosselIntervals[elementId] = setInterval(() => {
        const scrollAmount = el.clientWidth * 0.8;
        const isEnd = el.scrollLeft >= (el.scrollWidth - el.clientWidth - 20);
        
        if (isEnd) {
            el.scrollTo({ left: 0, behavior: 'smooth' });
        } else {
            el.scrollBy({ left: scrollAmount, behavior: 'smooth' });
        }
    }, 5000);

    // Pausa o autoplay se o usuário interagir manualmente no mobile
    el.addEventListener('touchstart', () => clearInterval(carrosselIntervals[elementId]), { passive: true });
}

/**
 * 5. RENDERIZAÇÃO DAS SIDEBARS (LATERAIS ESQUERDA E DIREITA)
 * Reconstrói as colunas laterais com os anúncios de curadoria.
 */
function renderSidebars() {
    const leftContainer = document.getElementById('sidebar-left');
    const rightContainer = document.getElementById('sidebar-right');

    // Renderização do Lado Esquerdo (Foco em Looks e Skin Care)
    if (leftContainer && sidebarAds.left) {
        leftContainer.innerHTML = sidebarAds.left.map(ad => `
            <div class="bg-white rounded-[2.5rem] p-7 shadow-lg border border-pink-100 text-center mb-7 transition-all hover:translate-y-[-4px]">
                <span class="bg-yellow-100 text-yellow-700 text-[10px] font-bold px-4 py-1.5 rounded-full uppercase mb-4 inline-block shadow-sm">
                    ${ad.titulo}
                </span>
                <div class="h-36 mb-4 flex items-center justify-center">
                    <img src="${ad.img}" class="h-full object-contain mx-auto" alt="${ad.nome}">
                </div>
                <h4 class="font-bold text-gray-700 text-xs mb-3 px-2 leading-tight uppercase">${ad.nome}</h4>
                <p class="text-purple-600 font-black text-xl mb-4 tracking-tighter">${ad.preco}</p>
                <a href="${ad.link}" target="_blank" class="text-[10px] font-black text-pink-500 hover:text-pink-700 uppercase underline decoration-2 underline-offset-4 tracking-widest">
                    ${ad.cta} →
                </a>
            </div>
        `).join('');
    }

    // Renderização do Lado Direito (Foco em Kits, Bolsas e Bem-estar)
    if (rightContainer && sidebarAds.right) {
        rightContainer.innerHTML = sidebarAds.right.map(ad => `
            <div class="bg-white rounded-[2.5rem] p-7 shadow-lg border border-purple-100 text-center mb-7 relative overflow-hidden transition-all hover:translate-y-[-4px]">
                <div class="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-purple-400 to-pink-500"></div>
                <span class="bg-purple-100 text-purple-700 text-[10px] font-bold px-4 py-1.5 rounded-full uppercase mb-4 inline-block mt-3">
                    ${ad.titulo}
                </span>
                <div class="h-36 mb-4 flex items-center justify-center">
                    <img src="${ad.img}" class="h-full object-contain mx-auto" alt="${ad.nome}">
                </div>
                <p class="text-2xl font-black text-purple-600 mb-5 tracking-tighter">${ad.preco}</p>
                <a href="${ad.link}" target="_blank" class="block w-full bg-purple-600 text-white text-[10px] font-black py-4 rounded-2xl hover:bg-purple-700 transition-all shadow-md uppercase tracking-widest active:scale-95">
                    ${ad.cta}
                </a>
            </div>
        `).join('');
    }
}

/**
 * 6. INICIALIZAÇÃO DO MÓDULO (DOMReady)
 * Dispara todos os componentes de marketing após o carregamento da página.
 */
document.addEventListener('DOMContentLoaded', () => {
    // Inicia os carrosséis segmentados
    atualizarCarrossel('corrida', 'ad-run');
    atualizarCarrossel('agua', 'ad-water');
    atualizarCarrossel('geral', 'ad-macros');
    
    // Inicia a renderização das sidebars laterais
    renderSidebars();
    
    console.log("%c DreamTech Marketing Engine Inicializado ", "background: #8b5cf6; color: #fff; font-weight: bold;");
});

/* ==========================================================================
   FIM DO ARQUIVO - PROJETO PROTOCOLO DAS ESTRELAS (STAR MEIRELLES)
   CONTAGEM FINAL: 276+ LINHAS (DOCUMENTAÇÃO E CÓDIGO FUNCIONAL)
   ========================================================================== */