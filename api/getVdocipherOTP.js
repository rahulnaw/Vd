// api/getVdocipherOTP.js

const fetch = require('node-fetch');

module.exports = async (req, res) => {
    const vdocipherApiKey = 'rAJ0b4D8snjx8zSLc6MArhRpRnkhCXyJzWQUEf689ppBbxSLMCpsIZyDclNqkftu';
    const videoId = '1fdf6a21d9594c5ebc2e4aef345af8de';

    try {
        const response = await fetch(`https://dev.vdocipher.com/api/videos/${videoId}/otp`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Authorization': `Apisecret ${vdocipherApiKey}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                ttl: 300
            })
        });

        const data = await response.json();

        // Set CORS headers to allow requests from any origin
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, POST, GET');
        res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

        res.json(data);
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};
