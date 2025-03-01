import React, { useMemo } from "react";
import { Typography, Box, Skeleton } from "@mui/material";
import { useUserStore } from "../store/userStore";
import { useFilterStore } from "../store/filterStore";
import UserCard from "./UserCard";
import { filterUsers } from "../utils/userUtils";
import { User } from "../types";

const UserList: React.FC = () => {
    // Get data from stores
    const users = useUserStore(state => state.users);
    const isLoading = useUserStore(state => state.isLoading);
    const { searchQuery, selectedCountry } = useFilterStore();

    // Filter users with memoization to prevent unnecessary recalculations
    const filteredUsers = useMemo(() =>
        filterUsers(users, searchQuery, selectedCountry),
        [users, searchQuery, selectedCountry]
    );

    if (isLoading) {
        return (
            <Box
                sx={{
                    display: "grid",
                    gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr", md: "repeat(2, 1fr)" },
                    gap: 2,
                }}
            >
                {Array.from({ length: 6 }).map((_, index) => (
                    <Skeleton key={index} variant="rectangular" width="100%" height={200} />
                ))}
            </Box>
        );
    }

    if (filteredUsers.length === 0) {
        return (
            <Typography variant="h6" align="center" sx={{ mt: 4, p: 2 }}>
                No users found matching your criteria.
            </Typography>
        );
    }

    return (
        <Box
            sx={{
                display: "grid",
                gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr", md: "repeat(2, 1fr)" },
                gap: 2,
            }}
        >
            {filteredUsers.map((user: User) => (
                <UserCard key={user.id} user={user} />
            ))}
        </Box>
    );
};

export default UserList;
