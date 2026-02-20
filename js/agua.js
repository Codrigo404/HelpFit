/* */
function calculateWater() {
    const age = parseFloat(document.getElementById('water_age')?.value);
    const weight = parseFloat(document.getElementById('water_weight')?.value);
    const activityAdj = 500; 

    if (isNaN(weight) || isNaN(age)) return;

    let mlPerKg = (age < 30) ? 40 : (age > 55) ? 30 : 35;
    const totalMl = (weight * mlPerKg) + activityAdj;
    const totalLiters = (totalMl / 1000).toFixed(2);

    document.getElementById('waterLitersDisplay').textContent = totalLiters.replace('.', ',');
    document.getElementById('water_results')?.classList.remove('hidden');

    // Chama vitrine de manutenção
    if (typeof atualizarCarrossel === "function") {
        atualizarCarrossel('maintenance', 'ad-water'); 
    }
}

window.addEventListener('load', () => {
    document.getElementById('waterCalculatorForm')?.addEventListener('submit', (e) => {
        e.preventDefault();
        calculateWater();
    });
});