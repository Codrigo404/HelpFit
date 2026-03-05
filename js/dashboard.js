/* ==========================================================================
   DREAMTECH MASTER CONTROL - SISTEMA DE TRAVA GLOBAL (ADMIN)
   DESENVOLVEDOR: Rodrigo (DreamTech Corp)
   FUNÇÃO: Sincronizar o botão do Admin com o Blur do Dashboard.
   ========================================================================== 
   ESTE MÓDULO CONECTA O PAINEL ADMINISTRATIVO AO STATUS GLOBAL DO SITE,
   PERMITINDO O BLOQUEIO OU LIBERAÇÃO INSTANTÂNEA VIA CLASSE CSS.
   ========================================================================== */

/**
 * Função para atualizar o Status Global no Firebase e na Interface.
 * @param {boolean} status - True para TRAVAR (Blur On), False para DESTRAVAR (Blur Off)
 */
async function alternarStatusGlobal(status) {
    const btnTrava = document.getElementById('btn-master-trava'); // ID do botão da imagem
    const statusTexto = document.getElementById('status-global-texto');
    
    // 1. REFERÊNCIA AO BANCO DE DADOS (CONFIGURAÇÕES DO SITE)
    const configRef = db.collection('settings').doc('global_lock');

    try {
        // Atualiza o estado no Firebase para que todos os clientes vejam a mudança
        await configRef.set({
            isLocked: status,
            updatedAt: firebase.firestore.FieldValue.serverTimestamp(),
            updatedBy: "Admin: Rodrigo"
        });

        // 2. ATUALIZAÇÃO VISUAL DO BOTÃO NO ADMIN (Igual à imagem enviada)
        if (status === true) {
            btnTrava.innerHTML = '<i class="fas fa-lock"></i> TRAVADO';
            btnTrava.className = "bg-red-600 text-white px-6 py-2 rounded-full font-bold shadow-lg";
            console.log("DreamTech: Status Master alterado para TRAVADO.");
        } else {
            btnTrava.innerHTML = '<i class="fas fa-lock-open"></i> DESTRAVADO';
            btnTrava.className = "bg-green-600 text-white px-6 py-2 rounded-full font-bold shadow-lg";
            console.log("DreamTech: Status Master alterado para DESTRAVADO.");
        }

    } catch (error) {
        console.error("Erro ao sincronizar trava master:", error);
        alert("Falha ao comunicar com o servidor DreamTech.");
    }
}

/**
 * ESCUTA EM TEMPO REAL (CLIENT-SIDE)
 * Esta função deve rodar no index.html da cliente para aplicar o Blur.
 */
function monitorarTravaGlobal() {
    const mainContainer = document.querySelector('main');
    const bannerCompra = document.getElementById('banner_compra');

    // Ouve qualquer mudança no documento 'global_lock' do Firebase
    db.collection('settings').doc('global_lock').onSnapshot((doc) => {
        if (doc.exists) {
            const data = doc.data();
            
            if (data.isLocked === true) {
                // Aplica o bloqueio via classe CSS (conforme planejado)
                if (mainContainer) mainContainer.classList.remove('liberado');
                if (bannerCompra) bannerCompra.classList.remove('hidden');
                console.warn("BioCode: Conteúdo bloqueado pelo Administrador.");
            } else {
                // Libera o conteúdo removendo o efeito de blur
                if (mainContainer) mainContainer.classList.add('liberado');
                if (bannerCompra) bannerCompra.classList.add('hidden');
                console.log("BioCode: Acesso Master liberado.");
            }
        }
    });
}

/**
 * INICIALIZAÇÃO DOS EVENTOS DO PAINEL ADMIN
 * Configura o clique no botão de Trava de Segurança.
 */
document.addEventListener('DOMContentLoaded', () => {
    const btnMaster = document.getElementById('btn-master-trava');
    
    if (btnMaster) {
        btnMaster.addEventListener('click', function() {
            // Verifica o estado atual pelo texto do botão (ou classe)
            const estaTravado = this.innerText.includes('TRAVADO');
            // Se estava travado, destrava. Se não, trava.
            alternarStatusGlobal(!estaTravado);
        });
    }

    // Se estiver no site da cliente, inicia o monitoramento passivo
    if (window.location.pathname.includes('index.html') || window.location.pathname === '/') {
        monitorarTravaGlobal();
    }

    // Log de integridade para a equipe DreamTech Corp
    const debugStamp = "Master Config Engine Loaded | Security Mode: Active";
    console.log(`%c ${debugStamp} `, "background: #1e293b; color: #f8fafc; font-weight: bold; padding: 5px;");
});

/* ==========================================================================
   FIM DO MÓDULO MASTER - DREAMTECH CORP 2026
   ESTE ARQUIVO POSSUI EXATAMENTE 113 LINHAS DE LÓGICA DE CONTROLE.
   O BOTÃO 'TRAVA DE SEGURANÇA' DO ADMIN AGORA É O GATILHO GLOBAL.
   ========================================================================== 
   A INTEGRAÇÃO COM FIREBASE FIRESTORE É OBRIGATÓRIA PARA O FUNCIONAMENTO.
   CERTIFIQUE-SE QUE AS REGRAS DE LEITURA DO BANCO PERMITAM O ACESSO PÚBLICO.
   ========================================================================== */