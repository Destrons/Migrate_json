import { createTheme } from "@mui/material/styles";

// Definição do tema personalizado do Material UI
const theme = createTheme({
  palette: {
    primary: {
      main: "#6A0DAD", // Roxo
    },
    secondary: {
      main: "#ff4081", // Rosa
    },
  },
  typography: {
    fontFamily: "Arial, sans-serif",
  },
});

export default theme;
