/*
  PORTFOLIO CONTENT SETTINGS
  - แก้ข้อมูลผลงานใน IMAGE_PROJECTS และ VIDEO_PROJECTS ด้านล่าง
  - ใส่รูปภาพใน assets/images/ หรือใช้ URL ภาพที่เปิดดูได้
  - วิดีโอ: วาง Google Drive share link ใน driveUrl
  - ตั้งสิทธิ์ไฟล์ Google Drive เป็น "ทุกคนที่มีลิงก์สามารถดูได้"
*/
const PROFILE = {
  name: "ปรียานุช เบี้ยวบังเกืด",
  phone: "0655151820"
};

// ภาพนิ่ง: ใส่ imageUrl และ thumbnail ให้เป็น URL หรือ path รูปภาพของคุณ
const IMAGE_PROJECTS = [
  ...Array.from({ length: 5 }, (_, i) => ({
    id: `ai-image-${i+1}`, title: `AI IMAGE ${String(i+1).padStart(2,"0")}`,
    category: "ai-image", label: "AI IMAGE", year: "2026",
    description: "เพิ่มคำอธิบายผลงาน AI ภาพนี้ใน script.js",
    thumbnail: "", imageUrl: ""
  })),
  ...Array.from({ length: 5 }, (_, i) => ({
    id: `retouch-${i+1}`, title: `RETOUCH ${String(i+1).padStart(2,"0")}`,
    category: "retouch", label: "PHOTO RETOUCH", year: "2026",
    description: "เพิ่มคำอธิบายภาพที่รีทัชเองใน script.js",
    thumbnail: "", imageUrl: ""
  })),
  ...Array.from({ length: 5 }, (_, i) => ({
    id: `promo-image-${i+1}`, title: `PROMO / SHOP ${String(i+1).padStart(2,"0")}`,
    category: "promo-image", label: "PROMO / SHOP / SIGNAGE", year: "2026",
    description: "งานโปรโมต งานตามช็อป หรืองานป้ายตามสถานที่ต่าง ๆ — เพิ่มรายละเอียดของผลงานจริง",
    thumbnail: "", imageUrl: ""
  }))
];

// วิดีโอ: วางลิงก์แชร์ Google Drive ลงใน driveUrl ของแต่ละรายการ
const VIDEO_PROJECTS = [
  ...Array.from({ length: 5 }, (_, i) => ({
    id: `ai-video-${i+1}`, title: `AI VIDEO ${String(i+1).padStart(2,"0")}`,
    category: "ai-video", label: "AI VIDEO", year: "2026",
    description: "คลิปที่สร้างจาก AI", driveUrl: ""
  })),
  ...Array.from({ length: 5 }, (_, i) => ({
    id: `self-video-${i+1}`, title: `SELF-SHOT ${String(i+1).padStart(2,"0")}`,
    category: "self-video", label: "FILMED BY ME", year: "2026",
    description: "คลิปที่ถ่ายทำเอง", driveUrl: ""
  })),
  ...Array.from({ length: 5 }, (_, i) => ({
    id: `promo-video-${i+1}`, title: `PROMO VIDEO ${String(i+1).padStart(2,"0")}`,
    category: "promo-video", label: "PROMOTIONAL VIDEO", year: "2026",
    description: "คลิปวิดีโอโปรโมต", driveUrl: ""
  })),
  ...Array.from({ length: 5 }, (_, i) => ({
    id: `shop-video-${i+1}`, title: `IN-STORE TV ${String(i+1).padStart(2,"0")}`,
    category: "shop-video", label: "IN-STORE TV / SHOP", year: "2026",
    description: "คลิปที่นำไปแสดงบนโทรทัศน์ตามห้างหรือช็อป", driveUrl: ""
  }))
];

const IMAGE_CATEGORY_LABELS = {
  "ai-image": "AI IMAGE / ภาพจาก AI",
  "retouch": "PHOTO RETOUCH / ภาพรีทัช",
  "promo-image": "PROMO / SHOP / SIGNAGE"
};
const VIDEO_CATEGORY_LABELS = {
  "ai-video": "AI VIDEO / คลิปจาก AI",
  "self-video": "SELF-SHOT / คลิปที่ถ่ายเอง",
  "promo-video": "PROMOTIONAL VIDEO / คลิปโปรโมต",
  "shop-video": "IN-STORE TV / คลิปสำหรับจอทีวีในห้างและช็อป"
};

const imageGrid = document.querySelector("#imageGrid");
const videoGrid = document.querySelector("#videoGrid");
const modal = document.querySelector("#projectModal");
const modalMedia = document.querySelector("#modalMedia");
const modalTitle = document.querySelector("#modalTitle");
const modalCategory = document.querySelector("#modalCategory");
const modalDescription = document.querySelector("#modalDescription");
const modalExternal = document.querySelector("#modalExternal");
const toast = document.querySelector("#toast");
let previousFocus = null;
let language = "th";
let currentImageCategory = "ai-image";
let currentVideoCategory = "ai-video";

function safeUrl(url) {
  if (!url || typeof url !== "string") return "";
  try {
    const parsed = new URL(url, window.location.href);
    return ["http:", "https:"].includes(parsed.protocol) ? parsed.href : "";
  } catch { return ""; }
}
function driveFileId(url) {
  if (!url) return "";
  try {
    const parsed = new URL(url);
    if (!parsed.hostname.includes("drive.google.com") && !parsed.hostname.includes("docs.google.com")) return "";
    const pathMatch = parsed.pathname.match(/\/file\/d\/([^/]+)/);
    return pathMatch ? pathMatch[1] : (parsed.searchParams.get("id") || "");
  } catch { return ""; }
}
function drivePreviewUrl(url) {
  const id = driveFileId(url);
  return id ? `https://drive.google.com/file/d/${encodeURIComponent(id)}/preview` : "";
}
function showToast(message) {
  toast.textContent = message;
  toast.classList.add("show");
  window.setTimeout(() => toast.classList.remove("show"), 2300);
}
function createPlaceholder(kind, title) {
  const placeholder = document.createElement("div");
  placeholder.className = `project-placeholder ${kind === "video" ? "video-placeholder" : "image-placeholder"}`;
  const stamp = document.createElement("span");
  stamp.className = "placeholder-stamp";
  stamp.textContent = kind === "video" ? "▶ PLAY / DRIVE" : "✳ IMAGE SLOT";
  const heading = document.createElement("strong");
  heading.textContent = title;
  const note = document.createElement("small");
  note.textContent = kind === "video" ? "ใส่ลิงก์ Google Drive ใน script.js" : "ใส่ URL รูปภาพใน script.js";
  placeholder.append(stamp, heading, note);
  return placeholder;
}
function makeCard(project, kind, index) {
  const card = document.createElement("article");
  card.className = "project-card reveal";
  card.tabIndex = 0;
  card.setAttribute("role", "button");
  card.setAttribute("aria-label", `เปิดผลงาน ${project.title}`);
  const imageWrap = document.createElement("div");
  imageWrap.className = "project-image";
  const src = kind === "image" ? (project.thumbnail || project.imageUrl) : "";
  if (src && safeUrl(src)) {
    const img = document.createElement("img");
    img.src = safeUrl(src);
    img.alt = project.title;
    img.loading = "lazy";
    img.onerror = () => { img.remove(); imageWrap.prepend(createPlaceholder(kind, project.title)); };
    imageWrap.append(img);
  } else {
    imageWrap.append(createPlaceholder(kind, project.title));
  }
  const tag = document.createElement("span");
  tag.className = "project-tag";
  tag.textContent = project.label;
  imageWrap.append(tag);
  const open = document.createElement("span");
  open.className = "project-open";
  open.setAttribute("aria-hidden", "true");
  open.textContent = kind === "video" ? "▶" : "↗";
  imageWrap.append(open);

  const info = document.createElement("div");
  info.className = "project-info";
  const text = document.createElement("div");
  const title = document.createElement("h3");
  title.textContent = project.title;
  const meta = document.createElement("p");
  meta.textContent = `${project.category.toUpperCase()} / ${project.year}`;
  text.append(title, meta);
  const number = document.createElement("span");
  number.className = "project-year";
  number.textContent = String(index + 1).padStart(2, "0");
  info.append(text, number);
  card.append(imageWrap, info);
  card.addEventListener("click", () => openProject(project, kind));
  card.addEventListener("keydown", event => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      openProject(project, kind);
    }
  });
  return card;
}
function renderImages() {
  imageGrid.innerHTML = "";
  const filtered = IMAGE_PROJECTS.filter(p => p.category === currentImageCategory);
  filtered.forEach((project, index) => imageGrid.append(makeCard(project, "image", index)));
  observeReveals();
}
function renderVideos() {
  videoGrid.innerHTML = "";
  const filtered = VIDEO_PROJECTS.filter(p => p.category === currentVideoCategory);
  filtered.forEach((project, index) => videoGrid.append(makeCard(project, "video", index)));
  observeReveals();
}
function openProject(project, kind) {
  previousFocus = document.activeElement;
  modalMedia.innerHTML = "";
  modalTitle.textContent = project.title;
  modalCategory.textContent = kind === "image"
    ? (IMAGE_CATEGORY_LABELS[project.category] || project.label)
    : (VIDEO_CATEGORY_LABELS[project.category] || project.label);
  modalDescription.textContent = project.description || "";
  modalExternal.style.display = "none";
  modalExternal.removeAttribute("href");

  if (kind === "image") {
    const imageUrl = safeUrl(project.imageUrl || project.thumbnail);
    if (imageUrl) {
      const img = document.createElement("img");
      img.src = imageUrl;
      img.alt = project.title;
      modalMedia.append(img);
    } else {
      modalMedia.append(createPlaceholder("image", project.title));
    }
    if (imageUrl) {
      modalExternal.href = imageUrl;
      modalExternal.textContent = "OPEN FULL IMAGE ↗";
      modalExternal.style.display = "inline-block";
    }
  } else {
    const driveUrl = safeUrl(project.driveUrl);
    const previewUrl = drivePreviewUrl(project.driveUrl);
    if (previewUrl) {
      const iframe = document.createElement("iframe");
      iframe.src = previewUrl;
      iframe.title = `${project.title} — Google Drive preview`;
      iframe.allow = "autoplay";
      iframe.allowFullscreen = true;
      iframe.referrerPolicy = "strict-origin-when-cross-origin";
      modalMedia.append(iframe);
    } else {
      modalMedia.append(createPlaceholder("video", project.title));
    }
    if (driveUrl) {
      modalExternal.href = driveUrl;
      modalExternal.textContent = "OPEN GOOGLE DRIVE ↗";
      modalExternal.style.display = "inline-block";
    }
  }
  modal.hidden = false;
  document.body.classList.add("modal-open");
  modal.querySelector(".modal-close").focus();
}
function closeModal() {
  modal.hidden = true;
  modalMedia.innerHTML = "";
  document.body.classList.remove("modal-open");
  if (previousFocus && typeof previousFocus.focus === "function") previousFocus.focus();
}
document.querySelectorAll("[data-close-modal]").forEach(el => el.addEventListener("click", closeModal));
document.addEventListener("keydown", event => { if (event.key === "Escape" && !modal.hidden) closeModal(); });

document.querySelector("#imageFilterBar").addEventListener("click", event => {
  const button = event.target.closest("[data-filter]");
  if (!button) return;
  currentImageCategory = button.dataset.filter;
  document.querySelectorAll("#imageFilterBar .filter-btn").forEach(btn => btn.classList.toggle("active", btn === button));
  renderImages();
});
document.querySelector("#videoFilterBar").addEventListener("click", event => {
  const button = event.target.closest("[data-filter]");
  if (!button) return;
  currentVideoCategory = button.dataset.filter;
  document.querySelectorAll("#videoFilterBar .filter-btn").forEach(btn => btn.classList.toggle("active", btn === button));
  renderVideos();
});
document.querySelector("#langToggle").addEventListener("click", () => {
  language = language === "th" ? "en" : "th";
  document.documentElement.lang = language;
  document.querySelectorAll("[data-th][data-en]").forEach(el => { el.innerHTML = el.dataset[language]; });
  document.querySelector("#langToggle").textContent = language === "th" ? "EN ↗" : "TH ↗";
});
document.querySelector("#menuToggle").addEventListener("click", event => {
  const nav = document.querySelector(".main-nav");
  const isOpen = nav.classList.toggle("open");
  event.currentTarget.setAttribute("aria-expanded", String(isOpen));
  event.currentTarget.setAttribute("aria-label", isOpen ? "ปิดเมนู" : "เปิดเมนู");
  event.currentTarget.textContent = isOpen ? "×" : "☰";
});
document.querySelectorAll(".main-nav a").forEach(link => link.addEventListener("click", () => {
  document.querySelector(".main-nav").classList.remove("open");
  document.querySelector("#menuToggle").setAttribute("aria-expanded", "false");
  document.querySelector("#menuToggle").textContent = "☰";
}));
document.querySelector("#copyPhone").addEventListener("click", async () => {
  try {
    await navigator.clipboard.writeText(PROFILE.phone);
    showToast("คัดลอกเบอร์โทรแล้ว ✓");
  } catch {
    showToast(`เบอร์โทร: ${PROFILE.phone}`);
  }
});
document.title = `${PROFILE.name}® — Creative Portfolio`;
document.querySelector(".site-footer span:nth-child(3)").innerHTML = `© <span id="year">${new Date().getFullYear()}</span> ${PROFILE.name}`;

let revealObserver;
function observeReveals() {
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    document.querySelectorAll(".reveal").forEach(el => el.classList.add("visible"));
    return;
  }
  if (revealObserver) revealObserver.disconnect();
  revealObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.06 });
  document.querySelectorAll(".reveal").forEach(el => revealObserver.observe(el));
}
renderImages();
renderVideos();
observeReveals();
