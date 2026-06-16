exports.handler = async (event) => {
    if (event.httpMethod !== 'POST') {
        return { statusCode: 405, body: "Method Not Allowed" };
    }

    const { token } = JSON.parse(event.body);
    const secretKey = "6LdT3h0tAAAAABTX-k-FTGT0uTgHb7ZvL7ejL1SL"; 

    try {
        const response = await fetch(`https://www.google.com/recaptcha/api/siteverify?secret=${secretKey}&response=${token}`, {
            method: 'POST'
        });

        const data = await response.json();

        return {
            statusCode: 200,
            body: JSON.stringify({ success: data.success })
        };
    } catch (error) {
        return { statusCode: 500, body: JSON.stringify({ error: "Failed to connect" }) };
    }
};
