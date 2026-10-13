
import { carregarDados } from "./api.js";
import {renderLista, renderResumo, renderDespesasCategoria} from "./render.js";
import { calcularTotais } from "./calculos.js";
import { validarForm } from "./validacoes.js";
import { aplicarFiltros } from "./filtros.js";
import { gerarId, formatarMoeda } from "./utils.js";
import { permanente, sessao } from "./storage.js";
import { criarEstado } from "./estado.js";

const listaEl = document.getElementById("lista-movimentos");
const form = document.getElementById("form-movimento");
const erroForm = document.getElementById("erro-form");
const pesquisaEl = document.getElementById("pesquisa");
const filtroTipoEl = document.getElementById("filtro-tipo");
const filtroCategoriaEl = document.getElementById("filtro-categoria");
const filtroOrdemEl = document.getElementById("filtro-ordem");
const sucessoForm = document.getElementById("sucesso-form");

// Modal de confirmação de eliminação
const modal = document.getElementById("modal-apagar");
const modalTexto = document.getElementById("modal-texto");
const modalCancelar = document.getElementById("modal-cancelar");
const modalConfirmar = document.getElementById("modal-confirmar");

let idParaApagar = null;

const dadosIniciais =
  permanente.ler("movimentos") ?? (await carregarDados());

const estado = criarEstado(dadosIniciais);

function lerFormulario() {
  return {
    id: gerarId(estado.obter()),
    descricao: document.getElementById("descricao").value,
    valor: parseFloat(
      document.getElementById("valor").value.replace(",", ".")
    ),
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

  renderLista(
    listaEl,
    visiveis,
    pedirApagar,
    (id, alteracoes) => {
      if (Object.keys(alteracoes).length > 0) {
        estado.editar(id, alteracoes);
      }

      atualizar();
    }
  );

  renderResumo(calcularTotais(movimentos));
  renderDespesasCategoria(movimentos);

  permanente.guardar("movimentos", movimentos);
}

function pedirApagar(id) {
  const mov = estado.obter().find((m) => m.id === id);

  if (!mov) return;

  idParaApagar = id;

  modalTexto.textContent =
    `Tem a certeza que quer apagar "${mov.descricao}" ` +
    `(${formatarMoeda(mov.valor)})?`;

  modal.showModal();
}

function confirmarApagar() {
  if (idParaApagar === null) return;

  estado.remover(idParaApagar);

  idParaApagar = null;
  modal.close();

  atualizar();
}

form.addEventListener("submit", (event) => {
  event.preventDefault();

  const novoMovimento = lerFormulario();
  const erro = validarForm(novoMovimento);

  if (erro) {
    erroForm.textContent = erro;
    erroForm.hidden = false;
    sucessoForm.hidden = true;
    return;
  }

  const timestamp = Date.now();

  estado.adicionar({
    ...novoMovimento,
    timestamp,
  });

  atualizar();

  erroForm.hidden = true;

  sucessoForm.textContent = "Movimento adicionado com sucesso!";
  sucessoForm.hidden = false;

  setTimeout(() => {
    sucessoForm.hidden = true;
  }, 10000);

  form.reset();
});


pesquisaEl.addEventListener("input", atualizar);
filtroTipoEl.addEventListener("change", atualizar);
filtroCategoriaEl.addEventListener("change", atualizar);
filtroOrdemEl.addEventListener("change", atualizar);


modalConfirmar.addEventListener("click", confirmarApagar);

modalCancelar.addEventListener("click", () => {
  idParaApagar = null;
  modal.close();
});


const filtrosGuardados = sessao.ler("filtros");

if (filtrosGuardados !== null) {
  pesquisaEl.value = filtrosGuardados.pesquisa ?? "";
  filtroTipoEl.value = filtrosGuardados.tipo ?? "todos";
  filtroCategoriaEl.value = filtrosGuardados.categoria ?? "";
  filtroOrdemEl.value = filtrosGuardados.ordem ?? "recentes";
}

atualizar();
