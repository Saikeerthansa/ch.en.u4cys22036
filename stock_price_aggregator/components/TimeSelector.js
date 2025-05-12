import React from "react";

const TimeSelector = ({ selectedRange, onChange }) => {
  return (
    <div style={{ marginBottom: "1rem" }}>
      <label htmlFor="time-range">Select Time Range: </label>
      <select
        id="time-range"
        value={selectedRange}
        onChange={(e) => onChange(e.target.value)}
      >
        <option value="1m">1 Month</option>
        <option value="3m">3 Months</option>
        <option value="6m">6 Months</option>
        <option value="1y">1 Year</option>
        <option value="5y">5 Years</option>
      </select>
    </div>
  );
};

export default TimeSelector;