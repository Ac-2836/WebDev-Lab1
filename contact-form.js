const contactForm = document.querySelector('#contact form');

contactForm.addEventListener('submit', (event) => {
  event.preventDefault();

  if (!contactForm.checkValidity()) {
    contactForm.reportValidity();
    return;
  }

  const submitButton = contactForm.querySelector('button[type="submit"]');
  submitButton.disabled = true;
  submitButton.textContent = 'Submitting...';

  setTimeout(() => {
    submitButton.textContent = 'Submitted!';
  }, 800);
});