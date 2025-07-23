document.addEventListener('DOMContentLoaded', () => {
    // Seleciona os elementos do DOM
    const form = document.getElementById('calculator-form');
    const resultsSection = document.getElementById('results-section');
    const creditsSpan = document.getElementById('resultado-creditos');
    const treesSpan = document.getElementById('resultado-arvores');
    const chartCanvas = document.getElementById('impactoGrafico');

    // Constantes para o cálculo
    const PRICE_PER_CARBON_CREDIT = 55.00; // Preço em R$ por 1 crédito (1 ton CO2).
    const TREES_PER_CREDIT = 6; // Estimativa: 1 crédito de carbono equivale a ~6 árvores conservadas por ano.

    let impactChart = null; // Variável para armazenar a instância do gráfico

    // Adiciona o "ouvinte" de evento ao formulário
    form.addEventListener('submit', (event) => {
        // Previne o comportamento padrão de recarregar a página
        event.preventDefault();

        // Pega o valor do input
        const investmentValue = parseFloat(document.getElementById('valorInvestimento').value);

        // Validação simples
        if (isNaN(investmentValue) || investmentValue <= 0) {
            alert("Por favor, insira um valor válido.");
            return;
        }

        // --- CÁLCULOS ---
        const calculatedCredits = investmentValue / PRICE_PER_CARBON_CREDIT;
        const calculatedTrees = calculatedCredits * TREES_PER_CREDIT;

        // --- ATUALIZAÇÃO DO HTML ---
        creditsSpan.textContent = calculatedCredits.toFixed(2);
        treesSpan.textContent = Math.round(calculatedTrees);

        // Mostra a seção de resultados com um efeito de fade-in
        resultsSection.style.opacity = '0';
        resultsSection.style.display = 'block';
        setTimeout(() => {
            resultsSection.style.transition = 'opacity 0.5s ease-in-out';
            resultsSection.style.opacity = '1';
        }, 10);


        // --- CRIAÇÃO DO GRÁFICO (Chart.js) ---
        // Se um gráfico já existir, destrói ele antes de criar um novo
        if (impactChart) {
            impactChart.destroy();
        }
        
        impactChart = new Chart(chartCanvas, {
            type: 'doughnut', // Tipo do gráfico
            data: {
                labels: ['Apoio a Reflorestamento', 'Apoio a Energia Limpa'],
                datasets: [{
                    label: 'Distribuição do Impacto',
                    data: [80, 20], // Dados fictícios: 80% do valor vai para Reflorestamento, 20% para Energia Limpa
                    backgroundColor: [
                        'rgba(25, 135, 84, 0.8)', // Verde
                        'rgba(54, 162, 235, 0.8)' // Azul
                    ],
                    borderColor: [
                        'rgba(25, 135, 84, 1)',
                        'rgba(54, 162, 235, 1)'
                    ],
                    borderWidth: 1
                }]
            },
            options: {
                responsive: true,
                plugins: {
                    legend: {
                        position: 'bottom',
                    },
                    title: {
                        display: false
                    }
                }
            }
        });
    });
});