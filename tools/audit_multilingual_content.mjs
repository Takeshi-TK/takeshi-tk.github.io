import { readFile } from "node:fs/promises";
import { languagePacks } from "../language-packs.js?v=audit-content";

const expectedCounts = {
  word: { basic: 1001, practical: 500, business: 500, travel: 501 },
  phrase: { basic: 254, practical: 240, business: 243, travel: 257 }
};

const languagesToAudit = ["ko", "zh", "fr"];
const failures = [];

function fail(message) {
  failures.push(message);
}

function parseCsvRows(text) {
  const rows = [];
  let row = [];
  let value = "";
  let quoted = false;

  for (let index = 0; index < text.length; index += 1) {
    const char = text[index];
    const next = text[index + 1];

    if (quoted) {
      if (char === "\"" && next === "\"") {
        value += "\"";
        index += 1;
      } else if (char === "\"") {
        quoted = false;
      } else {
        value += char;
      }
      continue;
    }

    if (char === "\"") {
      quoted = true;
      continue;
    }
    if (char === ",") {
      row.push(value);
      value = "";
      continue;
    }
    if (char === "\n") {
      row.push(value.replace(/\r$/, ""));
      if (row.some((cell) => cell.length)) rows.push(row);
      row = [];
      value = "";
      continue;
    }
    value += char;
  }

  row.push(value.replace(/\r$/, ""));
  if (row.some((cell) => cell.length)) rows.push(row);
  return rows;
}

function auditCounts() {
  for (const [language, pack] of Object.entries(languagePacks)) {
    for (const [kind, categories] of Object.entries(expectedCounts)) {
      for (const [category, expected] of Object.entries(categories)) {
        const actual = pack.datasets[kind][category].words.length;
        if (actual !== expected) {
          fail(`${language}.${kind}.${category}: expected ${expected}, got ${actual}`);
        }
      }
    }
  }
}

function auditIntegrity() {
  for (const [language, pack] of Object.entries(languagePacks)) {
    for (const [kind, categories] of Object.entries(pack.datasets)) {
      for (const [category, data] of Object.entries(categories)) {
        const seen = new Set();
        for (const item of data.words) {
          const english = String(item.english || "").trim();
          const japanese = String(item.japanese || "").trim();
          const key = english.toLowerCase();
          const location = `${language}.${kind}.${category}`;

          if (!english || !japanese) fail(`${location}: empty item`);
          if (seen.has(key)) fail(`${location}: duplicate target "${english}"`);
          if (/[�]/.test(`${english}${japanese}`)) fail(`${location}: replacement character in "${english} = ${japanese}"`);
          seen.add(key);
        }
      }
    }
  }
}

function auditKnownBadCombinations() {
  const badSubjects = [
    "先生", "学生", "友だち", "子ども", "家族",
    "水", "お茶", "コーヒー", "牛乳", "パン", "ご飯", "卵", "りんご",
    "天気", "雨", "雪", "朝", "昼", "夜", "週末", "時間",
    "音楽", "映画", "運動", "色", "番号", "値段"
  ];
  const badLocationSuffixes = ["の中", "の入口", "の出口", "の前", "の後ろ", "の横", "の外", "の場所"];
  const exactBadJapanese = new Set([
    "荷物を支払う",
    "地図を予約する",
    "入口を乗り換える",
    "カードを支払う",
    "出口を預ける",
    "保険を連絡する",
    "バス停が必要です",
    "問題点が必要です",
    "在庫をもう一度送ってください",
    "リスクをもう一度送ってください",
    "先生の中",
    "先生の入口",
    "先生の出口"
  ]);
  const awkwardRegexes = [
    /(先生|学生|友だち|子ども|家族)(が必要|をください|はどこ|を使います|の準備|の一覧|の中|の入口|の出口)/,
    /(雨|雪|天気|朝|昼|夜|週末|時間)(をください|を探しています|を使います|の入口|の出口|の中|の前|の横|の場所|選択|一覧)/,
    /(水|お茶|コーヒー|牛乳)(は近い|小さい|大きい|最初の|の一覧)/
  ];

  for (const language of languagesToAudit) {
    for (const [kind, categories] of Object.entries(languagePacks[language].datasets)) {
      for (const [category, data] of Object.entries(categories)) {
        for (const item of data.words) {
          const label = `${language}.${kind}.${category}: ${item.english} = ${item.japanese}`;

          for (const subject of badSubjects) {
            for (const suffix of badLocationSuffixes) {
              if (item.japanese === `${subject}${suffix}`) fail(`non-place location: ${label}`);
            }
          }

          if (exactBadJapanese.has(item.japanese)) fail(`known bad phrase: ${label}`);
          if (awkwardRegexes.some((regex) => regex.test(item.japanese)) && !item.japanese.includes("少し考える時間をください")) {
            fail(`awkward generated Japanese: ${label}`);
          }
        }
      }
    }
  }
}

function auditFrenchContractions() {
  const suspiciousNouns = [
    "magasin", "parc", "marché", "bureau", "thé", "café", "lait", "pain", "riz",
    "livre", "cahier", "stylo", "sac", "téléphone", "professeur", "médicament",
    "restaurant", "menu", "passeport", "train", "bus", "vélo", "film", "temps",
    "matin", "soir"
  ];
  const badFrench = new RegExp(`\\b(de|à) le\\s+(${suspiciousNouns.join("|")})\\b`);

  for (const [kind, categories] of Object.entries(languagePacks.fr.datasets)) {
    for (const [category, data] of Object.entries(categories)) {
      for (const item of data.words) {
        if (badFrench.test(item.english)) {
          fail(`French contraction: fr.${kind}.${category}: ${item.english} = ${item.japanese}`);
        }
      }
    }
  }
}

async function auditUsageCsv() {
  const text = await readFile(new URL("../data/learning-items.csv", import.meta.url), "utf8");
  const rows = parseCsvRows(text);
  const headers = rows.shift()?.map((header) => header.replace(/^\uFEFF/, "")) || [];
  const column = (name) => headers.indexOf(name);
  const indexes = {
    english: column("english"),
    japanese: column("japanese"),
    example1En: column("example_1_en"),
    example1Ja: column("example_1_ja"),
    example2En: column("example_2_en"),
    example2Ja: column("example_2_ja"),
    status: column("review_status")
  };

  if (Object.values(indexes).some((index) => index < 0)) {
    fail("learning-items.csv: missing required usage-example columns");
    return;
  }

  const bannedExamplePatterns = [
    /I learned the (word|phrase)/i,
    /\bmeans ["“'].*["”'] in Japanese/i,
    /I saw the word/i,
    /^Can you explain ["“'].*["”']\??$/i,
    /^I need to check the .+ doing\.$/i,
    /^Where is the .+ doing\?$/i,
    /^Please put the .+ on the table\.$/i,
    /^The room looks .+\.$/i,
    /^I feel .+ today\.$/i,
    /^I need to download today\.$/i,
    /^I will download after this\.$/i,
    /^This is safe\.$/i,
    /^It looks safe\.$/i
  ];

  for (const [rowIndex, row] of rows.entries()) {
    if (row[indexes.status] !== "reviewed") continue;
    const examples = [
      [row[indexes.example1En], row[indexes.example1Ja]],
      [row[indexes.example2En], row[indexes.example2Ja]]
    ];

    for (const [exampleEn, exampleJa] of examples) {
      if (!exampleEn && !exampleJa) continue;
      const context = `csv row ${rowIndex + 2}: ${row[indexes.english]} = ${row[indexes.japanese]}`;
      if (!exampleEn || !exampleJa) fail(`${context}: incomplete reviewed example`);
      if (bannedExamplePatterns.some((pattern) => pattern.test(exampleEn))) {
        fail(`${context}: banned generic usage example "${exampleEn}"`);
      }
    }
  }
}

auditCounts();
auditIntegrity();
auditKnownBadCombinations();
auditFrenchContractions();
await auditUsageCsv();

if (failures.length) {
  console.error(`Content audit failed (${failures.length})`);
  for (const failure of failures.slice(0, 120)) console.error(`- ${failure}`);
  if (failures.length > 120) console.error(`...and ${failures.length - 120} more`);
  process.exit(1);
}

console.log("Content audit passed");
