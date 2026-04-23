import { vocabulary } from "./vocabulary.js";
import { phrases } from "./phrases.js";

const PROFILES_KEY = "stridewords-profiles-v4";
const ACTIVE_PROFILE_KEY = "stridewords-active-profile-v4";
const ACTIVE_ROLE_KEY = "stridewords-active-role-v4";
const SETTINGS_KEY = "stridewords-settings-v4";
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
  category: "beginner",
  mode: "quiz",
  currentQuestion: null,
  lastAnswer: null,
  answered: false,
  exposureCounter: 1,
  profiles: loadProfiles(),
  activeProfileId: loadActiveProfileId(),
  role: loadActiveRole(),
  settings: loadSettings(),
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
      lastSeen: 0
    };
  }

  return profile.words[key];
}

function isMastered(word, category = state.category, studyType = state.studyType) {
  return getWordRecord(word, category, studyType).streak >= 3;
}

function getStudyItems(category = state.category, studyType = state.studyType) {
  return datasets[studyType][category].words.filter((word) => !isMastered(word, category, studyType));
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
  state.quizSession.breakPending = false;
  state.quizSession.stopped = false;
}

function resetLearningFlow() {
  resetQuizSession();
  state.lastAnswer = null;
  state.currentQuestion = null;
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
  const studyLabel = studyTypeMeta[state.studyType].label;
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
  const isWord = state.studyType === "word";
  wordTypeTab.classList.toggle("active", isWord);
  phraseTypeTab.classList.toggle("active", !isWord);
  wordTypeTab.setAttribute("aria-selected", String(isWord));
  phraseTypeTab.setAttribute("aria-selected", String(!isWord));
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
  quizPoolBadge.textContent = `出題対象 ${activeWords}${studyMeta.countLabel} / 全体 ${totalWords}${studyMeta.countLabel}`;
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
  renderAiHelpActions(previousAnswerBody, state.lastAnswer.aiContext);
  previousAnswerCard.classList.toggle("hidden");
}

function buildItemExplanation(item) {
  return item.explanation || "";
}

function buildAiStudyPrompt(context) {
  if (!context?.answer) {
    return "";
  }

  const itemType = state.studyType === "phrase" ? "英語フレーズ" : "英単語";
  const categoryLabel = getCurrentCategory().label;
  const lines = [
    `英語学習者向けに、次の${itemType}を日本語でわかりやすく解説してください。`,
    `レベル/カテゴリ: ${categoryLabel}`,
    `英語: ${context.answer.english}`,
    `日本語の意味: ${context.answer.japanese}`
  ];

  if (context.selectedOption && context.selectedOption.english !== context.answer.english) {
    lines.push(`学習者が間違えて選んだ答え: ${context.selectedOption.english} = ${context.selectedOption.japanese}`);
  }

  lines.push(
    "",
    "次の形式で短く答えてください。",
    "1. 自然な意味とニュアンス",
    "2. よく使う例文を3つ（英語 + 日本語訳）",
    "3. 似た意味の語や間違えやすい点",
    "4. 覚え方のコツ"
  );

  return lines.join("\n");
}

function buildAiRequestPayload(context) {
  const selectedOption = context.selectedOption || null;

  return {
    studyType: state.studyType,
    category: getCurrentCategory().label,
    english: context.answer.english,
    japanese: context.answer.japanese,
    selectedEnglish: selectedOption?.english || "",
    selectedJapanese: selectedOption?.japanese || "",
    prompt: buildAiStudyPrompt(context)
  };
}

function setAiResult(target, className, text) {
  target.className = `ai-help-result ${className}`;
  target.textContent = text;
  target.classList.remove("hidden");
}

function buildLocalUsageExamples(context, reason = "") {
  const answer = context.answer;
  const selectedOption = context.selectedOption || null;
  const categoryLabel = getCurrentCategory().label;
  const prefix = reason ? `${reason}\n\n` : "";

  if (state.studyType === "phrase") {
    const mistakeNote = selectedOption && selectedOption.english !== answer.english
      ? `\n\n間違えた選択肢: ${selectedOption.english} = ${selectedOption.japanese}`
      : "";
    const explanation = answer.explanation ? `\n使いどころ: ${answer.explanation}` : "";

    return `${prefix}簡易使用例（AI未接続）\n${answer.english}\n意味: ${answer.japanese}${explanation}\n例: 会話ではこの表現をそのまま1文として使えます。まず音読して、次に自分の状況に置き換えて練習しましょう。${mistakeNote}`;
  }

  const word = answer.english;
  const meaning = answer.japanese;
  const mistakeNote = selectedOption && selectedOption.english !== answer.english
    ? `\n\n間違えた選択肢: ${selectedOption.english} = ${selectedOption.japanese}`
    : "";

  return `${prefix}簡易使用例（AI未接続）\n${word} = ${meaning}\nカテゴリ: ${categoryLabel}\n例1: I learned the word "${word}" today.\n例2: How do you use "${word}" in a sentence?\n覚え方: 日本語訳だけでなく、声に出して「${word} = ${meaning}」を数回確認しましょう。${mistakeNote}`;
}

async function fetchAiStudyExplanation(context, target, button) {
  button.disabled = true;
  button.textContent = "使用例を確認中...";
  setAiResult(target, "loading", "使用例を準備しています。Cloudflare版ではAI解説を生成します。");

  try {
    const response = await fetch("/api/ai-study", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(buildAiRequestPayload(context))
    });

    const data = await response.json().catch(() => ({}));
    if (!response.ok) {
      const reason = response.status === 503
        ? data.error || "Cloudflare側のAI APIキー設定が未完了のため、簡易使用例を表示します。"
        : "AI解説APIに接続できないため、サイト内の簡易使用例を表示します。Cloudflare Pages版ではAI解説に切り替わります。";
      setAiResult(target, "ready", buildLocalUsageExamples(context, reason));
      return;
    }

    setAiResult(target, "ready", data.text || "AI解説を取得できませんでした。");
  } catch (error) {
    setAiResult(
      target,
      "ready",
      buildLocalUsageExamples(context, `${error.message} 簡易使用例を表示します。`)
    );
  } finally {
    button.disabled = false;
    button.textContent = "使用例を見る";
  }
}

function renderAiHelpActions(container, context) {
  const prompt = buildAiStudyPrompt(context);
  if (!prompt) {
    return;
  }

  const actions = document.createElement("span");
  actions.className = "ai-help-actions";

  const note = document.createElement("span");
  note.className = "ai-help-note";
  note.textContent = "使用例をその場に表示できます。Cloudflare版ではAIでより詳しく表示します。";

  const aiButton = document.createElement("button");
  aiButton.type = "button";
  aiButton.className = "ai-help-button";
  aiButton.textContent = "使用例を見る";

  const result = document.createElement("span");
  result.className = "ai-help-result hidden";

  aiButton.addEventListener("click", () => fetchAiStudyExplanation(context, result, aiButton));

  actions.append(note, aiButton, result);
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

  state.currentQuestion = {
    answer,
    options: buildOptions(answer)
  };
  state.answered = false;

  questionMeaning.textContent = answer.japanese;
  questionHint.textContent = `${getCurrentCategory().description} 英語として最も合うものを選んでください。`;
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
    button.innerHTML = `<span class="choice-text">${option.english}</span>`;
    button.addEventListener("click", () => submitAnswer(option, button));

    const audioButton = document.createElement("button");
    audioButton.type = "button";
    audioButton.className = "choice-audio-button";
    audioButton.textContent = "発音";
    audioButton.setAttribute("aria-label", `${option.english} の発音を聞く`);
    audioButton.addEventListener("click", (event) => {
      event.stopPropagation();
      speakNow(option.english, "en-US");
    });

    card.append(button, audioButton);
    choices.appendChild(card);
  }
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

  progress.attempts += 1;
  answerRecord.attempts += 1;

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
    const correctFeedback = buildCorrectFeedback(answer);
    feedbackMessage.innerHTML = correctFeedback;
    feedbackMessage.className = "feedback correct";
    state.lastAnswer = {
      html: correctFeedback,
      className: "correct",
      aiContext: { answer }
    };
    renderAiHelpActions(feedbackMessage, state.lastAnswer.aiContext);
    completeQuizSessionItem("correct");
  } else {
    answerRecord.wrong += 1;
    answerRecord.streak = 0;
    const wrongFeedback = buildWrongFeedback(option, state.currentQuestion.options, answer);
    feedbackMessage.innerHTML = wrongFeedback;
    feedbackMessage.className = "feedback wrong";
    state.lastAnswer = {
      html: wrongFeedback,
      className: "wrong",
      aiContext: { answer, selectedOption: option }
    };
    renderAiHelpActions(feedbackMessage, state.lastAnswer.aiContext);
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
    aiContext: { answer }
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

function speakNow(text, lang = "en-US") {
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
  utterance.rate = state.settings.speed;
  speechSynthesis.speak(utterance);
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
  speedSelect.value = state.settings.speed.toFixed(1);
  gapRange.value = String(state.settings.gap);
  gapValue.textContent = `${state.settings.gap}秒`;
}

function setStudyType(studyType) {
  if (state.studyType === studyType) {
    return;
  }

  stopWalking(true);
  state.studyType = studyType;
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
    window.alert("ID は英字・数字・記号をすべて含む 6 文字以上で入力してください。");
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
wordTypeTab.addEventListener("click", () => setStudyType("word"));
phraseTypeTab.addEventListener("click", () => setStudyType("phrase"));
skipButton.addEventListener("click", () => skipCurrentQuestion());
nextButton.addEventListener("click", () => createQuestion());
showPreviousAnswerButton.addEventListener("click", () => showPreviousAnswer());
sessionContinueButton.addEventListener("click", () => continueQuizSession());
sessionStopButton.addEventListener("click", () => stopQuizSessionBreak());

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
