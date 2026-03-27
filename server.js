import express from "express";

const app = express();

app.get("/", (req, res) => {
  res.send("Servidor funcionando");
});

app.get("/consulta", async (req, res) => {

  const nome = req.query.nome || "";
  const cpf = req.query.cpf || "";

  try {

    const resultados = [
      {
        tribunal: "TJSP",
        status: "consulta simulada",
        nome: nome,
        cpf: cpf
      }
    ];

    res.json({
      status: "ok",
      resultados: resultados
    });

  } catch (error) {

    console.error(error);

    res.status(500).json({
      status: "erro",
      mensagem: "Erro na consulta"
    });

  }

});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log("Servidor rodando na porta", PORT);
});
