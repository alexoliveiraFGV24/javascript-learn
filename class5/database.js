export const clientes = new Map();
export const produtos = new Map();
export const vendas = new Map();
export const itensVenda = new Map();


export class Client {
    constructor(id, name) {

        if (id < 0 || !Number.isInteger(id)) {
            throw new Error("O id do cliente não está definido corretamente!");
        };

        if (!name || typeof name !== "string") {
            throw new Error("O nome do cliente não está definido corretamente!");
        };

        this.id = id;
        this.name = name;
    };
};


export class Product {
    constructor(id, name, price, stock) {
        if (id < 0 || !Number.isInteger(id)) {
            throw new Error("O id do produto não está definido corretamente!");
        };

        if (!name || typeof name !== "string") {
            throw new Error("O nome do produto não está definido corretamente");
        };

        if (price <= 0 || Number.isNaN(price)) {
            throw new Error("O preço do produto não está definido corretamente");
        };

        if (stock < 0 || !Number.isInteger(stock) || Number.isNaN(price)) {
            throw new Error("O estoque do produto não está definido corretamente");
        };

        this.id = id;
        this.name = name;
        this.price = price;
        this.stock = stock;
    };
};


export class Sale {
    constructor(id, idClient, status) {
        if (id < 0 || !Number.isInteger(id)) {
            throw new Error("O id da venda não está definida corretamente!");
        };

        if (idClient < 0 || !Number.isInteger(idClient)) {
            throw new Error("O id do cliente não foi digitado corretamente");
        };

        if (status != "ABERTA" && status != "FECHADA") {
            throw new Error("O status da venda não está definida corretamente");
        };

        this.id = id;
        this.idClient = idClient;
        this.status = status;

        // Cadastrando a data na hora da venda e colocando no formato YYYY-MM-DD
        const d = new Date();
        this.date = d.toISOString().split('T')[0]; 
    };
};


export class ItemSale {
    constructor(idSale, idProduct, qtd, unitPrice) {
        if (idSale < 0 || !Number.isInteger(idSale)) {
            throw new Error("O id da venda não está definida corretamente!");
        };

        if (idProduct < 0 || !Number.isInteger(idProduct)) {
            throw new Error("O id do produto não foi digitado corretamente");
        };

        if (qtd <= 0 || !Number.isInteger(qtd)) {
            throw new Error("A quantidade não está definida corretamente");
        };

        if (unitPrice <= 0 || typeof unitPrice !== 'number'|| Number.isNaN(unitPrice)) {
            throw new Error("O preço unitário do produto não está definido corretamente");
        };

        this.idSale = idSale;
        this.idProduct = idProduct;
        this.qtd = qtd;
        this.unitPrice = unitPrice;
        this.subtotal = Number(this.unitPrice * this.qtd);
    };
};