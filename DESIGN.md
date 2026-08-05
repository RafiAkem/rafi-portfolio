---
name: rafi-portfolio
description: Portfolio Rafi Ikhsanul Hakim, set sebagai cetakan editorial di atas kertas hangat
version: 1.0.0
colors:
  paper:
    value: "#f3f1ea"
    type: color
  ink:
    value: "#17150f"
    type: color
  ink-soft:
    value: "#555147"
    type: color
  ink-faint:
    value: "#6f6a5c"
    type: color
  surface:
    value: "#eae7dc"
    type: color
  surface-raised:
    value: "#fbfaf6"
    type: color
  line:
    value: "#dcd7c9"
    type: color
  line-strong:
    value: "#b3ab97"
    type: color
  pine:
    value: "#1d4e3f"
    type: color
  pine-deep:
    value: "#123528"
    type: color
  pine-wash:
    value: "#e2eae4"
    type: color
  on-pine:
    value: "#f3f1ea"
    type: color
  plate:
    value: "#b4402a"
    type: color
  danger:
    value: "#9e2b15"
    type: color
  paper-dark:
    value: "#14130f"
    type: color
  surface-dark:
    value: "#1c1a15"
    type: color
  surface-raised-dark:
    value: "#211e18"
    type: color
  line-dark:
    value: "#322e26"
    type: color
  line-strong-dark:
    value: "#4e483c"
    type: color
  ink-dark:
    value: "#f3f1ea"
    type: color
  ink-soft-dark:
    value: "#aaa395"
    type: color
  ink-faint-dark:
    value: "#8b8476"
    type: color
  pine-dark:
    value: "#74c4a5"
    type: color
  pine-deep-dark:
    value: "#93d8bc"
    type: color
  pine-wash-dark:
    value: "#16241d"
    type: color
  on-pine-dark:
    value: "#0d1712"
    type: color
  plate-dark:
    value: "#e2795e"
    type: color
  danger-dark:
    value: "#ef8168"
    type: color
typography:
  serif:
    fontFamily: '"Newsreader", Georgia, serif'
    fontWeight: 400
  serif-display:
    fontFamily: '"Newsreader", Georgia, serif'
    fontWeight: 300
  mono:
    fontFamily: '"Geist Mono", ui-monospace, monospace'
    fontWeight: 400
radii:
  surface: 2px
  control: 2px
---

# Rafi Portfolio — design lock

Sistem desain yang dikunci untuk `rafi-portfolio`. Jangan menambahkan token,
radius, atau font baru tanpa mengubah dokumen ini dulu.

## Page read

- **Kind**: editorial one-pager, portofolio pribadi (kertas cetak, bukan dashboard)
- **Vibe**: cetakan editorial, ink-on-paper, halftone, satu aksen
- **Audience**: rekruter & klien teknis yang memindai dalam 30 detik
- **Approximation**: web approximation dari tradisi cetak/letterpress; bukan klon sistem UI komersial

## Locks (tidak boleh dilonggarkan)

1. **Satu accent**: `pine`. Satu-satunya warna dekoratif lain adalah `plate`
   (angka plat di section proyek) dan `danger` (hanya error form). Keduanya
   semantik/lokal, bukan accent kedua.
2. **Satu sistem radius**: 2px di semua permukaan dan kontrol. Kertas tidak
   punya sudut membulat; pil dan kartu dilarang.
3. **Satu tema di level halaman**: light/dark dipilih sekali (toggle manual +
   pre-paint script), tidak ada flip di tengah halaman.

## Type

- Satu serif (`Newsreader`) untuk display, subhead, dan body; kontras dibuat
  lewat sumbu optical size dan weight, bukan font kedua
  - display: `opsz 72, wght 300` (dark: 330), `ls -0.005em` (dark: +0.004em), `lh 1.06`
  - display-sm: `opsz 32, wght 400` (dark: 380), `lh 1.15`
  - body: `opsz 16`, 17px, `lh 1.7`
- Satu mono (`Geist Mono`) untuk yang dipindai: folio 12px, folio-caps 11px
  `ls 0.11em`, `tabular-nums`
- Measure: `--measure 62ch`, `--measure-tight 46ch`

## Motion budget

- Lenis (smooth scroll) + Motion `useScroll` untuk parallax; dilarang
  `addEventListener("scroll")`
- Reveal section: opacity 0→1, y 18px, `ease [0.16,1,0.3,1]`, 0.55s, once
- Hero: mask reveal per baris, register ink kedua, tumpukan plat (spring
  `230/27/0.8`), tilt pointer via motion values
- Halftone field: canvas 2D, DPR cap 1.5, ~30fps, IntersectionObserver stop,
  satu frame statis di bawah reduced motion
- Semua motion gugur ke statis di bawah `prefers-reduced-motion`

## Komponen

hero:
  textColor: "{colors.ink}"
  typography: "{typography.serif-display}"
nav-link:
  textColor: "{colors.ink-soft}"
  typography: "{typography.mono}"
nav-link-active:
  textColor: "{colors.pine}"
  typography: "{typography.mono}"
primary-button:
  backgroundColor: "{colors.pine}"
  textColor: "{colors.on-pine}"
  typography: "{typography.mono}"
  rounded: "{radii.control}"
field:
  borderColor: "{colors.line-strong}"
  textColor: "{colors.ink}"
caption:
  textColor: "{colors.ink-faint}"
  typography: "{typography.mono}"
plate-numeral:
  textColor: "{colors.plate}"
  typography: "{typography.mono}"
divider:
  backgroundColor: "{colors.line}"
  size: 1px
ruler:
  backgroundColor: "{colors.line}"
  size: 1px
ruler-measure:
  backgroundColor: "{colors.pine}"
  size: 2px
danger-text:
  textColor: "{colors.danger}"

## Audit trail

- 2026-08-05: audit Tasteskill bersih, kecuali 3 pelanggaran dash (en-dash di
  caption kontribusi, em-dash di sr-only & footnote code-log) yang sudah
  diperbaiki. Scrollspy nav ditambahkan (IntersectionObserver, bukan scroll
  listener). Sistem dikunci di dokumen ini.
