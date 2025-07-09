import React, { useState } from 'react';
import { AlertCircle } from 'lucide-react';

const ErrorMessage = ({ error, onClose }) => {
  if (!error) return null;

  return (
    <div className="position-fixed top-0 end-0 m-3" style={{zIndex: 1050, maxWidth: '24rem'}}>
      <div className="alert alert-danger alert-dismissible d-flex align-items-start">
        <AlertCircle className="me-2 mt-1 flex-shrink-0" style={{width: '1.25rem', height: '1.25rem'}} />
        <div className="flex-grow-1">
          <h6 className="alert-heading mb-1">Error</h6>
          <p className="mb-0 small">{error}</p>
        </div>
        <button
          type="button"
          className="btn-close"
          onClick={onClose}
          aria-label="Close"
        ></button>
      </div>
    </div>
  );
};

const LoadingSpinner = ({ message }) => (
  <div className="position-fixed top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center" style={{backgroundColor: 'rgba(0,0,0,0.5)', zIndex: 1050}}>
    <div className="bg-white rounded p-4 text-center" style={{maxWidth: '20rem', margin: '0 1rem'}}>
      <div className="spinner-border text-primary mb-3" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
      <p className="text-muted mb-0">{message || 'Loading...'}</p>
    </div>
  </div>
);

const ApiKeyPrompt = ({ onApiKeySubmit, isVisible }) => {
  const [apiKey, setApiKey] = useState('');

  if (!isVisible) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (apiKey.trim()) {
      onApiKeySubmit(apiKey.trim());
    }
  };

  return (
    <div className="position-fixed top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center" style={{backgroundColor: 'rgba(0,0,0,0.5)', zIndex: 1050}}>
      <div className="bg-white rounded p-4" style={{maxWidth: '28rem', margin: '0 1rem'}}>
        <h2 className="h4 fw-bold mb-3">Gemini API Key Required</h2>
        <p className="text-muted mb-4">
          To use the AI website builder, you need to provide your Google Gemini API key. 
          You can get one from the Google AI Studio.
        </p>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <input
              type="password"
              className="form-control"
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
              placeholder="Enter your Gemini API key"
              required
            />
          </div>
          <div className="d-flex gap-2">
            <button
              type="submit"
              className="btn btn-primary flex-grow-1"
            >
              Continue
            </button>
          </div>
        </form>
        <p className="text-muted small mt-3 mb-0">
          Your API key is stored locally and never sent to our servers.
        </p>
      </div>
    </div>
  );
};

export { ErrorMessage, LoadingSpinner, ApiKeyPrompt };
