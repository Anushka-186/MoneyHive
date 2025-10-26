document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector("form");

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    // Collect form values
    const fullName = form.querySelector('input[placeholder="Enter client\'s name"]').value.trim();
    const email = form.querySelector('input[type="email"]').value.trim();
    const phone = form.querySelector('input[placeholder="+91 98765 43210"]').value.trim();
    const altPhone = form.querySelector('input[placeholder="Optional"]').value.trim();
    const address = form.querySelector('input[placeholder="Client\'s address"]').value.trim();
    const dob = form.querySelector('input[type="date"]').value;
    const occupation = form.querySelector('input[placeholder^="e.g."]').value.trim();
    const reference = form.querySelector('input[placeholder^="Relative"]').value.trim();
    const frequency = form.querySelector('select').value;
    const collateral = form.querySelector('textarea[placeholder^="Enter details of collateral"]').value.trim();
    const notes = form.querySelector('textarea[placeholder^="Any other details"]').value.trim();

    if (!fullName || !phone) {
      alert("Please enter at least client's name and phone number.");
      return;
    }

    // Load existing clients from localStorage
    let clients = JSON.parse(localStorage.getItem("clients")) || [];

    // Add new client
    clients.push({
      fullName,
      email,
      phone,
      altPhone,
      address,
      dob,
      occupation,
      reference,
      frequency,
      collateral,
      notes
    });

    // Save back to localStorage
    localStorage.setItem("clients", JSON.stringify(clients));

    // Update number of clients in dashboard (if dashboard is open)
    if (window.opener && !window.opener.closed) {
      const clientCountElem = window.opener.document.querySelector("section div:nth-child(2) p.text-2xl");
      if (clientCountElem) {
        clientCountElem.textContent = clients.length;
      }
    }

    alert("Client added successfully!");
    form.reset();
  });
});
