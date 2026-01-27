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
    # TODO: Implement actual analysis logic here
    # For now, return a mock response similar to what the frontend expects
    return jsonify({
        "score": 85,
        "summary": "This is a mock analysis from the Python backend.",
        "risks": [
            {"level": "High", "text": "Data selling clause detected"},
            {"level": "Medium", "text": "Binding arbitration clause"}
        ]
    })

if __name__ == '__main__':
    app.run(debug=True, port=5000)
