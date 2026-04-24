import { languagePacks } from "../language-packs.js?v=word-label-quality";

const languages = ["ko", "zh", "fr"];
const failures = [];

function fail(message) {
  failures.push(message);
}

function auditWordLabels() {
  const exactBadJapanese = new Set([
    "家の名前",
    "部屋の名前",
    "台所の名前",
    "道の名前",
    "先生の練習",
    "学生の練習",
    "友だちの練習",
    "家族の練習",
    "子どもの練習",
    "家の練習",
    "水の練習",
    "天気の発音",
    "きれいな台所",
    "きれいな学校",
    "きれいな病院",
    "きれいな会社",
    "質問についての質問",
    "設定の設定",
    "進捗の状況",
    "確認の確認"
  ]);

  const awkwardPatterns = [
    { regex: /(?<!」)の(発音|復習|練習|例文|説明|メモ|関連表現|基本表現|聞き取り練習|発話練習)$/, reason: "basic study label must quote the studied word", basicOnly: true },
    { regex: /^(家|部屋|台所|道)の名前$/, reason: "unnatural name label for generic place" },
    { regex: /^(先生|学生|友だち|家族|子ども)の(中|入口|出口|前|後ろ|横|場所|利用時間|準備|一覧)$/, reason: "person used with place/object suffix" },
    { regex: /^(水|お茶|コーヒー|牛乳|パン|ご飯|卵|りんご|料理)の(中|入口|出口|前|後ろ|横|場所|利用時間|一覧)$/, reason: "food used with place/object suffix" },
    { regex: /^(天気|雨|雪|朝|昼|夜|週末|時間)の(中|入口|出口|前|後ろ|横|場所|利用時間|一覧)$/, reason: "time/weather used with place/object suffix" },
    { regex: /^きれいな(家|学校|病院|図書館|会社|部屋|台所|駅|店|市場|銀行|郵便局|公園)$/, reason: "clean adjective is too broad for quiz answer generation" },
    { regex: /^(確認|質問|設定|保存|削除|接続|記録|練習|発音|意味|例|手順|優先順位|進捗)(の|についての).*(確認|質問|設定|保存|削除|接続|記録|練習|発音|意味|例|手順|優先順位|状況)$/, reason: "self-referential generated label" },
    { regex: /^(探している|好きな).+$/, reason: "overly vague modifier label" },
    { regex: /^最初の(家|学校|駅|店|公園|市場|病院|薬局|銀行|郵便局|図書館|会社|部屋|台所)$/, reason: "first modifier is unnatural for generic places" },
    { regex: /^次の(家|学校|店|公園|市場|病院|薬局|銀行|郵便局|図書館|会社|部屋|台所)$/, reason: "next modifier is unnatural for generic places" },
    { regex: /^使う予定の.+$/, reason: "use-plan modifier is too vague for word mode" },
    { regex: /^.+用の$/, reason: "modifier is incomplete without a following noun" },
    { regex: /を(共有|報告|承認|提出|完了|催促|管理|調整|修正|更新|検討|整理)する$/, reason: "verb-object action labels should not be generated for word mode" }
  ];

  for (const language of languages) {
    for (const [category, data] of Object.entries(languagePacks[language].datasets.word)) {
      for (const item of data.words) {
        const location = `${language}.word.${category}: ${item.english} = ${item.japanese}`;
        if (exactBadJapanese.has(item.japanese)) {
          fail(`known awkward label: ${location}`);
        }
        for (const { regex, reason, basicOnly } of awkwardPatterns) {
          if (basicOnly && category !== "basic") continue;
          if (regex.test(item.japanese)) {
            fail(`${reason}: ${location}`);
          }
        }
      }
    }
  }
}

auditWordLabels();

if (failures.length) {
  console.error(`Word label quality audit failed (${failures.length})`);
  for (const failure of failures.slice(0, 200)) console.error(`- ${failure}`);
  if (failures.length > 200) console.error(`...and ${failures.length - 200} more`);
  process.exit(1);
}

console.log("Word label quality audit passed");
