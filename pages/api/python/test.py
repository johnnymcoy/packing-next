import json

data = {"test": "data"}

try:
    with open('output.json', 'w') as f:
        json.dump(data, f, indent=4)
except PermissionError:
    print("Permission error: Unable to write to file")
except Exception as e:
    print(f"An error occurred: {e}")