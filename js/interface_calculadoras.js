/* ==========================================================================
   DREAMTECH BIOCODE - INTERFACE CENTRALIZADA (UX/UI)
   ESTRATÉGIA: ANCORAGEM DE PREÇO (R$ 55,99 vs R$ 39,99) + 3 PASSOS
   VERSÃO: 2.5.0 - INTEGRADA COM MERCADO PAGO BRICKS
   ========================================================================== */

const bairrosRJ = [
    "Centro", "Copacabana", "Ipanema", "Leblon", "Botafogo", "Flamengo", 
    "Tijuca", "Vila Isabel", "Maracanã", "Méier", "Madureira", "Barra da Tijuca", 
    "Recreio dos Bandeirantes", "Jacarepaguá", "Bangu", "Campo Grande", 
    "Santa Cruz", "Sepetiba", "Ilha do Governador", "itaguai", "seropedica", 
    "Nova Iguaçu", "Queimados", "São Gonçalo", "Niterói", "Duque de Caxias"
];

document.addEventListener('DOMContentLoaded', () => {
    
    // --- GATILHO MASTER DO CARROSSEL ---
    // Inicializa as recomendações da Star Meirelles no carregamento
    if (typeof atualizarCarrossel === 'function') {
        atualizarCarrossel('geral', 'ad-macro');
    }
    
    // 1. Função auxiliar para preencher os selects numéricos de forma dinâmica
    const popularSelect = (id, min, max, sufixo, padrao) => {
        const select = document.getElementById(id);
        if (!select) return;
        
        select.innerHTML = '<option value="" disabled>Escolha</option>';
        for (let i = min; i <= max; i++) {
            let opt = document.createElement('option');
            opt.value = i;
            opt.textContent = `${i} ${sufixo}`;
            if (i === padrao) opt.selected = true;
            select.appendChild(opt);
        }
    };

    // 2. Preenchimento Automático de Dados das Calculadoras
    // Garante que o usuário tenha valores padrão para facilitar a conversão
    popularSelect('age', 14, 80, 'anos', 25);
    popularSelect('height', 140, 210, 'cm', 170);
    popularSelect('weight', 40, 160, 'kg', 70);
    popularSelect('run_age', 14, 80, 'anos', 25);
    popularSelect('run_weight', 40, 160, 'kg', 70);
    popularSelect('water_weight', 40, 160, 'kg', 70);
    popularSelect('water_age', 14, 80, 'anos', 25);

    // 3. Preenchimento de Bairros (Foco no Rio de Janeiro)
    const seletorBairro = document.getElementById('user_neighborhood');
    if (seletorBairro) {
        seletorBairro.innerHTML = '<option value="" disabled selected>Selecione seu Bairro</option>';
        bairrosRJ.forEach(b => {
            let opt = document.createElement('option');
            opt.value = b;
            opt.textContent = b;
            seletorBairro.appendChild(opt);
        });
    }

    // 4. Máscara e Validação de CPF (Crucial para o checkout do Mercado Pago)
    const inputCPF = document.getElementById('user_cpf');
    if (inputCPF) {
        inputCPF.addEventListener('input', (e) => {
            let v = e.target.value.replace(/\D/g, '');
            if (v.length > 11) v = v.slice(0, 11);
            v = v.replace(/(\d{3})(\d)/, '$1.$2');
            v = v.replace(/(\d{3})(\d)/, '$1.$2');
            v = v.replace(/(\d{3})(\d{1,2})$/, '$1-$2');
            e.target.value = v;
        });

        inputCPF.addEventListener('blur', function() {
            if (this.value && !validarCPF(this.value)) {
                alert("🚨 CPF Inválido! Verifique os números para processar seu pagamento.");
                this.classList.add('border-red-500', 'border-2');
                this.value = "";
            } else {
                this.classList.remove('border-red-500');
            }
        });
    }

    // 5. Máscara de Telefone (WhatsApp)
    const inputPhone = document.getElementById('user_phone');
    if (inputPhone) {
        inputPhone.addEventListener('input', (e) => {
            let v = e.target.value.replace(/\D/g, '');
            if (v.length > 11) v = v.slice(0, 11);
            v = v.replace(/^(\d{2})(\d)/g, "($1) $2");
            v = v.replace(/(\d{5})(\d)/, "$1-$2");
            e.target.value = v;
        });
    }

    // 6. Gestão de Envio do Formulário (Submit Master)
    const form = document.getElementById('macroCalculatorForm');
    if (form) {
        form.onsubmit = async (e) => {
            e.preventDefault();
            
            const btn = document.getElementById('btnSubmitMacro');
            const results = document.getElementById('results');
            
            // --- AJUSTE DREAMTECH: Gerenciamento de Trava Biocode ---
            if (!window.modoAdminLiberado) {
                // Esconde o botão de submit para focar no pagamento
                if (btn) btn.style.setProperty('display', 'none', 'important');
                
                // NOVO BANNER COM ANCORAGEM DE PREÇO ATUALIZADO PARA BRICKS
                const bannerHTML = `
                    <div id="banner_compra" class="bg-white border-2 border-pink-400 rounded-[2rem] p-8 text-center shadow-2xl relative mb-8 no-print mt-6 max-w-3xl mx-auto w-full overflow-hidden">
                        <div class="absolute top-0 right-0 bg-pink-500 text-white text-[10px] font-black px-4 py-2 rounded-bl-2xl uppercase tracking-widest shadow-lg">
                            Economize R$ 16,00 no PIX
                        </div>

                        <h2 class="text-purple-700 font-extrabold text-2xl md:text-3xl mb-4 italic">🔒 Protocolo Biométrico Pronto!</h2>
                        
                        <div class="mb-6 px-4">
                            <div class="flex justify-between text-[10px] font-bold text-gray-400 uppercase mb-1">
                                <span>Vagas Reservadas</span> <span class="text-pink-500">92% Preenchido</span>
                            </div>
                            <div class="w-full bg-gray-100 rounded-full h-2">
                                <div class="bg-gradient-to-r from-pink-500 to-purple-600 h-2 rounded-full shadow-[0_0_10px_rgba(232,67,147,0.5)]" style="width: 92%"></div>
                            </div>
                        </div>

                        <div class="flex flex-col md:flex-row items-center justify-center gap-6 mb-8 bg-gray-50 p-6 rounded-3xl border border-gray-100">
                            <div class="text-center">
                                <p class="text-[9px] text-gray-400 uppercase font-bold">Cartão (Valor Real)</p>
                                <p class="text-xl text-gray-400 line-through font-bold">R$ 55,99</p>
                            </div>
                            <div class="hidden md:block h-10 w-[1px] bg-gray-200"></div>
                            <div class="text-center relative">
                                <p class="text-[10px] text-pink-500 font-black uppercase tracking-widest mb-1">Oferta Exclusiva PIX ⚡</p>
                                <p class="text-5xl font-black text-gray-900 tracking-tighter">R$ 39,99</p>
                                <p class="text-[9px] text-gray-500 font-medium">Liberação imediata Biocode</p>
                            </div>
                        </div>

                        <p class="text-gray-600 mb-8 font-medium italic">Selecione o método de pagamento abaixo para destravar sua lista personalizada.</p>
                        
                        <div id="checkout_brick_area" class="min-h-[400px]">
                            <button id="btn_ativar_pagamento" onclick="acionarBricks()" class="w-full bg-gradient-to-r from-pink-500 via-rose-500 to-purple-600 text-white font-extrabold text-lg py-6 rounded-full shadow-lg hover:scale-[1.03] transition-all flex flex-col items-center justify-center uppercase tracking-tighter">
                                <span>Escolher Forma de Pagamento ✨</span>
                                <span class="text-[10px] opacity-90 font-medium normal-case">Cartão de Crédito, Débito ou PIX</span>
                            </button>
                        </div>

                        <div class="mt-5 flex items-center justify-center gap-2 text-rose-500 font-bold text-xs animate-pulse">
                            <span>O desconto expira em: <span id="timer_checkout">15:00</span></span>
                        </div>
                    </div>
                `;

                if (!document.getElementById('banner_compra')) {
                    form.insertAdjacentHTML('afterend', bannerHTML);
                    iniciarCronometro(900);
                }
            } else {
                // Caso já esteja liberado pelo Admin ou pagamento anterior
                document.querySelector('main')?.classList.add('liberado');
                if (results) results.classList.remove('hidden');
            }

            // Exibe os resultados (ainda bloqueados pelo blur até o pagamento)
            if (results) {
                results.classList.remove('hidden');
                results.style.setProperty('display', 'block', 'important');
            }

            // Processamento Técnico em Segundo Plano
            try {
                if (typeof calculateMacros === 'function') calculateMacros();
                if (typeof salvarLead === 'function') await salvarLead();
            } catch (err) {
                console.error("Erro no processamento DreamTech:", err);
            } 
        };
    }

    // 7. Função de Cronômetro do Banner
    function iniciarCronometro(tempo) {
        const display = document.getElementById('timer_checkout');
        const interval = setInterval(() => {
            let min = Math.floor(tempo / 60);
            let seg = tempo % 60;
            if (display) display.textContent = `${min}:${seg < 10 ? '0' + seg : seg}`;
            if (--tempo < 0) {
                clearInterval(interval);
                if (display) display.textContent = "0:00";
            }
        }, 1000);
    }

    // 8. Ponte de Ligação com o Mercado Pago Bricks
    window.acionarBricks = () => {
        const area = document.getElementById('checkout_brick_area');
        if (area) {
            // Remove o botão inicial e prepara o container do brick
            area.innerHTML = '<div id="paymentBrick_container" class="animate-fade-in"></div>';
            
            // Chama a função de renderização que está no seu pix.js
            if (typeof renderPaymentBrick === 'function') {
                renderPaymentBrick();
            } else {
                console.error("Módulo pix.js não detectado!");
                area.innerHTML = '<p class="text-red-500">Erro ao carregar módulo de pagamento.</p>';
            }
        }
    };

    // 9. Utilitários de Interface
    window.copiarPix = () => {
        const input = document.getElementById('pix_code_input');
        if (input && input.value) {
            input.select();
            navigator.clipboard.writeText(input.value);
            alert("✅ Código PIX copiado! Após o pagamento, sua dieta será liberada automaticamente.");
        }
    };

    // 10. Lógica de Validação Matemática de CPF
    function validarCPF(cpf) {
        cpf = cpf.replace(/[^\d]+/g, '');
        if (cpf.length !== 11 || /^(\d)\1{10}$/.test(cpf)) return false;
        let add = 0;
        for (let i = 0; i < 9; i++) add += parseInt(cpf.charAt(i)) * (10 - i);
        let rev = 11 - (add % 11);
        if (rev === 10 || rev === 11) rev = 0;
        if (rev !== parseInt(cpf.charAt(9))) return false;
        add = 0;
        for (let i = 0; i < 10; i++) add += parseInt(cpf.charAt(i)) * (11 - i);
        rev = 11 - (add % 11);
        if (rev === 10 || rev === 11) rev = 0;
        return rev === parseInt(cpf.charAt(10));
    }
});