import React, { useMemo } from "react";
import { Card, CardContent, Typography, Box } from "@mui/material";
import { PieChart, Pie, Tooltip, Cell, ResponsiveContainer, Label } from "recharts";
import { useUserStore } from "../store/userStore";

const COLORS = ["#8884d8", "#82ca9d", "#ffc658", "#ff7f50", "#00c49f", "#d88484"];

const Statistics: React.FC = () => {
    const { users } = useUserStore();

    // Generate user count per country
    const countryStats = useMemo(() => {
        const countMap: Record<string, number> = {};
        users.forEach((user) => {
            countMap[user.location.country] = (countMap[user.location.country] || 0) + 1;
        });

        return Object.entries(countMap).map(([country, count]) => ({
            name: country,
            value: count,
        }));
    }, [users]);

    return (
        <Card sx={{ mt: 3 }}>
            <CardContent>
                <Typography variant="h6" align="center">User Statistics</Typography>
                <Typography variant="body1" align="center">Total Users: {users.length}</Typography>

                {users.length > 0 && (
                    <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
                        <ResponsiveContainer width={300} height={300}>
                            <PieChart>
                                <Pie
                                    data={countryStats}
                                    cx="50%"
                                    cy="50%"
                                    outerRadius={100}
                                    fill="#8884d8"
                                    dataKey="value"
                                    label={({ name, value }) => `${name}: ${value}`} // Show Country & Count
                                >
                                    {countryStats.map((_, index) => (
                                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                    ))}
                                </Pie>
                                <Tooltip />
                            </PieChart>
                        </ResponsiveContainer>
                    </Box>
                )}
            </CardContent>
        </Card>
    );
};

export default Statistics;
git add src / components / Statistics.tsx
git commit - m "Feature: Add country and count labels to pie chart"
