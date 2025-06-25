# symptom_checker/ml.py

import joblib
import pandas as pd
import sklearn.preprocessing

# Load model and TF-IDF vectorizer
model = joblib.load('healthone/backend/MLmodels/ml/lr_model.pkl')
tfidf = joblib.load('healthone/backend/MLmodels/ml/tfidf_vectorizer.pkl')

# Load dataset and prepare data
df = pd.read_csv('healthone/backend/MLmodels/Symptom2Disease.csv')
df.drop('Unnamed: 0', axis='columns', inplace=True)
df['label'] = df['label'].apply(lambda x: x.title())

# Binarize labels for classification
label_binarizer = sklearn.preprocessing.LabelBinarizer()
df_binarized = df.join(pd.DataFrame(label_binarizer.fit_transform(df['label']),
                                    columns=label_binarizer.classes_,
                                    index=df.index))
df_binarized.drop('label', axis='columns', inplace=True)

train_df = df_binarized  # assuming you've already split your data

# Define symptom_vocab
symptom_vocab = set()
for txt in train_df['text']:
    for token in txt.lower().split():
        symptom_vocab.add(token)

# Helper function to check for symptom terms
def has_symptom_terms(text: str, min_hits: int = 1) -> bool:
    tokens = text.lower().split()
    hits = sum(1 for t in tokens if t in symptom_vocab)
    return hits >= min_hits

# Prediction function
def predict_robust_ml(text: str):
    if not has_symptom_terms(text):
        return {
        "predictions": [
            {"disease": "No disease found", "probability": 1},
            {"disease": "No disease found", "probability": 1},
            {"disease": "No disease found", "probability": 1}
        ]
    }
    
    text_tfidf = tfidf.transform([text])
    probs = model.predict_proba(text_tfidf)[0]
    top_indices = probs.argsort()[-3:][::-1]
    top_diseases = [model.classes_[i] for i in top_indices]
    top_probs = [probs[i] for i in top_indices]
    
    return {
        "predictions": [
            {"disease": disease, "probability": prob} 
            for disease, prob in zip(top_diseases, top_probs)
        ]
    }
