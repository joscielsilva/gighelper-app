const META_DIARIA_LUCRO = 120.00;

function calcularLucro() {
    const consumoMedio = parseFloat(document.getElementById('consumoMedio').value);
    const depreciacaoPorKm = parseFloat(document.getElementById('depreciacaoKm').value);

    const ganhoBruto = parseFloat(document.getElementById('ganhoBruto').value);
    const kmRodado = parseFloat(document.getElementById('kmRodado').value);
    const precoCombustivel = parseFloat(document.getElementById('precoCombustivel').value);
    const tempoTurno = parseFloat(document.getElementById('tempoTurno').value);

    if (isNaN(consumoMedio) || isNaN(depreciacaoPorKm) || isNaN(ganhoBruto) || isNaN(kmRodado) || isNaN(precoCombustivel) || isNaN(tempoTurno)) {
        alert("Por favor, preencha todos os campos com valores válidos.");
        return;
    }

    const custoCombustivel = (kmRodado / consumoMedio) * precoCombustivel;
    const custoDepreciacao = kmRodado * depreciacaoPorKm;
    const totalCustos = custoCombustivel + custoDepreciacao;
    const lucroLiquido = ganhoBruto - totalCustos;
    const lucroPorHora = lucroLiquido / tempoTurno;

    document.getElementById('resCombustivel').innerText = `R$ ${custoCombustivel.toFixed(2)}`;
    document.getElementById('resDepreciacao').innerText = `R$ ${custoDepreciacao.toFixed(2)}`;
    document.getElementById('resLucroLiquido').innerText = `R$ ${lucroLiquido.toFixed(2)}`;
    document.getElementById('resLucroHora').innerText = `R$ ${lucroPorHora.toFixed(2)}/h`;

    const semaforoElement = document.getElementById('semaforo');
    semaforoElement.className = "status-alerta"; 

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