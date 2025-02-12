import React, { useState } from "react";
import {
    Card,
    CardContent,
    CardActions,
    Button,
    Typography,
    Avatar,
    Skeleton,
} from "@mui/material";
import { User } from "../types/user";

interface UserCardProps {
    user: User;
    isLoading: boolean;
}

const UserCard: React.FC<UserCardProps> = ({ user, isLoading }) => {
    const [showDetails, setShowDetails] = useState(false);

    return (
        <Card sx={{ maxWidth: 345, m: 2, p: 2, height: showDetails ? 250 : 180 }}>
            <CardContent>
                {isLoading ? (
                    <>
                        <Skeleton variant="circular" width={56} height={56} />
                        <Skeleton variant="text" width="80%" />
                        <Skeleton variant="text" width="60%" />
                    </>
                ) : (
                    <>
                        <Avatar src={user.picture.medium} sx={{ width: 56, height: 56 }} />
                        <Typography variant="h6">
                            {user.name.first} {user.name.last}
                        </Typography>
                        <Typography variant="body2">{user.email}</Typography>
                        <Typography variant="body2">{user.location.country}</Typography>
                    </>
                )}
            </CardContent>
            {!isLoading && (
                <CardActions>
                    <Button onClick={() => setShowDetails(!showDetails)}>
                        {showDetails ? "Hide Details" : "Show More Details"}
                    </Button>
                </CardActions>
            )}
        </Card>
    );
};

export default UserCard;
