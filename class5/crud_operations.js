import { Client, Product, Sale, ItemSale, clientes, produtos, vendas, itensVenda  } from "./database.js";
import { rl, numeroInteiroValido } from "./utils.js";


export class CRUD {
    constructor() {
        this.idNextClient = 1;
        this.idNextProduct = 1;
        this.idNextSale = 1;
    };

    async createClient () {
        try {
            let name = await rl.question("\nDigite o nome do cliente: ");
            const newClient = new Client(this.idNextClient, name);
            clientes.set(this.idNextClient, newClient);
            console.log("Novo cliente adicionado!\n");
            this.idNextClient += 1;
        } catch (erro) {
            console.log(`Erro: ${erro.message}`);
        };
    };


    readClients () {
        console.log("\n------ Clientes cadastrados -----");
        if (clientes.size === 0) {
            console.log("Nenhum registro");
        }
        for (const [id, client] of clientes) {
            console.log(`ID: ${id} | Nome: ${client.name}`);
        }
        console.log("");

    };


    async createProduct () {
        try {
            let name = await rl.question("\nDigite o nome do produto: ");
            let price = Number(await rl.question("Digite o preço do produto: "));
            let stock = Number(await rl.question("Digite o estoque do produto: "));
            const newProduct = new Product(this.idNextProduct, name, price, stock);
            produtos.set(this.idNextProduct, newProduct);
            console.log("Novo produto adicionado!\n");
            this.idNextProduct += 1;
        } catch (erro) {
            console.log(`Erro: ${erro.message}`);
        };
    };


    readProducts () {
        console.log("\n------ Produtos cadastrados -----");
        if (produtos.size === 0) {
            console.log("Nenhum registro");
        };

        for (const [id, product] of produtos) {
            console.log(`ID: ${id} | Nome: ${product.name} | Preço: ${product.price} | Estoque: ${product.stock}`);
        };

        console.log("");
    };



    async createSale () {
        try {
            let idClient = Number(await rl.question("\nDigite o ID do cliente: "));

            if (!clientes.get(idClient)) {
                throw new Error("\nCliente não existe!");
            };

            let inx = 1;
            while (true) {
                const input = await rl.question(`Digite o ID do produto ${inx} (pressione ENTER para sair): `);
                inx += 1;
                const idProduct = Number(input);
            
                if (input.trim() === "") {
                    break; // Sai do loop se der ENTER sem digitar nada
                };

                if (!produtos.get(idProduct)) {
                    throw new Error("Produto não existe");
                };

                const qtd = await numeroInteiroValido("Digite a quantidade do produto: ");
                const product = produtos.get(idProduct);
                const unitPrice = product.price;
                let stock = product.stock;

                if (qtd > stock || stock === 0) {
                    throw new Error("Não há estoque suficiente do produto");
                };

                let newItemSale = new ItemSale(this.idNextSale, idProduct, qtd, unitPrice);
                itensVenda.set([this.idNextSale, idClient], newItemSale);
                stock -= qtd;
                product.stock = stock;
            };

            let status = await rl.question("Digite o status da venda: ");
            const newSale = new Sale(this.idNextSale, idClient, status);
            vendas.set(this.idNextSale, newSale);
            this.idNextSale += 1;
            console.log("Venda cadastrada!\n");
        } catch (erro) {
            console.log(`Erro: ${erro.message}`);
        };
    };


    async cancelSale() {
        const idVenda = Number(await rl.question("\nDigite o ID da venda que deseja cancelar: "));

        if (!vendas.has(idVenda)) {
            console.log("Erro: Venda não encontrada!");
            return;
        };

        console.log(`\nIniciando cancelamento da Venda #${idVenda}...`);

        try {

            for (const [[idV, idP], item] of itensVenda) {
                if (idV === idVenda) {
                    const produto = produtos.get(idP);

                    if (produto) {
                        produto.stock += item.qtd;
                    };
                };
            };

            for (const [key] of itensVenda) {
                if (key[0] === idVenda) {
                    itensVenda.delete(key);
                };
            };

            vendas.delete(idVenda);
            console.log(`\nVenda #${idVenda} cancelada com sucesso e estoque atualizado!\n`);

        } catch (error) {
            console.log(`Erro: ${error.message}`);
        };
    };


    readSales () {
        console.log("\n------- Relatório de vendas -------");
        if (vendas.size === 0) {
            console.log("Nenhuma venda registrada.");
            console.log("");
        };
        for (const [id, sale] of vendas) {
            console.log(`ID: ${id} | IDCliente: ${sale.idClient} | Nome Cliente: ${clientes.get(sale.idClient).name} | Data: ${sale.date} | Status: ${sale.status}`);
            let totalSale = 0;
            for (const [[idSale, idProduct], itenSale] of itensVenda) {
                if (idSale === id) {
                    console.log(`   IDProduto: ${idProduct} | Nome: ${produtos.get(idProduct).name} | Quantidade: ${itenSale.qtd} | Preço Unitário: ${itenSale.unitPrice} | Subtotal: ${itenSale.subtotal}`);
                    totalSale += itenSale.subtotal;
                };
            };
            console.log(`   Total Venda: ${totalSale}\n`);
        };
    };


    productRank() {
        const totaisPorProduto = new Map();

        for (const [[idSale, idProduct], item] of itensVenda) {
            const totalAtual = totaisPorProduto.get(idProduct) || 0;
            totaisPorProduto.set(idProduct, totalAtual + item.subtotal);
        };

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

        console.log("\n------- Ranking de produtos (Por Faturamento) -------");
        if (rankingArray.length === 0) {
            console.log("Nenhuma venda registrada.");
        } 
        rankingArray.forEach((item, index) => {
            console.log(`${index + 1}º | ${item.nome} | Total: R$ ${item.totalVendido}`);
        });

        console.log("");
    };
};