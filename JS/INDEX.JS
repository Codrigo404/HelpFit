// --- Event Listeners para os Formulários ---
document.getElementById('macroCalculatorForm').addEventListener('submit', function(e) {
    e.preventDefault();
    calculateMacros();
});

document.getElementById('waterCalculatorForm').addEventListener('submit', function(e) {
    e.preventDefault();
    calculateWaterNeeds();
});

document.getElementById('runCalculatorForm').addEventListener('submit', function(e) {
    e.preventDefault();
    calculateRunDistance();
});

// --- Constantes de Cálculo (Macros e Dieta) ---
const activityFactors = { '1.2': 1.2, '1.375': 1.375, '1.55': 1.55, '1.725': 1.725, '1.9': 1.9 };
const macroGoals = { 
    'loss': { adjustment: -500, protein_per_kg: 2.2, fat_percentage: 0.25, title: "Perda de Peso (Déficit Calórico)" }, 
    'maintenance': { adjustment: 0, protein_per_kg: 1.8, fat_percentage: 0.30, title: "Manutenção de Peso (Equilíbrio)" }, 
    'mass': { adjustment: 300, protein_per_kg: 2.0, fat_percentage: 0.25, title: "Ganho de Massa Muscular (Superávit Calórico)" } 
};
const mealTemplates = { 
    protein_distribution: [0.20, 0.15, 0.25, 0.10, 0.20, 0.10], 
    carb_distribution: [0.15, 0.10, 0.30, 0.15, 0.20, 0.10], 
    fat_distribution: [0.20, 0.10, 0.30, 0.05, 0.25, 0.10] 
};
const simpleNutritionEstimates = { 
    'whey_scoop': [25, 3, 2, "Whey Protein", "1 scoop"], 'ovo_clara_3': [10, 1, 0, "Claras de Ovos", "3 un."], 'iogurte_grego': [14, 8, 4, "Iogurte Grego Light", "150g"], 'queijo_cottage': [12, 4, 3, "Queijo Cottage", "80g"], 'queijo_minas': [10, 2, 8, "Queijo Minas Frescal", "50g"], 'peito_peru': [12, 1, 1, "Peito de Peru", "4 fatias"], 
    'banana': [1, 27, 0, "Banana Prata", "1 un."], 'pao_integral': [8, 30, 3, "Pão Integral", "2 fatias"], 'tapioca': [0, 30, 0, "Tapioca", "1 disco"], 'aveia': [6, 35, 3, "Aveia", "3 col. sopa"], 'morango': [1, 10, 0, "Morangos", "1 xíc."], 
    'pasta_amendoim': [8, 8, 16, "Pasta de Amendoim", "2 col. sopa"], 'amendoas': [6, 6, 15, "Amêndoas", "8 un."], 'castanhas': [4, 4, 12, "Castanhas", "20g"] 
};
const detailedMealExamples = { 
    mass: { protein: "Peito de Frango Grelhado (~150g) ou Carne Vermelha Magra (~120g)", carb: "Arroz Branco ou Integral (~180g) e Batata Doce Cozida (~100g)", fat: "Azeite de Oliva (1 colher de sopa) para temperar a salada." }, 
    loss: { protein: "Filé de Tilápia Grelhada (~130g) ou Ovos Cozidos (4 unidades)", carb: "Legumes à Vontade (Brócolis, Couve-Flor) e 1/2 concha de Feijão", fat: "Azeite de Oliva (1 colher de chá) ou 10g de Castanhas" }, 
    maintenance: { protein: "Salmão (100g) ou Lombo de Porco Magro (100g)", carb: "Arroz Integral (120g) e Salada Mista com 1 porção de Fruta (Maçã)", fat: "1/4 de Abacate ou 1 colher de chá de Azeite de Oliva." } 
};
const lightMealSuggestions = { 
    mass: { protein: ['whey_scoop', 'iogurte_grego'], carb: ['banana', 'pao_integral'], fat: ['pasta_amendoim'] }, 
    loss: { protein: ['ovo_clara_3', 'queijo_cottage'], carb: ['morango'], fat: ['amendoas'] }, 
    maintenance: { protein: ['queijo_minas', 'peito_peru'], carb: ['tapioca', 'aveia'], fat: ['castanhas'] } 
};
const mealNames = [ "Refeição 1: Café da Manã", "Refeição 2: Lanche da Manhã", "Refeição 3: Almoço Principal", "Refeição 4: Pré-Treino/Lanche Tarde", "Refeição 5: Pós-Treino/Jantar", "Refeição 6: Ceia" ];


// --- FUNÇÃO PARA CALCULAR DISTÂNCIA DE CORRIDA ---
function calculateRunDistance() {
    try {
        const age = parseFloat(document.getElementById('run_age').value);
        const weight = parseFloat(document.getElementById('run_weight').value);
        const fatGoalCals = parseFloat(document.getElementById('fat_goal_cals').value);
        const zoneFactor = parseFloat(document.getElementById('heart_rate_zone').value); 

        if (isNaN(age) || isNaN(weight) || isNaN(fatGoalCals) || !zoneFactor || age < 10 || fatGoalCals <= 0) {
            throw new Error("⚠️ Por favor, preencha todos os campos da Calculadora de Corrida com valores válidos (Idade, Peso, Meta de Kcal).");
        }

        // 1. Calcular Frequência Cardíaca Máxima (FCM)
        const fcm = 220 - age;

        // 2. Calcular Queima Calórica Total Média por KM (Aprox: 0.7 kcal * Peso (kg))
        const calsPerKmTotal = 0.7 * weight;

        // 3. Queima Calórica de GORDURA por KM
        const calsPerKmFat = calsPerKmTotal * zoneFactor;

        if (calsPerKmFat <= 0) {
             throw new Error("Erro no cálculo da queima de gordura por km. Tente ajustar os valores.");
        }

        // 4. Distância Necessária (km) = Meta / Queima de Gordura por Km
        const distanceNeeded = fatGoalCals / calsPerKmFat;

        // 5. Exibir Resultados
        document.getElementById('distanceDisplay').textContent = distanceNeeded.toFixed(2).replace('.', ',');
        document.getElementById('fcmDisplay').textContent = fcm;
        
        // NOVO: Exibir a proporção total de calorias/km
        document.getElementById('calsPerKmDisplay').textContent = calsPerKmTotal.toFixed(1).replace('.', ',');

        // Zona Ideal de Queima de Gordura (60% a 70% da FCM)
        const fatBurnMin = Math.round(fcm * 0.60);
        const fatBurnMax = Math.round(fcm * 0.70);
        document.getElementById('fatBurnZoneDisplay').textContent = `${fatBurnMin} - ${fatBurnMax} bpm`;
        
        document.getElementById('run_results').classList.remove('hidden');
        document.getElementById('errorMessage').classList.add('hidden');

    } catch (error) {
        const errorDiv = document.getElementById('errorMessage');
        errorDiv.innerHTML = `<p>${error.message}</p>`; 
        errorDiv.classList.remove('hidden');
        document.getElementById('run_results').classList.add('hidden');
        
        console.error("Erro no cálculo de Corrida:", error.message); 
    }
}


// --- FUNÇÃO PARA CALCULAR ÁGUA ---
function calculateWaterNeeds() {
    try {
        const weight = parseFloat(document.getElementById('water_weight').value);
        const activityAdjustment = parseFloat(document.getElementById('water_activity').value);

        if (isNaN(weight) || weight <= 0) {
            throw new Error("⚠️ Por favor, insira um peso válido na Calculadora de Água.");
        }

        const baseMilliliters = weight * 35;
        const totalMilliliters = baseMilliliters + activityAdjustment;
        const totalLiters = (totalMilliliters / 1000).toFixed(2); 

        document.getElementById('waterLitersDisplay').textContent = totalLiters.replace('.', ',');
        document.getElementById('waterAdjustmentDisplay').textContent = activityAdjustment.toLocaleString('pt-BR');

        document.getElementById('water_results').classList.remove('hidden');
        document.getElementById('errorMessage').classList.add('hidden');

    } catch (error) {
        const errorDiv = document.getElementById('errorMessage');
        errorDiv.innerHTML = `<p>${error.message}</p>`; 
        errorDiv.classList.remove('hidden');
        document.getElementById('water_results').classList.add('hidden');
        
        console.error("Erro no cálculo de Água:", error.message); 
    }
}


// --- FUNÇÃO PARA CALCULAR MACROS ---
function calculateMacros() {
    try {
        const gender = document.getElementById('gender').value;
        const age = parseFloat(document.getElementById('age').value);
        const height = parseFloat(document.getElementById('height').value);
        const weight = parseFloat(document.getElementById('weight').value);
        const activityValue = document.getElementById('activity').value;
        const goal = document.getElementById('goal').value;

        if (!gender || isNaN(age) || isNaN(height) || isNaN(weight) || !activityValue || !goal) {
            throw new Error("⚠️ Por favor, preencha *todos* os campos da Calculadora de Macronutrientes corretamente.");
        }

        const activityFactor = activityFactors[activityValue];
        const goalData = macroGoals[goal];

        let bmr;
        if (gender === 'male') {
            bmr = (10 * weight) + (6.25 * height) - (5 * age) + 5;
        } else { 
            bmr = (10 * weight) + (6.25 * height) - (5 * age) - 161;
        }

        const tdee = bmr * activityFactor;
        
        let targetCalories = tdee + goalData.adjustment;
        if (targetCalories < 1200) {
               targetCalories = 1200;
        }

        const proteinGrams = weight * goalData.protein_per_kg;
        const proteinCals = proteinGrams * 4; 

        const fatCals = targetCalories * goalData.fat_percentage;
        const fatGrams = fatCals / 9; 

        const remainingCals = targetCalories - (proteinCals + fatCals);
        const carbCals = Math.max(0, remainingCals); 
        const carbGrams = carbCals / 4; 


        document.getElementById('tdeeDisplay').textContent = Math.round(tdee).toLocaleString('pt-BR');
        document.getElementById('targetCaloriesDisplay').textContent = Math.round(targetCalories).toLocaleString('pt-BR');
        document.getElementById('proteinGrams').textContent = `${Math.round(proteinGrams)}g`;
        document.getElementById('proteinCals').textContent = `${Math.round(proteinCals)} kcal`;
        document.getElementById('fatGrams').textContent = `${Math.round(fatGrams)}g`;
        document.getElementById('fatCals').textContent = `${Math.round(fatCals)} kcal`;
        document.getElementById('carbGrams').textContent = `${Math.round(carbGrams)}g`;
        document.getElementById('carbCals').textContent = `${Math.round(carbCals)} kcal`;
        
        generateDietExamples(Math.round(proteinGrams), Math.round(carbGrams), Math.round(fatGrams), goal);

        document.getElementById('results').classList.remove('hidden');
        document.getElementById('errorMessage').classList.add('hidden');

    } catch (error) {
        const errorDiv = document.getElementById('errorMessage');
        errorDiv.innerHTML = `<p>${error.message}</p>`; 
        errorDiv.classList.remove('hidden');
        document.getElementById('results').classList.add('hidden');
        
        console.error("Erro na validação/cálculo de Macros:", error.message); 
    }
}


// --- FUNÇÃO DE GERAÇÃO DE EXEMPLOS ---
function generateDietExamples(totalProtein, totalCarb, totalFat, goal) {
    const container = document.getElementById('dietExamples');
    const goalTitle = document.getElementById('mealGoalTitle');
    const lightSuggestions = lightMealSuggestions[goal];
    const detailedExamples = detailedMealExamples[goal];

    container.innerHTML = ''; 
    goalTitle.textContent = macroGoals[goal].title;

    for (let i = 0; i < mealNames.length; i++) {
        const proteinG = totalProtein * mealTemplates.protein_distribution[i];
        const carbG = totalCarb * mealTemplates.carb_distribution[i];
        const fatG = totalFat * mealTemplates.fat_distribution[i];
        
        let mealSug;
        
        if (i === 2 || i === 4) { 
            mealSug = `
                <p class="text-sm font-semibold text-gray-700 mt-2 mb-1">COMPOSIÇÃO DO PRATO (Sugestão de Porção):</p>
                <ul class="list-disc list-inside text-xs text-gray-600 space-y-1 ml-4">
                    <li><span class="font-medium text-red-700">Proteína:</span> ${detailedExamples.protein}</li>
                    <li><span class="font-medium text-yellow-700">Carboidrato:</span> ${detailedExamples.carb}</li>
                    <li><span class="font-medium text-green-700">Gordura:</span> ${detailedExamples.fat}</li>
                </ul>
                <p class="text-xs text-blue-500 mt-2 italic">*Ajuste as gramaturas para atingir os macros calculados acima.</p>
            `;
        } else { 
            const pKey = lightSuggestions.protein[0];
            const cKey = lightSuggestions.carb[0];
            const fKey = lightSuggestions.fat[0];

            const [pG, pC, pF, pName, pUnit] = simpleNutritionEstimates[pKey];
            const [cG, cC, cF, cName, cUnit] = simpleNutritionEstimates[cKey];
            const [fG, fC, fF, fName, fUnit] = simpleNutritionEstimates[fKey];


            mealSug = `
                <p class="text-sm font-semibold text-gray-700 mt-2 mb-1">SUGESTÃO SIMPLIFICADA (Para o seu objetivo):</p>
                <ul class="list-disc list-inside text-xs text-gray-600 space-y-1 ml-4">
                    <li>
                        <span class="font-medium text-red-700">Proteína:</span> ${pName} (${pUnit})
                        <span class="text-gray-500 ml-1"> (Est: <span class="text-red-700">P:${pG}g</span>/<span class="text-yellow-700">C:${pC}g</span>/<span class="text-green-700">G:${pF}g</span>)
                        </span>
                    </li>
                    <li>
                        <span class="font-medium text-yellow-700">Carboidrato:</span> ${cName} (${cUnit})
                        <span class="text-gray-500 ml-1"> (Est: <span class="text-red-700">P:${cG}g</span>/<span class="text-yellow-700">C:${cC}g</span>/<span class="text-green-700">G:${cF}g</span>)
                        </span>
                    </li>
                    <li>
                        <span class="font-medium text-green-700">Gordura:</span> ${fName} (${fUnit})
                        <span class="text-gray-500 ml-1"> (Est: <span class="text-red-700">P:${fG}g</span>/<span class="text-yellow-700">C:${fC}g</span>/<span class="text-green-700">G:${fF}g</span>)
                        </span>
                    </li>
                </ul>
                <p class="text-xs text-orange-500 mt-2 italic">*Essas são porções de referência. Ajuste a quantidade e/ou adicione mais alimentos para atingir o total de macros da refeição.</p>
            `;
        }


        const mealHTML = `
            <div class="p-4 border border-gray-200 rounded-lg bg-white hover:bg-gray-50 transition duration-150 ease-in-out">
                <h3 class="text-lg font-semibold text-blue-700 mb-2">${mealNames[i]}</h3>
                <div class="grid grid-cols-3 text-sm font-medium">
                    <p class="text-red-700">Proteína: ${Math.round(proteinG)}g</p>
                    <p class="text-yellow-700">Carboidrato: ${Math.round(carbG)}g</p>
                    <p class="text-green-700">Gordura: ${Math.round(fatG)}g</p>
                </div>
                ${mealSug}
            </div>
        `;
        container.innerHTML += mealHTML;
    }
}