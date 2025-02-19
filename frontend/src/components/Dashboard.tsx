import React, { useEffect, useState } from "react";
import { getExecucaoStatus, forcarExecucao } from "../services/api";
import { Card, CardContent, Typography, Button, CircularProgress, Box } from "@mui/material";

const Dashboard = () => {
  const [status, setStatus] = useState({
    ultima_execucao: "Carregando...",
    status: "pendente",
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchStatus = async () => {
      try {
        const data = await getExecucaoStatus();
        setStatus(data);
      } catch (error) {
        console.error("Erro ao buscar status:", error);
      }
    };

    fetchStatus();
    const interval = setInterval(fetchStatus, 30000);
    return () => clearInterval(interval);
  }, []);

  const handleForcarExecucao = async () => {
    console.log("🚀 handleForcarExecucao foi chamado!");
    setLoading(true);
    await forcarExecucao();
    setLoading(false);
    alert("Execução forçada com sucesso!");
  };

  return (
    <Card sx={styles.card}>
      <CardContent>
        <Typography variant="h6">Status da Sincronização</Typography>
        <Typography variant="body2">
          <strong>Última Execução:</strong> {status.ultima_execucao}
        </Typography>
        <Typography
          variant="body2"
          sx={{ color: status.status === "sucesso" ? "green" : "red", fontWeight: "bold" }}
        >
          <strong>Status:</strong> {status.status === "sucesso" ? "✅ Sucesso" : "❌ Falha"}
        </Typography>
        <Box sx={{ textAlign: "center", marginTop: "10px" }}>
          <Button
            variant="contained"
            color="secondary"
            onClick={handleForcarExecucao}
            disabled={loading}
            sx={{ width: "100%" }}
          >
            {loading ? <CircularProgress size={24} color="inherit" /> : "🔄 Forçar Execução"}
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
};

const styles = {
  card: {
    minWidth: 250,
    padding: "10px",
    borderRadius: "10px",
    boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
    textAlign: "center",
  },
};

export default Dashboard;
