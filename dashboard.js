document.addEventListener("DOMContentLoaded", () => {

  //  Set today's date in the date picker
  const datePicker = document.getElementById("datePicker");
  const dateText = document.getElementById("dateText");
  const today = new Date().toISOString().split("T")[0]; 
  datePicker.value = today;

  //  Update date label when user changes date
  datePicker.addEventListener("change", () => {
    const selected = new Date(datePicker.value);
    const now = new Date(today);
    dateText.textContent =
      selected.toDateString() === now.toDateString()
        ? "Today"
        : selected.toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" });
  });

  //  Filter table rows by client name
  document.querySelector('input[placeholder="Filter by client..."]').addEventListener("keyup", e => {
    const val = e.target.value.toLowerCase();
    document.querySelectorAll("tbody tr").forEach(row => {
      row.style.display = row.children[0].textContent.toLowerCase().includes(val) ? "" : "none";
    });
  });

  //  Export table data to CSV file
  document.getElementById("exportCSV").addEventListener("click", () => {
    const csv = Array.from(document.querySelectorAll("table tr"))
      .map(r => Array.from(r.cells).map(c => `"${c.innerText}"`).join(","))
      .join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const a = Object.assign(document.createElement("a"), {
      href: URL.createObjectURL(blob),
      download: "transactions.csv"
    });
    a.click();
    URL.revokeObjectURL(a.href);
  });

  //  Highlight rows based on payment status and due date
  const highlightRows = () => {
    const now = new Date();
    document.querySelectorAll("tbody tr").forEach(row => {
      const [ , dueCell, , statusCell] = row.children;
      const dueDate = new Date(dueCell.textContent.trim());
      const status = statusCell.textContent.trim().toLowerCase();
      row.className = ""; // clear old styles

      if (status === "paid") row.classList.add("bg-green-50");         // Paid → green
      else if (dueDate < now) row.classList.add("bg-red-100", "animate-pulse"); // Overdue → red
      else row.classList.add("bg-yellow-50");                          // Pending → yellow
    });
  };

  //  Load stored transactions from localStorage
  const stored = JSON.parse(localStorage.getItem("transactions")) || [];
  const tbody = document.getElementById("transactionBody");

  stored.forEach(tx => {
    tbody.insertAdjacentHTML(
      "beforeend",
      `<tr>
        <td class="px-4 py-2 border">${tx.client}</td>
        <td class="px-4 py-2 border">${tx.dueDate}</td>
        <td class="px-4 py-2 border">₹${tx.principal + tx.interest}</td>
        <td class="px-4 py-2 border font-semibold text-yellow-600">${tx.status}</td>
      </tr>`
    );
  });

  //  Apply initial row highlights
  highlightRows();
});
