# Teun Blankenberg — website

Statische site op GitHub Pages. Geen build-stap.

- `index.html` — home
- `portfolio/`, `over-mij/`, `aanvraag/` — de andere pagina's
- `portfolio.js` — de inhoud van het portfolio (home toont de beelden met `uitgelicht: true`)
- `assets/site.css` en `assets/site.js` — opmaak en werking van alle pagina's

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

Elk beeld krijgt automatisch een eigen receptpagina. Voeg `verhaal`, `porties`, `tijd`, `ingredienten` en `bereiding` toe in `portfolio.js` (uitleg bovenaan dat bestand).

Zolang een bestand ontbreekt, zie je een gekleurd vlak met de bestandsnaam.

Tips: foto's max ~2000 px breed (JPG).

Films: per film liefst drie bestanden: de volledige film met geluid (`bestand`, 720×1280 MP4), een korte loop zonder geluid voor het overzicht (`voorbeeld`, 6–10 s) en een stilstaand beeld (`poster`, JPG). Max 100 MB per bestand op GitHub; mik op 5–15 MB per minuut film.

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

## Loops (de korte filmpjes zonder geluid)

Elke loop is een montage van 4 shots van 2 seconden. Andere momenten kiezen? Geef per film 4 tijden door, bijvoorbeeld:

```
baguette: 0:14, 0:36, 1:27, 1:41
```
