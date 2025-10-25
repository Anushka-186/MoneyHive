window.onload = function() {

  // ===== Fade-in effect for team cards =====
  const members = document.querySelectorAll('.team-member');
  members.forEach(member => {
    member.style.opacity = '0';
    member.style.transition = 'opacity 0.6s ease, transform 0.3s ease';
    member.style.transform = 'translateY(30px)';
  });

  setTimeout(() => {
    members.forEach((member, i) => {
      setTimeout(() => {
        member.style.opacity = '1';
        member.style.transform = 'translateY(0)';
      }, i * 150);
    });
  }, 200);


  // ===== Hover effect =====
  members.forEach(member => {
    member.addEventListener('mouseenter', () => {
      member.style.transform = 'scale(1.05)';
      member.style.boxShadow = '0 6px 25px rgba(0, 0, 0, 0.3)';
    });
    member.addEventListener('mouseleave', () => {
      member.style.transform = 'scale(1)';
      member.style.boxShadow = 'none';
    });
  });


  // ====== Dark Mode Toggle ======
  const body = document.body;
  const toggleBtn = document.createElement('button');
  toggleBtn.innerHTML = '🌙';
  toggleBtn.className = 'fixed bottom-5 right-5 bg-blue-600 text-white text-2xl w-12 h-12 rounded-full shadow-md flex items-center justify-center transition-transform duration-300 hover:scale-110';
  document.body.appendChild(toggleBtn);

  if (localStorage.getItem('theme') === 'dark') {
    enableDarkMode();
    toggleBtn.innerHTML = '☀️';
  }

  toggleBtn.addEventListener('click', () => {
    if (body.classList.contains('dark')) {
      disableDarkMode();
      localStorage.setItem('theme', 'light');
      toggleBtn.innerHTML = '🌙';
    } else {
      enableDarkMode();
      localStorage.setItem('theme', 'dark');
      toggleBtn.innerHTML = '☀️';
    }
  });

  function enableDarkMode() {
    body.classList.add('dark');
    body.style.backgroundColor = '#1a202c';
    body.style.color = '#e2e8f0';
    document.querySelectorAll('.team-member').forEach(member => {
      member.style.backgroundColor = '#2d3748';
      member.style.color = '#f7fafc';
    });
    document.querySelector('header').style.background = 'linear-gradient(to right, #2b6cb0, #2c5282)';
    document.querySelector('footer').style.backgroundColor = '#2d3748';
  }

  function disableDarkMode() {
    body.classList.remove('dark');
    body.style.backgroundColor = '#f9fafb';
    body.style.color = '#1a202c';
    document.querySelectorAll('.team-member').forEach(member => {
      member.style.backgroundColor = 'white';
      member.style.color = '#1a202c';
    });
    document.querySelector('header').style.background = 'linear-gradient(to right, #60a5fa, #2563eb)';
    document.querySelector('footer').style.backgroundColor = '#1f2937';
  }


  // ====== Search Function ======
  const searchBox = document.createElement('input');
  searchBox.placeholder = '🔍 Search team member...';
  searchBox.className = 'block mx-auto mt-4 mb-8 p-2 border border-gray-400 rounded-lg w-64 text-center';
  const section = document.querySelector('.team-section');
  section.insertBefore(searchBox, section.children[1]);

  searchBox.addEventListener('input', () => {
    const query = searchBox.value.toLowerCase();
    members.forEach(member => {
      const name = member.querySelector('h3').textContent.toLowerCase();
      member.style.display = name.includes(query) ? 'block' : 'none';
    });
  });


  // ====== Scroll to Top Button ======
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
