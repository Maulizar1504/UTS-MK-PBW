document.addEventListener("DOMContentLoaded", () => {
  const username = localStorage.getItem("loggedInUser") || "Pengguna";
  const taskKey = `tasks_${username}`;
  const today = new Date().toISOString().split("T")[0];

  document.getElementById("greeting").textContent = `Selamat datang, ${username}`;

  const tasks = JSON.parse(localStorage.getItem(taskKey)) || [];

  // Menghitung tugas berdasarkan kondisi
  let tugasMendatang = 0;
  let tugasSesuai = 0;
  let tugasSelesai = 0;

  tasks.forEach(task => {
    const taskDate = task.deadline;
    const taskCompleted = task.completed === true;

    if (!taskCompleted) {
      if (taskDate > today) {
        tugasMendatang++;
      } else if (taskDate === today) {
        tugasSesuai++;
      }
    }

    if (taskCompleted) {
      tugasSelesai++;
    }
  });

  document.getElementById("upcomingCount").textContent = tugasMendatang;
  document.getElementById("todayDoneCount").textContent = tugasSesuai;
  document.getElementById("historyCount").textContent = tugasSelesai;
});

function navigateTo(page) {
  window.location.href = page;
}
