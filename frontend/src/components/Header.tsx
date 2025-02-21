import React from "react";
import ItemAutocomplete from "./ItemAutocomplete";
import Dashboard from "./Dashboard";
import { Item } from "./types";
import { AppBar, Toolbar, Box } from "@mui/material";

interface HeaderProps {
  setFilteredItems: (items: Item[]) => void;
}

const Header: React.FC<HeaderProps> = ({ setFilteredItems }: { setFilteredItems: (items: Item[]) => void }) => {
  return (
    <AppBar position="fixed" sx={styles.appBar}>
      <Toolbar sx={styles.toolbar}>
        {/* Logotipo */}
        <Box sx={styles.logoContainer}>
          <img src="./logo.svg" alt="Logo" style={styles.logo} />
        </Box>
        {/* Campo de busca */}
        <Box sx={{ width: "400px" }}>
          <ItemAutocomplete setFilteredItems={setFilteredItems} />
        </Box>
        {/* Status da sincronização */}
        <Dashboard />
      </Toolbar>
    </AppBar>
  );
};

// Estilos com Material UI
const styles = {
  appBar: {
    backgroundColor: "#6A0DAD",
    boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
  },
  toolbar: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    padding: "10px 20px",
  },
  logoContainer: {
    display: "flex",
    alignItems: "center",
  },
  logo: {
    height: "50px",
    marginRight: "10px",
  },
};

export default Header;
