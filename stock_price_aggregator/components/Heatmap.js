import React from "react";
import "./heatmap.css";

function getColor(value) {
  if (value === null || isNaN(value)) {
    return "#eee";
  }
  const hue = ((1 - value) * 120).toString(10);
  return `hsl(${hue}, 80%, 70%)`;
}

const Heatmap = ({ tickers, correlationMatrix }) => {
  return (
    <div className="heatmap-container">
      <div className="heatmap-grid">
        <div className="corner" />
        {tickers.map((ticker) => (
          <div className="header" key={`col-${ticker}`}>
            {ticker}
          </div>
        ))}
        {tickers.map((rowTicker, i) => (
          <React.Fragment key={`row-${rowTicker}`}>
            <div className="header">{rowTicker}</div>
            {correlationMatrix[i] &&
              correlationMatrix[i].map((value, j) => (
                <div
                  key={`${i}-${j}`}
                  className="cell"
                  style={{
                    backgroundColor: getColor(value),
                  }}
                  title={`Corr(${rowTicker}, ${tickers[j]}) = ${value}`}
                >
                  {value}
                </div>
              ))}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default Heatmap;