from django.views.decorators.csrf import csrf_exempt
import json
import math
from django.shortcuts import redirect, render
from django.http import JsonResponse


def load_diseases(disease_list):
    with open("healthone/backend/MLmodels/disease_symptoms.json", "r") as f:
        raw_data = json.load(f)

    data = {
        disease.lower().replace(" ", "_"): [set(entry[1]) for entry in raw_data[disease.lower().replace(" ", "_")]]
        for disease in disease_list if disease.lower().replace(" ", "_") in raw_data
    }

    return data


def compute_entropy(counts, total):
    if total == 0:
        return 0.0
    entropy = 0.0
    for c in counts:
        if c > 0:
            p = c / total
            entropy -= p * math.log(p)
    return entropy


def select_best_symptom(remaining, asked):
    all_symptoms = set()
    for sets in remaining.values():
        for s in sets:
            all_symptoms.update(s)

    candidates = [s for s in all_symptoms if s not in asked]
    if not candidates:
        return None

    counts = [len(s) for s in remaining.values()]
    total = sum(counts)
    current_entropy = compute_entropy(counts, total)

    best_symptom = None
    best_ig = -1

    for symptom in candidates:
        yes_counts, no_counts = [], []
        for sets in remaining.values():
            m = sum(1 for s in sets if symptom in s)
            yes_counts.append(m)
            no_counts.append(len(sets) - m)

        yes_total = sum(yes_counts)
        no_total = sum(no_counts)

        h_yes = compute_entropy(yes_counts, yes_total)
        h_no = compute_entropy(no_counts, no_total)

        p_yes = yes_total / total if total else 0
        p_no = no_total / total if total else 0

        ig = current_entropy - (p_yes * h_yes + p_no * h_no)

        if ig > best_ig:
            best_ig = ig
            best_symptom = symptom

    return best_symptom

@csrf_exempt
def diagnosis_view(request):
    if request.method == "POST":
        # initialize with top diseases
        disease_names = request.POST.get("disease_names", "")
        disease_list  = [d.strip() for d in disease_names.split(",")]
        diseases_data = load_diseases(disease_list)

        request.session["asked"]     = []
        request.session["remaining"] = {
            d: [list(s) for s in sets] for d, sets in diseases_data.items()
        }

        # send first follow-up question
        next_symptom = select_best_symptom(diseases_data, set())
        return JsonResponse({"next_symptom": next_symptom})
    return JsonResponse({"error": "Invalid method"}, status=405)


@csrf_exempt
def diagnosis_step(request):
    if request.method == "POST":
        asked       = set(request.session.get("asked", []))
        raw_remain  = request.session.get("remaining", {})
        remaining   = {d:[set(s) for s in sets] for d,sets in raw_remain.items()}

        answer      = request.POST.get("answer")
        last_sympt  = request.POST.get("symptom")
        if answer and last_sympt:
            asked.add(last_sympt)
            # filter
            for d in list(remaining):
                if answer=="yes":
                    remaining[d] = [s for s in remaining[d] if last_sympt in s]
                else:
                    remaining[d] = [s for s in remaining[d] if last_sympt not in s]
                if not remaining[d]:
                    del remaining[d]

            request.session["asked"]     = list(asked)
            request.session["remaining"] = {d:[list(s) for s in sets] for d,sets in remaining.items()}

        # check end condition
        if len(remaining)<=1:
            final = list(remaining.keys())[0] if remaining else "Unknown"
            return JsonResponse({"result": final})

        # else ask next
        next_symptom = select_best_symptom(remaining, asked)
        return JsonResponse({"next_symptom": next_symptom})

    return JsonResponse({"error": "Invalid method"}, status=405)
