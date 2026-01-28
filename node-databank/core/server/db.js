import fs from 'node:fs';
import path from 'node:path';
import Database from 'better-sqlite3';

const DATA_DIR = path.join(process.cwd(), 'data');
const DB_PATH = path.join(DATA_DIR, 'sistema_vendas.sqlite');

export function openDB() {
  if (!fs.existsSync(DATA_DIR)) fs.mkdirSync(DATA_DIR, { recursive: true });
  const db = new Database(DB_PATH);
  db.pragma('foreign_keys = ON');
  return db;
}

export function initSchema(db) {
  db.exec(`
    CREATE TABLE IF NOT EXISTS clientes (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      nome TEXT NOT NULL
    );

    CREATE TABLE IF NOT EXISTS produtos (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      nome TEXT NOT NULL,
      preco REAL NOT NULL,
      estoque INTEGER NOT NULL
    );

    CREATE TABLE IF NOT EXISTS vendas (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      id_cliente INTEGER NOT NULL,
      data TEXT NOT NULL,
      status TEXT NOT NULL,
      FOREIGN KEY (id_cliente) REFERENCES clientes(id) ON DELETE RESTRICT
    );

    CREATE TABLE IF NOT EXISTS itens_venda (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      id_venda INTEGER NOT NULL,
      id_produto INTEGER NOT NULL,
      quantidade INTEGER NOT NULL,
      preco_unitario REAL NOT NULL,
      subtotal REAL NOT NULL,
      FOREIGN KEY (id_venda) REFERENCES vendas(id) ON DELETE CASCADE,
      FOREIGN KEY (id_produto) REFERENCES produtos(id) ON DELETE RESTRICT
    );

    CREATE INDEX IF NOT EXISTS idx_itens_venda_venda ON itens_venda(id_venda);
    CREATE INDEX IF NOT EXISTS idx_itens_venda_produto ON itens_venda(id_produto);
  `);
}

export function resetDatabase(db) {
  // mantém o arquivo, mas limpa as tabelas
  db.exec(`
    DELETE FROM itens_venda;
    DELETE FROM vendas;
    DELETE FROM produtos;
    DELETE FROM clientes;
    DELETE FROM sqlite_sequence;
  `);
}
