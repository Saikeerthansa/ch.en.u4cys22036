const express = require('express');
const axios = require('axios');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 9876;
const windowSize = parseInt(process.env.WINDOW_SIZE, 10);
const testServerUrl = process.env.TEST_SERVER_URL;

let windowState = [];

const fetchNumbers = async (id) => {
  let url;

  switch (id) {
    case 'p':
      url = `${testServerUrl}/primes`;
      break;
    case 'f':
      url = `${testServerUrl}/fibo`;
      break;
    case 'e':
      url = `${testServerUrl}/even`;
      break;
    case 'r':
      url = `${testServerUrl}/rand`;
      break;
    default:
      throw new Error('Invalid ID');
  }

  try {

    const headers = {
      'Authorization': `Bearer ${process.env.API_KEY}`,
    };

    const response = await axios.get(url, { timeout: 500, headers });
    return response.data.numbers || []; 
  } catch (error) {
    console.error(`Error fetching numbers from ${url}:`, error.response ? error.response.data : error.message);
    return []; 
  }
};

const calculateAverage = (numbers) => {
  if (numbers.length === 0) return 0;
  const sum = numbers.reduce((acc, num) => acc + num, 0);
  return parseFloat((sum / numbers.length).toFixed(2)); 
};

app.get('/numbers/:numberid', async (req, res) => {
  const { numberid } = req.params;

  const newNumbers = await fetchNumbers(numberid);

  if (newNumbers.length > 0) {
    newNumbers.forEach((num) => {
      if (!windowState.includes(num)) {
        windowState.push(num);
      }
    });

    if (windowState.length > windowSize) {
      windowState = windowState.slice(-windowSize);
    }

    const avg = calculateAverage(windowState);

    return res.json({
      windowPrevState: windowState.length > windowSize ? windowState.slice(0, -1) : [],
      windowCurrState: windowState,
      numbers: newNumbers,
      avg,
    });
  } else {
    return res.status(400).json({
      error: 'No valid numbers received from the API. Please check the service status.',
      receivedNumbers: newNumbers,
    });
  }
});

app.listen(port, () => {
  console.log(`Average Calculator Microservice is running on http://localhost:${port}`);
});