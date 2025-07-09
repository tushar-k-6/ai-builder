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
      const prompt = `
You are an expert web developer. Here's the current website code:

HTML:
${currentCode.html}

CSS:
${currentCode.css}

JavaScript:
${currentCode.js}

Please improve this website based on this request: "${improvementRequest}"

Provide the improved version in the same JSON format:
{
  "html": "improved HTML",
  "css": "improved CSS", 
  "js": "improved JavaScript",
  "title": "updated title if needed",
  "description": "updated description if needed"
}

Keep the improvements focused and maintain the existing structure where possible.
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
      
      return currentCode; // Return original if parsing fails
    } catch (error) {
      console.error('Error improving website:', error);
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
