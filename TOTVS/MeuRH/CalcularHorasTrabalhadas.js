// ==UserScript==
// @name         Meu RH TOTVS - Calcular diferença de horários
// @namespace    http://tampermonkey.net/
// @version      2.0
// @description  Adiciona uma coluna com as horas trabalhadas, descontando 1:30 de almoço.
// @author       Guilherme Caram Meireles
// @match        https://meurh.totvs.io/*
// @icon         https://totvs.com/favicons/totvs-favicon-bg-light-192x192.png
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    // Função para calcular a diferença entre dois horários no formato HH:mm
    function calcularDiferenca(horarioEntrada, horarioSaida) {
        const [h1, m1] = horarioEntrada.split(':').map(Number);
        const [h2, m2] = horarioSaida.split(':').map(Number);

        const minutosEntrada = h1 * 60 + m1;
        const minutosSaida = h2 * 60 + m2;
        const diferencaMinutos = minutosSaida - minutosEntrada - 90;

        return diferencaMinutos;
    }

    function parseHoras(diferencaMinutos) {
        const horas = Math.floor(diferencaMinutos / 60);
        const minutos = diferencaMinutos % 60;

        return `${horas}h ${minutos}m`;
    }

    // Processa a tabela para calcular e adicionar a coluna "Diferença"
    function processarTabela(tabela) {
        if (!tabela) {
            console.log('Tabela não encontrada.');
            return;
        }

        // Adiciona o cabeçalho para a nova coluna
        const thead = tabela.querySelector('thead');
        if (thead) {
            console.log('Inserindo cabeçalho.');
            const cabecalho = thead.rows[0];
            if (cabecalho) {
                const th = document.createElement('th');
                th.textContent = 'Horas trabalhadas';
                th.setAttribute(tabela.attributes[0].name,'')
                cabecalho.insertBefore(th, cabecalho.lastElementChild); // Insere antes da última coluna
            }
        }

        // Itera sobre as linhas da tabela e adiciona a diferença calculada
        const linhas = tabela.querySelectorAll('tbody tr');
        linhas.forEach(linha => {
            var diferenca = 0;
            const celulas = linha.querySelectorAll('td');
            if (celulas.length >= 2) {
                // Busca a célula com as divs de entrada e saída
                const horarioCelula = celulas[1];
                const divs = horarioCelula.querySelectorAll('div');
                if (divs.length >= 5) {
                    const horarioEntrada = divs[1].textContent.substring(0,6).trim();
                    const horarioSaida = divs[4].textContent.substring(0,6).trim();

                    if (horarioEntrada && horarioSaida) {
                        diferenca = calcularDiferenca(horarioEntrada, horarioSaida);
                    }
                }
            }
            // Cria uma nova célula para a diferença
            const novaCelula = document.createElement('td');
            novaCelula.setAttribute(tabela.attributes[0].name,'')
            novaCelula.setAttribute('class','clocking')
            if(diferenca > 0) {
                novaCelula.textContent = parseHoras(diferenca);
                if(diferenca<=465)
                {
                    novaCelula.setAttribute('style','color:red')
                }
                else if(diferenca>=495)
                {
                    novaCelula.setAttribute('style','color:green')
                }
            }

            linha.insertBefore(novaCelula, linha.lastElementChild); // Insere antes da última célula
        });
    }

    const observer = new MutationObserver(() => {
        console.log('Página carregada. Processando tabela...');
        const tabela = document.querySelector('table'); // Ajuste se necessário para selecionar a tabela correta
        if (tabela) {
            observer.disconnect(); // Para o observador, pois a tabela já foi encontrada
            processarTabela(tabela);
        }
    });

    observer.observe(document.body, { childList: true, subtree: true });
})();
