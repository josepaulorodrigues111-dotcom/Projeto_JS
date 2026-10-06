export function formatarMoeda(valor) {
  return new Intl.NumberFormat("pt-PT", { style: "currency", currency: "EUR" }).format(valor);
}

export function formatarData(dataTexto) {
  const dataObjeto = new Date(dataTexto);
  return dataObjeto.toLocaleDateString("pt-PT");
}

export function gerarId(movimentos) {
  if (movimentos.length === 0) {
    return 1;
  }

  const ids = movimentos.map((m) => m.id);
  const maior = Math.max(...ids);

  return maior + 1;
}