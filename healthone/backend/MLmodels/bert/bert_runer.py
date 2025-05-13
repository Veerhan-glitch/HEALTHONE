from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
import os
os.environ['TF_CPP_MIN_LOG_LEVEL'] = '3'

import tensorflow_text
import tensorflow as tf
from tensorflow_hub import KerasLayer
from keras import Input, Model
import json
import numpy as np
import pandas as pd
import sklearn.preprocessing

# Load BERT model
tfsm_layer = KerasLayer("healthone/backend/MLmodels/bert/medaid_model", trainable=False)
inputs = Input(shape=(), dtype=tf.string, name="input_text")
outputs = tfsm_layer(inputs)
model = Model(inputs, outputs)

# Load class labels
with open("healthone/backend/MLmodels/bert/classes.json") as f:
    classes = json.load(f)
classes = [classes[str(i)] for i in range(len(classes))]

# Load symptom vocabulary
df = pd.read_csv("healthone/backend/MLmodels/Symptom2Disease.csv").drop(columns=['Unnamed: 0'])
df['label'] = df['label'].str.title()
lb = sklearn.preprocessing.LabelBinarizer().fit(df['label'])
symptom_vocab = {tok for txt in df['text'] for tok in txt.lower().split()}

def has_symptom_terms(text, min_hits=1):
    return sum(1 for t in text.lower().split() if t in symptom_vocab) >= min_hits

def predict_bert(text: str, top_k: int = 3, min_hits: int = 1):
    if not has_symptom_terms(text, min_hits):
        # Ensure it returns a consistent structure
        return {
            "predictions": [
                {"disease": "No disease found", "probability": 1.0},
                {"disease": "No disease found", "probability": 1.0},
                {"disease": "No disease found", "probability": 1.0}
            ]
        }

    batch = tf.constant([text], dtype=tf.string)
    out = model.predict(batch, verbose=0)

    probs = list(out.values())[0][0] if isinstance(out, dict) else out[0]
    idxs = np.argsort(probs)[-top_k:][::-1]

    return {
        "predictions": [
            {"disease": classes[int(i)], "probability": float(probs[int(i)])}
            for i in idxs
        ]
    }