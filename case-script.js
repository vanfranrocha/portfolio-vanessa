const header = document.querySelector(".site-header");
const revealItems = document.querySelectorAll(".reveal");
const caseVideoPlayers = document.querySelectorAll(".case-video-player");
const themeToggle = document.querySelector(".theme-toggle");

const setTheme = (isDark) => {
  document.body.classList.toggle("theme-dark", isDark);
  if (!themeToggle) return;
  themeToggle.setAttribute("aria-pressed", String(isDark));
  themeToggle.setAttribute("aria-label", isDark ? "Ativar tema claro" : "Ativar tema escuro");
};

setTheme(localStorage.getItem("theme") === "dark");

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
  item.style.transitionDelay = `${Math.min((index % 3) * 80, 160)}ms`;
  revealObserver.observe(item);
});

window.addEventListener(
  "scroll",
  () => header.classList.toggle("scrolled", window.scrollY > 30),
  { passive: true }
);

caseVideoPlayers.forEach((player) => {
  const caseVideo = player.querySelector("video");
  const videoPlayButton = player.querySelector(".video-play-button");

  if (!caseVideo || !videoPlayButton) return;

  videoPlayButton.addEventListener("click", () => {
    caseVideoPlayers.forEach((otherPlayer) => {
      const otherVideo = otherPlayer.querySelector("video");
      if (otherVideo && otherVideo !== caseVideo) otherVideo.pause();
    });
    videoPlayButton.classList.add("is-hidden");
    caseVideo.play().catch(() => videoPlayButton.classList.remove("is-hidden"));
  });
  caseVideo.addEventListener("play", () => videoPlayButton.classList.add("is-hidden"));
  caseVideo.addEventListener("pause", () => videoPlayButton.classList.remove("is-hidden"));
  caseVideo.addEventListener("ended", () => videoPlayButton.classList.remove("is-hidden"));
});

themeToggle?.addEventListener("click", () => {
  const isDark = !document.body.classList.contains("theme-dark");
  setTheme(isDark);
  localStorage.setItem("theme", isDark ? "dark" : "light");
});
