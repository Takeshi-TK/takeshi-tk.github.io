const JSON_HEADERS = {
  "Content-Type": "application/json; charset=utf-8",
  "Cache-Control": "no-store"
};

const MAX_FIELD_LENGTH = 500;
const FALLBACK_OPENAI_MODEL = "gpt-4.1-mini";
const FALLBACK_GEMINI_MODEL = "gemini-2.5-flash";

function jsonResponse(body, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: JSON_HEADERS
  });
}

function cleanText(value, maxLength = MAX_FIELD_LENGTH) {
  return String(value || "").replace(/\s+/g, " ").trim().slice(0, maxLength);
}

function buildPrompt(payload) {
  const studyType = payload.studyType === "phrase" ? "英語フレーズ" : "英単語";
  const lines = [
    "あなたは日本語で説明する英語学習コーチです。",
    `次の${studyType}を、初心者にもわかるように短く解説してください。`,
    `カテゴリ: ${cleanText(payload.category, 80)}`,
    `英語: ${cleanText(payload.english, 120)}`,
    `日本語の意味: ${cleanText(payload.japanese, 120)}`
  ];

  if (payload.selectedEnglish && payload.selectedEnglish !== payload.english) {
    lines.push(
      `学習者が間違えて選んだ答え: ${cleanText(payload.selectedEnglish, 120)} = ${cleanText(payload.selectedJapanese, 120)}`
    );
  }

  lines.push(
    "",
    "出力形式:",
    "1. 自然な意味とニュアンス",
    "2. よく使う例文を3つ（英語 + 日本語訳）",
    "3. 似た意味の語や間違えやすい点",
    "4. 覚え方のコツ",
    "",
    "長すぎないよう、全体を500字以内にしてください。"
  );

  return lines.join("\n");
}

function validatePayload(payload) {
  if (!payload || typeof payload !== "object") {
    return "リクエスト形式が正しくありません。";
  }

  if (!cleanText(payload.english) || !cleanText(payload.japanese)) {
    return "解説対象の英語と日本語が必要です。";
  }

  return "";
}

function extractOpenAiText(data) {
  if (typeof data.output_text === "string") {
    return data.output_text.trim();
  }

  const parts = [];
  for (const output of data.output || []) {
    for (const content of output.content || []) {
      if (content.type === "output_text" && content.text) {
        parts.push(content.text);
      }
    }
  }

  return parts.join("\n").trim();
}

async function callOpenAi(env, prompt) {
  if (!env.OPENAI_API_KEY) {
    throw new Error("OPENAI_API_KEY is not configured.");
  }

  const response = await fetch("https://api.openai.com/v1/responses", {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${env.OPENAI_API_KEY}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      model: env.OPENAI_MODEL || FALLBACK_OPENAI_MODEL,
      input: prompt,
      max_output_tokens: 700
    })
  });

  const data = await response.json().catch(() => ({}));
  if (!response.ok) {
    throw new Error(data.error?.message || "OpenAI API request failed.");
  }

  const text = extractOpenAiText(data);
  if (!text) {
    throw new Error("OpenAI API returned an empty response.");
  }

  return { provider: "openai", text };
}

function extractGeminiText(data) {
  return (data.candidates?.[0]?.content?.parts || [])
    .map((part) => part.text || "")
    .join("\n")
    .trim();
}

async function callGemini(env, prompt) {
  if (!env.GEMINI_API_KEY) {
    throw new Error("GEMINI_API_KEY is not configured.");
  }

  const model = env.GEMINI_MODEL || FALLBACK_GEMINI_MODEL;
  const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-goog-api-key": env.GEMINI_API_KEY
    },
    body: JSON.stringify({
      contents: [
        {
          parts: [{ text: prompt }]
        }
      ],
      generationConfig: {
        maxOutputTokens: 700,
        temperature: 0.4
      }
    })
  });

  const data = await response.json().catch(() => ({}));
  if (!response.ok) {
    throw new Error(data.error?.message || "Gemini API request failed.");
  }

  const text = extractGeminiText(data);
  if (!text) {
    throw new Error("Gemini API returned an empty response.");
  }

  return { provider: "gemini", text };
}

export async function onRequestPost({ request, env }) {
  let payload;
  try {
    payload = await request.json();
  } catch {
    return jsonResponse({ error: "JSONを読み取れませんでした。" }, 400);
  }

  const validationError = validatePayload(payload);
  if (validationError) {
    return jsonResponse({ error: validationError }, 400);
  }

  const prompt = buildPrompt(payload);
  const errors = [];

  try {
    const result = await callOpenAi(env, prompt);
    return jsonResponse(result);
  } catch (error) {
    errors.push(error.message);
  }

  try {
    const result = await callGemini(env, prompt);
    return jsonResponse(result);
  } catch (error) {
    errors.push(error.message);
  }

  return jsonResponse({
    error: "AI解説を生成できませんでした。",
    details: errors
  }, 503);
}

export function onRequestOptions() {
  return jsonResponse({});
}
