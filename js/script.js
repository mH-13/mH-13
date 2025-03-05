/* Smooth Scrolling for Navigation Links */
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    document.querySelector(this.getAttribute("href")).scrollIntoView({
      behavior: "smooth",
    });
  });
});

/* Dark Mode Toggle */
const darkModeToggle = document.getElementById("dark-mode-toggle");
const body = document.body;
const darkModeIcon = document.getElementById("dark-mode-icon");
const savedTheme = localStorage.getItem("theme") || "dark"; // default to dark theme
body.classList.add(savedTheme);
darkModeIcon.className = savedTheme === "dark" ? "fas fa-sun" : "fas fa-moon";
body.style.transition = "background-color 0.3s, color 0.3s";

darkModeToggle.addEventListener("click", () => {
  if (body.classList.contains("dark")) {
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

/* Star Field Background */
const canvas = document.getElementById("background-animation");
if (canvas) {
  const ctx = canvas.getContext("2d");
  let w, h;
  let stars = [];
  const numStars = 200;
  let mouse = { x: 0, y: 0 };

  function initCanvas() {
    w = canvas.width = window.innerWidth;
    h = canvas.height = window.innerHeight;
  }
  window.addEventListener("resize", initCanvas, false);
  window.addEventListener("mousemove", (e) => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
  });

  function createStars() {
    for (let i = 0; i < numStars; i++) {
      stars.push({
        x: Math.random() * w,
        y: Math.random() * h,
        radius: Math.random() * 1.2,
        speed: Math.random() * 0.5 + 0.2,
      });
    }
  }

  function updateStars() {
    for (let i = 0; i < stars.length; i++) {
      const star = stars[i];
      // Move star downward
      star.y += star.speed;
      // Simple parallax effect: shift horizontally based on mouse.x
      star.x += (mouse.x - w / 2) * 0.00001 * star.speed;

      // If star goes off screen, reset to top
      if (star.y > h) {
        star.y = 0;
        star.x = Math.random() * w;
      }
    }
  }

  function drawStars() {
    ctx.clearRect(0, 0, w, h);
    ctx.fillStyle = "white";
    for (let i = 0; i < stars.length; i++) {
      const star = stars[i];
      ctx.beginPath();
      ctx.arc(star.x, star.y, star.radius, 0, 2 * Math.PI);
      ctx.fill();
    }
  }

  function animate() {
    updateStars();
    drawStars();
    requestAnimationFrame(animate);
  }

  // Initialize
  initCanvas();
  createStars();
  animate();
}

/* EmailJS Integration (same as before) */
(function () {
  emailjs.init("-56sYWvGY7ODbFNFN");
})();
document.getElementById("contact-form")?.addEventListener("submit", function (e) {
  e.preventDefault();
  const responseMessage = document.getElementById("response-message");
  responseMessage.textContent = "Sending...";
  emailjs
    .sendForm("service_k4hy4kf", "template_5to00np", this)
    .then(() => {
      responseMessage.textContent = "Message sent successfully!";
      responseMessage.style.color = "green";
      this.reset();
    })
    .catch(() => {
      responseMessage.textContent = "Failed to send message.";
      responseMessage.style.color = "red";
    });
});
