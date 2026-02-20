/* ==========================================================================
   DREAMTECH - MÓDULO DE PAGAMENTO E MONITORAMENTO (VERSÃO FINAL)
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
var dbBioCode = firebase.firestore(window.firebaseAppBioCode);

async function irParaPagamento() {
    const urlApi = "https://us-central1-database-biocode.cloudfunctions.net/gerarPixBioCode";
    const nome = document.getElementById('user_name')?.value;
    const email = document.getElementById('user_email')?.value;
    const cpfRaw = document.getElementById('user_cpf')?.value;
    const cpf = cpfRaw?.replace(/\D/g, '');

    if (!nome || !email || !cpf) {
        alert("🚨 Estrela, preencha Nome, E-mail e CPF para liberar o protocolo!");
        return;
    }

    window.cpfAtual = cpf;
    const btnCompra = document.getElementById('btn_comprar_agora');
    if (btnCompra) {
        btnCompra.innerHTML = "⏳ GERANDO PIX...";
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
            const win = window.open("", "Pagamento BioCode", "width=450,height=700");
            if (!win) {
                alert("⚠️ Libere os pop-ups para ver o QR Code!");
                return;
            }
            win.document.write(`
                <body style="font-family:sans-serif; text-align:center; padding:30px; background:#fff5f7;">
                    <h2 style="color:#7c3aed;">QR Code Gerado! 🌟</h2>
                    <img src="data:image/png;base64,${data.qrCodeBase64}" style="width:250px; border-radius:15px;">
                    <p style="font-size:12px; color:#666;">Copia e Cola:</p>
                    <textarea readonly style="width:100%; height:60px;">${data.pixCopiaECola}</textarea>
                    <p style="color:#d946ef; font-weight:bold;">O plano liberará automaticamente após o pagamento!</p>
                </body>
            `);
            monitorarPagamento(cpf, win);
        } else {
            alert("Erro: " + data.detalhes);
        }
    } catch (e) {
        console.error(e);
        alert("Erro na conexão com o servidor.");
    } finally {
        if (btnCompra) {
            btnCompra.innerHTML = "⚡ Destravar Meu Protocolo Agora";
            btnCompra.style.opacity = "1";
            btnCompra.style.pointerEvents = "auto";
        }
    }
}

function monitorarPagamento(cpf, janelaPix) {
    dbBioCode.collection("pagamentos").doc(cpf).onSnapshot((doc) => {
        if (doc.exists && doc.data().status === "PAGO") {
            if (janelaPix) janelaPix.close();
            destravarInterface();
        }
    });
}

// --- DESTRAVAR INTERFACE (AJUSTADO) ---
function destravarInterface() {
    // 1. AVISO GLOBAL: Libera a trava para o macro.js enxergar
    window.modoAdminLiberado = true;

    const banner = document.getElementById('banner_compra');
    if (banner) banner.style.display = 'none';

    const actionButtons = document.getElementById('action_buttons');
    if (actionButtons) actionButtons.classList.remove('hidden');

    // 2. FORÇA O RECÁLCULO: Faz o macro.js trocar o 🔒 pelos números reais
    if (typeof calculateMacros === "function") {
        calculateMacros();
    } else if (window.macrosIniciais) {
        // Backup caso o calculateMacros não responda
        document.getElementById('proteinGrams').innerText = Math.round(window.macrosIniciais.p) + "g";
        document.getElementById('carbGrams').innerText = Math.round(window.macrosIniciais.c) + "g";
        document.getElementById('fatGrams').innerText = Math.round(window.macrosIniciais.f) + "g";
    }

    // 3. LIMPA O VISUAL
    document.querySelectorAll('.blur-\\[5px\\]').forEach(item => {
        item.classList.remove('blur-[5px]', 'select-none', 'opacity-80', 'pointer-events-none');
    });

    alert("✅ Protocolo Liberado! ✨");
}

async function queimarTicket(acao) {
    if (!confirm("⚠️ Deseja finalizar sua sessão?")) return;
    if (acao === 'whatsapp' && typeof enviarWhatsApp === "function") {
        enviarWhatsApp();
    } else if (acao === 'imprimir') {
        window.print();
    }
    if (window.cpfAtual) {
        try {
            await dbBioCode.collection("pagamentos").doc(window.cpfAtual).update({ status: "USADO" });
            localStorage.setItem(`respawn_${window.cpfAtual}`, Date.now());
            setTimeout(() => { window.location.reload(); }, 2000);
        } catch (err) {
            console.error("Erro ao queimar ticket", err);
        }
    }
}