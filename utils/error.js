// Function to create custom errors
const createCustomError = (message, code) => {
    const error = new Error(message);
    error.code = code;
    return error;
  }
  
module.exports = createCustomError;
