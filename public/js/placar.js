export function inserePlacar() {
    let corpoTabela = $('.placar').find('tbody');
    let usuario = 'Fátima'
    let numPalavras = $('#contador-palavras').text();

    let linha = novaLinha(usuario, numPalavras);
    linha.find('.botao-remover').click(removeLinha);

    corpoTabela.append(linha);
}

function novaLinha(usuario, palavras) {
    let linha = $('<tr>');
    let colunaUsuario = $('<td>').text(usuario);
    let colunaPalavras = $('<td>').text(palavras);
    let colunaRemover = $('<td>');

    let link = $('<a>').addClass('botao-remover').attr('href', '#');
    let icone = $('<i>').addClass('small').addClass('material-icons').text('delete');

    link.append(icone);

    colunaRemover.append(link);

    linha.append(colunaUsuario);
    linha.append(colunaPalavras);
    linha.append(colunaRemover);

    return linha;
}

function removeLinha(event) {
    event.preventDefault();
    $(this).parent().parent().remove();
}