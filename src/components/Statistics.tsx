import React, { useMemo } from "react";
import { Card, CardContent, Typography, Box, Divider, Alert } from "@mui/material";
import { PieChart, Pie, Tooltip, Cell, ResponsiveContainer } from "recharts";
import { useUserStore } from "../store/userStore";
import { getUserStatistics } from "../utils/userUtils";

const COLORS = [
    "#8884d8", "#82ca9d", "#ffc658", "#ff7f50", "#00c49f",
    "#d88484", "#6a5acd", "#ff69b4", "#a52a2a", "#20b2aa"
];

interface LabelProps {
    name: string;
    value: number;
    x: number;
    y: number;
}

const Statistics: React.FC = () => {
    const users = useUserStore(state => state.users);
    const isLoading = useUserStore(state => state.isLoading);

    // Use the utility function to get statistics
    const stats = useMemo(() =>
        getUserStatistics(users),
        [users]
    );

    // Generate country stats for pie chart
    const countryStats = useMemo(() => {
        if (!users || !Array.isArray(users) || users.length === 0) {
            return [];
        }

        try {
            const countMap: Record<string, number> = {};

            users.forEach((user) => {
                if (user && user.country) {
                    countMap[user.country] = (countMap[user.country] || 0) + 1;
                }
            });

            return Object.entries(countMap)
                .map(([country, count]) => ({
                    name: country,
                    value: count,
                }))
                .sort((a, b) => b.value - a.value); // Sort by count descending
        } catch (error) {
            console.error("Error generating country stats:", error);
            return [];
        }
    }, [users]);

    const renderLabel = ({ name, value, x, y }: LabelProps) => {
        return (
            <text
                x={x}
                y={y}
                fill="white"
                textAnchor="middle"
                dominantBaseline="central"
                fontSize="12px"
                fontWeight="bold"
            >
                {`${name} (${value})`}
            </text>
        );
    };

    if (isLoading) {
        return (
            <Card>
                <CardContent>
                    <Typography variant="h6" align="center">Loading statistics...</Typography>
                </CardContent>
            </Card>
        );
    }

    if (!users.length) {
        return (
            <Card>
                <CardContent>
                    <Typography variant="h6" align="center">No data available</Typography>
                </CardContent>
            </Card>
        );
    }

    return (
        <Card>
            <CardContent>
                <Typography variant="h6" gutterBottom>User Statistics</Typography>

                <Box sx={{ mb: 2 }}>
                    <Typography variant="body1">
                        Total Users: <strong>{stats.totalUsers}</strong>
                    </Typography>
                    <Typography variant="body1">
                        Active Users: <strong>{stats.activeUsers}</strong> ({Math.round(stats.activePercentage)}%)
                    </Typography>
                    <Typography variant="body1">
                        Inactive Users: <strong>{stats.inactiveUsers}</strong>
                    </Typography>
                    <Typography variant="body1">
                        Countries Represented: <strong>{stats.countriesCount}</strong>
                    </Typography>
                </Box>

                <Divider sx={{ my: 2 }} />

                <Typography variant="h6" align="center" gutterBottom>Countries Distribution</Typography>

                {countryStats.length > 0 ? (
                    <Box sx={{ display: "flex", justifyContent: "center", height: 300 }}>
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie
                                    data={countryStats}
                                    cx="50%"
                                    cy="50%"
                                    outerRadius={100}
                                    fill="#8884d8"
                                    dataKey="value"
                                    label={renderLabel}
                                    labelLine={false}
                                >
                                    {countryStats.map((_, index) => (
                                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                    ))}
                                </Pie>
                                <Tooltip formatter={(value) => [`${value} users`, 'Count']} />
                            </PieChart>
                        </ResponsiveContainer>
                    </Box>
                ) : (
                    <Alert severity="info">No country data available for visualization</Alert>
                )}
            </CardContent>
        </Card>
    );
};

export default Statistics;
