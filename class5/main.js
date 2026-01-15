import { rl, numeroInteiroValido } from "./utils.js";
import * as CRUD from "./crud_operations.js" 

async function main () {

    // Menu Principal
    while (true) {
        console.log("--- MENU ---");
        console.log("1. Cadastrar cliente");
        console.log("2. Cadastrar produto");
        console.log("3. Cadastrar venda");
        console.log("4. Listar clientes");
        console.log("5. Listar produtos");
        console.log("6. Listar vendas");
        console.log("7. Cancelar venda");
        console.log("8. Relatório de vendas");
        console.log("9. Rankig de produtos");
        console.log("10. Sair");
        
        let action = await numeroInteiroValido("Digite sua ação: ", 1, 10);

        switch (action) {
            case 1:
                await CRUD.createClient();
                break;
            case 2:
                await CRUD.createProduct();
                break;
            case 3:
                await CRUD.createSale();
                break;
            case 4:
                await CRUD.readClients();
                break;
            case 5:
                await CRUD.readProducts();
                break;
            case 6:
                await CRUD.readSales();
                break;
            case 10:
                console.log("\nSaindo do sistema de vendas...");
                rl.close(); // Fecha a interface do readline
                process.exit(0);
            default:
                // Como numeroInteiroValido já filtra 1-3, o default tecnicamente nem é alcançado aqui
                console.log("\nErro: Digite um número inteiro entre 1 e 9\n");
                break;
        }
    }
};

main();

// Initialize
// Mostra o menu
// Rodar o processamento do CRUD com input
// Sair 

// Buscar cliente estará em listar clientes
// Buscar produto estará em listar produtos