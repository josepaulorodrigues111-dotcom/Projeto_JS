export async function carregarDados() {
  try {
    const resposta = await fetch("dados.json");
    if (!resposta.ok) throw new Error(`Erro HTTP ${resposta.status}`);
    return await resposta.json();
  } catch (erro) {
    console.error("Falha ao carregar dados:", erro);
    return [];
  }
}