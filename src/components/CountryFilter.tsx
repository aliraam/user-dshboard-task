import React, { useMemo } from "react";
import { Select, MenuItem, FormControl, InputLabel } from "@mui/material";
import { useUserStore } from "../store/userStore";
import { useFilterStore } from "../store/filterStore";
import { getUniqueCountries } from "../utils/userUtils";

const CountryFilter: React.FC = () => {
    const users = useUserStore(state => state.users);
    const { selectedCountry, setSelectedCountry } = useFilterStore();

    // Get unique countries with memoization
    const countries = useMemo(() =>
        getUniqueCountries(users),
        [users]
    );

    return (
        <FormControl fullWidth sx={{ mb: 2 }}>
            <InputLabel>Filter by Country</InputLabel>
            <Select
                value={selectedCountry || ''}
                onChange={(e) => setSelectedCountry(e.target.value === '' ? null : e.target.value)}
                label="Filter by Country"
            >
                <MenuItem value="">All</MenuItem>
                {countries.map((country) => (
                    <MenuItem key={country} value={country}>
                        {country}
                    </MenuItem>
                ))}
            </Select>
        </FormControl>
    );
};

export default CountryFilter;
