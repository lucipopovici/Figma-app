"use client";

// 1. Import Statements
import React, { useState } from 'react';

// Define your styles directly using React.CSSProperties for TypeScript recognition
const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '20px',
  } as React.CSSProperties,
  button: {
    marginTop: '10px',
    cursor: 'pointer', // Add more styles as needed
  } as React.CSSProperties,
  resultSection: {
    marginTop: '20px',
    // Add more styles as needed
  } as React.CSSProperties,
  textarea: {
    width: '80%', // Example width
    height: '100px', // Example height
    // Add more styles as needed
  } as React.CSSProperties,
};



// 2. Component Definition
const Plugin = () => {
  const [inputText, setInputText] = useState(''); // Tracks the user input
  const [resultText, setResultText] = useState(''); // Tracks the AI response

  // Event handlers
  const handleInputChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInputText(event.target.value);
  };

  const handleButtonClick = async () => {
    // Construct the request body with the user's input
    const requestBody = {
      layers: [inputText], // Adjust according to how you want to structure the request
    };
  
    // Make the POST request to your backend
  const response = await fetch('https://figma-app-two.vercel.app/api/completion/route', { 
    method: 'POST', 
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(requestBody),
  });
  
    if (response.ok) {
      const data = await response.text(); // or response.json() if your backend sends JSON
      setResultText(`AI Response: ${data}`);
    } else {
      // Handle errors
      console.error('Failed to fetch AI response');
    }
  };
  

  // JSX return for the component
  return (
    <div style={styles.container}>
      <textarea
        style={styles.textarea}
        value={inputText}
        onChange={handleInputChange}
        placeholder="Type your sentence here..."
      ></textarea>
      <button style={styles.button} onClick={handleButtonClick}>Generate</button>
      <div style={styles.resultSection}>
        {resultText && <p>{resultText}</p>}
      </div>
    </div>
  );
};

export default Plugin;

