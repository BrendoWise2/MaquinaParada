const bntExpandir = document.getElementById('bnt-expandir');
let linha = document.querySelectorAll('.linha');


bntExpandir.addEventListener('click', () => {
    linha.forEach((linha => {
        linha.classList.toggle('active')
        console.log('w');
    }));

});