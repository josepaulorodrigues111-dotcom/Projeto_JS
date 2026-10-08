import { carregarDados } from "./api.js";
import { renderLista, renderResumo, renderDespesasCategoria } from "./render.js";
import { calcularTotais } from "./calculos.js";
import { validarForm } from "./validacoes.js";
import { aplicarFiltros } from "./filtros.js";
import { gerarId } from "./utils.js";
import { permanente, sessao } from "./storage.js";
import { criarEstado } from "./estado.js";


const listaEl = document.getElementById("lista-movimentos");
const form = document.getElementById("form-movimento");
const erroForm = document.getElementById("erro-form");
const pesquisaEl = document.getElementById("pesquisa");
const filtroTipoEl = document.getElementById("filtro-tipo");
const filtroCategoriaEl = document.getElementById("filtro-categoria");
const filtroOrdemEl = document.getElementById("filtro-ordem");


const dadosIniciais = permanente.ler("movimentos") ?? (await carregarDados());
const estado = criarEstado(dadosIniciais);


function lerFormulario() {
  return {
    id: gerarId(estado.obter()),
    descricao: document.getElementById("descricao").value,
    valor: parseFloat(document.getElementById("valor").value),
    tipo: document.getElementById("tipo").value,
    categoria: document.getElementById("categoria").value,
    data: document.getElementById("data").value,
  };
}

function lerFiltros() {
  return {
    pesquisa: pesquisaEl.value,
    tipo: filtroTipoEl.value,
    categoria: filtroCategoriaEl.value,
    ordem: filtroOrdemEl.value,
  };
}


function atualizar() {
  const movimentos = estado.obter();
  const filtros = lerFiltros();
  const visiveis = aplicarFiltros(movimentos, filtros);

  sessao.guardar("filtros", filtros);
  renderLista(listaEl, visiveis, apagar);
  renderResumo(calcularTotais(movimentos));
  renderDespesasCategoria(movimentos);
  permanente.guardar("movimentos", movimentos);
}

function apagar(id) {
  estado.remover(id);
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
    estado.adicionar(novoMovimento);
    atualizar();
    erroForm.hidden = true;
    form.reset();
  }
});

pesquisaEl.addEventListener("input", atualizar);
filtroTipoEl.addEventListener("change", atualizar);
filtroCategoriaEl.addEventListener("change", atualizar);
filtroOrdemEl.addEventListener("change", atualizar);


const filtrosGuardados = sessao.ler("filtros");

if (filtrosGuardados !== null) {
  pesquisaEl.value = filtrosGuardados.pesquisa;
  filtroTipoEl.value = filtrosGuardados.tipo;
  filtroCategoriaEl.value = filtrosGuardados.categoria;
  filtroOrdemEl.value = filtrosGuardados.ordem ?? "recentes";
}

atualizar();