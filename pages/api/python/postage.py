# Calculates from Melbourne, weight in KG

def calculate_postage(weight_in_kg, zone, additional_parcels=0):
    rates = {
        "N1": {"up_to_500g": 6.95, "basic": 8.09, "additional": 6.59, "per_kg": 0.38},
        "GF": {"up_to_500g": 6.95, "basic": 8.09, "additional": 6.59, "per_kg": 0.52},
        "WG": {"up_to_500g": 6.95, "basic": 8.09, "additional": 6.59, "per_kg": 0.52},
        "NC": {"up_to_500g": 6.95, "basic": 8.09, "additional": 6.59, "per_kg": 0.52},
        "CB": {"up_to_500g": 6.95, "basic": 8.09, "additional": 6.59, "per_kg": 0.52},
        "N3": {"up_to_500g": 6.95, "basic": 8.36, "additional": 6.86, "per_kg": 0.45},
        "N4": {"up_to_500g": 6.95, "basic": 10.61, "additional": 9.11, "per_kg": 0.65},
        "N2": {"up_to_500g": 6.95, "basic": 10.61, "additional": 9.11, "per_kg": 0.65},
        "V1": {"up_to_500g": 6.84, "basic": 6.84, "additional": 5.34, "per_kg": 0.00},
        "GL": {"up_to_500g": 6.95, "basic": 8.00, "additional": 6.50, "per_kg": 0.27},
        "BR": {"up_to_500g": 6.95, "basic": 8.36, "additional": 6.86, "per_kg": 0.45},
        "V3": {"up_to_500g": 6.95, "basic": 8.72, "additional": 7.22, "per_kg": 0.53},
        "V2": {"up_to_500g": 6.95, "basic": 8.72, "additional": 7.22, "per_kg": 0.53},
        "Q1": {"up_to_500g": 6.95, "basic": 8.09, "additional": 6.59, "per_kg": 0.50},
        "IP": {"up_to_500g": 6.95, "basic": 9.24, "additional": 7.74, "per_kg": 1.01},
        "GC": {"up_to_500g": 6.95, "basic": 8.09, "additional": 6.59, "per_kg": 0.98},
        "Q5": {"up_to_500g": 6.95, "basic": 10.61, "additional": 9.11, "per_kg": 0.63},
        "SC": {"up_to_500g": 6.95, "basic": 9.24, "additional": 7.74, "per_kg": 1.01},
        "Q2": {"up_to_500g": 6.95, "basic": 10.61, "additional": 9.11, "per_kg": 1.23},
        "Q3": {"up_to_500g": 6.95, "basic": 10.61, "additional": 9.11, "per_kg": 1.45},
        "Q4": {"up_to_500g": 6.95, "basic": 10.61, "additional": 9.11, "per_kg": 1.65},
        "S1": {"up_to_500g": 6.95, "basic": 8.09, "additional": 6.59, "per_kg": 0.38},
        "S2": {"up_to_500g": 6.95, "basic": 10.61, "additional": 9.11, "per_kg": 0.80},
        "W1": {"up_to_500g": 6.95, "basic": 9.24, "additional": 7.74, "per_kg": 1.15},
        "W2": {"up_to_500g": 6.95, "basic": 10.61, "additional": 9.11, "per_kg": 2.23},
        "W3": {"up_to_500g": 6.95, "basic": 10.61, "additional": 9.11, "per_kg": 2.48},
        "T1": {"up_to_500g": 6.95, "basic": 9.24, "additional": 7.74, "per_kg": 0.54},
    }
    
    if zone not in rates:
        return "Invalid Zone"
    zone_rates = rates[zone]
    
    if weight_in_kg <= 0.5:        
        print("weight under 500g")
        return zone_rates["up_to_500g"]
    elif weight_in_kg <= 22:
        extra_weight = weight_in_kg - 0.5
        postage = zone_rates["basic"] + (zone_rates["per_kg"] * extra_weight)
        # return zone_rates["basic"] + (zone_rates["per_kg"] * extra_weight)
    else:
        return "Package exceeds maximum weight"
        # Adding the cost for additional parcels
    if additional_parcels > 0:
        postage += zone_rates["additional"] * additional_parcels
    
    return postage


print(calculate_postage(2, "N1"))