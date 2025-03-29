/* Smooth Scrolling for Navigation Links */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener("click", function(e) {
    e.preventDefault();
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

  // Create stars with random positions and speeds
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

  // Update stars position and add mouse interactivity
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


  // Draw stars with a gradient effect

  function drawStars() {
    if (body.classList.contains("dark")) {
      ctx.fillStyle = "#0d0d0d";
    } else {
      ctx.fillStyle = "#f5f5f5";
    }
    ctx.fillRect(0, 0, w, h);
    ctx.fillStyle = body.classList.contains("dark") ? "white" : "#333";
    for (let i = 0; i < stars.length; i++) {
      const star = stars[i];
      ctx.beginPath();
      ctx.arc(star.x, star.y, star.radius, 0, 2 * Math.PI);
      ctx.fill();
    }
  }

  // Animate the stars 
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

/* Preloader */
const preloader = document.getElementById("preloader");
const mainContent = document.getElementById("main-content");
if (preloader) {
  window.addEventListener("load", () => {
    preloader.style.display = "none";
    mainContent.style.display = "block";
  });

  // Hide preloader after 3 seconds if the page is already loaded }
  setTimeout(() => {
    if (document.readyState === "complete") {
      preloader.style.display = "none";
      mainContent.style.display = "block";
    }
  }, 3000);
}
/* Back to Top Button */
const backToTopButton = document.getElementById("back-to-top"); 
if (backToTopButton) {
  window.addEventListener("scroll", () => {
    if (document.documentElement.scrollTop > 200) {
      backToTopButton.style.display = "block";
    } else {
      backToTopButton.style.display = "none";
    }
  });

  backToTopButton.addEventListener("click", () => {
    document.documentElement.scrollTop = 0;
  });
}
/* Typewriter Effect */
const typewriter = document.querySelector(".typewriter");
const text = "Welcome to My Portfolio!";
let index = 0;
const typingSpeed = 100; // Adjust the speed of typing here
function type() {
  if (index < text.length) {
    typewriter.textContent += text.charAt(index);
    index++;
    setTimeout(type, typingSpeed);
  }
} 

document.addEventListener("DOMContentLoaded", type);

/* Image Gallery with Lightbox */
const galleryImages = document.querySelectorAll(".gallery img");
const lightbox = document.getElementById("lightbox");
const lightboxImg = document.getElementById("lightbox-img");
const closeLightbox = document.getElementById("close-lightbox");
const lightboxCaption = document.getElementById("lightbox-caption");
galleryImages.forEach((img) => {
  img.addEventListener("click", () => {
    lightbox.style.display = "block";
    lightboxImg.src = img.src;
    lightboxCaption.textContent = img.alt || "";
  });
});
closeLightbox.addEventListener("click", () => {
  lightbox.style.display = "none";
});
lightbox.addEventListener("click", (e) => {
  if (e.target === lightbox) {
    lightbox.style.display = "none";
  }
});

/* Responsive Navigation Menu */
const navToggle = document.getElementById("nav-toggle");
const navMenu = document.getElementById("nav-menu");
const navLinks = document.querySelectorAll(".nav-link");
navToggle.addEventListener("click", () => {
  navMenu.classList.toggle("active");
});
navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    navMenu.classList.remove("active");
  });
});
/* Smooth Scroll to Section */
const sections = document.querySelectorAll("section");
const navLinksSmooth = document.querySelectorAll(".nav-link");
const observerOptions = {
  root: null,
  rootMargin: "0px",
  threshold: 0.1
};
const observerCallback = (entries) => {
  entries.forEach((entry) => {
    const id = entry.target.getAttribute("id");
    const navLink = document.querySelector(`.nav-link[href="#${id}"]`);
    if (entry.isIntersecting) {
      navLink.classList.add("active");
    } else {
      navLink.classList.remove("active");
    }
  });
};

const observer = new IntersectionObserver(observerCallback, observerOptions);
sections.forEach((section) => {
  observer.observe(section);
});




