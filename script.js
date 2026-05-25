// Configurações médias do veículo do Ricardo (Simulação)
const CONSUMO_MEDIO = 12; // 12 km por litro
const DEPRECIACAO_POR_KM = 0.15; // R$ 0,15 por km (pneus, óleo, manutenção invisível)
const META_DIARIA_LUCRO = 120.00; // Meta de lucro limpo no dia

function calcularLucro() {
    // Captura os valores dos inputs
    const ganhoBruto = parseFloat(document.getElementById('ganhoBruto').value);
    const kmRodado = parseFloat(document.getElementById('kmRodado').value);
    const precoCombustivel = parseFloat(document.getElementById('precoCombustivel').value);
    const tempoTurno = parseFloat(document.getElementById('tempoTurno').value);

    // Validação simples
    if (isNaN(ganhoBruto) || isNaN(kmRodado) || isNaN(precoCombustivel) || isNaN(tempoTurno)) {
        alert("Por favor, preencha todos os campos com valores válidos.");
        return;
    }

    // Fórmulas Matemáticas (O core do MVP)
    const custoCombustivel = (kmRodado / CONSUMO_MEDIO) * precoCombustivel;
    const custoDepreciacao = kmRodado * DEPRECIACAO_POR_KM;
    const totalCustos = custoCombustivel + custoDepreciacao;
    const lucroLiquido = ganhoBruto - totalCustos;
    const lucroPorHora = lucroLiquido / tempoTurno;

    // Atualiza o ecrã com os resultados formatados em moeda
    document.getElementById('resCombustivel').innerText = `R$ ${custoCombustivel.toFixed(2)}`;
    document.getElementById('resDepreciacao').innerText = `R$ ${custoDepreciacao.toFixed(2)}`;
    document.getElementById('resLucroLiquido').innerText = `R$ ${lucroLiquido.toFixed(2)}`;
    document.getElementById('resLucroHora').innerText = `R$ ${lucroPorHora.toFixed(2)}/h`;

    // Lógica do Semáforo (Indicador de Viabilidade)
    const semaforoElement = document.getElementById('semaforo');
    semaforoElement.className = "status-alerta"; // limpa classes anteriores

    if (lucroLiquido <= 0) {
        semaforoElement.innerText = "🔴 PREJUÍZO INVISÍVEL! Altere a sua estratégia.";
        semaforoElement.classList.add("status-vermelho");
    } else if (lucroLiquido < META_DIARIA_LUCRO) {
        semaforoElement.innerText = "🟡 Sobrevivência. Custos pagos, mas abaixo da meta diária.";
        semaforoElement.classList.add("status-amarelo");
    } else {
        semaforoElement.innerText = "🟢 Meta Atingida! Turno altamente eficiente.";
        semaforoElement.classList.add("status-verde");
    }
}