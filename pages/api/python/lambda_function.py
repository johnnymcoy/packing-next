import json
from app import Request 

def lambda_handler(event, context):
    data = json.loads(event['body'])
    # print("Version 0.82, lambda Logs: data:", data)
    request = Request(data)
    results = request.pack()
    # print("lambda Logs: Results:", results)
    if(results):
        body = results
    else:
        body = data
    return {
        'statusCode': 200,
        'body': body
    }