<h2 align="center">
  <img alt="LogoLinx" src="./frontend/src/assets/logo.png" width="20%">
</h2>

<h1 align="center"> 
	Desafio Linx
</h1>

<p align="center">	
  <a href="www.linkedin.com/in/john-eric-jahn">
    <img alt="Made by JohnEricJahn" src="https://img.shields.io/badge/made%20by-JohnEricJahn-brightgreen">
  </a>
  <img alt="License" src="https://img.shields.io/badge/license-MIT-brightgreen">
  </a>
</p>

## :information_source: Sobre o projeto
O backend do projeto foi desenvolvido com NodeJS e o frontend com ReactJS.<br>
Foram utilizados as bibliotecas Eslint & Prettier para padronização do código.<br><br>

A organização do backend foi feita da seguinte maneira<br>
Model: Entidades<br>
Controller: Receber e retornar requisições<br>
Service: Regras de negócio e validações<br><br>

O banco de dados utilizado foi Postgres, você irá precisar criar um banco local, para realizar a conexão utilize o arquivo na pasta config/database para configuração.<br><br>

Você pode importar o arquivo .csv diretamente no frontend, na página IMPORTAR, como ainda não implementei a paginação todas as cidades aparecem na página "LISTAGEM", como o arquivo original possui muitas cidades, a aplicação tende a ficar lenta, deixei disponibilizado uma versão reduzida do .csv neste repositório.

## :information_source: Como usar?

Para rodar a aplicação, você irá precisar do [Yarn](https://yarnpkg.com/) no seu computador.

### Install

#### Backend
```bash
# Clone este repositório
$ git clone https://github.com/JohnEricJahn/Desafio-Linx.git

# Instale as dependecias
$ yarn

# Lembre de configurar o banco de dados local
# Rode este comando para criar a tabela
$ yarn sequelize db:migrate

# Run
$ yarn dev:server

# running on port 3333
```

#### Frontend
```bash
# Clone este repositório
$ git clone https://github.com/JohnEricJahn/Desafio-Linx.git

# Instale as dependecias
$ yarn

# Run
$ yarn start

# running on port 3000
```


## :bulb: Ideias de implementação
- FrontEnd
  - [ ] Inserir mensagens Toast de sucesso e erro na pagina "CRIAR CIDADE"
  - [ ] Implementar paginação
  - [ ] Separar componente Filter
  - [ ] Implementar responsividade

- BackEnd
  - [ ] Implementação de queries para realizar os filtros das listagens.
  - [ ] O tratamento de exceções como um todo poderia ser melhorado.
  
## Considerações
** O requisito de filtro por parte do nome da cidade não cumpre completamente o que foi pedido. Inicialmente pensei em utilizar queries no banco com o operador like, essa solução se mostrou funcional porem tive uma certa dificuldade no envio dos query params do front pro back. Outra opção que encontrei foi utilizar uma expressão regex para filtrar diretamente no front mas não sou muito familiarizado com esse assunto. Construí então uma lógica mais simples aonde o filtro retorna caso o conteúdo digitado seja 100% igual ao nome da cidade registrado. A intenção é reestruturar a maneira como foi realizado os filtros e deixar essa lógica no backend, então essa funcionalidade iria ficar completa.<br>
** A parte de importação está funcional porém quando importado um arquivo que incide em erros como ibge igual ou cidade e estado com o mesmo nome, ele se comporta de maneira correta não importando esses arquivos duplicados, porém, não retorna informação ao usuário (dando a sensação de que tudo ocorreu como deveria) e também o tratamento de erros no backend não está lidando muito bem com essa parte em especifico.
