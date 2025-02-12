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
} from "@mui/material";
import { User } from "../types/user";

interface UserCardProps {
    user: User;
    isLoading: boolean;
}

const UserCard: React.FC<UserCardProps> = ({ user, isLoading }) => {
    const [showDetails, setShowDetails] = useState(false);

    return (
        <Card sx={{ maxWidth: 345, m: 2, p: 2, height: showDetails ? 280 : 180, transition: "height 0.3s ease-in-out" }}>
            <CardContent>
                {isLoading ? (
                    <>
                        <Skeleton variant="circular" width={56} height={56} />
                        <Skeleton variant="text" width="80%" />
                        <Skeleton variant="text" width="60%" />
                    </>
                ) : (
                    <>
                        <Box display="flex" alignItems="center">
                            <Avatar src={user.picture.medium} sx={{ width: 56, height: 56, mr: 2 }} />
                            <Box>
                                <Typography variant="h6">
                                    {user.name.first} {user.name.last}
                                </Typography>
                                <Typography variant="body2">{user.email}</Typography>
                                <Typography variant="body2">{user.location.country}</Typography>
                            </Box>
                        </Box>

                        {showDetails && (
                            <Box mt={2}>
                                <Typography variant="body2">Phone: {user.phone}</Typography>
                                <Typography variant="body2">
                                    Address: {user.location.country}
                                </Typography>
                            </Box>
                        )}
                    </>
                )}
            </CardContent>

            <CardActions>
                <Button onClick={() => setShowDetails(!showDetails)}>
                    {showDetails ? "Hide Details" : "Show More Details"}
                </Button>
            </CardActions>
        </Card>
    );
};

export default UserCard;
