/* ==========================================================================
   DREAMTECH - MÓDULO PAYMENT BRICKS (V2.6.6) - STAR MEIRELLES
   DESENVOLVEDOR: Rodrigo (DreamTech Corp)
   FUNÇÃO: Fix Erro 422 (Debelo) + Anti-Email + Injeção Superior
   INTEGRIDADE: Arquivo completo sem abreviações ou resumos.
   ========================================================================== */

// 1. Inicialização do SDK do Mercado Pago com Credenciais de Produção
const mp = new MercadoPago('APP_USR-3f1016f6-2e40-4ee1-8141-de05a91a86b8');
const bricksBuilder = mp.bricks();

// 2. Conexão com o Firebase Firestore (Instância BioCode)
var db = firebase.firestore(window.firebaseAppBioCode);

/**
 * Função Master: Renderiza o componente de pagamento dentro do Dashboard.
 * Acionada após o preenchimento da calculadora de dieta.
 */
async function renderPaymentBrick() {
    console.log("DreamTech Engine: Iniciando renderização do Payment Brick...");

    // Captura de Dados do Formulário para Pré-preenchimento
    const nome = document.getElementById('user_name')?.value;
    const email = document.getElementById('user_email')?.value;
    const cpfRaw = document.getElementById('user_cpf')?.value;
    const cpf = cpfRaw?.replace(/\D/g, ''); // Limpeza de caracteres não numéricos

    // Validação de Integridade de Dados antes de abrir o Checkout
    if (!nome || !email || !cpf || cpf.length !== 11) {
        alert("🚨 Rodrigo, erro de integridade: Nome, E-mail ou CPF ausentes!");
        console.error("Erro: Dados do formulário incompletos para o Brick.");
        return;
    }

    // Limpeza de Segurança: Evita duplicidade de frames no DOM
    const container = document.getElementById('paymentBrick_container');
    if (container) {
        container.innerHTML = "";
    }

    // Configurações Globais do Bricks Builder
    const settings = {
        initialization: {
            amount: 39.99, // Valor base inicial (Oferta Pix)
            payer: {
                firstName: nome.split(" ")[0],
                email: email, // Injeta o e-mail automaticamente
                entityType: 'individual', 
                identification: { type: 'CPF', number: cpf },
            },
        },
        customization: {
            visual: {
                hideStatusDetails: true,
                hidePaymentButton: false,
                hidePayerEmail: true, // 👈 REMOVE O CAMPO DE E-MAIL DO MERCADO PAGO
                theme: 'bootstrap', // Design profissional quadrado (Sem lacunas ovais)
                style: {
                    theme: 'default', // Mantém as cores padrão para confiabilidade
                }
            },
            paymentMethods: {
                creditCard: 'all',
                // FIX ERRO 422: Voltamos para 'all' no débito para evitar erro de inicialização,
                // mas usaremos o CSS para esconder o logo da Caixa se necessário.
                debitCard: 'all', 
                bankTransfer: ['pix'],
                // Removido maxInstallments global para evitar conflito com Pix
            },
        },
        callbacks: {
            onReady: () => {
                console.log("Brick Status: Ativo e pronto para uso.");
                // Scroll suave para focar o usuário no pagamento
                document.getElementById('paymentBrick_container').scrollIntoView({ behavior: 'smooth' });
            },
            onSubmit: ({ selectedPaymentMethod, formData }) => {
                console.log("DreamTech: Iniciando processamento de método: " + selectedPaymentMethod);

                // ESTRATÉGIA DE ANCORAGEM: Ajuste de preço dinâmico no momento do submit
                if (selectedPaymentMethod === 'credit_card' || selectedPaymentMethod === 'debit_card') {
                    formData.transaction_amount = 55.99; // Valor real (Com taxas inclusas)
                } else {
                    formData.transaction_amount = 39.99; // Valor promocional (Pix direto)
                }

                // Injeção de metadados para rastreio no Firestore e Webhook
                formData.cpf_usuario = cpf;
                formData.metadata = {
                    nome_cliente: nome,
                    origem: "BioCode_StarMeirelles",
                    versao_engine: "2.6.6"
                };

                return processarPagamentoBrick(formData, cpf);
            },
            onError: (error) => {
                console.error("Erro Crítico no Brick:", error);
                // Tratamento silencioso para evitar sustos no usuário final
            },
        },
    };

    // Criação da Instância e atribuição ao controlador global
    window.paymentBrickController = await bricksBuilder.create(
        'payment',
        'paymentBrick_container',
        settings
    );
}

/**
 * Ponte entre o Front-end e a Cloud Function (Backend).
 * Gerencia a injeção do QR Code na janela superior.
 */
async function processarPagamentoBrick(formData, cpf) {
    const urlApi = "https://us-central1-database-biocode.cloudfunctions.net/gerarPixBioCode";

    try {
        const response = await fetch(urlApi, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(formData),
        });

        const data = await response.json();

        if (data.sucesso) {
            console.log("Servidor DreamTech: Pagamento registrado com ID " + (data.id || "Pix"));
            
            // Inicia o monitoramento em tempo real no Firestore
            monitorarPagamento(cpf);
            
            // LÓGICA DE EXIBIÇÃO IMEDIATA (PIX) NA JANELA SUPERIOR
            if (formData.payment_method_id === 'pix') {
                const brickArea = document.getElementById('paymentBrick_container');
                const pixTemplate = document.getElementById('pix_container');

                if (brickArea && pixTemplate) {
                    // MÁGICA DREAMTECH: Substitui o conteúdo da janela de cima pelo template do Pix
                    brickArea.innerHTML = pixTemplate.innerHTML;
                    brickArea.classList.remove('hidden');

                    const qrcodeArea = brickArea.querySelector('#qrcode_placeholder');
                    const inputCopiaCola = brickArea.querySelector('#pix_code_input');

                    // Renderiza o QR Code (Base64) vindo da Cloud Function
                    if (qrcodeArea && data.qrCodeBase64) {
                        qrcodeArea.innerHTML = `
                            <div class="flex flex-col items-center animate-fade-in">
                                <img src="data:image/png;base64,${data.qrCodeBase64}" class="rounded-2xl shadow-2xl border-4 border-white max-h-64 mb-4">
                                <span class="text-[10px] text-gray-400 font-bold uppercase text-center">Escaneie para Liberar Agora</span>
                            </div>
                        `;
                    }

                    // Alimenta o campo Copia e Cola
                    if (inputCopiaCola) {
                        inputCopiaCola.value = data.pixCopiaECola;
                    }

                    // Remove o container de baixo para não ficar duplicado
                    pixTemplate.remove();
                }
                
                alert("💠 QR Code gerado! Realize o pagamento para destravar sua dieta.");
            } else {
                // Fluxo de Cartão de Crédito
                alert("💳 Cartão enviado! Seu protocolo será liberado assim que o banco confirmar.");
            }
        } else {
            console.error("Erro no Processamento:", data.detalhes);
            alert("❌ Erro: " + (data.detalhes || "Falha na comunicação com Mercado Pago."));
        }
    } catch (e) {
        console.error("Erro Fatal Fetch:", e);
        alert("Erro de conexão: Verifique sua internet ou o status do servidor DreamTech.");
    }
}

/**
 * Escuta mudanças no Firestore para liberação automática sem refresh.
 */
function monitorarPagamento(cpf) {
    console.log("Monitorando aprovação para o CPF: " + cpf);
    let primeiraLeitura = true;

    db.collection("pagamentos").doc(cpf).onSnapshot((doc) => {
        if (doc.exists) {
            const status = doc.data().status;
            
            // Proteção contra cache: Ignora o status 'approved' se ele já estava lá
            if (primeiraLeitura && (status === "approved" || status === "PAGO")) {
                primeiraLeitura = false; 
                return;
            }

            // Destrava a interface se o status mudar para aprovado
            if (status === "approved" || status === "PAGO" || status === "RECEIVED") {
                destravarInterface();
            }
        }
        primeiraLeitura = false;
    });
}

/**
 * Função de Desbloqueio Master (UX/UI).
 */
function destravarInterface() {
    window.modoAdminLiberado = true;
    
    // Adiciona classe de liberação ao corpo principal
    const mainElement = document.querySelector('main');
    if (mainElement) {
        mainElement.classList.add('liberado');
    }
    
    // Remove o banner de venda de forma permanente
    const banner = document.getElementById('banner_compra');
    if (banner) {
        banner.style.transition = "opacity 0.5s ease";
        banner.style.opacity = "0";
        setTimeout(() => banner.remove(), 500);
    }

    // Libera os botões de ação (WhatsApp e Impressão)
    const actionButtons = document.getElementById('action_buttons');
    if (actionButtons) {
        actionButtons.classList.remove('hidden');
        actionButtons.style.setProperty('display', 'flex', 'important');
    }

    // Remove filtros de desfoque das tabelas nutricionais
    document.querySelectorAll('.trava-biocode').forEach(item => {
        item.classList.remove('blur-[5px]', 'select-none', 'opacity-80', 'pointer-events-none');
        item.style.filter = 'none';
        item.style.opacity = '1';
        item.style.pointerEvents = 'auto';
    });

    // Recalcula os macros para garantir valores finais
    if (typeof calculateMacros === "function") {
        calculateMacros();
    }

    console.log("BioCode Destravado com Sucesso.");
    alert("✅ ACESSO LIBERADO! ✨ O Protocolo das Estrelas da Star Meirelles está pronto para você!");
}

// Globalização das funções para acesso via Dashboard/Macro
window.renderPaymentBrick = renderPaymentBrick;
window.destravarInterface = destravarInterface;

/* ==========================================================================
   FIM DO MÓDULO PIX.JS - DREAMTECH CORP 2026
   ESTE ARQUIVO POSSUI TODA A LÓGICA DE SEGURANÇA E UX REQUISITADA.
   ========================================================================== */