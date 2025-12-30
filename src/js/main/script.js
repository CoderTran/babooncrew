window.addEventListener("load", () => {
    const intro = document.getElementById("intro");
    const main = document.getElementById("main-content");

    setTimeout(() => {
        intro.classList.add("hide");
        main.classList.add("show");
    }, 3000);
});

document.addEventListener("DOMContentLoaded", () => {
  VANTA.GLOBE({
    el: "#vanta-bg",
    color: 0x000000,
    color2: 0x000000,
    backgroundColor: 0xffffff,
    size: 0.3,
  });
});

let ytPlayer;
let isLoaded = false;
let isPlayerReady = false;

function autoPlayYouTubeOnScroll() {
  const section = document.querySelector("#section-2");
  const iframe = document.querySelector("#aboutVideo");

  if (!section || !iframe) return;

  const observer = new IntersectionObserver(
    ([entry]) => {
      if (entry.isIntersecting) {
        if (!isLoaded) {
          iframe.src = iframe.dataset.src;
          isLoaded = true;

          ytPlayer = new YT.Player("aboutVideo", {
            events: {
              onReady: () => {
                isPlayerReady = true;
                ytPlayer.playVideo();
              },
            },
          });
        } else if (isPlayerReady) {
          ytPlayer.playVideo();
        }
      } else {
        if (isPlayerReady) {
          ytPlayer.pauseVideo();
        }
      }
    },
    { threshold: 0.5 }
  );

  observer.observe(section);
}

document.addEventListener("DOMContentLoaded", autoPlayYouTubeOnScroll);

const percentEl = document.querySelector(".js-scroll-percent");
const loader = document.querySelector(".l-header-inner__load-content");

function updateScrollProgress() {
  const scrollTop = window.scrollY;
  const docHeight = document.documentElement.scrollHeight - window.innerHeight;

  const percent = Math.min(Math.round((scrollTop / docHeight) * 100), 100);

  // update text
  percentEl.textContent = percent + "%";

  // update background loading
  loader.style.background = `
      linear-gradient(
        to right,
        #ff002bff 0%,
        #c07d7dff ${percent}%,
        #fff ${percent}%,
        #fff 100%
      )
    `;
}

window.addEventListener("scroll", updateScrollProgress);
window.addEventListener("load", updateScrollProgress);


