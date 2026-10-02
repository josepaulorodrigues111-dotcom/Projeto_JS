export function calcularTotais(movimentos)
{

 const totais = movimentos.reduce(function(acc,mov) {

if(mov.tipo === "despesa"){

    acc.despesas = acc.despesas + mov.valor
}

else

{ 
    acc.receitas = acc.receitas + mov.valor
}

return acc;
}, 
{
    receitas:0,
    despesas:0
});

 const saldo = totais.receitas - totais.despesas;

 return{

    receitas: totais.receitas,
    despesas: totais.despesas,
    saldo: saldo
 };
}