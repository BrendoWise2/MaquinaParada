document.addEventListener("DOMContentLoaded", function () {
    fetch("http://localhost:8080/celula/mostrar", {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        }
    })

        .then(response => response.json())
        .then(data => {
            console.log('Dados recebidos com sucesso!');
            const tbody = document.querySelector('.products__table tbody');
            tbody.innerHTML = "";

            if (Array.isArray(data)) {
                data.forEach(celula => {
                    console.log("Celula:", celula);

                    const row = document.createElement("tr");
                    row.classList.add("products-table__row");

                    row.innerHTML = `
                    <td class="products-table__cell">
                        <figure class="products-table__figure center">
                            <img class="figure__image" src="https://www.jf.ind.br/imagens/informacoes/usinagem-torno-cnc-01.webp" alt="Celula">
                        </figure>
                    </td>
                    <td class="products-header__cell">${celula.operatorName}</td>
                    <td class="products-header__cell">${celula.totalTime}</td>
                    <td class="products-header__cell">${celula.startDate}</td>
                    <td class="products-header__cell">
                        <button><i class="fa-solid fa-circle-plus"></i></button>
                    </td>
                `;

                    tbody.append(row);
                });
            } else {
                console.error("Erro: A resposta da API não é uma lista!", data);
            }
        })
        .catch(error => console.error("Erro ao buscar dados:", error));
});

