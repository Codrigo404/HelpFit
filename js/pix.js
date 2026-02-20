/* ==========================================================================
   DREAMTECH - MÓDULO DE PAGAMENTO E MONITORAMENTO (VERSÃO MODAL BIOCODE)
   ========================================================================== */

if (!window.firebaseAppBioCode) {
    var firebaseConfigBioCode = {
        apiKey: "AIzaSyBDvHrkCyIWirWDorgTxGWyycWecqEnZT4",
        authDomain: "database-biocode.firebaseapp.com",
        projectId: "database-biocode",
        storageBucket: "database-biocode.firebasestorage.app",
        messagingSenderId: "153606225851",
        appId: "1:153606225851:web:f4700f168f70d0e8914e9e"
    };
    window.firebaseAppBioCode = firebase.initializeApp(firebaseConfigBioCode, "BioCodeApp");
}
// Padronizado para usar a variável 'db' conforme definido no seu HTML
var db = firebase.firestore(window.firebaseAppBioCode);

async function irParaPagamento() {
    const urlApi = "https://us-central1-database-biocode.cloudfunctions.net/gerarPixBioCode";
    const nome = document.getElementById('user_name')?.value;
    const email = document.getElementById('user_email')?.value;
    const cpfRaw = document.getElementById('user_cpf')?.value;
    const cpf = cpfRaw?.replace(/\D/g, '');

    if (!nome || !email || !cpf || cpf.length !== 11) {
        alert("🚨 Rodrigo, preencha Nome, E-mail e um CPF válido para liberar seu acesso!");
        return;
    }

    // Gerenciamento do Modal (Captura os IDs que você colocou no HTML)
    const modal = document.getElementById('modalPix');
    const loading = document.getElementById('loadingPix');
    const conteudo = document.getElementById('conteudoPix');
    
    // Abre o modal e mostra o carregamento
    modal.classList.remove('hidden');
    loading.classList.remove('hidden');
    conteudo.classList.add('hidden');

    window.cpfAtual = cpf;
    const btnCompra = document.getElementById('btn_comprar_agora');
    
    if (btnCompra) {
        btnCompra.innerHTML = "⏳ PROCESSANDO...";
        btnCompra.style.opacity = "0.7";
        btnCompra.style.pointerEvents = "none";
    }

    try {
        const response = await fetch(urlApi, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ nome, email, cpf, valor: 24.99 })
        });
        const data = await response.json();

        if (data.sucesso) {
            // Preenche o Modal com o QR Code e o código Copia e Cola
            document.getElementById('imgQrCode').src = `data:image/png;base64,${data.qrCodeBase64}`;
            document.getElementById('textoCopiaCola').value = data.pixCopiaECola;

            // Esconde o loading e mostra o QR Code gerado
            loading.classList.add('hidden');
            conteudo.classList.remove('hidden');

            // Inicia o monitoramento em tempo real
            monitorarPagamento(cpf);
        } else {
            modal.classList.add('hidden');
            alert("Erro no servidor: " + data.detalhes);
        }
    } catch (e) {
        modal.classList.add('hidden');
        console.error(e);
        alert("Erro de conexão. Verifique sua internet.");
    } finally {
        if (btnCompra) {
            btnCompra.innerHTML = "⚡ Destravar Meu Protocolo Agora";
            btnCompra.style.opacity = "1";
            btnCompra.style.pointerEvents = "auto";
        }
    }
}

function monitorarPagamento(cpf) {
    // Escuta em tempo real o status do pagamento no banco de dados
    db.collection("pagamentos").doc(cpf).onSnapshot((doc) => {
        if (doc.exists) {
            const status = doc.data().status;
            
            // Aceita os status comuns de confirmação do Asaas
            if (status === "PAGO" || status === "RECEIVED" || status === "CONFIRMED") {
                // Fecha o modal automaticamente
                document.getElementById('modalPix').classList.add('hidden');
                
                // Libera a interface
                destravarInterface();
            }
        }
    }, (error) => {
        console.error("Erro na escuta do Firebase:", error);
    });
}

function destravarInterface() {
    window.modoAdminLiberado = true;
    const banner = document.getElementById('banner_compra');
    if (banner) banner.style.display = 'none';

    const actionButtons = document.getElementById('action_buttons');
    if (actionButtons) actionButtons.classList.remove('hidden');

    // Força o recálculo dos macros para remover os cadeados 🔒
    if (typeof calculateMacros === "function") {
        calculateMacros();
    }

    // Remove os efeitos de desfoque das listas de alimentos
    document.querySelectorAll('.blur-\\[5px\\]').forEach(item => {
        item.classList.remove('blur-[5px]', 'select-none', 'opacity-80', 'pointer-events-none');
    });

    alert("✅ BIOCODE LIBERADO! ✨");
}

// Torna a função global para que o onclick do botão funcione
window.irParaPagamento = irParaPagamento;