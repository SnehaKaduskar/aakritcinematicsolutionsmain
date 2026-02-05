import json
import os
import sys

def analyze_and_optimize(file_path):
    print(f"Analyzing: {file_path}")
    try:
        with open(file_path, 'r', encoding='utf-8') as f:
            data = json.load(f)
    except Exception as e:
        print(f"Error reading file: {e}")
        return

    # 1. Check for assets (embedded images)
    assets = data.get('assets', [])
    image_count = 0
    total_image_size = 0
    
    for asset in assets:
        if 'p' in asset and isinstance(asset['p'], str) and asset['p'].startswith('data:image'):
            image_count += 1
            total_image_size += len(asset['p'])

    print(f"  - Total Assets: {len(assets)}")
    print(f"  - Embedded Images: {image_count}")
    print(f"  - Approx Image Data Size: {total_image_size / 1024 / 1024:.2f} MB")

    # 2. Check for layers (vector complexity)
    layers = data.get('layers', [])
    print(f"  - Total Layers: {len(layers)}")

    # Optimization Strategy:
    # If standard vectors: Round floats.
    # If images: We can't do much without re-encoding images, but we can try rounding other props.
    
    print("  - Applying Float Precision Optimization (4 decimals)...")

    def round_floats(obj):
        if isinstance(obj, float):
            return round(obj, 3)
        elif isinstance(obj, dict):
            return {k: round_floats(v) for k, v in obj.items()}
        elif isinstance(obj, list):
            return [round_floats(x) for x in obj]
        return obj

    optimized_data = round_floats(data)
    
    new_path = file_path.replace('.json', '_optimized.json')
    with open(new_path, 'w', encoding='utf-8') as f:
        json.dump(optimized_data, f, separators=(',', ':')) # Minify
    
    old_size = os.path.getsize(file_path)
    new_size = os.path.getsize(new_path)
    
    print(f"  - Original Size: {old_size / 1024 / 1024:.2f} MB")
    print(f"  - Optimized Size: {new_size / 1024 / 1024:.2f} MB")
    print(f"  - Reduction: {100 - (new_size / old_size * 100):.2f}%")

    # If significant reduction, replace original
    # if new_size < old_size * 0.9:
    #     print("  - Overwriting original file...")
    #     os.replace(new_path, file_path)
    # else:
    #     print("  - Reduction not significant, keeping original.")
    #     os.remove(new_path)

if __name__ == "__main__":
    files = [
        r"c:\Users\gavad\Desktop\Aarkit-Cinematic_solutions\src\assets\idle.json",
        r"c:\Users\gavad\Desktop\Aarkit-Cinematic_solutions\src\assets\walk.json"
    ]
    for f in files:
        if os.path.exists(f):
            analyze_and_optimize(f)
        else:
            print(f"File not found: {f}")
