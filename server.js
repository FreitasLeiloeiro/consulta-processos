import express from "express";

const app = express();

const bancos = [
"Banco do Brasil",
"Caixa Econômica Federal",
"Bradesco",
"Itaú",
"Santander"
];

function identificarBanco(texto){
return bancos.find(b => texto.toLowerCase().includes(b.toLowerCase())) || null;
}

app.get("/", (req,res)=>{
res.send("API Consulta Processos Online");
});

app.get("/consulta", async (req,res)=>{

const nome = req.query.nome || "";
const cpf = req.query.cpf || "";

let resultados = [];

// simulação de consulta DataJud
const processos = [
{
tribunal:"TJSP",
processo:"1005678-55.2023.8.26.0100",
classe:"Execução",
assunto:"Cobrança bancária",
partes:"Banco do Brasil vs João da Silva",
data:"2023-05-10"
}
];

processos.forEach(p => {

const banco = identificarBanco(p.partes);

if(banco){
resultados.push({
tribunal:p.tribunal,
processo:p.processo,
classe:p.classe,
assunto:p.assunto,
data:p.data,
banco:banco,
acao_contra_banco:true,
nome,
cpf
});
}

});

res.json({
status:"ok",
total:resultados.length,
resultados
});

});

const port = process.env.PORT;

app.listen(port,()=>{
console.log("Servidor rodando na porta",port);
});
