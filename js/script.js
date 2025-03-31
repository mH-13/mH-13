/* Smooth Scrolling for Navigation Links */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener("click", function(e) {
    e.preventDefault();
    // If mobile menu is open, close it when a link is clicked
    const navLinks = document.getElementById("nav-links");
    if (navLinks.classList.contains("active")) {
      navLinks.classList.remove("active");
    }
    document.querySelector(this.getAttribute("href")).scrollIntoView({
      behavior: "smooth"
    });
  });
});

/* Dark Mode Toggle */
const darkModeToggle = document.getElementById("dark-mode-toggle");
const body = document.body;
const darkModeIcon = document.getElementById("dark-mode-icon");
const savedTheme = localStorage.getItem("theme") || "dark";
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

/* Mobile Menu Toggle */
const menuToggle = document.getElementById("menu-toggle");
const navLinks = document.getElementById("nav-links");

menuToggle.addEventListener("click", () => {
  navLinks.classList.toggle("active");
});

/* Star Field Background with Enhanced Mouse Interactivity */
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
        speed: Math.random() * 0.5 + 0.2
      });
    }
  }

  function updateStars() {
    for (let i = 0; i < stars.length; i++) {
      const star = stars[i];
      star.y += star.speed;
      const dx = mouse.x - star.x;
      const dy = mouse.y - star.y;
      const distance = Math.sqrt(dx * dx + dy * dy);
      if (distance < 100) {
        star.x += dx * 0.05;
        star.y += dy * 0.05;
      }
      if (star.y > h) {
        star.y = 0;
        star.x = Math.random() * w;
      }
    }
  }

  function drawStars() {
    ctx.fillStyle = body.classList.contains("dark") ? "#0d0d0d" : "#f5f5f5";
    ctx.fillRect(0, 0, w, h);
    ctx.fillStyle = body.classList.contains("dark") ? "white" : "#333";
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

  initCanvas(); 
  createStars();
  animate();
}

/* Scroll Progress Bar */
window.addEventListener('scroll', () => {
  const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
  const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
  const scrollPercentage = (scrollTop / scrollHeight) * 100;
  document.getElementById('progress-bar').style.width = scrollPercentage + '%';
});

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

/* Testimonials Carousel */
let testimonialIndex = 0;
const testimonials = document.querySelectorAll(".testimonial");
if(testimonials.length) {
  function showTestimonial(index) {
    testimonials.forEach((t, i) => {
      t.classList.toggle("active", i === index);
    });
  }
  function nextTestimonial() {
    testimonialIndex = (testimonialIndex + 1) % testimonials.length;
    showTestimonial(testimonialIndex);
  }
  setInterval(nextTestimonial, 5000);
}

/* Skill Bar Animation */
document.addEventListener("DOMContentLoaded", () => {
  const skillBars = document.querySelectorAll(".skill-bar");
  skillBars.forEach(bar => {
    const level = bar.getAttribute("data-level");
    bar.style.width = "0";
    setTimeout(() => {
      bar.style.width = level;
    }, 500);
  });
});


