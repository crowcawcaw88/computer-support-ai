const https = require('https');

exports.handler = async (event) => {
    let token;
    try {
        const body = JSON.parse(event.body);
        token = body.token;
    } catch (e) {
        return { statusCode: 400, body: "Invalid request" };
    }

    // This grabs the key from your Netlify 'Environment Variables' vault
    const secretKey = process.env.SECRET_KEY; 

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
