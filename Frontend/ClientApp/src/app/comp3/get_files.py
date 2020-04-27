import pathlib
import hashlib
import urllib.parse
import json

current = pathlib.Path("../../").resolve()
files = [
    p.resolve().relative_to(current)
    for p in pathlib.Path("../../assets/img").glob("**/*") if p.is_file()
]

json_dict = {}
for f in files:
    hasher = hashlib.new('md5')
    hasher.update(str(f).encode())
    digest = hasher.hexdigest()
    uri = urllib.parse.quote(str(f).replace('\\', '/'))
    json_dict[digest] = f"http://localhost:4200/${uri}"

with open('files.json', 'w') as fo:
    json.dump(json_dict, fo, indent=4)
