/* ==========================================================================
    DREAMTECH BIOCODE - INTERFACE CENTRALIZADA (UX/UI)
    ========================================================================== */

const bairrosRJ = ["Centro", "Copacabana", "Ipanema", "Leblon", "Botafogo", "Flamengo", "Tijuca", "Vila Isabel", "Maracanã", "Méier", "Madureira", "Barra da Tijuca", "Recreio dos Bandeirantes", "Jacarepaguá", "Bangu", "Campo Grande", "Santa Cruz","Sepetiba","Ilha do Governador","itaguai","seropedica","Nova Iguaçu","Queimados","São Gonçalo","Niterói","Duque de Caxias"];

document.addEventListener('DOMContentLoaded', () => {
    
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

    // 2. Preenchimento Automático (CORRIGIDO: Incluído water_age)
    popularSelect('age', 14, 80, 'anos', 25);
    popularSelect('height', 140, 210, 'cm', 170);
    popularSelect('weight', 40, 160, 'kg', 70);
    popularSelect('run_age', 14, 80, 'anos', 25);
    popularSelect('run_weight', 40, 160, 'kg', 70);
    popularSelect('water_weight', 40, 160, 'kg', 70);
    popularSelect('water_age', 14, 80, 'anos', 25); // << FALTAVA ESTA LINHA PARA A ÁGUA FUNCIONAR!

    // 3. Preenchimento de Bairros (Para o seu leads.js salvar corretamente)
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

    // 4. Máscara e Validação de CPF (Crucial para o seu Pix e Leads)
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
                this.style.border = "2px solid #ef4444";
                this.value = "";
            } else if (this.value) {
                this.style.border = "2px solid #22c55e"; 
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
            
            btn.innerText = "PROCESSANDO...";
            btn.disabled = true;

            try {
                if (typeof calculateMacros === 'function') calculateMacros();
                const cpf = document.getElementById('user_cpf')?.value.replace(/\D/g, '');
                if (typeof monitorarPagamento === 'function' && cpf) monitorarPagamento(cpf);
                if (typeof salvarLead === 'function') await salvarLead();
                
            } catch (err) {
                console.error("Erro no processamento:", err);
            } finally {
                btn.innerText = "GERAR DIETA 🥗";
                btn.disabled = false;
            }
        };
    }

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