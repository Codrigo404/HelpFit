/* ==========================================================================
   DREAMTECH BIOCODE - INTERFACE E EVENTOS (UX/UI) - FINAL
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

    // 2. Preenche os campos de Medidas
    popularSelect('age', 14, 80, 'anos', 25);
    popularSelect('height', 140, 210, 'cm', 170);
    popularSelect('weight', 40, 160, 'kg', 70);

    // 3. Preenche o select de Bairros
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

    // 4. Controla o que acontece ao clicar em "Gerar Dieta"
    const form = document.getElementById('macroCalculatorForm');
    if (form) {
        form.onsubmit = (e) => {
            e.preventDefault();
            
            // Executa o cálculo científico (macro.js)
            if (typeof calculateMacros === 'function') calculateMacros();

            // Pega o CPF para iniciar a trava
            const cpf = document.getElementById('user_cpf')?.value.replace(/\D/g, '');

            // Inicia o monitoramento do pagamento (pix.js)
            if (typeof monitorarPagamento === 'function' && cpf) monitorarPagamento(cpf);

            // Envia os dados do cliente para o banco (leads.js)
            if (typeof salvarLead === 'function') salvarLead();
        };
    }


        
        const inputCPF = document.getElementById('user_cpf');
        inputCPF.addEventListener('input', (e) => {
            let v = e.target.value.replace(/\D/g, '');
            if (v.length > 11) v = v.slice(0, 11);
            v = v.replace(/(\d{3})(\d)/, '$1.$2');
            v = v.replace(/(\d{3})(\d)/, '$1.$2');
            v = v.replace(/(\d{3})(\d{1,2})$/, '$1-$2');
            e.target.value = v;
        });

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

        inputCPF.addEventListener('blur', function() {
            if (this.value && !validarCPF(this.value)) {
                alert("CPF Inválido! Verifique para prosseguir.");
                this.style.border = "2px solid #ef4444";
                this.value = "";
            } else if (this.value) {
                this.style.border = "2px solid #22c55e"; 
            }
        });
    </script>













});