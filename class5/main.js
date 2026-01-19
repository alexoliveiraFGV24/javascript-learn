import { rl, numeroInteiroValido } from "./utils.js";
import { CRUD } from "./crud_operations.js";

const system = new CRUD();

async function main () {

    // Menu Principal
    while (true) {
        console.log("--- MENU ---");
        console.log("1. Cadastrar cliente");
        console.log("2. Cadastrar produto");
        console.log("3. Cadastrar venda");
        console.log("4. Listar clientes");
        console.log("5. Listar produtos");
        console.log("6. Cancelar venda");
        console.log("7. Relatório de vendas");
        console.log("8. Rankig de produtos");
        console.log("0. Sair");
        
        let action = await numeroInteiroValido("Digite sua ação: ", 1, 9);

        switch (action) {
            case 1:
                await system.createClient();
                break;
            case 2:
                await system.createProduct();
                break;
            case 3:
                await system.createSale();
                break;
            case 4:
                system.readClients();
                break;
            case 5:
                system.readProducts();
                break;
            case 6:
                await system.cancelSale();
                break;
            case 7:
                system.readSales();
                break;
            case 8:
                system.productRank();
                break;
            case 0:
                console.log("\nSaindo do sistema de vendas...");
                rl.close(); // Fecha a interface do readline
                process.exit(0);
            default:
                console.log("\nErro: Digite um número inteiro entre 1 e 9\n");
                break;
        };
    };
};

main();