import express from "express";
import { chromium } from "playwright";

const app = express();

app.get("/consulta", async (req, res) => {

const nome = req.query.nome;
const cpf = req.query.cpf;

let resultados = [];

const browser = await chromium.launch({
headless: true
});

const page = await browser.newPage();

try {

await page.goto("https://esaj.tjsp.jus.br/cpopg/open.do");

await page.waitForTimeout(2000);

resultados.push({
tribunal: "TJSP",
status: "consulta iniciada",
nome: nome,
cpf: cpf
});

} catch (e) {

console.log(e);

}

await browser.close();

res.json({
status: "ok",
resultados
});

});

app.listen(3000, () => {
console.log("Servidor rodando");
});
