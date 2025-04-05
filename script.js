// Função para carregar os alunos cadastrados
function carregarAlunos() {
    // Recupera os dados dos alunos armazenados no localStorage. Caso não haja dados, inicializa um array vazio.
    let alunos = JSON.parse(localStorage.getItem('alunos')) || [];

    // Seleciona o corpo da tabela onde os dados dos alunos serão inseridos.
    const tabela = document.getElementById('tabelaAlunos').getElementsByTagName('tbody')[0];

    // Limpa a tabela antes de adicionar novos alunos.
    tabela.innerHTML = '';

    // Itera sobre o array de alunos e adiciona uma linha na tabela para cada aluno.
    alunos.forEach((aluno, index) => {
        // Cria uma nova linha na tabela.
        let row = tabela.insertRow();

        // Preenche as células da linha com os dados do aluno (nome, sobrenome, email e curso).
        row.insertCell(0).textContent = aluno.nome + ' ' + aluno.sobrenome;
        row.insertCell(1).textContent = aluno.email;
        row.insertCell(2).textContent = aluno.curso;

        // Cria uma célula para as ações (Editar e Excluir).
        let actionsCell = row.insertCell(3);
        actionsCell.classList.add('actions'); // Adiciona uma classe para estilização.

        // Adiciona os ícones de Editar e Excluir com os eventos de clique.
        actionsCell.innerHTML = `
            <i class="fas fa-edit" onclick="editarAluno(${index})"></i>
            <i class="fas fa-trash" onclick="excluirAluno(${index})"></i>
        `;
    });
}

// Função para adicionar um novo aluno
document.getElementById('formCadastro').addEventListener('submit', function(event) {
    event.preventDefault(); // Previne o envio padrão do formulário (evita recarregar a página).

    // Obtém os valores dos campos do formulário.
    let nome = document.getElementById('nome').value;
    let sobrenome = document.getElementById('sobrenome').value;
    let email = document.getElementById('email').value;
    let curso = document.getElementById('curso').value;

    // Verifica se todos os campos foram preenchidos. Se algum estiver vazio, exibe um alerta e interrompe a execução.
    if (!nome || !sobrenome || !email || !curso) {
        alert("Todos os campos devem ser preenchidos.");
        return;
    }

    // Recupera a lista de alunos já cadastrados no localStorage. Se não houver, inicializa um array vazio.
    let alunos = JSON.parse(localStorage.getItem('alunos')) || [];

    // Adiciona o novo aluno ao array de alunos.
    alunos.push({ nome, sobrenome, email, curso });

    // Armazena o array atualizado de alunos no localStorage.
    localStorage.setItem('alunos', JSON.stringify(alunos));

    // Atualiza a tabela com os alunos cadastrados.
    carregarAlunos();

    // Limpa o formulário para o próximo cadastro.
    this.reset();
});

// Função para editar um aluno
function editarAluno(index) {
    // Recupera a lista de alunos do localStorage.
    let alunos = JSON.parse(localStorage.getItem('alunos')) || [];

    // Seleciona o aluno que será editado com base no índice passado como parâmetro.
    let aluno = alunos[index];

    // Preenche o formulário com os dados do aluno a ser editado.
    document.getElementById('nome').value = aluno.nome;
    document.getElementById('sobrenome').value = aluno.sobrenome;
    document.getElementById('email').value = aluno.email;
    document.getElementById('curso').value = aluno.curso;

    // Exclui o aluno da lista antes de editá-lo, para que o novo aluno substitua o antigo.
    excluirAluno(index);
}

// Função para excluir um aluno
function excluirAluno(index) {
    // Recupera a lista de alunos do localStorage.
    let alunos = JSON.parse(localStorage.getItem('alunos')) || [];

    // Remove o aluno do array usando o método splice (remove o aluno na posição especificada).
    alunos.splice(index, 1);

    // Atualiza o localStorage com a lista de alunos atualizada.
    localStorage.setItem('alunos', JSON.stringify(alunos));

    // Atualiza a tabela com a nova lista de alunos.
    carregarAlunos();
}

// Inicializa a tabela com os alunos cadastrados ao carregar a página
carregarAlunos();
