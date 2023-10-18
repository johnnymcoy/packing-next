import subprocess

def handler(request):
    result = subprocess.run(['python', 'api/python/appv2.py'], stdout=subprocess.PIPE)
    return result.stdout.decode('utf-8')

# from http.server import BaseHTTPRequestHandler
 
# class handler(BaseHTTPRequestHandler):
 
#     def do_GET(self):
#         self.send_response(200)
#         self.send_header('Content-type','text/plain')
#         self.end_headers()
#         self.wfile.write('Hello, world!'.encode('utf-8'))
#         return