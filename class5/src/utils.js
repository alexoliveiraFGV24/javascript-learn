import readline from "node:readline/promises";


// Interface para input do usuário
export const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});


// Função auxiliar para validar um número inteiro não negativo
export async function numeroInteiroValido(mensagem) {
    while (true) {
        const num = Number(await rl.question(mensagem));

        if (!Number.isNaN(num) && num >= 0 && Number.isInteger(num)) {
            return num;
        }
        
        console.log(`\nErro: Você não digitou um número inteiro!\n`);
    }
};