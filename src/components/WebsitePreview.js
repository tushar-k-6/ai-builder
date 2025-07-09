import React, { useState, useRef } from 'react';
import { 
  Eye, Code, Download, Smartphone, Monitor, Edit, Wand2, RefreshCw, 
  Share2, Copy, ZoomIn, ZoomOut, FileText, Palette, Settings
} from 'lucide-react';

const WebsitePreview = ({ websiteData, onImprove, isImproving }) => {
  const [viewMode, setViewMode] = useState('preview');
  const [deviceMode, setDeviceMode] = useState('desktop');
  const [improvementPrompt, setImprovementPrompt] = useState('');
  const [showImprovementInput, setShowImprovementInput] = useState(false);
  const [zoom, setZoom] = useState(100);
  const [activeCodeTab, setActiveCodeTab] = useState('html');
  const iframeRef = useRef(null);

  const quickImprovements = [
    { icon: '🎨', text: 'Make it more colorful and vibrant' },
    { icon: '📱', text: 'Improve mobile responsiveness' },
    { icon: '⚡', text: 'Add loading animations' },
    { icon: '🌙', text: 'Add dark mode toggle' },
    { icon: '✨', text: 'Add hover effects and transitions' },
    { icon: '📝', text: 'Add a contact form' },
    { icon: '📊', text: 'Add testimonials section' },
    { icon: '🔄', text: 'Add image carousel' }
  ];

  if (!websiteData) return null;

  const generateFullHTML = () => {
    return `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${websiteData.title || 'Generated Website'}</title>
    <meta name="description" content="${websiteData.description || 'AI-generated website'}">
    <style>
        ${websiteData.css || ''}
    </style>
</head>
<body>
    ${websiteData.html || ''}
    <script>
        ${websiteData.js || ''}
    </script>
</body>
</html>`;
  };

  const downloadWebsite = () => {
    const fullHTML = generateFullHTML();
    const blob = new Blob([fullHTML], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${websiteData.title?.replace(/\s+/g, '-').toLowerCase() || 'website'}.html`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleImprovement = (improvement) => {
    const finalPrompt = improvement || improvementPrompt;
    if (finalPrompt.trim()) {
      onImprove(finalPrompt);
      setImprovementPrompt('');
      setShowImprovementInput(false);
    }
  };

  const handleQuickImprovement = (improvement) => {
    handleImprovement(improvement.text);
  };

  const refreshPreview = () => {
    if (iframeRef.current) {
      const iframe = iframeRef.current;
      iframe.src = 'about:blank';
      setTimeout(() => {
        iframe.src = 'data:text/html;charset=utf-8,' + encodeURIComponent(generateFullHTML());
      }, 100);
    }
  };

  const copyToClipboard = async (content, type) => {
    try {
      await navigator.clipboard.writeText(content);
      console.log(`${type} copied to clipboard!`);
    } catch (err) {
      console.error('Failed to copy: ', err);
    }
  };

  return (
    <div className="container-fluid fade-in-up" style={{maxWidth: '95rem'}}>
      <div className="card shadow-lg border-0 hover-lift">
        {/* Enhanced Header */}
        <div className="card-header bg-white border-bottom-0 py-3">
          <div className="row align-items-center">
            <div className="col-md-6">
              <div className="d-flex align-items-center">
                <h2 className="h5 mb-0 fw-bold me-3">
                  {websiteData.title || 'Generated Website'}
                </h2>
                <div className="btn-group btn-group-sm" role="group">
                  <button
                    onClick={refreshPreview}
                    className="btn btn-outline-secondary hover-glow"
                    title="Refresh Preview"
                  >
                    <RefreshCw style={{width: '1rem', height: '1rem'}} />
                  </button>
                </div>
              </div>
            </div>
            
            <div className="col-md-6">
              <div className="d-flex align-items-center justify-content-md-end gap-2 flex-wrap">
                {/* View Mode Toggle */}
                <div className="btn-group" role="group">
                  <input
                    type="radio"
                    className="btn-check"
                    name="viewMode"
                    id="preview-mode"
                    checked={viewMode === 'preview'}
                    onChange={() => setViewMode('preview')}
                  />
                  <label className="btn btn-outline-primary btn-sm" htmlFor="preview-mode">
                    <Eye className="me-1" style={{width: '1rem', height: '1rem'}} />
                    Preview
                  </label>

                  <input
                    type="radio"
                    className="btn-check"
                    name="viewMode"
                    id="code-mode"
                    checked={viewMode === 'code'}
                    onChange={() => setViewMode('code')}
                  />
                  <label className="btn btn-outline-primary btn-sm" htmlFor="code-mode">
                    <Code className="me-1" style={{width: '1rem', height: '1rem'}} />
                    Code
                  </label>
                </div>

                {/* Device Mode Toggle */}
                {viewMode === 'preview' && (
                  <div className="btn-group" role="group">
                    <input
                      type="radio"
                      className="btn-check"
                      name="deviceMode"
                      id="desktop-mode"
                      checked={deviceMode === 'desktop'}
                      onChange={() => setDeviceMode('desktop')}
                    />
                    <label className="btn btn-outline-secondary btn-sm" htmlFor="desktop-mode">
                      <Monitor style={{width: '1rem', height: '1rem'}} />
                    </label>

                    <input
                      type="radio"
                      className="btn-check"
                      name="deviceMode"
                      id="mobile-mode"
                      checked={deviceMode === 'mobile'}
                      onChange={() => setDeviceMode('mobile')}
                    />
                    <label className="btn btn-outline-secondary btn-sm" htmlFor="mobile-mode">
                      <Smartphone style={{width: '1rem', height: '1rem'}} />
                    </label>
                  </div>
                )}

                {/* Zoom Controls */}
                {viewMode === 'preview' && (
                  <div className="btn-group" role="group">
                    <button
                      onClick={() => setZoom(Math.max(50, zoom - 25))}
                      className="btn btn-outline-secondary btn-sm"
                      title="Zoom Out"
                    >
                      <ZoomOut style={{width: '1rem', height: '1rem'}} />
                    </button>
                    <button className="btn btn-outline-secondary btn-sm" disabled>
                      {zoom}%
                    </button>
                    <button
                      onClick={() => setZoom(Math.min(200, zoom + 25))}
                      className="btn btn-outline-secondary btn-sm"
                      title="Zoom In"
                    >
                      <ZoomIn style={{width: '1rem', height: '1rem'}} />
                    </button>
                  </div>
                )}

                {/* Action Buttons */}
                <button
                  onClick={() => setShowImprovementInput(!showImprovementInput)}
                  className={`btn btn-gradient btn-sm hover-lift ${isImproving ? 'loading-fade' : ''}`}
                  disabled={isImproving}
                >
                  {isImproving ? (
                    <>
                      <div className="spinner-border spinner-border-sm me-1 spinner-glow" role="status">
                        <span className="visually-hidden">Loading...</span>
                      </div>
                      Improving...
                    </>
                  ) : (
                    <>
                      <Edit className="me-1" style={{width: '1rem', height: '1rem'}} />
                      Improve
                    </>
                  )}
                </button>
                
                <button
                  onClick={downloadWebsite}
                  className="btn btn-gradient-success btn-sm hover-lift"
                >
                  <Download className="me-1" style={{width: '1rem', height: '1rem'}} />
                  Download
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Improvements Bar */}
        {showImprovementInput && (
          <div className="card-body bg-light border-bottom slide-in-right">
            <h6 className="fw-bold mb-3">
              <Wand2 className="me-2" style={{width: '1.25rem', height: '1.25rem'}} />
              Quick Improvements
            </h6>
            <div className="row g-2 mb-3">
              {quickImprovements.map((improvement, index) => (
                <div key={index} className="col-6 col-md-3">
                  <button
                    onClick={() => handleQuickImprovement(improvement)}
                    disabled={isImproving}
                    className={`btn btn-outline-primary btn-sm w-100 hover-glow ${isImproving ? 'loading-fade' : ''}`}
                    style={{minHeight: '2.5rem'}}
                  >
                    {isImproving ? (
                      <>
                        <div className="spinner-border spinner-border-sm me-1 spinner-glow" style={{width: '0.8rem', height: '0.8rem'}} role="status">
                          <span className="visually-hidden">Loading...</span>
                        </div>
                        <small>Working...</small>
                      </>
                    ) : (
                      <>
                        <span className="me-1">{improvement.icon}</span>
                        <small>{improvement.text}</small>
                      </>
                    )}
                  </button>
                </div>
              ))}
            </div>
            
            <div className="row">
              <div className="col-12">
                <div className="input-group">
                  <input
                    type="text"
                    value={improvementPrompt}
                    onChange={(e) => setImprovementPrompt(e.target.value)}
                    placeholder="Describe specific improvements..."
                    className="form-control"
                    disabled={isImproving}
                  />
                  <button
                    onClick={() => handleImprovement()}
                    disabled={!improvementPrompt.trim() || isImproving}
                    className={`btn btn-gradient ${isImproving ? 'loading-fade' : ''}`}
                  >
                    {isImproving ? (
                      <div className="spinner-border spinner-border-sm spinner-glow" role="status">
                        <span className="visually-hidden">Loading...</span>
                      </div>
                    ) : (
                      <Wand2 style={{width: '1rem', height: '1rem'}} />
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Loading Message for Improvements */}
        {isImproving && (
          <div className="card-body bg-info bg-opacity-10 border-bottom slide-in-right">
            <div className="d-flex align-items-center justify-content-center py-2">
              <div className="spinner-border spinner-border-sm text-info me-3 spinner-glow" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
              <div className="text-info fw-bold pulse-animation">
                🧠 AI is improving your website... This may take a few moments.
              </div>
            </div>
          </div>
        )}

        {/* Content */}
        <div className="card-body p-0">
          {viewMode === 'preview' ? (
            <div className="d-flex justify-content-center p-4">
              <div
                className="w-100"
                style={{
                  maxWidth: deviceMode === 'mobile' ? '24rem' : '100%',
                  transition: 'all 0.3s ease',
                  transform: `scale(${zoom / 100})`
                }}
              >
                <div className="position-relative">
                  {deviceMode === 'mobile' && (
                    <div className="phone-frame p-3 mx-auto" style={{
                      background: '#2d3748',
                      borderRadius: '2rem',
                      maxWidth: '24rem',
                      padding: '1rem'
                    }}>
                      <iframe
                        ref={iframeRef}
                        src={`data:text/html;charset=utf-8,${encodeURIComponent(generateFullHTML())}`}
                        className="w-100 border-0 rounded"
                        style={{
                          height: '32rem',
                          borderRadius: '1rem'
                        }}
                        title="Website Preview"
                      />
                    </div>
                  )}
                  {deviceMode === 'desktop' && (
                    <iframe
                      ref={iframeRef}
                      src={`data:text/html;charset=utf-8,${encodeURIComponent(generateFullHTML())}`}
                      className="w-100 border rounded shadow-sm"
                      style={{
                        height: '40rem',
                        maxHeight: '70vh'
                      }}
                      title="Website Preview"
                    />
                  )}
                </div>
              </div>
            </div>
          ) : (
            <div className="p-4">
              {/* Code Tab Navigation */}
              <div className="row mb-3">
                <div className="col-12">
                  <ul className="nav nav-pills" role="tablist">
                    {websiteData.html && (
                      <li className="nav-item" role="presentation">
                        <button
                          className={`nav-link ${activeCodeTab === 'html' ? 'active' : ''}`}
                          onClick={() => setActiveCodeTab('html')}
                          type="button"
                        >
                          <FileText className="me-1" style={{width: '1rem', height: '1rem'}} />
                          HTML
                        </button>
                      </li>
                    )}
                    {websiteData.css && (
                      <li className="nav-item" role="presentation">
                        <button
                          className={`nav-link ${activeCodeTab === 'css' ? 'active' : ''}`}
                          onClick={() => setActiveCodeTab('css')}
                          type="button"
                        >
                          <Palette className="me-1" style={{width: '1rem', height: '1rem'}} />
                          CSS
                        </button>
                      </li>
                    )}
                    {websiteData.js && (
                      <li className="nav-item" role="presentation">
                        <button
                          className={`nav-link ${activeCodeTab === 'js' ? 'active' : ''}`}
                          onClick={() => setActiveCodeTab('js')}
                          type="button"
                        >
                          <Settings className="me-1" style={{width: '1rem', height: '1rem'}} />
                          JavaScript
                        </button>
                      </li>
                    )}
                  </ul>
                </div>
              </div>

              {/* Code Content */}
              <div className="row">
                <div className="col-12">
                  {activeCodeTab === 'html' && websiteData.html && (
                    <div className="code-block">
                      <div className="d-flex justify-content-between align-items-center p-3 border-bottom border-secondary">
                        <h6 className="text-white mb-0">HTML</h6>
                        <button
                          onClick={() => copyToClipboard(websiteData.html, 'HTML')}
                          className="btn btn-outline-light btn-sm"
                        >
                          <Copy style={{width: '1rem', height: '1rem'}} />
                        </button>
                      </div>
                      <pre className="text-light p-3 mb-0 overflow-auto" style={{fontSize: '0.875rem', maxHeight: '30rem'}}>
                        <code>{websiteData.html}</code>
                      </pre>
                    </div>
                  )}
                  
                  {activeCodeTab === 'css' && websiteData.css && (
                    <div className="code-block">
                      <div className="d-flex justify-content-between align-items-center p-3 border-bottom border-secondary">
                        <h6 className="text-white mb-0">CSS</h6>
                        <button
                          onClick={() => copyToClipboard(websiteData.css, 'CSS')}
                          className="btn btn-outline-light btn-sm"
                        >
                          <Copy style={{width: '1rem', height: '1rem'}} />
                        </button>
                      </div>
                      <pre className="text-light p-3 mb-0 overflow-auto" style={{fontSize: '0.875rem', maxHeight: '30rem'}}>
                        <code>{websiteData.css}</code>
                      </pre>
                    </div>
                  )}
                  
                  {activeCodeTab === 'js' && websiteData.js && (
                    <div className="code-block">
                      <div className="d-flex justify-content-between align-items-center p-3 border-bottom border-secondary">
                        <h6 className="text-white mb-0">JavaScript</h6>
                        <button
                          onClick={() => copyToClipboard(websiteData.js, 'JavaScript')}
                          className="btn btn-outline-light btn-sm"
                        >
                          <Copy style={{width: '1rem', height: '1rem'}} />
                        </button>
                      </div>
                      <pre className="text-light p-3 mb-0 overflow-auto" style={{fontSize: '0.875rem', maxHeight: '30rem'}}>
                        <code>{websiteData.js}</code>
                      </pre>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default WebsitePreview;
