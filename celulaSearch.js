const search = document.getElementById('search-celula');
const tabelaCelulas = document.getElementById('tabela-celulas');
let totalTimeCell = document.getElementById('total-time');

const linha = document.querySelectorAll('.linha');

const bntDelete = document.getElementById('bnt-delete');
const bntDeleteByID = document.querySelectorAll('.delete-btn');
const bntExpandir = document.getElementById('bnt-expandir');

document.addEventListener('DOMContentLoaded', function () {
    fetch("https://deploy-youtube-render.onrender.com/celula/mostrar", {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        }
    })
        .then(response => response.json())
        .then(data => {
            console.log("Dados recebidos com sucesso!")
            const tbody = document.querySelector('.products__table tbody');
            tbody.innerHTML = "";

            let totalSegundos = 0;


            if (Array.isArray(data)) {
                data.forEach(celula => {
                    console.log("Celula:", celula);

                    if (celula.totalTime) {
                        totalSegundos += totalEmSegundos(celula.totalTime);
                    }

                    const row = document.createElement("tr");
                    row.classList.add("products-table__row");

                    row.innerHTML = `
                    <td class="products-table__cell">
                        <figure class="products-table__figure center">
                            <img class="figure__image" src="https://www.jf.ind.br/imagens/informacoes/usinagem-torno-cnc-01.webp" alt="Celula">
                        </figure>
                    </td>
                    <td class="products-header__cell">${celula.celulaSelecionada} ${celula.complementoEquipamento}</td>
                    <td class="products-header__cell">${celula.totalTime}</td>
                    <td class="products-header__cell">${celula.startDate}</td>
                    <td class="products-header__cell"><button class="expand-btn"><i
                                    class="fa-solid fa-circle-plus"></i></button>
                            <button class="delete-btn" data-id="${celula.id}"><i class="fa-regular fa-trash-can"
                                    style="color: #ff0000;"></i></button>
                        </td>
 
                `;

                    const extraRow = document.createElement("tr");
                    extraRow.classList.add("linha", "hidden");
                    extraRow.innerHTML = `
                        <td colspan="5" class="extra-info">
                            <p><strong>Nome:</strong> ${celula.operatorName}</p>
                            <p><strong>Início:</strong> ${celula.startHour}</p>
                            <p><strong>Fim:</strong> ${celula.endHour}</p>
                            <p><strong>Data Fim:</strong> ${celula.endDate}</p>
                            <div class="obs-text"><pre class="observacao"><strong>Obs:</strong> ${celula.obs}</pre></div>
                        </td>
                    `;

                    tbody.append(row);
                    tbody.append(extraRow);


                });
                console.log("Elemento totalTimeCell:", totalTimeCell);
                totalTimeCell.textContent = segundosParaTempo(totalSegundos);

            } else {
                console.error("Erro: A resposta da API não é uma lista!", data);
            }


        })
        .catch(error => console.error("Erro ao buscar dados:", error));
});

search.addEventListener('keyup', () => {
    let expression = search.value.toLowerCase();

    if (expression.length === 1) {

        return;
    }

    let lines = tabelaCelulas.getElementsByTagName('tr');
    let totalSegundos = 0;  // Recalcular totalSegundos a cada pesquisa

    for (let position in lines) {
        if (true === isNaN(position)) {
            continue;
        }

        const line = lines[position];  // Acessa a linha usando 'position'
        let lineContent = line.innerHTML.toLowerCase();

        if (lineContent.includes(expression)) {
            line.style.display = '';  // Exibe a linha

            // Pega o tempo da terceira célula (coluna) da linha
            const timeCell = line.querySelector('.products-header__cell:nth-child(3)');
            const time = timeCell ? timeCell.textContent : null;

            if (time) {
                totalSegundos += totalEmSegundos(time);
            }
        } else {
            line.style.display = 'none';  // Oculta a linha
        }
    }

    // Atualiza o total de tempo após a pesquisa
    totalTimeCell.textContent = segundosParaTempo(totalSegundos);
});


//converte tempo "hh:mm:ss" em segundos
function totalEmSegundos(time) {
    const [hours, minutes, seconds] = time.split(":").map(num => parseInt(num));
    return hours * 3600 + minutes * 60 + seconds;
}

// Função para converter segundos para o formato "hh:mm:ss"
function segundosParaTempo(totalSeconds) {
    const hours = Math.floor(totalSeconds / 3600);
    totalSeconds %= 3600;
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
}

document.addEventListener("click", (event) => {
    const botao = event.target.closest(".expand-btn"); // Identifica o botão

    if (botao) {
        let linhaAtual = botao.closest("tr"); // Linha do botão clicado
        let linhaExtra = linhaAtual.nextElementSibling; // Próxima linha

        // Se houver um espaço vazio (nó de texto), vá para a próxima linha real
        while (linhaExtra && linhaExtra.nodeType === 3) {
            linhaExtra = linhaExtra.nextElementSibling;
        }

        if (linhaExtra && linhaExtra.classList.contains("linha")) {
            linhaExtra.classList.toggle("active");
        }
    }
});

document.addEventListener('click', (event) => {
    const deleteBtn = event.target.closest(".delete-btn");
    if (deleteBtn) {
        const row = deleteBtn.closest("tr");  // Encontra a linha associada ao botão
        //  const id = row.getAttribute("data-id");  // Obtém o ID da linha (data-id)
        const id = deleteBtn.dataset.id;
        if (!id) {
            alert("ID inválido. Não foi possível deletar o registro.");
            return;
        }

        if (confirm("Excluir Registro?")) {
            // Fazendo a requisição DELETE para o servidor
            fetch(`https://deploy-youtube-render.onrender.com/celula/${id}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json"
                }
            })
                .then(response => {
                    if (response.ok) {
                        alert("Registro deletado com sucesso!");
                        row.remove();  // Remove a linha da tabela após a deleção bem-sucedida
                    } else {
                        alert("Erro ao deletar registro!");
                    }
                })
                .catch(error => {
                    console.error("Erro ao tentar deletar registro:", error);
                    alert("Ocorreu um erro ao tentar deletar o registro.");
                });
        }
    }
});



bntDelete.addEventListener('click', () => {
    if (confirm("Tem certeza que deseja deletar todos os registros?")) {
        fetch("https://deploy-youtube-render.onrender.com/celula/deletar-todos", {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json"
            }
        })
            .then(response => {
                if (response.ok) {
                    alert("Todos os registros foram deletados com sucesso!");
                } else {
                    alert("Erro ao deletar os registros!");
                }
            })

            .catch(error => {
                console.error("Erro ao tentar deletar os registros:", error);
                alert("Ocorreu um erro ao tentar deletar os registros.");
            });
    }
});

setInterval(() => {
    location.reload();
}, 300000);

