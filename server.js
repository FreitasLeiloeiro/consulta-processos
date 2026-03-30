import express from "express";
import cors from "cors";

const app = express();

app.use(cors());

app.get("/", (req,res)=>{
res.send("API Consulta Processos Online");
});

app.get("/processo",(req,res)=>{

const numero = req.query.numero;

const resultado = {
tribunal:"TJSP",
processo:numero,
classe:"Execução de título extrajudicial",
assunto:"Cobrança bancária",
data:"2023-05-10",
banco:"Banco do Brasil",
acao_contra_banco:true
};

res.json({
status:"ok",
resultado
});

});

const port = process.env.PORT || 3000;

app.listen(port,()=>{
console.log("Servidor rodando");
});
