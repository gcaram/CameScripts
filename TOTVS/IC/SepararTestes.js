// ==UserScript==
// @name         Dashboard IC - Quebra Linha na CT
// @namespace    https://github.com/gcaram/CameScripts/
// @version      1.0
// @description  Quebra Linha na CT
// @author       Guilherme Caram Meireles
// @match        http://engenhariabh/ic/versions/*
// @icon         https://totvs.com/favicons/totvs-favicon-bg-light-192x192.png
// @grant        none
// ==/UserScript==


(function() {
    'use strict';

    // Função para formatar o texto
    function formatarTestes() {
        // Seleciona o elemento pelo atributo específico do Angular
        const elemento = document.querySelector('div[_ngcontent-ng-c3821034251]');

        if (elemento && !elemento.dataset.formatado) {
            let textoOriginal = elemento.innerHTML;

            // Regex explica: Procura por um espaço seguido de "Testes"
            // O 'g' garante que substitua todas as ocorrências
            let textoFormatado = textoOriginal.replace(/\s(Testes)/g, ' <br>Testes');

            elemento.innerHTML = textoFormatado;

            // Marca como formatado para evitar loops de processamento
            elemento.dataset.formatado = "true";
        }
    }

    // Executa ao carregar a página
    window.addEventListener('load', formatarTestes);

    // Como páginas Angular costumam carregar conteúdo dinamicamente,
    // usamos um Observer para garantir que funcione mesmo se o elemento aparecer depois
    const observer = new MutationObserver(formatarTestes);
    observer.observe(document.body, { childList: true, subtree: true });

})();