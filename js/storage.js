export function criarArmazem(armazem) {
  return {
    guardar(chave, valor) {
      try {
        const texto = JSON.stringify(valor);
        armazem.setItem(chave, texto);
      } catch (error) {
        console.error("Não foi possível guardar:", error);
      }
    },

    ler(chave) {
      try {
        const texto = armazem.getItem(chave);

        if (texto === null) {
          return null;
        }

        return JSON.parse(texto);
      } catch (error) {
        console.error("Não foi possível ler:", error);
        return null;
      }
    },
  };
}

export const permanente = criarArmazem(localStorage);
export const sessao = criarArmazem(sessionStorage);