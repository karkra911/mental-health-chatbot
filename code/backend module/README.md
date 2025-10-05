# Mental Health Chatbot Backend

A pure Node.js backend server for the mental health chatbot, built from scratch without external libraries.

## Features

- ✅ Pure Node.js HTTP server (no Express.js)
- ✅ Gemini API integration using built-in HTTPS module
- ✅ Static file serving for frontend
- ✅ CORS support for frontend-backend communication
- ✅ Fallback responses when API is unavailable
- ✅ JSON request/response handling
- ✅ Error handling and logging

## Setup

1. **Copy the config template:**
   ```bash
   cp config.json.template config.json
   ```

2. **Add your Gemini API key:**
   - Edit `config.json`
   - Replace `"your-gemini-api-key-here"` with your actual Gemini API key
   - Get your API key from: https://makersuite.google.com/app/apikey

3. **Start the server:**
   ```bash
   node server.js
   ```

4. **Open your browser:**
   - Navigate to `http://localhost:3000`
   - Start chatting with the mental health bot!

## How it Works

### Backend Architecture
- **Pure Node.js**: Uses only built-in modules (http, https, fs, path, url)
- **HTTP Server**: Handles GET requests for static files and POST requests for chat
- **Gemini Integration**: Makes HTTPS requests to Google's Gemini API
- **Fallback System**: Provides smart responses when API is unavailable

### API Endpoints
- `GET /` - Serves the main HTML interface
- `POST /chat` - Processes chat messages and returns responses
- `GET /static/*` - Serves static assets (if needed)

### File Structure
```
code/
├── server.js           # Main backend server
├── index.html          # Frontend interface
├── config.json         # API configuration (you create this)
├── config.json.template # Configuration template
└── README.md          # This file
```

## Configuration

The `config.json` file should contain:
```json
{
  "geminiApiKey": "your-actual-api-key-here"
}
```

**Note**: The config.json file is gitignored for security. Never commit your API key!

## API Integration

The server communicates with Google's Gemini API using:
- Endpoint: `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent`
- Method: POST
- Authentication: API key in query parameter
- Payload: Structured prompt for mental health support

## Fallback Responses

When the Gemini API is unavailable, the server provides intelligent fallback responses based on:
- Keyword detection (anxiety, stress, sadness, etc.)
- Context-aware mental health support
- Empathetic and helpful responses

## Security Features

- API key stored server-side only
- CORS headers for frontend communication
- Input validation for chat messages
- Error handling to prevent crashes

## No External Dependencies

This backend is built entirely with Node.js built-in modules:
- `http` - HTTP server
- `https` - API requests to Gemini
- `fs` - File system operations
- `path` - File path utilities
- `url` - URL parsing

Following the project rule: "do not use any external software libraries"