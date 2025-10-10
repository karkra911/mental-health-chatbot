# Mental Health Chatbot

A compassionate mental health support chatbot with multiple implementations for flexibility and ease of deployment.

## 🌟 Features

### Lightweight Streamlit Chatbot (New!)
- **TextBlob Integration**: Sentiment analysis for emotional understanding
- **Interactive UI**: Beautiful Streamlit interface with real-time chat
- **Mental Health Focus**: Specialized responses for anxiety, depression, stress
- **Crisis Support**: Built-in crisis detection and resource links
- **Coping Tools**: Integrated breathing exercises and positive affirmations
- **Resource Sidebar**: Quick access to mental health resources and helplines

### Legacy Node.js Chatbot
- **AI-Powered Responses**: Integrates with Google's Gemini API for empathetic mental health support
- **Intelligent Fallbacks**: Smart keyword-based responses when API is unavailable
- **Beautiful UI**: Modern, responsive chat interface with typing indicators
- **Quick Actions**: Pre-built conversation starters for common mental health concerns

## 🏗️ Architecture

```
mental health chatbot/
├── README.md                    # This file
├── SETUP.md                     # Quick setup instructions
├── requirements.txt             # Python dependencies
├── chatbot.py                   # Main Streamlit chatbot app
├── Dockerfile                   # Docker configuration
├── docker-compose.yml           # Docker Compose setup
├── project rules               # Project development guidelines
├── theory/
│   └── goal                    # Project objectives
└── code/
    ├── index.html              # Legacy chatbot interface
    ├── backend module/
    │   ├── server.js           # Pure Node.js HTTP server
    │   ├── config.json.template # API configuration template
    │   └── README.md           # Backend-specific documentation
    └── frontend module/
        └── index.html          # Alternative chatbot interface
```

## 🚀 Quick Start (Streamlit Chatbot - Recommended)

### Option 1: Virtual Environment (Safest)
```bash
# Create and activate virtual environment
python3 -m venv chatbot_env
source chatbot_env/bin/activate  # Windows: chatbot_env\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Download required NLTK data
python -c "import nltk; nltk.download('punkt')"

# Run the chatbot
streamlit run chatbot.py

# Access at http://localhost:8501
```

### Option 2: Docker (Isolated)
```bash
# Build and run with Docker Compose
docker-compose up --build

# Access at http://localhost:8501
```

### Option 3: System Installation
```bash
# Install dependencies system-wide
pip3 install streamlit textblob pandas numpy

# Download NLTK data
python3 -c "import nltk; nltk.download('punkt')"

# Run the chatbot
streamlit run chatbot.py
```

## 🚀 Legacy Node.js Setup

### Prerequisites
- Node.js (v14 or higher)
- A Google Gemini API key (optional - works with fallback responses)

### Setup

1. **Navigate to the project:**
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

5. **Access the application:**
   - **Chatbot**: Open `http://localhost:3000` in your browser

## 💻 Usage

### Streamlit Chatbot (Recommended)
1. Run `streamlit run chatbot.py`
2. Open `http://localhost:8501` in your browser
3. Start chatting with the bot about your mental health concerns
4. Use the sidebar for quick access to:
   - Crisis support numbers
   - Mental health resources
   - Breathing exercises
   - Positive affirmations

### Features:
- **Sentiment Analysis**: Uses TextBlob to understand emotional tone
- **Crisis Detection**: Recognizes crisis keywords and provides immediate resources
- **Specialized Responses**: Tailored responses for anxiety, depression, stress
- **Conversation Memory**: Maintains chat history during the session
- **Professional Referrals**: Suggests professional help after extended conversations

### Legacy Node.js Chatbot
1. Open the chatbot interface
2. Use quick action buttons or type your own message
3. The bot will respond with empathetic, helpful guidance
4. Supports topics like anxiety, stress, sadness, and general mental health

## 🔧 Technical Details

### Streamlit Implementation (`chatbot.py`)
- **TextBlob**: Natural language processing for sentiment analysis
- **Streamlit**: Interactive web framework for Python
- **Session State**: Maintains conversation context
- **Crisis Detection**: Keyword-based crisis intervention system
- **Response Database**: Categorized mental health responses
- **Typing Animation**: Simulated real-time conversation feel

### Legacy Backend (`code/backend module/server.js`)
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

### Key Endpoints (Legacy)
- `GET /` - Serves the main chatbot interface
- `POST /chat` - Processes chat messages and returns AI/fallback responses
- `GET /static/*` - Serves static assets

## 🛡️ Security & Privacy

### Streamlit Version
- **Local Processing**: All sentiment analysis runs locally
- **No Data Storage**: Conversations are not persisted
- **Privacy First**: No external API calls for basic functionality
- **Crisis Resources**: Direct links to professional help

### Legacy Version
- **API Key Protection**: Gemini API key stored server-side only
- **Input Validation**: Messages are validated before processing
- **Error Handling**: Graceful degradation on API failures

## 🎯 Design Principles

1. **Mental Health Focus**: Empathetic, non-judgmental responses designed for emotional support
2. **Accessibility**: Clean, readable interface with good contrast and typography
3. **Privacy**: Minimal data collection, secure handling of sensitive conversations
4. **Resilience**: Multiple deployment options and fallback systems
5. **Professional Boundaries**: Clear guidance about when to seek professional help

## 📦 Deployment Options

### 1. Local Development
- Virtual environment (recommended)
- System installation
- Legacy Node.js server

- ----------------

demo github pages - https://karkra911.github.io/mental-health-chatbot/

### 2. Docker Deployment
```bash
# Single container
docker build -t mental-health-chatbot .
docker run -p 8501:8501 mental-health-chatbot

# Docker Compose
docker-compose up --build
```

### 3. Cloud Deployment
- **Streamlit Cloud**: Direct deployment from GitHub
- **Heroku**: Docker-based deployment
- **AWS/GCP**: Container or serverless deployment

## 📁 File Descriptions

### Streamlit Implementation
- **`chatbot.py`**: Main Streamlit application with mental health chatbot logic
- **`requirements.txt`**: Python dependencies for the Streamlit app
- **`Dockerfile`**: Container configuration for deployment
- **`docker-compose.yml`**: Multi-container orchestration
- **`SETUP.md`**: Quick setup guide for different installation methods

### Legacy Implementation
- **`code/index.html`**: Main chatbot interface with modern UI and backend integration
- **`code/backend module/server.js`**: Complete HTTP server with Gemini API integration
- **`code/frontend module/index.html`**: Alternative chatbot interface

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
