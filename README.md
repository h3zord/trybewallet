<h1 align="center">Boas-vindas ao repositório do TrybeWallet!</h1>

<h2 align="center">
  <a href="https://h3zord.github.io/trybewallet" target="_blank">
    Aplicação
  </a>
</h2>
<br/>

## Objetivo

<strong>TrybeWallet</strong> é uma aplicação de controle financeiro, que permite que o usuário adicione, remova e edite despesas, visualize um histórico de gastos em forma de tabela, e calcule o total de despesas convertido em uma moeda de sua escolha.

<h2 align="center">Demonstração</h2>
<br/>

<div align="center">

https://user-images.githubusercontent.com/102384026/226149051-2e4e46d2-c3a9-4eb0-8f19-4dc84d22f540.mp4

</div>

<br/>
<br/>

## O que foi desenvolvido?

<strong>TrybeWallet</strong> é uma aplicação de gerenciamento de despesas, que permite ao usuário adicionar, editar e remover registros de gastos. Com ele, é possível visualizar uma tabela de todas as despesas e o total destas em uma moeda escolhida pelo usuário, com cotações atualizadas em tempo real por meio de uma API.

O projeto foi desenvolvido com react e redux para controlar o estado global da aplicação, além de ter sua estilização feita com CSS. O versionamento de código foi feito usando git.

Após realizar o login na aplicação, o usuário pode adicionar uma nova despesa preenchendo a descrição, categoria, valor, forma de pagamento e moeda de pagamento. As despesas podem ser visualizadas em uma tabela, incluindo o valor convertido para reais usando a cotação em tempo real. O usuário tem a opção de editar ou excluir uma despesa a qualquer momento. No cabeçalho da tela principal, é possível ver o email do usuário e o total de gastos convertidos para reais.

## Linguagens e ferramentas
- HTML
- CSS
- Javascript
- React
- Redux

## Instalação e execução

### 1 - Clone o repositório:
```
git clone git@github.com:h3zord/trybewallet.git
```

### 2 - Entre no repositório:
```
cd trybewallet
```

### 3 - Instale as dependências:
Caso utilize o npm
```
npm install
```
Caso utilize o yarn
```
yarn install
```

### 4 - Inicie o projeto:
Caso utilize o npm
```
npm start
```
Caso utilize o yarn
```
yarn start
```
<strong>O react irá executar a aplicação na porta padrão 3000.</strong>
<br/>
➜ http://localhost:3000/
