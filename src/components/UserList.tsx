import React, { useRef } from "react";
import { Typography, Box, Skeleton } from "@mui/material";
import { useVirtualizer } from "@tanstack/react-virtual";
import { useUserStore } from "../store/userStore";
import UserCard from "./UserCard";
import { useUsers } from "../hooks/useUsers";
import { User } from "../types/user";  // Import User type

const UserList: React.FC = () => {
    const { isLoading, data: users = [] } = useUsers();
    const { searchTerm, selectedCountry } = useUserStore();

    // Filter users based on search and country selection
    const filteredUsers: User[] = users
        .filter(
            (user: User) =>
                user.name.first.toLowerCase().includes(searchTerm.toLowerCase()) ||
                user.email.toLowerCase().includes(searchTerm.toLowerCase())
        )
        .filter((user: User) =>
            selectedCountry ? user.location.country === selectedCountry : true
        );

    // Virtual Scrolling Setup
    const parentRef = useRef<HTMLDivElement | null>(null);
    const rowVirtualizer = useVirtualizer({
        count: isLoading ? 10 : filteredUsers.length, // Show 10 skeleton loaders when loading
        getScrollElement: () => parentRef.current,
        estimateSize: () => 200, // Fixed card height
        overscan: 5, // Load extra rows before and after scrolling
    });

    return (
        <Box ref={parentRef} sx={{ height: "500px", overflowY: "auto", p: 2 }}>
            {isLoading && (
                <Box
                    sx={{
                        display: "grid",
                        gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
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
                        height: `${rowVirtualizer.getTotalSize()}px`,
                        position: "relative",
                        display: "grid",
                        gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
                        gap: 2,
                    }}
                >
                    {rowVirtualizer.getVirtualItems().map((virtualRow) => {
                        const user: User = filteredUsers[virtualRow.index];
                        const rowRef = useRef<HTMLDivElement | null>(null);

                        // Measure the element
                        React.useEffect(() => {
                            if (rowRef.current) {
                                rowVirtualizer.measureElement(rowRef.current);
                            }
                        }, []);

                        return (
                            <Box
                                key={virtualRow.index}
                                ref={rowRef}
                                sx={{
                                    position: "absolute",
                                    top: 0,
                                    left: 0,
                                    right: 0,
                                    transform: `translateY(${virtualRow.start}px)`,
                                    height: 200, // Fixed height to prevent jumping
                                }}
                            >
                                <UserCard user={user} isLoading={isLoading} />
                            </Box>
                        );
                    })}
                </Box>
            )}
        </Box>
    );
};

export default UserList;
