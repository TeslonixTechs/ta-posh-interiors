const projectData = {
  "olive-house": { title: "The Olive House", category: "Residential · Ibadan", description: "A calm, tactile home shaped by natural light and easy living.", images: [["https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1800&q=90", "Quiet, light-filled living room in natural stone and timber"], ["https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1800&q=90", "Warm modern interior with tailored furnishings"], ["https://images.unsplash.com/photo-1600210492493-0946911123ea?auto=format&fit=crop&w=1800&q=90", "Understated living space with warm accents"]] },
  meridian: { title: "The Meridian", category: "Hospitality · Ibadan", description: "A hospitality concept shaped from the first arrival to the final detail.", images: [["https://images.unsplash.com/photo-1611892440504-42a792e24d32?auto=format&fit=crop&w=1800&q=90", "The Meridian guest suite"], ["https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1800&q=90", "The Meridian lounge and gathering space"], ["https://images.unsplash.com/photo-1616486029423-aaa4789e8c9a?auto=format&fit=crop&w=1800&q=90", "The Meridian interior details"], ["https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1800&q=90", "The Meridian garden and guest arrival"]] },
  olowo: { title: "Olowo House", category: "Commercial · Ibadan", description: "A flexible workplace designed for focus, flow and fresh ideas.", images: [["https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=1800&q=90", "Open-plan workspace"], ["https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&w=1800&q=90", "Collaborative workspace with natural light"], ["https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1800&q=90", "Thoughtful workplace details"]] },
  atelier: { title: "Atelier Objects", category: "Furniture · Made in Ibadan", description: "Made-to-measure pieces with honest materials and lasting form.", images: [["https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=1800&q=90", "Bespoke furniture in a soft, natural interior"], ["https://images.unsplash.com/photo-1616486029423-aaa4789e8c9a?auto=format&fit=crop&w=1800&q=90", "Furniture and light in dialogue"], ["https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1800&q=90", "Tailored furniture in a considered living room"]] },
  stillwater: { title: "Stillwater Residence", category: "Residential · Oyo State", description: "A thoughtful renovation, with room to breathe.", images: [["https://images.unsplash.com/photo-1600210492493-0946911123ea?auto=format&fit=crop&w=1800&q=90", "Stillwater living room"], ["https://images.unsplash.com/photo-1600607687644-c7171b42498f?auto=format&fit=crop&w=1800&q=90", "Warm timber and natural light"], ["https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?auto=format&fit=crop&w=1800&q=90", "A quiet, considered corner"]] },
  "garden-court": { title: "Garden Court", category: "Hospitality · Oyo State", description: "An intimate retreat with a gracious sense of arrival.", images: [["https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1800&q=90", "Garden Court property and landscape"], ["https://images.unsplash.com/photo-1611892440504-42a792e24d32?auto=format&fit=crop&w=1800&q=90", "A warm, inviting guest room"], ["https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1800&q=90", "A place to gather and unwind"]] },
  "new-beginnings": { title: "New Beginnings", category: "Before & after · Ibadan", description: "A full-room transformation, from the bones of the space to the final layer.", images: [["https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?auto=format&fit=crop&w=1800&q=90", "New Beginnings finished living space"], ["https://images.unsplash.com/photo-1600607687644-c7171b42498f?auto=format&fit=crop&w=1800&q=90", "New Beginnings material palette and furnishings"], ["https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1800&q=90", "New Beginnings considered final details"]] }
};

const header = document.querySelector(".site-header");
const menuToggle = document.querySelector(".menu-toggle");
const primaryNav = document.querySelector(".primary-nav");
const dialog = document.querySelector(".project-dialog");
const dialogImage = document.querySelector(".dialog-image");
const dialogTitle = document.querySelector(".dialog-title");
const dialogCategory = document.querySelector(".dialog-category");
const dialogDescription = document.querySelector(".dialog-description");
const dialogCounter = document.querySelector(".dialog-counter");
const projectCards = [...document.querySelectorAll(".project-card")];
let activeProject = null;
let activeImageIndex = 0;

function updateHeader() { header.classList.toggle("is-scrolled", window.scrollY > 32); }
function closeMenu() {
  menuToggle.setAttribute("aria-expanded", "false");
  menuToggle.setAttribute("aria-label", "Open menu");
  primaryNav.classList.remove("is-open");
}
function showProjectImage() {
  const project = projectData[activeProject];
  const [src, alt] = project.images[activeImageIndex];
  dialogImage.src = src;
  dialogImage.alt = alt;
  dialogTitle.textContent = project.title;
  dialogCategory.textContent = project.category;
  dialogDescription.textContent = project.description;
  dialogCounter.textContent = `${String(activeImageIndex + 1).padStart(2, "0")} / ${String(project.images.length).padStart(2, "0")}`;
}
function openProject(projectId) {
  if (!projectData[projectId]) return;
  activeProject = projectId;
  activeImageIndex = 0;
  showProjectImage();
  dialog.showModal();
  document.body.classList.add("dialog-open");
}
function moveGallery(direction) {
  if (!activeProject) return;
  const count = projectData[activeProject].images.length;
  activeImageIndex = (activeImageIndex + direction + count) % count;
  showProjectImage();
}

window.addEventListener("scroll", updateHeader, { passive: true });
updateHeader();
menuToggle.addEventListener("click", () => {
  const isOpen = menuToggle.getAttribute("aria-expanded") === "true";
  menuToggle.setAttribute("aria-expanded", String(!isOpen));
  menuToggle.setAttribute("aria-label", isOpen ? "Open menu" : "Close menu");
  primaryNav.classList.toggle("is-open", !isOpen);
});
primaryNav.querySelectorAll("a").forEach((link) => link.addEventListener("click", closeMenu));
document.querySelectorAll("[data-filter]").forEach((button) => {
  button.addEventListener("click", () => {
    const filter = button.dataset.filter;
    document.querySelectorAll("[data-filter]").forEach((filterButton) => {
      const selected = filterButton === button;
      filterButton.classList.toggle("is-active", selected);
      filterButton.setAttribute("aria-pressed", String(selected));
    });
    projectCards.forEach((card) => { card.hidden = filter !== "all" && card.dataset.category !== filter; });
  });
});
document.querySelectorAll("[data-project-open]").forEach((button) => button.addEventListener("click", () => openProject(button.dataset.projectOpen)));
document.querySelector(".dialog-close").addEventListener("click", () => dialog.close());
document.querySelector(".dialog-prev").addEventListener("click", () => moveGallery(-1));
document.querySelector(".dialog-next").addEventListener("click", () => moveGallery(1));
dialog.addEventListener("click", (event) => { if (event.target === dialog) dialog.close(); });
dialog.addEventListener("close", () => document.body.classList.remove("dialog-open"));
document.addEventListener("keydown", (event) => {
  if (!dialog.open) return;
  if (event.key === "ArrowRight") moveGallery(1);
  if (event.key === "ArrowLeft") moveGallery(-1);
});
document.querySelector("#current-year").textContent = new Date().getFullYear();