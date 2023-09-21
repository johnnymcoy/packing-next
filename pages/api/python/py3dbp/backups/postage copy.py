





# Calculates from Melbourne, weight in KG

def calculate_postage(weight_in_kg, zone, volume=0, destination_zip=0, origin_zip=0):
    # base_rate = 10 # Base rate 
    # weight_rate = 2 # rate per kg
    # size_rate = 0.5 # Rate per cubic meter
    rates = {
        "N1": {"up_to_500g": 6.95, "basic": 8.09, "subsequent": 0.38},
        "GF": {"up_to_500g": 6.95, "basic": 8.09, "subsequent": 0.52},
        # ... (add rates for all other zones)
    }
    # Check if zone is valid
    if zone not in rates:
        return "Invalid Zone"
    zone_rates = rates[zone]
    
    if weight_in_kg <= 0.5:        
        print("weight under 500g")
        cost = (10.60)
        expressCost = (14.10)

        return zone_rates["up_to_500g"]
    elif weight_in_kg <= 22:
        extra_weight = weight_in_kg - 0.5
        return zone_rates["basic"] + (zone_rates["subsequent"] * extra_weight)
    else:
        return "Package exceeds maximum weight"
    # elif weight_in_kg > 1000:
    #     print("weight 500g to 1kg")
    #     cost = (14.50)
    #     expressCost = (18.50)
    # elif weight_in_kg > 3000:
    #     print("weight 1kg to 3kg")
    #     cost = (18.25)
    #     expressCost = (22.75)
    # elif weight_in_kg > 5000:
    #     print("weight 3kg to 5kg")
    #     cost = (21.95)
    #     expressCost = (29.95)

    cost = base_rate + (weight_in_kg + weight_rate) + (volume * size_rate)
    
    return cost

# print("Postage Cost:", calculate_postage(weight_in_kg=2, zone="N1"))
