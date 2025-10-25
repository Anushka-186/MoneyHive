document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("signupForm");

  form.addEventListener("submit", function (event) {
    event.preventDefault(); // Prevent form refresh

    // Get values from inputs
    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value;
    const confirmPassword = document.getElementById("confirmPassword").value;

    // Check for empty fields
    if (!name || !email || !password || !confirmPassword) {
      alert("Please fill in all fields.");
      return;
    }

    // Basic email format check
    const emailPattern = /\S+@\S+\.\S+/;
    if (!emailPattern.test(email)) {
      alert("Please enter a valid email address.");
      return;
    }

    // Password length check
    if (password.length < 6) {
      alert("Password must be at least 6 characters long.");
      return;
    }

    // Password match check
    if (password !== confirmPassword) {
      alert("Passwords do not match. Please try again.");
      return;
    }

    // Success message
    alert("Account created successfully!");

    // Redirect to login page (you can change this to Dashboard.html if you want)
    window.location.href = "Dashboard.html";
  });
});
