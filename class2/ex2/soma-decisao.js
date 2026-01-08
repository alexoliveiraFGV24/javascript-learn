import { sum } from '../ex1/utils.js';
import readline from 'node:readline';

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

try {
    rl.question("Digite um número: ", (num1) => {
        while (soma < 100) {
            rl.question("Digite outro número: ", (num2) => {

                let a = Number(num1);
                let b = Number(num2);
                let soma = sum(a, b);

                // Primeira versão
                // if (soma < 100) {
                //     soma = 0;
                // };

                // Segunda versão
                
                rl.question("Digite outro número: ", (num2) => {
                    a = num2;
                    soma = sum(a, b);
                    rl.close();
                });

                console.log(soma);

                rl.close();
            });
        };
    });

} catch (erro) {
    console.log(`Erro: ${erro.message}`);
};