import express from 'express';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { openDB, initSchema, resetDatabase } from './db.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(express.json());

const db = openDB();
initSchema(db);

function badRequest(res, message, status = 400) {
  return res.status(status).json({ message });
}

// --------- API ---------
app.get('/api/clientes', (req, res) => {
  const rows = db.prepare('SELECT id, nome FROM clientes ORDER BY id ASC').all();
  res.json(rows);
});

app.post('/api/clientes', (req, res) => {
  const nome = String(req.body?.nome ?? '').trim();
  if (!nome) return badRequest(res, 'Nome do cliente é obrigatório.');

  const info = db.prepare('INSERT INTO clientes (nome) VALUES (?)').run(nome);
  res.status(201).json({ id: info.lastInsertRowid, nome });
});

app.get('/api/produtos', (req, res) => {
  const rows = db.prepare('SELECT id, nome, preco, estoque FROM produtos ORDER BY id ASC').all();
  res.json(rows);
});

app.post('/api/produtos', (req, res) => {
  const nome = String(req.body?.nome ?? '').trim();
  const preco = Number(req.body?.preco);
  const estoque = Number(req.body?.estoque);

  if (!nome) return badRequest(res, 'Nome do produto é obrigatório.');
  if (!Number.isFinite(preco) || preco <= 0) return badRequest(res, 'Preço inválido.');
  if (!Number.isFinite(estoque) || estoque < 0) return badRequest(res, 'Estoque inválido.');

  const info = db
    .prepare('INSERT INTO produtos (nome, preco, estoque) VALUES (?, ?, ?)')
    .run(nome, preco, Math.trunc(estoque));

  res.status(201).json({ id: info.lastInsertRowid, nome, preco, estoque: Math.trunc(estoque) });
});

app.post('/api/vendas', (req, res) => {
  const idCliente = Number(req.body?.idCliente);
  const itens = Array.isArray(req.body?.itens) ? req.body.itens : [];

  if (!Number.isInteger(idCliente) || idCliente <= 0) return badRequest(res, 'Cliente inválido.');
  if (itens.length === 0) return badRequest(res, 'A venda deve ter pelo menos um item.');

  const cliente = db.prepare('SELECT id, nome FROM clientes WHERE id = ?').get(idCliente);
  if (!cliente) return badRequest(res, 'Cliente não encontrado.', 404);

  // Normaliza e valida itens
  const itensNorm = itens.map((it) => ({
    idProduto: Number(it.idProduto),
    quantidade: Number(it.quantidade)
  }));

  for (const it of itensNorm) {
    if (!Number.isInteger(it.idProduto) || it.idProduto <= 0) return badRequest(res, 'Produto inválido.');
    if (!Number.isFinite(it.quantidade) || it.quantidade <= 0) return badRequest(res, 'Quantidade inválida.');
  }

  const tx = db.transaction(() => {
    // valida estoque de todos os itens antes de gravar
    for (const it of itensNorm) {
      const prod = db.prepare('SELECT id, nome, preco, estoque FROM produtos WHERE id = ?').get(it.idProduto);
      if (!prod) throw Object.assign(new Error(`Produto ID ${it.idProduto} não encontrado.`), { http: 404 });
      if (prod.estoque < it.quantidade) {
        throw Object.assign(
          new Error(`Estoque insuficiente para o produto: ${prod.nome}. Disponível: ${prod.estoque}`),
          { http: 400 }
        );
      }
    }

    const data = new Date().toISOString();
    const status = 'CONCLUIDA';
    const vendaInfo = db
      .prepare('INSERT INTO vendas (id_cliente, data, status) VALUES (?, ?, ?)')
      .run(idCliente, data, status);

    const idVenda = Number(vendaInfo.lastInsertRowid);

    for (const it of itensNorm) {
      const prod = db.prepare('SELECT id, preco FROM produtos WHERE id = ?').get(it.idProduto);
      const precoUnitario = Number(prod.preco);
      const qtd = Math.trunc(it.quantidade);
      const subtotal = qtd * precoUnitario;

      db.prepare(
        'INSERT INTO itens_venda (id_venda, id_produto, quantidade, preco_unitario, subtotal) VALUES (?, ?, ?, ?, ?)'
      ).run(idVenda, it.idProduto, qtd, precoUnitario, subtotal);

      db.prepare('UPDATE produtos SET estoque = estoque - ? WHERE id = ?').run(qtd, it.idProduto);
    }

    return { id: idVenda, idCliente, data, status };
  });

  try {
    const venda = tx();
    res.status(201).json(venda);
  } catch (err) {
    const http = err?.http || 500;
    const msg = err?.message || 'Erro ao criar venda.';
    res.status(http).json({ message: msg });
  }
});

app.get('/api/relatorio', (req, res) => {
  const vendas = db
    .prepare(
      `SELECT v.id, v.id_cliente as idCliente, v.data, v.status, c.nome as nomeCliente
       FROM vendas v
       JOIN clientes c ON c.id = v.id_cliente
       ORDER BY v.id ASC`
    )
    .all();

  const itensByVenda = db
    .prepare(
      `SELECT iv.id_venda as idVenda, iv.id_produto as idProduto, iv.quantidade, iv.preco_unitario as precoUnitario, iv.subtotal,
              p.nome as nomeProduto
       FROM itens_venda iv
       JOIN produtos p ON p.id = iv.id_produto
       ORDER BY iv.id ASC`
    )
    .all();

  const map = new Map();
  for (const v of vendas) {
    map.set(v.id, { ...v, itens: [], total: 0 });
  }
  for (const it of itensByVenda) {
    const v = map.get(it.idVenda);
    if (!v) continue;
    v.itens.push({
      idVenda: it.idVenda,
      idProduto: it.idProduto,
      quantidade: it.quantidade,
      precoUnitario: it.precoUnitario,
      subtotal: it.subtotal,
      nomeProduto: it.nomeProduto
    });
    v.total += Number(it.subtotal);
  }

  res.json(Array.from(map.values()));
});

app.post('/api/admin/reset', (req, res) => {
  resetDatabase(db);
  res.json({ ok: true });
});

// --------- Front-end (arquivos estáticos) ---------
const publicDir = path.join(__dirname, '..', 'public');
app.use(express.static(publicDir));

// SPA fallback
app.get('*', (req, res) => {
  res.sendFile(path.join(publicDir, 'index.html'));
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
