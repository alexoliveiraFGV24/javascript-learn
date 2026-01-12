const display = document.getElementById("resultado");
let mensagem = "A cidade é classificada como";


const habitantes = Number(prompt("Digite o número de habitantes da sua cidade: "));
if (!Number.isNaN(habitantes) && Number.isInteger(habitantes) ) {
    if (habitantes < 0) {
        display.innerHTML = `<p style="color: red;">Erro: Digite um número inteiro não negativo</p>`;
    } else {

        if (habitantes <= 100000) {
            display.innerHTML = `<p>${mensagem} cidade de pequeno porte.</p>`;
        } else if (habitantes <= 500000) {
            display.innerHTML = `<p>${mensagem} cidade de médio porte.</p>`;
        } else if (habitantes <= 1000000) {
            display.innerHTML = `<p>${mensagem} cidade de grande porte.</p>`;
        } else {
            display.innerHTML = `<p>${mensagem} megacidade.</p>`;
        }

    };
} else {
    display.innerHTML = `<p style="color: red;">Erro: Digite um número inteiro não negativo</p>`;
};