// 1. Definir as constantes para o cálculo
const PRICE_PER_CARBON_CREDIT = 55.00; // Preço em R$ por 1 crédito (1 ton CO2). Valor fictício, mas baseado em médias.
const TREES_PER_CREDIT = 6; // Estimativa de que 1 crédito de carbono equivale a ~6 árvores conservadas por ano.

// 2. Selecionar os elementos do DOM
const investmentInput = document.getElementById('investment');
const calculateBtn = document.getElementById('calculate-btn');
const resultsSection = document.getElementById('results-section');
const carbonCreditsEl = document.getElementById('carbon-credits');
const treesEquivalentEl = document.getElementById('trees-equivalent');

// 3. Adicionar o "ouvinte" de evento ao botão
calculateBtn.addEventListener('click', () => {
    // 4. Pegar o valor do input
    const investmentValue = parseFloat(investmentInput.value);

    // Validar se o valor é um número válido
    if (isNaN(investmentValue) || investmentValue <= 0) {
        alert("Por favor, insira um valor válido.");
        return;
    }

    // 5. Fazer os cálculos
    const calculatedCredits = investmentValue / PRICE_PER_CARBON_CREDIT;
    const calculatedTrees = calculatedCredits * TREES_PER_CREDIT;

    // 6. Atualizar o HTML com os resultados
    // Usamos toFixed(2) para formatar para 2 casas decimais
    carbonCreditsEl.textContent = calculatedCredits.toFixed(2); 
    // Usamos Math.round para arredondar o número de árvores
    treesEquivalentEl.textContent = Math.round(calculatedTrees);

    // 7. Mostrar a seção de resultados
    resultsSection.classList.remove('results-hidden');
    resultsSection.classList.add('results-visible');
});