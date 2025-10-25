window.onload = function() {

  // ===== Fade-in animation for review cards =====
  const cards = document.querySelectorAll('.grid > div');
  cards.forEach((card, i) => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(20px)';
    card.style.transition = 'opacity 0.6s ease, transform 0.5s ease';
    setTimeout(() => {
      card.style.opacity = '1';
      card.style.transform = 'translateY(0)';
    }, i * 200);
  });

  // ===== Review Form Handling =====
  const form = document.querySelector('form');
  const nameInput = form.querySelector('input');
  const ratingInput = form.querySelector('select');
  const reviewInput = form.querySelector('textarea');
  const reviewsContainer = document.querySelector('.grid');

  // Load saved reviews from localStorage
  const savedReviews = JSON.parse(localStorage.getItem('reviews')) || [];
  savedReviews.forEach(r => addReviewCard(r.name, r.rating, r.text));

  form.addEventListener('submit', function(e) {
    e.preventDefault();

    const name = nameInput.value.trim();
    const rating = ratingInput.value.trim(); // numeric value now
    const text = reviewInput.value.trim();

    if (!name || !text) {
      alert('Please fill out your name and review.');
      return;
    }

    addReviewCard(name, rating, text);
    saveReview(name, rating, text);

    // Reset form
    nameInput.value = '';
    ratingInput.selectedIndex = 0;
    reviewInput.value = '';

    alert('✅ Review added successfully!');
  });

  // ===== Add review card dynamically =====
  function addReviewCard(name, rating, text) {
    const card = document.createElement('div');
    card.className = 'bg-white p-6 rounded-2xl shadow-md hover:shadow-xl transition';

    // Convert numeric rating to stars
    let stars = '';
    for (let i = 0; i < rating; i++) {
      stars += '★';
    }

    card.innerHTML = `
      <h3 class="font-semibold text-gray-800 text-lg mb-1">${name}</h3>
      <p class="text-yellow-500 text-sm mb-3">${stars}</p>
      <p class="text-gray-600 italic">"${text}"</p>
    `;
    reviewsContainer.prepend(card);
  }

  // ===== Save review to localStorage =====
  function saveReview(name, rating, text) {
    const reviews = JSON.parse(localStorage.getItem('reviews')) || [];
    reviews.push({ name, rating, text });
    localStorage.setItem('reviews', JSON.stringify(reviews));
  }

  // ===== Dark Mode Toggle =====
  const toggleBtn = document.createElement('button');
  toggleBtn.innerHTML = '🌙';
  toggleBtn.className = 'fixed bottom-5 right-5 bg-blue-600 text-white text-2xl w-12 h-12 rounded-full shadow-md flex items-center justify-center transition-transform duration-300 hover:scale-110';
  document.body.appendChild(toggleBtn);

  if (localStorage.getItem('theme') === 'dark') enableDark();

  toggleBtn.addEventListener('click', () => {
    if (document.body.classList.contains('dark')) {
      disableDark();
      localStorage.setItem('theme', 'light');
      toggleBtn.innerHTML = '🌙';
    } else {
      enableDark();
      localStorage.setItem('theme', 'dark');
      toggleBtn.innerHTML = '☀️';
    }
  });

  function enableDark() {
    document.body.classList.add('dark');
    document.body.style.background = 'linear-gradient(to bottom, #1a202c, #2d3748)';
    document.body.style.color = '#f7fafc';
    document.querySelectorAll('.bg-white').forEach(card => {
      card.style.backgroundColor = '#2d3748';
      card.style.color = '#e2e8f0';
    });
    document.querySelector('header').style.background = 'linear-gradient(to right, #2b6cb0, #2c5282)';
    document.querySelector('footer').style.backgroundColor = '#2d3748';
  }

  function disableDark() {
    document.body.classList.remove('dark');
    document.body.style.background = 'linear-gradient(to bottom, #ebf8ff, #dbeafe)';
    document.body.style.color = '#1a202c';
    document.querySelectorAll('.bg-white').forEach(card => {
      card.style.backgroundColor = 'white';
      card.style.color = '#1a202c';
    });
    document.querySelector('header').style.background = 'linear-gradient(to right, #2563eb, #1e40af)';
    document.querySelector('footer').style.backgroundColor = '#111827';
  }

  // ===== Scroll to Top Button =====
  const scrollBtn = document.createElement('button');
  scrollBtn.textContent = '⬆️';
  scrollBtn.className = 'hidden fixed bottom-20 right-5 bg-blue-600 text-white p-3 rounded-full text-xl shadow-md';
  document.body.appendChild(scrollBtn);

  window.addEventListener('scroll', () => {
    if (window.scrollY > 200) scrollBtn.classList.remove('hidden');
    else scrollBtn.classList.add('hidden');
  });

  scrollBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

};
