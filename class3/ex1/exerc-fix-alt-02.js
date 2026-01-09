import readline from "node:readline/promises";

// Estrutura do readline
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

/* 
Função que garante um número válido no intervalo
Tem que ter o async por conta do await do readline
*/
async function pedirNumeroValido(mensagem, min, max) {
    while (true) {

        // Pegando o input do usuário
        const resposta = await rl.question(mensagem);
        const num = Number(resposta);

        // Opção de saída imediata
        if (num === -1) {
            console.log("Fim do programa.");
            process.exit(0);
        };

        // Validação
        if (!Number.isNaN(num) && num >= min && num <= max) {
            return num; // Retorna o número e sai do loop interno
        };

        console.log(`Erro: Digite um número entre ${min} e ${max} (ou -1 para sair).`);
    }
}


try {
    // No seu código principal, fica apenas isso:
    let num1 = await pedirNumeroValido("Digite o primeiro número (0-10): ", 0, 10);
    let num2 = await pedirNumeroValido("Digite o segundo número (0-10): ", 0, 10);

    // Passar para inteiro (Math.floor é mais seguro)
    console.log("\nArrendondando os números para baixo")
    num1 = Math.floor(num1);
    num2 = Math.floor(num2);

    // Operações lógicas (meio força bruta)
    if (num1 % 2 === 0) {
        console.log(`Faltam ${100 - num1} para ${num1} (arredondado) chegar a 100!`);
    };
    if (num1 % 2 === 1) {
        console.log(`Faltam ${0 - num1} para ${num1} (arredondado) chegar a 0!`);
    };
    if (num2 % 2 === 0) {
        console.log(`Faltam ${100 - num2} para ${num2} (arredondado) chegar a 100!`);
    };
    if (num2 % 2 === 1) {
        console.log(`Faltam ${0 - num2} para ${num2} (arredondado) chegar a 0!`);
    };

// Se tiver erro
} catch (erro) {
    console.log(erro.message);

// Fecha o programa
} finally {
    rl.close();
    console.log("Fim do programa!");  
};