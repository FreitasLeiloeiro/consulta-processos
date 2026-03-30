import express from "express";
import cors from "cors";
import fetch from "node-fetch";
import * as cheerio from "cheerio";

const app = express();

app.use(cors());

app.get("/", (req,res)=>{
res.send("API Consulta Processos");
});

app.get("/processo", async (req,res)=>{

const numero = req.query.numero;

try{

const url = `https://esaj.tjsp.jus.br/cpopg/show.do?processo.numero=${numero}`;

const resposta = await fetch(url);

const html = await resposta.text();

const $ = cheerio.load(html);

let classe = $("#classeProcesso").text().trim();
let assunto = $("#assuntoProcesso").text().trim();

if(!classe){
classe = "Classe não identificada";
}

if(!assunto){
assunto = "Assunto não identificado";
}

const resultado = {
tribunal:"TJSP",
processo:numero,
classe:classe,
assunto:assunto,
banco:"não identificado"
};

res.json({
status:"ok",
resultado
});

}catch(e){

res.json({
status:"erro",
mensagem:"Erro ao consultar TJSP"
});

}

});

const port = process.env.PORT || 3000;

app.listen(port,()=>{
console.log("Servidor rodando");
});
