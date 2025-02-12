import React, { useMemo } from "react";
import { Card, CardContent, Typography } from "@mui/material";
import { PieChart, Pie, Tooltip, Cell } from "recharts";
import { useUserStore } from "../store/userStore";

const COLORS = ["#8884d8", "#82ca9d", "#ffc658", "#ff7f50", "#00c49f"];

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
                <Typography variant="h6">Statistics</Typography>
                <Typography variant="body1">Total Users: {users.length}</Typography>

                {users.length > 0 && (
                    <PieChart width={300} height={200}>
                        <Pie
                            data={countryStats}
                            cx="50%"
                            cy="50%"
                            outerRadius={80}
                            fill="#8884d8"
                            dataKey="value"
                        >
                            {countryStats.map((_, index) => (
                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                        </Pie>
                        <Tooltip />
                    </PieChart>
                )}
            </CardContent>
        </Card>
    );
};

export default Statistics;
