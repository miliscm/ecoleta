//importar a dependencia do sqlite3
const sqlite3 = require("sqlite3").verbose();
//criar o objeto de banco de dados que irá fazer as operações
//irá criar meu database dentro do caminho especificado
const db = new sqlite3.Database("./src/database/database.db");

module.exports = db;
//vamos utilizar o objeto de banco de dados para nossas operações
// db.serialize(() => {
//   //com comandos sql
//   //1. criar uma tabela com comandos sql
//   //neste caso estamos criando uma tabela de nome: places e estou dizendo que colunas quero dentro dela
//   db.run(`
//   CREATE TABLE IF NOT EXISTS places (
//     id INTEGER PRIMARY KEY AUTOINCREMENT,
//     image TEXT,
//     name TEXT,
//     address TEXT,
//     adress2 TEXT,
//     state TEXT,
//     city TEXT,
//     items TEXT
//   );
// `);
//   //2. inserir dados na tabela
// const query = `
// INSERT INTO places (
//   image,
//   name,
//   address,
//   adress2,
//   state,
//   city,
//   items
// ) VALUES (?,?,?,?,?,?,?);
// `;

// const values = [
//   "https://images.unsplash.com/photo-1563276652-585c729ce76b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80",
//   "Papersider",
//   "Guilherme Gemballa, Jardim América",
//   "número 260",
//   "Santa Catarina",
//   "Rio do Sul",
//   "Papéis e Papelão",
// ];

// function afterInsertData(err) {
//   if (err) {
//     return console.log(err);
//   }
//   console.log("cadastrado com sucesso");
//   console.log(this);
// }
// //   //comento esta linha abaixo para não inserir mais dados na minha tabela, pois já executei
// db.run(query, values, afterInsertData);

//3. consultar os dados da tabela
// db.all(`SELECT * FROM places`, function (err, rows) {
//   if (err) {
//     return console.log(err);
//   }
//   console.log("aqui estao seus registros");
//   console.log(rows);
// });
//4. deletar um dado da tabela de ID 1
// db.run(`DELETE FROM places WHERE id = ?`, [7], function (err) {
//   if (err) {
//     return console.log(err);
//   }
//   console.log("registro deletado com sucesso!");
// });
// });