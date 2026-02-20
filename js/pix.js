/* ==========================================================================
   DREAMTECH - MÓDULO DE PAGAMENTO E MONITORAMENTO (VERSÃO MOBILE OK)
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
var db= firebase.firestore(window.firebaseAppBioCode);

async function irParaPagamento() {
    const urlApi = "https://us-central1-database-biocode.cloudfunctions.net/gerarPixBioCode";
    const nome = document.getElementById('user_name')?.value;
    const email = document.getElementById('user_email')?.value;
    const cpfRaw = document.getElementById('user_cpf')?.value;
    const cpf = cpfRaw?.replace(/\D/g, '');

    if (!nome || !email || !cpf) {
        alert("🚨 Preencha Nome, E-mail e CPF para liberar seu acesso!");
        return;
    }

    // RESOLUÇÃO PARA CELULAR: Abre a janela IMEDIATAMENTE antes do fetch
    const win = window.open("", "Pagamento_BioCode", "width=450,height=700");
    if (!win) {
        alert("⚠️ Por favor, libere os pop-ups do seu navegador para ver o QR Code!");
        return;
    }
    // Tela de carregamento dentro da janelinha
    win.document.write('<body style="background:#0f172a; color:white; text-align:center; padding-top:50px; font-family:sans-serif;"><h3>⏳ Gerando seu QR Code...</h3></body>');

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
            // Atualiza a janela que já estava aberta com o QR Code e as cores do BIOCODE
            win.document.body.innerHTML = `
                <div style="font-family:sans-serif; text-align:center; padding:20px; background:#0f172a; color:white; min-height:100vh;">
                    <h2 style="color:#22c55e;">BIOCODE PIX ⚡</h2>
                    <p style="font-size:14px;">Escaneie o código abaixo:</p>
                    <img src="data:image/png;base64,${data.qrCodeBase64}" style="width:250px; border: 5px solid white; border-radius:15px; margin:15px 0;">
                    <p style="font-size:12px; color:#94a3b8;">Código Copia e Cola:</p>
                    <textarea readonly style="width:100%; height:80px; background:#1e293b; color:#22c55e; border:1px solid #334155; border-radius:8px; padding:10px; font-size:11px; margin-bottom:15px;">${data.pixCopiaECola}</textarea>
                    <div style="background:#22c55e; color:#064e3b; padding:10px; border-radius:8px; font-weight:bold; font-size:13px;">
                        Pague agora para liberar o acesso automaticamente!
                    </div>
                </div>
            `;
            monitorarPagamento(cpf, win);
        } else {
            win.close();
            alert("Erro no servidor: " + data.detalhes);
        }
    } catch (e) {
        win.close();
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

function monitorarPagamento(cpf, janelaPix) {
    // Escuta em tempo real o documento do pagamento pelo CPF
    db.collection("pagamentos").doc(cpf).onSnapshot((doc) => {
        if (doc.exists) {
            const dados = doc.data();
            console.log("Status atual:", dados.status); // Útil para debugar

            if (dados.status === "PAGO") {
                console.log("Pagamento confirmado! Destravando...");
                
                // Tenta fechar a janela do QR Code
                if (janelaPix && !janelaPix.closed) {
                    janelaPix.close();
                }

                // Chama a função para liberar os macros no site principal
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

    if (typeof calculateMacros === "function") {
        calculateMacros();
    } else if (window.macrosIniciais) {
        document.getElementById('proteinGrams').innerText = Math.round(window.macrosIniciais.p) + "g";
        document.getElementById('carbGrams').innerText = Math.round(window.macrosIniciais.c) + "g";
        document.getElementById('fatGrams').innerText = Math.round(window.macrosIniciais.f) + "g";
    }

    document.querySelectorAll('.blur-\\[5px\\]').forEach(item => {
        item.classList.remove('blur-[5px]', 'select-none', 'opacity-80', 'pointer-events-none');
    });

    alert("✅ BIOCODE LIBERADO! ✨");
}
