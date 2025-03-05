import requests
import json
import time

BASE_URL = "https://healthservice.priaid.ch"
TOKEN = ("eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJlbWFpbCI6InByYXZlZXJzY2hhdWhhbkBnbWFpbC5jb20iLCJyb2xlIjoiVXNlciIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL3NpZCI6IjExODkyIiwiaHR0cDovL3NjaGVtYXMubWljcm9zb2Z0LmNvbS93cy8yMDA4LzA2L2lkZW50aXR5L2NsYWltcy92ZXJzaW9uIjoiMTA5IiwiaHR0cDovL2V4YW1wbGUub3JnL2NsYWltcy9saW1pdCI6IjEwMCIsImh0dHA6Ly9leGFtcGxlLm9yZy9jbGFpbXMvbWVtYmVyc2hpcCI6IkJhc2ljIiwiaHR0cDovL2V4YW1wbGUub3JnL2NsYWltcy9sYW5ndWFnZSI6ImVuLWdiIiwiaHR0cDovL3NjaGVtYXMubWljcm9zb2Z0LmNvbS93cy8yMDA4LzA2L2lkZW50aXR5L2NsYWltcy9leHBpcmF0aW9uIjoiMjA5OS0xMi0zMSIsImh0dHA6Ly9leGFtcGxlLm9yZy9jbGFpbXMvbWVtYmVyc2hpcHN0YXJ0IjoiMjAyNS0wMy0wMyIsImlzcyI6Imh0dHBzOi8vYXV0aHNlcnZpY2UucHJpYWlkLmNoIiwiYXVkIjoiaHR0cHM6Ly9oZWFsdGhzZXJ2aWNlLnByaWFpZC5jaCIsImV4cCI6MTc0MTEwOTQyNywibmJmIjoxNzQxMTAyMjI3fQ.2K0DqYx7WtbsXfdQ-a3Rxuj9d4cfKV5FkUhjwqclxWk")

def get_endpoint_data(endpoint, token, params=None):
    """
    Makes a GET request to the specified endpoint using the token.
    Additional parameters can be supplied via the params dictionary.
    """
    if params is None:
        params = {}
    params.update({
        "token": token,
        "language": "en-gb",
        "format": "json"
    })
    url = f"{BASE_URL}/{endpoint}"
    response = requests.get(url, params=params)
    response.raise_for_status()
    return response.json()

def get_diagnosis(symptoms, token, gender="male", year_of_birth=1980):
    """
    Calls the diagnosis endpoint using a list of symptom IDs.
    Returns the diagnosis results as JSON.
    """
    endpoint = "diagnosis"
    params = {
        "symptoms": json.dumps(symptoms),
        "gender": gender,
        "year_of_birth": year_of_birth,
        "language": "en-gb",
        "format": "json",
        "token": token
    }
    url = f"{BASE_URL}/{endpoint}"
    response = requests.get(url, params=params)
    response.raise_for_status()
    return response.json()

def map_symptoms_to_diseases():
    """
    For each symptom fetched from /symptoms, calls the diagnosis endpoint 
    (using that single symptom) and builds a mapping from each disease (IssueID)
    to a sorted list of symptom IDs that produced it.
    """
    print("Fetching all symptoms...")
    try:
        symptoms_list = get_endpoint_data("symptoms", TOKEN)
    except Exception as e:
        print("Error fetching symptoms:", e)
        return {}
    
    print(f"Total symptoms fetched: {len(symptoms_list)}")
    disease_symptom_map = {}
    total_symptoms = len(symptoms_list)
    
    for idx, symptom in enumerate(symptoms_list, start=1):
        symptom_id = symptom.get("ID")
        print(f"[{idx}/{total_symptoms}] Processing symptom ID: {symptom_id}")
        try:
            diagnosis_results = get_diagnosis([symptom_id], TOKEN)
            for diagnosis in diagnosis_results:
                issue_id = diagnosis.get("IssueID")
                if issue_id is not None:
                    if issue_id not in disease_symptom_map:
                        disease_symptom_map[issue_id] = set()
                    disease_symptom_map[issue_id].add(symptom_id)
        except Exception as e:
            print(f"Error processing symptom {symptom_id}: {e}")
        # Brief pause to help avoid rate limiting
        time.sleep(0.2)
    
    # Convert sets to sorted lists
    for issue_id, symptom_set in disease_symptom_map.items():
        disease_symptom_map[issue_id] = sorted(list(symptom_set))
    
    return disease_symptom_map

def main():
    print("Mapping symptoms to diseases via the diagnosis endpoint...")
    mapping = map_symptoms_to_diseases()
    output_file = "disease_symptom_mapping.json"
    try:
        with open(output_file, "w", encoding="utf-8") as f:
            json.dump(mapping, f, indent=4, ensure_ascii=False)
        print(f"Mapping saved to '{output_file}'.")
    except Exception as e:
        print("Error saving mapping to file:", e)
    
    print("\nDisease to Symptom IDs mapping:")
    print(json.dumps(mapping, indent=4))

if __name__ == "__main__":
    main()
