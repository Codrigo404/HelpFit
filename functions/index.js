const { onRequest } = require("firebase-functions/v2/https");
const { initializeApp } = require("firebase-admin/app");
const { getFirestore } = require("firebase-admin/firestore");
const { MercadoPagoConfig, Payment } = require('mercadopago');
const cors = require("cors")({ origin: true });

// Inicializa o Firebase Admin
initializeApp();
const db = getFirestore();

/* ============================================================
   1. GERAR PAGAMENTO (PIX OU CARTÃO - BIOCODE 2.5)
   ============================================================ */
exports.gerarPixBioCode = onRequest({ 
    secrets: ["MERCADOPAGO_ACCESS_TOKEN"] 
}, async (req, res) => {
    cors(req, res, async () => {
        if (req.method !== "POST") return res.status(405).send("Use POST.");

        // Captura o formData enviado pelo Payment Brick
        const { token, issuer_id, payment_method_id, transaction_amount, payer, metadata, cpf_usuario } = req.body;

        const client = new MercadoPagoConfig({ 
            accessToken: process.env.MERCADOPAGO_ACCESS_TOKEN 
        });
        const payment = new Payment(client);

        try {
            // SEGURANÇA: Garante que o CPF esteja limpo
            const cpfLimpo = (cpf_usuario || payer?.identification?.number || "").replace(/\D/g, '');
            
            // SEGURANÇA: Evita o erro de 'split' se o nome vier indefinido
            const nomeCompleto = metadata?.nome_cliente || "Cliente BioCode";
            const partesNome = nomeCompleto.trim().split(" ");
            const primeiroNome = partesNome[0];
            const sobrenome = partesNome.length > 1 ? partesNome.slice(1).join(" ") : "BioCode";

            const body = {
                transaction_amount: transaction_amount,
                description: `BioCode Protocolo - ${nomeCompleto}`,
                payment_method_id: payment_method_id,
                token: token, 
                issuer_id: issuer_id, 
                payer: {
                    email: payer.email,
                    first_name: primeiroNome,
                    last_name: sobrenome,
                    identification: {
                        type: 'CPF',
                        number: cpfLimpo
                    }
                },
                metadata: {
                    cpf_cliente: cpfLimpo,
                    nome_cliente: nomeCompleto
                },
                notification_url: "https://us-central1-database-biocode.cloudfunctions.net/mpWebhook" 
            };

            const response = await payment.create({ body });

            // SALVAR NO FIRESTORE
            await db.collection("pagamentos").doc(cpfLimpo).set({
                nome: nomeCompleto,
                email: payer.email,
                pagamentoId: response.id.toString(),
                status: response.status === 'approved' ? 'approved' : 'pending',
                metodo: payment_method_id,
                valor: transaction_amount,
                dataCriacao: new Date().toISOString()
            });

            const respostaFinal = {
                sucesso: true,
                status: response.status,
                id: response.id
            };

            if (payment_method_id === 'pix') {
                respostaFinal.pixCopiaECola = response.point_of_interaction.transaction_data.qr_code;
                respostaFinal.qrCodeBase64 = response.point_of_interaction.transaction_data.qr_code_base64;
            }

            res.status(200).json(respostaFinal);

        } catch (error) {
            console.error("Erro DreamTech Engine:", error);
            res.status(500).json({ sucesso: false, detalhes: error.message });
        }
    });
});

/* ============================================================
   2. WEBHOOK (ATUALIZA STATUS EM TEMPO REAL)
   ============================================================ */
exports.mpWebhook = onRequest({ 
    secrets: ["MERCADOPAGO_ACCESS_TOKEN"] 
}, async (req, res) => {
    const { action, data, type } = req.body;

    if (type === "payment" || action?.includes("payment")) {
        const paymentId = data?.id || req.body.resource?.split('/').pop();

        try {
            const client = new MercadoPagoConfig({ accessToken: process.env.MERCADOPAGO_ACCESS_TOKEN });
            const payment = new Payment(client);
            
            const paymentInfo = await payment.get({ id: paymentId });
            
            if (paymentInfo.status === "approved") {
                const snapshot = await db.collection("pagamentos").where("pagamentoId", "==", paymentId.toString()).get();
                
                if (!snapshot.empty) {
                    const docId = snapshot.docs[0].id;
                    await db.collection("pagamentos").doc(docId).update({ 
                        status: "approved",
                        dataAprovacao: new Date().toISOString()
                    });
                }
            }
        } catch (err) {
            console.error("Erro no Webhook:", err);
        }
    }
    res.status(200).send("OK");
});

/* ============================================================
   3. QUEIMAR TICKET (SEGURANÇA DREAMTECH)
   ============================================================ */
exports.queimarTicketBioCode = onRequest(async (req, res) => {
    cors(req, res, async () => {
        const { cpf } = req.body;
        if (!cpf) return res.status(400).send("CPF não enviado.");

        try {
            const cpfLimpo = cpf.replace(/\D/g, '');
            await db.collection("pagamentos").doc(cpfLimpo).update({ 
                status: "USADO",
                dataUso: new Date().toISOString()
            });
            res.status(200).json({ sucesso: true, mensagem: "Protocolo das Estrelas Consumido!" });
        } catch (e) {
            res.status(500).send("Erro ao processar queima de ticket.");
        }
    });
});