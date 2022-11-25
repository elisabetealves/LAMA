<h1 align="center">
 🎵 Projeto - O LAMA 🎵
</h1>
<br>

</h1>
<p align="center">
<img src="image/musical3.png" width="40%" height="20%"/>
</p>

<br>

## 🧠 Contexto

<br>

O projeto é um sistema interno de um novo festival de música, então sejam bem-vindos ao **LAMA**.

<br>

- 🎯 Objetivo do Projeto
- 📌 Funcionalidades
- ✔️ Requesitos Mínimos
- 🔗 Link da documentação do postman
- 📚 Aprendizado
- 🛠️ Tecnologias Utilizadas
- 📦 Pacotes Utilizados
- ⚙️ Como rodar o projeto localmente
- 🔃 Rotas
- ✨ O que funciona
- ❌ O Que Não Funciona
- 👨‍💻 Desenvolvedores

<br>

## 🎯 Objetivo do Projeto

O **LAMA**, _Labenu Musical Awards_, um festival com várias bandas famosas para a formatura da sua turma que ocorrerá em um final de semana na Sexta, Sábado e Domingo, no final, vocês podem eleger a banda que mais gostaram! Entretanto vocês só serão merecedores se entregarem um sistema impecável que permita o gerenciamento completo desses shows.

Este é um projeto elaborado em equipe que busca reproduzir as funcionalidades de um sistema para o gerenciamento completo de shows musicais. Consistindo basicamente no desenvolvimento de um backend voltado para um padrão de arquitetura de microserviços e integrado com o banco de dados MySql.

<br>

## 📌 Funcionalidades

<br>

1. **Cadastro**

   O nosso sistema deve permitir o registro os usuários que irão usá-lo. Para se cadastrar, é necessário passar um email, um nome e uma senha, e também uma função dentro do sistema. Você pode ser um cliente (usuário normal) ou um administrador do sistema (admin). O usuário deve poder se logar automaticamente após o cadastro. Caso tenha interesse, tente tornar o código de cadastro mais testável utilizando a inversão de dependência.

2. **Login**

   Para realizar o login, basta informar seu e-mail e a sua senha. O retorno deve conter o token de autenticação do usuário. Caso tenha interesse, tente tornar o código de cadastro mais testável utilizando a inversão de dependência.

3. **Endpoint de registrar banda**

   O nosso sistema deve deixar registrado todas as bandas que participarão dos três dias de shows. Para uma banda ser criada, precisamos das informações: nome, gênero musical principal a qual ela se identifica e o nome de um responsável (que pode ser qualquer membro dela). Não podem existir duas bandas com o mesmo nome. Somente administradores podem registrar bandas. Faça ao menos dois testes para checar se os dados estão corretos, sendo um em caso de erro e outro em caso de acerto.

4. **Endpoint de visualização de detalhes sobre a banda**

   Esse endpoint deve receber o id ou o nome da banda e retornar as todas as informações salvas sobre ela.

5. **Endpoint de adicionar um show a um dia**

   Para cadastrar um show, o endpoint precisa do id da banda, o dia (sexta, sábado ou domingo) e o horário em que ela irá se apresentar. Deve haver uma validação para indicar se o horário é válido (ou seja, se está entre 08h e 23h). Além disso os shows só podem ser marcados em horários redondos, ou seja, pode ser 08h - 09h ou 09h - 13h mas não pode ser 09h - 10h30 ou 10h30 - 14h.

   Caso já exista um show marcado para o dia e o horário em questão, o seu endpoint deve retornar um erro. Faça ao menos dois testes para checar se os dados estão corretos, sendo um em caso de erro e outro em caso de show em data repetida.

6. **Endpoint de pegar todos os shows de uma data**

   Recebe um dia (sexta, sábado ou domingo) e retorna todos os shows daquela data (ordenados pelo horário), mostrando somente o nome da banda e o gênero musical principal.

<br>

**-> DESAFIOS**

7. **Endpoint de criar um ingresso**

O caso de uso desse endpoint é o administrador do sistema querendo criar ingressos para serem vendidos. Para criar, precisa indicar: nome do ingresso, valor, o id do evento e a quantidade de ingressos. No banco, você deve guardar a quantidade de ingressos totais e criar um campo "quantidade de ingressos vendidos" com o valor 0 para guardar esse registro. Somente administradores podem registrar ingressos.

8. **Comprar ingresso**

Deve receber a quantidade de ingressos e o nome. Deve retornar erros específicos para um nome inválido, ingresso não encontrado e quantidade inválida (ou seja se existem menos ingressos disponíveis do que o usuário quer comprar)

9. **Adicionar foto**

Você deve criar um endpoint que adiciona uma foto para a galeria de um evento. Elas devem ser armazenadas como links no banco de dados.

10. **Pegar todas as fotos**

O endpoint receberá o identificador do evento e devolverá todas as fotos deste.

<br>

## ✔️ Requisitos Mínimos

**1. Usuário**

- Cadastro;
- Login.

**2. Bandas**

- Criar banda;
- Buscar bandas por nome.

**3. Shows**

- Criar show;
- Buscar shows no dia.

<br>

## 🔗 Link da documentação do postman

<br>

https://documenter.getpostman.com/view/22901544/2s8Ysp2b4b

<br>

## 📚 Aprendizado

<br>

> ⚠️ O projeto final consiste em uma API fundamentada no CRUD. O CRUD é um acrônimo para Create(CRIAR), Read(LER-CONSULTAR), Update(ATUALIZAR) e Delete(DELETAR).

<br>

## 🛠️ Tecnologias utilizadas nesse projeto

<br>

Para a construção do projeto, as seguintes tecnologias foram utilizadas:

- [TypeScript](https://www.typescriptlang.org/)
- [Git/Github](https://github.com/)
- [Node.js](https://nodejs.org/en/)
- [Postman](https://www.postman.com/)
- [Vscode](https://code.visualstudio.com/)
- [Programação Orientada à Objetos](https://www.devmedia.com.br/os-4-pilares-da-programacao-orientada-a-objetos/9264)
- [MySQL](https://www.mysql.com/)

## 📦 Pacotes Utilizados

- [Express](https://expressjs.com/pt-br/)
- [cors](https://www.npmjs.com/package/cors)
- [Knex](https://knexjs.org/)
- [dotenv](https://www.npmjs.com/package/dotenv)
- [bcryptjs](https://www.npmjs.com/package/bcryptjs)
- [jsonwebtoken](https://www.npmjs.com/package/jsonwebtoken)
- [Uuid](https://www.uuidgenerator.net/)

<br>

## ⚙️ Como rodar o projeto localmente

Siga os passos e inclua as informações abaixo:

| Passo                     | Comando/informação        |
| ------------------------- | ------------------------- |
| Faça o fork               | `botão de forkar`         |
| Faça o clone              | `git clone`               |
| Instale as dependências   | `npm i`                   |
| Adicionar as inf. no .env | `Dados do banco de dados` |

E divirta-se :)

<br>

## 🔃 Rotas USER:

| Método HTTP | Endpoint       | Descrição                |
| ----------- | -------------- | ------------------------ |
| POST        | `/user/signup` | Cria/cadastra um usuário |
| POST        | `/user/login`  | Login do usuário         |

<br>

## 🔃 Rotas BANDAS:

| Método HTTP | Endpoint    | Descrição                              |
| ----------- | ----------- | -------------------------------------- |
| POST        | `/band/add` | Cria/cadastra uma banda                |
| GET         | `/band/:id` | Visualização de detalhes sobre a banda |

<br>

## 🔃 Rotas SHOWS:

| Método HTTP | Endpoint        | Descrição                        |
| ----------- | --------------- | -------------------------------- |
| GET         | `/show/create`  | Pegar todos os shows de uma data |
| POST        | `/show/getshow` | Adicionar um show a um dia       |

<br>

## ✨ O que funciona

- Cadastrar
- Login
- Registrar banda
- Visualização de detalhes sobre a banda
- Adicionar um show a um dia
- Pegar todos os shows de uma data

<br>

## ❌ O Que Não Funciona

- Criar um ingresso
- Comprar ingresso
- Adicionar foto
- Pegar todas as fotos

<h1>
    <br>
    <p style=" font-weight: bold;">👨‍💻 Desenvolvedores</p>
</h1>

<table>

_Caso queira contribuir com o projeto, será totalmente bem-vindx!!!_

_Qualquer dúvida ou sugestão, chama no contatinho!_

  <tr>  
     <td align="center"><a href="https://github.com/dickfreitas"><img style="border-radius: 50%;" src="https://avatars.githubusercontent.com/u/98359009?v=4" width="100px;" alt=""/><br /><sub><b>Dickson Freitas</b></sub></a><br /><a href="https://www.linkedin.com/in/"> <img src="https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white" /></a> </td>    
    <td align="center"><a href="https://github.com/elisabetealves"><img style="border-radius: 50%;" src="https://unavatar.now.sh/github/elisabetealves" width="100px;" alt=""/><br /><sub><b>Elisabete Alves</b></sub></a><br /><a href="https://www.linkedin.com/in/elisabete-a-santos/"> <img src="https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white" /></a> </td> 
  </tr>

</table>

<br>

### Feito com 💕 e muita dedicação

<br>

<h2>
  <a href='#top'>🔝 Voltar para o topo.</a>
</h2>

<br>
