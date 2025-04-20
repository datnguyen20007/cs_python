from flask import Flask, request, jsonify
from flask_cors import CORS
import joblib
import numpy as np

app = Flask(__name__)
CORS(app, origins=["*"])

# Load pre-trained ML model (ensure 'land_price_model.pkl' exists)
model = joblib.load("land_price_model.pkl")
# http://127.0.0.1:5000/predict

@app.route('/predict', methods=['POST'])
def predict():
    try:
        data = request.get_json()
        land_area = float(data.get("land_area", 0))
        print("Received land area:", land_area)
        
        if land_area <= 0:
            return jsonify({"error": "Invalid land area"}), 400
        
        # Predict land price
        predicted_price = model.predict(np.array([[land_area]]))[0]
        
        return jsonify({"predicted_price": predicted_price})
    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    app.run(host="0.0.0.0", port=5000, debug=True)