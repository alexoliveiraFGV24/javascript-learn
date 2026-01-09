import readline from "node:readline/promises";

// Estrutura do readline
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

try {

    // Input do usuário
    let num1 = Number(await rl.question("Digite um número entre 0 e 10 (se for float, o programa irá arredondar): "));
    let num2 = Number(await rl.question("Digite outro número entre 0 e 10 (se for float, o programa irá arredondar): "));

    // Validação do exercício
    while (Number.isNaN(num1) || Number.isNaN(num2) || num1 > 10 || num1 < 0 || num2 > 10 || num2 < 0) {

        // Encerrando o programa
        if (num1 === -1 || num2 === -1) {
            console.log("Fim do programa!");
            process.exit(0);
        };
        
        // Pedindo para digitar novamente
        console.log("Você deve digitar números entre 0 e 10! Digite novamente!\n");
        if (Number.isNaN(num1) || num1 > 10 || num1 < 0) {
            num1 = Number(await rl.question("Primeiro número foi digitado incorretamente. Digite novamente: "));
        }
        if (Number.isNaN(num2) || num2 > 20 || num2 < 0) {
            num2 = Number(await rl.question("Segundo número foi digitado incorretamente. Digite novamente: "));
        }
    };

    // Passar para inteiro (Math.floor é mais seguro)
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

// Caso tenha erro
} catch (erro) {
    console.log(erro.message);

// Fecha o programa
} finally {
    rl.close();
    console.log("Fim do programa!");  
};