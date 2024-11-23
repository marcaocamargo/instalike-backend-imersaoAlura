import 'dotenv/config';
import { ObjectId } from "mongodb";
import conectarAoBanco from "../config/dbConfig.js";
// Conecta ao banco de dados utilizando a string de conexão fornecida pela variável de ambiente STRING_CONEXAO e armazena a conexão em uma constante.
const conexao = await conectarAoBanco(process.env.STRING_CONEXAO);

// Define uma função assíncrona para obter todos os posts de uma coleção específica no banco de dados.
export async function getTodosPosts() {
    // Obtém o banco de dados com o nome "imersao-instalike" da conexão estabelecida.
    const db = conexao.db("imersao-instalike");
    // Obtém a coleção "posts" do banco de dados.
    const colecao = db.collection("posts");
    // Executa uma consulta para encontrar todos os documentos da coleção "posts" e retorna os resultados como um array.
    return colecao.find().toArray();
}

export async function criarPost(novoPost) {
    const db = conexao.db("imersao-instalike");
    const colecao = db.collection("posts");
    return colecao.insertOne(novoPost);
}

export async function atualizarPost(id, novoPost) {
    const db = conexao.db("imersao-instalike");
    const colecao = db.collection("posts");
    const objID = ObjectId.createFromHexString(id);
    return colecao.updateOne({_id: new ObjectId(objID)}, {$set:novoPost});
}