const { onRequest } = require("firebase-functions/v2/https");
const { initializeApp } = require("firebase-admin/app");
const { getFirestore } = require("firebase-admin/firestore");
const axios = require("axios");
const cors = require("cors")({ origin: true });

// Inicializa o Firebase Admin para usar o Firestore
initializeApp();
const db = getFirestore();

/* ============================================================
   1. GERAR PIX (Mantendo sua lógica e salvando no Banco)
   ============================================================ */
exports.gerarPixBioCode = onRequest({ secrets: ["ASAAS_API_KEY"] }, async (req, res) => {
    cors(req, res, async () => {
        if (req.method !== "POST") return res.status(405).send("Use POST.");

        const asaasToken = process.env.ASAAS_API_KEY;
        const { nome, email, cpf, valor } = req.body;

        try {
            // PASSO 1: Criar/Verificar Cliente no Asaas
            const clienteResponse = await axios.post('https://sandbox.asaas.com/api/v3/customers', {
                name: nome,
                email: email,
                cpfCnpj: cpf
            }, { headers: { 'access_token': asaasToken } });

            const clienteId = clienteResponse.data.id;

            // PASSO 2: Criar cobrança Pix
            const cobrancaResponse = await axios.post('https://sandbox.asaas.com/api/v3/payments', {
                customer: clienteId,
                billingType: 'PIX',
                value: valor || 24.99,
                dueDate: new Date().toISOString().split('T')[0],
                description: `BioCode - ${nome}`
            }, { headers: { 'access_token': asaasToken } });

            const cobrancaId = cobrancaResponse.data.id;

            // --- NOVIDADE: SALVAR NO BANCO DE DADOS ---
            // Definimos o status como "PENDENTE"
            await db.collection("pagamentos").doc(cpf).set({
                nome,
                email,
                cobrancaId,
                status: "PENDENTE",
                dataCriacao: new Date().toISOString()
            });

            // PASSO 3: Buscar QR Code
            const pixData = await axios.get(`https://sandbox.asaas.com/api/v3/payments/${cobrancaId}/pixQrCode`, {
                headers: { 'access_token': asaasToken }
            });

            res.status(200).json({
                sucesso: true,
                pixCopiaECola: pixData.data.payload,
                qrCodeBase64: pixData.data.encodedImage
            });

        } catch (error) {
            console.error("Erro Asaas:", error.response?.data || error.message);
            res.status(500).json({ sucesso: false, detalhes: "Erro ao processar pagamento." });
        }
    });
});

/* ============================================================
   2. WEBHOOK (Obrigatório para o Asaas avisar que o cara pagou)
   ============================================================ */
exports.asaasWebhook = onRequest(async (req, res) => {
    const evento = req.body.event;
    const pagamento = req.body.payment;

    if (evento === "PAYMENT_RECEIVED" || evento === "PAYMENT_CONFIRMED") {
        const snapshot = await db.collection("pagamentos").where("cobrancaId", "==", pagamento.id).get();
        
        if (!snapshot.empty) {
            const docId = snapshot.docs[0].id;
            await db.collection("pagamentos").doc(docId).update({ status: "PAGO" });
        }
    }
    res.status(200).send("OK");
});

/* ============================================================
   3. QUEIMAR TICKET (Função que você vai chamar após o PDF/WhatsApp)
   ============================================================ */
exports.queimarTicketBioCode = onRequest(async (req, res) => {
    cors(req, res, async () => {
        const { cpf } = req.body;
        if (!cpf) return res.status(400).send("CPF não enviado.");

        try {
            // Voltamos o status para PENDENTE ou USADO para bloquear o acesso novamente
            await db.collection("pagamentos").doc(cpf).update({ 
                status: "USADO",
                dataUso: new Date().toISOString()
            });
            res.status(200).json({ sucesso: true, mensagem: "Ticket queimado com sucesso!" });
        } catch (e) {
            res.status(500).send("Erro ao queimar ticket.");
        }
    });
});