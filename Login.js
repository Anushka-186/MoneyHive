// Wait for the page to load
window.onload = function () {
  const form = document.getElementById("loginForm");
  const message = document.getElementById("message");

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    const email = document.getElementById("email").value.trim().toLowerCase();
    const password = document.getElementById("password").value.trim();

    // Clear previous messages
    message.textContent = "";
    message.className = "text-center font-semibold";

    // Store valid users
    const validUsers = {
      "user@example.com": "12345",
      "xyz@gmail.com": "xyz",
    };

    // Check for valid login
    if (validUsers[email] && validUsers[email] === password) {
      message.textContent = "✅ Login Successful! Redirecting...";
      message.classList.add("text-green-600");

      // Store user info (optional)
      localStorage.setItem("loggedInUser", email);

      // Redirect
      setTimeout(() => {
        window.location.href = "Dashboard.html";
      }, 1500);
    } else {
      message.textContent = "❌ Invalid Email or Password!";
      message.classList.add("text-red-600");
    }
  });
};
