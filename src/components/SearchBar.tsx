import React from "react";
import { TextField } from "@mui/material";
import { useUserStore } from "../store/userStore";

const SearchBar: React.FC = () => {
    const { setSearchTerm } = useUserStore();

    return (
        <TextField
            label="Search by Name or Email"
            fullWidth
            onChange={(e) => setSearchTerm(e.target.value)}
            sx={{ mb: 2 }}
        />
    );
};

export default SearchBar;
