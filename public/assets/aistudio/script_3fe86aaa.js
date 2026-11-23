// Mushi Digital Growth Studio — site interactions
const menuButton = document.querySelector('.menu-toggle');
const navigation = document.querySelector('.nav');
if (menuButton && navigation) {
  menuButton.addEventListener('click', () => {
    const isOpen = navigation.classList.toggle('open');
    menuButton.setAttribute('aria-expanded', String(isOpen));
    menuButton.setAttribute('aria-label', isOpen ? 'Close navigation' : 'Open navigation');
  });
  navigation.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
    navigation.classList.remove('open');
    menuButton.setAttribute('aria-expanded', 'false');
    menuButton.setAttribute('aria-label', 'Open navigation');
  }));
}
const year = document.getElementById('year');
if (year) year.textContent = new Date().getFullYear();
// Replace this placeholder with the official inbox before publishing.
const BUSINESS_EMAIL = 'hello@yourdomain.com';
const form = document.getElementById('contactForm');
if (form) {
  form.addEventListener('submit', event => {
    event.preventDefault();
    const data = new FormData(form);
    const subject = encodeURIComponent('Project enquiry — Mushi Digital Growth Studio');
    const body = encodeURIComponent(`Name: ${data.get('name')}\nEmail: ${data.get('email')}\nCompany: ${data.get('company') || 'Not provided'}\nService: ${data.get('service') || 'Not specified'}\n\nProject details:\n${data.get('message')}`);
    const feedback = document.getElementById('formFeedback');
    if (BUSINESS_EMAIL === 'hello@yourdomain.com') {
      if (feedback) feedback.textContent = 'Please configure BUSINESS_EMAIL in script.js with your official business email before publishing.';
      return;
    }
    window.location.href = `mailto:${BUSINESS_EMAIL}?subject=${subject}&body=${body}`;
    if (feedback) feedback.textContent = 'Your email application should open with your enquiry prepared.';
  });
}
