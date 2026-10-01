

 export function validarForm(movimento)
{

    if (movimento.descricao.trim() === "")
    {

        return "A descrição é obrigatória";    
    }
    
    if (!/^[A-Za-zÀ-ÿ\s]+$/.test(movimento.descricao)) {
    return "A descrição só deve conter texto.";
}
    
    if(Number.isNaN(movimento.valor))
    {
        return "Introduza um número";

    }
    
    if(movimento.valor <=0 ){

        return "O Valor deve ser superior a 0";

    }

    if(movimento.data ===""){

        return "A data tem de estar preenchida"
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