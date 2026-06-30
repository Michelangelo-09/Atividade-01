const URL = '/api/palpites';
const form = document.getElementById('form-palpite');
const tabela = document.getElementById('tabela-palpites');
const inputId = document.getElementById('palpite-id');
const inputJogo = document.getElementById('jogo');
const inputParticipante = document.getElementById('participante');
const inputPalpite = document.getElementById('palpite');
const btnCancelar = document.getElementById('btn-cancelar');

// Função para buscar e renderizar a tabela (READ)
async function carregarPalpites() {
    const res = await fetch(URL);
    const palpites = await res.json();
    tabela.innerHTML = '';
    
    palpites.forEach(p => {
        tabela.innerHTML += `
            <tr>
                <td>${p.id}</td>
                <td>${p.jogo}</td>
                <td>${p.participante}</td>
                <td>${p.palpite}</td>
                <td>
                    <button class="btn-edit" onclick="prepararEdicao(${p.id}, '${p.jogo}', '${p.participante}', '${p.palpite}')">Editar</button>
                    <button class="btn-delete" onclick="deletarPalpite(${p.id})">Excluir</button>
                </td>
            </tr>
        `;
    });
}

// Função para Enviar dados (CREATE / UPDATE)
form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const id = inputId.value;
    const dados = {
        jogo: inputJogo.value,
        participante: inputParticipante.value,
        palpite: inputPalpite.value
    };

    if (id) {
        // Modo edição (PUT)
        await fetch(`${URL}/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(dados)
        });
    } else {
        // Modo criação (POST)
        await fetch(URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(dados)
        });
    }

    form.reset();
    inputId.value = '';
    btnCancelar.style.display = 'none';
    carregarPalpites();
});

// Prepara os campos para a edição
window.prepararEdicao = (id, jogo, participante, palpite) => {
    inputId.value = id;
    inputJogo.value = jogo;
    inputParticipante.value = participante;
    inputPalpite.value = palpite;
    btnCancelar.style.display = 'inline';
};

// Cancela o modo de edição
btnCancelar.addEventListener('click', () => {
    form.reset();
    inputId.value = '';
    btnCancelar.style.display = 'none';
});

// Função para excluir registro (DELETE)
window.deletarPalpite = async (id) => {
    if (confirm("Deseja realmente excluir este palpite?")) {
        await fetch(`${URL}/${id}`, { method: 'DELETE' });
        carregarPalpites();
    }
};

// Carrega os dados ao abrir a página
carregarPalpites();