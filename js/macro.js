/* ==========================================================================
   DREAMTECH BIOCODE - CORE NUTRITIVO (DADOS + LÓGICA + RANDOMIZAÇÃO)
   ========================================================================== */

// 1. DATABASE TACO (Valores por 100g)
const tabelaNutricional = {
    "Frango Grelhado": { p: 32, c: 0, f: 2.5, tipo: 'g' },
    "Patinho Grelhado": { p: 35.9, c: 0, f: 7.3, tipo: 'g' },
    "Tilápia Grelhada": { p: 26, c: 0, f: 2.7, tipo: 'g' },
    "Ovo Cozido": { p: 13.3, c: 0.6, f: 9.5, tipo: 'un', peso_un: 50 },
    "Clara de Ovo": { p: 11, c: 0, f: 0, tipo: 'un', peso_un: 33 },
    "Arroz Branco Cozido": { p: 2.5, c: 28.1, f: 0.2, tipo: 'g' },
    "Arroz Integral Cozido": { p: 2.6, c: 25.8, f: 1, tipo: 'g' },
    "Feijão Carioca Cozido": { p: 4.8, c: 13.6, f: 0.5, tipo: 'g' },
    "Batata Doce Cozida": { p: 0.6, c: 18.4, f: 0.1, tipo: 'g' },
    "Mandioca Cozida": { p: 0.6, c: 30.1, f: 0.3, tipo: 'g' },
    "Cuscuz de Milho": { p: 2.2, c: 25.4, f: 0.5, tipo: 'g' },
    "Aveia em Flocos": { p: 13.9, c: 66.6, f: 8.5, tipo: 'g' },
    "Pão Integral": { p: 9.4, c: 49.9, f: 3.7, tipo: 'fatia', peso_un: 25 },
    "Macarrão Cozido": { p: 5.8, c: 30.8, f: 0.9, tipo: 'g' },
    "Banana Prata": { p: 1.3, c: 26, f: 0.1, tipo: 'un', peso_un: 90 },
    "Maçã": { p: 0.3, c: 15, f: 0, tipo: 'un', peso_un: 150 },
    "Morango": { p: 0.9, c: 6.8, f: 0.3, tipo: 'g' },
    "Pasta de Amendoim": { p: 25, c: 20, f: 50, tipo: 'g' },
    "Azeite de Oliva": { p: 0, c: 0, f: 100, tipo: 'ml' },
    "Whey Protein": { p: 80, c: 5, f: 2, tipo: 'g' },
    "Suco de Uva Integral": { p: 0.5, c: 14, f: 0, tipo: 'ml' },
    "Abacate": { p: 1.2, c: 6, f: 12, tipo: 'g' },
    "Amêndoas": { p: 18.6, c: 20, f: 54, tipo: 'g' }
};

// 2. CATEGORIAS COM 10 OPÇÕES CADA (RANDOMIZADO)
const opcoesCardapio = {
    cafe_manha: [
        { p: "Ovo Cozido", c: "Pão Integral", g: "Azeite de Oliva" },
        { p: "Whey Protein", c: "Aveia em Flocos", g: "Pasta de Amendoim", nome: "Vitamina" },
        { p: "Ovo Cozido", c: "Cuscuz de Milho", g: "Azeite de Oliva" },
        { p: "Clara de Ovo", c: "Banana Prata", g: "Pasta de Amendoim", nome: "Shake" },
        { p: "Patinho Grelhado", c: "Mandioca Cozida", g: "Azeite de Oliva" },
        { p: "Whey Protein", c: "Morango", g: "Amêndoas", nome: "Vitamina" },
        { p: "Ovo Cozido", c: "Maçã", g: "Amêndoas" },
        { p: "Tilápia Grelhada", c: "Batata Doce Cozida", g: "Azeite de Oliva" },
        { p: "Ovo Cozido", c: "Aveia em Flocos", g: "Abacate" },
        { p: "Clara de Ovo", c: "Pão Integral", g: "Abacate" }
    ],
    lanche_manha: [
        { p: "Ovo Cozido", c: "Maçã", g: "Amêndoas" },
        { p: "Whey Protein", c: "Morango", g: "Pasta de Amendoim", nome: "Vitamina" },
        { p: "Frango Grelhado", c: "Pão Integral", g: "Azeite de Oliva" },
        { p: "Ovo Cozido", c: "Banana Prata", g: "Aveia em Flocos" },
        { p: "Whey Protein", c: "Maçã", g: "Pasta de Amendoim", nome: "Shake" },
        { p: "Clara de Ovo", c: "Morango", g: "Amêndoas" },
        { p: "Frango Grelhado", c: "Batata Doce Cozida", g: "Azeite de Oliva" },
        { p: "Ovo Cozido", c: "Morango", g: "Abacate" },
        { p: "Whey Protein", c: "Cuscuz de Milho", g: "Azeite de Oliva", nome: "Vitamina" },
        { p: "Ovo Cozido", c: "Aveia em Flocos", g: "Amêndoas" }
    ],
    pre_treino: [
        { p: "Frango Grelhado", c: "Batata Doce Cozida", g: "Azeite de Oliva" },
        { p: "Patinho Grelhado", c: "Arroz Branco Cozido", g: "Azeite de Oliva" },
        { p: "Whey Protein", c: "Banana Prata", g: "Aveia em Flocos", nome: "Vitamina" },
        { p: "Tilápia Grelhada", c: "Mandioca Cozida", g: "Azeite de Oliva" },
        { p: "Frango Grelhado", c: "Macarrão Cozido", g: "Azeite de Oliva" },
        { p: "Ovo Cozido", c: "Cuscuz de Milho", g: "Azeite de Oliva" },
        { p: "Frango Grelhado", c: "Arroz Integral Cozido", g: "Azeite de Oliva" },
        { p: "Patinho Grelhado", c: "Batata Doce Cozida", g: "Azeite de Oliva" },
        { p: "Whey Protein", c: "Mandioca Cozida", g: "Aveia em Flocos", nome: "Shake" },
        { p: "Tilápia Grelhada", c: "Arroz Branco Cozido", g: "Azeite de Oliva" }
    ],
    pos_treino: [
        { p: "Whey Protein", c: "Arroz Branco Cozido", g: "Morango", nome: "Vitamina" },
        { p: "Frango Grelhado", c: "Arroz Branco Cozido", a: "Feijão Carioca Cozido" },
        { p: "Tilápia Grelhada", c: "Batata Doce Cozida", g: "Morango" },
        { p: "Whey Protein", c: "Banana Prata", g: "Maçã", nome: "Vitamina" },
        { p: "Patinho Grelhado", c: "Macarrão Cozido", a: "Feijão Carioca Cozido" },
        { p: "Frango Grelhado", c: "Mandioca Cozida", g: "Morango" },
        { p: "Whey Protein", c: "Cuscuz de Milho", g: "Maçã", nome: "Vitamina" },
        { p: "Tilápia Grelhada", c: "Arroz Integral Cozido", g: "Morango" },
        { p: "Patinho Grelhado", c: "Arroz Branco Cozido", a: "Feijão Carioca Cozido" },
        { p: "Frango Grelhado", c: "Banana Prata", g: "Morango" }
    ],
    almoco: [
        { p: "Patinho Grelhado", c: "Arroz Integral Cozido", a: "Feijão Carioca Cozido" },
        { p: "Frango Grelhado", c: "Batata Doce Cozida", a: "Feijão Carioca Cozido" },
        { p: "Tilápia Grelhada", c: "Arroz Branco Cozido", a: "Feijão Carioca Cozido" },
        { p: "Patinho Grelhado", c: "Mandioca Cozida", a: "Feijão Carioca Cozido" },
        { p: "Frango Grelhado", c: "Macarrão Cozido", a: "Feijão Carioca Cozido" },
        { p: "Tilápia Grelhada", c: "Arroz Integral Cozido", a: "Feijão Carioca Cozido" },
        { p: "Patinho Grelhado", c: "Cuscuz de Milho", a: "Feijão Carioca Cozido" },
        { p: "Frango Grelhado", c: "Arroz Branco Cozido", a: "Feijão Carioca Cozido" },
        { p: "Tilápia Grelhada", c: "Macarrão Cozido", g: "Azeite de Oliva" },
        { p: "Patinho Grelhado", c: "Batata Doce Cozida", a: "Feijão Carioca Cozido" }
    ],
    lanche_tarde: [
        { p: "Ovo Cozido", c: "Maçã", g: "Amêndoas" },
        { p: "Whey Protein", c: "Banana Prata", g: "Pasta de Amendoim", nome: "Vitamina" },
        { p: "Frango Grelhado", c: "Pão Integral", g: "Azeite de Oliva" },
        { p: "Ovo Cozido", c: "Morango", g: "Abacate" },
        { p: "Clara de Ovo", c: "Banana Prata", g: "Aveia em Flocos", nome: "Vitamina" },
        { p: "Ovo Cozido", c: "Cuscuz de Milho", g: "Azeite de Oliva" },
        { p: "Whey Protein", c: "Aveia em Flocos", g: "Pasta de Amendoim", nome: "Shake" },
        { p: "Frango Grelhado", c: "Batata Doce Cozida", g: "Azeite de Oliva" },
        { p: "Ovo Cozido", c: "Maçã", g: "Abacate" },
        { p: "Ovo Cozido", c: "Banana Prata", g: "Amêndoas" }
    ],
    jantar: [
        { p: "Frango Grelhado", c: "Arroz Integral Cozido", g: "Azeite de Oliva" },
        { p: "Tilápia Grelhada", c: "Batata Doce Cozida", g: "Azeite de Oliva" },
        { p: "Patinho Grelhado", c: "Feijão Carioca Cozido", g: "Azeite de Oliva" },
        { p: "Ovo Cozido", c: "Macarrão Cozido", g: "Abacate" },
        { p: "Frango Grelhado", c: "Arroz Integral Cozido", g: "Azeite de Oliva" },
        { p: "Tilápia Grelhada", c: "Mandioca Cozida", g: "Azeite de Oliva" },
        { p: "Patinho Grelhado", c: "Arroz Branco Cozido", g: "Azeite de Oliva" },
        { p: "Ovo Cozido", c: "Morango", g: "Abacate" },
        { p: "Frango Grelhado", c: "Maçã", g: "Azeite de Oliva" },
        { p: "Tilápia Grelhada", c: "Feijão Carioca Cozido", g: "Azeite de Oliva" }
    ],
    ceia: [
        { p: "Whey Protein", c: "Morango", g: "Abacate", nome: "Vitamina" },
        { p: "Ovo Cozido", c: "Maçã", g: "Amêndoas" },
        { p: "Whey Protein", c: "Morango", g: "Pasta de Amendoim", nome: "Shake" },
        { p: "Clara de Ovo", c: "Maçã", g: "Abacate" },
        { p: "Ovo Cozido", c: "Morango", g: "Amêndoas" },
        { p: "Whey Protein", c: "Morango", g: "Abacate", nome: "Vitamina" },
        { p: "Clara de Ovo", c: "Maçã", g: "Pasta de Amendoim" },
        { p: "Ovo Cozido", c: "Morango", g: "Abacate" },
        { p: "Whey Protein", c: "Maçã", g: "Amêndoas", nome: "Vitamina" },
        { p: "Clara de Ovo", c: "Morango", g: "Pasta de Amendoim" }
    ]
};

// 3. SEÇÃO BÔNUS: RECEITAS LÍQUIDAS
const receitasLiquidasBonus = [
    { nome: "Vitamina de Morango e Chia", p: "Whey Protein", c: "Morango", g: "Amêndoas", dica: "Rica em antioxidantes." },
    { nome: "Shake de Banana e Pasta de Amendoim", p: "Whey Protein", c: "Banana Prata", g: "Pasta de Amendoim", dica: "Ideal para pré-treino." },
    { nome: "Suco Anabólico de Uva", p: "Whey Protein", c: "Suco de Uva Integral", g: "Abacate", dica: "Ajuda na recuperação tecidual." },
    { nome: "Vitamina de Maçã e Canela", p: "Whey Protein", c: "Maçã", g: "Amêndoas", dica: "Melhora a sensibilidade à insulina." },
    { nome: "Smoothie Tropical de Laranja", p: "Whey Protein", c: "Morango", g: "Abacate", dica: "Alto teor de Vitamina C." }
];

const proporcoes = {
    cafe_manha: 0.15, lanche_manha: 0.10, pre_treino: 0.15, 
    pos_treino: 0.15, almoco: 0.20, lanche_tarde: 0.10, 
    jantar: 0.10, ceia: 0.05
};

// 4. LÓGICA DE CÁLCULO
function calculateMacros() {
    const age = parseFloat(document.getElementById('age')?.value);
    const h = parseFloat(document.getElementById('height')?.value);
    const w = parseFloat(document.getElementById('weight')?.value);
    const g = document.getElementById('gender')?.value;
    const act = parseFloat(document.getElementById('activity')?.value);
    const goal = document.getElementById('goal')?.value;

    if (!age || !h || !w) return alert("Por favor, preencha todos os dados!");

    let bmr = (10 * w) + (6.25 * h) - (5 * age);
    bmr = (g === 'male') ? bmr + 5 : bmr - 161;
    
    let tdee = bmr * act;
    if (goal === 'loss') tdee -= 500; else if (goal === 'mass') tdee += 450; 

    const pTotal = w * 2;
    const gTotal = w * 0.8;
    const cTotal = (tdee - (pTotal * 4) - (gTotal * 9)) / 4;

    const pDisp = document.getElementById('proteinGrams');
    const cDisp = document.getElementById('carbGrams');
    const fDisp = document.getElementById('fatGrams');

    if (pDisp && cDisp && fDisp) {
        pDisp.innerText = Math.round(pTotal) + "g";
        
        cDisp.innerText = Math.round(cTotal) + "g";
        
        fDisp.innerText = Math.round(gTotal) + "g";
    }

    renderDieta(pTotal, cTotal, gTotal);
}

// 5. RENDERIZAÇÃO RANDÔMICA
function renderDieta(pTotal, cTotal, gTotal) {
    const container = document.getElementById('dietExamples');
    if (!container) return;
    container.innerHTML = "";

    const ordem = ['cafe_manha', 'lanche_manha', 'pre_treino', 'pos_treino', 'almoco', 'lanche_tarde', 'jantar', 'ceia'];
    const nomes = ["Café da Manhã", "Lanche da Manhã", "Pré-Treino", "Pós-Treino", "Almoço", "Lanche da Tarde", "Jantar", "Ceia"];

    ordem.forEach((ref, i) => {
        const prop = proporcoes[ref];
        const listaOpcoes = opcoesCardapio[ref];
        const indiceSorteado = Math.floor(Math.random() * listaOpcoes.length);
        let combo = {...listaOpcoes[indiceSorteado]};

        let carboAlvo = cTotal * prop;
        if (i >= 6 && carboAlvo > 25) carboAlvo = 25; // Crononutrição (menos carbo à noite)

        let qP = (pTotal * prop * 100) / (tabelaNutricional[combo.p]?.p || 1);
        let qC = (carboAlvo * 100) / (tabelaNutricional[combo.c]?.c || 1);
        let qG = (gTotal * prop * 100) / (tabelaNutricional[combo.g]?.f || 80);

        container.innerHTML += `
            <div class="p-5 bg-white rounded-2xl shadow-sm mb-4 border-l-4 ${ref.includes('treino') ? 'border-orange-500' : 'border-purple-500'}">
                <p class="font-black text-[10px] uppercase tracking-widest mb-2 ${ref.includes('treino') ? 'text-orange-600' : 'text-purple-600'}">${nomes[i]} ${combo.nome ? `(${combo.nome})` : ''}</p>
                <div class="text-sm text-gray-700 space-y-2 trava-biocode">
                    <p>🥩 ${formatarQuantidade(combo.p, qP)} de ${combo.p}</p>
                    <p>🥖 ${formatarQuantidade(combo.c, qC)} de ${combo.c}</p>
                    ${combo.a ? `<p>🥣 <strong>120g</strong> de ${combo.a}</p>` : `<p>🥑 ${formatarQuantidade(combo.g, qG)} de ${combo.g}</p>`}
                </div>
            </div>`;
    });

    // Injeta o bônus de sucos/vitaminas no final
    renderBonusLiquido(container);
    
    document.getElementById('results')?.classList.remove('hidden');
}

function renderBonusLiquido(container) {
    const sorteio = receitasLiquidasBonus[Math.floor(Math.random() * receitasLiquidasBonus.length)];
    container.innerHTML += `
        <div class="mt-10 p-6 bg-gradient-to-br from-purple-50 to-pink-50 rounded-3xl border-2 border-dashed border-purple-200">
            <h4 class="text-purple-600 font-black text-sm uppercase tracking-tighter mb-2">✨ BÔNUS: ESTÁ CANSADA DE COMER?</h4>
            <p class="text-xs text-gray-500 mb-4 font-medium italic">Substitua uma refeição sólida por este Shake:</p>
            <div class="bg-white p-4 rounded-2xl shadow-sm border border-purple-100">
                <p class="text-lg font-bold text-gray-700 mb-1">${sorteio.nome}</p>
                <p class="text-sm text-purple-500">🥤 ${sorteio.p} | 🍓 ${sorteio.c} | 🥜 ${sorteio.g}</p>
                <p class="mt-3 text-[10px] text-gray-400 font-bold uppercase border-t pt-2">💡 Dica Star: ${sorteio.dica}</p>
            </div>
        </div>`;
}

function formatarQuantidade(alimentoNome, gramasNecessarias) {
    const alimento = tabelaNutricional[alimentoNome];
    if (!alimento) return `<strong>${Math.round(gramasNecessarias)}g</strong>`;
    if (alimento.tipo === 'un' || alimento.tipo === 'fatia') {
        const unidades = Math.round(gramasNecessarias / alimento.peso_un) || 1; 
        return `<strong>${unidades} ${alimento.tipo}</strong> <span class="text-gray-400 text-[10px]">(${unidades * alimento.peso_un}g)</span>`;
    }
    return `<strong>${Math.round(gramasNecessarias)}${alimento.tipo}</strong>`;
}