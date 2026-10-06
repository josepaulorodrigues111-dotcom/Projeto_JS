import { carregarDados } from "./api.js";
import { renderLista, renderResumo } from "./render.js";
import { calcularTotais } from "./calculos.js";
import { validarForm } from "./validacoes.js";
import { gerarId } from "./utils.js";
import { permanente } from "./storage.js";

const listaEl = document.getElementById("lista-movimentos");
const form = document.getElementById("form-movimento");
const erroForm = document.getElementById("erro-form");

let dados = permanente.ler("movimentos") ?? (await carregarDados());

function lerFormulario() {

  return {
    id: gerarId,
    descricao: document.getElementById("descricao").value,
    valor: parseFloat(document.getElementById("valor").value),
    tipo: document.getElementById("tipo").value,
    categoria: document.getElementById("categoria").value,
    data: document.getElementById("data").value,
  };
}

function atualizar() {
  renderLista(listaEl, dados, apagar);
  renderResumo(calcularTotais(dados));
  permanente.guardar("movimentos", dados);
}

function apagar(id) {
  dados = dados.filter((mov) => mov.id !== id);
  atualizar();
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