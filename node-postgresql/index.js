require("dotenv").config();

const db = require("./db")
const port = process.env.PORT;
const express = require("express");
const app = express();

app.get("/", (req, res) => {
    res.json({
        message: "Teste"
    });
});

app.get("/clientes", async (req, res) => {
    const clientes = await db.oss();
    res.json(clientes);
});

app.listen(port);
