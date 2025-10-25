// script.js

// Start fade effect before page loads
document.documentElement.style.opacity = 0;
document.documentElement.style.transition = "opacity 1s ease-in";

window.addEventListener("load", () => {
  console.log("MoneyHive About Page Loaded ✅");

  // 🌟 Fade-in Effect for Whole Page
  setTimeout(() => {
    document.documentElement.style.opacity = 1;
  }, 200); // 0.2s delay before showing page

  // 🌙 Dark Mode Toggle
  const darkBtn = document.createElement("button");
  darkBtn.textContent = "🌙";
  darkBtn.className =
    "fixed bottom-6 right-6 bg-indigo-600 hover:bg-indigo-700 text-white p-3 rounded-full shadow-lg text-xl";
  document.body.appendChild(darkBtn);

  darkBtn.addEventListener("click", () => {
    document.body.classList.toggle("bg-gray-900");
    document.body.classList.toggle("text-gray-200");
    darkBtn.textContent = darkBtn.textContent === "🌙" ? "☀️" : "🌙";
  });

  // ⬆️ Scroll to Top Button
  const topBtn = document.createElement("button");
  topBtn.textContent = "⬆️";
  topBtn.className =
    "hidden fixed bottom-6 left-6 bg-yellow-400 hover:bg-yellow-500 text-gray-900 p-3 rounded-full shadow-lg text-xl";
  document.body.appendChild(topBtn);

  window.addEventListener("scroll", () => {
    if (window.scrollY > 200) {
      topBtn.classList.remove("hidden");
    } else {
      topBtn.classList.add("hidden");
    }
  });

  topBtn.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });

  // 📅 Auto Update Footer Year
  const footerText = document.querySelector("footer p");
  const year = new Date().getFullYear();
  footerText.innerHTML = `&copy; ${year} MoneyHive. All Rights Reserved.`;
});
