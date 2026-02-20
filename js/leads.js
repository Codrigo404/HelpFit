/* ==========================================================================
    SISTEMA DE CAPTURA - DREAMTECH & ORCAM TIF (VERSÃO FINAL REVISADA)
   ========================================================================== */

// 1. MÁSCARA PARA O CAMPO DE WHATSAPP
function aplicarMascaraTelefone(el) {
    el.addEventListener('input', (e) => { // Alterado para 'input' para melhor resposta
        let v = e.target.value.replace(/\D/g, ""); 
        v = v.replace(/^(\d{2})(\d)/g, "($1) $2"); 
        v = v.replace(/(\d{5})(\d)/, "$1-$2");    
        e.target.value = v.substring(0, 15);          
    });
}

// 2. FUNÇÃO DE CAPTURA E ENVIO
function capturarEEnviarLead() {
    const form = document.getElementById('macroCalculatorForm');
    if (!form) return;

    form.addEventListener('submit', (e) => {
        // --- CORREÇÃO 1: IMPEDE O ENVIO DUPLO DO NAVEGADOR ---
        e.preventDefault(); 

        const btnSubmit = form.querySelector('button[type="submit"]');
        if (btnSubmit) {
            btnSubmit.disabled = true; // Trava o botão para evitar múltiplos cliques
            btnSubmit.innerText = "Processando...";
        }

        // Coleta os dados
        const dados = {
            nome: document.getElementById('user_name').value.toLowerCase(),
            estado: document.getElementById('user_state').value.toLowerCase(),
            bairro: document.getElementById('user_neighborhood').value.toLowerCase(),
            whatsapp: document.getElementById('user_phone').value,
            idade: document.getElementById('age').value,
            weight: document.getElementById('weight').value, 
            objetivo: document.getElementById('goal').options[document.getElementById('goal').selectedIndex].text.toLowerCase(),
            politica: "aceito_ao_prosseguir",
            timestamp: new Date().toLocaleString('pt-BR').toLowerCase()
        };

        enviarLead(dados, btnSubmit);
    });
}

// 3. ENVIO PARA O GOOGLE APPS SCRIPT
function enviarLead(dados, btnSubmit) {
    const scriptURL = "https://script.google.com/macros/s/AKfycbxJ02k6obKvJwa4MuSyPkcPkzLTW-sPtKxqd3ybFnqoP0iTQEIPVDN6GQ8Drtb7UFLe1Q/exec"; 

    fetch(scriptURL, {
        method: "POST",
        mode: "no-cors", // Mantido no-cors como está no seu original
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(dados)
    })
    .then(() => {
        console.log("Lead processado pela DreamTech com sucesso!");
        // Aqui você pode redirecionar ou mostrar mensagem de sucesso
        // Exemplo: alert("Cálculo realizado! Verifique seu Telegram.");
    })
    .catch(error => {
        console.error("Erro no processamento:", error);
        if (btnSubmit) {
            btnSubmit.disabled = false;
            btnSubmit.innerText = "Calcular Novamente";
        }
    });
}

// 4. INICIALIZAÇÃO
window.addEventListener('load', () => {
    const inputTel = document.getElementById('user_phone');
    if (inputTel) aplicarMascaraTelefone(inputTel);
    capturarEEnviarLead();
});