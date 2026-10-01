export function formatarMoeda(valor) {
  return new Intl.NumberFormat("pt-PT", { style: "currency", currency: "EUR" }).format(valor);
}

export function formatarData(dataTexto) {
  const dataObjeto = new Date(dataTexto);
  return dataObjeto.toLocaleDateString("pt-PT");
}