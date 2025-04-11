from flask import Flask, jsonify, request, send_from_directory
import os
import dotenv
import google
import google.generativeai as genai

# Load environment variables
dotenv.load_dotenv()

# Configure Gemini API
genai.configure(api_key=os.getenv("GEMINI_API_KEY"))

# Create the model
model = genai.GenerativeModel("gemini-1.5-flash")

# Initialize Flask app
app = Flask(__name__, static_folder='../frontend/build', static_url_path='')

def list_available_models():
    try:
        models = genai.list_models()
        return [model.name for model in models]
    except Exception as e:
        print(f"Error listing models: {str(e)}")
        return []

def explain_like_5(text):
    prompt = f"Explain this like I'm 5 years old:\n\n{text}"
    try:
        response = model.generate_content(prompt)
        return response.text
    except Exception as e:
        return f"Error from Gemini API: {str(e)}"

@app.route('/api/models')
def get_models():
    models = list_available_models()
    return jsonify({"models": models})

@app.route('/api/explain', methods=['POST'])
def explain():
    data = request.json
    user_input = data.get('text', '')
    explanation = explain_like_5(user_input)
    return jsonify({"explanation": explanation})

# Serve React app
@app.route('/')
def serve():
    return send_from_directory(app.static_folder, 'index.html')

# Serve React app static files
@app.route('/<path:path>')
def static_proxy(path):
    return send_from_directory(app.static_folder, path)

if __name__ == "__main__":
    app.run(debug=True)