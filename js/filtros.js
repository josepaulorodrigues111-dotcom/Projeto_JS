
export function aplicarFiltros(movimentos, filtros) {
  const termo = filtros.pesquisa.trim().toLowerCase();

  return movimentos
    .filter((mov) => filtros.tipo === "todos" || mov.tipo === filtros.tipo)
    .filter((mov) => filtros.categoria === "" || mov.categoria === filtros.categoria)
    .filter((mov) => mov.descricao.toLowerCase().includes(termo));
}