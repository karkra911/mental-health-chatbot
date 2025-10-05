const http = require('http');
const https = require('https');
const fs = require('fs');
const path = require('path');
const url = require('url');

class MentalHealthChatServer {
    constructor(port = 3000) {
        this.port = port;
        this.geminiApiKey = null;
        this.loadConfig();
        this.server = http.createServer((req, res) => this.handleRequest(req, res));
    }

    loadConfig() {
        try {
            // Simple config loading - you'll need to create config.json with your API key
            const configPath = path.join(__dirname, 'config.json');
            if (fs.existsSync(configPath)) {
                const config = JSON.parse(fs.readFileSync(configPath, 'utf8'));
                this.geminiApiKey = config.geminiApiKey;
                console.log('✓ Configuration loaded successfully');
            } else {
                console.log('⚠ No config.json found. Please create one with your Gemini API key.');
                console.log('Example: {"geminiApiKey": "your-api-key-here"}');
            }
        } catch (error) {
            console.error('Error loading config:', error.message);
        }
    }

    async handleRequest(req, res) {
        const parsedUrl = url.parse(req.url, true);
        const method = req.method;
        const pathname = parsedUrl.pathname;

        // Enable CORS for frontend communication
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
        res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

        // Handle preflight requests
        if (method === 'OPTIONS') {
            res.writeHead(200);
            res.end();
            return;
        }

        try {
            if (method === 'GET' && pathname === '/') {
                // Serve the main HTML file
                this.serveStaticFile(res, 'index.html');
            } else if (method === 'POST' && pathname === '/chat') {
                // Handle chat messages
                await this.handleChatRequest(req, res);
            } else if (method === 'GET' && pathname.startsWith('/static/')) {
                // Serve static files if needed
                const fileName = pathname.replace('/static/', '');
                this.serveStaticFile(res, fileName);
            } else {
                // 404 for unknown routes
                res.writeHead(404, { 'Content-Type': 'text/plain' });
                res.end('Not Found');
            }
        } catch (error) {
            console.error('Error handling request:', error);
            res.writeHead(500, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ error: 'Internal server error' }));
        }
    }

    serveStaticFile(res, fileName) {
        const filePath = path.join(__dirname, fileName);
        
        if (!fs.existsSync(filePath)) {
            res.writeHead(404, { 'Content-Type': 'text/plain' });
            res.end('File not found');
            return;
        }

        const ext = path.extname(fileName);
        const contentType = this.getContentType(ext);
        
        fs.readFile(filePath, (err, data) => {
            if (err) {
                res.writeHead(500, { 'Content-Type': 'text/plain' });
                res.end('Error reading file');
                return;
            }
            
            res.writeHead(200, { 'Content-Type': contentType });
            res.end(data);
        });
    }

    getContentType(ext) {
        const types = {
            '.html': 'text/html',
            '.css': 'text/css',
            '.js': 'application/javascript',
            '.json': 'application/json',
            '.png': 'image/png',
            '.jpg': 'image/jpeg',
            '.gif': 'image/gif',
            '.ico': 'image/x-icon'
        };
        return types[ext] || 'text/plain';
    }

    async handleChatRequest(req, res) {
        try {
            // Parse request body
            const body = await this.parseRequestBody(req);
            const { message } = JSON.parse(body);

            if (!message) {
                res.writeHead(400, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ error: 'Message is required' }));
                return;
            }

            // Get response from Gemini API or fallback
            let botResponse;
            if (this.geminiApiKey) {
                botResponse = await this.getGeminiResponse(message);
            } else {
                botResponse = this.getFallbackResponse(message);
            }

            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ response: botResponse }));

        } catch (error) {
            console.error('Error in chat request:', error);
            res.writeHead(500, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ error: 'Failed to process message' }));
        }
    }

    parseRequestBody(req) {
        return new Promise((resolve, reject) => {
            let body = '';
            req.on('data', chunk => {
                body += chunk.toString();
            });
            req.on('end', () => {
                resolve(body);
            });
            req.on('error', reject);
        });
    }

    async getGeminiResponse(message) {
        return new Promise((resolve, reject) => {
            // Prepare the request to Gemini API
            const prompt = `You are a compassionate mental health support chatbot. Respond to this message with empathy and helpful guidance: "${message}"`;
            
            const postData = JSON.stringify({
                contents: [{
                    parts: [{ text: prompt }]
                }]
            });

            const options = {
                hostname: 'generativelanguage.googleapis.com',
                port: 443,
                path: `/v1beta/models/gemini-pro:generateContent?key=${this.geminiApiKey}`,
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Content-Length': Buffer.byteLength(postData)
                }
            };

            const apiReq = https.request(options, (apiRes) => {
                let data = '';
                
                apiRes.on('data', (chunk) => {
                    data += chunk;
                });

                apiRes.on('end', () => {
                    try {
                        const response = JSON.parse(data);
                        if (response.candidates && response.candidates[0] && response.candidates[0].content) {
                            const botResponse = response.candidates[0].content.parts[0].text;
                            resolve(botResponse);
                        } else {
                            console.error('Unexpected Gemini API response format:', data);
                            resolve(this.getFallbackResponse(message));
                        }
                    } catch (error) {
                        console.error('Error parsing Gemini response:', error);
                        resolve(this.getFallbackResponse(message));
                    }
                });
            });

            apiReq.on('error', (error) => {
                console.error('Error calling Gemini API:', error);
                resolve(this.getFallbackResponse(message));
            });

            apiReq.write(postData);
            apiReq.end();
        });
    }

    getFallbackResponse(message) {
        // Fallback responses when Gemini API is not available
        const responses = {
            greetings: [
                "Hello! I'm glad you're here. How can I support you today?",
                "Hi there! It takes courage to reach out. What's on your mind?",
                "Welcome! I'm here to listen without judgment. How are you feeling?"
            ],
            anxiety: [
                "I hear that you're feeling anxious. That's completely valid. Can you tell me what might be triggering these feelings?",
                "Anxiety can be overwhelming. Let's take this one step at a time. What's the most pressing thing on your mind right now?",
                "It's okay to feel anxious. Would you like to try a simple breathing exercise? Take a deep breath in for 4 counts, hold for 4, then exhale for 4."
            ],
            sadness: [
                "I'm sorry you're going through a difficult time. Your feelings are important and valid.",
                "It sounds like you're carrying a heavy burden. Would you like to share what's been weighing on you?",
                "Sadness is a natural human emotion. You don't have to face this alone. What's been the most challenging part of your day?"
            ],
            stress: [
                "Stress can feel overwhelming. Let's break down what's causing you stress - what's the biggest challenge right now?",
                "It sounds like you have a lot on your plate. Sometimes talking through our stressors can help us see them more clearly.",
                "Feeling stressed is your mind's way of telling you something needs attention. What's been the most stressful part of your day?"
            ],
            default: [
                "Thank you for sharing that with me. Can you tell me more about how you're feeling?",
                "I appreciate you opening up. What would be most helpful for you right now?",
                "It sounds like you're going through something important. I'm here to listen.",
                "That sounds challenging. How has this been affecting your daily life?"
            ]
        };

        const msg = message.toLowerCase();
        
        if (msg.includes('hello') || msg.includes('hi') || msg.includes('hey')) {
            return this.getRandomResponse(responses.greetings);
        } else if (msg.includes('anxious') || msg.includes('anxiety') || msg.includes('worried') || msg.includes('nervous')) {
            return this.getRandomResponse(responses.anxiety);
        } else if (msg.includes('sad') || msg.includes('depression') || msg.includes('down') || msg.includes('upset')) {
            return this.getRandomResponse(responses.sadness);
        } else if (msg.includes('stress') || msg.includes('overwhelmed') || msg.includes('pressure') || msg.includes('tough day')) {
            return this.getRandomResponse(responses.stress);
        } else {
            return this.getRandomResponse(responses.default);
        }
    }

    getRandomResponse(responseArray) {
        return responseArray[Math.floor(Math.random() * responseArray.length)];
    }

    start() {
        this.server.listen(this.port, () => {
            console.log(`🧠 Mental Health Chatbot Server running on http://localhost:${this.port}`);
            console.log(`📁 Serving files from: ${__dirname}`);
            if (this.geminiApiKey) {
                console.log('🤖 Gemini API integration: ENABLED');
            } else {
                console.log('💬 Gemini API integration: DISABLED (using fallback responses)');
            }
        });
    }

    stop() {
        this.server.close(() => {
            console.log('Server stopped');
        });
    }
}

// Start the server
const server = new MentalHealthChatServer(3000);
server.start();

module.exports = MentalHealthChatServer;