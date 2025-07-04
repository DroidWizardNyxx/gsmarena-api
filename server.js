const express = require('express');
const gsmarena = require('./index'); // Importa o módulo da gsmarena-api
const { closeBrowser } = require('./src/services/utils');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// Endpoint de busca
app.get('/search/:query', async (req, res) => {
    try {
        const results = await gsmarena.search.search(req.params.query);
        res.json(results);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erro ao buscar dispositivos.' });
    }
});

// Endpoint para detalhes do dispositivo
app.get('/device/:id', async (req, res) => {
    try {
        const device = await gsmarena.catalog.getDevice(req.params.id);
        res.json(device);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erro ao obter detalhes do dispositivo.' });
    }
});

app.get('/ping', (req, res) => {
    // Apenas responde com 'Pong!' para mostrar que o servidor está vivo.
    // Não faz nenhuma operação pesada.
    res.status(200).send('Pong!');
});

app.listen(PORT, () => {
    console.log(`Servidor da API GSMArena rodando na porta ${PORT}`);
});

// Garante que o navegador headless será fechado corretamente ao encerrar o processo
process.on('SIGINT', async () => {
    await closeBrowser();
    process.exit(0);
});
