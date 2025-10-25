document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("loanForm");

  form.addEventListener("submit", function (event) {
    event.preventDefault();

    // Get form values
    const client = document.getElementById("client").value;
    const principal = parseFloat(document.getElementById("principal").value);
    const interestType = document.querySelector('input[name="interest"]:checked').value;
    const interestValue = parseFloat(document.getElementById("interestValue").value);
    const dueDate = document.getElementById("dueDate").value;

    // Basic validation
    if (!client || !principal || !interestValue || !dueDate) {
      alert("⚠️ Please fill in all fields.");
      return;
    }

    // Calculate total payable
    let totalPayable = principal;
    if (interestType === "rate") {
      totalPayable += (principal * interestValue) / 100;
    } else {
      totalPayable += interestValue;
    }

    // Create transaction object
    const transaction = {
      client,
      principal,
      interestType,
      interestValue,
      totalPayable,
      dueDate,
      dateCreated: new Date().toLocaleDateString()
    };

    // Retrieve existing transactions or create new array
    const existingTransactions = JSON.parse(localStorage.getItem("transactions")) || [];

    // Add new transaction
    existingTransactions.push(transaction);

    // Save to localStorage
    localStorage.setItem("transactions", JSON.stringify(existingTransactions));

    // Show confirmation
    alert(
      `✅ Loan Transaction Saved!\n\n` +
      `Client: ${client}\n` +
      `Principal: ₹${principal.toFixed(2)}\n` +
      `Interest Type: ${interestType === "rate" ? "Rate (%)" : "Amount"}\n` +
      `Interest: ${interestValue}\n` +
      `Total Payable: ₹${totalPayable.toFixed(2)}\n` +
      `Due Date: ${dueDate}`
    );

    // Redirect to transactions list
    window.location.href = "transactionsList.html";
  });
});
