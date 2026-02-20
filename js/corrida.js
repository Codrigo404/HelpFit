/* */
function calculateRun() {
    const age = parseFloat(document.getElementById('run_age')?.value);
    const weight = parseFloat(document.getElementById('run_weight')?.value);
    const goalCals = parseFloat(document.getElementById('fat_goal_cals')?.value);
    const zone = parseFloat(document.getElementById('heart_rate_zone')?.value);
    
    if (isNaN(age) || isNaN(weight)) return;

    const fcm = 220 - age;
    const calsPerKm = 0.7 * weight;
    const dist = (goalCals / (calsPerKm * zone)).toFixed(2);
    
    document.getElementById('distanceDisplay').textContent = dist.replace('.', ',');
    document.getElementById('fcmDisplay').textContent = fcm;
    document.getElementById('fatBurnZoneDisplay').textContent = `${Math.round(fcm * 0.6)}-${Math.round(fcm * 0.7)} bpm`;
    document.getElementById('calsPerKmDisplay').textContent = calsPerKm.toFixed(1).replace('.', ',');
    
    document.getElementById('run_results')?.classList.remove('hidden');

    // Chama vitrine de queima de gordura
    if (typeof atualizarCarrossel === "function") {
        atualizarCarrossel('loss', 'ad-run'); 
    }
}

window.addEventListener('load', () => {
    document.getElementById('runCalculatorForm')?.addEventListener('submit', (e) => {
        e.preventDefault();
        calculateRun();
    });
});