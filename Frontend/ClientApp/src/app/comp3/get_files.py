import pathlib
import hashlib
import urllib.parse
import json

current = pathlib.Path("../../").resolve()
files = [p.resolve().relative_to(current) for p in pathlib.Path("../../assets/img").glob("**/*") if p.is_file()]

d = {}
for f in files:
    h = hashlib.new('md5')
    h.update(str(f).encode())
    hash = h.hexdigest()
    d[hash] = "http://localhost:4200/" + urllib.parse.quote(str(f).replace('\\', '/'))

with open('files.json', 'w') as fo:
    json.dump(d, fo, indent=4)
