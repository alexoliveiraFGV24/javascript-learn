import { db } from './DataManager.js';

/**
 * Controlador de Lógica de Negócio para Vendas
 * (agora assíncrono porque usa API HTTP)
 */
export class SalesController {
  static async cadastrarCliente(nome) {
    if (!nome || nome.trim() === '') throw new Error('Nome do cliente é obrigatório.');
    return db.addCliente(nome);
  }

  static async cadastrarProduto(nome, preco, estoque) {
    if (!nome) throw new Error('Nome do produto é obrigatório.');
    if (isNaN(preco) || Number(preco) <= 0) throw new Error('Preço inválido.');
    if (isNaN(estoque) || Number(estoque) < 0) throw new Error('Estoque inválido.');
    return db.addProduto(nome, preco, estoque);
  }

  static async listarClientes() {
    return db.listClientes();
  }

  static async listarProdutos() {
    return db.listProdutos();
  }

  static async realizarVenda(idCliente, itens) {
    if (!idCliente) throw new Error('Selecione um cliente.');
    if (!itens || itens.length === 0) throw new Error('A venda deve ter pelo menos um item.');
    return db.realizarVenda(idCliente, itens);
  }

  static async obterRelatorio() {
    return db.getRelatorioVendas();
  }
}
