import React, { useState, useRef, useEffect } from 'react';
import URLForm from './URLForm';
import Loading from './Loading';
import Results from './Results';
import Error from './Error';

function MainContent({ currentView, url, data, error, onFormSubmit, onClear }) {
  return (
    <main className="main-content">
      {currentView === 'form' && (
        <URLForm onSubmit={onFormSubmit} onClear={onClear} />
      )}

      {currentView === 'loading' && <Loading />}

      {currentView === 'results' && data && (
        <Results url={url} data={data} onClear={onClear} />
      )}

      {currentView === 'error' && (
        <Error message={error} onRetry={() => onFormSubmit(url)} />
      )}
    </main>
  );
}

export default MainContent;