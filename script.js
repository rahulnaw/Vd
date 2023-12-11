const express = require('express');
const fetch = require('node-fetch');
const app = express();

app.use(express.json());

app.post('/getVdoCipherOTP', async (req, res) => {
  try {
    const response = await fetch(`https://dev.vdocipher.com/api/videos/${req.body.videoId}/otp`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Apisecret ${req.body.apiSecret}`
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

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
