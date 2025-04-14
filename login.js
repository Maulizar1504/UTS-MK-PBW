document.getElementById("loginForm").addEventListener("submit", function(e) {
    e.preventDefault();
    const username = document.getElementById("username").value.trim();
    const password = document.getElementById("password").value;
  
    const storedPassword = localStorage.getItem(`user_${username}_password`);
  
    if (storedPassword && storedPassword !== password) {
      alert("Password salah. Silakan coba lagi.");
      return;
    }
  
    if (!storedPassword) {
      localStorage.setItem(`user_${username}_password`, password);
    }
  
    localStorage.setItem("loggedInUser", username);
    window.location.href = "dashboard.html";
  });
  