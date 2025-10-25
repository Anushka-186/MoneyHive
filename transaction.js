document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("loanForm");

  form.addEventListener("submit", function (event) {
    event.preventDefault(); // Prevent default form submission

    const client = document.getElementById("client").value;
    const principal = parseFloat(document.getElementById("principal").value);
    const interestValue = parseFloat(document.getElementById("interestValue").value);
    const dueDate = document.getElementById("dueDate").value;
    const interestType = document.querySelector('input[name="interest"]:checked').value;

    // Basic validation
    if (!client) {
      alert("Please select a client.");
      return;
    }

    if (!principal || principal <= 0) {
      alert("Please enter a valid principal amount.");
      return;
    }

    if (!interestValue || interestValue <= 0) {
      alert("Please enter a valid interest value.");
      return;
    }

    if (!dueDate) {
      alert("Please select a due date.");
      return;
    }

    // Calculate total loan if interest is a percentage
    let totalAmount = principal;
    if (interestType === "rate") {
      totalAmount += (principal * interestValue) / 100;
    } else {
      totalAmount += interestValue;
    }

    // Display summary message
    alert(
      `✅ Loan Transaction Saved!\n\n` +
      `Client: ${client}\n` +
      `Principal: ₹${principal.toFixed(2)}\n` +
      `Interest Type: ${interestType === "rate" ? "Rate (%)" : "Amount"}\n` +
      `Interest: ${interestValue}\n` +
      `Total Payable: ₹${totalAmount.toFixed(2)}\n` +
      `Due Date: ${dueDate}`
    );

    // Optionally redirect to another page after submission
    window.location.href = "Dashboard.html";
  });
});
