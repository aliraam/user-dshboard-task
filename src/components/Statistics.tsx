import React, { useMemo } from "react";
import { Card, CardContent, Typography, Box } from "@mui/material";
import { PieChart, Pie, Tooltip, Cell, ResponsiveContainer } from "recharts";
import { useUserStore } from "../store/userStore";

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
    const { users } = useUserStore();

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
                {name} ({value})
            </text>
        );
    };

    return (
        <Card >
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
                                    label={renderLabel}
                                    labelLine={false}
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

