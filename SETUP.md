# Lightweight Mental Health Chatbot Setup

## Quick Start (Recommended - Virtual Environment)

1. **Create virtual environment:**
   ```bash
   python3 -m venv chatbot_env
   source chatbot_env/bin/activate  # On Windows: chatbot_env\Scripts\activate
   ```

2. **Install dependencies:**
   ```bash
   pip install -r requirements.txt
   ```

3. **Download TextBlob corpora:**
   ```bash
   python -c "import nltk; nltk.download('punkt')"
   ```

4. **Run the chatbot:**
   ```bash
   streamlit run chatbot.py
   ```

5. **Access the chatbot:**
   Open your browser to `http://localhost:8501`

## Alternative: System Installation
```bash
pip3 install streamlit textblob pandas numpy
python3 -c "import nltk; nltk.download('punkt')"
streamlit run chatbot.py
```

## Deactivate virtual environment (when done):
```bash
deactivate
```