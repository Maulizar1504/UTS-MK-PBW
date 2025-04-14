function goBack() {
    window.location.href = 'planner.html'; 
  }
  
  function getScheduleFromStorage() {
    const stored = localStorage.getItem("schedules");
    return stored ? JSON.parse(stored) : [];
  }
  
  function saveScheduleToStorage(schedule) {
    const schedules = getScheduleFromStorage();
    schedules.push(schedule);
    localStorage.setItem("schedules", JSON.stringify(schedules));
  }
  
  function addSchedule() {
    const day = document.getElementById("day").value;
    const start = document.getElementById("startTime").value;
    const end = document.getElementById("endTime").value;
    const course = document.getElementById("course").value;
  
    if (!day || !start || !end || !course) {
      alert("Semua kolom wajib diisi.");
      return;
    }
  
    const schedule = {
      day,
      start,
      end,
      course
    };
  
    saveScheduleToStorage(schedule);
    displaySchedules();
    clearForm();
  }
  
  function displaySchedules() {
    const scheduleList = document.getElementById("scheduleList");
    scheduleList.innerHTML = "";
    const schedules = getScheduleFromStorage();
  
    schedules.forEach((s, i) => {
      const item = document.createElement("div");
      item.className = "schedule-item";
      item.innerText = `${s.day}, ${s.start} - ${s.end} | ${s.course}`;
      scheduleList.appendChild(item);
    });
  }
  
  function clearForm() {
    document.getElementById("day").value = "";
    document.getElementById("startTime").value = "";
    document.getElementById("endTime").value = "";
    document.getElementById("course").value = "";
  }
  
  window.onload = () => {
    displaySchedules();
  };
  