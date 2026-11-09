const sessions = [
  {
    title: "Back squat",
    date: "NOV 08, 2026",
    sets: [
      { peak: 0.82, average: 0.61, reps: 5 },
      { peak: 0.79, average: 0.58, reps: 5 },
      { peak: 0.73, average: 0.54, reps: 5 }
    ]
  },
  {
    title: "Bench press",
    date: "NOV 05, 2026",
    sets: [
      { peak: 0.68, average: 0.49, reps: 6 },
      { peak: 0.65, average: 0.46, reps: 6 },
      { peak: 0.61, average: 0.43, reps: 5 }
    ]
  },
  {
    title: "Deadlift",
    date: "NOV 02, 2026",
    sets: [
      { peak: 0.76, average: 0.56, reps: 4 },
      { peak: 0.72, average: 0.53, reps: 4 },
      { peak: 0.69, average: 0.50, reps: 4 }
    ]
  }
];

const loginScreen = document.querySelector("#loginScreen");
const dashboard = document.querySelector("#dashboard");
const loginForm = document.querySelector("#loginForm");
const loginError = document.querySelector("#loginError");
const sessionList = document.querySelector("#sessionList");

function renderSessions() {
  sessionList.innerHTML = sessions.map((session) => `
    <article class="session">
      <header class="session-header">
        <div class="session-title">
          <span class="session-icon"><svg viewBox="0 0 20 20" fill="none" aria-hidden="true"><path d="M3 7v6M6 5v10M14 5v10M17 7v6M6 10h8" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"/></svg></span>
          <div><h3>${session.title}</h3><p>${session.sets.length} sets recorded</p></div>
        </div>
        <time class="session-date">${session.date}</time>
      </header>
      <table class="set-table">
        <thead><tr><th scope="col">Set</th><th scope="col">Peak velocity</th><th scope="col">Average velocity</th><th scope="col">Reps</th></tr></thead>
        <tbody>${session.sets.map((set, index) => `
          <tr>
            <td><span class="set-number">${String(index + 1).padStart(2, "0")}</span></td>
            <td><span class="velocity"><span class="velocity-dot good"></span>${set.peak.toFixed(2)}<span class="unit">m/s</span></span></td>
            <td><span class="velocity"><span class="velocity-dot"></span>${set.average.toFixed(2)}<span class="unit">m/s</span></span></td>
            <td>${set.reps}</td>
          </tr>`).join("")}
        </tbody>
      </table>
    </article>`).join("");
  document.querySelector("#sessionCount").textContent = `${sessions.length} SESSIONS`;
}

function showDashboard(email) {
  loginScreen.classList.add("hidden");
  dashboard.classList.remove("hidden");
  document.querySelector("#accountEmail").textContent = email;
  renderSessions();
}

loginForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const email = document.querySelector("#email").value.trim();
  const password = document.querySelector("#password").value;
  if (!email || !document.querySelector("#email").validity.valid || !password) {
    loginError.textContent = "Enter a valid email address and password to continue.";
    return;
  }
  localStorage.setItem("repLedgerUser", email);
  loginError.textContent = "";
  showDashboard(email);
});

document.querySelector("#logoutButton").addEventListener("click", () => {
  localStorage.removeItem("repLedgerUser");
  dashboard.classList.add("hidden");
  loginScreen.classList.remove("hidden");
  loginForm.reset();
});

const savedUser = localStorage.getItem("repLedgerUser");
if (savedUser) showDashboard(savedUser);