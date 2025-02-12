import React from "react";
import { Container, Box, CssBaseline, Paper } from "@mui/material";
import { useUsers } from "./hooks/useUsers";
import SearchBar from "./components/SearchBar";
import CountryFilter from "./components/CountryFilter";
import UserList from "./components/UserList";
import Statistics from "./components/Statistics";

const App: React.FC = () => {
    useUsers(); // Fetch users on mount

    return (
        <>
            <CssBaseline />
            <Container>
                <Box
                    sx={{
                        display: "grid",
                        gridTemplateColumns: { xs: "1fr", md: "2fr 1fr" }, // 2:1 ratio on desktop, 1 column on mobile
                        gap: 2,
                        mt: 2,
                    }}
                >
                    {/* Left Side - Inputs & Cards */}
                    <Box>
                        <SearchBar />
                        <CountryFilter />
                        <UserList />
                    </Box>

                    {/* Right Side - Statistics */}
                    <Paper elevation={3} sx={{ p: 2 }}>
                        <Statistics />
                    </Paper>
                </Box>
            </Container>
        </>
    );
};

export default App;
