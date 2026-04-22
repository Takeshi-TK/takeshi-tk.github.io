import { vocabulary } from "./vocabulary.js";
import { phrases } from "./phrases.js";

const PROFILES_KEY = "stridewords-profiles-v3";
const ACTIVE_PROFILE_KEY = "stridewords-active-profile-v3";
const ACTIVE_ROLE_KEY = "stridewords-active-role-v3";
const SETTINGS_KEY = "stridewords-settings-v3";
const PROFILE_ID_PATTERN = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[^A-Za-z0-9]).{6,40}$/;
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
const activeWordCount = document.querySelector("#activeWordCount");
const masteredWordCount = document.querySelector("#masteredWordCount");
const wordCount = document.querySelector("#wordCount");
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
const phraseTypeTab = document.querySelector("#phraseTypeTab");
const quizPanel = document.querySelector("#quizPanel");
const walkPanel = document.querySelector("#walkPanel");
const quizHeading = document.querySelector("#quizHeading");
const quizPoolBadge = document.querySelector("#quizPoolBadge");
const questionMeaning = document.querySelector("#questionMeaning");
const questionHint = document.querySelector("#questionHint");
const choices = document.querySelector("#choices");
const feedbackMessage = document.querySelector("#feedbackMessage");
const nextButton = document.querySelector("#nextButton");
const skipButton = document.querySelector("#skipButton");
const showPreviousAnswerButton = document.querySelector("#showPreviousAnswerButton");
const previousAnswerCard = document.querySelector("#previousAnswerCard");
const previousAnswerBody = document.querySelector("#previousAnswerBody");
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
const wordBankTitle = document.querySelector("#wordBankTitle");
const wordBankCount = document.querySelector("#wordBankCount");
const wordSearchInput = document.querySelector("#wordSearchInput");
const wordBankList = document.querySelector("#wordBankList");

const state = {
  studyType: "word",
  category: "beginner",
  mode: "quiz",
  filter: "",
  currentQuestion: null,
  lastAnswer: null,
  answered: false,
  nextQuestionTimer: null,
  exposureCounter: 1,
  profiles: loadProfiles(),
  activeProfileId: loadActiveProfileId(),
  role: loadActiveRole(),
  settings: loadSettings(),
  wakeLock: {
    sentinel: null,
    supported: "wakeLock" in navigator
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
    words: {}
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
  const fallback = { speed: 1.0, gap: 2, walkStrategy: "weak" };

  try {
    const saved = JSON.parse(localStorage.getItem(SETTINGS_KEY));
    return {
      speed: Number(saved?.speed ?? fallback.speed),
      gap: Number(saved?.gap ?? fallback.gap),
      walkStrategy: String(saved?.walkStrategy ?? fallback.walkStrategy)
    };
  } catch {
    return fallback;
  }
}

function saveSettings() {
  localStorage.setItem(SETTINGS_KEY, JSON.stringify(state.settings));
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
    // Ignore release failures and clear local state either way.
  }

  state.wakeLock.sentinel = null;
}

function ensureActiveProfile() {
  if (!state.profiles[state.activeProfileId]) {
    state.profiles[state.activeProfileId] = createEmptyProfile(state.activeProfileId);
  }

  const profile = state.profiles[state.activeProfileId];

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

function getCurrentCollection() {
  return datasets[state.studyType];
}

function getCurrentCategory() {
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
  return profile.categories[getProgressKey(category, studyType)];
}

function getWordKey(word, category = state.category) {
  return `${state.studyType}::${category}::${word.english}::${word.japanese}`;
}

function getWordRecord(word, category = state.category) {
  const profile = getActiveProfile();
  const key = getWordKey(word, category);

  if (!profile.words[key]) {
    profile.words[key] = {
      attempts: 0,
      correct: 0,
      wrong: 0,
      streak: 0,
      lastSeen: 0
    };
  }

  return profile.words[key];
}

function isMastered(word, category = state.category) {
  return getWordRecord(word, category).streak >= 3;
}

function getStudyItems(category = state.category) {
  return getCurrentCollection()[category].words.filter((word) => !isMastered(word, category));
}

function getFilteredItems() {
  const filter = state.filter.trim().toLowerCase();
  const words = [...getCurrentItems()];

  words.sort((left, right) => getWordPriority(right) - getWordPriority(left));

  if (!filter) {
    return words;
  }

  return words.filter((word) => {
    return (
      word.english.toLowerCase().includes(filter) ||
      word.japanese.toLowerCase().includes(filter)
    );
  });
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

function clearNextQuestionTimer() {
  if (state.nextQuestionTimer) {
    window.clearTimeout(state.nextQuestionTimer);
    state.nextQuestionTimer = null;
  }
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

  adminStatusText.textContent = "account control";
  adminAccountSelect.innerHTML = "";

  const ids = Object.keys(state.profiles)
    .filter((id) => id !== ADMIN_ID)
    .sort((left, right) => left.localeCompare(right, "ja"));

  adminStatusText.textContent = `${ids.length} account${ids.length === 1 ? "" : "s"}`;

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
  const isWord = state.studyType === "word";
  wordTypeTab.classList.toggle("active", isWord);
  phraseTypeTab.classList.toggle("active", !isWord);
  wordTypeTab.setAttribute("aria-selected", String(isWord));
  phraseTypeTab.setAttribute("aria-selected", String(!isWord));
}

function renderCategories() {
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
      clearNextQuestionTimer();
      state.category = key;
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
  const masteredWords = totalWords - activeWords;
  const studyMeta = studyTypeMeta[state.studyType];

  correctCount.textContent = String(progress.correct);
  attemptCount.textContent = String(attempts);
  accuracyRate.textContent = `${accuracy}%`;
  accuracyBar.style.width = `${accuracy}%`;
  activeWordCount.textContent = String(activeWords);
  masteredWordCount.textContent = String(masteredWords);
  wordCount.textContent = String(totalWords);

  quizHeading.textContent = `${category.label} ${studyMeta.label}クイズ`;
  quizPoolBadge.textContent = activeWords
    ? `出題対象 ${activeWords}${studyMeta.countLabel}`
    : "出題対象なし";

  walkLevelName.textContent = category.label;
  walkLevelCount.textContent = activeWords
    ? `${activeWords}${studyMeta.countLabel}`
    : "完了";
  walkPriorityText.textContent = activeWords
    ? getWalkingStrategyLabel()
    : "このレベルは完了";

  if (wordBankTitle) {
    wordBankTitle.textContent = `${category.label}で学べる${studyMeta.label}一覧`;
  }
}

function renderQuizCompletion() {
  state.currentQuestion = null;
  state.answered = true;
  questionMeaning.textContent = "このレベルは3連続正解で完了しました";
  questionHint.textContent = "別のレベルや別の学習対象に切り替えるか、この ID の学習履歴をリセットしてください。";
  feedbackMessage.textContent = `この ID では現在、出題対象の${studyTypeMeta[state.studyType].zeroText}がありません。`;
  feedbackMessage.className = "feedback neutral";
  choices.innerHTML = "";
  nextButton.classList.add("hidden");
  skipButton.disabled = true;
}

function renderPreviousAnswerState() {
  showPreviousAnswerButton.disabled = !state.lastAnswer;
  if (!state.lastAnswer) {
    previousAnswerBody.textContent = "前回の回答はまだありません。";
    previousAnswerBody.className = "feedback neutral";
  }
}

function showPreviousAnswer() {
  if (!state.lastAnswer) {
    return;
  }

  previousAnswerBody.innerHTML = state.lastAnswer.html;
  previousAnswerBody.className = `feedback ${state.lastAnswer.className}`;
  previousAnswerCard.classList.toggle("hidden");
}

function buildItemExplanation(item) {
  const categoryLabel = getCurrentCategory().label;

  if (state.studyType === "phrase") {
    return `このフレーズは「${item.japanese}」という意味で、${categoryLabel}レベルの実用会話でそのまま使いやすい表現です。`;
  }

  return `「${item.english}」は「${item.japanese}」を表す${categoryLabel}レベルの基本語で、会話や文章の中でよく使います。`;
}

function buildCorrectFeedback(answer) {
  return `
    <span class="feedback-lines">
      <strong>正解です。</strong>
      <span>${answer.english} = ${answer.japanese}</span>
      <span>${buildItemExplanation(answer)}</span>
    </span>
  `;
}

function createQuestion() {
  clearNextQuestionTimer();
  previousAnswerCard.classList.add("hidden");

  const studyWords = getStudyItems();
  if (!studyWords.length) {
    renderQuizCompletion();
    return;
  }

  const answer = pickWeightedWord(studyWords);
  if (!answer) {
    renderQuizCompletion();
    return;
  }

  touchWord(answer);

  const distractors = shuffle(
    getCurrentItems().filter((word) => word.english !== answer.english)
  ).slice(0, 3);

  state.currentQuestion = {
    answer,
    options: shuffle([answer, ...distractors])
  };
  state.answered = false;

  questionMeaning.textContent = answer.japanese;
  questionHint.textContent = `${getCurrentCategory().description}。意味に合う${studyTypeMeta[state.studyType].label}を選んでください。`;
  feedbackMessage.textContent = "答えを選ぶとここに結果が表示されます。";
  feedbackMessage.className = "feedback neutral";
  nextButton.classList.add("hidden");
  skipButton.disabled = false;

  choices.innerHTML = "";
  for (const option of state.currentQuestion.options) {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "choice-button";
    button.textContent = option.english;
    button.addEventListener("click", () => submitAnswer(option, button));
    choices.appendChild(button);
  }
}

function renderWordBank() {
  if (!wordBankCount || !wordBankList) {
    return;
  }

  const words = getFilteredItems();
  const total = getCurrentItems().length;
  const studyMeta = studyTypeMeta[state.studyType];

  wordBankCount.textContent = state.filter
    ? `${words.length} / ${total}${studyMeta.countLabel}`
    : `${total}${studyMeta.countLabel}を表示中`;

  wordBankList.innerHTML = "";

  if (!words.length) {
    const empty = document.createElement("article");
    empty.className = "word-chip";
    empty.innerHTML = "<strong>一致する単語がありません</strong><span>別のキーワードで試してください。</span>";
    wordBankList.appendChild(empty);
    return;
  }

  for (const word of words) {
    const record = getWordRecord(word);
    const status = getWordStatus(record);
    const chip = document.createElement("article");
    chip.className = "word-chip";
    chip.innerHTML = `
      <div class="word-chip-header">
        <strong>${word.english}</strong>
        <span class="word-status ${status.className}">${status.label}</span>
      </div>
      <span>${word.japanese}</span>
      <small>連続正解 ${record.streak}回 / ミス ${record.wrong}回 / 学習 ${record.attempts}回</small>
    `;
    wordBankList.appendChild(chip);
  }
}

function getWordStatus(record) {
  if (record.streak >= 3) {
    return { label: "完了", className: "mastered" };
  }
  if (!record.attempts) {
    return { label: "未学習", className: "new" };
  }
  if (record.wrong >= 2 && record.streak === 0) {
    return { label: "苦手", className: "weak" };
  }
  return { label: `連続正解 ${record.streak}`, className: "progress" };
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
}

function submitAnswer(option, selectedButton) {
  if (state.answered || !state.currentQuestion) {
    return;
  }

  clearNextQuestionTimer();
  state.answered = true;
  skipButton.disabled = true;

  const progress = getCategoryProgress();
  const answer = state.currentQuestion.answer;
  const answerRecord = getWordRecord(answer);
  const isCorrect = option.english === answer.english;

  progress.attempts += 1;
  answerRecord.attempts += 1;

  for (const button of choices.querySelectorAll(".choice-button")) {
    button.disabled = true;
    if (button.textContent === answer.english) {
      button.classList.add("correct");
    } else if (button === selectedButton && !isCorrect) {
      button.classList.add("wrong");
    }
  }

  if (isCorrect) {
    progress.correct += 1;
    answerRecord.correct += 1;
    answerRecord.streak += 1;
    const correctFeedback = buildCorrectFeedback(answer);
    feedbackMessage.innerHTML = correctFeedback;
    feedbackMessage.className = "feedback correct";
    nextButton.classList.remove("hidden");
    state.lastAnswer = {
      html: correctFeedback,
      className: "correct"
    };
  } else {
    answerRecord.wrong += 1;
    answerRecord.streak = 0;
    const wrongFeedback = buildWrongFeedback(option, state.currentQuestion.options, answer);
    feedbackMessage.innerHTML = wrongFeedback;
    feedbackMessage.className = "feedback wrong";
    nextButton.classList.remove("hidden");
    state.lastAnswer = {
      html: wrongFeedback,
      className: "wrong"
    };
  }

  saveProfiles();
  updateSnapshot();
  renderWordBank();
  renderPreviousAnswerState();
  rebuildWalkingQueue();
  updateWalkingDisplay();
}

function buildWrongFeedback(selectedOption, options, answer) {
  const optionMeanings = options
    .map((item) => `${item.english} = ${item.japanese}`)
    .join("<br>");

  return `
    <span class="feedback-lines">
      <strong>不正解です。</strong>
      <span>選んだ ${selectedOption.english} は「${selectedOption.japanese}」でした。</span>
      <span>${buildItemExplanation(selectedOption)}</span>
      <span>正解は ${answer.english} = ${answer.japanese} です。</span>
      <span>${buildItemExplanation(answer)}</span>
      <span>選択肢の意味:</span>
      <span>${optionMeanings}</span>
    </span>
  `;
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
      return "初見優先";
    case "random":
      return "完全ランダム";
    default:
      return "苦手優先";
  }
}

function updateWalkingDisplay() {
  if (!state.walking.queue.length) {
    walkWord.textContent = "level complete";
    walkMeaning.textContent = "このレベルは3連続正解で完了しています。別のレベルに切り替えるか、学習履歴をリセットしてください。";
    return;
  }

  const current = state.walking.queue[state.walking.position] ?? state.walking.queue[0];
  walkWord.textContent = current.english;
  walkMeaning.textContent = `${current.japanese} を英語と日本語で順に再生します。`;
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

function wait(ms) {
  return new Promise((resolve) => {
    window.setTimeout(resolve, ms);
  });
}

async function runWalking(token) {
  if (!("speechSynthesis" in window)) {
    walkBadge.textContent = "未対応ブラウザ";
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

  walkBadge.textContent = state.wakeLock.sentinel ? "再生中・画面オン維持" : "再生中";

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
  }

  if (!state.walking.active) {
    walkBadge.textContent = "待機中";
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
  walkBadge.textContent = wakeLockEnabled ? "再生準備・画面オン維持" : "再生準備";
  runWalking(state.walking.token);
}

function stopWalking(resetBadge = true) {
  state.walking.active = false;
  state.walking.token += 1;

  if ("speechSynthesis" in window) {
    speechSynthesis.cancel();
  }

  if (resetBadge) {
    walkBadge.textContent = "待機中";
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
  speedSelect.value = state.settings.speed.toFixed(1);
  gapRange.value = String(state.settings.gap);
  gapValue.textContent = `${state.settings.gap}秒`;
}

function setStudyType(studyType) {
  if (state.studyType === studyType) {
    return;
  }

  clearNextQuestionTimer();
  stopWalking(true);
  state.studyType = studyType;
  state.filter = "";
  if (wordSearchInput) {
    wordSearchInput.value = "";
  }
  state.lastAnswer = null;
  previousAnswerCard.classList.add("hidden");
  renderAll();
}

async function registerProfile(id, password) {
  const normalized = normalizeProfileId(id);
  if (!normalized) {
    window.alert("ID を入力してください。");
    return false;
  }

  if (normalized === ADMIN_ID) {
    window.alert("この ID は管理者専用です。ログインから入ってください。");
    return false;
  }

  if (!isValidProfileId(normalized)) {
    window.alert("ID は英字・数字・記号をすべて含む 6 文字以上で作成してください。");
    return false;
  }

  if (!isValidPassword(password)) {
    window.alert("パスワードは 6 文字以上で入力してください。");
    return false;
  }

  if (state.profiles[normalized]) {
    window.alert("この ID はすでに登録されています。別の ID を使うか、「既存 ID で再開」を使ってください。");
    return false;
  }

  const confirmed = window.confirm(`ID「${normalized}」を新規作成します。これで良いですか？`);
  if (!confirmed) {
    return false;
  }

  clearNextQuestionTimer();
  stopWalking(true);
  state.profiles[normalized] = createEmptyProfile(normalized);
  state.profiles[normalized].passwordHash = await sha256(password);
  state.profiles[normalized].role = "user";
  state.activeProfileId = normalized;
  state.role = "user";
  state.lastAnswer = null;
  previousAnswerCard.classList.add("hidden");
  ensureActiveProfile();
  saveProfiles();
  renderAll();
  return true;
}

async function resumeProfile(id, password) {
  const normalized = normalizeProfileId(id);
  if (!normalized) {
    window.alert("再開したい ID を入力してください。");
    return false;
  }

  if (!isValidPassword(password)) {
    window.alert("再開するにはパスワードを入力してください。");
    return false;
  }

  const enteredIdHash = await sha256(normalized);
  const enteredPasswordHash = await sha256(password);
  if (enteredIdHash === ADMIN_ID_HASH && enteredPasswordHash === ADMIN_PASSWORD_HASH) {
    clearNextQuestionTimer();
    stopWalking(true);
    state.activeProfileId = ADMIN_ID;
    state.role = "admin";
    state.lastAnswer = null;
    previousAnswerCard.classList.add("hidden");
    ensureAdminProfile();
    ensureActiveProfile();
    renderAll();
    return true;
  }

  if (!state.profiles[normalized]) {
    window.alert("このブラウザにはその ID の学習履歴がありません。公開版で共有運用する場合は、サーバー側の会員管理が必要です。");
    return false;
  }

  const passwordHash = enteredPasswordHash;
  if (state.profiles[normalized].passwordHash && state.profiles[normalized].passwordHash !== passwordHash) {
    window.alert("ID またはパスワードが違います。");
    return false;
  }

  clearNextQuestionTimer();
  stopWalking(true);
  state.activeProfileId = normalized;
  state.role = state.profiles[normalized].role || "user";
  state.lastAnswer = null;
  previousAnswerCard.classList.add("hidden");
  ensureActiveProfile();
  saveProfiles();
  renderAll();
  return true;
}

async function resetCurrentProfile() {
  const password = profilePasswordInput.value;
  if (!isValidPassword(password)) {
    window.alert("リセットするには現在のパスワードを入力してください。");
    return;
  }

  const confirmed = window.confirm(
    `ID「${state.activeProfileId}」の学習履歴をリセットします。よろしいですか？`
  );

  if (!confirmed) {
    return;
  }

  const profile = state.profiles[state.activeProfileId];
  if (!profile) {
    return;
  }

  const passwordHash = await sha256(password);
  if (profile.passwordHash && profile.passwordHash !== passwordHash) {
    window.alert("パスワードが違うためリセットできません。");
    return;
  }

  clearNextQuestionTimer();
  stopWalking(true);
  state.profiles[state.activeProfileId] = createEmptyProfile(state.activeProfileId);
  state.profiles[state.activeProfileId].passwordHash = passwordHash;
  state.profiles[state.activeProfileId].role = profile.role || "user";
  state.lastAnswer = null;
  previousAnswerCard.classList.add("hidden");
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
  renderProfiles();
  renderAdminPanel();
  renderStudyTypeTabs();
  renderCategories();
  updateSnapshot();
  rebuildWalkingQueue();
  createQuestion();
  updateWalkingDisplay();
  renderWordBank();
  renderPreviousAnswerState();
  syncControls();
}

quizTab.addEventListener("click", () => setMode("quiz"));
walkTab.addEventListener("click", () => setMode("walk"));
wordTypeTab.addEventListener("click", () => setStudyType("word"));
phraseTypeTab.addEventListener("click", () => setStudyType("phrase"));
skipButton.addEventListener("click", () => createQuestion());
nextButton.addEventListener("click", () => createQuestion());
showPreviousAnswerButton.addEventListener("click", () => showPreviousAnswer());

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

if (wordSearchInput) {
  wordSearchInput.addEventListener("input", (event) => {
    state.filter = event.target.value;
    renderWordBank();
  });
}

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
