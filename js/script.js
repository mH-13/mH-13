// Smooth Scrolling for Navigation Links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    document.querySelector(this.getAttribute('href')).scrollIntoView({
      behavior: 'smooth',
    });
  });
});

// Modal Logic for Projects
const projectCards = document.querySelectorAll('.project-card');
const modal = document.querySelector('#project-modal');
const modalContent = document.querySelector('#modal-content');
const closeModal = document.querySelector('#close-modal');

projectCards.forEach((card) => {
  card.addEventListener('click', () => {
    const projectTitle = card.querySelector('h3').innerText;
    const projectDescription = card.querySelector('p').innerText;

    modalContent.innerHTML = `
      <h3>${projectTitle}</h3>
      <p>${projectDescription}</p>
    `;
    modal.classList.add('open');
  });
});

closeModal.addEventListener('click', () => {
  modal.classList.remove('open');
});

// Contact Form Validation (if you include a form)
const form = document.querySelector('#contact-form');
if (form) {
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = form.querySelector('input[type="email"]');
    const message = form.querySelector('textarea');

    if (!email.value.includes('@') || message.value.trim() === '') {
      alert('Please fill in a valid email and message!');
    } else {
      alert('Form submitted successfully!');
    }
  });
}
