import express from "express";
import multer from "multer";
import cors from "cors";
import { atualizarNovoPost, listarPosts, postarNovoPost, uploadImagem } from "../controllers/postsController.js";

const corsOptions = {
    origin: "http://localhost:8000",
    optionsSuccessStatus: 200
}

// Configura o armazenamento de arquivos enviados pelo usuário
const storage = multer.diskStorage({
  // Define o diretório de destino para os arquivos
  destination: function (req, file, cb) {
    cb(null, 'uploads/'); // Arquivos serão salvos na pasta 'uploads'
  },
  // Define o nome do arquivo no disco
  filename: function (req, file, cb) {
    cb(null, file.originalname); // O arquivo manterá o nome original
  }
});

// Cria uma instância do multer com as configurações de armazenamento
const upload = multer({ dest: "./uploads" , storage });

const routes = (app) => {
  // Habilita o middleware para analisar o corpo das requisições JSON
  app.use(express.json());
  
    app.use(cors(corsOptions));
  // Rota para listar todos os posts
  app.get("/posts", listarPosts);

  // Rota para criar um novo post
  app.post("/posts", postarNovoPost);

  // Rota para fazer upload de uma imagem
  // O parâmetro 'single("imagem")' indica que apenas um arquivo será enviado com o nome 'imagem'
  app.post("/upload", upload.single("imagem"), uploadImagem);

  app.put("/upload/:id", atualizarNovoPost);
}

export default routes;