import React from "react";
import { Select, MenuItem, FormControl, InputLabel } from "@mui/material";
import { useUserStore } from "../store/userStore";

const CountryFilter: React.FC = () => {
    const { users, selectedCountry, setSelectedCountry } = useUserStore();
    const countries = Array.from(new Set(users.map((user) => user.location.country)));

    return (
        <FormControl fullWidth sx={{ mb: 2 }}>
            <InputLabel>Filter by Country</InputLabel>
            <Select
                value={selectedCountry}
                onChange={(e) => setSelectedCountry(e.target.value)}
            >
                <MenuItem value="">All</MenuItem>
                {countries.map((country, index) => (
                    <MenuItem key={index} value={country}>
                        {country}
                    </MenuItem>
                ))}
            </Select>
        </FormControl>
    );
};

export default CountryFilter;
