import React, { useState } from 'react';

function ExplanationForm({ onSubmit, isLoading }) {
  const [userInput, setUserInput] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!userInput.trim()) return;
    onSubmit(userInput);
  };

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="userInput">What do you want explained in simple terms?</label>
          <textarea
            id="userInput"
            className="form-control"
            rows="3"
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
            placeholder="Enter a concept, topic, or question..."
            disabled={isLoading}
          />
        </div>
        <button
          type="submit"
          className="submit-button"
          disabled={isLoading || !userInput.trim()}
        >
          {isLoading ? 'Getting explanation...' : 'Explain It!'}
        </button>
      </form>

      {isLoading && (
        <div className="loading-indicator">
          <div className="spinner"></div>
          <p>Asking Gemini for a simple explanation...</p>
        </div>
      )}
    </div>
  );
}

export default ExplanationForm;