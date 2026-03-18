# Moodboard Portfolio – Plan

## Ziel
Mini-Portfolio-Website auf GitHub Pages mit einem Film-Moodboard als Kernelement.
Wird mit einem Kunden zur Ansicht geteilt.

---

## Entscheidungen
| Thema | Entscheidung |
|-------|-------------|
| Hosting | GitHub Pages (statisch, kostenlos) |
| Video-Quelle | Eigene MP4-Dateien im Repo (3–6 kurze Clips) |
| Sektionen | Hero + Moodboard |
| Layout | Grid mit Thumbnails → Klick öffnet Video im Modal/Overlay |
| Tech-Stack | Pures HTML / CSS / JS – kein Build-Step |
| Design | Dunkler Hintergrund, responsive |

---

## Seitenstruktur

```
index.html
├── Hero-Sektion
│   ├── Name / Logo
│   ├── Kurzer Tagline / Untertitel
│   └── Subtiler Scroll-Hinweis
│
└── Moodboard-Sektion
    ├── Grid aus Video-Thumbnails (CSS Grid, responsive)
    │   ├── Thumbnail 1 (Poster-Bild + Titel-Overlay)
    │   ├── Thumbnail 2
    │   ├── ...
    │   └── Thumbnail 6
    │
    └── Video-Modal (Overlay)
        ├── Dunkler Backdrop
        ├── HTML5 <video> Player
        ├── Titel des Films
        └── Schließen-Button (X / ESC / Klick außerhalb)
```

---

## Dateistruktur

```
moods/
├── index.html          ← Einzige HTML-Datei
├── css/
│   └── style.css       ← Alle Styles (Grid, Modal, Responsive)
├── js/
│   └── main.js         ← Modal-Logik, Video-Steuerung
├── assets/
│   ├── videos/         ← MP4-Dateien (3–6 Clips)
│   └── thumbnails/     ← Poster-Bilder für jedes Video (JPG/WebP)
├── PLAN.md
└── README.md           ← Nur falls nötig für GitHub
```

---

## Technische Details

### Hero
- Fullscreen oder halbe Viewport-Höhe
- Zentrierter Text (Name + Tagline)
- Minimalistisch, dunkler Hintergrund (#0a0a0a o.ä.)
- Dezente Typografie (Google Font, z.B. Inter oder Space Grotesk)

### Moodboard Grid
- CSS Grid: `auto-fill, minmax(300px, 1fr)`
- Responsive: 3 Spalten → 2 → 1 je nach Bildschirmbreite
- Thumbnails mit Aspect-Ratio (16:9)
- Hover-Effekt: leichter Scale + Overlay mit Play-Icon
- Cursor: pointer

### Video Modal
- Position fixed, z-index hoch
- Backdrop: `rgba(0,0,0,0.9)`
- `<video>` Element mit `controls`, `autoplay` beim Öffnen
- Schließen via: X-Button, ESC-Taste, Klick auf Backdrop
- Video pausiert/stoppt beim Schließen
- Kein Scrollen im Hintergrund (`overflow: hidden` auf body)

### Responsive Breakpoints
- Desktop: ≥1024px → 3 Spalten
- Tablet: 600–1023px → 2 Spalten
- Mobile: <600px → 1 Spalte, Modal fullscreen

---

## Umsetzungsschritte

1. **Grundstruktur anlegen** – `index.html`, `css/style.css`, `js/main.js`
2. **Hero-Sektion bauen** – HTML + Styling
3. **Moodboard-Grid bauen** – Responsive CSS Grid mit Platzhalter-Thumbnails
4. **Video-Modal implementieren** – JS-Logik für Öffnen/Schließen/Abspielen
5. **Hover-Effekte & Animationen** – Smooth transitions
6. **Platzhalter-Videos einbinden** – Damit die Seite testbar ist
7. **Feinschliff** – Typografie, Spacing, Farben abstimmen
8. **GitHub Repo initialisieren & Pages aktivieren**

---

## Offene Punkte (für später)
- Echte Videos + Thumbnails bereitstellen
- Eigener Domain-Name (optional via GitHub Pages Custom Domain)
- Favicon / Open Graph Meta-Tags für Link-Vorschau
- Optional: Loading-Animation für Videos
