# AI Website Builder

A modern web application that uses Google's Gemini 2.0 Flash model to generate complete, responsive websites from simple text prompts.

## Features

- **AI-Powered Website Generation**: Create complete websites using natural language descriptions
- **Real-time Preview**: View your generated website instantly
- **Code View**: Examine the HTML, CSS, and JavaScript code
- **Responsive Testing**: Preview your website in mobile or desktop view
- **Iterative Improvement**: Request specific changes to refine the generated website
- **Easy Download**: Export your website as a single HTML file

## Getting Started

### Prerequisites

- Node.js 14+ and npm

### Installation

1. Clone this repository
   ```
   git clone https://github.com/yourusername/ai-builder.git
   cd ai-builder
   ```

2. Install dependencies
   ```
   npm install
   ```

3. Create a `.env` file in the root directory
   ```
   REACT_APP_GEMINI_API_KEY=your_gemini_api_key_here
   ```
   Get your API key from [Google AI Studio](https://aistudio.google.com/app/apikey)

4. Start the development server
   ```
   npm start
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser

## Usage

1. Enter a descriptive prompt for the website you want to create
2. Click the generate button and wait for the AI to create your website
3. Use the preview/code toggle to view the generated website or inspect the code
4. Test responsive design using the desktop/mobile toggle
5. Make specific improvement requests to refine the generated website
6. Download the final website as a self-contained HTML file

## Technology Stack

- **React**: Frontend UI framework
- **Tailwind CSS**: Utility-first CSS framework for styling
- **Google Generative AI SDK**: Interface for the Gemini 2.0 Flash model
- **Lucide Icons**: Beautiful, consistent icon set

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- Inspired by similar AI website builders like Lovable and Bolt
- Powered by Google's Gemini 2.0 Flash model
- Uses Context7 MCP for model communication
