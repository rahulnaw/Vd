document.addEventListener("DOMContentLoaded", function () {
    // Replace "YOUR_API_SECRET_KEY" and "VIDEO_ID" with your VdoCipher API secret key and video ID
    const apiSecretKey = "YOUR_API_SECRET_KEY";
    const videoId = "VIDEO_ID";

    // Step 1: HTTP request to obtain OTP
    const requestOptions = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Apisecret ${apiSecretKey}`
        },
        body: JSON.stringify({ ttl: 300 }),
    };

    fetch(`https://dev.vdocipher.com/api/videos/${videoId}/otp`, requestOptions)
        .then(response => response.json())
        .then(data => {
            // Step 2: Use OTP and playbackInfo in embed code
            const otp = data.otp;
            const playbackInfo = data.playbackInfo;

            const iframe = document.createElement("iframe");
            iframe.src = `https://player.vdocipher.com/v2/?otp=${otp}&playbackInfo=${playbackInfo}`;
            iframe.style.border = "0";
            iframe.style.width = "720px";
            iframe.style.height = "405px";
            iframe.allow = "encrypted-media";
            iframe.allowFullscreen = true;

            document.getElementById("vdoCipherPlayer").appendChild(iframe);
        })
        .catch(error => console.error("Error fetching VdoCipher OTP:", error));
});
