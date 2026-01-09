import readline from "node:readline/promises";
import { pedirNumeroValido } from "./utils.js";


// Estrutura do readline
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});


try {
    // No seu código principal, fica apenas isso:
    let num1 = await pedirNumeroValido("Digite o primeiro número (0-10): ", 0, 10);
    let num2 = await pedirNumeroValido("Digite o segundo número (0-10): ", 0, 10);

    // Passar para inteiro (Math.floor é mais seguro)
    console.log("\nArrendondando os números para baixo\n")
    num1 = Math.floor(num1);
    num2 = Math.floor(num2);

    // Definindo um array (só para ficar mais legível)
    const nums = [num1, num2];  
        
    // Operações lógicas (percorrendo um array)
    for (const num of nums) {
        if (num % 2 === 0) {
            console.log(`Falta ${100 - num} para ${num} (arredondado) chegar a 100!`);
        } else {
            console.log(`Falta ${0 - num} para ${num} (arredondado) chegar a 0!`);
        };
    }

// Se tiver algum erro de validação
} catch (erro) {
    console.log(erro.message);

// Encerra o programa
} finally {
    rl.close();
    console.log("\nFim do programa!");  
};