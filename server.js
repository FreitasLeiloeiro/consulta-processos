import express from "express";

const app = express();

app.get("/", (req, res) => {
  res.send("API Consulta Processos Online");
});

app.get("/consulta", (req, res) => {

  const nome = req.query.nome || "";
  const cpf = req.query.cpf || "";

  const resultados = [
    {
      tribunal: "TJSP",
      processo: "1005678-55.2023.8.26.0100",
      classe: "Execução",
      assunto: "Cobrança bancária",
      data: "2023-05-10",
      nome,
      cpf
    }
  ];

  res.json({
    status: "ok",
    total: resultados.length,
    resultados
  });

});

const PORT = process.env.PORT || 3000;

app.listen(PORT, "0.0.0.0", () => {
  console.log("Servidor ativo na porta", PORT);
});
