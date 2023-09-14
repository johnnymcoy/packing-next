import json
import sys
from flask import Flask, jsonify, request


def main(word):
    # data = json.loads(request.data)


    response = {
        "word": word,
        "length": len(word)
    }
    print(json.dumps(response))

if __name__ == "__main__":
    # print(f"Received arguments: {sys.argv}")
    if len(sys.argv) != 2:
        print(json.dumps({"error": "You must provide exactly one argument"}))
        sys.exit(1)

    main(sys.argv[1])