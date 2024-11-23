import express from "express";
// Importa as rotas relacionadas aos posts
import routes from "./src/routes/postsRoutes.js";

// Cria uma instância do Express, que será o núcleo da nossa aplicação
const app = express();

app.use(express.static("uploads"));

// Carrega as rotas definidas no arquivo postsRoutes.js e as registra na aplicação
routes(app);

// Inicia o servidor na porta 3000 e exibe uma mensagem no console quando estiver pronto
app.listen(3000, () => {
  console.log("Servidor escutando...");
});