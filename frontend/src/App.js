import React, { useState, useEffect } from 'react';
import './App.css';
import ExplanationForm from './components/ExplanationForm';
import ExplanationResult from './components/ExplanationResult';
import Header from './components/Header';

function App() {
  const [availableModels, setAvailableModels] = useState([]);
  const [explanation, setExplanation] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {

    fetch('/api/models')
      .then(response => response.json())
      .then(data => setAvailableModels(data.models))
      .catch(error => console.error('Error fetching models:', error));
  }, []);

  const handleExplainRequest = async (text) => {
    setIsLoading(true);
    try {
      const response = await fetch('/api/explain', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text }),
      });

      const data = await response.json();
      setExplanation(data.explanation);
    } catch (error) {
      console.error('Error getting explanation:', error);
      setExplanation('Sorry, something went wrong while getting your explanation.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="app-container">
      <Header models={availableModels} />
      <div className="content">
        <ExplanationForm onSubmit={handleExplainRequest} isLoading={isLoading} />
        {explanation && <ExplanationResult explanation={explanation} />}
      </div>
    </div>
  );
}

export default App;