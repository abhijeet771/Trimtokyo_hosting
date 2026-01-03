// Frontend/js/service-details.js

const API_BASE = "https://trimtokyo-hosting-0.onrender.com/api";

// ----------- UTILITIES -----------

function getQueryParam(param) {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get(param);
}

function getAuthToken() {
  return localStorage.getItem("token");
}

// ----------- MAIN LOGIC -----------

const storeId = getQueryParam("storeId");

if (!storeId) {
  alert("Invalid store. Redirecting...");
  window.location.href = "service.html";
}

// DOM elements
const storeNameEl = document.getElementById("storeName");
const storeLocationEl = document.getElementById("storeLocation");
const storeImageEl = document.getElementById("storeImage");
const servicesContainer = document.getElementById("servicesContainer");

// ----------- FETCH STORE DETAILS -----------

async function fetchStoreDetails() {
  try {
    const res = await fetch(`${API_BASE}/stores/${storeId}`);
    const data = await res.json();

    if (!res.ok) throw new Error(data.message || "Failed to load store");

    storeNameEl.textContent = data.name;
    storeLocationEl.textContent = data.location || "Professional Barber Store";
    storeImageEl.src = data.image || "Barber.png";

  } catch (err) {
    console.error(err);
    alert("Unable to load store details");
  }
}

// ----------- FETCH STORE SERVICES -----------

async function fetchStoreServices() {
  try {
    const res = await fetch(`${API_BASE}/stores/${storeId}/services`);
    const services = await res.json();

    if (!res.ok) throw new Error("Failed to load services");

    servicesContainer.innerHTML = "";

    services.forEach(service => {
      const serviceCard = document.createElement("div");
      serviceCard.className =
        "bg-white rounded-xl shadow-md p-5 flex justify-between items-center";

      serviceCard.innerHTML = `
        <div>
          <h4 class="text-lg font-semibold text-gray-800">
            ${service.name}
          </h4>
          <p class="text-gray-500 text-sm">
            Duration: ${service.duration || "30 mins"}
          </p>
        </div>

        <div class="flex items-center gap-4">
          <span class="text-xl font-bold text-gray-800">
            ₹${service.price}
          </span>
          <button
            class="bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-800 transition"
            onclick="addToCart('${service._id}', '${service.name}', ${service.price})"
          >
            Add
          </button>
        </div>
      `;

      servicesContainer.appendChild(serviceCard);
    });

  } catch (err) {
    console.error(err);
    servicesContainer.innerHTML =
      "<p class='text-red-500'>Failed to load services</p>";
  }
}

// ----------- ADD TO CART -----------

async function addToCart(serviceId, serviceName, price) {
  const token = getAuthToken();

  if (!token) {
    alert("Please login to add services to cart");
    window.location.href = "login.html";
    return;
  }

  try {
    const res = await fetch(`${API_BASE}/cart/add`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({
        storeId,
        serviceId,
        serviceName,
        price,
        quantity: 1
      })
    });

    const data = await res.json();

    if (!res.ok) throw new Error(data.message || "Cart failed");

    alert(`${serviceName} added to cart`);

  } catch (err) {
    console.error(err);
    alert("Unable to add service to cart");
  }
}

// ----------- INIT -----------

fetchStoreDetails();
fetchStoreServices();
