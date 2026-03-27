import express from "express";

const app = express();

const bancos = [
"Banco do Brasil",
"Caixa Econômica Federal",
"Bradesco",
"Itaú",
"Santander",
"Safra",
"BTG",
"Sicoob",
"Sicredi",
"Banrisul",
"Banco Inter",
"C6 Bank",
"Daycoval",
"Votorantim"
];

function identificarBanco(texto){
return bancos.find(b => texto.toLowerCase().includes(b.toLowerCase())) || null;
}

app.get("/", (req,res)=>{
res.send("API Consulta Processos Online");
});

app.get("/consulta",(req,res)=>{

const nome = req.query.nome || "";
const cpf = req.query.cpf || "";

const partes = "Banco do Brasil S/A vs João da Silva";

const banco = identificarBanco(partes);

const resultados = [
{
tribunal:"TJSP",
processo:"1005678-55.2023.8.26.0100",
classe:"Execução",
assunto:"Cobrança bancária",
data:"2023-05-10",
banco:banco,
acao_contra_banco: banco ? true : false,
nome,
cpf
}
];

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
