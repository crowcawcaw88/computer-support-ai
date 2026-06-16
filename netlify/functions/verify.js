// This is your server-side security guard! 🛡️
exports.handler = async (event, context) => {
  // We get the user's choices from the web page 👆
  const { userSelection } = JSON.parse(event.body);
  
  // This is the secret answer only the server knows! 🤫
  const correctSelection = ["car1", "car2", "car4"]; 

  // We compare the user's guess to our secret answer! ✅
  const isCorrect = JSON.stringify(userSelection.sort()) === JSON.stringify(correctSelection.sort());

  // We send back the result! 📮
  return {
    statusCode: 200,
    body: JSON.stringify({ success: isCorrect }),
  };
};
