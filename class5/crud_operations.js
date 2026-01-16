import { Client, Product, Sale, ItemSale, clientes, produtos, vendas, itensVenda  } from "./database.js";
import { rl, numeroInteiroValido } from "./utils.js";


let idNextClient = 0;
export async function createClient () {
    try {
        let name = await rl.question("\nDigite o nome do cliente: ");
        const newClient = new Client(idNextClient, name);
        clientes.set(idNextClient, newClient);
        console.log("Novo cliente adicionado!\n");
        idNextClient += 1;
    } catch (erro) {
        console.log(`Erro: ${erro.message}`)
    }
};


export function readClients () {
    for (const [id, client] of clientes) {
        console.log(`ID: ${id} | Nome: ${client.name}`);
    }
};


let idNextProduct = 0; 
export async function createProduct () {
    try {
        let name = await rl.question("Digite o nome do produto: ");
        let price = Number(await rl.question("Digite o preço do produto: "));
        let stock = Number(await rl.question("Digite o estoque do produto: "));
        const newProduct = new Product(idNextProduct, name, price, stock);
        produtos.set(idNextProduct, newProduct);
        idNextProduct += 1;
    } catch (erro) {
        console.log(`Erro: ${erro.message}`)
    }
};


export function readProducts () {
    for (const [id, product] of produtos) {
        console.log(`ID: ${id} | Nome: ${product.name} | Preço: ${product.price} | Estoque: ${product.stock}`)
    }
};



let idNextSale = 0; 
export async function createSale () {
    try {
        let idClient = Number(await rl.question("Digite o ID do cliente: "));

        if (!clientes.get(idClient)) {
            throw new Error("Cliente não existe!")
        }

        let status = Boolean(await rl.question("Digite o status da venda: "));
        const newSale = new Sale(idNextSale, idClient, status);
        vendas.set(idNextSale, newSale);

        let inx = 1;
        while (true) {
            const input = await rl.question(`Digite o ID do produto ${inx} (pressione ENTER para sair): `);
            inx += 1;
            const idProduct = Number(input);
        
            if (input.trim() === "") {
                break; // Sai do loop se der ENTER sem digitar nada
            };

            if (!produtos.get(idProduct)) {
                throw new Error("Produto não existe")
            };

            const qtd = await numeroInteiroValido("Digite a quantidade do produto: ");
            const product = produtos.get(idProduct);
            const unitPrice = product.price;
            let stock = product.stock;

            if (qtd > stock || stock === 0) {
                throw new Error("Não há estoque suficiente do produto")
            }

            let newItemSale = new ItemSale(idNextSale, idProduct, qtd, unitPrice);
            itensVenda.set([idNextSale, idClient], newItemSale);
            stock -= qtd;
        }

        idNextSale += 1;
    } catch (erro) {
        console.log(`Erro: ${erro.message}`)
    }
};


export async function cancelSale() {
    const idVenda = Number(await rl.question("Digite o ID da venda que deseja cancelar: "));

    // 1. Verificar se a venda existe
    if (!vendas.has(idVenda)) {
        console.log("Erro: Venda não encontrada!");
        return;
    }

    console.log(`\nIniciando cancelamento da Venda #${idVenda}...`);

    try {

        for (const [[idV, idP], item] of itensVenda) {
            if (idV === idVenda) {
                const produto = produtos.get(idP);

                if (produto) {
                    produto.stock += item.qtd;
                }
            }
        }

        for (const [key] of itensVenda) {
            if (key[0] === idVenda) {
                itensVenda.delete(key);
            }
        }

        vendas.delete(idVenda);
        console.log(`\nVenda #${idVenda} cancelada com sucesso e estoque atualizado!`);

    } catch (error) {
        console.log(`Erro: ${error.message}`);
    }
}


export function readSales () {
    console.log("------- Relatório de vendas -------\n")
    if (vendas.length === 0) {
        console.log("Nenhuma venda registrada.");
    }
    for (const [id, sale] of vendas) {
        console.log(`ID: ${id} | IDCliente: ${sale.idClient} | Nome Cliente: ${clientes.get(sale.idClient).name} | Data: ${sale.date} | Status: ${id.status}`);
        let totalSale = 0;
        for (const [[idSale, idProduct], itenSale] of itensVenda) {
            if (idSale === id) {
                console.log(`   IDProduto: ${idProduct} | Nome: ${produtos.get(idProduct).name} | Quantidade: ${itenSale.qtd} | Preço Unitário: ${itenSale.unitPrice} | Subtotal: ${itenSale.subtotal}`)
                totalSale += itenSale.subtotal;
            };
        };
        console.log(`   Total Venda: ${totalSale}\n`)
    }
};


export function productRank() {
    const totaisPorProduto = new Map();

    for (const [[idSale, idProduct], item] of itensVenda) {
        const totalAtual = totaisPorProduto.get(idProduct) || 0;
        totaisPorProduto.set(idProduct, totalAtual + item.subtotal);
    }

    // 3. Transformamos em um Array para poder ordenar (Ranking)
    const rankingArray = Array.from(totaisPorProduto.entries())
        .map(([id, total]) => {
            const prod = produtos.get(id);
            return {
                id: id,
                nome: prod ? prod.name : "Desconhecido",
                totalVendido: total
            };
        })
        .sort((a, b) => b.totalVendido - a.totalVendido);

    console.log("\n------- Ranking de produtos (Por Faturamento) -------\n");
    if (rankingArray.length === 0) {
        console.log("Nenhuma venda registrada.");
    } 
    rankingArray.forEach((item, index) => {
        console.log(`${index + 1}º | ${item.nome} | Total: R$ ${item.totalVendido}`);
    });
}