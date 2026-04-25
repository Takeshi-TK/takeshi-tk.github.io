const config = window.STRIDEWORDS_COMMUNITY || {};
const endpoint = String(config.endpoint || "").trim();
const storagePrefix = config.storagePrefix || "stridewords-community-v1";
const pageType = document.body.dataset.communityPage;

const boardMeta = {
  comments: {
    key: `${storagePrefix}:comments`,
    empty: "まだコメントはありません。最初のコメントを書いてみてください。",
    endpointBoard: "comments"
  },
  threads: {
    key: `${storagePrefix}:threads`,
    empty: "まだスレッドはありません。最初の話題を作ってみてください。",
    endpointBoard: "threads"
  }
};

const state = {
  items: []
};

const statusBox = document.querySelector("#communityStatus");
const list = document.querySelector("#communityList");
const form = document.querySelector("#communityForm");
const nameInput = document.querySelector("#communityName");
const titleInput = document.querySelector("#communityTitle");
const messageInput = document.querySelector("#communityMessage");

function nowLabel(value = new Date().toISOString()) {
  return new Intl.DateTimeFormat("ja-JP", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit"
  }).format(new Date(value));
}

function makeId() {
  return `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 9)}`;
}

function setStatus(message, tone = "ready") {
  if (!statusBox) return;
  statusBox.textContent = message;
  statusBox.className = `community-status ${tone}`;
}

function readLocalItems() {
  try {
    const saved = JSON.parse(localStorage.getItem(boardMeta[pageType].key));
    return Array.isArray(saved) ? saved : [];
  } catch {
    return [];
  }
}

function writeLocalItems(items) {
  localStorage.setItem(boardMeta[pageType].key, JSON.stringify(items));
}

async function loadItems() {
  if (!endpoint) {
    state.items = readLocalItems();
    setStatus("保存API未接続のため、この端末内だけに保存されます。全員共有にするには community-config.js に保存APIを設定してください。", "notice");
    renderItems();
    return;
  }

  try {
    const response = await fetch(`${endpoint}?board=${encodeURIComponent(boardMeta[pageType].endpointBoard)}`, {
      headers: { Accept: "application/json" }
    });
    if (!response.ok) throw new Error("load failed");
    const payload = await response.json();
    state.items = Array.isArray(payload.items) ? payload.items : [];
    setStatus("共有履歴を読み込みました。", "ready");
  } catch {
    state.items = readLocalItems();
    setStatus("保存APIに接続できません。端末内プレビューを表示しています。", "warning");
  }
  renderItems();
}

async function persistItems(nextItems, payload) {
  if (!endpoint) {
    state.items = nextItems;
    writeLocalItems(state.items);
    renderItems();
    return true;
  }

  try {
    const response = await fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify({
        board: boardMeta[pageType].endpointBoard,
        ...payload
      })
    });
    if (!response.ok) throw new Error("save failed");
    await loadItems();
    return true;
  } catch {
    setStatus("保存APIに投稿できませんでした。通信状態またはAPI設定を確認してください。", "warning");
    return false;
  }
}

function createEl(tag, className, text = "") {
  const element = document.createElement(tag);
  if (className) element.className = className;
  if (text) element.textContent = text;
  return element;
}

function createMeta(name, createdAt) {
  const meta = createEl("p", "community-meta");
  meta.append(createEl("strong", "", name || "匿名"));
  meta.append(document.createTextNode(` / ${nowLabel(createdAt)}`));
  return meta;
}

function createReplyForm(parentId) {
  const replyForm = createEl("form", "community-reply-form");
  replyForm.innerHTML = `
    <label>
      <span>名前</span>
      <input type="text" name="name" maxlength="40" placeholder="匿名でもOK">
    </label>
    <label>
      <span>返信</span>
      <textarea name="message" rows="3" maxlength="800" placeholder="返信を書く"></textarea>
    </label>
    <button class="primary-button" type="submit">返信する</button>
  `;
  replyForm.addEventListener("submit", async (event) => {
    event.preventDefault();
    const formData = new FormData(replyForm);
    const message = String(formData.get("message") || "").trim();
    const name = String(formData.get("name") || "").trim() || "匿名";
    if (!message) {
      setStatus("返信内容を入力してください。", "warning");
      return;
    }

    const reply = { id: makeId(), name, message, createdAt: new Date().toISOString() };
    const nextItems = state.items.map((item) => item.id === parentId
      ? { ...item, replies: [...(item.replies || []), reply] }
      : item);
    const saved = await persistItems(nextItems, { action: "reply", parentId, reply });
    if (saved) replyForm.reset();
  });
  return replyForm;
}

function renderReplies(parent) {
  const wrapper = createEl("div", "community-replies");
  for (const reply of parent.replies || []) {
    const card = createEl("article", "community-reply");
    card.append(createMeta(reply.name, reply.createdAt));
    card.append(createEl("p", "community-message", reply.message));
    wrapper.append(card);
  }
  wrapper.append(createReplyForm(parent.id));
  return wrapper;
}

function renderCommentItem(item) {
  const card = createEl("article", "community-card");
  card.append(createMeta(item.name, item.createdAt));
  card.append(createEl("p", "community-message", item.message));
  card.append(renderReplies(item));
  return card;
}

function renderThreadItem(item) {
  const card = createEl("article", "community-card thread-card");
  card.append(createEl("h2", "thread-title", item.title || "無題のスレッド"));
  card.append(createMeta(item.name, item.createdAt));
  card.append(createEl("p", "community-message", item.message));
  card.append(renderReplies(item));
  return card;
}

function renderItems() {
  if (!list) return;
  list.innerHTML = "";

  if (!state.items.length) {
    list.append(createEl("p", "community-empty", boardMeta[pageType].empty));
    return;
  }

  const renderer = pageType === "threads" ? renderThreadItem : renderCommentItem;
  for (const item of [...state.items].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))) {
    list.append(renderer(item));
  }
}

form?.addEventListener("submit", async (event) => {
  event.preventDefault();
  const name = nameInput.value.trim() || "匿名";
  const message = messageInput.value.trim();
  const title = titleInput?.value.trim();

  if (pageType === "threads" && !title) {
    setStatus("スレッド名を入力してください。", "warning");
    return;
  }

  if (!message) {
    setStatus("コメント内容を入力してください。", "warning");
    return;
  }

  const item = {
    id: makeId(),
    name,
    title,
    message,
    replies: [],
    createdAt: new Date().toISOString()
  };
  const nextItems = [item, ...state.items];
  const saved = await persistItems(nextItems, { action: "create", item });
  if (saved) form.reset();
});

loadItems();
