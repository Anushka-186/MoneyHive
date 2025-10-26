 document.addEventListener("DOMContentLoaded", () => {
  const tbody = document.getElementById("clientsBody");

  function loadClients() {
    tbody.innerHTML = "";
    const clients = JSON.parse(localStorage.getItem("clients")) || [];

    if (clients.length === 0) {
      tbody.innerHTML = `
        <tr>
          <td colspan="10" class="text-center py-4 text-gray-500">No clients added yet.</td>
        </tr>`;
    } else {
      clients.forEach((client, index) => {
        tbody.insertAdjacentHTML("beforeend", `
          <tr class="border-b hover:bg-gray-50">
            <td class="px-4 py-2">${client.fullName}</td>
            <td class="px-4 py-2">${client.email}</td>
            <td class="px-4 py-2">${client.phone}</td>
            <td class="px-4 py-2">${client.altPhone || "-"}</td>
            <td class="px-4 py-2">${client.address}</td>
            <td class="px-4 py-2">${client.dob || "-"}</td>
            <td class="px-4 py-2">${client.occupation || "-"}</td>
            <td class="px-4 py-2">${client.reference || "-"}</td>
            <td class="px-4 py-2">${client.frequency}</td>
            <td class="px-4 py-2 flex space-x-2">
              <button onclick="editClient(${index})" class="bg-yellow-400 text-white px-2 py-1 rounded hover:bg-yellow-500">Edit</button>
              <button onclick="deleteClient(${index})" class="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600">Delete</button>
            </td>
          </tr>
        `);
      });
    }

    // Update dashboard client count if function exists
    if (window.updateClients) window.updateClients();
  }

  window.deleteClient = function(index) {
    if (confirm("Are you sure you want to delete this client?")) {
      const clients = JSON.parse(localStorage.getItem("clients")) || [];
      clients.splice(index, 1);
      localStorage.setItem("clients", JSON.stringify(clients));
      loadClients();
      alert("Client deleted successfully!");
    }
  }

  window.editClient = function(index) {
    const clients = JSON.parse(localStorage.getItem("clients")) || [];
    const client = clients[index];

    // Simple prompt-based edit (replace later with modal form if needed)
    const newName = prompt("Edit full name:", client.fullName);
    if (newName) client.fullName = newName;

    const newEmail = prompt("Edit email:", client.email);
    if (newEmail) client.email = newEmail;

    const newPhone = prompt("Edit phone:", client.phone);
    if (newPhone) client.phone = newPhone;

    clients[index] = client;
    localStorage.setItem("clients", JSON.stringify(clients));
    loadClients();
    alert("Client updated successfully!");
  }

  loadClients();
});
ents();
});
