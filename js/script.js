/* Smooth Scrolling for Navigation Links */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    document.querySelector(this.getAttribute('href')).scrollIntoView({
      behavior: 'smooth'
    });
  });
});

/* Dark Mode Toggle */
const darkModeToggle = document.getElementById("dark-mode-toggle");
const body = document.body;
const darkModeIcon = document.getElementById("dark-mode-icon");
const savedTheme = localStorage.getItem("theme") || "dark"; // default theme is dark
body.classList.add(savedTheme);
darkModeIcon.className = savedTheme === "dark" ? "fas fa-sun" : "fas fa-moon";
body.style.transition = "background-color 0.3s, color 0.3s";
darkModeToggle.addEventListener("click", () => {
  if(body.classList.contains("dark")){
    body.classList.remove("dark");
    body.classList.add("light");
    darkModeIcon.className = "fas fa-moon";
    localStorage.setItem("theme", "light");
  } else {
    body.classList.remove("light");
    body.classList.add("dark");
    darkModeIcon.className = "fas fa-sun";
    localStorage.setItem("theme", "dark");
  }
});

/* Background Particle Animation with Mouse Interaction */
const canvas = document.getElementById("background-animation");
if (canvas) {
  const ctx = canvas.getContext("2d");
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  let mouse = { x: null, y: null };
  canvas.addEventListener("mousemove", e => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
  });
  window.addEventListener("resize", () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  });

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
      if (mouse.x !== null && mouse.y !== null) {
        const dx = this.x - mouse.x;
        const dy = this.y - mouse.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        const interactionRadius = 80;
        if (distance < interactionRadius) {
          const angle = Math.atan2(dy, dx);
          const force = (interactionRadius - distance) / interactionRadius;
          this.x += Math.cos(angle) * force * 3;
          this.y += Math.sin(angle) * force * 3;
        }
      }
    }
  }

  const particlesArray = [];
  const numberOfParticles = 150;
  for (let i = 0; i < numberOfParticles; i++) {
    const size = Math.random() * 2 + 1;
    const x = Math.random() * canvas.width;
    const y = Math.random() * canvas.height;
    const speedX = (Math.random() - 0.5) * 1.5;
    const speedY = (Math.random() - 0.5) * 1.5;
    const color = "rgba(180, 140, 100, 0.8)";
    particlesArray.push(new Particle(x, y, size, speedX, speedY, color));
  }

  function animateParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particlesArray.forEach(particle => {
      particle.draw();
      particle.update();
    });
    requestAnimationFrame(animateParticles);
  }
  animateParticles();
}

/* EmailJS Integration */
(function () {
  emailjs.init("-56sYWvGY7ODbFNFN");
})();
document.getElementById("contact-form")?.addEventListener("submit", function (e) {
  e.preventDefault();
  const responseMessage = document.getElementById("response-message");
  responseMessage.textContent = "Sending...";
  emailjs.sendForm("service_k4hy4kf", "template_5to00np", this).then(
    () => {
      responseMessage.textContent = "Message sent successfully!";
      responseMessage.style.color = "green";
      this.reset();
    },
    () => {
      responseMessage.textContent = "Failed to send message.";
      responseMessage.style.color = "red";
    }
  );
});
