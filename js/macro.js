/* ==========================================================================
   DREAMTECH BIOCODE - CORE NUTRITIVO (Lógica de Cálculo)
   ========================================================================== */

function calculateMacros() {
    const age = parseFloat(document.getElementById('age').value);
    const h = parseFloat(document.getElementById('height').value);
    const w = parseFloat(document.getElementById('weight').value);
    const g = document.getElementById('gender').value;
    const act = parseFloat(document.getElementById('activity').value);
    const goal = document.getElementById('goal').value;

    if (!age || !h || !w) return alert("Por favor, preencha todos os dados!");

    // Taxa Metabólica Basal (Mifflin-St Jeor)
    let bmr = (10 * w) + (6.25 * h) - (5 * age);
    bmr = (g === 'male') ? bmr + 5 : bmr - 161;
    
    // Gasto Energético Total
    let tdee = bmr * act;
    if (goal === 'loss') tdee -= 500; else if (goal === 'mass') tdee += 450; 

    // Divisão de Macros
    const pTotal = w * 2;
    const gTotal = w * 0.8;
    const cTotal = (tdee - (pTotal * 4) - (gTotal * 9)) / 4;

    window.macrosIniciais = { p: pTotal, c: cTotal, f: gTotal };

    // Atualização Visual dos Cards Superiores
    const pDisp = document.getElementById('proteinGrams');
    const cDisp = document.getElementById('carbGrams');
    const fDisp = document.getElementById('fatGrams');

    // Aplica as classes que o seu novo CSS de trava vai reconhecer
    pDisp.innerText = Math.round(pTotal) + "g";
    pDisp.classList.add('macro-valor-proteina');
    
    cDisp.innerText = Math.round(cTotal) + "g";
    cDisp.classList.add('macro-valor-carbo');

    fDisp.innerText = Math.round(gTotal) + "g";

    renderDieta(pTotal, cTotal, gTotal);
}

function renderDieta(pTotal, cTotal, gTotal) {
    const container = document.getElementById('dietExamples');
    container.innerHTML = "";
    const ordem = ['cafe_manha', 'lanche_manha', 'pre_treino', 'pos_treino', 'almoco', 'lanche_tarde', 'jantar', 'ceia'];
    const nomes = ["Café da Manhã", "Lanche da Manhã", "Pré-Treino", "Pós-Treino", "Almoço", "Lanche da Tarde", "Jantar", "Ceia"];

    ordem.forEach((ref, i) => {
        const prop = proporcoes[ref];
        let combo = {...categorias[ref]};

        // Regras de substituição inteligente
        if (combo.c === "Banana" || combo.c === "Maçã") {
            combo.g = "Amendoim";
        } else if (combo.c === "Pão Francês" || combo.c === "Pão de Forma" || combo.c === "Arroz Branco") {
            if (combo.g !== "Azeite") combo.g = "Manteiga";
        }

        let carboAlvo = cTotal * prop;
        if (i >= 6 && carboAlvo > 25) carboAlvo = 25; // Redução de carbo à noite

        let gFeijao = 0;
        let carboRestante = carboAlvo;
        if (combo.a === "Feijão") {
            gFeijao = 120;
            carboRestante = Math.max(0, carboAlvo - (120 * 0.14));
        }

        // Cálculos de gramatura baseados na tabelaNutricional (que deve estar carregada)
        let qP = (pTotal * prop * 100) / (tabelaNutricional[combo.p]?.p || 1);
        let qC = (carboRestante * 100) / (tabelaNutricional[combo.c]?.c || 1);
        let qG = (gTotal * prop * 100) / (tabelaNutricional[combo.g]?.f || 80);

        container.innerHTML += `
            <div class="p-5 bg-white rounded-2xl shadow-sm mb-4 border-l-4 ${ref.includes('treino') ? 'border-orange-500' : 'border-purple-500'}">
                <p class="font-black text-[10px] uppercase tracking-widest mb-2 ${ref.includes('treino') ? 'text-orange-600' : 'text-purple-600'}">${nomes[i]}</p>
                <div class="text-sm text-gray-700 space-y-2 trava-biocode">
                    <p>🥩 ${formatarQuantidade(combo.p, qP)} de ${combo.p}</p>
                    <p>🥖 ${formatarQuantidade(combo.c, qC)} de ${combo.c}</p>
                    ${gFeijao > 0 ? `<p>🥣 <strong>120g</strong> de Feijão</p>` : `<p>🥑 ${formatarQuantidade(combo.g, qG)} de ${combo.g}</p>`}
                </div>
            </div>`;
    });

    document.getElementById('results').classList.remove('hidden');
}

function formatarQuantidade(alimentoNome, gramasNecessarias) {
    const alimento = tabelaNutricional[alimentoNome];
    if (!alimento) return `<strong>${Math.round(gramasNecessarias)}g</strong>`;

    if (alimento.tipo === 'un' || alimento.tipo === 'fatia') {
        const unidades = Math.round(gramasNecessarias / alimento.peso_un) || 1; 
        const pesoFinal = unidades * alimento.peso_un;
        return `<strong>${unidades} ${alimento.tipo}</strong> <span class="text-gray-400 text-[10px]">(${pesoFinal}g)</span>`;
    }
    return `<strong>${Math.round(gramasNecessarias)}${alimento.tipo}</strong>`;
}