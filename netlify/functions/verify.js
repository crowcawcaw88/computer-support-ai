exports.handler = async (event) => {
    console.log("Function has been triggered!"); // This will show up in Netlify logs
    
    // ... rest of your code ...
    
    // 2. Put your Google Secret Key here!
    const secretKey = "6LdT3h0tAAAAABTX-k-FTGT0uTgHb7ZvL7ejL1SL"; 

    // 3. Ask Google if the token is real
    const response = await fetch(`https://www.google.com/recaptcha/api/siteverify?secret=${secretKey}&response=${token}`, {
        method: 'POST'
    });

    const data = await response.json();

    // 4. If Google says "success: true", then it's a human!
    if (data.success) {
        return { statusCode: 200, body: JSON.stringify({ success: true, message: "Human verified!" }) };
    } else {
        return { statusCode: 400, body: JSON.stringify({ success: false, message: "Robot detected!" }) };
    }
};
