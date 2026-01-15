import readline from "node:readline/promises";


export const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});


export async function numeroInteiroValido(mensagem) {
    while (true) {
        const num = Number(await rl.question(mensagem));

        if (!Number.isNaN(num)) {
            return num;
        }
        
        console.log(`\nErro: Você digitou uma string!\n`);
    }
}