const backendURL = "https://trimtokyo-hosting-0.onrender.com";

/* ============================
   PAGE INIT (NO AUTH LOGIC)
============================ */
document.addEventListener("DOMContentLoaded", () => {
  const token = localStorage.getItem("token");
  if (!token) return; // auth is handled by navbar.js

  fetchUserBookings(token);
});

/* ============================
   FETCH USER BOOKINGS
============================ */
async function fetchUserBookings(token) {
  try {
    const res = await fetch(`${backendURL}/api/bookings/user`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await res.json();

    const tableBody = document.getElementById("bookingTable");
    if (!tableBody) return;

    tableBody.innerHTML = "";

    if (!res.ok || !Array.isArray(data) || data.length === 0) {
      tableBody.innerHTML = `
        <tr>
          <td colspan="4" class="p-3 text-center text-gray-400">
            No bookings yet
          </td>
        </tr>
      `;
      return;
    }

    data.forEach((b) => {
      const row = `
        <tr class="border-b border-white/10">
          <td class="p-3">${b.serviceType}</td>
          <td class="p-3">₹${b.amount}</td>
          <td class="p-3">${b.status}</td>
          <td class="p-3">${b.barber?.name || "Unassigned"}</td>
        </tr>
      `;
      tableBody.insertAdjacentHTML("beforeend", row);
    });
  } catch (err) {
    console.error("Error loading bookings:", err);
  }
}

/* ============================
   CREATE BOOKING
============================ */
async function createBooking(event) {
  event.preventDefault();

  const token = localStorage.getItem("token");
  if (!token) return;

  const bookingData = {
    serviceType: document.getElementById("serviceType").value.trim(),
    amount: document.getElementById("amount").value.trim(),
    paymentMethod: document.getElementById("paymentMethod").value,
    location: document.getElementById("location").value.trim(),
  };

  try {
    const res = await fetch(`${backendURL}/api/bookings/create`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(bookingData),
    });

    const data = await res.json();

    if (!res.ok) {
      alert(data.message || "Failed to create booking");
      return;
    }

    alert("Booking created successfully!");
    fetchUserBookings(token);
    document.getElementById("bookingForm")?.reset();
  } catch (err) {
    console.error("Booking error:", err);
    alert("Server error during booking");
  }
}
