let machineId = null; // Variável para armazenar o ID da parada
let btnSalvar = document.querySelector('#salvarButton');
let celulaSelecionada, operatorName;
let startHour, endHour, totalTime;
let startDate, endDate, ge;
let obs;

let select = document.getElementById('complemento-equipamento');

const max = 47;

for (let i = 1; i <= max; i++) {
    const option = document.createElement('option');
    const value = i.toString().padStart(2, '0');
    option.value = value;
    option.textContent = value;
    select.appendChild(option);
}



btnSalvar.addEventListener('click', function () {

    operatorName = document.getElementById('operator').value.trim();
    celulaSelecionada = document.getElementById('celulas').value.trim();
    complementoEquipamento = document.getElementById('complemento-equipamento').value.trim();
    console.log(complementoEquipamento);
    startHour = document.getElementById('startHour').value.trim();
    endHour = document.getElementById('endHour').value.trim();
    startDate = document.getElementById('startDate').value.trim();
    endDate = document.getElementById('endDate').value.trim();
    totalTime = document.getElementById('totalTime').value.trim();
    obs = document.getElementById('obs').value.trim();

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



