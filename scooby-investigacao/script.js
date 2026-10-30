const perguntas = [
    'Você conhecia a vítima?',
    'Sua relação com a vítima era boa?',
    'Você era próximo da vítima?',
    'Você ligou para a vítima?',
    'Você estava no local da ocorrência?',
    'Você mora perto da vítima?',
    'Você já trabalhou com a vítima?',
    'Você viu quem era o culpado?',
    'Você tem uma ideia de quem seja o culpado?',
    'Você gosta de biscoitos Scooby?'
];

const pergunta = document.getElementById('pergunta');
const numeroPergunta = document.getElementById('numero-pergunta');
const barraProgresso = document.getElementById('barra-progresso');
const botaoSim = document.getElementById('botao-sim');
const botaoNao = document.getElementById('botao-nao');
const opcoes = document.getElementById('opcoes');
const aviso = document.getElementById('aviso');
const botaoFinalizar = document.getElementById('botao-finalizar');
const resultado = document.getElementById('resultado');

let perguntaAtual = 0;
let respostasSim = 0;

function mostrarPergunta() {
    pergunta.textContent = perguntas[perguntaAtual];
    numeroPergunta.textContent = `Pergunta ${perguntaAtual + 1} de ${perguntas.length}`;

    const progresso = ((perguntaAtual + 1) / perguntas.length) * 100;
    barraProgresso.style.width = progresso + '%';

    opcoes.hidden = false;
    botaoFinalizar.hidden = true;
    aviso.textContent = 'Escolha uma opção para continuar.';
}

function responder(resposta) {
    if (resposta === 'sim') {
        respostasSim++;
    }

    perguntaAtual++;

    if (perguntaAtual < perguntas.length) {
        mostrarPergunta();
    } else {
        mostrarFinalizacao();
    }
}

function mostrarFinalizacao() {
    pergunta.textContent = 'Você respondeu todas as perguntas!';
    numeroPergunta.textContent = 'Interrogatório concluído';
    barraProgresso.style.width = '100%';

    opcoes.hidden = true;
    aviso.textContent = 'Clique no botão abaixo para consultar o parecer da investigação.';
    botaoFinalizar.hidden = false;
}

function finalizarTeste() {
    let classificacao = '';
    let mensagem = '';

    if (respostasSim < 5) {
        classificacao = 'Inocente';
        mensagem = 'As evidências apresentadas não indicam envolvimento significativo na ocorrência.';
    } else if (respostasSim === 5) {
        classificacao = 'Suspeita';
        mensagem = 'Foram encontrados indícios que justificam investigação adicional.';
    } else if (respostasSim <= 8) {
        classificacao = 'Cúmplice';
        mensagem = 'A quantidade de evidências sugere possível participação indireta no crime.';
    } else {
        classificacao = 'Culpada';
        mensagem = 'O nível de envolvimento indicado pelas respostas é extremamente alto.';
    }

    document.getElementById('classificacao').textContent = classificacao;
    document.getElementById('quantidade-sim').textContent = `Respostas "Sim": ${respostasSim} de 10`;
    document.getElementById('mensagem-resultado').textContent = mensagem;

    document.querySelector('.cartao-teste').hidden = true;
    resultado.hidden = false;
}

function recomecarTeste() {
    perguntaAtual = 0;
    respostasSim = 0;

    resultado.hidden = true;
    document.querySelector('.cartao-teste').hidden = false;

    mostrarPergunta();
}

botaoSim.addEventListener('click', function () {
    responder('sim');
});

botaoNao.addEventListener('click', function () {
    responder('nao');
});

botaoFinalizar.addEventListener('click', finalizarTeste);

document.getElementById('botao-recomecar').addEventListener('click', recomecarTeste);

mostrarPergunta();
