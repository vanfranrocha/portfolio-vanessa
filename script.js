const header = document.querySelector(".site-header");
const menuButton = document.querySelector(".menu-button");
const mobileMenu = document.querySelector(".mobile-menu");
const revealItems = document.querySelectorAll(".reveal");

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.12 }
);

revealItems.forEach((item, index) => {
  item.style.transitionDelay = `${Math.min((index % 4) * 90, 270)}ms`;
  revealObserver.observe(item);
});

window.addEventListener(
  "scroll",
  () => header.classList.toggle("scrolled", window.scrollY > 30),
  { passive: true }
);

menuButton.addEventListener("click", () => {
  const open = menuButton.classList.toggle("active");
  menuButton.setAttribute("aria-expanded", String(open));
  mobileMenu.classList.toggle("open", open);
});

mobileMenu.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    menuButton.classList.remove("active");
    menuButton.setAttribute("aria-expanded", "false");
    mobileMenu.classList.remove("open");
  });
});
