const express = require("express");
// executar o meu express
const server = express();

// configurar pasta public para ele localizar meus arquivos
server.use(express.static("public"));

//utilizando template engine
const nunjucks = require("nunjucks");
nunjucks.configure("src/views", {
  express: server,
  noCache: true,
});

// configurar caminhos da minha aplicação
// pagina inicial atraves da funcao
// req = requisicao
//res = resposta
server.get("/", (req, res) => {
  return res.render("index.html", { title: "um titulo" });
});
// criando outra rota para o meu arquivo create_point
server.get("/create-point", (req, res) => {
  return res.render("create-point.html");
});
server.get("/search", (req, res) => {
  return res.render("search-results.html");
});

// ligar o servidor na porta 3000
server.listen(3000);
