const display = document.getElementById("resultado");  // Pegando a div para colocar os resultados
let mensagem = "A cidade é classificada como";  // Mensagem padrão

// Pegando o input do usuário
const habitantes = Number(prompt("Digite o número de habitantes da sua cidade: "));

// Validações
if (!Number.isNaN(habitantes) && Number.isInteger(habitantes) ) {
    if (habitantes < 0) {
        display.innerHTML = `<p style="color: red;">Erro: Digite um número inteiro não negativo</p>`;
    } else {
        
        // Operações com if. else if e else
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