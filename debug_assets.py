import json
import base64
import io
from PIL import Image
import os

def debug_lottie(file_path):
    print(f"DEBUGGING: {file_path}")
    with open(file_path, 'r', encoding='utf-8') as f:
        data = json.load(f)
    
    assets = data.get('assets', [])
    print(f"Found {len(assets)} assets.")
    
    for i, asset in enumerate(assets):
        p = asset.get('p', '')
        if isinstance(p, str) and p.startswith('data:image'):
            try:
                header, encoded = p.split(',', 1)
                image_data = base64.b64decode(encoded)
                img = Image.open(io.BytesIO(image_data))
                print(f"  Asset [{i}] id={asset.get('id')}: {img.size} format={img.format}")
            except Exception as e:
                print(f"  Asset [{i}] Error: {e}")
        else:
            print(f"  Asset [{i}] is not an embedded image (p={str(p)[:50]}...)")

if __name__ == "__main__":
    files = [
        r"c:\Users\gavad\Desktop\Aarkit-Cinematic_solutions\src\assets\idle.json",
        r"c:\Users\gavad\Desktop\Aarkit-Cinematic_solutions\src\assets\walk.json"
    ]
    for f in files:
        if os.path.exists(f):
            debug_lottie(f)
