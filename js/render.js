import { formatarData,formatarMoeda } from "./utils.js";
import { calcularTotais } from "../calculos.js";

export function criarLinha(mov)
{
    const li = document.createElement("li");
    li.className = `movimento ${mov.tipo}`;

    const desc = document.createElement("span");
    desc.className ="desc";
    desc.textContent= mov.descricao;

    const categoria = document.createElement("span");
    categoria.className ="categoria";
    categoria.textContent=mov.categoria;

    const data = document.createElement("span");
    data.className = "data";
    data.textContent= formatarData(mov.data);

    const valor= document.createElement("span");
    valor.className="valor";
    valor.textContent = formatarMoeda(mov.valor);

    li.append(desc,categoria,data,valor);

    return li;
}

export function renderLista(container, movimentos) {
  container.replaceChildren(...movimentos.map(criarLinha));
}

export function renderResumo(totais)
{

  const saldo = document.getElementById("saldo");
  const receitas = document.getElementById("receitas");
  const despesas = document.getElementById("despesas");

  saldo.textContent = formatarMoeda(totais.saldo);
  receitas.textContent= formatarMoeda(totais.receitas);
  despesas.textContent= formatarMoeda(totais.despesas);
  

}