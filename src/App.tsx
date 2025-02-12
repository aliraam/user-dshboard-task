import React from "react";
import { Container, Box, CssBaseline } from "@mui/material";
import { Routes, Route } from "react-router-dom";
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
                <Box my={2}>
                    <SearchBar />
                    <CountryFilter />
                    <UserList />
                    <Statistics />
                </Box>
            </Container>
        </>
    );
};

export default App;
