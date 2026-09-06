#!/usr/bin/env python3
"""
Daggerheart Adversary Architect - Local HTTP Server with Auto-Save API
"""
import http.server
import json
import os
import sys

PORT = 8000
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
os.chdir(BASE_DIR)

class ArchitectHTTPHandler(http.server.SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=BASE_DIR, **kwargs)

    def end_headers(self):
        # Enable CORS and disable browser caching for instant live development
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
        self.send_header('Access-Control-Allow-Headers', 'Content-Type')
        self.send_header('Cache-Control', 'no-cache, no-store, must-revalidate')
        self.send_header('Pragma', 'no-cache')
        self.send_header('Expires', '0')
        super().end_headers()

    def do_OPTIONS(self):
        self.send_response(200)
        self.end_headers()

    def do_POST(self):
        if self.path == '/api/save-custom-library':
            try:
                content_length = int(self.headers.get('Content-Length', 0))
                if content_length <= 0:
                    raise ValueError("Empty request body")

                body = self.rfile.read(content_length)
                data = json.loads(body.decode('utf-8'))
                target_file = os.path.join(BASE_DIR, 'custom-library.json')

                with open(target_file, 'w', encoding='utf-8') as f:
                    json.dump(data, f, indent=2, ensure_ascii=False)

                response = {
                    'success': True,
                    'message': 'Successfully saved to custom-library.json in project folder',
                    'filePath': target_file
                }
                self.send_response(200)
                self.send_header('Content-Type', 'application/json')
                self.end_headers()
                self.wfile.write(json.dumps(response).encode('utf-8'))
                print(f"[AUTO-SAVE] Updated custom-library.json ({len(body)} bytes)", flush=True)
                return
            except Exception as e:
                print(f"[ERROR] Failed to save custom-library.json: {e}", flush=True)
                err_resp = {'success': False, 'error': str(e)}
                self.send_response(500)
                self.send_header('Content-Type', 'application/json')
                self.end_headers()
                self.wfile.write(json.dumps(err_resp).encode('utf-8'))
                return

        self.send_response(404)
        self.send_header('Content-Type', 'application/json')
        self.end_headers()
        self.wfile.write(json.dumps({'error': 'Not found'}).encode('utf-8'))

def main():
    port = PORT
    if len(sys.argv) > 1:
        try:
            port = int(sys.argv[1])
        except ValueError:
            pass

    http.server.HTTPServer.allow_reuse_address = True
    server_address = ('', port)
    httpd = http.server.HTTPServer(server_address, ArchitectHTTPHandler)
    print("=" * 65, flush=True)
    print("  DAGGERHEART ADVERSARY ARCHITECT & ENCOUNTER ENGINE", flush=True)
    print(f"  Local Server: http://localhost:{port}", flush=True)
    print(f"  Project Directory: {BASE_DIR}", flush=True)
    print("  Auto-Save: Enabled -> custom-library.json", flush=True)
    print("=" * 65, flush=True)

    try:
        httpd.serve_forever()
    except KeyboardInterrupt:
        httpd.server_close()

if __name__ == '__main__':
    main()
