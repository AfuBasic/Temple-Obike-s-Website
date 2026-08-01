from PIL import Image
import numpy as np

files = [
    "attached_assets/logo-stacked.png",
    "attached_assets/logo-monogram.png",
    "attached_assets/logo-horizontal.png",
]

def remove_white_bg(path, threshold=240, edge_blur=2):
    img = Image.open(path).convert("RGBA")
    data = np.array(img, dtype=np.float32)

    r, g, b, a = data[..., 0], data[..., 1], data[..., 2], data[..., 3]

    # Pixels are "white background" if all channels are >= threshold
    white_mask = (r >= threshold) & (g >= threshold) & (b >= threshold)

    # Flood-fill from all four corners to isolate background white
    # (avoids nuking white interior elements like the TEMPLE OBIKE text area edges)
    from scipy.ndimage import label
    # label connected white regions
    labeled, num_features = label(white_mask)

    h, w = white_mask.shape
    corner_labels = set()
    for cy, cx in [(0, 0), (0, w-1), (h-1, 0), (h-1, w-1)]:
        lbl = labeled[cy, cx]
        if lbl != 0:
            corner_labels.add(lbl)

    bg_mask = np.isin(labeled, list(corner_labels))
    data[..., 3] = np.where(bg_mask, 0, 255)

    result = Image.fromarray(data.astype(np.uint8), "RGBA")
    result.save(path)
    print(f"Done: {path}  ({img.width}x{img.height})")

for f in files:
    remove_white_bg(f)

print("All complete.")
