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
window.PORTFOLIO = [
  {
    soort: "foto", bestand: "oester-peer.jpg", vorm: "staand", uitgelicht: true,
    titel: "Oester, peer, karnemelk",
    tekst: "Rauwe oester met dunne plakjes peer en een koude saus van karnemelk en dille. Fris en zilt, als eerste hapje aan tafel.",
    waar: "Diner aan huis, 8 gasten"
  },
  {
    soort: "film", bestand: "beurre-blanc.mp4", vorm: "verticaal", uitgelicht: true,
    voorbeeld: "beurre-blanc-loop.mp4", poster: "beurre-blanc.jpg", instagram: "https://www.instagram.com/",
    titel: "Beurre blanc",
    tekst: "Koude boter, klontje voor klontje, door een reductie van witte wijn en sjalot geklopt. Hier gaat hij over zeebaars.",
    waar: "Uit mijn keuken"
  },
  {
    soort: "foto", bestand: "lange-tafel.jpg", vorm: "liggend", uitgelicht: true,
    titel: "Lange tafel",
    tekst: "Veertig gasten aan één tafel in de tuin. Grote schalen in het midden, iedereen schept zelf op.",
    waar: "Bruiloft in Hemmen, 40 gasten"
  },
  {
    soort: "foto", bestand: "deeg.jpg", vorm: "vierkant",
    titel: "Deeg voor de tarte",
    tekst: "Boterdeeg op het werkblad, de ochtend voor een diner. Het meeste werk gebeurt voordat de gasten er zijn.",
    waar: "Voorbereiding"
  },
  {
    soort: "film", bestand: "service.mp4", vorm: "liggend",
    titel: "Service",
    tekst: "De laatste seconden voor een gang de deur uit gaat: saus, kruiden, rand schoon, en weg.",
    waar: "Diner op locatie, 24 gasten"
  },
  {
    soort: "foto", bestand: "wijn.jpg", vorm: "staand", uitgelicht: true,
    titel: "Wijn bij de vis",
    tekst: "Een vermentino van een kleine producent uit Toscane. Bij elk menu stel ik wijnen voor die ik ken van de mensen die ze maken.",
    waar: "Wijnarrangement"
  },
  {
    soort: "film", bestand: "mont-blanc.mp4", vorm: "verticaal", uitgelicht: true,
    voorbeeld: "mont-blanc-loop.mp4", poster: "mont-blanc.jpg", instagram: "https://www.instagram.com/",
    titel: "Mont blanc",
    tekst: "Kastanjepuree door een spuitzak over meringue en slagroom. Het dessert waar het allemaal mee begon.",
    waar: "Uit mijn keuken"
  },
  {
    soort: "foto", bestand: "borrel.jpg", vorm: "vierkant",
    titel: "Biet en geitenkaas",
    tekst: "Geroosterde biet met geitenkaas en hazelnoot, in één hap te eten. Voor een staande borrel.",
    waar: "Borrel, 60 gasten"
  },
  {
    soort: "foto", bestand: "kip.jpg", vorm: "liggend", uitgelicht: true,
    titel: "Kip uit de oven",
    tekst: "Hele kippen met citroen en tijm, aan tafel aangesneden. Daarna gaat het karkas de bouillonpan in.",
    waar: "Diner aan huis, 10 gasten"
  }
];
