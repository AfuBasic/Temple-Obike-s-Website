import fitz
import os

pdf_path = "attached_assets/Temple_Obike_Logo_Set_1785584313970.pdf"
output_dir = ".agents/outputs/logos"
os.makedirs(output_dir, exist_ok=True)

doc = fitz.open(pdf_path)
print(f"Pages: {doc.page_count}")

for i, page in enumerate(doc):
    pix = page.get_pixmap(matrix=fitz.Matrix(3, 3))
    out_path = f"{output_dir}/page_{i+1:02d}.png"
    pix.save(out_path)
    print(f"Saved {out_path} ({page.rect.width:.0f}x{page.rect.height:.0f} pts)")

doc.close()
print("Done.")
