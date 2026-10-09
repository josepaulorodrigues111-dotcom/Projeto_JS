import { formatarData, formatarMoeda, obterIcone } from "./utils.js";


export function criarLinha(mov, aoApagar,aoEditar) {


  const li = document.createElement("li");
  li.className = `movimento ${mov.tipo}`;


  const desc = document.createElement("span");
  desc.className = "desc";
  desc.textContent = mov.descricao;

  const categoria = document.createElement("span");
  categoria.className = "categoria";

  const iconeCategoria = document.createElement("i");
  iconeCategoria.className = `fa-solid ${obterIcone(mov.categoria)}`;

  categoria.append(iconeCategoria, ` ${mov.categoria}`);

  const data = document.createElement("span");
  data.className = "data";
  data.textContent = formatarData(mov.data);

  const valor = document.createElement("span");
  valor.className = "valor";

  const iconeValor = document.createElement("i");

  if (mov.tipo === "receita") {
    iconeValor.className = "fa-solid fa-arrow-up";
  } else {
    iconeValor.className = "fa-solid fa-arrow-down";
  }

  valor.append(iconeValor, ` ${formatarMoeda(mov.valor)}`);

  valor.addEventListener("click", () => {
    const input = document.createElement("input");

    input.type = "text";
    input.value = mov.valor;
    input.pattern = "^\d+(\.\d+)?$";
    input.required = true;

    input.addEventListener("keydown", (event) => {
      if (event.key === "Enter") {
        const novoValor = parseFloat(input.value);

        if (!isNaN(novoValor) && novoValor > 0) {
          mov.valor = novoValor;
          aoEditar();
        }
        else
        {


        }
      }
    });

    valor.replaceWith(input);
  });

  const button = document.createElement("button");
  button.className = "apagar";
  const iconeApagar = document.createElement("i");
  iconeApagar.className = "fa-solid fa-trash";
  button.append(iconeApagar);
  button.title = "Apagar movimento";
  button.setAttribute("aria-label", "Apagar movimento");
  button.addEventListener("click", () => aoApagar(mov.id))

  li.append(desc, categoria, data, valor, button);

  return li;
}

export function renderLista(container, movimentos, aoApagar,aoEditar) {

  if (movimentos.length === 0) {

    const vazio = document.createElement("li");
    vazio.className = "vazio";
    vazio.textContent = "Sem movimentos a mostrar";

    container.replaceChildren(vazio);
    return;


  }
  container.replaceChildren(...movimentos.map((mov) => criarLinha(mov, aoApagar,aoEditar)));
}

export function renderResumo(totais) {

  const saldo = document.getElementById("saldo");
  const receitas = document.getElementById("receitas");
  const despesas = document.getElementById("despesas");

  saldo.textContent = formatarMoeda(totais.saldo);
  receitas.textContent = formatarMoeda(totais.receitas);
  despesas.textContent = formatarMoeda(totais.despesas);


}

export function renderDespesasCategoria(movimentos) {
  const container = document.getElementById("lista-categorias");

  const despesas = movimentos.filter((mov) => mov.tipo === "despesa");

  const totais = despesas.reduce((acc, mov) => {
    acc[mov.categoria] = (acc[mov.categoria] ?? 0) + mov.valor;
    return acc;
  }, {});

  const ordenadas = Object.entries(totais).sort((a, b) => b[1] - a[1]);

  if (ordenadas.length === 0) {
    const vazio = document.createElement("li");
    vazio.className = "vazio";
    vazio.textContent = "Sem despesas para mostrar";
    container.replaceChildren(vazio);
    return;
  }

  const totalDespesas = ordenadas.reduce((soma, [, valor]) => soma + valor, 0);

  const linhas = ordenadas.map(([categoria, valor]) => {
    const percentagem = (valor / totalDespesas) * 100;

    const li = document.createElement("li");
    li.className = "categoria-linha";

    const info = document.createElement("div");
    info.className = "categoria-info";

    const nome = document.createElement("span");

    const iconeNome = document.createElement("i");
    iconeNome.className = `fa-solid ${obterIcone(categoria)}`;

    nome.append(iconeNome, ` ${categoria}`);

    const valorEl = document.createElement("span");
    valorEl.textContent = `${formatarMoeda(valor)} (${Math.round(percentagem)}%)`;

    info.append(nome, valorEl);

    const barra = document.createElement("div");
    barra.className = "barra";

    const preenchida = document.createElement("div");
    preenchida.className = "barra-preenchida";
    preenchida.style.width = `${percentagem}%`;

    barra.append(preenchida);
    li.append(info, barra);
    return li;
  });

  container.replaceChildren(...linhas);
}