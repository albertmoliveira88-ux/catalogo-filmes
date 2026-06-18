require('dotenv').config();

const express = require('express');
const mysql = require('mysql2/promise');

const app = express();

app.use(express.json());

const PORT = process.env.PORT || 3000;

const pool = mysql.createPool({
    host: process.env.DATABASE_HOST,
    port: process.env.DATABASE_PORT,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME
});

const generosValidos = [
    'acao',
    'comedia',
    'drama',
    'terror',
    'ficcao',
    'documentario',
    'animacao',
    'outro'
];

function validarFilme(dados) {

    const { titulo, realizador, genero, ano, tipo, avaliacao } = dados;

    if (!titulo || titulo.trim().length < 2) {
        return 'Titulo invalido';
    }

    if (!realizador || realizador.trim() === '') {
        return 'Realizador obrigatorio';
    }

    if (!generosValidos.includes(genero)) {
        return 'Genero invalido';
    }

    const anoAtual = new Date().getFullYear();

    if (!ano || ano < 1900 || ano > anoAtual) {
        return 'Ano invalido';
    }

    if (tipo !== 'filme' && tipo !== 'serie') {
        return 'Tipo invalido';
    }

    if (
        avaliacao !== undefined &&
        avaliacao !== null &&
        (avaliacao < 1 || avaliacao > 5)
    ) {
        return 'Avaliacao invalida';
    }

    return null;
}

app.get('/api/estado', (req, res) => {
    res.status(200).json({
        mensagem: 'API ativa'
    });
});

app.get('/api/filmes', async (req, res) => {

    try {

        const [filmes] = await pool.query(
            'SELECT * FROM filmes'
        );

        res.status(200).json(filmes);

    } catch (erro) {

        res.status(500).json({
            erro: 'Erro no servidor'
        });

    }

});

app.get('/api/filmes/:id', async (req, res) => {

    try {

        const { id } = req.params;

        const [filmes] = await pool.query(
            'SELECT * FROM filmes WHERE id = ?',
            [id]
        );

        if (filmes.length === 0) {
            return res.status(404).json({
                erro: 'Filme nao encontrado'
            });
        }

        res.status(200).json(filmes[0]);

    } catch (erro) {

        res.status(500).json({
            erro: 'Erro no servidor'
        });

    }

});

app.post('/api/filmes', async (req, res) => {

    try {

        const erroValidacao = validarFilme(req.body);

        if (erroValidacao) {
            return res.status(400).json({
                erro: erroValidacao
            });
        }

        const {
            titulo,
            realizador,
            genero,
            ano,
            tipo,
            avaliacao,
            visto = false
        } = req.body;

        const [resultado] = await pool.query(
            `INSERT INTO filmes
            (titulo, realizador, genero, ano, tipo, avaliacao, visto)
            VALUES (?, ?, ?, ?, ?, ?, ?)`,
            [
                titulo,
                realizador,
                genero,
                ano,
                tipo,
                avaliacao,
                visto
            ]
        );

        const [novoFilme] = await pool.query(
            'SELECT * FROM filmes WHERE id = ?',
            [resultado.insertId]
        );

        res.status(201).json(novoFilme[0]);

    } catch (erro) {

        res.status(500).json({
            erro: 'Erro no servidor'
        });

    }

});

app.put('/api/filmes/:id', async (req, res) => {

    try {

        const { id } = req.params;

        const [filmeExistente] = await pool.query(
            'SELECT * FROM filmes WHERE id = ?',
            [id]
        );

        if (filmeExistente.length === 0) {
            return res.status(404).json({
                erro: 'Filme nao encontrado'
            });
        }

        const erroValidacao = validarFilme(req.body);

        if (erroValidacao) {
            return res.status(400).json({
                erro: erroValidacao
            });
        }

        const {
            titulo,
            realizador,
            genero,
            ano,
            tipo,
            avaliacao,
            visto = false
        } = req.body;

        await pool.query(
            `UPDATE filmes
            SET
                titulo = ?,
                realizador = ?,
                genero = ?,
                ano = ?,
                tipo = ?,
                avaliacao = ?,
                visto = ?
            WHERE id = ?`,
            [
                titulo,
                realizador,
                genero,
                ano,
                tipo,
                avaliacao,
                visto,
                id
            ]
        );

        const [filmeAtualizado] = await pool.query(
            'SELECT * FROM filmes WHERE id = ?',
            [id]
        );

        res.status(200).json(filmeAtualizado[0]);

    } catch (erro) {

        res.status(500).json({
            erro: 'Erro no servidor'
        });

    }

});

app.patch('/api/filmes/:id/visto', async (req, res) => {

    try {

        const { id } = req.params;

        const [filmes] = await pool.query(
            'SELECT * FROM filmes WHERE id = ?',
            [id]
        );

        if (filmes.length === 0) {
            return res.status(404).json({
                erro: 'Filme nao encontrado'
            });
        }

        const filme = filmes[0];

        const novoEstado = !filme.visto;

        await pool.query(
            'UPDATE filmes SET visto = ? WHERE id = ?',
            [novoEstado, id]
        );

        const [filmeAtualizado] = await pool.query(
            'SELECT * FROM filmes WHERE id = ?',
            [id]
        );

        res.status(200).json(filmeAtualizado[0]);

    } catch (erro) {

        res.status(500).json({
            erro: 'Erro no servidor'
        });

    }

});

app.delete('/api/filmes/:id', async (req, res) => {

    try {

        const { id } = req.params;

        const [filmes] = await pool.query(
            'SELECT * FROM filmes WHERE id = ?',
            [id]
        );

        if (filmes.length === 0) {
            return res.status(404).json({
                erro: 'Filme nao encontrado'
            });
        }

        await pool.query(
            'DELETE FROM filmes WHERE id = ?',
            [id]
        );

        res.status(204).send();

    } catch (erro) {

        res.status(500).json({
            erro: 'Erro no servidor'
        });

    }

});

app.listen(PORT, () => {
    console.log(`Servidor a correr na porta ${PORT}`);
});