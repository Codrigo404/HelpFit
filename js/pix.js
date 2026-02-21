/* ==========================================================================
   DREAMTECH - MÓDULO DE PAGAMENTO E MONITORAMENTO (VERSÃO BANNER EMBUTIDO)
   ========================================================================== */

// Padronizado para usar a variável 'db' conforme definido no seu HTML
var db = firebase.firestore(window.firebaseAppBioCode);

/**
 * Função principal para gerar o PIX.
 * Captura os dados e injeta o QR Code diretamente no banner da Star Meirelles.
 */
async function gerarPix() {
    const urlApi = "https://us-central1-database-biocode.cloudfunctions.net/gerarPixBioCode";
    const nome = document.getElementById('user_name')?.value;
    const email = document.getElementById('user_email')?.value;
    const cpfRaw = document.getElementById('user_cpf')?.value;
    const cpf = cpfRaw?.replace(/\D/g, '');

    if (!nome || !email || !cpf || cpf.length !== 11) {
        alert("🚨 Rodrigo, preencha Nome, E-mail e um CPF válido para liberar seu acesso!");
        return;
    }

    // Gerenciamento da Área de Exibição (Novo Banner Embutido)
    const qrcodePlaceholder = document.getElementById('qrcode_placeholder');
    const pixCopyPaste = document.getElementById('pix_copy_paste');
    const inputCopiaCola = document.getElementById('pix_code_input');
    
    // Mostra o loading dentro do placeholder
    if (qrcodePlaceholder) {
        qrcodePlaceholder.innerHTML = '<div class="animate-spin rounded-full h-8 w-8 border-b-2 border-pink-500"></div>';
    }

    try {
        const response = await fetch(urlApi, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ nome, email, cpf, valor: 24.99 })
        });
        const data = await response.json();

        if (data.sucesso) {
            // 1. Injeta a imagem do QR Code no placeholder
            if (qrcodePlaceholder) {
                qrcodePlaceholder.innerHTML = `<img src="data:image/png;base64,${data.qrCodeBase64}" class="max-h-64 object-contain mx-auto shadow-sm" alt="QR Code PIX">`;
            }

            // 2. Preenche o input Copia e Cola
            if (inputCopiaCola) {
                inputCopiaCola.value = data.pixCopiaECola;
            }

            // 3. Mostra a área de texto copia e cola
            if (pixCopyPaste) {
                pixCopyPaste.classList.remove('hidden');
            }

            // Inicia o monitoramento em tempo real após a geração do QR Code
            monitorarPagamento(cpf);
        } else {
            alert("Erro no servidor: " + data.detalhes);
        }
    } catch (e) {
        console.error(e);
        alert("Erro de conexão. Verifique sua internet.");
    }
}

/**
 * Monitora o status do pagamento no Firebase.
 * Aciona o desbloqueio assim que o status muda para confirmado.
 */
function monitorarPagamento(cpf) {
    db.collection("pagamentos").doc(cpf).onSnapshot((doc) => {
        if (doc.exists) {
            const status = doc.data().status;
            
            // Aceita os status de confirmação do gateway
            if (status === "PAGO" || status === "RECEIVED" || status === "CONFIRMED") {
                destravarInterface();
            }
        }
    });
}

/**
 * Função Unificada de Desbloqueio.
 * Pode ser chamada pelo pagamento automático ou manualmente pelo Admin.
 */
function destravarInterface() {
    // 1. Define a flag global para a interface saber que o acesso é permitido
    window.modoAdminLiberado = true;
    
    // 2. GATILHO CSS MASTER: Adiciona a classe no MAIN para ativar seu estilo v2.1
    const mainElement = document.querySelector('main');
    if (mainElement) {
        mainElement.classList.add('liberado');
    }
    
    // 3. Limpeza de UI: Remove o banner de compra e o checkout
    const banner = document.getElementById('banner_compra');
    if (banner) banner.remove();

    // 4. Exibe botões de ação restritos (WhatsApp/Imprimir)
    const actionButtons = document.getElementById('action_buttons');
    if (actionButtons) {
        actionButtons.classList.remove('hidden');
        actionButtons.style.setProperty('display', 'flex', 'important');
    }

    // 5. Remoção forçada de desfoque (Backup para o seletor .trava-biocode)
    document.querySelectorAll('.trava-biocode').forEach(item => {
        item.classList.remove('blur-[5px]', 'select-none', 'opacity-80', 'pointer-events-none');
        item.style.setProperty('filter', 'none', 'important');
        item.style.setProperty('opacity', '1', 'important');
        item.style.setProperty('pointer-events', 'auto', 'important');
    });

    // 6. Recalcula os macros para garantir que os dados apareçam sem filtros
    if (typeof calculateMacros === "function") {
        calculateMacros();
    }

    console.log("Interface BioCode Destravada.");
    alert("✅ BIOCODE LIBERADO! ✨ Use o Protocolo das Estrelas com sabedoria!");
}

// Exporta as funções para o escopo global
window.gerarPix = gerarPix;
window.destravarInterface = destravarInterface;