// --- Default Client Data ---
let defaultClients = [
  {
    name: "Anushka",
    phone: "78XXXXXX32",
    address: "1276, Sector ABC, Panchkula",
    transactions: [
      { dueDate: "2025-09-30", principal: 10000, interest: 83, status: "pending" },
      { dueDate: "2025-10-15", principal: 5000, interest: 45, status: "paid" }
    ]
  },
  {
    name: "Charanpreet",
    phone: "98XXXXXX45",
    address: "H.No 245, Sector 12, Mohali",
    transactions: [
      { dueDate: "2025-10-15", principal: 5000, interest: 40, status: "paid" },
      { dueDate: "2025-11-10", principal: 3000, interest: 25, status: "pending" }
    ]
  },
  {
    name: "Bhoomi",
    phone: "77XXXXXX21",
    address: "Sector 45, Chandigarh",
    transactions: [
      { dueDate: "2025-09-20", principal: 15000, interest: 120, status: "paid" },
      { dueDate: "2025-10-30", principal: 8000, interest: 65, status: "pending" }
    ]
  },
  {
    name: "Anjali",
    phone: "88XXXXXX11",
    address: "Plot 12, Sector 5, Panchkula",
    transactions: [
      { dueDate: "2025-09-25", principal: 12000, interest: 90, status: "paid" },
      { dueDate: "2025-10-25", principal: 6000, interest: 50, status: "pending" },
      { dueDate: "2025-11-20", principal: 4000, interest: 30, status: "pending" }
    ]
  },
  {
    name: "Mehul",
    phone: "90XXXXXX56",
    address: "Flat 23, Green Valley, Zirakpur",
    transactions: [
      { dueDate: "2025-08-20", principal: 5000, interest: 45, status: "paid" },
      { dueDate: "2025-09-25", principal: 10000, interest: 100, status: "paid" },
      { dueDate: "2025-10-25", principal: 2000, interest: 18, status: "pending" }
    ]
  },
  {
    name: "Nikhil",
    phone: "81XXXXXX89",
    address: "House 34, Sector 10, Ambala",
    transactions: [
      { dueDate: "2025-09-05", principal: 8000, interest: 65, status: "paid" },
      { dueDate: "2025-10-10", principal: 5000, interest: 45, status: "pending" }
    ]
  },
  {
    name: "Rohit",
    phone: "79XXXXXX77",
    address: "House No. 58, Sector 20, Chandigarh",
    transactions: [
      { dueDate: "2025-09-12", principal: 20000, interest: 200, status: "paid" },
      { dueDate: "2025-10-25", principal: 15000, interest: 130, status: "pending" },
      { dueDate: "2025-11-30", principal: 10000, interest: 80, status: "pending" }
    ]
  },
  {
    name: "Priya",
    phone: "85XXXXXX63",
    address: "Lane 8, Model Town, Ludhiana",
    transactions: [
      { dueDate: "2025-09-10", principal: 7000, interest: 55, status: "paid" },
      { dueDate: "2025-10-22", principal: 6000, interest: 50, status: "pending" }
    ]
  },
  {
    name: "Yuvraj",
    phone: "97XXXXXX22",
    address: "House 76, Sector 8, Mohali",
    transactions: [
      { dueDate: "2025-08-25", principal: 3000, interest: 25, status: "paid" },
      { dueDate: "2025-10-05", principal: 4000, interest: 30, status: "pending" }
    ]
  }
];

// Load from localStorage if available, else use default data
// Load clients from localStorage and merge with defaults
const savedClients = JSON.parse(localStorage.getItem("clients")) || [];

// Merge saved clients with defaults (avoid duplicates by name)
let clients = [
  ...defaultClients.filter(def => !savedClients.some(s => s.name === def.name)),
  ...savedClients
];

// Save merged data back (to ensure persistence)
localStorage.setItem("clients", JSON.stringify(clients));


// --- DOM Elements ---
const clientList = document.getElementById("clientList");
const searchInput = document.getElementById("searchInput");
const clientsSection = document.getElementById("clients-section");
const detailsSection = document.getElementById("details-section");

const clientName = document.getElementById("clientName");
const clientPhone = document.getElementById("clientPhone");
const clientAddress = document.getElementById("clientAddress");
const transactionTable = document.getElementById("transactionTable");
const backBtn = document.getElementById("backBtn");

// --- Save to localStorage ---
function saveClients() {
  localStorage.setItem("clients", JSON.stringify(clients));
}

// --- Display all clients as animated cards ---
function displayClients(list) {
  clientList.innerHTML = "";
  if (list.length === 0) {
    clientList.innerHTML = `<p class="text-gray-500 text-center col-span-full">No clients found.</p>`;
    return;
  }

  list.forEach((client, index) => {
    const totalLoans = client.transactions.length;
    const pending = client.transactions.filter(t => t.status === "pending").length;
    const latestDue =
      client.transactions.length > 0
        ? new Date(client.transactions[client.transactions.length - 1].dueDate).toDateString()
        : "N/A";

    const card = document.createElement("div");
    card.className =
      "p-5 rounded-2xl bg-gradient-to-br from-white to-blue-50 shadow-md hover-animate cursor-pointer transition-transform fade-in";
    card.style.animationDelay = `${index * 0.05}s`;

    card.innerHTML = `
      <div class="flex justify-between items-center mb-2">
        <h3 class="text-xl font-bold text-blue-800">${client.name}</h3>
        <span class="text-sm text-gray-500">${client.phone}</span>
      </div>
      <p class="text-sm text-gray-600 mb-2">📍 ${client.address}</p>
      <div class="flex justify-between text-sm">
        <p><strong>${totalLoans}</strong> Transactions</p>
        <p class="${pending ? 'text-yellow-600' : 'text-green-600'}">
          ${pending} Pending
        </p>
      </div>
      <p class="text-xs text-gray-500 mt-2">🕒 Latest Due: ${latestDue}</p>
    `;

    card.addEventListener("click", () => showClientDetails(client.name));
    clientList.appendChild(card);
  });
}

// --- Show client details ---
function showClientDetails(name) {
  const client = clients.find(c => c.name === name);
  if (!client) return;

  clientsSection.classList.add("hidden");
  detailsSection.classList.remove("hidden");

  clientName.textContent = client.name;
  clientPhone.textContent = client.phone;
  clientAddress.textContent = client.address;

  transactionTable.innerHTML = "";
  client.transactions.forEach((t, index) => {
    const remaining = t.principal + t.interest;
    transactionTable.innerHTML += `
      <tr class="border-b fade-in" style="animation-delay:${index * 0.05}s">
        <td class="p-2">${new Date(t.dueDate).toDateString()}</td>
        <td class="p-2">₹${t.principal.toLocaleString()}</td>
        <td class="p-2">₹${t.interest.toLocaleString()}</td>
        <td class="p-2">₹${remaining.toLocaleString()}</td>
        <td class="p-2">
          <span class="px-3 py-1 rounded-full text-sm font-medium ${
            t.status === "paid"
              ? "bg-green-100 text-green-700"
              : "bg-yellow-100 text-yellow-700"
          }">${t.status}</span>
        </td>
      </tr>
    `;
  });
}

// --- Back Button ---
backBtn.addEventListener("click", () => {
  detailsSection.classList.add("hidden");
  clientsSection.classList.remove("hidden");
});

// --- Search ---
searchInput.addEventListener("input", e => {
  const searchText = e.target.value.toLowerCase();
  const filtered = clients.filter(c => c.name.toLowerCase().includes(searchText));
  displayClients(filtered);
});

// --- Add new client ---
function addClient(name, phone, address) {
  const exists = clients.some(c => c.name.toLowerCase() === name.toLowerCase());
  if (exists) {
    alert("Client with this name already exists!");
    return;
  }
  clients.push({ name, phone, address, transactions: [] });
  saveClients();
  displayClients(clients);
}

// --- Add transaction ---
function addTransaction(name, principal, interest, dueDate, status) {
  const client = clients.find(c => c.name === name);
  if (client) {
    client.transactions.push({ principal, interest, dueDate, status });
    saveClients();
    displayClients(clients);
  } else {
    alert("Client not found!");
  }
}

// --- Initialize ---
displayClients(clients);
