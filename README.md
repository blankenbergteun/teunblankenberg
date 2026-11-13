# Teun Blankenberg — website

Statische site op GitHub Pages. Geen build-stap: `index.html` is de site, `portfolio.js` is de inhoud van het portfolio.

## Foto's en films toevoegen

**Portret op de opening:** `assets/teun.jpg` (staand, 4:5).
**Portret bij Over mij:** `assets/teun-2.jpg` (staand, 3:4).

**Portfolio:** zet het bestand in `assets/portfolio/` en voeg in `portfolio.js` een blok toe:

```js
{
  soort: "foto",              // of "film"
  bestand: "oester-peer.jpg", // naam in assets/portfolio/
  vorm: "staand",             // staand, liggend, vierkant of verticaal (reels)
  titel: "Oester, peer, karnemelk",
  tekst: "Wat je ziet, in 1 à 3 zinnen.",
  waar: "Diner aan huis, 8 gasten"
},
```

Zolang een bestand ontbreekt, zie je een gekleurd vlak met de bestandsnaam.

Tips: foto's max ~2000 px breed (JPG), films als MP4 (H.264), zonder geluid, liefst onder 8 MB.

## Tekeningen

`assets/tekeningen/` bevat je eigen handschrift en iconen, overgetrokken naar vectoren (SVG). De `-wit` versies zijn voor op marineblauw.

## Lettertypes

- Jacobs Doodles: je eigen handschrift, voor koppen en titels
- Alte Haas Grotesk (Yann Le Coroller): lopende tekst. Alleen Regular staat erin
- Courier New: bijschriften, labels, kleine details. Zit op Mac en Windows; op andere toestellen valt hij terug op Courier Prime (gratis, in `assets/fonts`)

## Nog in te vullen

- Instagram-link (nu `instagram.com/`)
- E-mailadres (nu `hallo@teunblankenberg.nl`)
- KvK-nummer in de voet

## Later

- Menu samenstellen met prijsindicatie
