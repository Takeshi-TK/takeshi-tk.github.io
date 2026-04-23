import { vocabulary } from "./vocabulary.js";
import { phrases } from "./phrases.js";

const PROFILES_KEY = "stridewords-profiles-v4";
const ACTIVE_PROFILE_KEY = "stridewords-active-profile-v4";
const ACTIVE_ROLE_KEY = "stridewords-active-role-v4";
const SETTINGS_KEY = "stridewords-settings-v4";
const PROFILE_ID_PATTERN = /^\S{6,40}$/;
const ADMIN_ID = "TsubasaP";
const ADMIN_ID_HASH = "6fd48e59450c59af0cb7e49a23244523486f335f7b301076568646e87414548b";
const ADMIN_PASSWORD_HASH = "2b3a1f35eb496440d6db24f06e857668c3b8b51d6cebee9eda439eb422ed8668";

const datasets = {
  word: vocabulary,
  phrase: phrases
};

const studyTypeMeta = {
  word: {
    label: "単語",
    countLabel: "語",
    zeroText: "単語"
  },
  phrase: {
    label: "フレーズ",
    countLabel: "件",
    zeroText: "フレーズ"
  }
};

const categoryButtons = document.querySelector("#categoryButtons");
const correctCount = document.querySelector("#correctCount");
const attemptCount = document.querySelector("#attemptCount");
const accuracyRate = document.querySelector("#accuracyRate");
const accuracyBar = document.querySelector("#accuracyBar");
const todayStudyCount = document.querySelector("#todayStudyCount");
const totalPlayCount = document.querySelector("#totalPlayCount");
const learningStreakCount = document.querySelector("#learningStreakCount");
const activeProfileName = document.querySelector("#activeProfileName");
const profileIdInput = document.querySelector("#profileIdInput");
const profilePasswordInput = document.querySelector("#profilePasswordInput");
const registerProfileButton = document.querySelector("#registerProfileButton");
const resumeProfileButton = document.querySelector("#resumeProfileButton");
const resetProfileButton = document.querySelector("#resetProfileButton");
const adminPanel = document.querySelector("#adminPanel");
const adminStatusText = document.querySelector("#adminStatusText");
const adminAccountSelect = document.querySelector("#adminAccountSelect");
const deleteAccountButton = document.querySelector("#deleteAccountButton");
const quizTab = document.querySelector("#quizTab");
const walkTab = document.querySelector("#walkTab");
const wordTypeTab = document.querySelector("#wordTypeTab");
const wordReverseTypeTab = document.querySelector("#wordReverseTypeTab");
const phraseTypeTab = document.querySelector("#phraseTypeTab");
const themeToggleButton = document.querySelector("#themeToggleButton");
const quizPanel = document.querySelector("#quizPanel");
const walkPanel = document.querySelector("#walkPanel");
const quizHeading = document.querySelector("#quizHeading");
const quizPoolBadge = document.querySelector("#quizPoolBadge");
const sessionProgressBadge = document.querySelector("#sessionProgressBadge");
const heroCategoryListSummary = document.querySelector("#heroCategoryListSummary");
const heroCategorySummary = document.querySelector("#heroCategorySummary");
const heroModeSummary = document.querySelector("#heroModeSummary");
const questionMeaning = document.querySelector("#questionMeaning");
const questionHint = document.querySelector("#questionHint");
const choices = document.querySelector("#choices");
const feedbackMessage = document.querySelector("#feedbackMessage");
const nextButton = document.querySelector("#nextButton");
const skipButton = document.querySelector("#skipButton");
const showPreviousAnswerButton = document.querySelector("#showPreviousAnswerButton");
const reviewMistakesButton = document.querySelector("#reviewMistakesButton");
const previousAnswerCard = document.querySelector("#previousAnswerCard");
const previousAnswerBody = document.querySelector("#previousAnswerBody");
const sessionSummaryCard = document.querySelector("#sessionSummaryCard");
const sessionSummaryHeading = document.querySelector("#sessionSummaryHeading");
const sessionSummaryText = document.querySelector("#sessionSummaryText");
const sessionCorrectCount = document.querySelector("#sessionCorrectCount");
const sessionAttemptCount = document.querySelector("#sessionAttemptCount");
const sessionSkipCount = document.querySelector("#sessionSkipCount");
const sessionAccuracyRate = document.querySelector("#sessionAccuracyRate");
const sessionContinueButton = document.querySelector("#sessionContinueButton");
const sessionReviewWrongButton = document.querySelector("#sessionReviewWrongButton");
const sessionStopButton = document.querySelector("#sessionStopButton");
const walkBadge = document.querySelector("#walkBadge");
const walkWord = document.querySelector("#walkWord");
const walkMeaning = document.querySelector("#walkMeaning");
const walkLevelName = document.querySelector("#walkLevelName");
const walkLevelCount = document.querySelector("#walkLevelCount");
const walkPriorityText = document.querySelector("#walkPriorityText");
const walkStrategySelect = document.querySelector("#walkStrategySelect");
const speedSelect = document.querySelector("#speedSelect");
const gapRange = document.querySelector("#gapRange");
const gapValue = document.querySelector("#gapValue");
const walkStartButton = document.querySelector("#walkStartButton");
const walkStopButton = document.querySelector("#walkStopButton");
const walkResetButton = document.querySelector("#walkResetButton");
const walkReplayButton = document.querySelector("#walkReplayButton");

const state = {
  studyType: "word",
  answerMode: "jpToEn",
  category: "beginner",
  mode: "quiz",
  currentQuestion: null,
  lastAnswer: null,
  previousQuestion: null,
  answered: false,
  exposureCounter: 1,
  profiles: loadProfiles(),
  activeProfileId: loadActiveProfileId(),
  role: loadActiveRole(),
  settings: loadSettings(),
  reviewMode: null,
  wakeLock: {
    sentinel: null,
    supported: "wakeLock" in navigator
  },
  quizSession: {
    size: 10,
    asked: 0,
    correct: 0,
    attempts: 0,
    skipped: 0,
    wrongItems: [],
    breakPending: false,
    stopped: false
  },
  walking: {
    active: false,
    token: 0,
    queue: [],
    position: 0
  }
};

ensureActiveProfile();
ensureAdminProfile();

function createEmptyProfile(id) {
  const categories = {};

  for (const [type, collection] of Object.entries(datasets)) {
    for (const key of Object.keys(collection)) {
      categories[`${type}:${key}`] = { correct: 0, attempts: 0 };
    }
  }

  return {
    id,
    createdAt: new Date().toISOString(),
    passwordHash: null,
    role: "user",
    categories,
    words: {},
    stats: {
      todayDate: getTodayKey(),
      todayStudyCount: 0,
      totalPlayCount: 0,
      learningStreak: 0,
      lastStudyDate: ""
    }
  };
}

function loadProfiles() {
  try {
    const saved = JSON.parse(localStorage.getItem(PROFILES_KEY));
    return saved && typeof saved === "object" ? saved : {};
  } catch {
    return {};
  }
}

function saveProfiles() {
  localStorage.setItem(PROFILES_KEY, JSON.stringify(state.profiles));
}

function loadActiveProfileId() {
  return localStorage.getItem(ACTIVE_PROFILE_KEY) || "guest";
}

function saveActiveProfileId() {
  localStorage.setItem(ACTIVE_PROFILE_KEY, state.activeProfileId);
}

function loadActiveRole() {
  return localStorage.getItem(ACTIVE_ROLE_KEY) || "user";
}

function saveActiveRole() {
  localStorage.setItem(ACTIVE_ROLE_KEY, state.role);
}

function loadSettings() {
  const fallback = { speed: 0.75, gap: 2, walkStrategy: "weak", theme: "light" };
  const allowedSpeeds = [0.5, 0.75, 1.25, 1.5];

  try {
    const saved = JSON.parse(localStorage.getItem(SETTINGS_KEY));
    const speed = Number(saved?.speed ?? fallback.speed);
    return {
      speed: allowedSpeeds.includes(speed) ? speed : fallback.speed,
      gap: Number(saved?.gap ?? fallback.gap),
      walkStrategy: String(saved?.walkStrategy ?? fallback.walkStrategy),
      theme: saved?.theme === "dark" ? "dark" : "light"
    };
  } catch {
    return fallback;
  }
}

function saveSettings() {
  localStorage.setItem(SETTINGS_KEY, JSON.stringify(state.settings));
}

function getTodayKey(date = new Date()) {
  return date.toISOString().slice(0, 10);
}

function getDateDiffDays(leftKey, rightKey) {
  if (!leftKey || !rightKey) {
    return null;
  }

  const left = new Date(`${leftKey}T00:00:00`);
  const right = new Date(`${rightKey}T00:00:00`);
  return Math.round((right - left) / 86400000);
}

function ensureProfileStats(profile) {
  if (!profile.stats) {
    profile.stats = {};
  }

  profile.stats.todayDate ||= getTodayKey();
  profile.stats.todayStudyCount = Number(profile.stats.todayStudyCount || 0);
  profile.stats.totalPlayCount = Number(profile.stats.totalPlayCount || 0);
  profile.stats.learningStreak = Number(profile.stats.learningStreak || 0);
  profile.stats.lastStudyDate ||= "";
}

function recordStudyActivity(kind = "quiz") {
  const profile = getActiveProfile();
  ensureProfileStats(profile);
  const today = getTodayKey();

  if (profile.stats.todayDate !== today) {
    profile.stats.todayDate = today;
    profile.stats.todayStudyCount = 0;
  }

  if (profile.stats.lastStudyDate !== today) {
    const diff = getDateDiffDays(profile.stats.lastStudyDate, today);
    profile.stats.learningStreak = diff === 1 ? profile.stats.learningStreak + 1 : 1;
    profile.stats.lastStudyDate = today;
  }

  profile.stats.todayStudyCount += 1;
  if (kind === "play") {
    profile.stats.totalPlayCount += 1;
  }
}

function normalizeProfileId(value) {
  return value.trim().replace(/\s+/g, "-").slice(0, 40);
}

function isValidProfileId(id) {
  return PROFILE_ID_PATTERN.test(id);
}

function isValidPassword(password) {
  return password.trim().length >= 6;
}

async function sha256(text) {
  const input = new TextEncoder().encode(text);
  const digest = await crypto.subtle.digest("SHA-256", input);
  return Array.from(new Uint8Array(digest))
    .map((value) => value.toString(16).padStart(2, "0"))
    .join("");
}

function ensureActiveProfile() {
  if (!state.profiles[state.activeProfileId]) {
    state.profiles[state.activeProfileId] = createEmptyProfile(state.activeProfileId);
  }

  const profile = state.profiles[state.activeProfileId];
  ensureProfileStats(profile);

  for (const [type, collection] of Object.entries(datasets)) {
    for (const key of Object.keys(collection)) {
      const progressKey = `${type}:${key}`;
      if (!profile.categories[progressKey]) {
        profile.categories[progressKey] = { correct: 0, attempts: 0 };
      }
    }
  }

  saveProfiles();
  saveActiveProfileId();
  saveActiveRole();
}

function ensureAdminProfile() {
  if (!state.profiles[ADMIN_ID]) {
    state.profiles[ADMIN_ID] = createEmptyProfile(ADMIN_ID);
  }

  state.profiles[ADMIN_ID].role = "admin";
  state.profiles[ADMIN_ID].passwordHash = ADMIN_PASSWORD_HASH;
  saveProfiles();
}

function getCurrentCollection() {
  return datasets[state.studyType];
}

function ensureValidCategory() {
  const collection = getCurrentCollection();
  if (!collection[state.category]) {
    state.category = Object.keys(collection)[0];
  }
}

function getCurrentCategory() {
  ensureValidCategory();
  return getCurrentCollection()[state.category];
}

function getCurrentItems() {
  return getCurrentCategory().words;
}

function getActiveProfile() {
  return state.profiles[state.activeProfileId];
}

function getProgressKey(category = state.category, studyType = state.studyType) {
  return `${studyType}:${category}`;
}

function getCategoryProgress(category = state.category, studyType = state.studyType) {
  const profile = getActiveProfile();
  const key = getProgressKey(category, studyType);

  if (!profile.categories[key]) {
    profile.categories[key] = { correct: 0, attempts: 0 };
  }

  return profile.categories[key];
}

function getWordKey(word, category = state.category, studyType = state.studyType) {
  return `${studyType}::${category}::${word.english}::${word.japanese}`;
}

function getWordRecord(word, category = state.category, studyType = state.studyType) {
  const profile = getActiveProfile();
  const key = getWordKey(word, category, studyType);

  if (!profile.words[key]) {
    profile.words[key] = {
      attempts: 0,
      correct: 0,
      wrong: 0,
      streak: 0,
      lastSeen: 0,
      reviewDue: false,
      reviewStreak: 0
    };
  }

  profile.words[key].reviewDue ||= false;
  profile.words[key].reviewStreak = Number(profile.words[key].reviewStreak || 0);

  return profile.words[key];
}

function isMastered(word, category = state.category, studyType = state.studyType) {
  return getWordRecord(word, category, studyType).streak >= 3;
}

function getStudyItems(category = state.category, studyType = state.studyType) {
  return datasets[studyType][category].words.filter((word) => !isMastered(word, category, studyType));
}

function getReviewDueItems(category = state.category, studyType = state.studyType) {
  return datasets[studyType][category].words.filter((word) => {
    const record = getWordRecord(word, category, studyType);
    return record.reviewDue && record.reviewStreak < 3;
  });
}

function getSessionWrongItems() {
  return state.quizSession.wrongItems
    .map((key) => getCurrentItems().find((item) => getWordKey(item) === key))
    .filter(Boolean)
    .filter((item) => {
      const record = getWordRecord(item);
      return record.reviewDue && record.reviewStreak < 3;
    });
}

function getQuestionPool() {
  if (state.reviewMode === "session") {
    return getSessionWrongItems();
  }

  if (state.reviewMode === "mistakes") {
    return getReviewDueItems();
  }

  return getStudyItems();
}

function isWordReverseMode() {
  return state.studyType === "word" && state.answerMode === "enToJp";
}

function getWordPriority(word) {
  const record = getWordRecord(word);

  if (record.streak >= 3) {
    return -100;
  }

  if (!record.attempts) {
    return 20;
  }

  return record.wrong * 10 + (3 - Math.min(record.streak, 3)) * 2 - record.correct;
}

function getWordWeight(word) {
  const record = getWordRecord(word);

  if (record.streak >= 3) {
    return 0;
  }

  let weight = 1;

  if (record.reviewDue) {
    weight += 8;
  }

  if (!record.attempts) {
    weight += 4;
  }

  weight += record.wrong * 3;
  weight += Math.max(0, 2 - record.streak);

  if (record.lastSeen) {
    const gap = state.exposureCounter - record.lastSeen;
    if (gap <= 2) {
      weight *= 0.35;
    } else if (gap <= 5) {
      weight *= 0.65;
    }
  }

  return weight;
}

function shuffle(items) {
  const copy = [...items];

  for (let index = copy.length - 1; index > 0; index -= 1) {
    const randomIndex = Math.floor(Math.random() * (index + 1));
    [copy[index], copy[randomIndex]] = [copy[randomIndex], copy[index]];
  }

  return copy;
}

function pickWeightedWord(words) {
  const weighted = words
    .map((word) => ({ word, weight: getWordWeight(word) }))
    .filter((entry) => entry.weight > 0);

  if (!weighted.length) {
    return null;
  }

  const total = weighted.reduce((sum, entry) => sum + entry.weight, 0);
  let threshold = Math.random() * total;

  for (const entry of weighted) {
    threshold -= entry.weight;
    if (threshold <= 0) {
      return entry.word;
    }
  }

  return weighted[weighted.length - 1].word;
}

function touchWord(word) {
  const record = getWordRecord(word);
  record.lastSeen = state.exposureCounter;
  state.exposureCounter += 1;
}

function buildOptions(answer) {
  const distractors = shuffle(
    getCurrentItems().filter((item) => item.english !== answer.english)
  ).slice(0, 3);

  return shuffle([answer, ...distractors]);
}

function resetQuizSession() {
  state.quizSession.asked = 0;
  state.quizSession.correct = 0;
  state.quizSession.attempts = 0;
  state.quizSession.skipped = 0;
  state.quizSession.wrongItems = [];
  state.quizSession.breakPending = false;
  state.quizSession.stopped = false;
}

function resetLearningFlow() {
  resetQuizSession();
  state.lastAnswer = null;
  state.currentQuestion = null;
  state.previousQuestion = null;
  state.answered = false;
  previousAnswerCard.classList.add("hidden");
  hideSessionSummary();
}

function getQuizSessionAccuracy() {
  return state.quizSession.attempts
    ? Math.round((state.quizSession.correct / state.quizSession.attempts) * 100)
    : 0;
}

function updateSessionProgressBadge() {
  if (state.quizSession.breakPending) {
    sessionProgressBadge.textContent = `${state.quizSession.size} / ${state.quizSession.size} 結果確認`;
    return;
  }

  if (state.quizSession.stopped) {
    sessionProgressBadge.textContent = "10問区切りで一時停止中";
    return;
  }

  sessionProgressBadge.textContent = `10問区切り ${state.quizSession.asked} / ${state.quizSession.size}`;
}

function updateHeroSummary() {
  const currentCategory = getCurrentCategory();
  const categoryLabels = Object.values(getCurrentCollection())
    .map((category) => category.label)
    .join(" / ");
  const studyLabel = state.studyType === "word"
    ? `単語 ${state.answerMode === "enToJp" ? "英→日" : "日→英"}`
    : studyTypeMeta[state.studyType].label;
  const modeLabel = state.mode === "walk" ? "ウォーキング" : "4択クイズ";

  heroCategoryListSummary.textContent = categoryLabels;
  heroCategorySummary.textContent = `${currentCategory.label}を選択中`;
  heroModeSummary.textContent = `${studyLabel} / ${modeLabel}`;
}

function hideSessionSummary() {
  sessionSummaryCard.classList.add("hidden");
}

function renderSessionSummary() {
  const accuracy = getQuizSessionAccuracy();
  const categoryLabel = getCurrentCategory().label;
  const studyLabel = state.studyType === "phrase" ? "フレーズ" : "単語";

  sessionSummaryHeading.textContent = `${state.quizSession.size}問の結果`;
  sessionSummaryText.textContent = `${categoryLabel}の${studyLabel}を ${state.quizSession.size}問確認しました。正答率を見て、次の10問へ進むかここで一区切りにするか選べます。`;
  sessionCorrectCount.textContent = String(state.quizSession.correct);
  sessionAttemptCount.textContent = String(state.quizSession.attempts);
  sessionSkipCount.textContent = String(state.quizSession.skipped);
  sessionAccuracyRate.textContent = `${accuracy}%`;
  sessionReviewWrongButton.disabled = getSessionWrongItems().length === 0;
  sessionSummaryCard.classList.remove("hidden");
}

function completeQuizSessionItem(result) {
  state.quizSession.asked += 1;

  if (result === "correct") {
    state.quizSession.correct += 1;
    state.quizSession.attempts += 1;
  } else if (result === "wrong") {
    state.quizSession.attempts += 1;
  } else if (result === "skip") {
    state.quizSession.skipped += 1;
  }

  if (state.quizSession.asked >= state.quizSession.size) {
    state.quizSession.breakPending = true;
  }

  updateSessionProgressBadge();
}

function continueQuizSession() {
  state.reviewMode = null;
  resetQuizSession();
  hideSessionSummary();
  createQuestion();
}

function startSessionWrongReview() {
  if (!getSessionWrongItems().length) {
    window.alert("この10問で復習対象になる間違いはありません。");
    return;
  }

  state.reviewMode = "session";
  const wrongItems = [...state.quizSession.wrongItems];
  resetQuizSession();
  state.quizSession.wrongItems = wrongItems;
  state.quizSession.breakPending = false;
  state.quizSession.stopped = false;
  hideSessionSummary();
  createQuestion();
}

function startMistakesReview() {
  if (!getReviewDueItems().length) {
    window.alert("現在、復習対象の単語・フレーズはありません。");
    return;
  }

  state.reviewMode = "mistakes";
  resetQuizSession();
  hideSessionSummary();
  createQuestion();
}

function stopQuizSessionBreak() {
  state.quizSession.breakPending = false;
  state.quizSession.stopped = true;
  updateSessionProgressBadge();
  renderSessionSummary();
  feedbackMessage.textContent = "ここで一区切りにしました。再開すると次の10問を始めます。";
  feedbackMessage.className = "feedback neutral";
  nextButton.classList.add("hidden");
  skipButton.disabled = true;
  choices.innerHTML = "";
}

function renderProfiles() {
  activeProfileName.textContent = state.activeProfileId;
}

function renderAdminPanel() {
  const isAdmin = state.role === "admin" && state.activeProfileId === ADMIN_ID;
  adminPanel.classList.toggle("hidden", !isAdmin);

  if (!isAdmin) {
    adminAccountSelect.innerHTML = "";
    return;
  }

  const ids = Object.keys(state.profiles)
    .filter((id) => id !== ADMIN_ID)
    .sort((left, right) => left.localeCompare(right, "ja"));

  adminStatusText.textContent = `${ids.length} account${ids.length === 1 ? "" : "s"}`;
  adminAccountSelect.innerHTML = "";

  if (!ids.length) {
    const option = document.createElement("option");
    option.value = "";
    option.textContent = "削除できるアカウントがありません";
    adminAccountSelect.appendChild(option);
    return;
  }

  for (const id of ids) {
    const option = document.createElement("option");
    option.value = id;
    option.textContent = id;
    adminAccountSelect.appendChild(option);
  }
}

function renderStudyTypeTabs() {
  const isWordJpToEn = state.studyType === "word" && state.answerMode === "jpToEn";
  const isWordEnToJp = state.studyType === "word" && state.answerMode === "enToJp";
  const isPhrase = state.studyType === "phrase";
  wordTypeTab.classList.toggle("active", isWordJpToEn);
  wordReverseTypeTab.classList.toggle("active", isWordEnToJp);
  phraseTypeTab.classList.toggle("active", isPhrase);
  wordTypeTab.setAttribute("aria-selected", String(isWordJpToEn));
  wordReverseTypeTab.setAttribute("aria-selected", String(isWordEnToJp));
  phraseTypeTab.setAttribute("aria-selected", String(isPhrase));
}

function renderCategories() {
  ensureValidCategory();
  categoryButtons.innerHTML = "";
  const studyMeta = studyTypeMeta[state.studyType];

  for (const [key, category] of Object.entries(getCurrentCollection())) {
    const button = document.createElement("button");
    button.type = "button";
    button.className = `category-button ${key === state.category ? "active" : ""}`;
    button.innerHTML = `
      <span>${category.label}</span>
      <small>${category.words.length}${studyMeta.countLabel}</small>
    `;

    button.addEventListener("click", () => {
      if (state.category === key) {
        return;
      }

      stopWalking(true);
      state.category = key;
      state.reviewMode = null;
      resetLearningFlow();
      rebuildWalkingQueue();
      renderAll();
    });

    categoryButtons.appendChild(button);
  }
}

function updateSnapshot() {
  const category = getCurrentCategory();
  const progress = getCategoryProgress();
  const attempts = progress.attempts;
  const accuracy = attempts ? Math.round((progress.correct / attempts) * 100) : 0;
  const activeWords = getStudyItems().length;
  const totalWords = category.words.length;
  const studyMeta = studyTypeMeta[state.studyType];
  const profile = getActiveProfile();
  ensureProfileStats(profile);

  correctCount.textContent = String(progress.correct);
  attemptCount.textContent = String(attempts);
  accuracyRate.textContent = `${accuracy}%`;
  accuracyBar.style.width = `${accuracy}%`;
  todayStudyCount.textContent = String(profile.stats.todayStudyCount);
  totalPlayCount.textContent = String(profile.stats.totalPlayCount);
  learningStreakCount.textContent = `${profile.stats.learningStreak}日`;
  reviewMistakesButton.disabled = getReviewDueItems().length === 0;

  const directionLabel = state.studyType === "word" && state.answerMode === "enToJp" ? "英→日" : "日→英";
  quizHeading.textContent = state.studyType === "word"
    ? `${category.label} 単語${directionLabel}クイズ`
    : `${category.label} ${studyMeta.label}クイズ`;
  quizPoolBadge.textContent = activeWords
    ? `出題対象 ${activeWords}${studyMeta.countLabel}`
    : "出題対象なし";

  walkLevelName.textContent = category.label;
  walkLevelCount.textContent = activeWords
    ? `${activeWords}${studyMeta.countLabel}`
    : "完了";
  quizPoolBadge.textContent = state.reviewMode
    ? `復習中 ${getQuestionPool().length}${studyMeta.countLabel}`
    : `出題対象 ${activeWords}${studyMeta.countLabel} / 全体 ${totalWords}${studyMeta.countLabel}`;
  walkLevelCount.textContent = `${activeWords} / ${totalWords}${studyMeta.countLabel}`;
  walkPriorityText.textContent = activeWords
    ? getWalkingStrategyLabel()
    : "このレベルは完了";

  updateSessionProgressBadge();
}

function renderQuizCompletion() {
  state.currentQuestion = null;
  state.answered = true;
  hideSessionSummary();
  questionMeaning.textContent = "このレベルは3連続正解で学習完了です";
  questionHint.textContent = "次のレベルに切り替えるか、このIDの学習記録をリセットしてもう一度取り組めます。";
  feedbackMessage.textContent = `このIDでは現在、出題対象の${studyTypeMeta[state.studyType].zeroText}がありません。`;
  feedbackMessage.className = "feedback neutral";
  choices.innerHTML = "";
  nextButton.classList.add("hidden");
  skipButton.disabled = true;
  state.quizSession.breakPending = false;
  state.quizSession.stopped = false;
  updateSessionProgressBadge();
}

function renderPreviousAnswerState() {
  showPreviousAnswerButton.disabled = !state.previousQuestion;

  if (!state.previousQuestion) {
    previousAnswerBody.textContent = "前の問題はまだありません。";
    previousAnswerBody.className = "feedback neutral";
  }
}

function restorePreviousQuestion() {
  if (!state.previousQuestion) {
    return;
  }

  hideSessionSummary();
  state.currentQuestion = {
    answer: state.previousQuestion.answer,
    options: state.previousQuestion.options
  };
  state.answered = false;
  previousAnswerCard.classList.add("hidden");
  renderCurrentQuestionUi();
}

function buildItemExplanation(item) {
  return item.explanation || "";
}

function setUsageResult(target, className, text) {
  target.className = `usage-help-result ${className}`;
  target.textContent = text;
  target.classList.remove("hidden");
}

function buildPracticalWordExample(word, meaning) {
  const lower = word.toLowerCase();
  const exactExamples = {
    for: {
      meaningNote: "目的・対象・期間を表す前置詞です。「〜のために」「〜に向けて」「〜の間」など、文によって訳が変わります。",
      examples: [
        ["This gift is for you.", "このプレゼントはあなたのためのものです。"],
        ["I studied for two hours.", "私は2時間勉強しました。"]
      ],
      note: "for は日本語1語で固定せず、「誰のため」「何の目的」「どれくらいの期間」かを見て訳します。"
    },
    to: {
      meaningNote: "方向・到達点・相手を表す前置詞です。「〜へ」「〜に」と訳すことが多いです。",
      examples: [
        ["I go to school by train.", "私は電車で学校へ行きます。"],
        ["Please send this to me.", "これを私に送ってください。"]
      ],
      note: "to は「向かう先」を表す感覚で覚えると使いやすいです。"
    },
    in: {
      meaningNote: "場所や時間の中にあることを表す前置詞です。「〜の中に」「〜で」「〜に」と訳します。",
      examples: [
        ["She is in the room.", "彼女は部屋の中にいます。"],
        ["I was born in April.", "私は4月に生まれました。"]
      ],
      note: "in は「中に入っている」イメージです。"
    },
    on: {
      meaningNote: "何かの上に接していること、または曜日・日付を表す前置詞です。",
      examples: [
        ["The book is on the table.", "本はテーブルの上にあります。"],
        ["I have a meeting on Monday.", "月曜日に会議があります。"]
      ],
      note: "on は「接している」「特定の日」のイメージで使います。"
    },
    at: {
      meaningNote: "具体的な場所や時刻の一点を表す前置詞です。「〜で」「〜に」と訳します。",
      examples: [
        ["Let's meet at the station.", "駅で会いましょう。"],
        ["The class starts at nine.", "授業は9時に始まります。"]
      ],
      note: "at はピンポイントの場所や時刻に使います。"
    },
    of: {
      meaningNote: "所属・一部・関係を表す前置詞です。「〜の」と訳すことが多いです。",
      examples: [
        ["This is a map of Japan.", "これは日本の地図です。"],
        ["I drank a cup of coffee.", "私はコーヒーを1杯飲みました。"]
      ],
      note: "of は2つのものの関係をつなぐ単語です。"
    },
    with: {
      meaningNote: "一緒にいる相手、使う道具、伴う状態を表します。「〜と一緒に」「〜で」と訳します。",
      examples: [
        ["I went there with my friend.", "友だちと一緒にそこへ行きました。"],
        ["Please write with this pen.", "このペンで書いてください。"]
      ],
      note: "with は「一緒」「道具」のイメージで使います。"
    },
    from: {
      meaningNote: "出発点・起点・送った人を表します。「〜から」と訳すことが多いです。",
      examples: [
        ["I am from Japan.", "私は日本出身です。"],
        ["This email is from my boss.", "このメールは上司からです。"]
      ],
      note: "from は「どこから来たか」を表します。"
    },
    about: {
      meaningNote: "話題や内容を表します。「〜について」と訳します。",
      examples: [
        ["I want to talk about this.", "これについて話したいです。"],
        ["This book is about travel.", "この本は旅行についての本です。"]
      ],
      note: "about は会話や説明のテーマを示すときに便利です。"
    },
    the: {
      meaningNote: "聞き手も分かる特定のものを指す冠詞です。日本語では訳さないことも多いです。",
      examples: [
        ["Please close the door.", "そのドアを閉めてください。"],
        ["The station is near here.", "その駅はこの近くです。"]
      ],
      note: "the は「どれのことか相手も分かる」ときに使います。"
    },
    a: {
      meaningNote: "初めて出てくる1つのもの、または特定しない1つのものにつける冠詞です。",
      examples: [
        ["I need a pen.", "ペンが1本必要です。"],
        ["She has a dog.", "彼女は犬を1匹飼っています。"]
      ],
      note: "a は数えられる単数名詞の前でよく使います。"
    },
    an: {
      meaningNote: "a と同じく1つのものを表す冠詞です。母音で始まる音の前で使います。",
      examples: [
        ["I ate an apple.", "私はリンゴを1つ食べました。"],
        ["He is an engineer.", "彼はエンジニアです。"]
      ],
      note: "an は発音が母音で始まる単語の前に置きます。"
    },
    and: {
      meaningNote: "単語や文をつなぐ接続詞です。「そして」「〜と」と訳します。",
      examples: [
        ["I like coffee and tea.", "私はコーヒーと紅茶が好きです。"],
        ["She opened the door and smiled.", "彼女はドアを開けて微笑みました。"]
      ],
      note: "and は同じ種類の情報を足すときに使います。"
    },
    but: {
      meaningNote: "前の内容と反対・対比になる内容をつなぐ接続詞です。「しかし」「でも」と訳します。",
      examples: [
        ["I am tired, but I will go.", "疲れていますが、行きます。"],
        ["This is small but useful.", "これは小さいですが役に立ちます。"]
      ],
      note: "but の後には、前と少し逆の内容が来ます。"
    },
    or: {
      meaningNote: "選択肢を表す接続詞です。「または」「それとも」と訳します。",
      examples: [
        ["Do you want tea or coffee?", "紅茶かコーヒーが欲しいですか。"],
        ["We can go today or tomorrow.", "今日か明日に行けます。"]
      ],
      note: "or は選択肢を並べるときに使います。"
    },
    hostel: {
      meaningNote: "旅行者向けの安い宿泊施設です。相部屋や共用キッチンがあることが多く、hotel よりカジュアルで低価格な宿です。",
      examples: [
        ["I stayed at a hostel near the station.", "駅の近くのホステルに泊まりました。"],
        ["This hostel has a shared kitchen.", "このホステルには共用キッチンがあります。"]
      ],
      note: "日本語の「ホステル」だけでは分かりにくいので、「安めの旅行者向け宿」と覚えると実用的です。"
    },
    hotel: {
      meaningNote: "宿泊施設のホテルです。個室で泊まる一般的な宿を指します。",
      examples: [
        ["I booked a hotel for two nights.", "2泊分のホテルを予約しました。"],
        ["The hotel is close to the airport.", "そのホテルは空港に近いです。"]
      ],
      note: "book a hotel で「ホテルを予約する」という実用表現です。"
    },
    restaurant: {
      meaningNote: "食事をする店、飲食店のことです。",
      examples: [
        ["This restaurant is popular with locals.", "このレストランは地元の人に人気です。"],
        ["Let's find a restaurant nearby.", "近くのレストランを探しましょう。"]
      ],
      note: "食事の場所を説明するときに使いやすい単語です。"
    },
    airport: {
      meaningNote: "飛行機に乗ったり到着したりする空港です。",
      examples: [
        ["I arrived at the airport early.", "早めに空港に着きました。"],
        ["How do I get to the airport?", "空港へはどう行けばいいですか。"]
      ],
      note: "at the airport の形でよく使います。"
    },
    station: {
      meaningNote: "電車やバスなどの駅・停留所を指します。",
      examples: [
        ["Let's meet at the station.", "駅で会いましょう。"],
        ["The station is crowded today.", "今日は駅が混んでいます。"]
      ],
      note: "待ち合わせでそのまま使える表現です。"
    },
    ticket: {
      meaningNote: "電車・飛行機・イベントなどのチケット、切符です。",
      examples: [
        ["I bought a train ticket.", "電車の切符を買いました。"],
        ["Do I need a ticket?", "チケットは必要ですか。"]
      ],
      note: "buy a ticket で「切符を買う」です。"
    },
    reservation: {
      meaningNote: "ホテル・レストラン・サービスなどの予約です。",
      examples: [
        ["I have a reservation at seven.", "7時に予約しています。"],
        ["Can I change my reservation?", "予約を変更できますか。"]
      ],
      note: "ホテルやレストランでよく使います。"
    },
    meeting: {
      meaningNote: "仕事などで人が集まって話し合う会議・打ち合わせです。",
      examples: [
        ["The meeting starts at ten.", "会議は10時に始まります。"],
        ["I have a meeting this afternoon.", "今日の午後に会議があります。"]
      ],
      note: "ビジネス英語では頻出です。"
    },
    schedule: {
      meaningNote: "予定、日程、スケジュールのことです。",
      examples: [
        ["My schedule is full today.", "今日は予定がいっぱいです。"],
        ["Can we check the schedule?", "スケジュールを確認できますか。"]
      ],
      note: "予定や日程を話すときに便利です。"
    },
    deadline: {
      meaningNote: "提出や完了の期限、締切です。",
      examples: [
        ["The deadline is tomorrow.", "締切は明日です。"],
        ["We need to meet the deadline.", "締切に間に合わせる必要があります。"]
      ],
      note: "仕事や提出物の期限に使います。"
    },
    password: {
      meaningNote: "ログインなどに使うパスワードです。",
      examples: [
        ["I forgot my password.", "パスワードを忘れました。"],
        ["Please enter your password.", "パスワードを入力してください。"]
      ],
      note: "ログインできない場面でよく使います。"
    },
    address: {
      meaningNote: "住所、宛先、メールアドレスなどの「アドレス」です。",
      examples: [
        ["Please write your address here.", "ここに住所を書いてください。"],
        ["What is your email address?", "あなたのメールアドレスは何ですか。"]
      ],
      note: "書類や配送の場面で使います。"
    },
    price: {
      meaningNote: "物やサービスの値段・価格です。",
      examples: [
        ["The price is reasonable.", "値段は手ごろです。"],
        ["What is the price?", "値段はいくらですか。"]
      ],
      note: "買い物や交渉で便利です。"
    },
    problem: {
      meaningNote: "困ったこと、問題、トラブルを指します。",
      examples: [
        ["There is a problem with my phone.", "スマホに問題があります。"],
        ["What's the problem?", "何が問題ですか。"]
      ],
      note: "with をつけると「何に問題があるか」を言えます。"
    },
    question: {
      meaningNote: "質問、疑問のことです。",
      examples: [
        ["I have a question about this.", "これについて質問があります。"],
        ["Can I ask a question?", "質問してもいいですか。"]
      ],
      note: "授業や仕事でそのまま使えます。"
    },
    first: {
      meaningNote: "順番が最初であることを表します。「初めて」「1番目の」という意味で使います。",
      examples: [
        ["This is my first time here.", "ここに来るのは初めてです。"],
        ["She finished first.", "彼女は1位で終えました。"]
      ],
      note: "first は「最初の」のほか、「初めて」という場面でもよく使います。"
    },
    building: {
      meaningNote: "人が住んだり、働いたり、店や施設として使ったりする建物です。house より広く、ビル・学校・病院などにも使えます。",
      examples: [
        ["There is a tall building next to the station.", "駅の隣に高い建物があります。"],
        ["My office is in this building.", "私の会社はこの建物の中にあります。"]
      ],
      note: "building は「建物」全般です。会社のビルだけでなく、学校や施設にも使えます。"
    }
  };

  Object.assign(exactExamples, {
    i: {
      examples: [
        ["I live in Japan.", "私は日本に住んでいます。"],
        ["I need some help.", "私は少し助けが必要です。"]
      ]
    },
    you: {
      examples: [
        ["You are welcome.", "どういたしまして。"],
        ["Do you have a minute?", "少し時間がありますか。"]
      ]
    },
    he: {
      examples: [
        ["He works near here.", "彼はこの近くで働いています。"],
        ["He is my friend.", "彼は私の友だちです。"]
      ]
    },
    she: {
      examples: [
        ["She speaks English well.", "彼女は英語を上手に話します。"],
        ["She is at home now.", "彼女は今、家にいます。"]
      ]
    },
    it: {
      examples: [
        ["It is very useful.", "それはとても役に立ちます。"],
        ["I found it yesterday.", "私は昨日それを見つけました。"]
      ]
    },
    we: {
      examples: [
        ["We can start now.", "私たちは今始められます。"],
        ["We went there together.", "私たちは一緒にそこへ行きました。"]
      ]
    },
    they: {
      examples: [
        ["They are waiting outside.", "彼らは外で待っています。"],
        ["They helped me yesterday.", "彼らは昨日私を助けてくれました。"]
      ]
    },
    finger: {
      examples: [
        ["This is my finger.", "これは私の指です。"],
        ["I hurt my finger.", "指をけがしました。"]
      ]
    },
    hand: {
      examples: [
        ["Please raise your hand.", "手を上げてください。"],
        ["I washed my hands.", "手を洗いました。"]
      ]
    },
    head: {
      examples: [
        ["My head hurts.", "頭が痛いです。"],
        ["Please keep your head up.", "顔を上げてください。"]
      ]
    },
    face: {
      examples: [
        ["Please wash your face.", "顔を洗ってください。"],
        ["She has a kind face.", "彼女は優しい顔をしています。"]
      ]
    },
    eye: {
      examples: [
        ["My eye hurts.", "目が痛いです。"],
        ["Please close your eyes.", "目を閉じてください。"]
      ]
    },
    ear: {
      examples: [
        ["My ear hurts.", "耳が痛いです。"],
        ["I heard it with my own ears.", "私はそれを自分の耳で聞きました。"]
      ]
    },
    nose: {
      examples: [
        ["My nose is running.", "鼻水が出ています。"],
        ["He touched his nose.", "彼は鼻を触りました。"]
      ]
    },
    mouth: {
      examples: [
        ["Please open your mouth.", "口を開けてください。"],
        ["My mouth is dry.", "口が渇いています。"]
      ]
    },
    tooth: {
      examples: [
        ["My tooth hurts.", "歯が痛いです。"],
        ["I brush my teeth every morning.", "私は毎朝歯を磨きます。"]
      ]
    },
    foot: {
      examples: [
        ["My foot hurts.", "足が痛いです。"],
        ["Please wipe your feet.", "足を拭いてください。"]
      ]
    },
    toe: {
      examples: [
        ["I hurt my toe.", "足の指をけがしました。"],
        ["My toe hurts.", "足の指が痛いです。"]
      ]
    },
    body: {
      examples: [
        ["My body feels tired.", "体が疲れている感じがします。"],
        ["Exercise is good for your body.", "運動は体に良いです。"]
      ]
    },
    water: {
      examples: [
        ["Can I have some water?", "水をもらえますか。"],
        ["I drink water every morning.", "私は毎朝水を飲みます。"]
      ]
    },
    coffee: {
      examples: [
        ["I drink coffee every morning.", "私は毎朝コーヒーを飲みます。"],
        ["Can I have a coffee?", "コーヒーを1杯もらえますか。"]
      ]
    },
    tea: {
      examples: [
        ["Would you like some tea?", "お茶はいかがですか。"],
        ["I drink tea after dinner.", "私は夕食後にお茶を飲みます。"]
      ]
    },
    bread: {
      examples: [
        ["I ate bread for breakfast.", "朝食にパンを食べました。"],
        ["This bread is fresh.", "このパンは新鮮です。"]
      ]
    },
    rice: {
      examples: [
        ["I eat rice every day.", "私は毎日ご飯を食べます。"],
        ["The rice is ready.", "ご飯ができました。"]
      ]
    },
    go: {
      examples: [
        ["I go to work by train.", "私は電車で仕事へ行きます。"],
        ["Let's go together.", "一緒に行きましょう。"]
      ]
    },
    come: {
      examples: [
        ["Please come here.", "ここに来てください。"],
        ["I will come back tomorrow.", "明日戻ってきます。"]
      ]
    },
    have: {
      examples: [
        ["I have a question.", "質問があります。"],
        ["Do you have time?", "時間はありますか。"]
      ]
    },
    be: {
      examples: [
        ["Please be careful.", "気をつけてください。"],
        ["I want to be ready.", "準備ができている状態でいたいです。"]
      ]
    },
    do: {
      examples: [
        ["I do my homework at night.", "私は夜に宿題をします。"],
        ["What should I do?", "私は何をすればいいですか。"]
      ]
    },
    make: {
      examples: [
        ["I make breakfast every morning.", "私は毎朝朝食を作ります。"],
        ["Can you make a reservation?", "予約を取れますか。"]
      ]
    },
    get: {
      examples: [
        ["I got a message from him.", "彼からメッセージを受け取りました。"],
        ["Can I get a ticket?", "チケットをもらえますか。"]
      ]
    },
    take: {
      examples: [
        ["Please take this seat.", "この席に座ってください。"],
        ["I take the bus to school.", "私は学校へバスで行きます。"]
      ]
    },
    use: {
      examples: [
        ["Can I use this pen?", "このペンを使ってもいいですか。"],
        ["I use this app every day.", "私はこのアプリを毎日使います。"]
      ]
    },
    need: {
      examples: [
        ["I need your help.", "あなたの助けが必要です。"],
        ["Do you need anything?", "何か必要ですか。"]
      ]
    },
    want: {
      examples: [
        ["I want some water.", "水が欲しいです。"],
        ["What do you want to do?", "何をしたいですか。"]
      ]
    },
    like: {
      examples: [
        ["I like this song.", "私はこの歌が好きです。"],
        ["Do you like coffee?", "コーヒーは好きですか。"]
      ]
    },
    eat: {
      examples: [
        ["I eat breakfast at seven.", "私は7時に朝食を食べます。"],
        ["Let's eat together.", "一緒に食べましょう。"]
      ]
    },
    drink: {
      examples: [
        ["I drink water after exercise.", "運動後に水を飲みます。"],
        ["Do you drink coffee?", "コーヒーを飲みますか。"]
      ]
    },
    buy: {
      examples: [
        ["I want to buy this.", "これを買いたいです。"],
        ["Where can I buy a ticket?", "どこで切符を買えますか。"]
      ]
    },
    pay: {
      examples: [
        ["Can I pay by card?", "カードで支払えますか。"],
        ["I paid for lunch.", "昼食代を支払いました。"]
      ]
    },
    read: {
      examples: [
        ["I read a book before bed.", "寝る前に本を読みます。"],
        ["Can you read this message?", "このメッセージを読めますか。"]
      ]
    },
    write: {
      examples: [
        ["Please write your name here.", "ここに名前を書いてください。"],
        ["I wrote an email.", "メールを書きました。"]
      ]
    },
    today: {
      examples: [
        ["I am busy today.", "今日は忙しいです。"],
        ["Let's start today.", "今日始めましょう。"]
      ]
    },
    tomorrow: {
      examples: [
        ["See you tomorrow.", "また明日会いましょう。"],
        ["I will call you tomorrow.", "明日電話します。"]
      ]
    },
    yesterday: {
      examples: [
        ["I was tired yesterday.", "昨日は疲れていました。"],
        ["I bought this yesterday.", "これは昨日買いました。"]
      ]
    }
  });

  if (exactExamples[lower]) {
    return exactExamples[lower];
  }

  if (/宿|ホテル|ホステル|泊/.test(meaning)) {
    return {
      meaningNote: `${meaning}は、泊まる場所や宿泊に関係する単語です。`,
      examples: [
        [`I stayed at a ${word} last night.`, `昨夜、${meaning}に泊まりました。`],
        [`Is this ${word} near the station?`, `この${meaning}は駅の近くですか。`]
      ],
      note: "宿泊先について話すときに使います。"
    };
  }

  if (/駅|空港|場所|店|学校|会社|病院|公園|部屋/.test(meaning)) {
    return {
      meaningNote: `${meaning}は、場所を表す単語です。`,
      examples: [
        [`Let's meet at the ${word}.`, `${meaning}で会いましょう。`],
        [`The ${word} is nearby.`, `${meaning}は近くにあります。`]
      ],
      note: "場所を表す単語は at the ... の形でよく使います。"
    };
  }

  if (/予定|予約|会議|締切|期限|面接/.test(meaning)) {
    return {
      meaningNote: `${meaning}は、予定や仕事の管理で使う単語です。`,
      examples: [
        [`I need to check the ${word}.`, `${meaning}を確認する必要があります。`],
        [`The ${word} is important.`, `その${meaning}は重要です。`]
      ],
      note: "予定や仕事の確認で使いやすい形です。"
    };
  }

  if (/問題|質問|理由|答え|説明|情報/.test(meaning)) {
    return {
      meaningNote: `${meaning}は、確認や説明の場面でよく使う単語です。`,
      examples: [
        [`I have a ${word} about this.`, `これについて${meaning}があります。`],
        [`Can you explain the ${word}?`, `その${meaning}を説明してもらえますか。`]
      ],
      note: "会話で相手に確認したいときに便利です。"
    };
  }

  if (/値段|価格|料金|費用|割引|支払い/.test(meaning)) {
    return {
      meaningNote: `${meaning}は、買い物や支払いで使う単語です。`,
      examples: [
        [`What is the ${word}?`, `${meaning}はいくらですか。`],
        [`The ${word} is too high.`, `${meaning}が高すぎます。`]
      ],
      note: "買い物や支払いの場面で使います。"
    };
  }

  if (/必要|重要|簡単|難しい|便利|安全|高い|安い|早い|遅い|新しい|古い/.test(meaning)) {
    return {
      meaningNote: `${meaning}は、物事の状態や性質を表す単語です。`,
      examples: [
        [`This is ${word}.`, `これは${meaning}です。`],
        [`It looks ${word}.`, `それは${meaning}に見えます。`]
      ],
      note: "性質や状態を短く説明するときに使います。"
    };
  }

  if (/頭|顔|髪|目|耳|鼻|口|歯|首|肩|腕|手|指|背中|お腹|脚|ひざ|足|心臓|体/.test(meaning)) {
    return {
      examples: [
        [`My ${word} hurts.`, `${meaning}が痛いです。`],
        [`Please be careful with your ${word}.`, `${meaning}を大事にしてください。`]
      ]
    };
  }

  if (/水|お茶|コーヒー|牛乳|ジュース|飲料|ワイン|ビール|パン|ご飯|麺|スープ|サラダ|食事|料理|りんご|バナナ|肉|魚|卵|チーズ|塩|砂糖|こしょう|ソース/.test(meaning)) {
    return {
      examples: [
        [`I like ${word}.`, `私は${meaning}が好きです。`],
        [`Can I have some ${word}?`, `${meaning}を少しもらえますか。`]
      ]
    };
  }

  if (/人|友だち|家族|母|父|親|子ども|赤ちゃん|男の子|女の子|男性|女性|兄弟|姉妹|息子|娘|夫|妻|先生|生徒|医者|看護師|運転手|店員|スタッフ|上司|同僚|観光客|警察官|技術者|デザイナー|所有者|リーダー|メンバー/.test(meaning)) {
    return {
      examples: [
        [`She is a ${word}.`, `彼女は${meaning}です。`],
        [`I talked to the ${word}.`, `その${meaning}と話しました。`]
      ]
    };
  }

  if (/する|使う|作る|取る|置く|欲しい|好き|思う|見る|聞く|話す|たずねる|答える|助ける|見つける|与える|送る|開ける|閉める|始める|終える|待つ|動く|歩く|走る|座る|立つ|旅行する|訪れる|戻る|買う|支払う|売る|食べる|飲む|料理する|洗う|掃除する|切る|注文する|選ぶ|着る|変える|運ぶ|持つ|書く|読む|勉強する|学ぶ|教える|忘れる|会う|確認する|予約する|到着する|出発する|休む|眠る|笑う|泣く|楽しむ|準備する|共有する|借りる|貸す/.test(meaning)) {
    return {
      examples: [
        [`I want to ${word}.`, `私は${meaning}ことをしたいです。`],
        [`Please ${word} it.`, `それを${meaning}してください。`]
      ]
    };
  }

  if (/今日|明日|昨日|朝|午後|夕方|夜|週末|休日|休暇/.test(meaning)) {
    return {
      examples: [
        [`I am busy ${word}.`, `${meaning}は忙しいです。`],
        [`Let's talk ${word}.`, `${meaning}話しましょう。`]
      ]
    };
  }

  if (/月曜日|火曜日|水曜日|木曜日|金曜日|土曜日|日曜日/.test(meaning)) {
    return {
      examples: [
        [`I have a meeting on ${word}.`, `${meaning}に会議があります。`],
        [`See you on ${word}.`, `${meaning}に会いましょう。`]
      ]
    };
  }

  if (/1月|2月|3月|4月|5月|6月|7月|8月|9月|10月|11月|12月/.test(meaning)) {
    return {
      examples: [
        [`I will go there in ${word}.`, `${meaning}にそこへ行きます。`],
        [`The event is in ${word}.`, `そのイベントは${meaning}です。`]
      ]
    };
  }

  if (/\s/.test(word)) {
    return {
      examples: [
        [`I need to check the ${word}.`, `${meaning}を確認する必要があります。`],
        [`Where is the ${word}?`, `${meaning}はどこですか。`]
      ]
    };
  }

  return {
    examples: [
      [`This is a ${word}.`, `これは${meaning}です。`],
      [`Where is the ${word}?`, `${meaning}はどこですか。`]
    ]
  };
}

function buildLocalUsageExamples(context, reason = "") {
  const answer = context.answer;
  const selectedOption = context.selectedOption || null;
  const prefix = reason ? `${reason}\n\n` : "";

  if (state.studyType === "phrase") {
    const mistakeNote = selectedOption && selectedOption.english !== answer.english
      ? `\n\n間違えた選択肢: ${selectedOption.english} = ${selectedOption.japanese}`
      : "";
    const cleanPhrase = answer.english.replace(/[.!?。！？]+$/, "");

    return `${prefix}使用例\n例1: ${answer.english}\n訳1: ${answer.japanese}\n例2: I said, "${cleanPhrase}."\n訳2: 私は「${answer.japanese}」と言いました。${mistakeNote}`;
  }

  const word = answer.english;
  const meaning = answer.japanese;
  const mistakeNote = selectedOption && selectedOption.english !== answer.english
    ? `\n\n間違えた選択肢: ${selectedOption.english} = ${selectedOption.japanese}`
    : "";
  const example = buildPracticalWordExample(word, meaning);
  const exampleLines = example.examples
    .map(([english, japanese], index) => `例${index + 1}: ${english}\n訳${index + 1}: ${japanese}`)
    .join("\n");

  return `${prefix}使用例\n${exampleLines}${mistakeNote}`;
}

function renderUsageHelpActions(container, context) {
  if (!context?.answer) {
    return;
  }

  const actions = document.createElement("span");
  actions.className = "usage-help-actions";

  const note = document.createElement("span");
  note.className = "usage-help-note";
  note.textContent = "使用例を表示できます。";

  const usageButton = document.createElement("button");
  usageButton.type = "button";
  usageButton.className = "usage-help-button";
  usageButton.textContent = "使用例を見る";

  const result = document.createElement("span");
  result.className = "usage-help-result hidden";

  usageButton.addEventListener("click", () => {
    setUsageResult(result, "ready", buildLocalUsageExamples(context));
  });

  actions.append(note, usageButton, result);
  container.appendChild(actions);
}

function buildCorrectFeedback(answer) {
  const explanation = buildItemExplanation(answer);

  if (state.studyType === "word") {
    return `
      <span class="feedback-lines">
        <strong>正解です。</strong>
        <span>${answer.english} = ${answer.japanese}</span>
        ${explanation ? `<span><strong>補足:</strong> ${explanation}</span>` : ""}
      </span>
    `;
  }

  return `
      <span class="feedback-lines">
        <strong>正解です。</strong>
        <span>${answer.english} = ${answer.japanese}</span>
        ${explanation ? `<span><strong>解説:</strong> ${explanation}</span>` : ""}
      </span>
    `;
}

function buildWrongFeedback(selectedOption, options, answer) {
  const optionMeanings = options
    .map((item) => `${item.english} = ${item.japanese}`)
    .join("<br>");
  const selectedExplanation = buildItemExplanation(selectedOption);
  const answerExplanation = buildItemExplanation(answer);

  if (state.studyType === "word") {
    return `
      <span class="feedback-lines">
        <strong>不正解です。</strong>
        <span>選んだ答え: ${selectedOption.english} = ${selectedOption.japanese}</span>
        <span>正解: ${answer.english} = ${answer.japanese}</span>
        ${answerExplanation ? `<span><strong>補足:</strong> ${answerExplanation}</span>` : ""}
        <span>選択肢の意味:</span>
        <span>${optionMeanings}</span>
      </span>
    `;
  }

  return `
    <span class="feedback-lines">
      <strong>不正解です。</strong>
      <span>選んだ答え: ${selectedOption.english} = ${selectedOption.japanese}</span>
      ${selectedExplanation ? `<span><strong>選んだ表現の解説:</strong> ${selectedExplanation}</span>` : ""}
      <span>正解: ${answer.english} = ${answer.japanese}</span>
      ${answerExplanation ? `<span><strong>正解の解説:</strong> ${answerExplanation}</span>` : ""}
      <span>選択肢の意味:</span>
      <span>${optionMeanings}</span>
    </span>
  `;
}

function buildSkipFeedback(answer) {
  const explanation = buildItemExplanation(answer);

  return `
    <span class="feedback-lines">
      <strong>この問題をスキップしました。</strong>
      <span>正解は ${answer.english} = ${answer.japanese} です。</span>
      ${explanation ? `<span><strong>${state.studyType === "word" ? "補足" : "解説"}:</strong> ${explanation}</span>` : ""}
    </span>
  `;
}

function renderCurrentQuestionUi() {
  const { answer } = state.currentQuestion;
  questionMeaning.textContent = isWordReverseMode() ? answer.english : answer.japanese;
  questionHint.textContent = isWordReverseMode()
    ? `${getCurrentCategory().description} 日本語として最も合うものを選んでください。`
    : `${getCurrentCategory().description} 英語として最も合うものを選んでください。`;
  feedbackMessage.textContent = "答えを選ぶとここに結果が表示されます。";
  feedbackMessage.className = "feedback neutral";
  nextButton.textContent = "次の問題へ";
  nextButton.classList.add("hidden");
  skipButton.disabled = false;
  choices.innerHTML = "";

  for (const option of state.currentQuestion.options) {
    const card = document.createElement("article");
    card.className = "choice-card";

    const button = document.createElement("button");
    button.type = "button";
    button.className = "choice-button";
    button.dataset.english = option.english;
    button.innerHTML = `<span class="choice-text">${isWordReverseMode() ? option.japanese : option.english}</span>`;
    button.addEventListener("click", () => submitAnswer(option, button));

    if (!isWordReverseMode()) {
      const audioButton = document.createElement("button");
      audioButton.type = "button";
      audioButton.className = "choice-audio-button";
      audioButton.textContent = "発音";
      audioButton.setAttribute("aria-label", `${option.english} の発音を聞く`);
      audioButton.addEventListener("click", (event) => {
        event.stopPropagation();
        speakNow(option.english, "en-US", 0.75);
      });

      card.append(button, audioButton);
    } else {
      card.append(button);
    }
    choices.appendChild(card);
  }
}

function createQuestion() {
  previousAnswerCard.classList.add("hidden");

  if (state.quizSession.breakPending || state.quizSession.stopped) {
    renderSessionSummary();
    state.currentQuestion = null;
    state.answered = true;
    questionMeaning.textContent = `${state.quizSession.size}問ごとのふり返り`;
    questionHint.textContent = "結果を見て、次の10問へ進むかここで一区切りにするか選んでください。";
    choices.innerHTML = "";
    nextButton.classList.add("hidden");
    skipButton.disabled = true;
    feedbackMessage.textContent = "10問ごとに正答率を確認できます。";
    feedbackMessage.className = "feedback neutral";
    return;
  }

  hideSessionSummary();

  const studyWords = getQuestionPool();
  if (!studyWords.length) {
    if (state.reviewMode) {
      state.reviewMode = null;
      feedbackMessage.textContent = "復習対象は完了しました。通常学習に戻ります。";
      feedbackMessage.className = "feedback correct";
    }
    renderQuizCompletion();
    return;
  }

  const answer = pickWeightedWord(studyWords);
  if (!answer) {
    renderQuizCompletion();
    return;
  }

  touchWord(answer);

  state.currentQuestion = {
    answer,
    options: buildOptions(answer)
  };
  state.answered = false;

  renderCurrentQuestionUi();
}

function setMode(mode) {
  state.mode = mode;
  const isQuiz = mode === "quiz";

  quizTab.classList.toggle("active", isQuiz);
  walkTab.classList.toggle("active", !isQuiz);
  quizTab.setAttribute("aria-selected", String(isQuiz));
  walkTab.setAttribute("aria-selected", String(!isQuiz));
  quizPanel.classList.toggle("hidden", !isQuiz);
  walkPanel.classList.toggle("hidden", isQuiz);

  if (isQuiz) {
    stopWalking(true);
  }

  updateHeroSummary();
}

function submitAnswer(option, selectedButton) {
  if (state.answered || !state.currentQuestion) {
    return;
  }

  state.answered = true;
  skipButton.disabled = true;

  const progress = getCategoryProgress();
  const answer = state.currentQuestion.answer;
  const answerRecord = getWordRecord(answer);
  const isCorrect = option.english === answer.english;
  state.previousQuestion = {
    answer,
    options: state.currentQuestion.options
  };

  progress.attempts += 1;
  answerRecord.attempts += 1;
  recordStudyActivity("quiz");

  for (const button of choices.querySelectorAll(".choice-button")) {
    button.disabled = true;

    if (button.dataset.english === answer.english) {
      button.classList.add("correct");
    } else if (button === selectedButton && !isCorrect) {
      button.classList.add("wrong");
    }
  }

  if (isCorrect) {
    progress.correct += 1;
    answerRecord.correct += 1;
    answerRecord.streak += 1;
    if (answerRecord.reviewDue) {
      answerRecord.reviewStreak += 1;
      if (answerRecord.reviewStreak >= 3) {
        answerRecord.reviewDue = false;
      }
    }
    const correctFeedback = buildCorrectFeedback(answer);
    feedbackMessage.innerHTML = correctFeedback;
    feedbackMessage.className = "feedback correct";
    state.lastAnswer = {
      html: correctFeedback,
      className: "correct",
      usageContext: { answer }
    };
    renderUsageHelpActions(feedbackMessage, state.lastAnswer.usageContext);
    completeQuizSessionItem("correct");
  } else {
    answerRecord.wrong += 1;
    answerRecord.streak = 0;
    answerRecord.reviewDue = true;
    answerRecord.reviewStreak = 0;
    const wrongKey = getWordKey(answer);
    if (!state.quizSession.wrongItems.includes(wrongKey)) {
      state.quizSession.wrongItems.push(wrongKey);
    }
    const wrongFeedback = buildWrongFeedback(option, state.currentQuestion.options, answer);
    feedbackMessage.innerHTML = wrongFeedback;
    feedbackMessage.className = "feedback wrong";
    state.lastAnswer = {
      html: wrongFeedback,
      className: "wrong",
      usageContext: { answer, selectedOption: option }
    };
    renderUsageHelpActions(feedbackMessage, state.lastAnswer.usageContext);
    completeQuizSessionItem("wrong");
  }

  nextButton.textContent = state.quizSession.breakPending ? "10問の結果を見る" : "次の問題へ";
  nextButton.classList.remove("hidden");

  saveProfiles();
  updateSnapshot();
  renderPreviousAnswerState();
  rebuildWalkingQueue();
  updateWalkingDisplay();
}

function skipCurrentQuestion() {
  if (state.answered || !state.currentQuestion) {
    return;
  }

  const answer = state.currentQuestion.answer;
  const skipFeedback = buildSkipFeedback(answer);
  state.lastAnswer = {
    html: skipFeedback,
    className: "neutral",
    usageContext: { answer }
  };
  renderPreviousAnswerState();
  completeQuizSessionItem("skip");
  saveProfiles();
  updateSnapshot();
  createQuestion();
}

function rebuildWalkingQueue() {
  const studyWords = getStudyItems();
  state.walking.position = 0;

  if (!studyWords.length) {
    state.walking.queue = [];
    return;
  }

  if (state.settings.walkStrategy === "unseen") {
    const unseen = studyWords.filter((word) => getWordRecord(word).attempts === 0);
    state.walking.queue = shuffle(unseen.length ? unseen : studyWords);
    return;
  }

  if (state.settings.walkStrategy === "random") {
    state.walking.queue = shuffle([...studyWords]);
    return;
  }

  const expanded = [];

  for (const word of studyWords) {
    const repeats = Math.min(6, Math.max(1, Math.round(getWordWeight(word) / 2)));
    for (let index = 0; index < repeats; index += 1) {
      expanded.push(word);
    }
  }

  state.walking.queue = shuffle(expanded);
}

function getWalkingStrategyLabel() {
  switch (state.settings.walkStrategy) {
    case "unseen":
      return "未学習を優先";
    case "random":
      return "ランダム";
    default:
      return "苦手を優先";
  }
}

function updateWalkingDisplay() {
  if (!state.walking.queue.length) {
    walkWord.textContent = "level complete";
    walkMeaning.textContent = "このレベルは3連続正解で学習完了です。別のレベルに切り替えるか、記録をリセットしてもう一度学習できます。";
    return;
  }

  const current = state.walking.queue[state.walking.position] ?? state.walking.queue[0];
  walkWord.textContent = current.english;
  walkMeaning.textContent = `${current.japanese} を音読しながら覚えましょう。`;
}

function speak(text, lang, rate) {
  return new Promise((resolve) => {
    if (!("speechSynthesis" in window)) {
      resolve(false);
      return;
    }

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = lang;
    utterance.rate = rate;
    utterance.onend = () => resolve(true);
    utterance.onerror = () => resolve(false);
    speechSynthesis.speak(utterance);
  });
}

function speakNow(text, lang = "en-US", rate = state.settings.speed) {
  if (!("speechSynthesis" in window)) {
    window.alert("このブラウザでは読み上げ機能が使えません。");
    return;
  }

  if (state.walking.active) {
    window.alert("ウォーキング再生中は自動読み上げが優先です。止めてから発音ボタンを使ってください。");
    return;
  }

  speechSynthesis.cancel();
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = lang;
  utterance.rate = rate;
  speechSynthesis.speak(utterance);
  recordStudyActivity("play");
  saveProfiles();
  updateSnapshot();
}

function wait(ms) {
  return new Promise((resolve) => {
    window.setTimeout(resolve, ms);
  });
}

async function requestScreenWakeLock() {
  if (!state.wakeLock.supported || !window.isSecureContext || document.hidden) {
    return false;
  }

  try {
    if (state.wakeLock.sentinel?.released === false) {
      return true;
    }

    state.wakeLock.sentinel = await navigator.wakeLock.request("screen");
    state.wakeLock.sentinel.addEventListener("release", () => {
      state.wakeLock.sentinel = null;
    });
    return true;
  } catch {
    state.wakeLock.sentinel = null;
    return false;
  }
}

async function releaseScreenWakeLock() {
  if (!state.wakeLock.sentinel) {
    return;
  }

  try {
    await state.wakeLock.sentinel.release();
  } catch {
    // ignore release failures
  }

  state.wakeLock.sentinel = null;
}

async function runWalking(token) {
  if (!("speechSynthesis" in window)) {
    walkBadge.textContent = "音声非対応";
    walkMeaning.textContent = "このブラウザでは読み上げ機能が使えません。";
    state.walking.active = false;
    await releaseScreenWakeLock();
    return;
  }

  if (!state.walking.queue.length) {
    walkBadge.textContent = "完了";
    updateWalkingDisplay();
    state.walking.active = false;
    await releaseScreenWakeLock();
    return;
  }

  walkBadge.textContent = state.wakeLock.sentinel ? "再生中 / 画面オン" : "再生中";

  while (state.walking.active && token === state.walking.token) {
    if (!state.walking.queue.length) {
      break;
    }

    if (state.walking.position >= state.walking.queue.length) {
      rebuildWalkingQueue();
      if (!state.walking.queue.length) {
        break;
      }
    }

    const current = state.walking.queue[state.walking.position];
    walkWord.textContent = current.english;
    walkMeaning.textContent = current.japanese;

    await speak(current.english, "en-US", state.settings.speed);
    if (!state.walking.active || token !== state.walking.token) {
      break;
    }

    await wait(350);
    await speak(current.japanese, "ja-JP", state.settings.speed);
    if (!state.walking.active || token !== state.walking.token) {
      break;
    }

    await wait(state.settings.gap * 1000);
    state.walking.position += 1;
    recordStudyActivity("play");
    saveProfiles();
    updateSnapshot();
  }

  if (!state.walking.active) {
    walkBadge.textContent = "停止中";
  }

  await releaseScreenWakeLock();
}

async function startWalking() {
  rebuildWalkingQueue();

  if (!state.walking.queue.length) {
    walkBadge.textContent = "完了";
    updateWalkingDisplay();
    return;
  }

  stopWalking(false);
  state.walking.active = true;
  state.walking.token += 1;
  const wakeLockEnabled = await requestScreenWakeLock();
  walkBadge.textContent = wakeLockEnabled ? "再生準備 / 画面オン" : "再生準備";
  runWalking(state.walking.token);
}

function stopWalking(resetBadge = true) {
  state.walking.active = false;
  state.walking.token += 1;

  if ("speechSynthesis" in window) {
    speechSynthesis.cancel();
  }

  if (resetBadge) {
    walkBadge.textContent = "停止中";
  }

  releaseScreenWakeLock();
}

function resetWalking() {
  stopWalking(true);
  rebuildWalkingQueue();
  updateWalkingDisplay();
}

function syncControls() {
  walkStrategySelect.value = state.settings.walkStrategy;
  speedSelect.value = String(state.settings.speed);
  gapRange.value = String(state.settings.gap);
  gapValue.textContent = `${state.settings.gap}秒`;
  applyTheme();
}

function applyTheme() {
  const isDark = state.settings.theme === "dark";
  document.body.classList.toggle("dark-mode", isDark);
  themeToggleButton.textContent = isDark ? "ライトモード" : "ダークモード";
}

function toggleTheme() {
  state.settings.theme = state.settings.theme === "dark" ? "light" : "dark";
  saveSettings();
  applyTheme();
}

function setStudyType(studyType, answerMode = "jpToEn") {
  if (state.studyType === studyType && state.answerMode === answerMode) {
    return;
  }

  stopWalking(true);
  state.studyType = studyType;
  state.answerMode = studyType === "word" ? answerMode : "jpToEn";
  state.reviewMode = null;
  state.category = Object.keys(getCurrentCollection())[0];
  resetLearningFlow();
  renderAll();
}

async function registerProfile(id, password) {
  const normalized = normalizeProfileId(id);

  if (!normalized) {
    window.alert("ID を入力してください。");
    return false;
  }

  if (normalized === ADMIN_ID) {
    window.alert("このIDは管理者専用です。別のIDを入力してください。");
    return false;
  }

  if (!isValidProfileId(normalized)) {
    window.alert("ID は6文字以上で入力してください。英字だけ、数字だけ、記号入りでも使えます。");
    return false;
  }

  if (!isValidPassword(password)) {
    window.alert("パスワードは 6 文字以上で入力してください。");
    return false;
  }

  if (state.profiles[normalized]) {
    window.alert("そのIDはすでに登録されています。別のIDを使うかログインしてください。");
    return false;
  }

  const confirmed = window.confirm(`ID「${normalized}」を新規登録します。よろしいですか？`);
  if (!confirmed) {
    return false;
  }

  stopWalking(true);
  state.profiles[normalized] = createEmptyProfile(normalized);
  state.profiles[normalized].passwordHash = await sha256(password);
  state.profiles[normalized].role = "user";
  state.activeProfileId = normalized;
  state.role = "user";
  resetLearningFlow();
  ensureActiveProfile();
  saveProfiles();
  renderAll();
  return true;
}

async function resumeProfile(id, password) {
  const normalized = normalizeProfileId(id);

  if (!normalized) {
    window.alert("ログインするIDを入力してください。");
    return false;
  }

  if (!isValidPassword(password)) {
    window.alert("ログインにはパスワードを入力してください。");
    return false;
  }

  const enteredIdHash = await sha256(normalized);
  const enteredPasswordHash = await sha256(password);

  if (enteredIdHash === ADMIN_ID_HASH && enteredPasswordHash === ADMIN_PASSWORD_HASH) {
    stopWalking(true);
    state.activeProfileId = ADMIN_ID;
    state.role = "admin";
    resetLearningFlow();
    ensureAdminProfile();
    ensureActiveProfile();
    renderAll();
    return true;
  }

  if (!state.profiles[normalized]) {
    window.alert("そのIDの学習記録が見つかりません。新規登録してください。");
    return false;
  }

  if (state.profiles[normalized].passwordHash && state.profiles[normalized].passwordHash !== enteredPasswordHash) {
    window.alert("ID またはパスワードが違います。");
    return false;
  }

  stopWalking(true);
  state.activeProfileId = normalized;
  state.role = state.profiles[normalized].role || "user";
  resetLearningFlow();
  ensureActiveProfile();
  saveProfiles();
  renderAll();
  return true;
}

async function resetCurrentProfile() {
  const password = profilePasswordInput.value;

  if (!isValidPassword(password)) {
    window.alert("このIDの学習履歴をリセットするには、現在のパスワードを入力してください。");
    return;
  }

  const confirmed = window.confirm(`ID「${state.activeProfileId}」の学習履歴をリセットします。正解数や進捗保存も初期化されます。よろしいですか？`);
  if (!confirmed) {
    return;
  }

  const profile = state.profiles[state.activeProfileId];
  if (!profile) {
    return;
  }

  const passwordHash = await sha256(password);
  if (profile.passwordHash && profile.passwordHash !== passwordHash) {
    window.alert("パスワードが違うため、このIDの学習履歴をリセットできません。");
    return;
  }

  stopWalking(true);
  state.profiles[state.activeProfileId] = createEmptyProfile(state.activeProfileId);
  state.profiles[state.activeProfileId].passwordHash = passwordHash;
  state.profiles[state.activeProfileId].role = profile.role || "user";
  resetLearningFlow();
  saveProfiles();
  renderAll();
}

function deleteSelectedAccount() {
  if (!(state.role === "admin" && state.activeProfileId === ADMIN_ID)) {
    window.alert("管理者のみ実行できます。");
    return;
  }

  const target = adminAccountSelect.value;
  if (!target) {
    window.alert("削除するアカウントを選んでください。");
    return;
  }

  const confirmed = window.confirm(`アカウント「${target}」を削除します。よろしいですか？`);
  if (!confirmed) {
    return;
  }

  delete state.profiles[target];
  saveProfiles();
  renderAll();
}

function renderAll() {
  ensureValidCategory();
  renderProfiles();
  renderAdminPanel();
  renderStudyTypeTabs();
  renderCategories();
  updateSnapshot();
  rebuildWalkingQueue();
  createQuestion();
  updateWalkingDisplay();
  renderPreviousAnswerState();
  syncControls();
  setMode(state.mode);
  updateHeroSummary();
}

quizTab.addEventListener("click", () => setMode("quiz"));
walkTab.addEventListener("click", () => setMode("walk"));
wordTypeTab.addEventListener("click", () => setStudyType("word", "jpToEn"));
wordReverseTypeTab.addEventListener("click", () => setStudyType("word", "enToJp"));
phraseTypeTab.addEventListener("click", () => setStudyType("phrase"));
skipButton.addEventListener("click", () => skipCurrentQuestion());
nextButton.addEventListener("click", () => createQuestion());
showPreviousAnswerButton.addEventListener("click", () => restorePreviousQuestion());
sessionContinueButton.addEventListener("click", () => continueQuizSession());
sessionReviewWrongButton.addEventListener("click", () => startSessionWrongReview());
sessionStopButton.addEventListener("click", () => stopQuizSessionBreak());
reviewMistakesButton.addEventListener("click", () => startMistakesReview());
themeToggleButton.addEventListener("click", () => toggleTheme());

registerProfileButton.addEventListener("click", async () => {
  if (await registerProfile(profileIdInput.value, profilePasswordInput.value)) {
    profileIdInput.value = "";
    profilePasswordInput.value = "";
  }
});

resumeProfileButton.addEventListener("click", async () => {
  if (await resumeProfile(profileIdInput.value, profilePasswordInput.value)) {
    profileIdInput.value = "";
    profilePasswordInput.value = "";
  }
});

resetProfileButton.addEventListener("click", () => {
  resetCurrentProfile();
});

deleteAccountButton.addEventListener("click", () => {
  deleteSelectedAccount();
});

walkStrategySelect.addEventListener("change", (event) => {
  state.settings.walkStrategy = event.target.value;
  saveSettings();
  rebuildWalkingQueue();
  updateSnapshot();
  updateWalkingDisplay();
});

speedSelect.addEventListener("change", (event) => {
  state.settings.speed = Number(event.target.value);
  saveSettings();
});

gapRange.addEventListener("input", (event) => {
  state.settings.gap = Number(event.target.value);
  gapValue.textContent = `${state.settings.gap}秒`;
  saveSettings();
});

walkStartButton.addEventListener("click", () => {
  setMode("walk");
  startWalking();
});

walkStopButton.addEventListener("click", () => {
  stopWalking(true);
});

walkResetButton.addEventListener("click", () => {
  resetWalking();
});

walkReplayButton.addEventListener("click", () => {
  speakNow(walkWord.textContent, "en-US");
});

document.addEventListener("visibilitychange", () => {
  if (document.hidden) {
    stopWalking(true);
    return;
  }

  if (state.walking.active) {
    requestScreenWakeLock();
  }
});

renderAll();
