const heartsContainer = document.querySelector(".hearts");

function spawnHeart() {
  if (!heartsContainer) return;
  const heart = document.createElement("div");
  heart.className = "heart";
  heart.innerHTML = `
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M12 21 C9.3 18.4 5.6 15.4 4 12.5 C2.2 9.1 3.4 6.2 5.7 5 C7.9 3.9 10.2 4.6 11.6 6.4 C11.8 6.7 12 6.9 12 6.9 C12 6.9 12.2 6.7 12.4 6.4 C13.8 4.6 16.1 3.9 18.3 5 C20.6 6.2 21.8 9.1 20 12.5 C18.4 15.4 14.7 18.4 12 21 Z"/>
    </svg>
  `;

  const size = 10 + Math.random() * 18;
  const left = Math.random() * 100;
  const duration = 6 + Math.random() * 6;
  const delay = Math.random() * 1.5;

  heart.style.width = `${size}px`;
  heart.style.height = `${size}px`;
  heart.style.left = `${left}vw`;
  heart.style.bottom = `-20px`;
  heart.style.animationDuration = `${duration}s`;
  heart.style.animationDelay = `${delay}s`;
  heart.style.opacity = `${0.5 + Math.random() * 0.5}`;

  heartsContainer.appendChild(heart);

  const total = (duration + delay) * 1000;
  setTimeout(() => heart.remove(), total + 200);
}

setInterval(spawnHeart, 450);

const bgAudio = document.getElementById("bg-audio");

function tryPlayAudio() {
  if (!bgAudio) return;
  bgAudio.volume = 0.2;
  bgAudio.play().catch(() => {});
}

if (bgAudio) {
  document.addEventListener("click", tryPlayAudio, { once: true });
  document.addEventListener("touchstart", tryPlayAudio, { once: true, passive: true });
  tryPlayAudio();
}

function spawnBurst(x, y) {
  if (!heartsContainer) return;
  const count = 10 + Math.floor(Math.random() * 6);
  for (let i = 0; i < count; i += 1) {
    const heart = document.createElement("div");
    heart.className = "heart";
    heart.innerHTML = `
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M12 21 C9.3 18.4 5.6 15.4 4 12.5 C2.2 9.1 3.4 6.2 5.7 5 C7.9 3.9 10.2 4.6 11.6 6.4 C11.8 6.7 12 6.9 12 6.9 C12 6.9 12.2 6.7 12.4 6.4 C13.8 4.6 16.1 3.9 18.3 5 C20.6 6.2 21.8 9.1 20 12.5 C18.4 15.4 14.7 18.4 12 21 Z"/>
      </svg>
    `;

    const size = 8 + Math.random() * 14;
    const angle = Math.random() * Math.PI * 2;
    const distance = 40 + Math.random() * 60;
    const offsetX = Math.cos(angle) * distance;
    const offsetY = Math.sin(angle) * distance;
    const duration = 700 + Math.random() * 500;

    heart.style.width = `${size}px`;
    heart.style.height = `${size}px`;
    heart.style.left = `${x}px`;
    heart.style.top = `${y}px`;
    heart.style.position = "fixed";
    heart.style.animation = "none";
    heart.style.opacity = `${0.6 + Math.random() * 0.4}`;
    heart.style.transform = `translate(-50%, -50%)`;

    heartsContainer.appendChild(heart);

    heart.animate(
      [
        { transform: "translate(-50%, -50%) scale(1)", opacity: 1 },
        { transform: `translate(calc(-50% + ${offsetX}px), calc(-50% + ${offsetY}px)) scale(0.6)`, opacity: 0 }
      ],
      { duration, easing: "cubic-bezier(0.16, 1, 0.3, 1)", fill: "forwards" }
    );

    setTimeout(() => heart.remove(), duration + 50);
  }
}

document.addEventListener("click", (event) => {
  spawnBurst(event.clientX, event.clientY);
});

const noBtn = document.getElementById("noBtn");
const noSteps = [
  "Es-tu sûre ?",
  "Vraiment sûre ?",
  "Certaine ?",
  "Naaaan chérie",
  "Penses-y vraiment",
  "Si tu dis non, je serai vraiment triste",
  "Tu ne me laisses plus le choix, je vais t’y obliger 😝"
];

let noIndex = 0;

function handleNoClick() {
  if (!noBtn) return;
  if (noIndex < noSteps.length) {
    noBtn.textContent = noSteps[noIndex];
    noIndex += 1;
    return;
  }
  noBtn.remove();
}

if (noBtn) {
  noBtn.addEventListener("click", handleNoClick);
}
