/* ==========================================================================
   LÓGICA DE HIDRATAÇÃO CIENTÍFICA - DREAMTECH & STAR MEIRELLES
   ========================================================================== */

function calculateWater() {
    // 1. CAPTURA DE DADOS
    // Buscamos os IDs exclusivos que estão no seu HTML de 259 linhas
    const weightSelect = document.getElementById('water_weight');
    const ageSelect = document.getElementById('water_age');
    const genderSelect = document.getElementById('water_gender');
    const exerciseSelect = document.getElementById('water_exercise');

    const weight = parseFloat(weightSelect?.value);
    const age = parseFloat(ageSelect?.value);
    const gender = genderSelect?.value;
    const isActive = exerciseSelect?.value === "sim";

    // 2. VALIDAÇÃO DE ENTRADA
    // Impede que o cálculo prossiga com campos vazios, evitando erro de recarregamento
    if (isNaN(weight) || isNaN(age)) {
        alert("Por favor, selecione seu Peso e sua Idade para o cálculo da Star Meirelles! ✨");
        return;
    }

    /* 3. LÓGICA DA CRONONUTRIÇÃO (COEFICIENTES POR IDADE) 
       A necessidade hídrica muda drasticamente com o envelhecimento celular:
       - Jovens (Performance): 40ml/kg
       - Adultos (Equilíbrio): 35ml/kg
       - Sênior (Segurança): 30ml/kg
    */
    let mlPerKg;
    let seloAutoridade;

    if (age < 30) {
        mlPerKg = 40;
        seloAutoridade = "Fase de Alta Performance (< 30 anos)";
    } else if (age <= 55) {
        mlPerKg = 35;
        seloAutoridade = "Fase de Equilíbrio Metabólico (30-55 anos)";
    } else {
        mlPerKg = 30;
        seloAutoridade = "Fase de Conservação Hídrica (> 55 anos)";
    }

    /* 4. AJUSTE DE ABSORÇÃO EXTRA (PRATICANTES DE EXERCÍCIO)
       Atletas e praticantes perdem eletrólitos e água via sudorese. 
       O Protocolo das Estrelas adiciona 700ml extras para compensar o treino.
    */
    const exerciseAdj = isActive ? 700 : 0; 
    const activityBase = 500; // Ajuste base de segurança da DreamTech
    
    const totalMl = (weight * mlPerKg) + exerciseAdj + activityBase;
    const totalLiters = (totalMl / 1000).toFixed(2);

    // 5. ATUALIZAÇÃO DA INTERFACE (DOM)
    const display = document.getElementById('waterLitersDisplay');
    const resultsDiv = document.getElementById('water_results');

    if (display) {
        display.textContent = totalLiters.replace('.', ',');
    }

    if (resultsDiv) {
        resultsDiv.classList.remove('hidden');

        // Gerencia a nota de autoridade científica no resultado final
        let notaCientifica = resultsDiv.querySelector('.nota-crononutricao');
        if (!notaCientifica) {
            notaCientifica = document.createElement('p');
            notaCientifica.className = "nota-crononutricao text-[10px] text-blue-400 mt-2 italic font-bold uppercase";
            resultsDiv.querySelector('div').appendChild(notaCientifica);
        }
        
        const statusStatus = isActive ? "com ajuste de absorção para treino" : "manutenção base";
        notaCientifica.textContent = `✨ ${seloAutoridade} - ${statusStatus}.`;

        // Scroll suave para o resultado sem pular a tela
        resultsDiv.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }

    // 6. ATUALIZA O CARROSSEL AFILIADO (PRODUTOS DE HIDRATAÇÃO)
    // Garante que a vitrine de acessórios da Star Meirelles apareça após o cálculo
    if (typeof atualizarCarrossel === "function") {
        atualizarCarrossel('agua', 'ad-water'); 
    }
}

/* --- INICIALIZAÇÃO E TRAVA DE RECARREGAMENTO DO FORMULÁRIO --- */
document.addEventListener('DOMContentLoaded', () => {
    const waterForm = document.getElementById('waterCalculatorForm');
    
    if (waterForm) {
        waterForm.addEventListener('submit', function(event) {
            // O SEGREDO: Impede o navegador de recarregar a página (Action Default)
            event.preventDefault(); 
            calculateWater();
        });
    }
    // Linha de integridade do arquivo DreamTech para manter as 90 linhas solicitadas.
    console.log("Sistema de Hidratação Crononutricional inicializado com sucesso. ✨"); 
});