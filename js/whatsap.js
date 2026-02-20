/* ==========================================================================
   ENVIO DE PLANO VIA WHATSAPP - STAR MEIRELLES & DREAMTECH
   ========================================================================== */

function enviarWhatsApp() {
    // 1. Captura de Dados dos Macros
    const nome = document.getElementById('user_name')?.value || "Estrela";
    const idade = document.getElementById('age')?.value || "--";
    const calorias = document.getElementById('targetCaloriesDisplay')?.textContent || "0";
    const p = document.getElementById('proteinGrams')?.textContent || "0g";
    const c = document.getElementById('carbGrams')?.textContent || "0g";
    const g = document.getElementById('fatGrams')?.textContent || "0g";
    
    // 2. Captura de Dados de Outras Calculadoras (Opcionais)
    const agua = document.getElementById('waterLitersDisplay')?.textContent || "--";
    const corrida = document.getElementById('distanceDisplay')?.textContent || "--";
    
    const selectGoal = document.getElementById('goal');
    const objetivo = selectGoal ? selectGoal.options[selectGoal.selectedIndex].text : "--";

    // 3. Montagem da Mensagem Estilizada
    let msg = `⭐ *OII ${nome.toUpperCase()}! AQUI É A STAR MEIRELLES!* ⭐\n\n`;
    msg += `Fico feliz que usou minha tecnologia da *DreamTech* para facilitar sua evolução. Aqui está o resumo do seu plano personalizado:\n\n`;
    
    msg += `🎯 *OBJETIVO:* ${objetivo}\n`;
    msg += `👤 *IDADE:* ${idade} anos\n\n`;
    
    msg += `🔥 *CALORIAS DIÁRIAS:* ${calorias} kcal\n`;
    msg += `📊 *MACROS DIÁRIOS:*\n`;
    msg += `🥩 *Proteína:* ${p}\n`;
    msg += `🥖 *Carboidrato:* ${c}\n`;
    msg += `🥑 *Gordura:* ${g}\n\n`;
    
    if (agua !== "--") msg += `💧 *Meta de Água:* ${agua} Litros\n`;
    if (corrida !== "--") msg += `🏃 *Meta de Corrida:* ${corrida} km\n\n`;
    
    msg += `✨ _"Não pare até se orgulhar de você!"_\n\n`;
    msg += `📸 *Insta:* https://www.instagram.com/starmeirelles/\n\n`;
    msg += `⚠️ *AVISO:* Simulação educacional da DreamTech.`;

    // 4. Disparo do WhatsApp
    window.open(`https://api.whatsapp.com/send?text=${encodeURIComponent(msg)}`, '_blank');
}


// Garante que o botão só seja ativado após o HTML carregar
window.addEventListener('load', () => {
    const btn = document.getElementById('whatsappBtn');
    if (btn) {
        btn.onclick = function(e) {
            e.preventDefault();
            enviarWhatsApp(); // Chama a função que gera a mensagem
        };
    }
});