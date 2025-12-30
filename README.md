# CameScripts
Conjunto de scripts úteis destinados a execução via Tampermonkey. Os scripts aqui presentes visam automatizar e simplificar tarefas em aplicações web (ex.: sistemas TOTVS), oferecendo pequenos utilitários práticos que você pode instalar rapidamente no seu navegador.

## Conteúdo

- `TOTVS/IC/SepararTestes.js` — script para auxiliar na separação/gestão de testes (utilitário específico do projeto).
- `TOTVS/MeuRH/CalcularHorasTrabalhadas.js` — calcula horas trabalhadas no fluxo de folha de ponto / MeuRH (exemplo de script disponível para importação).

> Nota: os scripts são fornecidos "as-is". Leia o código antes de instalar em ambientes de produção.

## Instalação (rápida)

1. Instale a extensão Tampermonkey no seu navegador (Chrome/Edge/Firefox):

	- Chrome Web Store: https://chromewebstore.google.com/detail/tampermonkey/dhdgffkkebhmkfjojejmpbldmpobfkfo

2. Abra o painel do Tampermonkey (Dashboard) no navegador.

3. Vá em "Utilities" → "Import from URL".

4. Cole o link RAW do script que deseja instalar. Exemplo (branch main):

	https://raw.githubusercontent.com/gcaram/CameScripts/main/TOTVS/MeuRH/CalcularHorasTrabalhadas.js

5. Clique em "Install" / "Import" e confirme a instalação.

## Uso

- Após instalar, ative/desative o script a partir do painel do Tampermonkey.
- Caso o script seja específico para uma URL, verifique o cabeçalho `@match`/`@include` dentro do próprio arquivo para entender onde ele será executado.

## Como contribuir

- Fork este repositório e abra um Pull Request com melhorias ou novos scripts.
- Ao enviar um script novo, adicione uma entrada no README com: caminho do arquivo, propósito e instruções de uso.
- Seja explícito sobre permissões necessárias e URLs alvo para evitar execuções indesejadas.

## Licença

- Licença: MIT  
- SPDX: `MIT`  

Este repositório está licenciado sob a Licença MIT — consulte o arquivo `LICENSE` na raiz do projeto para o texto completo.

Você pode copiar, modificar e distribuir os scripts conforme permitido pela Licença MIT. Note que os scripts são fornecidos "as-is" e podem conter comportamento específico para certas URLs/ambientes.

## Contato

- Autor: `@gcaram` — abra issues no repositório para dúvidas, sugestões ou problemas.

Obrigado por usar o CameScripts! Sinta-se à vontade para contribuir e melhorar os utilitários.