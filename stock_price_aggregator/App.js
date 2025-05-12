import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import StockPage from "./pages/stockpage";
import CorrelationHeatmapPage from "./pages/heatmapcorrelationpage";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<StockPage />} />
        <Route path="/heatmap" element={<CorrelationHeatmapPage />} />
      </Routes>
    </Router>
  );
};

export default App;