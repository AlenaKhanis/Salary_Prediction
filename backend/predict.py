# app.py
from flask import Flask, request, jsonify, render_template # type: ignore
import pickle
import numpy as np # type: ignore
from flask_cors import CORS # type: ignore
from dotenv import load_dotenv

app = Flask(__name__)
cors = CORS(app , origins='*')
load_dotenv()


with open('saved_steps.pkl', 'rb') as file:
    data = pickle.load(file)
model = data['model']
le_country = data['le_country']
le_education = data['le_education']


countries = le_country.classes_.tolist()
educations = le_education.classes_.tolist()

@app.route('/')
def get_data():
    return jsonify(countries, educations)

@app.route('/predict', methods=['POST'])
def predict():
    try:
        if request.method == 'POST':
            data = request.get_json()
            country = data['country']
            education = data['education']
            experience = data['experience']

            country_encoded = le_country.transform([country])[0]
            education_encoded = le_education.transform([education])[0]

            features = np.array([[country_encoded, education_encoded, experience]])

            prediction = model.predict(features)

            formatted_prediction = "{:.2f}".format(prediction[0])

            return jsonify({'predicted_salary': formatted_prediction})
    except Exception as e:
        return jsonify({'error': str(e)}) , 400    

