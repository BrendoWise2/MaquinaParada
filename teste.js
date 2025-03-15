// O array com os dados
const dados = [
    {
        "id": 1,
        "operatorName": "Brendo",
        "celulaSelecionada": "Celula 01",
        "startHour": "21:10:00",
        "endHour": "21:30:00",
        "totalTime": "00:20:00",
        "startDate": "2025-02-22",
        "endDate": "2025-02-26"
    },
    {
        "id": 22,
        "operatorName": "Brendo",
        "celulaSelecionada": "Celula 01",
        "startHour": "08:10:00",
        "endHour": "12:30:00",
        "totalTime": "03:30:00",
        "startDate": "2025-02-22",
        "endDate": "2025-02-26"
    },
    {
        "id": 23,
        "operatorName": "Brendo",
        "celulaSelecionada": "celula08",
        "startHour": "09:22:00",
        "endHour": "09:22:00",
        "totalTime": "09:22:00",
        "startDate": "2025-03-08",
        "endDate": "2025-03-10"
    },
    {
        "id": 24,
        "operatorName": "Brendo",
        "celulaSelecionada": "celula13",
        "startHour": "09:42:00",
        "endHour": "11:42:00",
        "totalTime": "12:43:00",
        "startDate": "2025-03-12",
        "endDate": "2025-03-12"
    },
    {
        "id": 25,
        "operatorName": "Brendo",
        "celulaSelecionada": "celula08",
        "startHour": "10:53:00",
        "endHour": "10:54:00",
        "totalTime": "10:54:00",
        "startDate": "2025-03-08",
        "endDate": "2025-03-08"
    }
];

// Função para converter tempo "hh:mm:ss" para segundos
function tempoEmSegundos(tempo) {
    const [horas, minutos, segundos] = tempo.split(":").map(num => parseInt(num));
    return horas * 3600 + minutos * 60 + segundos;
}

// Função para converter segundos para o formato "hh:mm:ss"
function segundosParaTempo(segundos) {
    const horas = Math.floor(segundos / 3600);
    segundos %= 3600;
    const minutos = Math.floor(segundos / 60);
    segundos %= 60;
    return `${String(horas).padStart(2, '0')}:${String(minutos).padStart(2, '0')}:${String(segundos).padStart(2, '0')}`;
}

// Função para calcular o tempo total para a célula específica
function calcularTempoTotal(celula) {
    let totalSegundos = 0;

    // Filtra os dados para a célula selecionada e soma os tempos
    dados.filter(item => item.celulaSelecionada === celula)
        .forEach(item => {
            if (item.totalTime) {
                totalSegundos += tempoEmSegundos(item.totalTime);
            }
        });

    // Converte o tempo total de volta para o formato "hh:mm:ss"
    return segundosParaTempo(totalSegundos);
}

// Calcula o tempo total para "celula08"
const tempoTotal = calcularTempoTotal('celula08');

// Exibe o resultado no frontend
document.getElementById('total-time-cell').innerText = `Tempo total de paradas: ${tempoTotal}`;