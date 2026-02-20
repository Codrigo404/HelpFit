/* ==========================================================================
   DREAMTECH BIOCODE - PROTOCOLO DE ALTA PERFORMANCE (V8 - FINAL)
   ========================================================================== */

// Controle Global de Acesso
window.modoAdminLiberado = false; 

const bairrosRJ = ["Centro", "Copacabana", "Ipanema", "Leblon", "Botafogo", "Flamengo", "Tijuca", "Vila Isabel", "Maracanã", "Méier", "Madureira", "Barra da Tijuca", "Recreio dos Bandeirantes", "Jacarepaguá", "Bangu", "Campo Grande", "Santa Cruz","Sepetiba","Ilha do Governador","itaguai","seropedica","Nova Iguaçu","Queimados","São Gonçalo","Niterói","Duque de Caxias"];

const tabelaNutricional = {
    "Frango Grelhado": { p: 31, c: 0, f: 3.6, tipo: 'g' },
    "Carne Moída (Patinho)": { p: 26, c: 0, f: 7, tipo: 'g' },
    "Ovo": { p: 6, c: 1, f: 5, tipo: 'un', peso_un: 50 },
    "Tilápia/Peixe": { p: 26, c: 0, f: 2.7, tipo: 'g' },
    "Arroz Branco": { p: 2, c: 28, f: 0.2, tipo: 'g' },
    "Feijão": { p: 5, c: 14, f: 0.5, tipo: 'g' },
    "Batata Doce": { p: 0.6, c: 18, f: 0.1, tipo: 'g' },
    "Pão Francês": { p: 4.5, c: 29, f: 1.5, tipo: 'un', peso_un: 50 },
    "Pão de Forma": { p: 2.3, c: 12, f: 0.9, tipo: 'fatia', peso_un: 25 },
    "Banana": { p: 1, c: 23, f: 0.3, tipo: 'un', peso_un: 90 },
    "Maçã": { p: 0, c: 14, f: 0, tipo: 'un', peso_un: 130 },
    "Azeite": { p: 0, c: 0, f: 100, tipo: 'ml' },
    "Whey Protein": { p: 80, c: 5, f: 2, tipo: 'g' },
    "Manteiga": { p: 0, c: 0, f: 80, tipo: 'g' },
    "Iogurte": { p: 4, c: 5, f: 3, tipo: 'ml' },
    "Amendoim": { p: 26, c: 16, f: 49, tipo: 'g' }
};

const categorias = {
    cafe_manha:    { p: "Ovo", c: "Pão Francês", g: "Manteiga" },
    lanche_manha:  { p: "Ovo", c: "Maçã", g: "Amendoim" },
    pre_treino:    { p: "Frango Grelhado", c: "Batata Docê", g: "Azeite" },
    pos_treino:    { p: "Whey Protein", c: "Banana", g: "Amendoim" },
    almoco:        { p: "Frango Grelhado", c: "Arroz Branco", a: "Feijão" },
    lanche_tarde:  { p: "Ovo", c: "Banana", g: "Amendoim" },
    jantar:        { p: "Tilápia/Peixe", c: "Arroz Branco", a: "Feijão" },
    ceia:          { p: "Ovo", c: "Maçã", g: "Amendoim" }
};

const proporcoes = { 
    cafe_manha: 0.15, lanche_manha: 0.10, pre_treino: 0.15, pos_treino: 0.15,
    almoco: 0.15, lanche_tarde: 0.10, jantar: 0.12, ceia: 0.08 
};

function formatarQuantidade(alimentoNome, gramasNecessarias) {
    const alimento = tabelaNutricional[alimentoNome];
    if (!alimento) return `<strong>${Math.round(gramasNecessarias)}g</strong>`;

    if (alimentoNome === "Arroz Branco" && gramasNecessarias < 30) gramasNecessarias = 30;

    if (alimento.tipo === 'un' || alimento.tipo === 'fatia') {
        const unidades = Math.round(gramasNecessarias / alimento.peso_un) || 1; 
        const pesoFinal = unidades * alimento.peso_un;
        return `<strong>${unidades} ${alimento.tipo}</strong> <span class="text-gray-400 text-[10px]">(${pesoFinal}g)</span>`;
    }
    return `<strong>${Math.round(gramasNecessarias)}${alimento.tipo}</strong>`;
}

function calculateMacros() {
    const age = parseFloat(document.getElementById('age').value);
    const h = parseFloat(document.getElementById('height').value);
    const w = parseFloat(document.getElementById('weight').value);
    const g = document.getElementById('gender').value;
    const act = parseFloat(document.getElementById('activity').value);
    const goal = document.getElementById('goal').value;

    if (!age || !h || !w) return alert("Por favor, preencha todos os dados!");

    let bmr = (10 * w) + (6.25 * h) - (5 * age);
    bmr = (g === 'male') ? bmr + 5 : bmr - 161;
    let tdee = bmr * act;
    if (goal === 'loss') tdee -= 500; else if (goal === 'mass') tdee += 450; 

    const pTotal = w * 2;
    const gTotal = w * 0.8;
    const cTotal = (tdee - (pTotal * 4) - (gTotal * 9)) / 4;

    window.macrosIniciais = { p: pTotal, c: cTotal, f: gTotal };

    // LÓGICA DE TRAVA DO DASHBOARD
    if (window.modoAdminLiberado) {
        document.getElementById('proteinGrams').innerText = Math.round(pTotal) + "g";
        document.getElementById('carbGrams').innerText = Math.round(cTotal) + "g";
    } else {
        document.getElementById('proteinGrams').innerText = "🔒";
        document.getElementById('carbGrams').innerText = "🔒";
    }
    document.getElementById('fatGrams').innerText = Math.round(gTotal) + "g";

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

        // REGRA GORDURA INTELIGENTE
        if (combo.c === "Banana" || combo.c === "Maçã") {
            combo.g = "Amendoim";
        } else if (combo.c === "Pão Francês" || combo.c === "Pão de Forma" || combo.c === "Arroz Branco") {
            if (combo.g !== "Azeite") combo.g = "Manteiga";
        }

        let carboAlvo = cTotal * prop;
        if (i >= 6 && carboAlvo > 25) carboAlvo = 25;

        let gFeijao = 0;
        let carboRestante = carboAlvo;
        if (combo.a === "Feijão") {
            gFeijao = 120;
            carboRestante = Math.max(0, carboAlvo - (120 * 0.14));
        }

        let qP = (pTotal * prop * 100) / (tabelaNutricional[combo.p]?.p || 1);
        let qC = (carboRestante * 100) / (tabelaNutricional[combo.c]?.c || 1);
        let qG = (gTotal * prop * 100) / (tabelaNutricional[combo.g]?.f || 80);

        container.innerHTML += `
            <div class="p-5 bg-white rounded-2xl shadow-sm mb-4 border-l-4 ${ref.includes('treino') ? 'border-orange-500' : 'border-purple-500'}">
                <p class="font-black text-[10px] uppercase tracking-widest mb-2 ${ref.includes('treino') ? 'text-orange-600' : 'text-purple-600'}">${nomes[i]}</p>
                <div class="text-sm text-gray-700 space-y-2 ${window.modoAdminLiberado ? '' : 'blur-[5px] select-none pointer-events-none'}">
                    <p>🥩 ${formatarQuantidade(combo.p, qP)} de ${combo.p}</p>
                    <p>🥖 ${formatarQuantidade(combo.c, qC)} de ${combo.c}</p>
                    ${gFeijao > 0 ? `<p>🥣 <strong>120g</strong> de Feijão</p>` : `<p>🥑 ${formatarQuantidade(combo.g, qG)} de ${combo.g}</p>`}
                </div>
            </div>`;
    });

    container.innerHTML += `<div class="mt-8 p-6 bg-slate-50 border-2 border-dashed border-slate-200 rounded-3xl text-center">
        <h3 class="text-slate-800 font-black text-xs uppercase mb-3">🛡️ Protocolo BioCode Revisado</h3>
        <p class="text-slate-600 text-[10px] mb-4 uppercase font-bold">Crononutrição • Janela de Treino • Termogênese</p>
    </div>`;
    
    document.getElementById('results').classList.remove('hidden');
}

// SINCRONIZAÇÃO COM FIREBASE (Padronizado para monitorar o CPF digitado)
function iniciarMonitoramentoBioCode(cpf) {
    if (typeof db !== 'undefined' && cpf) {
        db.collection("pagamentos").doc(cpf).onSnapshot((doc) => {
            if (doc.exists) {
                const status = doc.data().status;
                if (status === "PAGO" || status === "RECEIVED" || status === "CONFIRMED") {
                    window.modoAdminLiberado = true;
                    if (document.getElementById('age').value) calculateMacros();
                }
            }
        });
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const sB = document.getElementById('user_neighborhood');
    if (sB) {
        sB.innerHTML = '<option value="" disabled selected>Selecione seu Bairro</option>';
        bairrosRJ.forEach(b => { let o = document.createElement('option'); o.value = b; o.textContent = b; sB.appendChild(o); });
    }
    const form = document.getElementById('macroCalculatorForm');
    if (form) {
        form.onsubmit = (e) => { 
            e.preventDefault(); 
            // Captura o CPF para iniciar o monitoramento assim que gerar a dieta
            const cpf = document.getElementById('user_cpf').value.replace(/\D/g, '');
            calculateMacros(); 
            iniciarMonitoramentoBioCode(cpf);
        };
    }
});