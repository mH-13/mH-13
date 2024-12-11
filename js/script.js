// Smooth Scrolling for Navigation Links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    document.querySelector(this.getAttribute('href')).scrollIntoView({
      behavior: 'smooth',
    });
  });
});

// Dark Mode Toggle with Icons
const darkModeToggle = document.getElementById("dark-mode-toggle");
const body = document.body;
const darkModeIcon = document.getElementById("dark-mode-icon");

// Initialize theme based on localStorage
const savedTheme = localStorage.getItem("theme");
if (savedTheme) {
  body.classList.add(savedTheme);
  darkModeIcon.className = savedTheme === "dark" ? "fas fa-sun" : "fas fa-moon";
} else {
  body.classList.add("light");
}

// Toggle dark mode
darkModeToggle.addEventListener("click", () => {
  const isDarkMode = body.classList.contains("dark");
  body.classList.toggle("dark");
  body.classList.toggle("light");

  // Update icon and localStorage
  darkModeIcon.className = isDarkMode ? "fas fa-moon" : "fas fa-sun";
  localStorage.setItem("theme", isDarkMode ? "light" : "dark");
});

// Background Animation for Hero Section
const canvas = document.getElementById("background-animation");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const particlesArray = [];
const numberOfParticles = 100;

// Create particles
class Particle {
  constructor(x, y, size, speedX, speedY, color) {
    this.x = x;
    this.y = y;
    this.size = size;
    this.speedX = speedX;
    this.speedY = speedY;
    this.color = color;
  }
  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fillStyle = this.color;
    ctx.fill();
  }
  update() {
    this.x += this.speedX;
    this.y += this.speedY;

    if (this.x > canvas.width || this.x < 0) this.speedX *= -1;
    if (this.y > canvas.height || this.y < 0) this.speedY *= -1;
  }
}

// Initialize particles
for (let i = 0; i < numberOfParticles; i++) {
  const size = Math.random() * 5;
  const x = Math.random() * canvas.width;
  const y = Math.random() * canvas.height;
  const speedX = (Math.random() - 0.5) * 2;
  const speedY = (Math.random() - 0.5) * 2;
  const color = "rgba(255, 255, 255, 0.5)";
  particlesArray.push(new Particle(x, y, size, speedX, speedY, color));
}

// Animate particles
function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  particlesArray.forEach((particle) => {
    particle.draw();
    particle.update();
  });
  requestAnimationFrame(animate);
}
animate();
