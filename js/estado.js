export function criarEstado(dadosIniciais) {
  let dados = dadosIniciais;

  return {
    obter() {
      return [...dados];   
    },
    adicionar(movimento) {
      dados = [...dados, movimento];
    },
    remover(id) {
      dados = dados.filter((mov) => mov.id !== id);
    },
  };
}