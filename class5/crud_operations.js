import { Client, Product, Sale, ItemSale, clientes, produtos, vendas, itensVenda  } from "./database.js";
import { rl, numeroInteiroValido } from "./utils.js"


let idNextClient = 0;
export async function createClient () {
    let name = await rl.question("\nDigite o nome do cliente: ");
    const newClient = new Client(idNextClient, name);
    clientes.set(idNextClient, newClient);
    console.log("Novo cliente adicionado!\n");
    idNextClient += 1;
};


export function readClients () {
    for (const [id, client] of clientes) {
        console.log(`ID: ${id} | Nome: ${client.name}`);
    }
};


export async function updateClient () {
    let id = await rl.question("Digite o ID do cliente: ");

    if (clientes.has(id)) {
        console.log(`Nome do cliente: ${clientes[id].name}`)
        let newName = await rl.question("Digite o novo nome do cliente (se não quiser mudar, digite o mesmo nome): ");
        if (newName !== "" && Number.isNaN(newName)) {
            clientes[id] = new Client(id, newName);
        }
        
    } else {
        throw new Error("O cliente não existe!");
    };
};


let idNextProduct = 0; 
export async function createProduct () {
    let name = await rl.question("Digite o nome do produto: ");
    let price = Number(await rl.question("Digite o preço do produto: "));
    let stock = Number(await rl.question("Digite o estoque do produto: "));
    const newProduct = new Product(idNextProduct, name, price, stock);
    produtos.set(idNextProduct, newProduct);
    idNextProduct += 1;
};


export function readProducts () {
    for (const [id, product] of produtos) {
        console.log(`ID: ${id} | Nome: ${product.name} | Preço: ${product.price} | Estoque: ${product.stock}`)
    }
};


export async function updateProduct () {
    let id = await rl.question("Digite o ID do produto: ");

    if (produtos.has(id)) {
        console.log(`Nome do produto: ${produtos[id].name}`)
        console.log(`Preço do produto: ${produtos[id].price}`)
        console.log(`Estoque do produto: ${produtos[id].stock}`)
        let newName = await rl.question("Digite o novo nome do produto (se não quiser mudar, dê ENTER): ");
        let newPrice = Number(await rl.question("Digite o novo preço do produto (se não quiser mudar, dê ENTER): "));
        let newStock = Number(await rl.question("Digite o novo nome do produto (se não quiser mudar, dê ENTER): "));
        produtos[id] = new Product(id, newName, newPrice, newStock);
    } else {
        throw new Error("O produto não existe!");
    };
};


let idNextSale = 0; 
export async function createSale () {
    let idClient = Number(await rl.question("Digite o nome do cliente: "));
    let date = await rl.question("Digite a data da venda: ");
    let status = Boolean(await rl.question("Digite o status da venda: "));
    const newSale = new Sale(idNextSale, idClient, date, status);
    vendas.set(idNextSale, newSale);
    idNextSale += 1;
};


export function readSales () {
    console.log("Tabela de vendas:")
    for (const [id, sale] of vendas) {
        console.log(`ID: ${id} | `)
    }

    console.log("\nTabela de itens das vendas:")
    for (const [id, sale] of itensVenda) {
        console.log(`ID: ${id} | `)
    }
};


export function updateSale () {

};