import React from 'react';

function Loading() {
  return (
    <div id="loading" className="loading">
      <div className="spinner"></div>
      <p>Analyzing website...</p>
    </div>
  );
}

export default Loading;