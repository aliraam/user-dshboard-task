import React from "react";
import { Typography, Box, Skeleton } from "@mui/material";
import { useUserStore } from "../store/userStore";
import UserCard from "./UserCard";
import { useUsers } from "../hooks/useUsers";
import { User } from "../types/user";

const UserList: React.FC = () => {
    const { isLoading, data: users = [] } = useUsers();
    const { searchTerm, selectedCountry } = useUserStore();

    const filteredUsers: User[] = users
        .filter(
            (user: User) =>
                user.name.first.toLowerCase().includes(searchTerm.toLowerCase()) ||
                user.email.toLowerCase().includes(searchTerm.toLowerCase())
        )
        .filter((user: User) =>
            selectedCountry ? user.location.country === selectedCountry : true
        );

    return (
        <Box>
            {isLoading && (
                <Box
                    sx={{
                        display: "grid",
                        gridTemplateColumns: { xs: "1fr", sm: "1fr", md: "repeat(2, 1fr)" },
                        gap: 2,
                    }}
                >
                    {Array.from({ length: 10 }).map((_, index) => (
                        <Skeleton key={index} variant="rectangular" width="100%" height={200} />
                    ))}
                </Box>
            )}

            {!isLoading && filteredUsers.length === 0 ? (
                <Typography variant="h6" align="center" sx={{ mt: 4 }}>
                    No users found.
                </Typography>
            ) : (
                <Box
                    sx={{
                        display: "grid",
                        gridTemplateColumns: { xs: "1fr", sm: "1fr", md: "repeat(2, 1fr)" }, // Responsive layout
                        gap: 2,
                    }}
                >
                    {filteredUsers.map((user, index) => (
                        <UserCard key={index} user={user} isLoading={isLoading} />
                    ))}
                </Box>
            )}
        </Box>
    );
};

export default UserList;
