import React, { useState } from "react";
import {
    Card,
    CardContent,
    CardActions,
    Button,
    Typography,
    Avatar,
    Skeleton,
    Box,
    Chip,
} from "@mui/material";
import { User } from "../types";
import { formatDate } from "../utils/userUtils";

interface UserCardProps {
    user: User;
    isLoading?: boolean;
}

const UserCard: React.FC<UserCardProps> = ({ user, isLoading = false }) => {
    const [showDetails, setShowDetails] = useState(false);

    const defaultAvatar = `https://ui-avatars.com/api/?name=${encodeURIComponent(user.name)}&background=random`;

    return (
        <Card
            sx={{
                height: "100%",
                display: "flex",
                flexDirection: "column",
                transition: "all 0.3s ease-in-out",
                "&:hover": {
                    boxShadow: "0 8px 16px 0 rgba(0,0,0,0.2)"
                }
            }}
        >
            <CardContent sx={{ flexGrow: 1 }}>
                {isLoading ? (
                    <>
                        <Skeleton variant="circular" width={56} height={56} />
                        <Skeleton variant="text" width="80%" />
                        <Skeleton variant="text" width="60%" />
                    </>
                ) : (
                    <>
                        <Box display="flex" alignItems="center" mb={2}>
                            <Avatar
                                src={user.picture?.medium || defaultAvatar}
                                sx={{ width: 56, height: 56, mr: 2 }}
                            />
                            <Box>
                                <Typography variant="h6">
                                    {user.name}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    {user.email}
                                </Typography>
                                <Chip
                                    label={user.status}
                                    size="small"
                                    color={user.status === 'active' ? 'success' : 'default'}
                                    sx={{ mt: 0.5 }}
                                />
                            </Box>
                        </Box>

                        <Typography variant="body2" sx={{ mb: 1 }}>
                            <strong>Country:</strong> {user.country}
                        </Typography>

                        <Typography variant="body2">
                            <strong>Joined:</strong> {formatDate(user.joinDate)}
                        </Typography>

                        {showDetails && (
                            <Box mt={2} p={1} bgcolor="action.hover" borderRadius={1}>
                                {user.phone && (
                                    <Typography variant="body2">
                                        <strong>Phone:</strong> {user.phone}
                                    </Typography>
                                )}
                                <Typography variant="body2" mt={1}>
                                    <strong>ID:</strong> {user.id}
                                </Typography>
                            </Box>
                        )}
                    </>
                )}
            </CardContent>

            <CardActions>
                <Button
                    size="small"
                    onClick={() => setShowDetails(!showDetails)}
                    sx={{ ml: 'auto' }}
                >
                    {showDetails ? "Hide Details" : "Show More"}
                </Button>
            </CardActions>
        </Card>
    );
};

export default UserCard;
