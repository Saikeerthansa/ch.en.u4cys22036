import React from "react";
import { LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, ReferenceLine } from "recharts";

export default function StockChart({ data }) {
    const avg = data.reduce((sum, d) => sum + d.price, 0) / data.length;

    return (
        <LineChart width={800} height={400} data={data}>
            <XAxis dataKey="lastUpdatedAt" />
            <YAxis />
            <Tooltip />
            <CartesianGrid stroke="#eee" strokeDasharray={"5 5"} />
            <ReferenceLine y={avg} label="Average" stroke="red" strokeDasharray={"3 3"} />
            <Line type="monotone" dataKey="price" stroke="#8884d8" />
        </LineChart>
    );
}