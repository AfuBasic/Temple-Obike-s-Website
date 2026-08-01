import fitz
import os

pdf_path = "attached_assets/Temple_Obike_Logo_Set_1785584313970.pdf"
output_dir = "attached_assets"

doc = fitz.open(pdf_path)

# Tight crop settings: (x0_frac, y0_frac, x1_frac, y1_frac) as fractions of page dims
crops = {
    1: (0.12, 0.05, 0.88, 0.52),   # stacked: TO monogram + TEMPLE OBIKE banner
    2: (0.22, 0.05, 0.78, 0.42),   # monogram only: TO + leaf
    3: (0.05, 0.13, 0.87, 0.26),   # horizontal: tight on the black bar only
}

names = {
    1: "logo-stacked",
    2: "logo-monogram",
    3: "logo-horizontal",
}

for page_num, crop_frac in crops.items():
    page = doc[page_num - 1]
    w, h = page.rect.width, page.rect.height
    x0 = crop_frac[0] * w
    y0 = crop_frac[1] * h
    x1 = crop_frac[2] * w
    y1 = crop_frac[3] * h
    clip = fitz.Rect(x0, y0, x1, y1)
    zoom = 4
    mat = fitz.Matrix(zoom, zoom)
    pix = page.get_pixmap(matrix=mat, clip=clip)
    out_path = f"{output_dir}/{names[page_num]}.png"
    pix.save(out_path)
    print(f"Saved {out_path} ({pix.width}x{pix.height}px)")

doc.close()
print("Done.")
