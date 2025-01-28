// File: js/purchase.js

document.addEventListener('DOMContentLoaded', () => {
  const faqQuestions = document.querySelectorAll('.purchase-faq-question');

  faqQuestions.forEach(question => {
    question.addEventListener('click', () => {
      const faqItem = question.parentElement;
      faqItem.classList.toggle('active');

      // Close other open FAQs
      faqQuestions.forEach(q => {
        if (q !== question) {
          q.parentElement.classList.remove('active');
        }
      });
    });
  });
  // Handle predefined buy buttons
  const buyButtons = document.querySelectorAll('.purchase-buy-button');

  buyButtons.forEach(button => {
    button.addEventListener('click', () => {
      // Example: Redirect to payment gateway or open a modal
      alert('Purchase functionality to be implemented.');
      // window.location.href = 'payment.html'; // Example redirect
    });
  });

  // Handle custom credit slider
  // Get references to the DOM elements
  const creditSlider = document.getElementById('creditSlider');
  const selectedCredits = document.getElementById('selectedCredits');
  const totalPrice = document.getElementById('totalPrice');

  // Function to abbreviate numbers (e.g., 1200 -> 1.2K)
  function abbreviateNumber(value) {
    if (value >= 1000) {
      return (value / 1000).toFixed(1) + 'K';
    }
    return value.toString();
  }

  // Function to format numbers with commas (e.g., 1200 -> 1,200)
  function formatWithCommas(value) {
    return Number(value).toLocaleString();
  }

  // Add an event listener to the slider
  creditSlider.addEventListener('input', function() {
    const creditValue = parseInt(this.value, 10);

    // Determine whether to use "Credit" or "Credits"
    const creditText = creditValue === 1 ? 'Credit' : 'Credits';

    // Abbreviate the credit value if necessary
    const displayCredits = abbreviateNumber(creditValue);

    // Update the selected credits text
    selectedCredits.textContent = `${displayCredits} ${creditText}`;

    // Calculate the total price
    const price = (creditValue * 0.10);

    // Format the price with commas and two decimal places
    const formattedPrice = `$${formatWithCommas(price.toFixed(2))}`;

    // Update the total price text
    totalPrice.textContent = formattedPrice;
  });


  function updatePrice() {
    const credits = parseInt(creditSlider.value, 10);
    selectedCredits.textContent = credits;
    totalPrice.textContent = `$${(credits * pricePerCredit).toFixed(2)}`;
  }

  // Initialize price display
  updatePrice();

  // Update price on slider change
  creditSlider.addEventListener('input', updatePrice);


});
