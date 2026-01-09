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
export async function pedirNumeroValido(mensagem, min, max) {
    while (true) {

        // Pegando o input do usuário
        const resposta = await rl.question(mensagem);
        const num = Number(resposta);

        // Opção de saída imediata
        if (num === -1) {
            console.log("\nFim do programa.");
            process.exit(0);  // Sai do Node
        };

        // Validação
        if (!Number.isNaN(num) && num >= min && num <= max) {
            return num; // Retorna o número e sai do loop interno
        };

        console.log(`\nErro: Digite um número entre ${min} e ${max} (ou -1 para sair).`);
    }
}