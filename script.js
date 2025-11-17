// Lista de fotos de tu álbum.
// Para cada foto, pon el archivo dentro de /photos y agrega un objeto aquí.
const photos = [
  {
    src: "photos/foto1.jpg",
    title: "Atardecer rosado",
    note: "Ese día me sentí muy en paz 💗",
    tags: ["atardecer", "tranqui", "bonito"]
  },
  {
    src: "photos/foto2.jpg",
    title: "Café con alguien especial",
    note: "Conversaciones largas y risas suaves.",
    tags: ["café", "momentos", "amor"]
  }
  // Agrega más objetos así 👇
  // {
  //   src: "photos/archivo.jpg",
  //   title: "Título que quieras",
  //   note: "Una notita o recuerdo",
  //   tags: ["tag1", "tag2"]
  // }
];

// ====== Render de la galería ======
const galleryEl = document.getElementById("gallery");
const searchInput = document.getElementById("searchInput");
const tagFilter = document.getElementById("tagFilter");

function renderTagOptions(list) {
  const set = new Set();
  list.forEach(p => (p.tags || []).forEach(t => set.add(t)));

  // reset excepto "Todas las etiquetas"
  tagFilter.innerHTML = '<option value="">Todas las etiquetas</option>';

  Array.from(set)
    .sort((a, b) => a.localeCompare(b))
    .forEach(tag => {
      const opt = document.createElement("option");
      opt.value = tag;
      opt.textContent = tag;
      tagFilter.appendChild(opt);
    });
}

function createPhotoCard(photo, index) {
  const card = document.createElement("article");
  card.className = "photo-card";
  card.dataset.index = index;

  const inner = document.createElement("div");
  inner.className = "photo-inner";

  const img = document.createElement("img");
  img.src = photo.src;
  img.alt = photo.title || "Foto";
  img.loading = "lazy";

  inner.appendChild(img);

  const meta = document.createElement("div");
  meta.className = "photo-meta";

  const title = document.createElement("h2");
  title.className = "photo-title";
  title.textContent = photo.title || "Sin título";

  const note = document.createElement("p");
  note.className = "photo-note";
  note.textContent = photo.note || "";

  const tagsRow = document.createElement("div");
  tagsRow.className = "tag-row";

  (photo.tags || []).forEach(tag => {
    const span = document.createElement("span");
    span.className = "tag";
    span.textContent = tag;
    tagsRow.appendChild(span);
  });

  meta.appendChild(title);
  if (photo.note) meta.appendChild(note);
  if ((photo.tags || []).length) meta.appendChild(tagsRow);

  card.appendChild(inner);
  card.appendChild(meta);

  // Click para abrir en el visor grande
  card.addEventListener("click", () => openLightbox(photo));

  return card;
}

function filterPhotos() {
  const q = (searchInput.value || "").toLowerCase().trim();
  const tag = tagFilter.value;

  return photos.filter(photo => {
    const text =
      (photo.title || "").toLowerCase() +
      " " +
      (photo.note || "").toLowerCase() +
      " " +
      (photo.tags || []).join(" ").toLowerCase();

    const matchesText = !q || text.includes(q);
    const matchesTag =
      !tag || (photo.tags || []).some(t => t.toLowerCase() === tag.toLowerCase());

    return matchesText && matchesTag;
  });
}

function renderGallery() {
  galleryEl.innerHTML = "";
  const filtered = filterPhotos();

  filtered.forEach((photo, index) => {
    galleryEl.appendChild(createPhotoCard(photo, index));
  });
}

// ====== Lightbox ======
const lightbox = document.getElementById("lightbox");
const lightboxImg = document.getElementById("lightboxImg");
const lightboxTitle = document.getElementById("lightboxTitle");
const lightboxNote = document.getElementById("lightboxNote");
const lightboxTags = document.getElementById("lightboxTags");
const lightboxClose = document.getElementById("lightboxClose");

function openLightbox(photo) {
  lightboxImg.src = photo.src;
  lightboxImg.alt = photo.title || "";
  lightboxTitle.textContent = photo.title || "";
  lightboxNote.textContent = photo.note || "";

  lightboxTags.innerHTML = "";
  (photo.tags || []).forEach(tag => {
    const span = document.createElement("span");
    span.className = "tag lightbox-tag";
    span.textContent = tag;
    lightboxTags.appendChild(span);
  });

  lightbox.classList.remove("hidden");
  lightbox.classList.add("visible");
}

function closeLightbox() {
  lightbox.classList.remove("visible");
  lightbox.classList.add("hidden");
}

// Cerrar con click afuera o botón
lightbox.addEventListener("click", e => {
  if (e.target === lightbox || e.target.classList.contains("lightbox-backdrop")) {
    closeLightbox();
  }
});

lightboxClose.addEventListener("click", e => {
  e.stopPropagation();
  closeLightbox();
});

// Cerrar con ESC
document.addEventListener("keydown", e => {
  if (e.key === "Escape" && lightbox.classList.contains("visible")) {
    closeLightbox();
  }
});

// Eventos de filtro
searchInput.addEventListener("input", renderGallery);
tagFilter.addEventListener("change", renderGallery);

// Init
renderTagOptions(photos);
renderGallery();
