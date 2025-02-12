import React from "react";
import { Container, Box, CssBaseline, Paper, createTheme, ThemeProvider, Button } from "@mui/material";
import { useUsers } from "./hooks/useUsers";
import SearchBar from "./components/SearchBar";
import CountryFilter from "./components/CountryFilter";
import UserList from "./components/UserList";
import Statistics from "./components/Statistics";
import { useThemeStore } from "./store/themeStore";

const App: React.FC = () => {
    useUsers(); // Fetch users on mount
    const { darkMode, toggleTheme } = useThemeStore();

    const theme = createTheme({
        palette: {
            mode: darkMode ? "dark" : "light",
            primary: {
                main: darkMode ? "#90caf9" : "#0d47a1", // Light blue theme
            },
            background: {
                default: darkMode ? "#121212" : "#ffffff",
            },
        },
    });
    return (
        <ThemeProvider theme={theme}>
            <Button onClick={toggleTheme}>Toggle Theme</Button>

            <CssBaseline />
            <Container>
                <Box
                    sx={{
                        display: "grid",
                        gridTemplateColumns: { xs: "1fr", md: "2fr 1fr" },
                        gap: 2,
                        mt: 2,
                    }}
                >
                    <Box>
                        <SearchBar />
                        <CountryFilter />
                        <UserList />
                    </Box>

                    <Paper elevation={3} sx={{ boxShadow: 'none' }}>
                        <Statistics />
                    </Paper>
                </Box>
            </Container>
        </ThemeProvider>
    );
};

export default App;
