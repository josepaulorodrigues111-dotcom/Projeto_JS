import { carregarDados } from "./api.js";
import { renderLista, renderResumo } from "./render.js";
import { calcularTotais } from "../calculos.js";
import { validarForm } from "./validacoes.js";

const listaEl = document.getElementById("lista-movimentos");
const form = document.getElementById("form-movimento");
const erroForm = document.getElementById("erro-form");

const dados = await carregarDados();

renderLista(listaEl, dados);

renderResumo(calcularTotais(dados));

console.log(dados);
console.log(calcularTotais(dados));


function lerFormulario()
{
 
    const descricao = document.getElementById("descricao").value;
    const valor = parseFloat(document.getElementById("valor").value);
    const tipo = document.getElementById("tipo").value;
    const categoria = document.getElementById("categoria").value;
    const data = document.getElementById("data").value;



const movimento ={

    descricao:descricao,
    valor:valor,
    tipo:tipo,
    categoria:categoria,
    data:data,
}


return movimento;


}


form.addEventListener("submit",(event)=>{

event.preventDefault();

const novomovimento = lerFormulario();

const erro = validarForm(novomovimento);

if (erro)
{
 
    erroForm.textContent = erro;
    erroForm.hidden = false;

}

else{
    dados.push(novomovimento);

    renderLista(listaEl,dados);
    renderResumo(calcularTotais(dados));

    erroForm.hidden = true;

}


});




