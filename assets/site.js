/* Gedeelde code voor alle pagina's. ROOT is het pad naar de hoofdmap ("" of "../"). */
const ROOT = document.body.dataset.root || '';
const esc = s => String(s ?? '').replace(/[&<>"]/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;

/* ---------- Portfolio: inhoud uit data/portfolio.json ---------- */
async function laadPortfolio(){
  if (!document.getElementById('grid') && !document.getElementById('filmwand') && !document.getElementById('recept')) return;
  let LIJST = [];
  try {
    const res = await fetch(ROOT + 'data/portfolio.json', {cache: 'no-cache'});
    LIJST = await res.json();
  } catch (e) { LIJST = []; }
  toonPortfolio(LIJST);
}
function toonPortfolio(LIJST){
  /* ---------- Portfolio opbouwen ---------- */
  const grid = document.getElementById('grid');
  const tints = ['t1','t3','t2','t4'];
  const pad = f => f ? ROOT + 'assets/portfolio/' + f : '';
  const slug = it => String(it.bestand || '').replace(/\.[^.]+$/, '');
  const receptUrl = it => ROOT + 'recept/' + encodeURIComponent(slug(it)) + '/';

  function mediaInGrid(it){
    if (it.soort === 'film') {
      const src = pad(it.voorbeeld || it.bestand);
      return `<video src="${esc(src)}" ${it.poster ? `poster="${esc(pad(it.poster))}"` : ''} muted loop playsinline preload="none" onerror="this.remove()"></video>`;
    }
    return `<img src="${esc(pad(it.bestand))}" alt="${esc(it.titel)}" loading="lazy" onerror="this.remove()">`;
  }

  if (grid) {
    let lijst = LIJST;
    const max = parseInt(grid.dataset.max || '0', 10);
    if (max) {
      const uit = lijst.filter(it => it.uitgelicht);
      lijst = (uit.length ? uit : lijst).slice(0, max);
    }
    lijst.forEach((it, i) => {
      const el = document.createElement('article');
      el.className = `item ${tints[i % 4]}`;
      el.innerHTML = `
        <a class="tegel" href="${esc(receptUrl(it))}">
          <div class="frame">${it.soort === 'film' ? '<span class="soort">film</span>' : ''}${mediaInGrid(it)}<div class="ph">${esc(it.bestand)}</div></div>
          <h3>${esc(it.titel)}</h3>
        </a>
        <p>${esc(it.tekst)}</p>
        <p class="waar">${esc(it.waar)}</p>`;
      grid.appendChild(el);
    });
  }

  /* ---------- Filmwand op de homepage (hero: true) ---------- */
  const wand = document.getElementById('filmwand');
  if (wand) {
    LIJST.filter(it => it.hero).slice(0, 4).forEach(it => {
      const a = document.createElement('a');
      a.href = receptUrl(it);
      a.innerHTML = `<video src="${esc(pad(it.voorbeeld || it.bestand))}" ${it.poster ? `poster="${esc(pad(it.poster))}"` : ''} muted loop playsinline preload="auto" aria-hidden="true"></video>
        <span class="bij">${esc(it.titel)}<small>Bekijk het recept</small></span>`;
      wand.appendChild(a);
    });
  }

  /* ---------- Receptpagina (recept/?r=naam) ---------- */
  const recept = document.getElementById('recept');
  if (recept) {
    const r = new URLSearchParams(location.search).get('r');
    const i = LIJST.findIndex(it => slug(it) === r);
    const it = LIJST[i];
    if (!it) {
      recept.innerHTML = `<h1 class="kop">Niet gevonden</h1><p class="leeg">Dit recept bestaat niet (meer). <a href="${ROOT}portfolio/">Naar het portfolio</a></p>`;
    } else {
      document.title = it.titel + ' | Teun Blankenberg';
      const media = it.soort === 'film'
        ? `<video src="${esc(pad(it.bestand))}" ${it.poster ? `poster="${esc(pad(it.poster))}"` : ''} controls playsinline preload="metadata"></video>`
        : `<img src="${esc(pad(it.bestand))}" alt="${esc(it.titel)}">`;
      const meta = [it.waar, it.porties, it.tijd].filter(Boolean).map(esc).join('<br>');
      const alineas = (it.verhaal ? [].concat(it.verhaal) : [it.tekst]).map(t => `<p>${esc(t)}</p>`).join('');
      const ingr = (it.ingredienten || []).map(x => x.startsWith('#')
        ? `</ul><h3>${esc(x.slice(1).trim())}</h3><ul>` : `<li>${esc(x)}</li>`).join('');
      const stappen = (it.bereiding || []).map(x => `<li>${esc(x)}</li>`).join('');
      const heeftRecept = ingr || stappen;
      const vorige = LIJST[(i - 1 + LIJST.length) % LIJST.length], volgende = LIJST[(i + 1) % LIJST.length];
      recept.innerHTML = `
        <div class="r-media ${it.soort === 'film' ? 'is-film' : ''}">${media}</div>
        <div class="r-tekst">
          <a class="terug" href="${ROOT}portfolio/">Portfolio</a>
          <h1 class="kop">${esc(it.titel)}</h1>
          ${meta ? `<p class="r-meta">${meta}</p>` : ''}
          <div class="r-verhaal">${alineas}</div>
          ${heeftRecept ? `
            ${ingr ? `<h2>Ingrediënten</h2><ul>${ingr}</ul>` : ''}
            ${stappen ? `<h2>Bereiding</h2><ol class="stappen">${stappen}</ol>` : ''}`
          : `<p class="r-volgt">Het volledige recept volgt binnenkort.</p>`}
          ${it.instagram ? `<p><a class="meer" href="${esc(it.instagram)}" target="_blank" rel="noopener">Bekijk op Instagram</a></p>` : ''}
          <nav class="r-nav" aria-label="Andere recepten">
            <a href="${esc(receptUrl(vorige))}"><small>Vorige</small>${esc(vorige.titel)}</a>
            <a href="${esc(receptUrl(volgende))}"><small>Volgende</small>${esc(volgende.titel)}</a>
          </nav>
        </div>`;
      recept.querySelectorAll('ul').forEach(u => { if (!u.children.length) u.remove(); });
    }
  }

  /* ---------- Films spelen alleen als ze in beeld zijn ---------- */
  const io = new IntersectionObserver(entries => {
    entries.forEach(e => {
      const v = e.target;
      if (e.isIntersecting && !reduce) { v.preload = 'auto'; v.play().catch(()=>{}); }
      else v.pause();
    });
  }, {threshold: .25});
  document.querySelectorAll('#grid video, #filmwand video').forEach(v => io.observe(v));


}
laadPortfolio();

/* ---------- Kop: marineblauw boven blauwe vlakken, licht daartussen ---------- */
const bar = document.querySelector('.top');
const blauw = [...document.querySelectorAll('.navy')];
function headerState(){
  const y = bar.offsetHeight / 2;
  bar.classList.toggle('on-navy', blauw.some(el => { const r = el.getBoundingClientRect(); return r.top < y && r.bottom > y; }));
}
addEventListener('scroll', headerState, {passive:true}); headerState();

/* ---------- Aanvraag: verstuurt direct via Web3Forms (de sleutel is bedoeld om openbaar te zijn) ---------- */
const WEB3FORMS = 'f2548072-d2c2-444d-8794-6ed233f47412';
const form = document.getElementById('aanvraagformulier');
if (form) form.addEventListener('submit', async e => {
  e.preventDefault();
  const f = new FormData(form), knop = form.querySelector('button[type=submit]'), uit = document.getElementById('form-status');
  if (f.get('botcheck')) return; // onzichtbaar veld: alleen robots vullen dit in
  knop.disabled = true; uit.className = 'form-status'; uit.textContent = 'Versturen…';
  try {
    const res = await fetch('https://api.web3forms.com/submit', {
      method: 'POST', headers: {'Content-Type': 'application/json', 'Accept': 'application/json'},
      body: JSON.stringify({
        access_key: WEB3FORMS,
        subject: 'Aanvraag via de website: ' + f.get('naam') + (f.get('datum') ? ' (' + f.get('datum') + ')' : ''),
        from_name: 'Website Teun Blankenberg',
        replyto: f.get('mail'),
        Naam: f.get('naam'), 'E-mail': f.get('mail'), Telefoon: f.get('tel') || '-',
        Datum: f.get('datum') || 'nog niet bekend', 'Aantal gasten': f.get('gasten') || '-',
        Waar: f.get('plek') || '-', Gelegenheid: f.get('wens') || '-'
      })
    });
    const j = await res.json();
    if (!res.ok || !j.success) throw new Error(j.message || 'fout');
    form.reset();
    uit.className = 'form-status goed';
    uit.textContent = 'Je aanvraag is verstuurd. Je hoort snel van mij.';
  } catch (err) {
    uit.className = 'form-status fout';
    uit.textContent = 'Versturen is niet gelukt. Probeer het opnieuw, of stuur een WhatsApp-bericht.';
  } finally { knop.disabled = false; }
});
