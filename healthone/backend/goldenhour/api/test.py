from flask import Flask, request, jsonify

app = Flask(__name__)

# Sample medical database
medical_data = {
    "heart attack": {
        "symptoms": ["chest pain", "shortness of breath", "dizziness"],
        "golden_hour": "First 60 minutes after symptoms appear. Call emergency services immediately.",
        "first_aid": "Chew aspirin, keep person calm, loosen tight clothing, provide CPR if needed."
    },
    "stroke": {
        "symptoms": ["face drooping", "arm weakness", "speech difficulty"],
        "golden_hour": "First 3 hours are critical. Seek emergency medical help.",
        "first_aid": "Lay person down, keep them calm, note the time symptoms started."
    },
    "asthma attack": {
        "symptoms": ["wheezing", "difficulty breathing", "chest tightness"],
        "golden_hour": "Use inhaler immediately. Seek medical help if no improvement.",
        "first_aid": "Help person use inhaler, sit them upright, avoid triggers like smoke."
    }
}

@app.route('/predict', methods=['POST'])
def predict_disease():
    data = request.json
    symptoms = data.get("symptoms", [])
    
    if not symptoms:
        return jsonify({"error": "Please provide symptoms."}), 400
    
    possible_diseases = []
    
    for disease, details in medical_data.items():
        if any(symptom in details["symptoms"] for symptom in symptoms):
            possible_diseases.append({
                "disease": disease,
                "golden_hour": details["golden_hour"],
                "first_aid": details["first_aid"]
            })
    
    if not possible_diseases:
        return jsonify({"message": "No matching diseases found."})
    
    return jsonify({"possible_diseases": possible_diseases})

@app.route('/disease-info', methods=['POST'])
def get_disease_info():
    data = request.json
    disease = data.get("disease", "").lower()
    
    if disease not in medical_data:
        return jsonify({"error": "Disease not found in database."}), 404
    
    return jsonify(medical_data[disease])

if __name__ == '__main__':
    app.run(debug=True)
