
import json
import base64
import io
import os
from PIL import Image

def optimize_lottie(file_path, max_dimension=256):
    print(f"Processing {file_path}...")
    
    try:
        with open(file_path, 'r', encoding='utf-8') as f:
            data = json.load(f)
    except FileNotFoundError:
        print(f"File not found: {file_path}")
        return

    original_size = os.path.getsize(file_path)
    
    if 'assets' not in data:
        print("No assets found in Lottie file.")
        return

    images_optimized = 0

    for asset in data['assets']:
        # Check if it's an image asset
        if 'p' in asset and isinstance(asset['p'], str) and asset['p'].startswith('data:image'):
            img_data_str = asset['p'].split(',')[1]
            monitor_msg = f"Optimizing asset {asset.get('id', 'unknown')}"
            
            try:
                img_bytes = base64.b64decode(img_data_str)
                img = Image.open(io.BytesIO(img_bytes))
                
                # Check dimensions
                w, h = img.size
                if w > max_dimension or h > max_dimension:
                    # Maintain aspect ratio
                    ratio = min(max_dimension/w, max_dimension/h)
                    new_size = (int(w*ratio), int(h*ratio))
                    img = img.resize(new_size, Image.Resampling.LANCZOS)
                    # print(f"  Resized {w}x{h} -> {new_size[0]}x{new_size[1]}")
                
                # Re-encode with optimization
                output_buffer = io.BytesIO()
                img.save(output_buffer, format='PNG', optimize=True, quality=80)
                new_img_bytes = output_buffer.getvalue()
                
                new_data_str = base64.b64encode(new_img_bytes).decode('ascii')
                asset['p'] = f"data:image/png;base64,{new_data_str}"
                
                images_optimized += 1
                
            except Exception as e:
                print(f"  Error processing image {asset.get('id', 'unknown')}: {e}")

    print(f"Optimized {images_optimized} images.")

    # Save directly to the same file
    with open(file_path, 'w', encoding='utf-8') as f:
        json.dump(data, f, separators=(',', ':')) # Minify JSON structure

    new_size = os.path.getsize(file_path)
    reduction = (original_size - new_size) / original_size * 100
    print(f"Done. Size: {original_size/1024/1024:.2f}MB -> {new_size/1024/1024:.2f}MB ({reduction:.1f}% reduction)")

if __name__ == "__main__":
    files = [
        r"src/assets/idle.json",
        r"src/assets/walk.json"
    ]
    
    current_dir = os.getcwd()
    for file_rel_path in files:
        full_path = os.path.join(current_dir, file_rel_path)
        optimize_lottie(full_path)
