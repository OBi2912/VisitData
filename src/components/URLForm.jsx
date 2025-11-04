import React, { useState } from 'react';

function URLForm({ onSubmit, onClear }) {
  const [url, setUrl] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isValidUrl(url)) {
      alert('Please enter a valid URL (e.g., https://example.com)');
      return;
    }

    setIsSubmitting(true);
    try {
      await onSubmit(url);
    } finally {
      setIsSubmitting(false);
    }
  };

  const isValidUrl = (string) => {
    try {
      const url = new URL(string);
      return url.protocol === 'http:' || url.protocol === 'https:';
    } catch (_) {
      return false;
    }
  };

  const handleClear = () => {
    setUrl('');
    onClear();
  };

  return (
    <form id="urlForm" className="url-form" onSubmit={handleSubmit}>
      <div className="input-group">
        <input
          type="url"
          id="urlInput"
          placeholder="https://example.com"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          required
          disabled={isSubmitting}
        />
        <button
          type="submit"
          id="checkBtn"
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Analyzing...' : 'Check Views'}
        </button>
        <button
          type="button"
          id="clearBtn"
          className="clear-btn hidden"
          onClick={handleClear}
        >
          Clear
        </button>
      </div>
    </form>
  );
}

export default URLForm;