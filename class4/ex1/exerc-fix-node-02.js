import readline from "node:readline/promises";

// Fazendo a estrutura do readline
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

// Criando a base da mensagem
let mensagem = "A cidade é classificada como ";


// Fazendo um loop para classificar os habitantes
while (true) {

    // Input do usuário
    const habitantes = Number(await rl.question("Digite o número de habitantes da sua cidade: "));

    // Validações
    if (!Number.isNaN(habitantes) && Number.isInteger(habitantes) && habitantes > 0) {

        // Operações com if. else if e else
        if (habitantes <= 100000) {
            console.log(mensagem + "cidade de pequeno porte.");
        } else if (habitantes <= 500000) {
            console.log(mensagem + "cidade de médio porte.");
        } else if (habitantes <= 1000000) {
            console.log(mensagem + "cidade de grande porte.");
        } else {
            console.log(mensagem + "megacidade.");
        };

        // Encerrando o processo
        process.exit(0);  // Nesse caso, equivale a rl.close();

    } else {
        console.log("\nErro: Digite um número inteiro positivo");
    };
};