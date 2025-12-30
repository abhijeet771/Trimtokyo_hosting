const backendURL = "https://trimtokyo-hosting-0.onrender.com";

async function registerUser(event) {
  event.preventDefault();

  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value.trim();
  const role = document.getElementById("role").value;   // FIXED
  const errorMsg = document.getElementById("error-msg");

  errorMsg.textContent = ""; // reset

  try {
    const res = await fetch(`${backendURL}/auth/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, password, role }),
    });

    const data = await res.json();

    if (!res.ok) {
      errorMsg.textContent = data.message || "Registration failed";
      return;
    }

    alert("Registration successful! Please log in.");
    window.location.href = "login.html";

  } catch (err) {
    console.error(err);
    errorMsg.textContent = "Server error. Please try again.";
  }
}

/* ============================
   LOGIN
============================ */
async function loginUser(event) {
  event.preventDefault();

  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value.trim();

  try {
    const res = await fetch(`${backendURL}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();

    if (!res.ok) {
      alert(data.message || "Invalid credentials");
      return;
    }

    // save login state
    localStorage.setItem("token", data.token);
    localStorage.setItem("role", data.role);

    alert("Login successful!");

    // redirect based on role
    if (data.role === "admin") {
      window.location.href = "dashboard_admin.html";
    } else if (data.role === "barber") {
      window.location.href = "dashboard_barber.html";
    } else {
      window.location.href = "dashboard_user.html";
    }

  } catch (err) {
    console.error(err);
    alert("Server error during login.");
  }
}
s
