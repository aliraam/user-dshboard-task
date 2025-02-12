import React, { useState } from "react";
import {
    Card,
    CardContent,
    CardActions,
    Button,
    Typography,
    Avatar,
    Box,
} from "@mui/material";

interface UserProps {
    user: {
        name: { first: string; last: string };
        email: string;
        location: { country: string };
        picture: { medium: string };
        phone: string;
    };
}

const UserCard: React.FC<UserProps> = ({ user }) => {
    const [showDetails, setShowDetails] = useState(false);

    return (
        <Card sx={{ maxWidth: 345, m: 2, p: 2 }}>
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
                <CardContent>
                    <Typography variant="body2">Phone: {user.phone}</Typography>
                </CardContent>
            )}

            <CardActions>
                <Button onClick={() => setShowDetails(!showDetails)}>
                    {showDetails ? "Hide Details" : "Show More Details"}
                </Button>
            </CardActions>
        </Card>
    );
};

export default UserCard;
