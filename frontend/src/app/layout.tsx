"use client";
import { ReactNode } from "react";
import { CssBaseline, ThemeProvider } from "@mui/material";
import theme from "../styles/theme";
import "../styles/globals.css";
import Header from "../components/Header";

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="pt">
      <body>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Header />
          <main style={styles.main}>{children}</main>
        </ThemeProvider>
      </body>
    </html>
  );
}

// Estilos para evitar sobreposição do cabeçalho
const styles = {
  main: {
    marginTop: "80px",
    padding: "20px",
    display: "flex",
    flexDirection: "column" as "column", // Corrigido!
    alignItems: "center" as "center", // Corrigido!
  },
};
