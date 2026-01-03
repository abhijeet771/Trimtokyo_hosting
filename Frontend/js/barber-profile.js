const token = localStorage.getItem("token");
const services = [];

if (!token) {
  alert("Please login first");
  window.location.href = "login.html";
}

function addService() {
  const name = document.getElementById("serviceName").value.trim();
  const price = document.getElementById("servicePrice").value.trim();

  if (!name || !price) {
    alert("Service name and price are required");
    return;
  }

  services.push({ name, price: Number(price) });
  renderServices();

  document.getElementById("serviceName").value = "";
  document.getElementById("servicePrice").value = "";
}

function removeService(index) {
  services.splice(index, 1);
  renderServices();
}

function renderServices() {
  const container = document.getElementById("servicesList");
  container.innerHTML = "";

  services.forEach((s, i) => {
    const div = document.createElement("div");
    div.className = "service-chip";
    div.innerHTML = `
      ${s.name} – ₹${s.price}
      <span class="remove" onclick="removeService(${i})">×</span>
    `;
    container.appendChild(div);
  });
}

document.getElementById("profileForm").addEventListener("submit", async e => {
  e.preventDefault();

  const shopName = document.getElementById("shopName").value.trim();
  const location = document.getElementById("location").value.trim();
  const phone = document.getElementById("phone").value.trim();

  // 🔒 VALIDATION (THIS FIXES 400)
  if (!shopName || !location || !phone) {
    alert("All fields are required");
    return;
  }

  if (services.length === 0) {
    alert("Please add at least one service");
    return;
  }

  const body = {
    shopName,
    location,
    phone,
    services
  };

  try {
    const res = await fetch("https://trimtokyo-hosting-0.onrender.com/api/barber/profile", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify(body)
    });

    const data = await res.json();

    if (!res.ok) {
      alert(data.message || "Profile submission failed");
      return;
    }

    alert("Profile submitted successfully! Await admin approval.");

  } catch (err) {
    console.error(err);
    alert("Server error while submitting profile");
  }
});
