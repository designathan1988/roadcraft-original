# A contact sheet of PNGs (each frame scaled to `width`, labelled with its file name), for looking at every photo of a set.
# python -I sheet.py <out.png> <width> <cols> <png>...
import sys
from PIL import Image, ImageDraw

out, width, cols, files = sys.argv[1], int(sys.argv[2]), int(sys.argv[3]), sys.argv[4:]
ims = []
for f in files:
    im = Image.open(f).convert('RGB')
    h = round(im.height * width / im.width)
    ims.append((f, im.resize((width, h), Image.LANCZOS)))
h = max(i.height for _, i in ims) + 18
rows = (len(ims) + cols - 1) // cols
sheet = Image.new('RGB', (cols * width, rows * h), (20, 20, 20))
d = ImageDraw.Draw(sheet)
for k, (f, im) in enumerate(ims):
    x, y = (k % cols) * width, (k // cols) * h
    sheet.paste(im, (x, y + 18))
    d.text((x + 4, y + 3), f.replace('\\', '/').split('shots/')[-1][-90:], fill=(255, 255, 0))
sheet.save(out)
print(out, sheet.size)
