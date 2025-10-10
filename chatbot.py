import streamlit as st
import random
from textblob import TextBlob
import time

# Page configuration
st.set_page_config(
    page_title="Mental Health Support Chatbot",
    page_icon="🧠",
    layout="centered",
    initial_sidebar_state="expanded"
)

# Initialize session state
if "messages" not in st.session_state:
    st.session_state.messages = []
    st.session_state.messages.append({
        "role": "assistant", 
        "content": "Hello! I'm here to provide mental health support. How are you feeling today? 😊"
    })

if "conversation_count" not in st.session_state:
    st.session_state.conversation_count = 0

# Mental health responses database
RESPONSES = {
    "greeting": [
        "Hello! I'm glad you're here. How can I support you today?",
        "Hi there! It's wonderful to connect with you. What's on your mind?",
        "Welcome! I'm here to listen and help. How are you feeling right now?"
    ],
    "anxiety": [
        "I hear that you're feeling anxious. That's completely normal. Try taking 3 deep breaths with me: in for 4, hold for 4, out for 6.",
        "Anxiety can feel overwhelming, but you're not alone. Let's focus on what you can control right now. Can you name 5 things you can see around you?",
        "It's okay to feel anxious. Remember: this feeling is temporary. What usually helps you feel more grounded?"
    ],
    "depression": [
        "I'm sorry you're going through this difficult time. Your feelings are valid, and reaching out shows incredible strength.",
        "Depression can make everything feel heavy. Remember that small steps count too. What's one tiny thing that might bring you a moment of comfort today?",
        "You're not alone in this. Even when it's hard to see, you matter and your life has value. Have you been able to talk to anyone about how you're feeling?"
    ],
    "stress": [
        "Stress can be really challenging. Let's try to break it down - what's the biggest thing causing you stress right now?",
        "It sounds like you're carrying a lot right now. Sometimes writing down our worries can help us see them more clearly. What's weighing on your mind?",
        "Stress is your body's way of responding to challenges. You've handled difficult situations before. What helped you get through tough times in the past?"
    ],
    "positive": [
        "That's wonderful to hear! It's great that you're feeling positive. What's been going well for you?",
        "I'm so glad you're feeling good! Celebrating these moments is important. What's bringing you joy today?",
        "It's beautiful to hear such positivity from you! These good feelings are just as important to acknowledge as the difficult ones."
    ],
    "support": [
        "Remember, seeking help is a sign of strength, not weakness. You deserve support and care.",
        "You're taking an important step by reaching out. That takes courage, and I'm proud of you for that.",
        "It's okay to not be okay sometimes. You're human, and your feelings matter. Is there someone in your life you trust to talk to?"
    ],
    "crisis": [
        "I'm very concerned about you. Please reach out to a crisis helpline immediately:",
        "• National Suicide Prevention Lifeline: 988 (US)",
        "• Crisis Text Line: Text HOME to 741741",
        "• International Association for Suicide Prevention: https://www.iasp.info/resources/Crisis_Centres/",
        "You matter, and there are people who want to help you through this."
    ]
}

CRISIS_KEYWORDS = ["suicide", "kill myself", "end it all", "want to die", "not worth living", "hurt myself"]
ANXIETY_KEYWORDS = ["anxious", "anxiety", "worried", "panic", "nervous", "stressed", "overwhelmed"]
DEPRESSION_KEYWORDS = ["depressed", "depression", "sad", "hopeless", "empty", "lonely", "worthless"]
STRESS_KEYWORDS = ["stress", "pressure", "burden", "exhausted", "tired", "overworked"]
POSITIVE_KEYWORDS = ["happy", "good", "great", "excited", "joy", "better", "wonderful", "amazing"]

def analyze_sentiment(text):
    """Analyze sentiment and emotional content of user input"""
    blob = TextBlob(text.lower())
    sentiment = blob.sentiment.polarity
    
    # Check for crisis keywords first
    if any(keyword in text.lower() for keyword in CRISIS_KEYWORDS):
        return "crisis"
    
    # Check for specific mental health keywords
    if any(keyword in text.lower() for keyword in ANXIETY_KEYWORDS):
        return "anxiety"
    elif any(keyword in text.lower() for keyword in DEPRESSION_KEYWORDS):
        return "depression"
    elif any(keyword in text.lower() for keyword in STRESS_KEYWORDS):
        return "stress"
    elif any(keyword in text.lower() for keyword in POSITIVE_KEYWORDS):
        return "positive"
    
    # Use sentiment analysis
    if sentiment > 0.1:
        return "positive"
    elif sentiment < -0.1:
        return "depression"
    else:
        return "support"

def get_response(user_input, emotion_category):
    """Generate appropriate response based on emotion category"""
    if emotion_category in RESPONSES:
        return random.choice(RESPONSES[emotion_category])
    else:
        return random.choice(RESPONSES["support"])

def add_personalized_touch(response, user_input):
    """Add personalized elements to responses"""
    blob = TextBlob(user_input)
    
    # Add empathy based on intensity
    if blob.sentiment.polarity < -0.5:
        response = "I can really hear the pain in your words. " + response
    elif blob.sentiment.polarity > 0.5:
        response = "Your positive energy is wonderful to hear! " + response
    
    return response

# Sidebar with resources
with st.sidebar:
    st.title("🧠 Mental Health Resources")
    
    st.subheader("🆘 Crisis Support")
    st.write("**Immediate Help:**")
    st.write("• US: 988 (Suicide & Crisis Lifeline)")
    st.write("• Text: HOME to 741741")
    st.write("• Emergency: 911")
    
    st.subheader("📚 Helpful Resources")
    st.write("• [Mental Health America](https://mhanational.org)")
    st.write("• [NAMI](https://nami.org)")
    st.write("• [Crisis Text Line](https://crisistextline.org)")
    
    st.subheader("🧘 Quick Coping Tools")
    if st.button("🫁 Breathing Exercise"):
        st.write("**4-7-8 Breathing:**")
        st.write("1. Inhale for 4 counts")
        st.write("2. Hold for 7 counts") 
        st.write("3. Exhale for 8 counts")
        st.write("4. Repeat 3-4 times")
    
    if st.button("🌟 Positive Affirmation"):
        affirmations = [
            "You are stronger than you think",
            "This feeling will pass",
            "You deserve love and kindness",
            "You are not alone",
            "Every small step forward matters",
            "You have survived difficult times before"
        ]
        st.write(f"💫 {random.choice(affirmations)}")

# Main chat interface
st.title("🧠 Mental Health Support Chatbot")
st.write("*A safe space for mental health support and resources*")

# Display chat messages
for message in st.session_state.messages:
    with st.chat_message(message["role"]):
        st.markdown(message["content"])

# Chat input
if prompt := st.chat_input("Share what's on your mind..."):
    # Add user message to chat history
    st.session_state.messages.append({"role": "user", "content": prompt})
    with st.chat_message("user"):
        st.markdown(prompt)
    
    # Analyze emotion and generate response
    emotion_category = analyze_sentiment(prompt)
    base_response = get_response(prompt, emotion_category)
    personalized_response = add_personalized_touch(base_response, prompt)
    
    # Add assistant response to chat history
    st.session_state.messages.append({"role": "assistant", "content": personalized_response})
    
    # Display assistant response with typing effect
    with st.chat_message("assistant"):
        message_placeholder = st.empty()
        full_response = ""
        
        # Simulate typing
        for chunk in personalized_response.split():
            full_response += chunk + " "
            time.sleep(0.05)
            message_placeholder.markdown(full_response + "▌")
        message_placeholder.markdown(full_response)
    
    # Increment conversation counter
    st.session_state.conversation_count += 1
    
    # Offer additional support after several exchanges
    if st.session_state.conversation_count % 5 == 0:
        follow_up = "I notice we've been talking for a while. Remember, while I'm here to support you, speaking with a mental health professional can provide additional help. Would you like me to share some resources for finding professional support?"
        st.session_state.messages.append({"role": "assistant", "content": follow_up})
        with st.chat_message("assistant"):
            st.markdown(follow_up)

# Footer
st.markdown("---")
st.markdown(
    """
    <div style='text-align: center; color: #666; font-size: 0.8em;'>
    💝 Remember: This chatbot provides support but is not a substitute for professional mental health care.<br>
    If you're in crisis, please reach out to emergency services or crisis helplines immediately.
    </div>
    """, 
    unsafe_allow_html=True
)