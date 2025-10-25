// Wait until the page is fully loaded
document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("createAccountForm");

  form.addEventListener("submit", function (event) {
    event.preventDefault(); // Prevent page reload

    // Get input values
    const name = document.getElementById("name").value.trim();
    const mobile = document.getElementById("mobile").value.trim();
    const email = document.getElementById("email").value.trim();
    const address = document.getElementById("address").value.trim();

    // Simple validation
    if (!name || !mobile || !email || !address) {
      alert("Please fill in all fields.");
      return;
    }

    // Basic mobile validation
    if (!/^\d{10}$/.test(mobile)) {
      alert("Please enter a valid 10-digit mobile number.");
      return;
    }

    // Basic email validation
    if (!/\S+@\S+\.\S+/.test(email)) {
      alert("Please enter a valid email address.");
      return;
    }

    // If everything is valid, simulate account creation
    alert("Account created successfully!");
    
    // Redirect to Dashboard page
    window.location.href = "Dashboard.html";
  });
});
