import React from 'react';

function Error({ message, onRetry }) {
  return (
    <div id="error" className="error">
      <p id="errorMessage">{message}</p>
      {onRetry && (
        <button onClick={onRetry} style={{ marginTop: '10px', padding: '10px 20px' }}>
          Try Again
        </button>
      )}
    </div>
  );
}

export default Error;