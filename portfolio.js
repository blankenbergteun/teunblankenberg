/*
  PORTFOLIO
  ---------
  Elk blok hieronder is één beeld in het portfolio. Volgorde = volgorde op de site.
  Nieuw beeld toevoegen: kopieer een blok, pas het aan, en zet de bestanden in assets/portfolio/.

  soort      : "foto" of "film"
  bestand    : foto (.jpg) of de volledige film met geluid (.mp4) in assets/portfolio/
  vorm       : "staand" (4:5), "liggend" (3:2), "vierkant" (1:1) of "verticaal" (9:16, voor reels)
  titel      : kort, verschijnt in je handschrift
  tekst      : wat men ziet, 1 à 3 zinnen
  waar       : gelegenheid, plek of aantal gasten
  uitgelicht : true = komt ook op de homepage (maximaal 6)

  Alleen voor films (allemaal optioneel):
  voorbeeld  : korte loop zonder geluid voor in het overzicht (anders wordt "bestand" gebruikt)
  poster     : stilstaand beeld (.jpg) dat je ziet terwijl de film laadt
  instagram  : link naar dezelfde reel op Instagram
*/
/* Foto's toevoegen: zelfde blok, met soort: "foto", bestand: "naam.jpg" en vorm: "staand", "liggend" of "vierkant". */
window.PORTFOLIO = [
  {
    soort: "film", vorm: "verticaal", uitgelicht: true,
    bestand: "baguette.mp4", voorbeeld: "baguette-loop.mp4", poster: "baguette.jpg",
    instagram: "",
    titel: "Baguette",
    tekst: "Van deeg tot korst: vouwen, rollen, laten rijzen in linnen, insnijden en de oven in. Op het eind het moment waar het om draait: breken.",
    waar: "Film uit mijn keuken, 1:56"
  },
  {
    soort: "film", vorm: "verticaal", uitgelicht: true,
    bestand: "carne-cruda.mp4", voorbeeld: "carne-cruda-loop.mp4", poster: "carne-cruda.jpg",
    instagram: "",
    titel: "Carne cruda all'albese",
    tekst: "De tartaar uit Alba in Piemonte. Vlees door de molen, aangemaakt met knoflook en olijfolie, in een ring op het bord en afgemaakt met citroen.",
    waar: "Film uit mijn keuken, 1:07"
  },
  {
    soort: "film", vorm: "verticaal", uitgelicht: true,
    bestand: "rode-mul.mp4", voorbeeld: "rode-mul-loop.mp4", poster: "rode-mul.jpg",
    instagram: "",
    titel: "Rode mul met aardappelschubben",
    tekst: "Rode mul van de markt, met schubben van flinterdunne aardappel en een salsa van geblakerde tomaat. In de pan op de aardappelkant gebakken tot hij goudbruin is.",
    waar: "Film uit mijn keuken, 2:29"
  },
  {
    soort: "film", vorm: "verticaal", uitgelicht: true,
    bestand: "eclair-au-cafe.mp4", voorbeeld: "eclair-au-cafe-loop.mp4", poster: "eclair-au-cafe.jpg",
    instagram: "",
    titel: "Eclair au café",
    tekst: "Soezendeeg spuiten en bakken, banketbakkersroom met koffie, vullen en glaceren. Aan het eind de proef.",
    waar: "Film uit mijn keuken, 1:30"
  },
  {
    soort: "film", vorm: "verticaal", uitgelicht: true,
    bestand: "kip-tajine.mp4", voorbeeld: "kip-tajine-loop.mp4", poster: "kip-tajine.jpg",
    instagram: "",
    titel: "Kip tajine, m'qualli style",
    tekst: "Kippenpoten met saffraan, gember en kurkuma, gestoofd in de pan met olijven en ingemaakte citroen.",
    waar: "Film uit mijn keuken, 1:07"
  },
  {
    soort: "film", vorm: "verticaal", uitgelicht: true,
    bestand: "kip-citroen-peper.mp4", voorbeeld: "kip-citroen-peper-loop.mp4", poster: "kip-citroen-peper.jpg",
    instagram: "",
    titel: "Kip met citroen en peper",
    tekst: "Kippendijen gemarineerd in citroenrasp en gekneusde peper, krokant gebakken in de gietijzeren pan. Met geroosterde spitskool en een bonensalade.",
    waar: "Film uit mijn keuken, 0:32"
  },
  {
    soort: "film", vorm: "verticaal",
    bestand: "tiramisu.mp4", voorbeeld: "tiramisu-loop.mp4", poster: "tiramisu.jpg",
    instagram: "",
    titel: "Tiramisu",
    tekst: "Eieren en suiker luchtig geklopt, mascarpone erdoor, lange vingers gedrenkt in koffie. Laag op laag, en royaal cacao erover.",
    waar: "Film uit mijn keuken, 1:22"
  },
  {
    soort: "film", vorm: "verticaal",
    bestand: "bonensalade.mp4", voorbeeld: "bonensalade-loop.mp4", poster: "bonensalade.jpg",
    instagram: "",
    titel: "Bonensalade met groene saus",
    tekst: "Drie soorten bonen en mais, door een saus van peterselie en kruiden uit de blender. Makkelijk mee te nemen.",
    waar: "Film uit mijn keuken, 0:40"
  }
];
