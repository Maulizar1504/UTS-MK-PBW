document.addEventListener("DOMContentLoaded", () => {
  const username = localStorage.getItem("loggedInUser");
  const usernameInput = document.getElementById("usernameDisplay");
  const profilePhoto = document.getElementById("profilePhoto");

  if (username) {
    usernameInput.value = username;

    const storedPhoto = localStorage.getItem(`user_${username}_photo`);
    if (storedPhoto) {
      profilePhoto.src = storedPhoto;
    }
  }

  // Back button
  document.getElementById("backBtn").addEventListener("click", () => {
    window.location.href = "dashboard.html";
  });

  // Update photo
  document.getElementById("uploadPhoto").addEventListener("change", function () {
    const file = this.files[0];
    const reader = new FileReader();
    reader.onload = function (e) {
      const imageUrl = e.target.result;
      profilePhoto.src = imageUrl;
      localStorage.setItem(`user_${username}_photo`, imageUrl);
    };
    if (file) reader.readAsDataURL(file);
  });

  // Update username
  usernameInput.addEventListener("change", () => {
    const newUsername = usernameInput.value.trim();
    if (!newUsername) return;

    const password = localStorage.getItem(`user_${username}_password`);
    const photo = localStorage.getItem(`user_${username}_photo`);

    localStorage.removeItem(`user_${username}_password`);
    localStorage.removeItem(`user_${username}_photo`);
    localStorage.setItem("loggedInUser", newUsername);
    localStorage.setItem(`user_${newUsername}_password`, password);
    if (photo) localStorage.setItem(`user_${newUsername}_photo`, photo);

    alert("Username berhasil diperbarui.");
  });

  // Reset password
  document.getElementById("resetPasswordBtn").addEventListener("click", () => {
    const currentPassword = prompt("Masukkan password lama:");
    const storedPassword = localStorage.getItem(`user_${username}_password`);

    if (currentPassword === storedPassword) {
      const newPassword = prompt("Masukkan password baru:");
      if (newPassword) {
        localStorage.setItem(`user_${username}_password`, newPassword);
        alert("Password berhasil direset.");
      }
    } else {
      alert("Password lama salah.");
    }
  });

  // Delete account
  document.getElementById("deleteAccountBtn").addEventListener("click", () => {
    if (confirm("Yakin ingin menghapus akun ini?")) {
      localStorage.removeItem("loggedInUser");
      localStorage.removeItem(`user_${username}_password`);
      localStorage.removeItem(`user_${username}_photo`);
      alert("Akun dihapus.");
      window.location.href = "login.html";
    }
  });

  // Logout
  document.getElementById("logoutBtn").addEventListener("click", () => {
    localStorage.removeItem("loggedInUser");
    alert("Berhasil logout.");
    window.location.href = "login.html";
  });
});
