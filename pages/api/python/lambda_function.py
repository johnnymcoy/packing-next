import json
from app import Request 

def lambda_handler(event, context):
    data = json.loads(event['body'])
    # data = event.get('body', [])
    print("Version 0.8133, lambda Logs: data:", data)

    request = Request(data)
    results = request.pack()
    
    print("lambda Logs: Results:", results)
    if(results):
        body = results
    else:
        body = data
    return {
        'statusCode': 200,
        'body': body
    }