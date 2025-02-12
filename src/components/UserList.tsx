import React from "react";
import { useUserStore } from "../store/userStore";
import UserCard from "./UserCard";
import { Grid, Typography } from "@mui/material";

const UserList: React.FC = () => {
    const { users, searchTerm, selectedCountry } = useUserStore();

    const filteredUsers = users
        .filter(
            (user) =>
                user.name.first.toLowerCase().includes(searchTerm.toLowerCase()) ||
                user.email.toLowerCase().includes(searchTerm.toLowerCase())
        )
        .filter((user) =>
            selectedCountry ? user.location.country === selectedCountry : true
        );

    return (
        <>
            {filteredUsers.length === 0 ? (
                <Typography variant="h6" align="center" sx={{ mt: 4 }}>
                    No users found.
                </Typography>
            ) : (
                <Grid container spacing={2}>
                    {filteredUsers.map((user, index) => (
                        <Grid item xs={12} sm={6} md={4} key={index}>
                            <UserCard user={user} />
                        </Grid>
                    ))}
                </Grid>
            )}
        </>
    );
};

export default UserList;
