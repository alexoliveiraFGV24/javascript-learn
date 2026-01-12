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
    if (!Number.isNaN(habitantes) && Number.isInteger(habitantes) ) {
        if (habitantes < 0) {
            console.log("\nErro: Digite um número inteiro não negativo");
        } else {

            // Operações com if. else if e else
            if (habitantes <= 100000) {
                console.log(mensagem + "cidade de pequeno porte.");
                process.exit(0);
            } else if (habitantes <= 500000) {
                console.log(mensagem + "cidade de médio porte.");
                process.exit(0);
            } else if (habitantes <= 1000000) {
                console.log(mensagem + "cidade de grande porte.");
                process.exit(0);
            } else {
                console.log(mensagem + "megacidade.");
                process.exit(0);
            }

        };
    } else {
        console.log("\nErro: Digite um número inteiro não negativo");
    };
};