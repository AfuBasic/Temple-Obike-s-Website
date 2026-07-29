import fitz
import os

pdf_path = "attached_assets/Psychology_of_Marital_Abuse_and_Infidelity-Presentation_TCMA_1785317017220.pdf"
output_dir = ".agents/outputs/pdf_pages"
os.makedirs(output_dir, exist_ok=True)

doc = fitz.open(pdf_path)
print(f"Pages: {doc.page_count}")
print(f"Metadata: {doc.metadata}")

for i, page in enumerate(doc):
    pix = page.get_pixmap(matrix=fitz.Matrix(2, 2))
    out_path = f"{output_dir}/page_{i+1:02d}.png"
    pix.save(out_path)
    print(f"Saved {out_path} ({page.rect.width:.0f}x{page.rect.height:.0f} pts)")

doc.close()
print("Done.")
