import React from 'react';

function ExplanationResult({ explanation }) {
  return (
    <div className="explanation-container">
      <h2>Simple Explanation</h2>
      <div className="explanation-content">
        {explanation}
      </div>
    </div>
  );
}

export default ExplanationResult;