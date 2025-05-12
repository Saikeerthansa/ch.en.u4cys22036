import React, { useEffect, useState } from "react";
import { getStocks, getStockPrice } from "../utils/api";
import { getcorrelation } from "../utils/math";
import Heatmap from "../components/Heatmap";
import TimeSelector from "../components/TimeSelector";

const CorrelationHeatmapPage = () => {
  const [tickers, setTickers] = useState([]);
  const [priceData, setPriceData] = useState({});
  const [correlationMatrix, setCorrelationMatrix] = useState([]);
  const [selectedRange, setSelectedRange] = useState("6m");

  useEffect(() => {
    const fetchData = async () => {
      const stockMap = await getStocks();
      const tickersList = Object.values(stockMap);
      setTickers(tickersList);

      const allPrices = {};
      for (const ticker of tickersList) {
        try {
          const data = await getStockPrice(ticker, selectedRange); // API must support range
          allPrices[ticker] = data.map((d) => d.price);
        } catch (err) {
          allPrices[ticker] = [];
          console.error(`Error fetching ${ticker}:`, err);
        }
      }

      setPriceData(allPrices);
    };

    fetchData();
  }, [selectedRange]);

  useEffect(() => {
    if (Object.keys(priceData).length > 0) {
      const matrix = tickers.map((t1) =>
        tickers.map((t2) => {
          const x = priceData[t1];
          const y = priceData[t2];
          if (!x || !y || x.length !== y.length || x.length === 0) return 0;
          return parseFloat(getcorrelation(x, y).toFixed(2));
        })
      );
      setCorrelationMatrix(matrix);
    }
  }, [priceData, tickers]);

  return (
    <div style={{ padding: "20px" }}>
      <h2>Correlation Heatmap</h2>
      <TimeSelector selectedRange={selectedRange} onChange={setSelectedRange} />
      <Heatmap tickers={tickers} correlationMatrix={correlationMatrix} />
    </div>
  );
};

export default CorrelationHeatmapPage;