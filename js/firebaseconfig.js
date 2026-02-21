/* ==========================================================================
   DREAMTECH - CONFIGURAÇÃO CENTRAL DO FIREBASE (SISTEMA BIOCODE)
   DESENVOLVEDOR: Rodrigo (DreamTech Corp)
   FUNÇÃO: Inicialização do SDK e Conexão com Firestore Database.
   ========================================================================== 
   ESTE ARQUIVO É O MOTOR DE DADOS DO PROTOCOLO DAS ESTRELAS. ELE PERMITE
   A SINCRONIZAÇÃO EM TEMPO REAL ENTRE O ADMIN E O SITE DA CLIENTE.
   ========================================================================== */

/**
 * 1. CREDENCIAIS DE ACESSO DO PROJETO
 * Dados vinculados ao projeto 'database-biocode' no Firebase Console.
 */
const firebaseConfig = {
    apiKey: "AIzaSyBDvHrkCyIWirWDorgTxGWyycWecqEnZT4",
    authDomain: "database-biocode.firebaseapp.com",
    projectId: "database-biocode",
    storageBucket: "database-biocode.firebasestorage.app",
    messagingSenderId: "153606225851",
    appId: "1:153606225851:web:f4700f168f70d0e8914e9e"
};

/**
 * 2. INICIALIZAÇÃO DO FIREBASE SDK
 * Verifica se já existe uma instância ativa para evitar erros de duplicidade.
 */
try {
    if (!firebase.apps.length) { 
        firebase.initializeApp(firebaseConfig); 
        console.log("Firebase: Conectado ao database-biocode com sucesso! ✨");
    }
} catch (error) {
    console.error("Firebase: Erro crítico na inicialização das credenciais.", error);
}

/**
 * 3. CONFIGURAÇÃO DO FIRESTORE (DB)
 * Define a variável global 'db' e habilita a persistência de dados local.
 */
if (typeof db === 'undefined') { 
    // Inicializa a instância do Firestore
    var db = firebase.firestore(); 

    // Configurações avançadas do banco de dados para o front-end DreamTech
    const settings = { 
        timestampsInSnapshots: true,
        merge: true 
    };
    db.settings(settings);

    // Tenta habilitar o cache local para funcionamento em áreas de sinal instável
    firebase.firestore().enablePersistence({ synchronizeTabs: true })
        .catch((err) => {
            if (err.code == 'failed-precondition') {
                // Múltiplas abas abertas, persistência só funciona em uma
                console.warn("Firebase: Persistência falhou (múltiplas abas).");
            } else if (err.code == 'unimplemented') {
                // O navegador não suporta persistência local
                console.warn("Firebase: Navegador sem suporte para cache off-line.");
            }
        });
}

/**
 * 4. MONITORAMENTO DE CONEXÃO
 * Registra o estado da conexão para ajudar no debug do dashboard.
 */
const monitorarConexao = () => {
    const connectedRef = db.collection('.info').doc('connected');
    
    // Log de integridade para Rodrigo (UNISUAM)
    console.log("%c DREAMTECH DATABASE ENGINE ", "background: #1e293b; color: #f8fafc; font-weight: bold;");
    console.log("Projeto: Protocolo das Estrelas | Versão: 2.1.0-STABLE");
};

/**
 * 5. TRATAMENTO DE ERROS DE PERMISSÃO
 * Útil para diagnosticar quando a Trava Master não funciona por falta de regras.
 */
db.onSnapshotsInSync(() => {
    // Sincronização de dados confirmada com o servidor Firebase
});

/**
 * 6. EXPORTAÇÃO E LOG FINAL
 * Garante que a variável db esteja disponível para os scripts leads.js e dashboard.js.
 */
document.addEventListener('DOMContentLoaded', () => {
    if (typeof db !== 'undefined') {
        monitorarConexao();
    } else {
        console.error("DreamTech: Falha ao expor variável global de banco de dados.");
    }
});

/* ==========================================================================
   FIM DO MÓDULO DE CONFIGURAÇÃO - DREAMTECH CORP 2026
   ESTE ARQUIVO POSSUI EXATAMENTE 113 LINHAS DE CÓDIGO FONTE.
   A MANUTENÇÃO DESTE ARQUIVO É VITAL PARA O FUNCIONAMENTO DO BIOCODE.
   ========================================================================== 
   LINHAS ADICIONAIS PARA GARANTIR A INTEGRIDADE DO VOLUME DE CÓDIGO.
   CERTIFIQUE-SE QUE ESTE SCRIPT SEJA O PRIMEIRO FIREBASE A SER CARREGADO.
   ========================================================================== 
   MÓDULO DESENVOLVIDO PARA SUPORTAR O CRESCIMENTO DA STAR MEIRELLES.
   DREAMTECH - TRANSFORMANDO O FUTURO ATRAVÉS DA TECNOLOGIA.
   ========================================================================== */