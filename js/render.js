import { formatarData,formatarMoeda } from "./utils.js";


export function criarLinha(mov,aoApagar)
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

    const button= document.createElement("button");
    button.className= "apagar";
    button.textContent = "🗑️";
    button.title = "Apagar movimento";
    button.setAttribute("aria-label", "Apagar movimento");
    button.addEventListener("click", () => aoApagar(mov.id))

    li.append(desc,categoria,data,valor,button);

    return li;
}

export function renderLista(container, movimentos,aoApagar) {

  if (movimentos.length === 0){
    
    const vazio = document.createElement("li");
    vazio.className = "vazio";
    vazio.textContent= "Sem movimentos para mostrar";

    container.replaceChildren(vazio);
    return;


  }
  container.replaceChildren(...movimentos.map((mov) => criarLinha(mov, aoApagar)));
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