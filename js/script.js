// Smooth Scrolling for Navigation Links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    document.querySelector(this.getAttribute('href')).scrollIntoView({
      behavior: 'smooth',
    });
  });
});

// Enhanced Dark Mode Toggle with Animation
const darkModeToggle = document.getElementById("dark-mode-toggle");
const body = document.body;
const darkModeIcon = document.getElementById("dark-mode-icon");

// Initialize theme without system dependency
const savedTheme = localStorage.getItem("theme") || "light";
body.classList.add(savedTheme);
darkModeIcon.className = savedTheme === "dark" ? "fas fa-sun" : "fas fa-moon";

// Toggle dark mode with smooth transition
body.style.transition = "background-color 0.3s, color 0.3s";
darkModeToggle.addEventListener("click", () => {
  const isDarkMode = body.classList.contains("dark");
  body.classList.toggle("dark", !isDarkMode);
  body.classList.toggle("light", isDarkMode);

  darkModeIcon.className = isDarkMode ? "fas fa-moon" : "fas fa-sun";
  localStorage.setItem("theme", isDarkMode ? "light" : "dark");
});

// Background Animation for Hero Section
const canvas = document.getElementById("background-animation");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const particlesArray = [];
const numberOfParticles = 150;

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

// Initialize particles with varying speeds and sizes
for (let i = 0; i < numberOfParticles; i++) {
  const size = Math.random() * 4 + 1;
  const x = Math.random() * canvas.width;
  const y = Math.random() * canvas.height;
  const speedX = (Math.random() - 0.5) * 3;
  const speedY = (Math.random() - 0.5) * 3;
  const color = "rgba(200, 200, 255, 0.7)";
  particlesArray.push(new Particle(x, y, size, speedX, speedY, color));
}

canvas.addEventListener("mousemove", (e) => {
  particlesArray.push(new Particle(e.clientX, e.clientY, 5, 0, 0, "rgba(255, 150, 0, 0.8)"));
});

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  particlesArray.forEach((particle) => {
    particle.draw();
    particle.update();
  });
  requestAnimationFrame(animate);
}
animate();

// EmailJS Integration
(function () {
  emailjs.init("-56sYWvGY7ODbFNFN");
})();

document.getElementById("contact-form").addEventListener("submit", function (e) {
  e.preventDefault();
  const responseMessage = document.getElementById("response-message");
  responseMessage.textContent = "Sending...";
  emailjs.sendForm("service_k4hy4kf", "template_5to00np", this).then(
    () => {
      responseMessage.textContent = "Message sent successfully!";
      responseMessage.className = "text-green-600";
      this.reset();
    },
    () => {
      responseMessage.textContent = "Failed to send message.";
      responseMessage.className = "text-red-600";
    }
  );
});
