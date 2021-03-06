import { inserePlacar } from './placar.js';

const tempoInicial = $('#tempo-digitacao').text();
let campo = $('.campo-digitacao');

const lista = [
    { texto: 'Lorem ipsum dolor sit amet.', tempo: 15 },
    { texto: 'Consectetur adipisicing elit.', tempo: 15 },
    { texto: 'Sed do eiusmod temporincididunt ut labore et dolore magna aliqua.', tempo: 20 },
    { texto: 'Carlos irá hoje ao supermercado.', tempo: 12 },
    { texto: 'Olá, seja muito bem vindo a nossa loja!', tempo: 15 },
    { texto: 'Amiga você viu o que passou ontem no jornal?', tempo: 15 },
    { texto: 'Abacaxi não faz xixi.', tempo: 10 },
    { texto: 'Irineu, você não sabe nem eu.', tempo: 12 },
    { texto: 'Giovanna, pode me ligar? Beijos', tempo: 12 },
    { texto: 'Hoje o dia está muito lindo!', tempo: 12 },
    { texto: 'Que sol maravilhoso!', tempo: 10 },
    { texto: 'Mara, Mara, Maravilha', tempo: 10 },
    { texto: 'Nem só de pão vive o homem.', tempo: 12 },
    { texto: 'Um passarinho não faz verão.', tempo: 12 },
    { texto: 'Não me siga, porque eu também estou perdido.', tempo: 15 },
    { texto: 'Fala docinho de cocô (a feia olha), não é você não rapadura.', tempo: 20 },
    { texto: 'Eu não vendo meia dose, porque você não tem meia boca.', tempo: 20 },
    { texto: 'Só vendo fiado para pessoas acima dos 90 anos, acompanhada com os pais.', tempo: 20 },
    { texto: 'Mamãe quero comer!', tempo: 8 },
    { texto: 'Cavalo dado não se olha os dentes.', tempo: 12 }
];

let paramValue = -1;

$(() => {
    radom(lista.length, 0);
    atualizaTamanhoFrase();
    inicializaContadores();
    inicializaCronometro();
    inicializaMarcadores();
    $('#botao-reiniciar').click(reiniciaJogo);
});

function atualizaTamanhoFrase() {
    let frase = $('.frase').text();
    let numPalavras = frase.split(' ').length;
    let tamanhoFrase = $('#tamanho-frase');

    tamanhoFrase.text(numPalavras);
}

function inicializaContadores() {
    campo.on('input', () => {
        let conteudo = campo.val();

        let qtdPalavras = conteudo.split(/\S+/).length - 1;
        $('#contador-palavras').text(qtdPalavras);

        let qtdCaracteres = conteudo.length;
        $('#contador-caracteres').text(qtdCaracteres);
    });
}

function inicializaMarcadores() {
    campo.on('input', () => {
        ehIgual(true);
    });
}

function inicializaCronometro() {
    let tempoRestante = $('#tempo-digitacao').text();
    campo.one('focus', () => {
        $('#botao-reiniciar').attr('disabled', true);
        let cronometroID = setInterval(() => {
            tempoRestante--;
            $('#tempo-digitacao').text(tempoRestante);
            if (tempoRestante < 1) {
                clearInterval(cronometroID);
                finalizaJogo();
            }
        }, 1000);
    });
}

function finalizaJogo() {
    campo.attr('disabled', true);
    $('#botao-reiniciar').attr('disabled', false);
    campo.addClass('campo-desativado');
    inserePlacar();
    ehIgual(false);
}

function reiniciaJogo() {
    campo.attr('disabled', false);
    campo.val('');
    $('#contador-palavras').text(0);
    $('#contador-caracteres').text(0);
    $('#tempo-digitacao').text(tempoInicial);
    radom(lista.length, 0);
    inicializaCronometro();
    campo.removeClass('campo-desativado');
    campo.removeClass('borda-vermelha');
    campo.removeClass('borda-verde');
    inicializaMarcadores();
}

function radom(max, min) {
    let valor = Math.random() * (max - min) + min;
    let numSorteado = Math.floor(valor);

    if (numSorteado == paramValue) {
        radom(max, min);
    } else if (numSorteado != paramValue) {
        paramValue = numSorteado;

        let texto = lista[paramValue].texto;
        let tempo = lista[paramValue].tempo;

        $('.frase').text(texto);
        $('#tempo-digitacao').text(tempo);
    }
}

function ehIgual(boolean = false) {
    let frase = $('.frase').text();

    let digitado = campo.val();
    let comparavel;

    if (boolean) {
        comparavel = frase.substr(0, digitado.length);
    } else {
        comparavel = frase;
    }

    if (digitado == comparavel) {
        campo.addClass('borda-verde');
        campo.removeClass('borda-vermelha');
    } else {
        campo.addClass('borda-vermelha');
        campo.removeClass('borda-verde');
    }
}