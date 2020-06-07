const express = require("express");
// executar o meu express
const server = express();

//pegar o banco de dados
const db = require("./database/db");

// configurar pasta public para ele localizar meus arquivos
server.use(express.static("public"));
//habilitar o uso do req.body na nossa aplicação
server.use(express.urlencoded({ extended: true }));
//utilizando template engine
const nunjucks = require("nunjucks");
nunjucks.configure("src/views", {
  express: server,
  noCache: true,
});

// configurar caminhos da minha aplicação
// página inicial atraves da funcao
// req = requisicao
//res = resposta
server.get("/", (req, res) => {
  return res.render("index.html", { title: "um titulo" });
});
// criando outra rota para o meu arquivo create_point
server.get("/create-point", (req, res) => {
  //req.query: query strings da nossa URL
  return res.render("create-point.html");
});

server.post("/savepoint", (req, res) => {
  //  inserir dados no meu banco de dados
  const query = `
INSERT INTO places (
  image,
  name,
  address,
  adress2,
  state,
  city,
  items
) VALUES (?,?,?,?,?,?,?);
`;

  const values = [
    req.body.image,
    req.body.name,
    req.body.address,
    req.body.adress2,
    req.body.state,
    req.body.city,
    req.body.items,
  ];

  function afterInsertData(err) {
    if (err) {
      console.log(err);
      // return res.send("Erro no cadastro");
      return res.render("create-point.html", { saved: false });
    }
    console.log("cadastrado com sucesso");
    console.log(this);
    return res.render("create-point.html", { saved: true });
  }
  db.run(query, values, afterInsertData);
});

server.get("/search", (req, res) => {
  const search = req.query.search;
  if (search == "") {
    //pesquisa vazia
    return res.render("search-results.html", { total: 0 });
  }
  //enviar os arquivos do meu banco de dados para a página
  db.all(`SELECT * FROM places WHERE city LIKE '%${search}%'`, function (
    err,
    rows,
  ) {
    if (err) {
      return console.log(err);
    }
    //vai contar quantos elementos eu tenho no array
    const total = rows.length;
    //mostrar a página html com os dados do banco de dados
    return res.render("search-results.html", { places: rows, total: total });
  });
});

// ligar o servidor na porta 3000
server.listen(3000);
