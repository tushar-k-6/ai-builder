import { GoogleGenerativeAI } from '@google/generative-ai';

class GeminiService {
  constructor() {
    // You'll need to set your API key here or in environment variables
    this.apiKey = process.env.REACT_APP_GEMINI_API_KEY || 'YOUR_GEMINI_API_KEY';
    this.genAI = new GoogleGenerativeAI(this.apiKey);
    this.model = this.genAI.getGenerativeModel({ model: 'gemini-2.0-flash-exp' });
  }

  async generateWebsite(prompt) {
    try {
      const fullPrompt = `
You are an expert web developer. Generate a complete, modern, responsive website based on this request: "${prompt}"

Please provide the response in the following JSON format:
{
  "html": "complete HTML structure with proper semantic tags",
  "css": "modern CSS with responsive design, flexbox/grid, and beautiful styling",
  "js": "vanilla JavaScript for any interactive features",
  "title": "website title",
  "description": "brief description of the website"
}

Requirements:
- Use modern HTML5 semantic elements
- Create responsive design that works on mobile and desktop
- Include beautiful, modern styling with good color schemes
- Add interactive elements where appropriate
- Use CSS Grid and Flexbox for layouts
- Include proper meta tags and accessibility features
- Make it visually appealing with good typography and spacing
- Don't use external libraries or frameworks in the generated code
- Keep all code inline (no external file references except for common web fonts)

Generate a professional, production-ready website.
`;

      const result = await this.model.generateContent(fullPrompt);
      const response = await result.response;
      const text = response.text();
      
      // Try to parse JSON from the response
      try {
        const jsonMatch = text.match(/\{[\s\S]*\}/);
        if (jsonMatch) {
          return JSON.parse(jsonMatch[0]);
        }
      } catch (parseError) {
        console.error('Failed to parse JSON:', parseError);
      }
      
      // Fallback: create a basic structure if JSON parsing fails
      return {
        html: `<!DOCTYPE html><html><head><title>Generated Website</title></head><body><h1>Generated Content</h1><p>${text}</p></body></html>`,
        css: '',
        js: '',
        title: 'Generated Website',
        description: 'AI-generated website'
      };
    } catch (error) {
      console.error('Error generating website:', error);
      throw error;
    }
  }

  async improveWebsite(currentCode, improvementRequest) {
    try {
      console.log('🔧 Starting website improvement...', { improvementRequest });
      
      const prompt = `
You are an expert web developer. I need you to improve the following website code based on a specific request.

CURRENT WEBSITE CODE:
===================
HTML:
${currentCode.html}

CSS:
${currentCode.css}

JavaScript:
${currentCode.js}

IMPROVEMENT REQUEST: "${improvementRequest}"

INSTRUCTIONS:
- Make specific, noticeable improvements based on the request
- If asked for colors, change color schemes significantly
- If asked for animations, add CSS transitions and hover effects
- If asked for responsive design, improve mobile layouts
- If asked for dark mode, implement a dark color scheme
- Always make visible changes that the user will notice
- Keep the existing structure but enhance it

REQUIRED OUTPUT FORMAT (JSON only, no other text):
{
  "html": "IMPROVED HTML CODE HERE",
  "css": "IMPROVED CSS CODE HERE",
  "js": "IMPROVED JAVASCRIPT CODE HERE",
  "title": "updated title if needed or keep original",
  "description": "updated description if needed or keep original"
}

Respond ONLY with the JSON object, no explanatory text before or after.
`;

      const result = await this.model.generateContent(prompt);
      const response = await result.response;
      const text = response.text();
      
      console.log('📝 AI Response received:', text.substring(0, 500) + '...');
      
      try {
        // First try to find JSON in the response
        let jsonMatch = text.match(/\{[\s\S]*\}/);
        
        if (!jsonMatch) {
          // Try to find JSON wrapped in markdown code blocks
          jsonMatch = text.match(/```json\s*([\s\S]*?)\s*```/);
          if (jsonMatch) {
            jsonMatch[0] = jsonMatch[1];
          }
        }
        
        if (!jsonMatch) {
          // Try to find JSON without the outer curly braces and reconstruct
          const htmlMatch = text.match(/"html":\s*"((?:[^"\\]|\\.)*)"/);
          const cssMatch = text.match(/"css":\s*"((?:[^"\\]|\\.)*)"/);
          const jsMatch = text.match(/"js":\s*"((?:[^"\\]|\\.)*)"/);
          
          if (htmlMatch || cssMatch) {
            console.log('🔧 Reconstructing JSON from partial matches');
            return {
              html: htmlMatch ? htmlMatch[1].replace(/\\"/g, '"').replace(/\\n/g, '\n') : currentCode.html,
              css: cssMatch ? cssMatch[1].replace(/\\"/g, '"').replace(/\\n/g, '\n') : currentCode.css,
              js: jsMatch ? jsMatch[1].replace(/\\"/g, '"').replace(/\\n/g, '\n') : currentCode.js,
              title: currentCode.title,
              description: currentCode.description
            };
          }
        }
        
        if (jsonMatch) {
          const improvedCode = JSON.parse(jsonMatch[0]);
          console.log('✅ Successfully parsed improved code');
          
          // Ensure all required fields exist
          return {
            html: improvedCode.html || currentCode.html,
            css: improvedCode.css || currentCode.css,
            js: improvedCode.js || currentCode.js,
            title: improvedCode.title || currentCode.title,
            description: improvedCode.description || currentCode.description
          };
        } else {
          console.error('❌ No JSON found in response');
        }
      } catch (parseError) {
        console.error('❌ Failed to parse JSON:', parseError);
        console.log('Raw response:', text);
      }
      
      // If we reach here, something went wrong - let's try a simple fallback improvement
      console.warn('⚠️ AI parsing failed, applying fallback improvements...');
      
      // Apply some basic improvements based on the request
      let improvedCode = { ...currentCode };
      
      const request = improvementRequest.toLowerCase();
      
      if (request.includes('color') || request.includes('vibrant')) {
        // Add some color improvements
        improvedCode.css += `
        
/* Auto-applied color improvements */
:root {
  --primary-color: #667eea;
  --secondary-color: #764ba2;
  --accent-color: #f093fb;
}
body { background: linear-gradient(135deg, var(--primary-color), var(--secondary-color)); }
h1, h2, h3 { color: var(--accent-color); }
`;
      }
      
      if (request.includes('animation') || request.includes('hover')) {
        // Add animation improvements
        improvedCode.css += `
        
/* Auto-applied animation improvements */
* { transition: all 0.3s ease; }
button:hover, .btn:hover { transform: translateY(-2px); box-shadow: 0 4px 15px rgba(0,0,0,0.2); }
h1, h2, h3 { animation: fadeInUp 0.6s ease-out; }
@keyframes fadeInUp { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
`;
      }
      
      if (request.includes('mobile') || request.includes('responsive')) {
        // Add responsive improvements
        improvedCode.css += `
        
/* Auto-applied responsive improvements */
@media (max-width: 768px) {
  body { padding: 1rem; }
  h1 { font-size: 2rem; }
  .container { max-width: 100%; padding: 0 1rem; }
}
`;
      }
      
      console.log('🔧 Applied fallback improvements');
      return improvedCode;
    } catch (error) {
      console.error('❌ Error improving website:', error);
      throw error;
    }
  }

  async generateComponent(componentRequest) {
    try {
      const prompt = `
Generate a reusable HTML component for: "${componentRequest}"

Provide the response in JSON format:
{
  "html": "component HTML",
  "css": "component-specific CSS",
  "js": "component JavaScript if needed",
  "name": "component name"
}

Make it modern, responsive, and reusable.
`;

      const result = await this.model.generateContent(prompt);
      const response = await result.response;
      const text = response.text();
      
      try {
        const jsonMatch = text.match(/\{[\s\S]*\}/);
        if (jsonMatch) {
          return JSON.parse(jsonMatch[0]);
        }
      } catch (parseError) {
        console.error('Failed to parse JSON:', parseError);
      }
      
      return {
        html: `<div class="component">${componentRequest}</div>`,
        css: '.component { padding: 1rem; }',
        js: '',
        name: 'Custom Component'
      };
    } catch (error) {
      console.error('Error generating component:', error);
      throw error;
    }
  }
}

const geminiService = new GeminiService();
export default geminiService;
