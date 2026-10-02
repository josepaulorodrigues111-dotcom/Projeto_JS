import { carregarDados } from "./api.js";
import { renderLista, renderResumo } from "./render.js";
import { calcularTotais } from "./calculos.js";
import { validarForm } from "./validacoes.js";

const listaEl = document.getElementById("lista-movimentos");
const form = document.getElementById("form-movimento");
const erroForm = document.getElementById("erro-form");

let dados = await carregarDados();

function lerFormulario() {
  return {
    id: Date.now(),
    descricao: document.getElementById("descricao").value,
    valor: parseFloat(document.getElementById("valor").value),
    tipo: document.getElementById("tipo").value,
    categoria: document.getElementById("categoria").value,
    data: document.getElementById("data").value,
  };
}

function atualizar() {
  renderLista(listaEl, dados);
  renderResumo(calcularTotais(dados));
}

form.addEventListener("submit", (event) => {
  event.preventDefault();

  const novoMovimento = lerFormulario();
  const erro = validarForm(novoMovimento);

  if (erro) {
    erroForm.textContent = erro;
    erroForm.hidden = false;
  } else {
    dados = [...dados, novoMovimento];
    atualizar();
    erroForm.hidden = true;
    form.reset();
  }
});

atualizar();