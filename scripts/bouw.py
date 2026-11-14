#!/usr/bin/env python3
"""
Bouwt alle pagina's van de site uit de sjablonen hieronder en data/portfolio.json.

- index.html, portfolio/, over-mij/, aanvraag/
- recept/<naam>/index.html voor elk portfolio-item, met schema.org (Recipe / VideoObject)
- recept/index.html (oude adressen recept/?r=naam sturen door)
- sitemap.xml, robots.txt, 404.html

Draait automatisch op GitHub (zie .github/workflows/bouw.yml) bij elke wijziging.
Lokaal: python3 scripts/bouw.py
"""
import html, json, os, re, datetime
from urllib.parse import urlparse

# Het adres van de site. Bij een eigen domein: vervang door bijv. "https://teunblankenberg.nl/"
SITE_URL = os.environ.get("SITE_URL", "https://blankenbergteun.github.io/teunblankenberg/")

HIER = os.path.dirname(os.path.abspath(__file__))
OUT = os.path.normpath(os.path.join(HIER, "..")) + "/"
DATA = json.load(open(OUT + "data/portfolio.json", encoding="utf-8"))
VANDAAG = datetime.date.today().isoformat()
BASIS = urlparse(SITE_URL).path  # bijv. "/teunblankenberg/" of "/"
NAAM = "Teun Blankenberg"
INSTAGRAM = "https://www.instagram.com/"
EMAIL = "hallo@teunblankenberg.nl"

e = lambda s: html.escape(str(s or ""), quote=True)
slug = lambda it: re.sub(r"\.[^.]+$", "", it.get("bestand", ""))
gebouwd = []  # (pad, lastmod) voor de sitemap


def schrijf(pad, inhoud):
    os.makedirs(os.path.dirname(OUT + pad) or OUT, exist_ok=True)
    with open(OUT + pad, "w", encoding="utf-8") as f:
        f.write(inhoud)


def ld(obj):
    return '<script type="application/ld+json">\n' + json.dumps(obj, ensure_ascii=False, indent=1).replace("</", "<\\/") + "\n</script>"


def page(path, title, desc, current, body, root, extra_head="", afbeelding="assets/teun.jpg", soort="website", sitemap=True, lastmod=None):
    url = SITE_URL + re.sub(r"index\.html$", "", path)
    def a(href, label, key):
        cur = ' aria-current="page"' if key == current else ""
        return f'<a href="{root}{href}"{cur}>{label}</a>'
    cta_cur = ' aria-current="page"' if current == "aanvraag" else ""
    out = f'''<!doctype html>
<html lang="nl">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>{e(title)}</title>
<meta name="description" content="{e(desc)}">
<link rel="canonical" href="{e(url)}">
<meta property="og:type" content="{soort}">
<meta property="og:title" content="{e(title)}">
<meta property="og:description" content="{e(desc)}">
<meta property="og:url" content="{e(url)}">
<meta property="og:image" content="{e(SITE_URL + afbeelding)}">
<meta property="og:locale" content="nl_NL">
<meta name="twitter:card" content="summary_large_image">
<link rel="preload" href="{root}assets/fonts/jacobs-doodles.woff2" as="font" type="font/woff2" crossorigin>
<link rel="stylesheet" href="{root}assets/site.css">
{extra_head}
</head>
<body data-root="{root}">

<header class="top">
  <a class="mark" href="{root or './'}" aria-label="{NAAM}, naar de homepage"><svg viewBox="0 0 1131 194" aria-hidden="true"><use href="{root}assets/tekeningen/naam-sprite.svg#logo"/></svg></a>
  <nav aria-label="Hoofdmenu">
    {a('aanbod/', 'Aanbod', 'aanbod')}
    {a('portfolio/', 'Portfolio', 'portfolio')}
    <span class="nav-over">{a('over-mij/', 'Over mij', 'over')}</span>
    <a class="cta" href="{root}aanvraag/"{cta_cur}><span class="lang">Doe een aanvraag</span><span class="kort">Aanvraag</span></a>
  </nav>
</header>

<main>
{body}
</main>

<footer>
  <svg class="sig" viewBox="0 0 1131 194" role="img" aria-label="{NAAM}"><use href="{root}assets/tekeningen/naam-sprite.svg#logo"/></svg>
  <span>Private chef in Amsterdam</span>
  <a href="{root}aanbod/">Aanbod</a>
  <a href="{root}over-mij/">Over mij</a>
  <a href="{INSTAGRAM}" target="_blank" rel="noopener">Instagram</a>
  <a href="mailto:{EMAIL}">{EMAIL}</a>
  <span>KvK 00000000</span>
</footer>

<script src="{root}assets/site.js"></script>
</body>
</html>
'''
    schrijf(path, out)
    if sitemap:
        gebouwd.append((url, lastmod or VANDAAG))


def band(root, titel="Zin in een diner?", tekst="Vertel kort wat je in gedachten hebt. Je krijgt binnen twee dagen een voorstel met menu en prijs."):
    return f'''  <section class="navy band" aria-labelledby="band-h">
    <h2 id="band-h">{titel}</h2>
    <div class="rechts">
      <p>{tekst}</p>
      <a class="knop" href="{root}aanvraag/">Doe een aanvraag</a>
    </div>
  </section>'''


PERSOON = {"@type": "Person", "name": NAAM, "url": SITE_URL}
BEDRIJF = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": SITE_URL + "#bedrijf",
    "name": NAAM + ", private chef",
    "description": "Catering, private dining en private chef in en rond Amsterdam. Koken voor kleine en grote gezelschappen, thuis of op locatie.",
    "url": SITE_URL,
    "image": SITE_URL + "assets/teun.jpg",
    "email": EMAIL,
    "areaServed": [{"@type": "Country", "name": "Nederland"}, {"@type": "City", "name": "Amsterdam"}],
    "founder": PERSOON,
    "knowsAbout": ["catering", "private dining", "private chef", "wijn-spijscombinaties"],
}

DIENSTEN = [
    ("Catering", "Lunches en diners voor groepen vanaf 15 personen. Op kantoor, thuis of op een feestlocatie.", "Vanaf 15 personen"),
    ("Private dining", "Een diner aan tafel, bij jou thuis of op een plek naar keuze. Het menu stellen we samen op.", "Bij jou thuis of op locatie"),
    ("Private chef", "Ik kook voor jou en je gasten, voor één avond of voor meerdere dagen.", "Eén avond of langer"),
]
STAPPEN = [
    ("Doe een aanvraag", "Vertel wat je in gedachten hebt: de datum, het aantal gasten en de gelegenheid."),
    ("Je krijgt een offerte", "Met een menuvoorstel dat past bij je wensen en het seizoen."),
    ("Ik kom koken", "Door heel Nederland. Eventuele reiskosten staan in de offerte."),
]

def diensten_html(kop="h3"):
    return '<div class="diensten">' + "".join(
        f'<article class="dienst"><{kop}>{e(t)}</{kop}><p>{e(d)}</p><p class="waar">{e(m)}</p></article>' for t, d, m in DIENSTEN) + "</div>"

def stappen_html():
    return '<ol class="werkwijze">' + "".join(f"<li><b>{e(t)}</b><span>{e(d)}</span></li>" for t, d in STAPPEN) + "</ol>"

OVER_TEKST = '''<p>Ik ben opgegroeid in een culinair gezin, waar het leven zich aan tafel afspeelde. Zolang ik me kan herinneren, hielp ik mijn moeder in haar cateringbedrijf.</p>
        <p>Op mijn vijftiende begon ik als kok in een restaurant. Mijn chef was ooit leerling van Paul Bocuse, en zo werd de nouvelle cuisine mijn fundament. Daarna kookte ik in meerdere restaurants.</p>
        <p>Toch koos ik eerst voor een studie, en werkte ik vijf jaar in de wijnbranche als inkoper en logistiek manager. Maar het koken bleef lonken, en ik weet nu zeker dat daar mijn passie ligt.</p>
        <p>Met jaren ervaring in de keuken en honderden cateringklussen achter de rug, zet ik dat nu voort in mijn eigen cateringbedrijf.</p>'''

# ---------- HOME ----------
r = ""
home = f'''  <!-- Opening: de films met "opening" aangevinkt in de beheerpagina (/beheer/) -->
  <div class="filmwand navy" id="filmwand" aria-label="Films uit mijn keuken"></div>

  <div class="hero intro-sec navy">
    <div class="duo">
      <div class="portret t1"><img src="assets/teun.jpg" alt="Teun Blankenberg in de keuken" onerror="this.remove()"><div class="ph">foto van jou aan het werk</div></div>
      <div class="label">
        <h1 class="vh">Teun Blankenberg: catering, private dining en private chef in Amsterdam</h1>
        <img class="title" src="assets/tekeningen/regel-naam-wit.svg" alt="" aria-hidden="true">
        <div class="sub" aria-hidden="true">
          <img class="l-cat" src="assets/tekeningen/regel-catering-oranje.svg" alt="">
          <img class="l-chef" src="assets/tekeningen/regel-chef-oranje.svg" alt="">
        </div>
        <p class="where">Vanuit Amsterdam, door heel Nederland</p>
        <p class="links"><a class="knop" href="aanvraag/">Doe een aanvraag</a><a href="over-mij/">Over mij</a></p>
      </div>
    </div>
  </div>

  <section aria-labelledby="aanbod-h">
    <div class="intro">
      <h2 id="aanbod-h">Wat ik doe</h2>
      <p><a class="meer" href="aanbod/">Bekijk het aanbod</a></p>
    </div>
    {diensten_html()}
    <h3 class="tussen">Zo werkt het</h3>
    {stappen_html()}
    <p class="na-stappen"><a class="knop" href="aanvraag/">Doe een aanvraag</a></p>
  </section>

  <section aria-labelledby="werk-h">
    <div class="intro">
      <h2 id="werk-h">Uit het portfolio</h2>
      <p><a class="meer" href="portfolio/">Bekijk het hele portfolio</a></p>
    </div>
    <div class="grid grid-4" id="grid" data-max="4"></div>
  </section>

{band(r)}'''
page("index.html", "Teun Blankenberg | Private chef en catering in Amsterdam",
     "Private chef en catering vanuit Amsterdam, door heel Nederland. Catering voor lunches en diners, private dining en private chef.",
     "home", home, r, extra_head=ld(BEDRIJF))

# ---------- AANBOD ----------
r = "../"
ab = f'''  <section class="page-head" aria-labelledby="ab-h">
    <div class="intro">
      <h1 class="kop" id="ab-h">Aanbod</h1>
      <p>Catering, private dining en private chef. Vanuit Amsterdam, door heel Nederland.</p>
    </div>
    {diensten_html("h2")}
  </section>

  <section aria-labelledby="zo-h">
    <div class="intro">
      <h2 id="zo-h">Zo werkt het</h2>
    </div>
    {stappen_html()}
  </section>

{band(r)}'''
page("aanbod/index.html", "Aanbod: catering, private dining en private chef | Teun Blankenberg",
     "Catering voor lunches en diners vanaf 15 personen, private dining en private chef. Vanuit Amsterdam, door heel Nederland.",
     "aanbod", ab, r, extra_head=ld({"@context": "https://schema.org", "@type": "ItemList", "itemListElement": [
         {"@type": "ListItem", "position": i + 1, "item": {"@type": "Service", "name": t, "description": d, "provider": {"@id": SITE_URL + "#bedrijf"}, "areaServed": "Nederland"}}
         for i, (t, d, m) in enumerate(DIENSTEN)]}))

# ---------- PORTFOLIO ----------
r = "../"
pf = f'''  <section class="page-head" aria-labelledby="pf-h">
    <div class="intro">
      <h1 class="kop" id="pf-h">Portfolio</h1>
    </div>
    <div class="grid" id="grid"></div>
    <noscript><ul>{"".join(f'<li><a href="../recept/{e(slug(it))}/">{e(it.get("titel"))}</a></li>' for it in DATA)}</ul></noscript>
  </section>

{band(r)}'''
page("portfolio/index.html", "Portfolio en recepten | Teun Blankenberg",
     "Recepten, kookfilms en foto's van diners en feesten door private chef Teun Blankenberg uit Amsterdam.", "portfolio", pf, r)

# ---------- OVER MIJ ----------
om = f'''  <section class="page-head" aria-labelledby="over-h">
    <div class="about">
      <div class="portrait t2"><div class="frame"><img src="../assets/teun-2.jpg" alt="Teun Blankenberg proeft een eclair" onerror="this.remove()"><div class="ph">portret</div></div></div>
      <div class="text">
        <h1 class="kop" id="over-h">Over mij</h1>
        {OVER_TEKST}
        <dl class="facts">
          <div><dt>Regio</dt><dd>Vanuit Amsterdam, door heel Nederland</dd></div>
          <div><dt>Wijn</dt><dd>Bijpassende wijnen op aanvraag</dd></div>
        </dl>
      </div>
    </div>
  </section>

{band(r)}'''
page("over-mij/index.html", "Over mij | Teun Blankenberg, private chef",
     "Teun Blankenberg groeide op in een culinair gezin, leerde koken onder een leerling van Paul Bocuse en werkte vijf jaar in de wijnbranche. Nu kookt hij als private chef in Amsterdam.",
     "over", om, r, afbeelding="assets/teun-2.jpg", extra_head=ld({"@context": "https://schema.org", "@type": "AboutPage", "about": PERSOON}))

# ---------- AANVRAAG ----------
av = f'''  <section class="navy aanvraag" aria-labelledby="aanvraag-h">
    <div class="book">
      <div class="intro-text">
        <h1 class="kop" id="aanvraag-h">Doe een aanvraag</h1>
        <p>Vertel kort wat je in gedachten hebt. Je krijgt binnen twee dagen een voorstel met menu en prijs.</p>
      </div>
      <form id="aanvraagformulier">
        <div class="field"><label for="naam">Naam</label><input id="naam" name="naam" autocomplete="name" required></div>
        <div class="field"><label for="mail">E-mail</label><input id="mail" name="mail" type="email" autocomplete="email" required></div>
        <div class="field"><label for="datum">Datum</label><input id="datum" name="datum" type="date"></div>
        <div class="field"><label for="gasten">Aantal gasten</label><input id="gasten" name="gasten" type="number" min="1" inputmode="numeric"></div>
        <div class="field wide"><label for="plek">Waar</label><input id="plek" name="plek" placeholder="Thuis, op kantoor, buiten…"></div>
        <div class="field wide"><label for="wens">Wat voor gelegenheid?</label><textarea id="wens" name="wens"></textarea></div>
        <button class="knop" type="submit">Verstuur aanvraag</button>
        <p class="form-note">Je mailprogramma opent met je aanvraag erin. Liever direct mailen: <a href="mailto:{EMAIL}">{EMAIL}</a></p>
      </form>
    </div>
  </section>'''
page("aanvraag/index.html", "Doe een aanvraag | Teun Blankenberg, private chef Amsterdam",
     "Vraag een diner aan huis, private dining of catering voor een feest aan bij private chef Teun Blankenberg in Amsterdam.", "aanvraag", av, r)

# ---------- RECEPTEN: één pagina per item ----------
def minuten_naar_iso(m):
    try:
        m = int(m)
    except (TypeError, ValueError):
        return None
    if m <= 0:
        return None
    h, mm = divmod(m, 60)
    return "PT" + (f"{h}H" if h else "") + (f"{mm}M" if mm else "")


def schema_voor(it, url):
    beeld = SITE_URL + "assets/portfolio/" + (it.get("poster") or it.get("bestand"))
    omschrijving = it.get("seo_omschrijving") or it.get("tekst") or ""
    datum = it.get("datum") or VANDAAG
    video = None
    if it.get("soort") == "film":
        video = {
            "@type": "VideoObject",
            "name": it.get("titel"),
            "description": omschrijving or it.get("titel"),
            "thumbnailUrl": [beeld],
            "contentUrl": SITE_URL + "assets/portfolio/" + it.get("bestand"),
            "uploadDate": datum,
        }
        if it.get("duur"):
            video["duration"] = it["duur"]
    ingr = [x for x in it.get("ingredienten", []) if not x.startswith("#")]
    stappen = it.get("bereiding", [])
    if ingr or stappen:
        s = {
            "@context": "https://schema.org",
            "@type": "Recipe",
            "name": it.get("titel"),
            "image": [beeld],
            "author": PERSOON,
            "datePublished": datum,
            "description": omschrijving,
            "inLanguage": "nl",
        }
        if it.get("porties"): s["recipeYield"] = it["porties"]
        tt = minuten_naar_iso(it.get("minuten"))
        if tt: s["totalTime"] = tt
        if it.get("categorie"): s["recipeCategory"] = it["categorie"]
        if it.get("keuken"): s["recipeCuisine"] = it["keuken"]
        if it.get("trefwoorden"): s["keywords"] = it["trefwoorden"]
        if ingr: s["recipeIngredient"] = ingr
        if stappen: s["recipeInstructions"] = [{"@type": "HowToStep", "position": i + 1, "text": t} for i, t in enumerate(stappen)]
        if video: s["video"] = video
        return s
    if video:
        return {"@context": "https://schema.org", **video, "author": PERSOON}
    return {"@context": "https://schema.org", "@type": "ImageObject", "contentUrl": beeld, "name": it.get("titel"),
            "description": omschrijving, "creator": PERSOON, "datePublished": datum}


r = "../../"
for i, it in enumerate(DATA):
    naam = slug(it)
    if not naam:
        continue
    url = SITE_URL + f"recept/{naam}/"
    pad_media = r + "assets/portfolio/"
    if it.get("soort") == "film":
        poster = f' poster="{e(pad_media + it["poster"])}"' if it.get("poster") else ""
        media = f'<div class="r-media is-film"><video src="{e(pad_media + it["bestand"])}"{poster} controls playsinline preload="metadata"></video></div>'
    else:
        media = f'<div class="r-media"><img src="{e(pad_media + it["bestand"])}" alt="{e(it.get("titel"))}"></div>'
    meta = "<br>".join(e(x) for x in [it.get("waar"), it.get("porties"), it.get("tijd")] if x)
    alineas = "".join(f"<p>{e(t)}</p>" for t in (it.get("verhaal") or [it.get("tekst", "")]))
    ingr_html, open_ul = "", False
    for x in it.get("ingredienten", []):
        if x.startswith("#"):
            if open_ul: ingr_html += "</ul>"
            ingr_html += f"<h3>{e(x[1:].strip())}</h3><ul>"; open_ul = True
        else:
            if not open_ul: ingr_html += "<ul>"; open_ul = True
            ingr_html += f"<li>{e(x)}</li>"
    if open_ul: ingr_html += "</ul>"
    stappen = "".join(f"<li>{e(x)}</li>" for x in it.get("bereiding", []))
    if ingr_html or stappen:
        recept_html = (f"<h2>Ingrediënten</h2>{ingr_html}" if ingr_html else "") + (f'<h2>Bereiding</h2><ol class="stappen">{stappen}</ol>' if stappen else "")
    else:
        recept_html = '<p class="r-volgt">Het volledige recept volgt binnenkort.</p>'
    ig = f'<p><a class="meer" href="{e(it["instagram"])}" target="_blank" rel="noopener">Bekijk op Instagram</a></p>' if it.get("instagram") else ""
    vorige, volgende = DATA[(i - 1) % len(DATA)], DATA[(i + 1) % len(DATA)]
    body = f'''  <article class="page-head recept">
      {media}
      <div class="r-tekst">
        <a class="terug" href="{r}portfolio/">Portfolio</a>
        <h1 class="kop">{e(it.get("titel"))}</h1>
        {f'<p class="r-meta">{meta}</p>' if meta else ''}
        <div class="r-verhaal">{alineas}</div>
        {recept_html}
        {ig}
        <nav class="r-nav" aria-label="Andere recepten">
          <a href="{r}recept/{e(slug(vorige))}/"><small>Vorige</small>{e(vorige.get("titel"))}</a>
          <a href="{r}recept/{e(slug(volgende))}/"><small>Volgende</small>{e(volgende.get("titel"))}</a>
        </nav>
      </div>
  </article>

{band(r)}'''
    titel = it.get("seo_titel") or (it.get("titel", "") + (" | Recept van Teun Blankenberg" if (it.get("ingredienten") or it.get("bereiding")) else " | Teun Blankenberg"))
    desc = it.get("seo_omschrijving") or it.get("tekst") or it.get("titel")
    kruimel = {"@context": "https://schema.org", "@type": "BreadcrumbList", "itemListElement": [
        {"@type": "ListItem", "position": 1, "name": "Portfolio", "item": SITE_URL + "portfolio/"},
        {"@type": "ListItem", "position": 2, "name": it.get("titel"), "item": url}]}
    page(f"recept/{naam}/index.html", titel, desc, "portfolio", body, r,
         extra_head=ld(schema_voor(it, url)) + "\n" + ld(kruimel),
         afbeelding="assets/portfolio/" + (it.get("poster") or it.get("bestand")), soort="article",
         lastmod=it.get("datum"))

# Oude adressen (recept/?r=naam) doorsturen naar de nieuwe pagina
schrijf("recept/index.html", '''<!doctype html><html lang="nl"><head><meta charset="utf-8"><meta name="robots" content="noindex">
<title>Recept | Teun Blankenberg</title>
<script>var r=new URLSearchParams(location.search).get('r');location.replace(r?'./'+encodeURIComponent(r)+'/':'../portfolio/');</script>
</head><body><a href="../portfolio/">Naar het portfolio</a></body></html>
''')

# 404: onbekende receptpagina (net gepubliceerd, nog niet gebouwd) → portfolio
schrijf("404.html", '''<!doctype html><html lang="nl"><head><meta charset="utf-8"><meta name="robots" content="noindex">
<title>Niet gevonden | Teun Blankenberg</title>
<style>body{font:18px/1.6 "Helvetica Neue",Arial,sans-serif;background:#F4F2EF;color:#213E60;display:grid;place-items:center;min-height:100vh;margin:0;text-align:center;padding:20px}</style>
</head><body><div><p>Deze pagina bestaat niet (meer), of wordt nog gebouwd. Probeer het over een minuut opnieuw.</p>
<p><a href="''' + BASIS + '''portfolio/">Naar het portfolio</a></p></div></body></html>
''')

# Sitemap en robots
schrijf("sitemap.xml", '<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n'
        + "".join(f"  <url><loc>{e(u)}</loc><lastmod>{d}</lastmod></url>\n" for u, d in gebouwd) + "</urlset>\n")
schrijf("robots.txt", f"User-agent: *\nDisallow: {BASIS}beheer/\nSitemap: {SITE_URL}sitemap.xml\n")

print(f"Klaar: {len(gebouwd)} pagina's, waarvan {len(DATA)} recepten.")
