from flask import Flask, jsonify, request
from flask_cors import CORS

app = Flask(__name__)
# Enable CORS for all domains on all routes
CORS(app)

@app.route('/api/health', methods=['GET'])
def health_check():
    return jsonify({
        "status": "healthy",
        "message": "Backend is connected and running!"
    })

@app.route('/api/analyze', methods=['POST'])
def analyze_terms():
    data = request.json
    text = data.get('text', '')
    url = data.get('url', '')
    
    # Detect service name from text or URL
    lower_content = (text + url).lower()
    service_name = "Unknown Service"
    if 'instagram' in lower_content: service_name = "Instagram"
    elif 'whatsapp' in lower_content: service_name = "WhatsApp"
    elif 'tiktok' in lower_content: service_name = "TikTok"
    elif 'uber' in lower_content: service_name = "Uber"
    elif 'netflix' in lower_content: service_name = "Netflix"
    elif 'google' in lower_content: service_name = "Google"

    # Mock comprehensive analysis results
    return jsonify({
        "serviceName": service_name,
        "safetyScore": 45,
        "grade": "D",
        "analysisDate": "2024-05-20T10:00:00Z",
        "risks": {
            "critical": [
                {
                    "title": "Data Selling to Third Parties",
                    "description": "Your personal data is shared with over 1000+ advertising partners without explicit opt-out.",
                    "impact": "HIGH"
                }
            ],
            "high": [
                {
                    "title": "Forced Arbitration Clause",
                    "description": "You waive your right to participate in class-action lawsuits against the company.",
                    "impact": "HIGH"
                },
                {
                    "title": "Indefinite Data Retention",
                    "description": "The company retains your biometric and location data even after account deletion.",
                    "impact": "MEDIUM"
                }
            ],
            "medium": [
                {
                    "title": "Unilateral Terms Modification",
                    "description": "The service can change terms at any time without notifying the user.",
                    "impact": "LOW"
                }
            ],
            "low": []
        },
        "positives": [
            {
                "title": "Encryption in Transit",
                "description": "Uses TLS 1.3 for all data transfers."
            },
            {
                "title": "GDPR Compliant",
                "description": "Provides basic data portability features."
            }
        ],
        "recommendations": [
            "Use a secondary email for registration",
            "Disable location tracking in app settings",
            "Review privacy settings monthly"
        ]
    })

if __name__ == '__main__':
    app.run(debug=True, port=5000)
