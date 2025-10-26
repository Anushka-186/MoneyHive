document.addEventListener("DOMContentLoaded", () => {
  const datePicker = document.getElementById("datePicker");
  const dateText = document.getElementById("dateText");
  const tbody = document.getElementById("transactionBody");
  const today = new Date().toISOString().split("T")[0];
  datePicker.value = today;

  //  Utility Functions 
  const parseCurrency = str => Number(str.replace(/[^0-9.-]+/g,"")); // converts "₹12,500" → 12500

  const formatCurrency = num => `₹${num.toLocaleString("en-IN")}`;

  const updateDateText = () => {
    const selected = new Date(datePicker.value);
    const now = new Date(today);
    dateText.textContent =
      selected.toDateString() === now.toDateString()
        ? "Today"
        : selected.toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" });
  };

  datePicker.addEventListener("change", updateDateText);
  updateDateText();

  //  Load Transactions 
  let transactions = JSON.parse(localStorage.getItem("transactions")) || [];

  const updateStatuses = () => {
    const now = new Date();
    transactions.forEach(tx => {
      if (tx.status !== "Paid") {
        const due = new Date(tx.dueDate);
        tx.status = due < now ? "Overdue" : "Pending";
      }
    });
  };

  const renderTransactions = () => {
    tbody.innerHTML = "";
    transactions.forEach(tx => {
      tbody.insertAdjacentHTML(
        "beforeend",
        `<tr>
          <td class="px-4 py-2 border">${tx.client}</td>
          <td class="px-4 py-2 border">${tx.dueDate}</td>
          <td class="px-4 py-2 border">${formatCurrency(tx.principal + tx.interest)}</td>
          <td class="px-4 py-2 border font-semibold ${tx.status === "Paid" ? "text-green-600" : tx.status === "Overdue" ? "text-red-600" : "text-yellow-600"}">
            ${tx.status}
          </td>
        </tr>`
      );
    });
  };

  const highlightRows = () => {
    const now = new Date();
    document.querySelectorAll("tbody tr").forEach(row => {
      const [ , dueCell, , statusCell] = row.children;
      const dueDate = new Date(dueCell.textContent.trim());
      const status = statusCell.textContent.trim();

      row.className = ""; // reset classes

      if (status === "Paid") row.classList.add("bg-green-50");
      else if (status === "Overdue") row.classList.add("bg-red-100", "animate-pulse");
      else row.classList.add("bg-yellow-50");
    });
  };

  const updateDashboardStats = () => {
    const totalOutstanding = transactions
      .filter(tx => tx.status !== "Paid")
      .reduce((sum, tx) => sum + (tx.principal + tx.interest), 0);

    const totalRepaid = transactions
      .filter(tx => tx.status === "Paid")
      .reduce((sum, tx) => sum + (tx.principal + tx.interest), 0);

    const pendingLoans = transactions.filter(tx => tx.status !== "Paid").length;

    const dueToday = transactions.filter(tx => tx.dueDate === today && tx.status !== "Paid").length;
    const missed = transactions.filter(tx => {
      const due = new Date(tx.dueDate);
      return due < new Date(today) && tx.status !== "Paid";
    }).length;

    // Update cards
    document.querySelectorAll(".grid div")[0].querySelector("p:nth-child(2)").textContent = formatCurrency(totalOutstanding);
    document.querySelectorAll(".grid div")[2].querySelector("p:nth-child(2)").textContent = formatCurrency(totalRepaid);
    document.querySelectorAll(".grid div")[3].querySelector("p:nth-child(2)").textContent = pendingLoans;

    // Update due/missed section
    document.querySelector("#dateText").textContent = "Today";
    document.querySelector(".bg-white p.text-sm.text-gray-500.mt-2").textContent = 
      `${dueToday} payments are due today and ${missed} missed in last 3 days.`;
  };

  const refreshDashboard = () => {
    updateStatuses();
    renderTransactions();
    highlightRows();
    updateDashboardStats();
    localStorage.setItem("transactions", JSON.stringify(transactions));
  };

  refreshDashboard();

  // Filter 
  document.querySelector('input[placeholder="Filter by client..."]').addEventListener("keyup", e => {
    const val = e.target.value.toLowerCase();
    document.querySelectorAll("tbody tr").forEach(row => {
      row.style.display = row.children[0].textContent.toLowerCase().includes(val) ? "" : "none";
    });
  });

  //  Clear Transactions 
  document.getElementById("clearTransactions").addEventListener("click", () => {
    if (confirm("Are you sure you want to delete all transactions?")) {
      transactions = [];
      refreshDashboard();
      alert("All transactions cleared successfully!");
    }
  });

  //  Export CSV 
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
  setInterval(refreshDashboard, 60 * 1000);
});
