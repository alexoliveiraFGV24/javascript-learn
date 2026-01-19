import { consoleUI } from "./src/consoleUI.js";

async function main() {
    consoleUI();
};

// Adicionando uma validação de erro fatal no sistema
main().catch(err => {
    console.error("Erro fatal: ", err);
    process.exit(1);
});