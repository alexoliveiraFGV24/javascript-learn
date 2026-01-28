# Sistema de Vendas (JavaScript + Node.js + SQLite)

Este é o **mesmo projeto do Sistema de Vendas Web**, mas agora com **back-end em JavaScript (Node.js + Express)** e **persistência em banco de dados** (SQLite em arquivo).

> Observação importante: **H2 é um banco Java**. Em um projeto 100% JavaScript (Node.js), o equivalente mais simples é **SQLite** (arquivo local). A API e o comportamento do sistema permanecem os mesmos.

## Requisitos
- Node.js 18+ (recomendado)

## Como rodar

```bash
cd server
npm install
npm start
```

Abra no navegador:
- http://localhost:8080

## Endpoints da API
- GET /api/clientes
- POST /api/clientes {"nome": "Ana"}
- GET /api/produtos
- POST /api/produtos {"nome": "Teclado", "preco": 99.9, "estoque": 10}
- POST /api/vendas {"idCliente": 1, "itens": [{"idProduto": 1, "quantidade": 2}]}
- GET /api/relatorio
- POST /api/admin/reset

## Banco de dados
O arquivo do banco fica em:
- server/data/sistema_vendas.sqlite

## Notas
- O botão **"Limpar dados"** agora apaga os dados do banco via API.
