const express = require("express");
const path = require("path");
const app = express();
const PORT = process.env.PORT || 3000;

const users = {
  "123": { saldo: 1000, dailyDisponivel: true }
};

app.use(express.static(path.join(__dirname, "public")));

app.get("/api/saldo/:id", (req, res) => {
  const user = users[req.params.id];
  if (!user) return res.status(404).json({ erro: "Usuário não encontrado" });
  res.json({ saldo: user.saldo });
});

app.get("/api/daily/:id", (req, res) => {
  const user = users[req.params.id];
  if (!user) return res.status(404).json({ erro: "Usuário não encontrado" });

  if (user.dailyDisponivel) {
    user.saldo += 100;
    user.dailyDisponivel = false;
    return res.json({ sucesso: true, novoSaldo: user.saldo });
  } else {
    return res.json({ sucesso: false, mensagem: "Daily já coletado hoje." });
  }
});

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});