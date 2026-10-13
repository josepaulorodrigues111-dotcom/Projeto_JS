export function validarForm(movimento) {
  // Descrição: entre 2 e 50 caracteres (sem contar espaços nas pontas)
  const descricao = movimento.descricao.trim();

  if (descricao.length < 2) {
    return "A descrição deve ter pelo menos 2 caracteres.";
  }

  if (descricao.length > 50) {
    return "A descrição não pode ter mais de 50 caracteres.";
  }

  
  if (Number.isNaN(movimento.valor)) {
    return "Introduza um valor numérico.";
  }

  if (movimento.valor <= 0) {
    return "O valor deve ser superior a 0.";
  }

  // Data: preenchida, não futura e com no máximo 1 ano
  if (movimento.data === "") {
    return "A data tem de estar preenchida.";
  }

  const hoje = new Date();
  const dataMovimento = new Date(movimento.data);

  if (dataMovimento > hoje) {
    return "A data não pode ser futura.";
  }

  const umAnoAtras = new Date();
  umAnoAtras.setFullYear(umAnoAtras.getFullYear() - 1);

  if (dataMovimento < umAnoAtras) {
    return "A data não pode ter mais de 1 ano.";
  }

  return null;
}