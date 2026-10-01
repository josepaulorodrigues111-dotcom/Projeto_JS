import { carregarDados } from "./api.js";

const dados = await carregarDados();
console.table(dados);