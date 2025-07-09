import React, { useState, useEffect } from 'react';
import { GoogleGenerativeAI } from '@google/generative-ai';
import PromptInput from './components/PromptInput';
import WebsitePreview from './components/WebsitePreview';
import { ErrorMessage, LoadingSpinner, ApiKeyPrompt } from './components/UIComponents';
import geminiService from './services/geminiService';
import './App.css';

function App() {
  const [websiteData, setWebsiteData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isImproving, setIsImproving] = useState(false);
  const [error, setError] = useState(null);
  const [showApiKeyPrompt, setShowApiKeyPrompt] = useState(false);

  // Random logo emojis for the browser tab
  const logoEmojis = ['🤖', '🚀', '✨', '🎨', '🛠️', '⚡', '🧠', '💡', '🔥', '🌟'];

  useEffect(() => {
    // Set random logo in browser tab
    const randomLogo = logoEmojis[Math.floor(Math.random() * logoEmojis.length)];
    document.title = `${randomLogo} Generative AI Website Builder`;
    
    // Check if API key is needed
    const apiKey = process.env.REACT_APP_GEMINI_API_KEY || localStorage.getItem('gemini_api_key');
    if (!apiKey || apiKey === 'YOUR_GEMINI_API_KEY') {
      setShowApiKeyPrompt(true);
    }
  }, []);

  const handleApiKeySubmit = (apiKey) => {
    localStorage.setItem('gemini_api_key', apiKey);
    geminiService.apiKey = apiKey;
    geminiService.genAI = new GoogleGenerativeAI(apiKey);
    geminiService.model = geminiService.genAI.getGenerativeModel({ model: 'gemini-2.0-flash-exp' });
    setShowApiKeyPrompt(false);
  };

  const handleGenerate = async (prompt) => {
    setIsLoading(true);
    setError(null);
    
    // Change tab title with new random logo when generating
    const randomLogo = logoEmojis[Math.floor(Math.random() * logoEmojis.length)];
    document.title = `${randomLogo} Generative AI Website Builder - Generating...`;
    
    try {
      // Get API key from localStorage if not in env
      const apiKey = process.env.REACT_APP_GEMINI_API_KEY || localStorage.getItem('gemini_api_key');
      if (apiKey && apiKey !== 'YOUR_GEMINI_API_KEY') {
        geminiService.apiKey = apiKey;
        geminiService.genAI = new GoogleGenerativeAI(apiKey);
        geminiService.model = geminiService.genAI.getGenerativeModel({ model: 'gemini-2.0-flash-exp' });
      }
      
      const result = await geminiService.generateWebsite(prompt);
      setWebsiteData(result);
      
      // Update tab title when generation is complete
      const completeLogo = logoEmojis[Math.floor(Math.random() * logoEmojis.length)];
      document.title = `${completeLogo} Generative AI Website Builder - Generated!`;
    } catch (err) {
      console.error('Generation error:', err);
      if (err.message?.includes('API_KEY') || err.message?.includes('401')) {
        setError('Invalid API key. Please check your Gemini API key and try again.');
        setShowApiKeyPrompt(true);
      } else {
        setError('Failed to generate website. Please try again. Make sure you have a valid API key.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleImprove = async (improvementRequest) => {
    if (!websiteData) return;
    
    console.log('🚀 Starting improvement process...', { improvementRequest });
    
    setIsImproving(true);
    setError(null);
    
    // Change tab title during improvement
    const randomLogo = logoEmojis[Math.floor(Math.random() * logoEmojis.length)];
    document.title = `${randomLogo} Generative AI Website Builder - Improving...`;
    
    try {
      console.log('📤 Sending to AI service...', { currentWebsiteData: websiteData });
      const result = await geminiService.improveWebsite(websiteData, improvementRequest);
      
      console.log('📥 Received improved result:', result);
      
      // Check if the result is actually different
      const isChanged = JSON.stringify(result) !== JSON.stringify(websiteData);
      console.log('🔍 Website changed?', isChanged);
      
      setWebsiteData(result);
      
      // Update tab title when improvement is complete
      const completeLogo = logoEmojis[Math.floor(Math.random() * logoEmojis.length)];
      document.title = `${completeLogo} Generative AI Website Builder - Improved!`;
      
      if (!isChanged) {
        console.warn('⚠️ Website data appears unchanged - this might indicate an issue');
      }
    } catch (err) {
      console.error('❌ Improvement error:', err);
      setError('Failed to improve website. Please try again.');
    } finally {
      setIsImproving(false);
    }
  };

  const closeError = () => {
    setError(null);
  };

  return (
    <div className="min-vh-100">
      <div className="container py-5">
        {!websiteData ? (
          <PromptInput onGenerate={handleGenerate} isLoading={isLoading} />
        ) : (
          <div className="d-flex flex-column gap-4">
            <div className="text-center">
              <button
                onClick={() => {
                  setWebsiteData(null);
                  // Reset tab title when creating new website
                  const randomLogo = logoEmojis[Math.floor(Math.random() * logoEmojis.length)];
                  document.title = `${randomLogo} Generative AI Website Builder`;
                }}
                className="btn btn-outline-light btn-lg px-4 hover-lift glass-effect"
                style={{backdropFilter: 'blur(10px)'}}
              >
                ← Create New Website
              </button>
            </div>
            <WebsitePreview 
              websiteData={websiteData} 
              onImprove={handleImprove}
              isImproving={isImproving}
            />
          </div>
        )}
      </div>

      <ErrorMessage error={error} onClose={closeError} />
      <ApiKeyPrompt 
        isVisible={showApiKeyPrompt} 
        onApiKeySubmit={handleApiKeySubmit} 
      />
      
      {isLoading && <LoadingSpinner message="Generating your website..." />}
    </div>
  );
}

export default App;
