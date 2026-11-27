import http.server
import os
import re
import socketserver

PORT = 3000

class RangeHTTPRequestHandler(http.server.SimpleHTTPRequestHandler):
    """Simple HTTP Request Handler with Byte-Range (206 Partial Content) support for video & audio streaming."""

    def end_headers(self):
        self.send_header("Accept-Ranges", "bytes")
        self.send_header("Cache-Control", "no-cache, no-store, must-revalidate")
        super().end_headers()

    def send_head(self):
        if "Range" not in self.headers:
            return super().send_head()

        path = self.translate_path(self.path)
        if not os.path.isfile(path):
            return super().send_head()

        file_size = os.path.getsize(path)
        range_header = self.headers.get("Range")
        match = re.match(r"^bytes=(\d*)-(\d*)$", range_header)
        if not match:
            return super().send_head()

        start, end = match.groups()
        start = int(start) if start else 0
        end = int(end) if end else file_size - 1

        if start >= file_size or end >= file_size or start > end:
            self.send_error(416, "Requested Range Not Satisfiable")
            return None

        self.send_response(206)
        self.send_header("Content-Type", self.guess_type(path))
        self.send_header("Content-Range", f"bytes {start}-{end}/{file_size}")
        self.send_header("Content-Length", str(end - start + 1))
        self.end_headers()

        f = open(path, "rb")
        f.seek(start)

        class RangedFile:
            def __init__(self, file_obj, length):
                self.f = file_obj
                self.remaining = length

            def read(self, size=-1):
                if self.remaining <= 0:
                    return b""
                if size < 0 or size > self.remaining:
                    size = self.remaining
                data = self.f.read(size)
                self.remaining -= len(data)
                return data

            def close(self):
                self.f.close()

        return RangedFile(f, end - start + 1)

if __name__ == "__main__":
    socketserver.TCPServer.allow_reuse_address = True
    with socketserver.TCPServer(("127.0.0.1", PORT), RangeHTTPRequestHandler) as httpd:
        print(f"Serving HTTP on 127.0.0.1 port {PORT} with byte-range support...")
        httpd.serve_forever()
