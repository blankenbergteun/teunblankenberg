/* Gedeelde code voor alle pagina's. ROOT is het pad naar de hoofdmap ("" of "../"). */
const ROOT = document.body.dataset.root || '';
const esc = s => String(s ?? '').replace(/[&<>"]/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;

/* ---------- Portfolio opbouwen uit portfolio.js ---------- */
const grid = document.getElementById('grid');
const tints = ['t1','t3','t2','t4'];
const pad = f => f ? ROOT + 'assets/portfolio/' + f : '';

function mediaInGrid(it){
  if (it.soort === 'film') {
    const src = pad(it.voorbeeld || it.bestand);
    return `<video src="${esc(src)}" ${it.poster ? `poster="${esc(pad(it.poster))}"` : ''} muted loop playsinline preload="none" onerror="this.remove()"></video>`;
  }
  return `<img src="${esc(pad(it.bestand))}" alt="${esc(it.titel)}" loading="lazy" onerror="this.remove()">`;
}
function mediaGroot(it){
  if (it.soort === 'film')
    return `<video src="${esc(pad(it.bestand))}" ${it.poster ? `poster="${esc(pad(it.poster))}"` : ''} controls autoplay playsinline></video>`;
  return `<img src="${esc(pad(it.bestand))}" alt="${esc(it.titel)}">`;
}

if (grid) {
  let lijst = window.PORTFOLIO || [];
  const max = parseInt(grid.dataset.max || '0', 10);
  if (max) {
    const uit = lijst.filter(it => it.uitgelicht);
    lijst = (uit.length ? uit : lijst).slice(0, max);
  }
  lijst.forEach((it, i) => {
    const el = document.createElement('article');
    el.className = `item ${it.vorm || 'staand'} ${tints[i % 4]}`;
    el.innerHTML = `
      <button type="button" aria-label="${esc(it.titel)} groot bekijken">
        <div class="frame">${it.soort === 'film' ? '<span class="soort">film</span>' : ''}${mediaInGrid(it)}<div class="ph">${esc(it.bestand)}</div></div>
      </button>
      <h3>${esc(it.titel)}</h3>
      <p>${esc(it.tekst)}</p>
      <p class="waar">${esc(it.waar)}</p>`;
    el.querySelector('button').addEventListener('click', () => openZoom(it));
    grid.appendChild(el);
  });
}

/* ---------- Groot bekijken ---------- */
const dlg = document.getElementById('zoom');
function openZoom(it){
  if (!dlg) return;
  const box = dlg.querySelector('.zoom');
  box.innerHTML = `<div class="media">${mediaGroot(it)}</div>
    <h3>${esc(it.titel)}</h3><p>${esc(it.tekst)}</p><p class="waar">${esc(it.waar)}</p>
    ${it.instagram ? `<a class="ig" href="${esc(it.instagram)}" target="_blank" rel="noopener">Bekijk op Instagram</a>` : ''}`;
  dlg.showModal();
}
if (dlg) {
  dlg.querySelector('.sluit').addEventListener('click', () => dlg.close());
  dlg.addEventListener('click', e => { if (e.target === dlg) dlg.close(); });
  dlg.addEventListener('close', () => { dlg.querySelector('.zoom').innerHTML = ''; });
}

/* ---------- Films spelen alleen als ze in beeld zijn ---------- */
const io = new IntersectionObserver(entries => {
  entries.forEach(e => {
    const v = e.target;
    if (e.isIntersecting && !reduce) { v.preload = 'auto'; v.play().catch(()=>{}); }
    else v.pause();
  });
}, {threshold: .25});
document.querySelectorAll('#grid video').forEach(v => io.observe(v));

/* ---------- Kop: marineblauw boven blauwe vlakken, licht daartussen ---------- */
const bar = document.querySelector('.top');
const blauw = [...document.querySelectorAll('.navy')];
function headerState(){
  const y = bar.offsetHeight / 2;
  bar.classList.toggle('on-navy', blauw.some(el => { const r = el.getBoundingClientRect(); return r.top < y && r.bottom > y; }));
}
addEventListener('scroll', headerState, {passive:true}); headerState();

/* ---------- Aanvraag als e-mail ---------- */
const form = document.getElementById('aanvraagformulier');
if (form) form.addEventListener('submit', e => {
  e.preventDefault();
  const f = new FormData(form);
  const body = [
    'Naam: ' + f.get('naam'),
    'E-mail: ' + f.get('mail'),
    'Datum: ' + (f.get('datum') || 'nog niet bekend'),
    'Aantal gasten: ' + (f.get('gasten') || '-'),
    'Waar: ' + (f.get('plek') || '-'),
    '', f.get('wens') || ''
  ].join('\n');
  location.href = 'mailto:hallo@teunblankenberg.nl?subject=' + encodeURIComponent('Aanvraag ' + (f.get('datum') || '')) + '&body=' + encodeURIComponent(body);
});
