import axios from 'axios';

const base_url = 'http://20.244.56.144/evaluation-service';

const headers = {
  Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJNYXBDbGFpbXMiOnsiZXhwIjoxNzQ3MDU0MjA0LCJpYXQiOjE3NDcwNTM5MDQsImlzcyI6IkFmZm9yZG1lZCIsImp0aSI6IjA1OGRkOGViLWUzMjItNDViMy04MDNiLTZhNGRiYTkzMDNkZCIsInN1YiI6ImNoLmVuLnU0Y3lzMjIwMzZAY2guc3R1ZGVudHMuYW1yaXRhLmVkdSJ9LCJlbWFpbCI6ImNoLmVuLnU0Y3lzMjIwMzZAY2guc3R1ZGVudHMuYW1yaXRhLmVkdSIsIm5hbWUiOiJwb2RhdnUgc2FpIGtlZXJ0aGFuIHJlZGR5Iiwicm9sbE5vIjoiY2guZW4udTRjeXMyMjAzNiIsImFjY2Vzc0NvZGUiOiJTd3V1S0UiLCJjbGllbnRJRCI6IjA1OGRkOGViLWUzMjItNDViMy04MDNiLTZhNGRiYTkzMDNkZCIsImNsaWVudFNlY3JldCI6IkNnRnVTZ3JqVm1SZkRBV24ifQ.9sXU9NWroBIq64tnb47MB2wAVyi_YulVc7h9bf3fWLU'
};

export const getStocks = async () => {
  try {
    const response = await axios.get(`${base_url}/stocks`, { headers });
    return response.data.stocks;
  } catch (error) {
    console.error('Error fetching stock list:', error);
    throw error;
  }
};

export const getStockPrice = async (ticker, minutes = null) => {
  try {
    const url = minutes
      ? `${base_url}/stocks/${ticker}?minutes=${minutes}`
      : `${base_url}/stocks/${ticker}`;

    const response = await axios.get(url, { headers });
    return response.data;
  } catch (error) {
    console.error(`Error fetching stock price for ${ticker}:`, error);
    throw error;
  }
};
