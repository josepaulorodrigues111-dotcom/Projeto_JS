import { carregarDados } from "./api.js";
import { renderLista, renderResumo } from "./render.js";
import { calcularTotais } from "../calculos.js";

const listaEl = document.getElementById("lista-movimentos");

const dados = await carregarDados();

renderLista(listaEl, dados);

renderResumo(calcularTotais(dados));

console.log(dados);
console.log(calcularTotais(dados));