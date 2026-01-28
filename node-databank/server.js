
import express from 'express';
import cors from 'cors';
import sqlite3 from 'sqlite3';

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static("public"));

const db = new sqlite3.Database("./data.db");

db.serialize(() => {
  db.run(`CREATE TABLE IF NOT EXISTS clientes (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nome TEXT,
    email TEXT
  )`);
  db.run(`CREATE TABLE IF NOT EXISTS produtos (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nome TEXT,
    preco REAL
  )`);
  db.run(`CREATE TABLE IF NOT EXISTS vendas (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    cliente_id INTEGER,
    data TEXT
  )`);
  db.run(`CREATE TABLE IF NOT EXISTS itens_venda (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    venda_id INTEGER,
    produto_id INTEGER,
    quantidade INTEGER
  )`);
});

app.get("/api/clientes", (req,res)=>{
  db.all("SELECT * FROM clientes",(e,r)=>res.json(r));
});
app.post("/api/clientes",(req,res)=>{
  const {nome,email}=req.body;
  db.run("INSERT INTO clientes(nome,email) VALUES(?,?)",[nome,email],function(){
    res.json({id:this.lastID});
  });
});

app.get("/api/produtos",(req,res)=>{
  db.all("SELECT * FROM produtos",(e,r)=>res.json(r));
});
app.post("/api/produtos",(req,res)=>{
  const {nome,preco}=req.body;
  db.run("INSERT INTO produtos(nome,preco) VALUES(?,?)",[nome,preco],function(){
    res.json({id:this.lastID});
  });
});

app.post("/api/admin/reset",(req,res)=>{
  db.serialize(()=>{
    db.run("DELETE FROM itens_venda");
    db.run("DELETE FROM vendas");
    db.run("DELETE FROM clientes");
    db.run("DELETE FROM produtos");
  });
  res.json({status:"ok"});
});

app.listen(3000,()=>console.log("Servidor rodando em http://localhost:3000"));
