const https = require('https');

exports.handler = async (event) => {
    const { token } = JSON.parse(event.body);
    const secretKey = "YOUR_SECRET_KEY_HERE"; 

    return new Promise((resolve) => {
        const url = `https://www.google.com/recaptcha/api/siteverify?secret=${secretKey}&response=${token}`;
        
        https.get(url, (res) => {
            let data = '';
            res.on('data', (chunk) => { data += chunk; });
            res.on('end', () => {
                const result = JSON.parse(data);
                resolve({
                    statusCode: 200,
                    body: JSON.stringify({ success: result.success })
                });
            });
        }).on('error', () => {
            resolve({ statusCode: 500, body: "Error connecting to Google" });
        });
    });
};
