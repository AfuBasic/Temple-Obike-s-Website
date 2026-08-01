from PIL import Image
import numpy as np
from scipy.ndimage import label, binary_dilation

# ── Monogram: no white text anywhere → global threshold is safe ──────────────
def remove_bg_global(path, threshold=230):
    img = Image.open(path).convert("RGBA")
    d = np.array(img)
    r, g, b = d[..., 0], d[..., 1], d[..., 2]
    white = (r >= threshold) & (g >= threshold) & (b >= threshold)
    d[..., 3] = np.where(white, 0, 255)
    Image.fromarray(d.astype(np.uint8), "RGBA").save(path)
    print(f"Global threshold done: {path}")

# ── Stacked logo: corner flood-fill outer white, then remove trapped whites
#    that are not within N pixels of black pixels (protects white text on black bar) ──
def remove_bg_smart(path, white_thresh=230, black_thresh=60, proximity=8):
    img = Image.open(path).convert("RGBA")
    d = np.array(img, dtype=np.uint8)
    r, g, b = d[..., 0].astype(float), d[..., 1].astype(float), d[..., 2].astype(float)

    # Near-white mask
    white_mask = (r >= white_thresh) & (g >= white_thresh) & (b >= white_thresh)
    # Near-black mask (the black bar & its text region)
    black_mask = (r <= black_thresh) & (g <= black_thresh) & (b <= black_thresh)

    # Dilate the black mask — any white pixel within `proximity` px of black is text
    protected = binary_dilation(black_mask, iterations=proximity)

    # Corner flood-fill to find outer white background
    labeled, _ = label(white_mask)
    h, w = white_mask.shape
    bg_labels = set()
    for cy, cx in [(0,0),(0,w-1),(h-1,0),(h-1,w-1)]:
        lbl = labeled[cy, cx]
        if lbl:
            bg_labels.add(lbl)
    outer_bg = np.isin(labeled, list(bg_labels))

    # Trapped white = white AND not touching outer bg AND not near black text
    trapped_white = white_mask & ~outer_bg & ~protected

    # Remove: outer bg + trapped interior white
    remove = outer_bg | trapped_white
    d[..., 3] = np.where(remove, 0, 255)
    Image.fromarray(d, "RGBA").save(path)
    print(f"Smart removal done: {path}")

# ── Horizontal logo already has a solid black bar — just remove outer white ──
def remove_bg_corners_only(path, white_thresh=230):
    img = Image.open(path).convert("RGBA")
    d = np.array(img, dtype=np.uint8)
    r, g, b = d[..., 0].astype(float), d[..., 1].astype(float), d[..., 2].astype(float)
    white_mask = (r >= white_thresh) & (g >= white_thresh) & (b >= white_thresh)
    labeled, _ = label(white_mask)
    h, w = white_mask.shape
    bg_labels = set()
    for cy, cx in [(0,0),(0,w-1),(h-1,0),(h-1,w-1)]:
        lbl = labeled[cy, cx]
        if lbl:
            bg_labels.add(lbl)
    outer_bg = np.isin(labeled, list(bg_labels))
    d[..., 3] = np.where(outer_bg, 0, 255)
    Image.fromarray(d, "RGBA").save(path)
    print(f"Corner-only removal done: {path}")

# Re-extract fresh copies first so we're working from clean originals
import fitz, os
pdf_path = "attached_assets/Temple_Obike_Logo_Set_1785584313970.pdf"
doc = fitz.open(pdf_path)
crops = {
    1: (0.12, 0.05, 0.88, 0.52, "attached_assets/logo-stacked.png"),
    2: (0.22, 0.05, 0.78, 0.42, "attached_assets/logo-monogram.png"),
    3: (0.05, 0.13, 0.87, 0.26, "attached_assets/logo-horizontal.png"),
}
for page_num, (x0f, y0f, x1f, y1f, out) in crops.items():
    page = doc[page_num - 1]
    w, h = page.rect.width, page.rect.height
    clip = fitz.Rect(x0f*w, y0f*h, x1f*w, y1f*h)
    pix = page.get_pixmap(matrix=fitz.Matrix(4,4), clip=clip)
    pix.save(out)
    print(f"Re-extracted {out}")
doc.close()

remove_bg_smart("attached_assets/logo-stacked.png")
remove_bg_global("attached_assets/logo-monogram.png")
remove_bg_corners_only("attached_assets/logo-horizontal.png")
print("All done.")
