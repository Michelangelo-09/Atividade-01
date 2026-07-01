const express = require('express');
const app = express();

app.use(express.json());
app.use(express.static('public'));

// Simulação de banco de dados em memória
let palpites = [];
let maxIdPalpite = 1;

// 1. CREATE (Criar Palpite)
app.post('/api/palpites', (req, res) => {
    const { jogo, participante, palpite } = req.body;
    for(i = 0; i < palpites.length; i++) {
        if(palpites[i].id >= maxIdPalpite) {
            maxIdPalpite = palpites[i].id + 1; 
        }
    }
    const novoPalpite = { id: maxIdPalpite, jogo, participante, palpite };
    palpites.push(novoPalpite);
    res.status(201).json(novoPalpite);
});

// 2. READ (Listar todos)
app.get('/api/palpites', (req, res) => {
    res.json(palpites);
});

// 3. UPDATE (Editar palpite existente)
app.put('/api/palpites/:id', (req, res) => {
    const { id } = req.params;
    const { jogo, participante, palpite } = req.body;
    
    const indice = palpites.findIndex(p => p.id === parseInt(id));
    
    if (indice === -1) {
        return res.status(404).json({ mensagem: "Palpite não encontrado." });
    }
    
    palpites[indice] = { id: parseInt(id), jogo, participante, palpite };
    res.json(palpites[indice]);
});

// 4. DELETE (Remover palpite)
app.delete('/api/palpites/:id', (req, res) => {
    const { id } = req.params;
    palpites = palpites.filter(p => p.id !== parseInt(id));
    res.status(204).send();
});

// Inicialização do servidor
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});