
const canvas = document.getElementById("particles-bg");
const ctx = canvas.getContext("2d");

let particles = [];
let width, height;
let animationId;

const particleCount = 65;
const connectionDistance = 120;

function resizeCanvas() {
  const dpr = Math.min(window.devicePixelRatio || 1, 2);

  width = window.innerWidth;
  height = window.innerHeight;

  canvas.width = width * dpr;
  canvas.height = height * dpr;
  canvas.style.width = width + "px";
  canvas.style.height = height + "px";

  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

  particles = Array.from({ length: particleCount }, () => ({
    x: Math.random() * width,
    y: Math.random() * height,
    vx: (Math.random() - 0.5) * 0.5,
    vy: (Math.random() - 0.5) * 0.5,
    radius: Math.random() * 1.8 + 1
  }));
}

function animateParticles() {
  ctx.clearRect(0, 0, width, height);

  for (let i = 0; i < particles.length; i++) {
    const p = particles[i];

    p.x += p.vx;
    p.y += p.vy;

    if (p.x < 0 || p.x > width) p.vx *= -1;
    if (p.y < 0 || p.y > height) p.vy *= -1;

    ctx.beginPath();
    ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
    ctx.fillStyle = "rgba(0, 220, 255, 0.7)";
    ctx.fill();

    for (let j = i + 1; j < particles.length; j++) {
      const other = particles[j];
      const dx = p.x - other.x;
      const dy = p.y - other.y;
      const distance = Math.sqrt(dx * dx + dy * dy);

      if (distance < connectionDistance) {
        ctx.beginPath();
        ctx.moveTo(p.x, p.y);
        ctx.lineTo(other.x, other.y);

        const opacity = 1 - distance / connectionDistance;
        ctx.strokeStyle = `rgba(0, 200, 255, ${opacity * 0.22})`;
        ctx.lineWidth = 0.7;
        ctx.stroke();
      }
    }
  }

  animationId = requestAnimationFrame(animateParticles);
}

resizeCanvas();
animateParticles();

window.addEventListener("resize", resizeCanvas);


document.addEventListener("visibilitychange", () => {
    cancelAnimationFrame(animationId);

    if (!document.hidden) {
        animateParticles();
    }
});
