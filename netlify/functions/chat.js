exports.handler = async (event) => {
    // 1. Get the data from your website
    const { message, aiType } = JSON.parse(event.body);
    
    // 2. Set the personality
    const systemPrompt = aiType === 'Oliver' 
        ? "You are Oliver, an IT Expert. Be technical and precise. Disclaimer: I provide technical guidance but am not liable for hardware damage." 
        : "You are Chibs, a friendly general assistant. Be casual and kind. Disclaimer: My responses are for informational purposes only.";

    // 3. Talk to OpenRouter
    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
        method: "POST",
        headers: {
            "Authorization": `Bearer ${process.env.OPENROUTER_API_KEY}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            model: "meta-llama/llama-3.1-8b-instruct:free",
            messages: [
                { role: "system", content: systemPrompt }, 
                { role: "user", content: message }
            ]
        })
    });

    const data = await response.json();
    
    // 4. Send the reply back to your browser
    return { 
        statusCode: 200, 
        body: JSON.stringify({ reply: data.choices[0].message.content }) 
    };
};
