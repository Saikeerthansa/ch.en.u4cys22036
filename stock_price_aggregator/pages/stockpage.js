import React, {useState, useEffect} from "react";
import { getStocks, getStockPrice } from "../utils/api";
import StockChart from "../components/StockChart";
import { MenuItem, Select, TextField } from "@mui/material";

export default function StockPage() {
    const [stocks, setStocks] = useState({});
    const [selectedTicker, setSelectedTicker] = useState('');
    const [minutes, setMinutes] = useState(10);
    const [priceData, setPriceData] = useState([]);

    useEffect(() => {
        getStocks().then(setStocks);
    }, []);
    useEffect(() => {
        if (selectedTicker) {
            getStockPrice(selectedTicker, minutes).then(setPriceData);
        }
    }, [selectedTicker, minutes]);

    return (
        <div style={{ padding: "20px" }}>
            <h2>Stock Price Chart</h2>
            <Select value={selectedTicker} onChange={(e) => setSelectedTicker(e.target.value)}>
                {Object.entries(stocks).map(([name, ticker]) => (
                    <MenuItem key={ticker} value={ticker}>
                        {name}
                    </MenuItem>
                ))}
            </Select>
            <TextField
                type="number"
                value={minutes}
                onChange={(e) => setMinutes(e.target.value)}
                label="last m minutes"
                style={{ marginLeft: "10px" }}
            />
            {priceData.length > 0 && <StockChart data={priceData} />}
        </div>
    );
}