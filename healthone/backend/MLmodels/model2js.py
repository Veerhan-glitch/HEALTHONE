from skl2onnx import convert_sklearn
from skl2onnx.common.data_types import StringTensorType
from sklearn.pipeline import Pipeline
import joblib

# Load TF-IDF vectorizer and classifier
vectorizer = joblib.load("tfidf_vectorizer.pkl")
model = joblib.load("lr_model.pkl")

# Combine into a pipeline
pipeline = Pipeline([
    ("vectorizer", vectorizer),
    ("classifier", model)
])

# Define input shape
initial_type = [("input", StringTensorType([None, 1]))]

# Convert to ONNX with zipmap=False (required for ONNX.js)
onnx_model = convert_sklearn(pipeline, initial_types=initial_type, options={id(pipeline.steps[-1][1]): {"zipmap": False}})

# Save model
with open("model.onnx", "wb") as f:
    f.write(onnx_model.SerializeToString())
