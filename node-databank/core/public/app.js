import { SalesController } from './core/SalesController.js';
import { db } from './core/DataManager.js';

// --- Utilidades de DOM ---
const $ = (sel) => document.querySelector(sel);
const $$ = (sel) => Array.from(document.querySelectorAll(sel));

function showMsg(text, type = 'ok') {
  const el = $('#msg');
  el.textContent = text;
  el.className = `msg ${type}`;
  el.style.display = 'block';
  clearTimeout(showMsg._t);
  showMsg._t = setTimeout(() => (el.style.display = 'none'), 2500);
}

function money(n) {
  return Number(n).toFixed(2).replace('.', ',');
}

// --- Navegação simples por páginas ---
async function go(page) {
  $$('nav button').forEach(b => b.classList.toggle('active', b.dataset.page === page));
  $$('section').forEach(s => s.classList.remove('active'));
  $(`#page-${page}`).classList.add('active');

  // sempre re-renderiza quando troca de página
  await renderAll();
}

$$('nav button').forEach(btn => {
  btn.addEventListener('click', () => go(btn.dataset.page));
});

// --- Renderizações ---
async function renderClientes() {
  const clientes = await SalesController.listarClientes();
  $('#clientesTabela').innerHTML = renderTable(
    ['ID', 'Nome'],
    clientes.map(c => [c.id, c.nome])
  );
}

async function renderProdutos() {
  const produtos = await SalesController.listarProdutos();
  $('#produtosTabela').innerHTML = renderTable(
    ['ID', 'Nome', 'Preço', 'Estoque'],
    produtos.map(p => [p.id, p.nome, `R$ ${money(p.preco)}`, p.estoque])
  );
}

async function renderSelectsVenda() {
  const [clientes, produtos] = await Promise.all([
    SalesController.listarClientes(),
    SalesController.listarProdutos()
  ]);

  const selCliente = $('#vendaCliente');
  selCliente.innerHTML = clientes.length
    ? clientes.map(c => `<option value="${c.id}">${c.id} - ${c.nome}</option>`).join('')
    : `<option value="" disabled selected>Cadastre um cliente primeiro</option>`;

  const selProduto = $('#itemProduto');
  selProduto.innerHTML = produtos.length
    ? produtos.map(p => `<option value="${p.id}">${p.id} - ${p.nome} (Estoque: ${p.estoque})</option>`).join('')
    : `<option value="" disabled selected>Cadastre um produto primeiro</option>`;
}

function renderItensSelecionados(itens) {
  if (itens.length === 0) {
    $('#itensSelecionados').innerHTML = '<p class="muted">Nenhum item adicionado.</p>';
    return;
  }

  const linhas = itens.map((it, idx) => {
    const produto = db.getProdutoById(it.idProduto);
    const nome = produto ? produto.nome : 'Desconhecido';
    return [
      idx + 1,
      `${it.idProduto} - ${nome}`,
      it.quantidade,
      `<button type="button" data-remove="${idx}">Remover</button>`
    ];
  });

  $('#itensSelecionados').innerHTML = renderTable(['#', 'Produto', 'Qtd', 'Ação'], linhas);

  // delegação de evento: um listener para vários botões
  $('#itensSelecionados').addEventListener('click', (e) => {
    const btn = e.target.closest('button[data-remove]');
    if (!btn) return;
    const i = Number(btn.dataset.remove);
    itens.splice(i, 1);
    renderItensSelecionados(itens);
  }, { once: true });
}

async function renderRelatorio() {
  const rel = await SalesController.obterRelatorio();
  if (rel.length === 0) {
    $('#relatorio').innerHTML = '<p>Nenhuma venda registrada.</p>';
    return;
  }

  $('#relatorio').innerHTML = rel.map(v => {
    const itensHtml = renderTable(
      ['Produto', 'Qtd', 'Preço', 'Subtotal'],
      v.itens.map(i => [i.nomeProduto, i.quantidade, `R$ ${money(i.precoUnitario)}`, `R$ ${money(i.subtotal)}`])
    );

    return `
      <article style="border:1px solid #eee;border-radius:12px;padding:12px;margin:12px 0">
        <div><b>Venda #${v.id}</b> — Cliente: ${v.nomeCliente}</div>
        <div class="muted">Data: ${new Date(v.data).toLocaleString('pt-BR')}</div>
        ${itensHtml}
        <div style="margin-top:8px"><b>Total:</b> R$ ${money(v.total)}</div>
      </article>
    `;
  }).join('');
}

async function renderAll() {
  await Promise.all([
    renderClientes(),
    renderProdutos(),
    renderSelectsVenda(),
    renderRelatorio()
  ]);
}

function renderTable(headers, rows) {
  const thead = `<tr>${headers.map(h => `<th>${h}</th>`).join('')}</tr>`;
  const tbody = rows.length
    ? rows.map(r => `<tr>${r.map(c => `<td>${c}</td>`).join('')}</tr>`).join('')
    : `<tr><td colspan="${headers.length}">Sem dados.</td></tr>`;

  return `<table><thead>${thead}</thead><tbody>${tbody}</tbody></table>`;
}

// --- Eventos de formulário ---
$('#formCliente').addEventListener('submit', async (e) => {
  e.preventDefault();
  try {
    const nome = $('#clienteNome').value;
    const c = await SalesController.cadastrarCliente(nome);
    $('#clienteNome').value = '';
    showMsg(`Cliente cadastrado! ID: ${c.id}`, 'ok');
    await renderAll();
  } catch (err) {
    showMsg(err.message, 'err');
  }
});

$('#formProduto').addEventListener('submit', async (e) => {
  e.preventDefault();
  try {
    const nome = $('#produtoNome').value;
    const preco = $('#produtoPreco').value;
    const estoque = $('#produtoEstoque').value;
    const p = await SalesController.cadastrarProduto(nome, preco, estoque);

    $('#produtoNome').value = '';
    $('#produtoPreco').value = '';
    $('#produtoEstoque').value = '';

    showMsg(`Produto cadastrado! ID: ${p.id}`, 'ok');
    await renderAll();
  } catch (err) {
    showMsg(err.message, 'err');
  }
});

// Itens de venda ficam no front-end até finalizar
const itensVenda = [];

$('#btnAddItem').addEventListener('click', () => {
  try {
    const idProduto = $('#itemProduto').value;
    const quantidade = Number($('#itemQtd').value || 1);
    if (!idProduto) throw new Error('Selecione um produto.');
    if (!Number.isFinite(quantidade) || quantidade <= 0) throw new Error('Quantidade inválida.');

    itensVenda.push({ idProduto, quantidade });
    $('#itemQtd').value = '1';
    renderItensSelecionados(itensVenda);
  } catch (err) {
    showMsg(err.message, 'err');
  }
});

$('#formVenda').addEventListener('submit', async (e) => {
  e.preventDefault();
  try {
    const idCliente = $('#vendaCliente').value;
    const venda = await SalesController.realizarVenda(idCliente, itensVenda);

    itensVenda.length = 0; // limpa
    renderItensSelecionados(itensVenda);

    showMsg(`Venda #${venda.id} realizada!`, 'ok');
    await renderAll();
  } catch (err) {
    showMsg(err.message, 'err');
  }
});

// Limpar dados (agora limpa o BANCO no servidor)
$('#btnReset').addEventListener('click', async () => {
  if (!confirm('Tem certeza que deseja apagar os dados do banco?')) return;
  try {
    await db.resetDB();
    showMsg('Dados apagados!', 'ok');
    itensVenda.length = 0;
    renderItensSelecionados(itensVenda);
    await renderAll();
  } catch (err) {
    showMsg(err.message, 'err');
  }
});

// Inicia
window.addEventListener('DOMContentLoaded', async () => {
  renderItensSelecionados(itensVenda);
  try {
    // garante cache de produtos antes de usar getProdutoById
    await Promise.all([db.listProdutos(), db.listClientes()]);
    await renderAll();
  } catch (err) {
    showMsg(err.message, 'err');
  }
});
