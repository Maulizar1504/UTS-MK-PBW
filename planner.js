document.addEventListener("DOMContentLoaded", () => {
  const username = localStorage.getItem("loggedInUser") || "Pengguna";
  const scheduleKey = `schedules_${username}`;
  const calendarBody = document.getElementById("calendarBody");
  const monthYear = document.getElementById("monthYear");
  const scheduleList = document.getElementById("todaySchedule");

  let currentDate = new Date();

  renderCalendar();

  document.getElementById("prevMonth").addEventListener("click", () => {
    currentDate.setMonth(currentDate.getMonth() - 1);
    renderCalendar();
  });

  document.getElementById("nextMonth").addEventListener("click", () => {
    currentDate.setMonth(currentDate.getMonth() + 1);
    renderCalendar();
  });

  function renderCalendar() {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const todayStr = new Date().toISOString().split("T")[0];

    monthYear.textContent = currentDate.toLocaleDateString("id-ID", {
      month: "long",
      year: "numeric"
    });

    const firstDay = new Date(year, month, 1).getDay();
    const lastDate = new Date(year, month + 1, 0).getDate();

    calendarBody.innerHTML = "";
    let row = document.createElement("tr");

    for (let i = 0; i < firstDay; i++) {
      row.appendChild(document.createElement("td"));
    }

    for (let date = 1; date <= lastDate; date++) {
      const td = document.createElement("td");
      const fullDateStr = `${year}-${String(month + 1).padStart(2, "0")}-${String(date).padStart(2, "0")}`;
      td.textContent = date;

      if (fullDateStr === todayStr) {
        td.classList.add("today");
      }

      td.addEventListener("click", () => {
        updateScheduleDisplay(fullDateStr);
        document.querySelectorAll("td").forEach(el => el.classList.remove("selected"));
        td.classList.add("selected");
      });

      row.appendChild(td);

      if ((firstDay + date) % 7 === 0 || date === lastDate) {
        calendarBody.appendChild(row);
        row = document.createElement("tr");
      }
    }

    // Tampilkan jadwal hari ini secara default
    updateScheduleDisplay(todayStr);
  }
});

function navigateTo(page) {
  window.location.href = page;
}
