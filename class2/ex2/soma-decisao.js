import { sum } from '../ex1/utils.js';
import readline from 'node:readline/promises'; // Importante: Esse promises é a versão do readline que permite esperar a entrada do usuário

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

try {

    // await serve para esperar até o o usuário digitar alguma coisa. Depois, o programa continua
    let a = Number(await rl.question("Digite um número: "));
    let b = Number(await rl.question("Digite outro número: "));
    let soma = sum(a, b);

    while (soma < 100) {
        let newNum = Number(await rl.question("Digite mais um número: "));
        soma = sum(soma, newNum);
    };

    console.log(`Meta atingida! Soma atual é ${soma}`);

} catch (erro) {
    console.log(`Erro: ${erro.message}`);
} finally {
    rl.close();
};