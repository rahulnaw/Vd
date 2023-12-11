// server.js
const express = require('express');
const fetch = require('node-fetch');
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

app.post('/getVdoCipherOTP', async (req, res) => {
  const { videoId, apiSecret } = req.body;

  try {
    const response = await fetch(`https://dev.vdocipher.com/api/videos/${videoId}/otp`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Apisecret ${apiSecret}`,
      },
      body: JSON.stringify({ ttl: 300 }),
    });

    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error('Error fetching VdoCipher OTP:', error);
    res.status(500).send('Internal Server Error');
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
