let machineId = null; // Variável para armazenar o ID da parada
let btnSalvar = document.querySelector('#salvarButton');
let celulaSelecionada, operatorName;
let startHour, endHour, totalTime;
let startDate, endDate, ge, dhors;
let obs;


btnSalvar.addEventListener('click', function () {

    operatorName = document.getElementById('operator').value.trim();
    celulaSelecionada = document.getElementById('celulas').value.trim();
    complementoEquipamento = document.getElementById('complemento-equipamento').value.trim();
    startHour = document.getElementById('startHour').value.trim();
    endHour = document.getElementById('endHour').value.trim();
    startDate = document.getElementById('startDate').value.trim();
    endDate = document.getElementById('endDate').value.trim();
    totalTime = document.getElementById('totalTime').value.trim();
    obs = document.getElementById('obs').value.trim();


    if (complementoEquipamento == "Especificacoes") {
        complementoEquipamento = "";
    }

    // Agora sim: valida
    if (!operatorName || !celulaSelecionada || !startHour || !endHour || !startDate || !endDate || !totalTime) {
        alert("Preencha todos os campos!");
        return;
    }

    if (confirm("Voce realmente deseja salvar!")) {
        salvarEquipamento();
        btnSalvar.disabled = true;
        btnSalvar.classList.add('disabled');
        alert(`Tempo de parada foi salvo por ${operatorName || "Usuario desconhecido"}`);
    }


});

function disabledBnt() {
    btnSalvar.disabled = false;
}


function salvarEquipamento() {

    fetch("https://deploy-youtube-render.onrender.com/celula/salvar", {
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json"
        },
        method: "POST",
        body: JSON.stringify({
            operatorName: operatorName,
            celulaSelecionada: celulaSelecionada,
            complementoEquipamento: complementoEquipamento,
            startHour: startHour,
            endHour: endHour,
            totalTime: totalTime,
            startDate: startDate,
            endDate: endDate,
            obs: obs

        })



    })
        .then(response => response.json())
        .then(data => {
            console.log("Dados enviados com sucesso:", data);
        })
        .catch(error => {
            console.error("Erro ao enviar os dados:", error);
        });

}

function calcularTempoParada() {
    const startHourInput = document.getElementById('startHour').value.trim();
    const endHourInput = document.getElementById('endHour').value.trim();
    const startDateInput = document.getElementById('startDate').value.trim();
    const endDateInput = document.getElementById('endDate').value.trim();

    if (startHourInput && endHourInput && startDateInput && endDateInput) {
        const inicio = new Date(`${startDateInput}T${startHourInput}`);
        const fim = new Date(`${endDateInput}T${endHourInput}`);

        const diffMs = fim - inicio;
        if (diffMs >= 0) {
            const diffHoras = diffMs / (1000 * 60 * 60);
            const horasInteiras = Math.floor(diffHoras);
            const minutos = Math.round((diffHoras - horasInteiras) * 60);

            const horasFormatadas = String(horasInteiras).padStart(2, '0');
            const minutosFormatados = String(minutos).padStart(2, '0');

            document.querySelector('#totalTime').value = `${horasFormatadas}:${minutosFormatados}`;
        } else {
            document.querySelector('#totalTime').value = '';
        }
    }
}

document.addEventListener("DOMContentLoaded", function () {
    const tabela = document.querySelector("#tabela-celulas");
    const cabecalhoParada = document.querySelector(".products-header__cell:nth-child(3)");

    cabecalhoParada.addEventListener("click", function () {
        let linhas = Array.from(tabela.querySelectorAll("tr.products-table__row"));

        linhas.sort((a, b) => {
            let tempoA = a.cells[2].innerText.trim();
            let tempoB = b.cells[2].innerText.trim();

            let segundosA = converterTempoParaSegundos(tempoA);
            let segundosB = converterTempoParaSegundos(tempoB);

            return segundosB - segundosA; // Ordenação decrescente (maior tempo primeiro)
        });

        linhas.forEach(linha => tabela.appendChild(linha)); // Reanexa as linhas na ordem correta
    });

    function converterTempoParaSegundos(tempo) {
        let partes = tempo.split(":");
        if (partes.length !== 3) return 0; // Caso algum dado esteja incompleto, retorna 0
        let [horas, minutos, segundos] = partes.map(Number);
        return horas * 3600 + minutos * 60 + segundos;
    }
});


document.getElementById('startHour').addEventListener('input', calcularTempoParada);
document.getElementById('endHour').addEventListener('input', calcularTempoParada);
document.getElementById('startDate').addEventListener('input', calcularTempoParada);
document.getElementById('endDate').addEventListener('input', calcularTempoParada);




