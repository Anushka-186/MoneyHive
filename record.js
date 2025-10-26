document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector("form");

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    // Collect form values
    const client = form.querySelector('input[placeholder="Enter client name"]').value.trim();
    const amountPaid = parseFloat(form.querySelector('input[placeholder="₹ Amount"]').value);
    const date = form.querySelector('input[type="date"]').value;
    const installment = form.querySelector('input[placeholder^="e.g.,"]').value.trim();
    const paymentMode = form.querySelector('select').value;
    const refNo = form.querySelector('input[placeholder^="UPI Ref"]').value.trim();
    const remaining = parseFloat(form.querySelector('input[placeholder^="₹ Remaining"]').value);
    const details = form.querySelector('textarea').value.trim();

    if (!client || isNaN(amountPaid)) {
      alert("Please enter valid client name and payment amount.");
      return;
    }

    // Load existing transactions
    let transactions = JSON.parse(localStorage.getItem("transactions")) || [];

    // Find the transaction for this client (first match)
    let txIndex = transactions.findIndex(tx => tx.client.toLowerCase() === client.toLowerCase() && tx.status !== "Paid");

    if (txIndex !== -1) {
      // Update existing transaction
      const tx = transactions[txIndex];

      const totalRemaining = tx.principal + tx.interest;
      if (amountPaid >= totalRemaining || remaining === 0) {
        tx.status = "Paid";
      } else {
        // Update remaining amount
        tx.principal = remaining; // assuming principal holds remaining here
        tx.status = "Pending";
      }
      tx.lastPaymentDate = date;
    } else {
      // If client transaction doesn't exist, create new
      transactions.push({
        client,
        dueDate: date,
        principal: remaining || 0,
        interest: 0,   // can be expanded if needed
        status: remaining === 0 ? "Paid" : "Pending",
        paymentMode,
        refNo,
        installment,
        details
      });
    }
    localStorage.setItem("transactions", JSON.stringify(transactions));

    alert("Payment recorded successfully!");
    form.reset();
  });
});
