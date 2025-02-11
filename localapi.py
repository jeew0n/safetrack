from flask import Flask, request, jsonify
from python_model.predict import predict_probabilities

app = Flask(__name__)

@app.route('/predict', methods=['POST'])
def predict():
    features = request.json
    probabilities = predict_probabilities(features)
    return jsonify(probabilities)

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)
