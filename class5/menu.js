import readline from "node:readline/promises";


const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});


async function numeroInteiroValido(mensagem) {
    while (true) {
        const num = Number(await rl.question(mensagem));

        if (!Number.isNaN(num)) {
            return num;
        }
        
        console.log(`\nErro: Você digitou uma string!\n`);
    }
}

// Menu Principal
while (true) {
    console.log("--- MENU ---");
    console.log("1. Cadastrar cliente");
    console.log("2. Cadastrar produto");
    console.log("3. Listar clientes");
    console.log("4. Listar produtos");
    console.log("5. Criar venda");
    console.log("6. Cancelar venda");
    console.log("7. Relatório de vendas");
    console.log("8. Rankig de produtos");
    console.log("9. Sair");
    
    let action = await numeroInteiroValido("Digite sua ação: ", 1, 3);

    switch (action) {
        case 9:
            console.log("\nSaindo do sistema de vendas...");
            rl.close(); // Fecha a interface do readline
            process.exit(0);
        default:
            // Como numeroInteiroValido já filtra 1-3, o default tecnicamente nem é alcançado aqui
            console.log("\nErro: Digite um número inteiro entre 1 e 9\n");
            break;
    }
}