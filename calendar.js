const PROFILES_KEY = "stridewords-profiles-v4";
const ACTIVE_PROFILE_KEY = "stridewords-active-profile-v4";
const SETTINGS_KEY = "stridewords-settings-v4";
const MIN_MONTH = new Date(2026, 3, 1);
const today = new Date();
const currentMonth = new Date(today.getFullYear(), today.getMonth(), 1);

const calendarSummary = document.querySelector("#calendarSummary");
const calendarMonthTitle = document.querySelector("#calendarMonthTitle");
const prevMonthButton = document.querySelector("#prevMonthButton");
const nextMonthButton = document.querySelector("#nextMonthButton");
const calendarProfileName = document.querySelector("#calendarProfileName");
const calendarDailyGoal = document.querySelector("#calendarDailyGoal");
const calendarAchievedCount = document.querySelector("#calendarAchievedCount");
const calendarGrid = document.querySelector("#calendarGrid");

let visibleMonth = new Date(currentMonth);

function formatDateKey(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function addMonths(date, amount) {
  return new Date(date.getFullYear(), date.getMonth() + amount, 1);
}

function isSameMonth(left, right) {
  return left.getFullYear() === right.getFullYear() && left.getMonth() === right.getMonth();
}

function loadJson(key, fallback) {
  try {
    const value = JSON.parse(localStorage.getItem(key));
    return value && typeof value === "object" ? value : fallback;
  } catch {
    return fallback;
  }
}

function getProfile() {
  const profiles = loadJson(PROFILES_KEY, {});
  const activeProfileId = localStorage.getItem(ACTIVE_PROFILE_KEY) || "guest";
  const profile = profiles[activeProfileId] || profiles.guest || { id: activeProfileId, stats: {} };
  profile.stats ||= {};
  profile.stats.dailyStats ||= {};
  profile.stats.dailyGoal = Math.max(1, Number(profile.stats.dailyGoal || 20));
  return profile;
}

function getDailyStats(profile, dateKey) {
  const day = profile.stats.dailyStats?.[dateKey] || {};
  const quizAttempts = Number(day.quizAttempts || 0);
  const quizCorrect = Number(day.quizCorrect || 0);
  return {
    studyCount: Number(day.studyCount || 0),
    quizAttempts,
    quizCorrect,
    accuracy: quizAttempts ? Math.round((quizCorrect / quizAttempts) * 100) : 0,
    playCount: Number(day.playCount || 0)
  };
}

function getMonthDays(monthDate) {
  const year = monthDate.getFullYear();
  const month = monthDate.getMonth();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const firstDay = new Date(year, month, 1);
  const mondayStartOffset = (firstDay.getDay() + 6) % 7;
  const days = [];

  for (let index = 0; index < mondayStartOffset; index += 1) {
    days.push(null);
  }

  for (let day = 1; day <= daysInMonth; day += 1) {
    days.push(new Date(year, month, day));
  }

  return days;
}

function applyTheme() {
  const settings = loadJson(SETTINGS_KEY, {});
  document.body.classList.toggle("dark-mode", settings.theme === "dark");
}

function renderCalendar() {
  const profile = getProfile();
  const goal = Math.max(1, Number(profile.stats.dailyGoal || 20));
  const monthDays = getMonthDays(visibleMonth);
  let achievedCount = 0;

  calendarMonthTitle.textContent = `${visibleMonth.getFullYear()}年${visibleMonth.getMonth() + 1}月`;
  calendarProfileName.textContent = profile.id || "guest";
  calendarDailyGoal.textContent = `${goal}`;
  calendarSummary.textContent = `2026年4月1日以降の学習記録を表示しています。日ごとの達成判定は「学習数が一日の目標数以上」で行います。`;

  const weekdayCells = ["月", "火", "水", "木", "金", "土", "日"]
    .map((label) => `<div class="calendar-weekday">${label}</div>`)
    .join("");

  const dayCells = monthDays.map((date) => {
    if (!date) {
      return `<div class="month-day-card blank" aria-hidden="true"></div>`;
    }

    const dateKey = formatDateKey(date);
    const stats = getDailyStats(profile, dateKey);
    const isBeforeStart = date < MIN_MONTH;
    const isFuture = date > today;
    const achieved = !isBeforeStart && !isFuture && stats.studyCount >= goal;
    const isToday = dateKey === formatDateKey(today);
    const status = isFuture ? "未来" : achieved ? "達成" : stats.studyCount > 0 ? "未達成" : "未記録";

    if (achieved) {
      achievedCount += 1;
    }

    return `
      <article class="month-day-card ${achieved ? "achieved" : ""} ${isToday ? "today" : ""} ${isFuture ? "future" : ""}">
        <div class="month-day-header">
          <span class="month-day-number">${date.getDate()}</span>
          <span class="month-day-mark">${achieved ? "◎" : ""}</span>
        </div>
        <span class="month-day-status">${status}</span>
        <p class="month-day-stats">
          <span>学習 ${stats.studyCount} / ${goal}</span>
          <span>回答 ${stats.quizAttempts}・正解 ${stats.quizCorrect}</span>
          <span>正答率 ${stats.accuracy}%・再生 ${stats.playCount}</span>
        </p>
      </article>
    `;
  }).join("");

  calendarGrid.innerHTML = weekdayCells + dayCells;
  calendarAchievedCount.textContent = `${achievedCount}日`;
  prevMonthButton.disabled = isSameMonth(visibleMonth, MIN_MONTH) || visibleMonth < MIN_MONTH;
  nextMonthButton.disabled = isSameMonth(visibleMonth, currentMonth) || visibleMonth > currentMonth;
}

prevMonthButton.addEventListener("click", () => {
  const nextMonth = addMonths(visibleMonth, -1);
  if (nextMonth >= MIN_MONTH) {
    visibleMonth = nextMonth;
    renderCalendar();
  }
});

nextMonthButton.addEventListener("click", () => {
  const nextMonth = addMonths(visibleMonth, 1);
  if (nextMonth <= currentMonth) {
    visibleMonth = nextMonth;
    renderCalendar();
  }
});

applyTheme();
renderCalendar();
