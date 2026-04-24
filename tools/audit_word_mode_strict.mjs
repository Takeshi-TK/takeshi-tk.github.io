import { languagePacks } from "../language-packs.js?v=word-mode-strict";

const languages = ["ko", "zh", "fr"];
const failures = [];

const bannedFragments = [
  "「",
  "について",
  "メモ",
  "関連表現",
  "基本表現",
  "聞き取り練習",
  "発話練習",
  "旅行表現",
  "必須表現"
];

const bannedExactLabels = new Set([
  "分かりません",
  "問題ありません",
  "お願いします",
  "お願いします / お手数ですが",
  "ゆっくり話す",
  "予約を変更する",
  "静かな部屋",
  "カードは使えますか"
]);

const bannedRegexes = [
  /の(意味|発音|復習|練習|例文|説明|質問|注意点|基本|見直し|言い換え|使い方)$/,
  /^(新しい|小さい|大きい|きれいな|静かな|安い|高い|安全な|急ぎの|最初の|次の|近くの|少しの).+/,
  /^(最初の|次の)(音楽|映画|運動|朝|昼|夜|週末|時間)$/,
  /^(小さい|大きい)(時間|天気|雨|雪)$/,
  /^(新しい|小さい|大きい|きれいな)(水|お茶|コーヒー|牛乳|ご飯|パン|卵|りんご|料理)$/,
  /^(家|部屋|台所|水|お茶|コーヒー|牛乳|パン|ご飯|卵|りんご|天気|雨|雪|朝|昼|夜|週末|時間|音楽|映画|運動)の(名前|利用時間|一覧|記録)$/,
  /^(先生|学生|友だち|家族|子ども)の(中|外|入口|出口|前|後ろ|横|場所|利用時間|準備|一覧|写真)$/,
  /^(理由|意味|例|発音|練習|復習|手順|優先順位)の(設定|保存方法|削除方法|接続確認|記録)$/,
  /^.+を(支払う|預ける|交換する|返金する|乗り換える|注文する|借りる)$/,
  /^.+を.+する$/,
  /^.+は.+(ですか|ますか)$/
];

const bannedTargets = new Set([
  "大家",
  "小学校",
  "大学校",
  "大门",
  "第一个车",
  "下一个车",
  "第一个公交车",
  "下一个公交车",
  "第一个火车",
  "下一个火车",
  "第一个自行车",
  "下一个自行车"
]);

for (const language of languages) {
  for (const [category, data] of Object.entries(languagePacks[language].datasets.word)) {
    for (const item of data.words) {
      const location = `${language}.word.${category}: ${item.english} = ${item.japanese}`;
      if (item.japanese !== "メモ" && bannedFragments.some((fragment) => item.japanese.includes(fragment))) {
        failures.push(`study/meta label fragment: ${location}`);
      }
      if (bannedExactLabels.has(item.japanese)) {
        failures.push(`phrase-like word label: ${location}`);
      }
      for (const regex of bannedRegexes) {
        if (regex.test(item.japanese)) {
          failures.push(`unnatural word-mode label: ${location}`);
        }
      }
      if (bannedTargets.has(item.english)) {
        failures.push(`unnatural target-language label: ${location}`);
      }
    }
  }
}

if (failures.length) {
  console.error(`Strict word-mode audit failed (${failures.length})`);
  for (const failure of failures.slice(0, 200)) console.error(`- ${failure}`);
  if (failures.length > 200) console.error(`...and ${failures.length - 200} more`);
  process.exit(1);
}

console.log("Strict word-mode audit passed");
