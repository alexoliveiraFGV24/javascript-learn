import { sum, subtraction, product, division } from './utils.js';
import readline from 'node:readline';  // Tenho que usar isso por conta do export das funções no módulo utils

try {

    // Usamos o módulo nativo 'readline' para ler a entrada do teclado
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });

    // Pegando o input do usuário e processando as operações
    rl.question('Digite um número: ', (num1) => {
        rl.question('Digite outro número: ', (num2) => {

            // Pegando o input do usuário
            const a = Number(num1);
            const b = Number(num2);

            // Armazenando as variáveis dos cálculos
            const c = sum(a, b);
            const d = subtraction(a, b);
            const e = product(a, b);
            const f = division(a, b);

            // Imprimindo as operações (aproximação em 3 casas decimais por conta da mantissa do computador) (se quiser pode retirar)
            console.log(`Os números escolhidos foram: ${a} e ${b}`);
            console.log(`A soma é: ${c.toPrecision(3)}`);
            console.log(`A subtração é: ${d.toPrecision(3)}`);
            console.log(`A multiplicação é: ${e.toPrecision(3)}`);
            console.log(`A divisão é: ${f.toPrecision(3)}`);
            
            // Fechando a estrutura
            rl.close();
        });
    });

// Caso ocorro algum erro
} catch (erro) {
    console.log(`Erro: ${erro.message}`);
}