// Toggle FAQ Answers
document.querySelectorAll('.faq-question').forEach(button => {
  button.addEventListener('click', () => {
    const answer = button.nextElementSibling;
    button.classList.toggle('active');
    answer.style.display = answer.style.display === 'block' ? 'none' : 'block';
  });
});

// Search Functionality (Basic)
document.getElementById('helpSearchBtn').addEventListener('click', () => {
  alert('Search feature is coming soon!');
});
