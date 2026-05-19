# Tobi's Hausmeisterservice — Redesign

Ein modernes Redesign der Website [tobis-hausmeisterservice.com](https://www.tobis-hausmeisterservice.com).

Diese Version ist als **Köder-Vordruck** gedacht — ein einmaliger Premium-Entwurf, um Tobi zu zeigen, was visuell möglich ist. Konkrete Angebote in drei Stufen (Premium / Standard / Basis) folgen separat.

## Konzept

**„Meisterwerk Editorial"** — der Elektromeister als Kunsthandwerker. Tiefes Waldgrün mit gebürsteten Messing-Akzenten, redaktionelles Magazin-Layout. Hebt sich bewusst von typischen Handwerker-Websites ab.

- **Fonts:** Fraunces (Display, variabel) · Manrope (Body) · JetBrains Mono (Akzente)
- **Palette:** Deep Forest `#0a1410` · Antique Brass `#c9a96e`
- **Stack:** Pures HTML/CSS/JS — kein Build-Schritt, deploybar überall

## Lokal ansehen

Einfach `index.html` im Browser öffnen, oder:

```powershell
npx serve .
```

## Deployment

Die Seite hat keine Abhängigkeiten und läuft auf jedem statischen Host:
- GitHub Pages
- Netlify (Drag & Drop)
- Vercel
- Eigener Webspace per FTP

## Struktur

```
.
├── index.html      # Seite
├── styles.css      # Design
├── script.js       # Scroll-Reveal, Mobile-Menü
└── README.md
```
