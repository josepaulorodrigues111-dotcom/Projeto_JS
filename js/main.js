import { carregarDados } from "./api.js";
import { renderLista } from "./render.js";

const listaEl = document.getElementById("lista-movimentos");

const dados = await carregarDados();
renderLista(listaEl, dados);