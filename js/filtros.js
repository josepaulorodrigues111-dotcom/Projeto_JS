export function aplicarFiltros(movimentos, filtros) {
  const termo = filtros.pesquisa.trim().toLowerCase();

  const filtrados = movimentos
    .filter((mov) => filtros.tipo === "todos" || mov.tipo === filtros.tipo)
    .filter((mov) => filtros.categoria === "" || mov.categoria === filtros.categoria)
    .filter((mov) => mov.descricao.toLowerCase().includes(termo));

  switch (filtros.ordem) {
    case "valor":
      return [...filtrados].sort((a, b) => b.valor - a.valor);
    case "antigos":
      return [...filtrados].sort((a, b) => a.data.localeCompare(b.data));
    default:
      return [...filtrados].sort((a, b) => b.data.localeCompare(a.data));
  }
}