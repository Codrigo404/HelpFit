/* ==========================================================================
   DREAMTECH BIOCODE - INTERFACE CENTRALIZADA (UX/UI)
   ========================================================================== */

const bairrosRJ = ["Centro", "Copacabana", "Ipanema", "Leblon", "Botafogo", "Flamengo", "Tijuca", "Vila Isabel", "Maracanã", "Méier", "Madureira", "Barra da Tijuca", "Recreio dos Bandeirantes", "Jacarepaguá", "Bangu", "Campo Grande", "Santa Cruz","Sepetiba","Ilha do Governador","itaguai","seropedica","Nova Iguaçu","Queimados","São Gonçalo","Niterói","Duque de Caxias"];

document.addEventListener('DOMContentLoaded', () => {
    
    // --- GATILHO MASTER DO CARROSSEL ---
    if (typeof atualizarCarrossel === 'function') {
        atualizarCarrossel('geral', 'ad-macro');
    }
    
    // 1. Função auxiliar para preencher os selects numéricos
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

    // 2. Preenchimento Automático de Dados
    popularSelect('age', 14, 80, 'anos', 25);
    popularSelect('height', 140, 210, 'cm', 170);
    popularSelect('weight', 40, 160, 'kg', 70);
    popularSelect('run_age', 14, 80, 'anos', 25);
    popularSelect('run_weight', 40, 160, 'kg', 70);
    popularSelect('water_weight', 40, 160, 'kg', 70);
    popularSelect('water_age', 14, 80, 'anos', 25);

    // 3. Preenchimento de Bairros
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

    // 4. Máscara e Validação de CPF
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
                alert("CPF Inválido! Verifique para prosseguir.");
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

    // 6. Gestão de Envio do Formulário (Submit)
    const form = document.getElementById('macroCalculatorForm');
    if (form) {
        form.onsubmit = async (e) => {
            e.preventDefault();
            
            const btn = document.getElementById('btnSubmitMacro');
            const results = document.getElementById('results');
            
            // --- AJUSTE DREAMTECH: Só injeta o banner se não estiver liberado pelo Admin ---
            if (!window.modoAdminLiberado) {
                if (btn) btn.style.setProperty('display', 'none', 'important');
                
                const bannerHTML = `
                    <div id="banner_compra" class="bg-white border-2 border-pink-400 rounded-[2rem] p-8 text-center shadow-2xl relative mb-8 no-print mt-6 max-w-3xl mx-auto w-full">
                        <h2 class="text-purple-700 font-extrabold text-2xl md:text-3xl mb-4 italic">🔒 Protocolo Biométrico Pronto!</h2>
                        <div class="mb-6 px-4">
                            <div class="flex justify-between text-[10px] font-bold text-gray-400 uppercase mb-1">
                                <span>Vagas Reservadas</span> <span class="text-pink-500">92% Preenchido</span>
                            </div>
                            <div class="w-full bg-gray-100 rounded-full h-2">
                                <div class="bg-gradient-to-r from-pink-500 to-purple-600 h-2 rounded-full shadow-[0_0_10px_rgba(232,67,147,0.5)]" style="width: 92%"></div>
                            </div>
                        </div>
                        <p class="text-gray-600 mb-8 font-medium">Tenha acesso ao protocolo completo e uma <strong class="text-pink-500 underline">lista de refeições</strong>.</p>
                        <div id="checkout_area">
                            <button id="btn_gerar_pix" onclick="iniciarPagamentoPix()" class="w-full bg-gradient-to-r from-pink-500 via-rose-500 to-purple-600 text-white font-extrabold text-lg py-6 rounded-full shadow-lg hover:scale-[1.03] transition-all flex flex-col items-center justify-center uppercase tracking-tighter">
                                <span>Liberar Minha Dieta Completa ✨</span>
                                <span class="text-[10px] opacity-90 font-medium normal-case">Acesso imediato via PIX</span>
                            </button>
                        </div>
                        <div id="pix_container" class="hidden mt-6 p-6 bg-gray-50 rounded-3xl border-2 border-dashed border-gray-200">
                            <div id="qrcode_placeholder" class="flex justify-center mb-4 min-h-[200px] items-center bg-white rounded-xl shadow-inner">
                                 <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-pink-500"></div>
                            </div>
                            <div id="pix_copy_paste" class="mt-4">
                                <input type="text" id="pix_code_input" class="w-full p-3 text-xs bg-white border border-gray-200 rounded-lg text-center font-mono mb-2" readonly placeholder="Gerando código...">
                                <button onclick="copiarPix()" class="text-xs font-black text-pink-500 uppercase tracking-widest underline decoration-2 underline-offset-4">Copiar Código PIX</button>
                            </div>
                        </div>
                        <div class="mt-5 flex items-center justify-center gap-2 text-rose-500 font-bold text-xs animate-pulse">
                            <span>Oferta expira em: <span id="timer_checkout">15:00</span></span>
                        </div>
                    </div>
                `;

                if (!document.getElementById('banner_compra')) {
                    form.insertAdjacentHTML('afterend', bannerHTML);
                    iniciarCronometro(900);
                }
            } else {
                // Se já estiver liberado (Admin), garante que a classe CSS remova o blur
                document.querySelector('main')?.classList.add('liberado');
            }

            if (results) {
                results.classList.remove('hidden');
                results.style.setProperty('display', 'block', 'important');
            }

            try {
                if (typeof calculateMacros === 'function') calculateMacros();
                // MONITORAMENTO REMOVIDO DAQUI - Só inicia no clique do botão Liberar
                if (typeof salvarLead === 'function') await salvarLead();
            } catch (err) {
                console.error("Erro no processamento:", err);
            } 
        };
    }

    function iniciarCronometro(tempo) {
        const display = document.getElementById('timer_checkout');
        const interval = setInterval(() => {
            let min = Math.floor(tempo / 60);
            let seg = tempo % 60;
            if (display) display.textContent = `${min}:${seg < 10 ? '0' + seg : seg}`;
            if (--tempo < 0) clearInterval(interval);
        }, 1000);
    }

    window.iniciarPagamentoPix = () => {
        document.getElementById('checkout_area')?.classList.add('hidden');
        document.getElementById('pix_container')?.classList.remove('hidden');
        if (typeof gerarPix === 'function') gerarPix();
    };

    window.copiarPix = () => {
        const input = document.getElementById('pix_code_input');
        if (input && input.value) {
            input.select();
            navigator.clipboard.writeText(input.value);
            alert("Código PIX copiado!");
        }
    };

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