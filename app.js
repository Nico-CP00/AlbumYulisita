async function fetchPhotos() {
function openLightbox(photo) {
const lb = document.getElementById('lightbox');
document.getElementById('lightboxImg').src = photo.image;
document.getElementById('lightboxImg').alt = photo.title || '';
document.getElementById('lightboxCaption').textContent = photo.title || '';
lb.hidden = false;
}


function closeLightbox() {
const lb = document.getElementById('lightbox');
lb.hidden = true;
document.getElementById('lightboxImg').src = '';
}


function fillTagFilter(photos) {
const set = new Set();
photos.forEach(p => (p.tags || []).forEach(t => set.add(t)));
const select = document.getElementById('tagFilter');
[...set].sort().forEach(t => {
const opt = document.createElement('option');
opt.value = t; opt.textContent = t;
select.appendChild(opt);
});
}


function render(photos) {
const grid = document.getElementById('gallery');
grid.innerHTML = '';
photos.forEach(p => grid.appendChild(createCard(p)));
}


function applyFilters(all) {
const q = document.getElementById('search').value.toLowerCase().trim();
const tag = document.getElementById('tagFilter').value;
return all.filter(p => {
const inText = (p.title || '').toLowerCase().includes(q) || (p.tags || []).some(t => t.toLowerCase().includes(q));
const inTag = !tag || (p.tags || []).includes(tag);
return inText && inTag;
});
}


(async function init(){
const all = await fetchPhotos();
fillTagFilter(all);
render(all);


const onChange = () => render(applyFilters(all));
document.getElementById('search').addEventListener('input', onChange);
document.getElementById('tagFilter').addEventListener('change', onChange);
document.getElementById('closeLightbox').addEventListener('click', closeLightbox);
document.getElementById('lightbox').addEventListener('click', (e)=>{ if(e.target.id==='lightbox') closeLightbox(); });
})();
}