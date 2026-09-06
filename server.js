const express = require("express");

const app = express();

app.use(express.json());

const PORT = 3000;

// ===============================
// PRODUTOS
// ===============================

let products = [
    {
        id: 1,
        name: "Notebook",
        price: 3500,
        deleted: false
    },
    {
        id: 2,
        name: "Mouse",
        price: 80,
        deleted: false
    },
    {
        id: 3,
        name: "Teclado",
        price: 150,
        deleted: false
    }
];

// ===============================
// USUÁRIOS
// ===============================

let users = [
    {
        id: 1,
        name: "Maria",
        email: "maria@email.com",
        deleted: false
    },
    {
        id: 2,
        name: "João",
        email: "joao@email.com",
        deleted: false
    },
    {
        id: 3,
        name: "Ana",
        email: "ana@email.com",
        deleted: false
    }
];

// ===============================
// ROTA INICIAL
// ===============================

app.get("/", (req, res) => {
    res.json({
        mensagem: "API funcionando!"
    });
});

// ===============================
// GET /products
// Exercício 2 - Soft Delete
// ===============================

app.get("/products", (req, res) => {
    const produtosAtivos = products.filter(
        product => product.deleted === false
    );

    res.json(produtosAtivos);
});

// ===============================
// DELETE /products/:id
// Exercício 2 - Soft Delete
// ===============================

app.delete("/products/:id", (req, res) => {
    const id = Number(req.params.id);

    const product = products.find(
        product => product.id === id
    );

    if (!product) {
        return res.status(404).json({
            mensagem: "Produto não encontrado."
        });
    }

    product.deleted = true;

    res.status(200).json({
        mensagem: "Produto marcado como excluído.",
        produto: product
    });
});

// ===============================
// GET /users
// ===============================

app.get("/users", (req, res) => {
    const usuariosAtivos = users.filter(
        user => user.deleted === false
    );

    res.json(usuariosAtivos);
});

// ===============================
// DELETE /users/:id
// Exercício 3
// ===============================

app.delete("/users/:id", (req, res) => {
    const id = Number(req.params.id);

    const user = users.find(
        user => user.id === id
    );

    if (!user) {
        return res.status(404).json({
            mensagem: "Usuário não encontrado."
        });
    }

    const force = req.query.force === "true";

    // HARD DELETE
    if (force) {
        users = users.filter(
            user => user.id !== id
        );

        return res.status(200).json({
            mensagem: "Usuário apagado definitivamente.",
            id: id
        });
    }

    // SOFT DELETE
    user.deleted = true;

    res.status(200).json({
        mensagem: "Usuário marcado como excluído.",
        usuario: user
    });
});

// ===============================
// INICIAR SERVIDOR
// ===============================

app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});