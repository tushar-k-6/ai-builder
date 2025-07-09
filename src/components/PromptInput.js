import React, { useState, useEffect } from 'react';
import { Wand2, Send, Loader2, Sparkles, Lightbulb, Zap, Star, ArrowRight, RefreshCw } from 'lucide-react';

const PromptInput = ({ onGenerate, isLoading }) => {
  const [prompt, setPrompt] = useState('');
  const [enhancedPrompt, setEnhancedPrompt] = useState('');
  const [showEnhancer, setShowEnhancer] = useState(false);
  const [isEnhancing, setIsEnhancing] = useState(false);
  const [activeCategory, setActiveCategory] = useState('business');

  const categories = {
    business: {
      icon: '💼',
      examples: [
        'Create a modern SaaS landing page with pricing tiers, testimonials, and CTA buttons',
        'Build a digital marketing agency website with portfolio showcase and client reviews',
        'Design a consulting firm website with service pages, team profiles, and contact forms',
        'Create a startup company website with hero section, features, and investor relations page'
      ]
    },
    portfolio: {
      icon: '🎨',
      examples: [
        'Create a photographer portfolio with image gallery, about section, and booking system',
        'Build a graphic designer showcase with project case studies and client testimonials',
        'Design a web developer portfolio with interactive code examples and skill showcase',
        'Create an artist portfolio with artwork gallery, bio, and commission information'
      ]
    },
    ecommerce: {
      icon: '🛍️',
      examples: [
        'Build an online fashion store with product grid, filters, cart, and wishlist',
        'Create a tech gadgets e-commerce site with product reviews and comparison table',
        'Design a handmade crafts marketplace with seller profiles and rating system',
        'Build a subscription box service website with plan options and customization'
      ]
    },
    blog: {
      icon: '✍️',
      examples: [
        'Create a technology blog with article grid, categories, and search functionality',
        'Build a lifestyle blog with featured posts, Instagram feed, and newsletter signup',
        'Design a food blog with recipe cards, nutrition info, and cooking tips',
        'Create a travel blog with destination guides, photo galleries, and trip planning'
      ]
    },
    restaurant: {
      icon: '🍕',
      examples: [
        'Create a fine dining restaurant website with menu, reservation system, and gallery',
        'Build a food truck website with location tracker, menu, and social media links',
        'Design a bakery website with product showcase, online ordering, and pickup times',
        'Create a coffee shop website with menu, events calendar, and loyalty program info'
      ]
    },
    education: {
      icon: '🎓',
      examples: [
        'Build an online course platform with course grid, instructor profiles, and enrollment',
        'Create a university department website with faculty bios, research, and programs',
        'Design a coding bootcamp website with curriculum, student projects, and testimonials',
        'Build a language learning website with lesson plans, progress tracking, and resources'
      ]
    }
  };

  const [promptSuggestions, setPromptSuggestions] = useState(categories.business.examples);

  const promptEnhancers = [
    "Add modern animations and hover effects",
    "Include responsive design for mobile and tablet",
    "Add dark mode toggle functionality",
    "Include accessibility features and ARIA labels",
    "Add loading states and micro-interactions",
    "Include form validation and error handling",
    "Add gradient backgrounds and glass effects",
    "Include smooth scrolling and parallax effects"
  ];

  useEffect(() => {
    // Set static suggestions from the selected category
    setPromptSuggestions(categories[activeCategory].examples);
  }, [activeCategory]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const finalPrompt = enhancedPrompt || prompt;
    if (finalPrompt.trim() && !isLoading) {
      onGenerate(finalPrompt);
    }
  };

  const handleExampleClick = (example) => {
    setPrompt(example);
    setEnhancedPrompt('');
  };

  const enhancePrompt = async () => {
    if (!prompt.trim()) return;
    
    setIsEnhancing(true);
    
    // Quick prompt enhancement with pre-defined combinations
    setTimeout(() => {
      const enhancerCombinations = [
        ["Add modern animations and hover effects", "Include responsive design for mobile and tablet", "Add gradient backgrounds and glass effects"],
        ["Include dark mode toggle functionality", "Add loading states and micro-interactions", "Include smooth scrolling and parallax effects"],
        ["Include accessibility features and ARIA labels", "Include form validation and error handling", "Add modern animations and hover effects"],
        ["Add gradient backgrounds and glass effects", "Include responsive design for mobile and tablet", "Add loading states and micro-interactions"]
      ];
      
      const randomCombination = enhancerCombinations[Math.floor(Math.random() * enhancerCombinations.length)];
      const enhanced = `${prompt}. ${randomCombination.join(', ')}. Make it visually stunning with modern UI/UX principles.`;
      setEnhancedPrompt(enhanced);
      setIsEnhancing(false);
    }, 800); // Reduced from 2000ms to 800ms for faster response
  };

  const generateRandomPrompt = () => {
    const categoryKeys = Object.keys(categories);
    const randomCategory = categoryKeys[Math.floor(Math.random() * categoryKeys.length)];
    const examples = categories[randomCategory].examples;
    const randomExample = examples[Math.floor(Math.random() * examples.length)];
    setPrompt(randomExample);
    setActiveCategory(randomCategory); // Also update the active category to match
  };

  return (
    <div className="container py-5 fade-in-up">
      <div className="row justify-content-center">
        <div className="col-lg-10 col-xl-8">
          {/* Hero Section */}
          <div className="text-center mb-5">
            <div className="d-flex align-items-center justify-content-center mb-4">
              <div className="me-3 floating">
                <Wand2 className="text-white" style={{width: '3rem', height: '3rem'}} />
              </div>
              <h1 className="display-3 fw-bold text-white mb-0">Generative AI Website Builder</h1>
              <div className="ms-3 pulse-animation">
                <Sparkles className="text-warning" style={{width: '2rem', height: '2rem'}} />
              </div>
            </div>
            <p className="lead text-white-50 mb-4">
              Transform your ideas into stunning websites with the power of AI
            </p>
            <div className="d-flex justify-content-center gap-3 mb-4">
              <span className="badge bg-light text-dark px-3 py-2 rounded-pill">
                <i className="bi bi-lightning-fill me-1"></i>
                Lightning Fast
              </span>
              <span className="badge bg-light text-dark px-3 py-2 rounded-pill">
                <i className="bi bi-palette-fill me-1"></i>
                Professional Design
              </span>
              <span className="badge bg-light text-dark px-3 py-2 rounded-pill">
                <i className="bi bi-phone-fill me-1"></i>
                Mobile Ready
              </span>
            </div>
          </div>

          {/* Category Selection */}
          <div className="card glass-effect mb-4 hover-lift">
            <div className="card-body">
              <h5 className="card-title text-white mb-3">
                <Lightbulb className="me-2" style={{width: '1.25rem', height: '1.25rem'}} />
                Choose Your Website Type
              </h5>
              <div className="row g-2">
                {Object.entries(categories).map(([key, category]) => (
                  <div key={key} className="col-6 col-md-4 col-lg-2">
                    <button
                      className={`btn w-100 h-100 border-2 transition-all ${
                        activeCategory === key 
                          ? 'btn-light text-dark' 
                          : 'btn-outline-light text-white hover-glow'
                      }`}
                      onClick={() => setActiveCategory(key)}
                    >
                      <div className="text-center py-2">
                        <div className="fs-4 mb-1">{category.icon}</div>
                        <small className="fw-semibold text-capitalize">{key}</small>
                      </div>
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Main Prompt Form */}
          <form onSubmit={handleSubmit} className="mb-4">
            <div className="card glass-effect hover-lift">
              <div className="card-body">
                <div className="row g-3">
                  <div className="col-12">
                    <label className="form-label text-white fw-semibold">
                      Describe Your Website
                    </label>
                    <div className="position-relative">
                      <textarea
                        value={prompt}
                        onChange={(e) => setPrompt(e.target.value)}
                        placeholder="Describe your dream website in detail... (e.g., 'Create a modern portfolio website for a photographer with a gallery section and contact form')"
                        className="form-control form-control-lg border-2"
                        rows="4"
                        disabled={isLoading}
                        style={{
                          paddingRight: '120px',
                          fontSize: '1.1rem',
                          background: 'rgba(255, 255, 255, 0.9)',
                          backdropFilter: 'blur(10px)'
                        }}
                      />
                      <div className="position-absolute top-0 end-0 p-2">
                        <button
                          type="button"
                          onClick={generateRandomPrompt}
                          className="btn btn-outline-secondary btn-sm me-2"
                          disabled={isLoading}
                          title="Generate Random Idea"
                        >
                          <RefreshCw style={{width: '1rem', height: '1rem'}} />
                        </button>
                        <button
                          type="button"
                          onClick={() => setShowEnhancer(!showEnhancer)}
                          className="btn btn-gradient btn-sm"
                          disabled={isLoading}
                          title="AI Enhance"
                        >
                          <Zap style={{width: '1rem', height: '1rem'}} />
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* AI Prompt Enhancer */}
                  {showEnhancer && (
                    <div className="col-12 slide-in-right">
                      <div className="card bg-light">
                        <div className="card-body">
                          <h6 className="card-title">
                            <Sparkles className="me-2" style={{width: '1rem', height: '1rem'}} />
                            AI Prompt Enhancer
                          </h6>
                          <div className="d-flex gap-2 mb-3">
                            <button
                              type="button"
                              onClick={enhancePrompt}
                              disabled={!prompt.trim() || isEnhancing}
                              className="btn btn-gradient-warning btn-sm"
                            >
                              {isEnhancing ? (
                                <>
                                  <Loader2 className="me-1 spinner-border spinner-border-sm" />
                                  Enhancing...
                                </>
                              ) : (
                                <>
                                  <Star className="me-1" style={{width: '1rem', height: '1rem'}} />
                                  Enhance Prompt
                                </>
                              )}
                            </button>
                          </div>
                          {enhancedPrompt && (
                            <div className="enhanced-prompt fade-in-up">
                              <label className="form-label fw-semibold">Enhanced Prompt:</label>
                              <textarea
                                value={enhancedPrompt}
                                onChange={(e) => setEnhancedPrompt(e.target.value)}
                                className="form-control"
                                rows="3"
                                style={{background: 'rgba(255, 255, 255, 0.8)'}}
                              />
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  )}

                  <div className="col-12">
                    <button
                      type="submit"
                      disabled={!(enhancedPrompt || prompt).trim() || isLoading}
                      className="btn btn-gradient btn-lg w-100 py-3 fw-bold hover-lift"
                    >
                      {isLoading ? (
                        <>
                          <Loader2 className="me-2 spinner-border spinner-border-sm" />
                          Creating Your Website...
                        </>
                      ) : (
                        <>
                          <Send className="me-2" style={{width: '1.25rem', height: '1.25rem'}} />
                          Generate Website
                          <ArrowRight className="ms-2" style={{width: '1.25rem', height: '1.25rem'}} />
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </form>

          {/* Example Prompts */}
          <div className="card glass-effect hover-lift">
            <div className="card-body">
              <h5 className="card-title text-white mb-3">
                {categories[activeCategory].icon} {activeCategory.charAt(0).toUpperCase() + activeCategory.slice(1)} Examples
              </h5>
              <div className="row g-3">
                {promptSuggestions.map((example, index) => (
                  <div key={index} className="col-md-6">
                    <button
                      onClick={() => handleExampleClick(example)}
                      className="btn btn-outline-light text-start w-100 p-3 h-100 hover-glow"
                      disabled={isLoading}
                      style={{
                        background: 'rgba(255, 255, 255, 0.1)',
                        backdropFilter: 'blur(10px)',
                        minHeight: '80px'
                      }}
                    >
                      <small className="text-white-75">{example}</small>
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Loading Animation */}
          {isLoading && (
            <div className="text-center py-5 fade-in-up">
              <div className="card glass-effect">
                <div className="card-body">
                  <div className="d-flex align-items-center justify-content-center mb-3">
                    <Loader2 className="text-white me-3 spinner-border" style={{width: '2rem', height: '2rem'}} />
                    <h5 className="text-white mb-0">Creating Your Website</h5>
                  </div>
                  <div className="progress mb-3" style={{height: '8px'}}>
                    <div 
                      className="progress-bar progress-bar-striped progress-bar-animated"
                      style={{
                        width: '100%',
                        background: 'linear-gradient(45deg, #667eea, #764ba2)'
                      }}
                    ></div>
                  </div>
                  <p className="text-white-50 mb-0">
                    Analyzing your requirements and generating beautiful code...
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PromptInput;
