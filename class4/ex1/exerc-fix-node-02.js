import readline from "node:readline/promises";


const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

let mensagem = "A cidade é classificada como ";


while (true) {
    const habitantes = Number(await rl.question("Digite o número de habitantes da sua cidade: "));

    if (!Number.isNaN(habitantes) && Number.isInteger(habitantes) ) {
        if (habitantes < 0) {
            console.log("\nErro: Digite um número inteiro não negativo");
        } else {

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