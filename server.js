import express from "express";
import { chromium } from "playwright";

const app = express();

const bancos = [
"Banco do Brasil",
"Caixa Econômica Federal",
"Bradesco",
"Itaú",
"Santander",
"Sicoob",
"Sicredi",
"Safra",
"BTG",
"Inter",
"C6"
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

const browser = await chromium.launch({
headless:true
});

const page = await browser.newPage();

try{

// abre consulta pública TJSP
await page.goto("https://esaj.tjsp.jus.br/cpopg/open.do");

// aguarda carregamento
await page.waitForTimeout(3000);

// simulação de resultado (substituiremos pela extração real)
const partes = "Banco do Brasil S/A vs João da Silva";

const banco = identificarBanco(partes);

resultados.push({
tribunal:"TJSP",
processo:"1005678-55.2023.8.26.0100",
classe:"Execução",
assunto:"Cobrança bancária",
data:"2023-05-10",
banco,
acao_contra_banco: banco ? true : false,
nome,
cpf
});

}catch(e){

console.log(e);

}

await browser.close();

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
