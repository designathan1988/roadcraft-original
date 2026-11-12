# Side-by-side sheets of the catalogue, before | after: each row's own sheet (render + wireframe, `scripts/model-catalog.mjs`) from the two
# catalogue folders, its triangles, vertices and hidden triangles printed over it from each folder's `rows/*.json`.
# python side_by_side.py <before folder> <after folder> <out folder> <regex on the row id> [more regexes...]
import json
import os
import re
import sys

from PIL import Image, ImageDraw, ImageFont


def rows_of(folder):
    out = {}
    for name in os.listdir(os.path.join(folder, 'rows')):
        if not name.endswith('.json'):
            continue
        with open(os.path.join(folder, 'rows', name), encoding='utf8') as f:
            row = json.load(f)
        out[row['id']] = row
    return out


def label(img, lines):
    draw = ImageDraw.Draw(img)
    try:
        font = ImageFont.truetype('arial.ttf', 18)
    except OSError:
        font = ImageFont.load_default()
    y = 6
    for line in lines:
        draw.rectangle([4, y - 2, 4 + draw.textlength(line, font=font) + 8, y + 22], fill=(255, 255, 255))
        draw.text((8, y), line, fill=(20, 20, 20), font=font)
        y += 26


def main():
    before, after, out = sys.argv[1], sys.argv[2], sys.argv[3]
    patterns = [re.compile(p) for p in sys.argv[4:]]
    os.makedirs(out, exist_ok=True)
    a, b = rows_of(before), rows_of(after)
    made = 0
    for rid, row in sorted(a.items(), key=lambda kv: kv[1].get('sheet', '')):
        if not any(p.search(rid) for p in patterns) or rid not in b:
            continue
        other = b[rid]
        if not row.get('sheet') or not other.get('sheet'):
            continue
        ia = Image.open(os.path.join(before, row['sheet'])).convert('RGB')
        ib = Image.open(os.path.join(after, other['sheet'])).convert('RGB')
        w, h = max(ia.width, ib.width), max(ia.height, ib.height)
        sheet = Image.new('RGB', (w, 2 * h + 8), (255, 255, 255))
        sheet.paste(ia, (0, 0))
        sheet.paste(ib, (0, h + 8))
        draw = ImageDraw.Draw(sheet)
        draw.rectangle([0, h, w, h + 8], fill=(200, 40, 40))
        for (r, name, y0) in [(row, 'ANTES', 0), (other, 'DEPOIS', h + 8)]:
            part = sheet.crop((0, y0, w, y0 + h))
            label(part, [f"{name}: {r['id']}", f"{r['triangles']:,} triangulos, {r['vertices']:,} vertices, {r['hiddenTriangles']} escondidos".replace(',', '.')])
            sheet.paste(part, (0, y0))
        number = os.path.basename(row['sheet'])[:4]
        safe = re.sub(r'[^A-Za-z0-9]+', '-', rid)[:90]
        sheet.save(os.path.join(out, f'ficha-lado-a-lado-{number}-{safe}.png'))
        made += 1
    print(f'{made} sheets -> {out}')


main()
