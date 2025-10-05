# Mental Health Chatbot

A compassionate AI-powered mental health support chatbot built with pure Node.js (no external libraries) and modern frontend technologies. The project includes both a chatbot interface and a dynamic link portal for managing resources.

## 🌟 Features

### Mental Health Chatbot
- **AI-Powered Responses**: Integrates with Google's Gemini API for empathetic mental health support
- **Intelligent Fallbacks**: Smart keyword-based responses when API is unavailable
- **Beautiful UI**: Modern, responsive chat interface with typing indicators
- **Quick Actions**: Pre-built conversation starters for common mental health concerns
- **Real-time Communication**: Async frontend-backend communication

### Dynamic Link Portal
- **Resource Management**: Add, edit, and delete mental health resources and links
- **Local Storage**: All data saved in browser localStorage
- **Visual Interface**: Card-based layout with custom thumbnails
- **Responsive Design**: Works on desktop and mobile devices

## 🏗️ Architecture

```
mental health chatbot/
├── README.md                    # This file
├── project rules               # Project development guidelines
├── theory/
│   └── goal                    # Project objectives
└── code/
    ├── index.html              # Main chatbot interface
    ├── backend module/
    │   ├── server.js           # Pure Node.js HTTP server
    │   ├── config.json.template # API configuration template
    │   └── README.md           # Backend-specific documentation
    └── frontend module/
        ├── index.html          # Alternative chatbot interface
        └── portal icons page.html # Dynamic link portal
```

## 🚀 Quick Start

### Prerequisites
- Node.js (v14 or higher)
- A Google Gemini API key (optional - works with fallback responses)

### Setup

1. **Clone or navigate to the project:**
   ```bash
   cd "/media/sda6/Gam/code projects/mental health chatbot"
   ```

2. **Configure the backend:**
   ```bash
   cd "code/backend module"
   cp config.json.template config.json
   ```

3. **Add your Gemini API key (optional):**
   - Edit `config.json`
   - Replace `"your-gemini-api-key-here"` with your actual API key
   - Get your API key from: https://makersuite.google.com/app/apikey

4. **Start the server:**
   ```bash
   node server.js
   ```

5. **Access the applications:**
   - **Chatbot**: Open `http://localhost:3000` in your browser
   - **Portal**: Open the `portal icons page.html` file directly or serve it separately

## 💻 Usage

### Mental Health Chatbot
1. Open the chatbot interface
2. Use quick action buttons or type your own message
3. The bot will respond with empathetic, helpful guidance
4. Supports topics like anxiety, stress, sadness, and general mental health

### Dynamic Link Portal
1. Open the portal page
2. Click "Manage Links" to add new resources
3. Edit or delete existing links using the icons on each card
4. All changes are saved automatically in your browser

## 🔧 Technical Details

### Backend (`code/backend module/server.js`)
- **Pure Node.js**: No external dependencies (follows project constraints)
- **HTTP Server**: Built with Node.js `http` module
- **CORS Enabled**: Supports frontend-backend communication
- **API Integration**: HTTPS requests to Gemini API using built-in `https` module
- **Fallback System**: Intelligent responses when API is unavailable
- **Static File Serving**: Serves frontend files with proper MIME types

### Frontend
- **Modern CSS**: Gradient backgrounds, smooth animations, responsive design
- **Vanilla JavaScript**: No frameworks - pure JS for maximum compatibility
- **Fetch API**: Modern async communication with backend
- **LocalStorage**: Client-side data persistence for the portal

### Key Endpoints
- `GET /` - Serves the main chatbot interface
- `POST /chat` - Processes chat messages and returns AI/fallback responses
- `GET /static/*` - Serves static assets

## 🛡️ Security & Privacy

- **API Key Protection**: Gemini API key stored server-side only
- **Input Validation**: Messages are validated before processing
- **Error Handling**: Graceful degradation on API failures
- **Local Data**: Portal links stored locally in browser (not on server)

## 🎯 Design Principles

1. **No External Libraries**: Built entirely with Node.js built-in modules and vanilla web technologies
2. **Mental Health Focus**: Empathetic, non-judgmental responses designed for emotional support
3. **Accessibility**: Clean, readable interface with good contrast and typography
4. **Resilience**: Works with or without internet/API connectivity
5. **Privacy**: Minimal data collection, local storage where possible

## 📁 File Descriptions

### Core Files
- **`code/index.html`**: Main chatbot interface with modern UI and backend integration
- **`code/backend module/server.js`**: Complete HTTP server with Gemini API integration
- **`code/frontend module/portal icons page.html`**: Dynamic link management portal

### Configuration
- **`code/backend module/config.json.template`**: Configuration template for API keys
- **`project rules`**: Development guidelines ensuring no external dependencies

### Documentation
- **`theory/goal`**: Project objectives and vision
- **`code/backend module/README.md`**: Detailed backend documentation

## 🚦 Running in Production

For production deployment:

1. **Set up environment variables** instead of config.json
2. **Add HTTPS support** for secure API communication
3. **Implement rate limiting** to prevent API abuse
4. **Add logging and monitoring**
5. **Set up proper error pages**

## 🤝 Contributing

This project follows strict guidelines:
- **No external software libraries** (as per `project rules`)
- All code must be in the `code/` folder
- Maintain the pure Node.js architecture
- Focus on mental health best practices

## 📄 License

This project is for educational and supportive purposes. Please ensure compliance with mental health regulations and privacy laws in your jurisdiction.

## 🆘 Support

If you're experiencing a mental health emergency, please contact:
- Emergency services: 911 (US) or your local emergency number
- National Suicide Prevention Lifeline: 988 (US)
- Crisis Text Line: Text HOME to 741741

## 🔮 Future Enhancements

- Session persistence
- User authentication
- Conversation history
- Mental health resource integration
- Mobile app version
- Multi-language support

---

**Note**: This chatbot is designed for support and information only. It is not a replacement for professional mental health treatment.