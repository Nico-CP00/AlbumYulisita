// Lista de fotos del álbum.
// Para cada foto, poner el archivo dentro de /photos y agrega el objeto aquí
const photos = [
  {
    src: "photos/foto1.jpeg",
    title: "Primera Fotito",
    note: "La primera fotito de mi amorsita en mi celu jeje."
  },
  {
    src: "photos/foto2.jpeg",
    title: "Primer 14 de Febrero",
    note: "Aunque no lo celebramos como tal, salimos y fue muy bonito el dia con mi Yulisita."
  },
  {
    src: "photos/foto3.jpeg",
    title: "Templo Bahá'í",
    note: "Fotito de mi hermosa en el templito."
  },
  {
    src: "photos/foto4.jpeg",
    title: "No Quebrada de Macul",
    note: "Cuando nos confundimos pero aun así fue una bonita salida porque estuvimos juntitos."
  },
  {
    src: "photos/foto5.jpeg",
    title: "Salida en Bici a Parque Bicentenario",
    note: "Salida bonito donde fuimos muy lejitos en bici."
  },
  {
    src: "photos/foto6.jpeg",
    title: "Nuestras Empanaditas",
    note: "18 de septiembre cuando hicimos empanadas de atún."
  },
  {
    src: "photos/foto7.jpeg",
    title: "Yulisita y Emirsillo",
    note: "Mi hermosisima con el corderito travieso."
  },
  {
    src: "photos/foto8.jpeg",
    title: "Nosotros jiji",
    note: "Fotito de yo con mi tesorita."
  },
  {
    src: "photos/foto9.jpeg",
    title: "Yuliprofe",
    note: "Mi Yulisita enseñándole a un mini humano."
  },
  {
    src: "photos/foto10.jpeg",
    title: "Yuliprofe 2",
    note: "Mi Yulisita vestida de profe y se ve muy hermosa y tierna."
  },
  {
    src: "photos/foto11.jpeg",
    title: "Nosotros De Nuevo",
    note: "Yo pelucón y mi Yuli hermosa como siempre."
  },
  {
    src: "photos/foto12.jpeg",
    title: "Yulisita Preciosa Posando",
    note: "Tan hermosa y perfecta mi Yuliii😻."
  },{
    src: "photos/foto13.jpeg",
    title: "Yulisita Aesthetic",
    note: "Mi bby muy aesthetic posando con su ropita bonita."
  },{
    src: "photos/foto14.jpeg",
    title: "Nosotros Camino a la U",
    note: "En la micrito cuando nuestros horarios coincidian."
  },{
    src: "photos/foto15.jpeg",
    title: "Otra Fotito",
    note: "Fotito random de nosotros dos donde te ves preciosa como siempre jeje."
  },
  {
    src: "photos/foto16.jpeg",
    title: "En Coquimbo",
    note: "Vacaciones con mi Yulisita en Coquimbo😮."
  },
  {
    src: "photos/foto17.jpeg",
    title: "En Cerrito Calán",
    note: "Fotito en el cerrito donde se veía todo bonito aunque habia mucho esmog aaa."
  },
  {
    src: "photos/foto18.jpeg",
    title: "Otra Fotito Random",
    note: "Fotito con mi Yulisita elegante."
  },
  {
    src: "photos/foto19.jpeg",
    title: "Otra Fotito Random Más",
    note: "Tan preciosa que se ve mi amorsita."
  },
  {
    src: "photos/foto20.jpeg",
    title: "Yulisita Jinx",
    note: "Yulisita maquilladita que se ve muy preciosita y bacán😮."
  }
  
  // Estructura para agregar nuevas fotos
  // {
  //   src: "photos/archivo.jpg",
  //   title: "Título que quieras",
  //   note: "Una notita o recuerdo",
  //   tags: ["tag1", "tag2"]
  // }
];

// Render de la galería 
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