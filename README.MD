<p align="center">
  <img alt="LogoLinx" src="./frontend/src/assets/logo.png" width="20%">
</p>

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

### Back-End

#### Design Patterns<br>
Model: Entidades / Relacionamentos<br>
Controller: Receber e retornar requisições<br>
Service: Regras de negócio e validações<br><br>

#### Banco De Dados
** O BD escolhido foi o Postgres, foi utlizado o ORM Sequelize para a facilitar as operações no BD. **<br>
** Os relacionamentos ficaram do tipo ... cidade pertence a região e estado ... por sua vez ... região e estado possuem muitas cidades. **<br>
** Para criação das entidades no BD foi utilizado o conceito de migrations, facilitando assim o controle de "versão" no BD **<br>
** Todas as entidades por default possuem os campos | created_at | updated_at |, isso daria liberdade para criar posteriormente no front-end filtros utilizando datas **<br>

#### Função De Importação
** Vale ressaltar um comportamento peculiar dessa função, ao ocorrer em erros como ibge repetido, ou uma cidade com nome repetido no mesmo estado, a função simplesmente 
não executa as linhas que disparam esses erros, e a execução do programa continua acontencendo normalmente. Caso a linha em questão não implique em nenhum erro ela é inserida.
Acredito que isso da uma fluidez melhor ao programa mas poderia ser melhor testado/análisado esse comportamento posteriormente.<br>

### Front-End
** No front-end busquei tirar o melhor do conceito de componentização para seguir ao máximo os conceitos do SOLID, embora ainda tenha algumas correções a ser feitas, pretendo utilizar uma ferramenta chamada context api para separar o componente filter e fazer as chamadas em um só local do código, no momento a uma certa repetição entre as paginas | Create & Report |. **<br>
** Uma funcionalidade interessante é quanto as validações na pagina de criação que foram construidas utilizando o Yup + Unform. Isso me possibilitou controlar os erros de uma forma bem elegante utilizando tooltips para mostra-los. **<br>
** A navegação entre rotas é relativamente simples mas totalmente funcional foi utilizado o "react-router-dom". **<br>
** A parte de importação ficou show também e bem interativa com o usuario, dizendo quais os tipos de arquivos que podem e que não podem ser importados **<br>

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
# Rode este comando para criar as tabelas
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
  - [ ] Inserir no código a implementação do conceito de Context API
  - [ ] Separar componente Filter
  - [ ] Inserir mensagens Toast de sucesso e erro na pagina "CRIAR CIDADE"
  - [ ] Implementar paginação
  - [ ] Implementar responsividade
  - [ ] Implementar possiblidade de uma listagem completa na pagina "RELATÓRIOS"

- BackEnd
  - [ ] Implementar função Update em cidades
  - [ ] Construção de uma classe personalizada para tratamento de erros. Utilizar um middleware diretamente no server.js
  - [ ] Implementação do CRUD completo para manipulação dos estados e regiões
