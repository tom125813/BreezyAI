import http.server
import socketserver
import mimetypes
import os

class CustomHandler(http.server.SimpleHTTPRequestHandler):
    def end_headers(self):
        if self.path.endswith(".css"):
            self.send_header("Content-type", "text/css")
        super().end_headers()

    def send_error(self, code, message=None):
        if code == 404:
            self.path = '404.html'
            return http.server.SimpleHTTPRequestHandler.do_GET(self)
        else:
            super().send_error(code, message)

PORT = 8000
Handler = CustomHandler

# Set correct mime types for better compatibility
mimetypes.add_type('text/css', '.css')

with socketserver.TCPServer(("", PORT), Handler) as httpd:
    print(f"Serving on port {PORT}")
    httpd.serve_forever()
