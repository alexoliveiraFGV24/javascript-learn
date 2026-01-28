/**
 * DataManager (Browser)
 * - Consome a API REST do servidor Node
 * - Mantém um cache simples em memória para ajudar a UI (ex: getProdutoById)
 */
class DataManager {
  constructor() {
    if (DataManager.instance) return DataManager.instance;

    this.clientes = [];
    this.produtos = [];

    DataManager.instance = this;
  }

  async _req(path, { method = "GET", body } = {}) {
    const res = await fetch(path, {
      method,
      headers: body ? { "Content-Type": "application/json" } : undefined,
      body: body ? JSON.stringify(body) : undefined
    });

    let payload = null;
    const ct = res.headers.get("content-type") || "";
    if (ct.includes("application/json")) {
      payload = await res.json().catch(() => null);
    } else {
      payload = await res.text().catch(() => null);
    }

    if (!res.ok) {
      const msg = payload?.message || payload?.error || `Erro HTTP ${res.status}`;
      throw new Error(msg);
    }
    return payload;
  }

  // --------- Clientes ---------
  async listClientes() {
    this.clientes = await this._req("/api/clientes");
    return this.clientes;
  }

  async addCliente(nome) {
    const novo = await this._req("/api/clientes", { method: "POST", body: { nome } });
    await this.listClientes();
    return novo;
  }

  // --------- Produtos ---------
  async listProdutos() {
    this.produtos = await this._req("/api/produtos");
    return this.produtos;
  }

  async addProduto(nome, preco, estoque) {
    const novo = await this._req("/api/produtos", {
      method: "POST",
      body: { nome, preco, estoque }
    });
    await this.listProdutos();
    return novo;
  }

  getProdutoById(id) {
    return this.produtos.find((p) => p.id === Number(id));
  }

  // --------- Vendas / Relatório ---------
  async realizarVenda(idCliente, itens) {
    const venda = await this._req("/api/vendas", {
      method: "POST",
      body: { idCliente, itens }
    });
    await Promise.all([this.listProdutos(), this.listClientes()]);
    return venda;
  }

  async getRelatorioVendas() {
    return this._req("/api/relatorio");
  }

  async resetDB() {
    return this._req("/api/admin/reset", { method: "POST" });
  }
}

export const db = new DataManager();
