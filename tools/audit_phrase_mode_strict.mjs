import { languagePacks } from "../language-packs.js?v=phrase-mode-strict";

const languages = ["ko", "zh", "fr"];
const failures = [];

const bannedJapanesePatterns = [
  /「.+」の(発音|意味|例文|説明|復習|練習)/,
  /.+の(発音|意味)を(練習|復習)します/,
  /.+についてメモします$/,
  /^(机|椅子|服|本|水|お茶|コーヒー|牛乳|パン|ご飯|卵|りんご|写真|名前)の(意味|発音|復習|練習)/,
  /^(意味|発音|復習|練習|例|文|単語|会話|質問|答え)についてメモします$/,
  /^(空港|駅|ホテル|部屋|予約|パスポート|荷物|チケット|地図|カード|現金|薬)についてメモします$/,
  /^(音楽|映画|運動)を使います$/,
  /^(服|靴|机|椅子|窓|ドア|本|写真)を使います$/,
  /^(道|通り|窓|ドア|机|椅子)を探しています$/,
  /^今日(道|通り|部屋|台所)に行きました$/,
  /^(道|通り|部屋|台所)で会いましょう$/,
  /^(道|通り|部屋|台所)は近いです$/,
  /^(バス|電車|自転車)を探しています$/,
  /^(バス|電車|自転車)は近いです$/,
  /^保険に連絡してください$/,
  /^(荷物|預け荷物)をください$/,
  /^(意味|発音|例|単語|文|会話|情報|説明|質問|答え|練習|復習)について教えてください$/,
  /^(意味|発音|例|単語|練習|復習)をもう一度確認します$/,
  /^(確認|共有|改善|承認|進捗)について教えてください$/,
  /^(確認|共有|改善|承認|担当者|部署|チーム)の状況を確認します$/,
  /^(担当者|部署|チーム|顧客|取引先)の要点を確認します$/,
  /の状況を確認します$/,
  /の要点を確認します$/,
  /の注意点を確認します$/,
  /^売り切れ(を確認してください|をもう一度確認します|について教えてください)$/,
  /^(.+)についてメモします$/
];

const bannedTargetPatterns = [
  /발음을 연습해요\.$/,
  /뜻을 복습해요\.$/,
  /révise le sens .+\.$/,
  /\bde (un|une)\b/,
  /Je cherche la (route|rue)\./,
  /\(으\)로/,
  /\b(au matin|à la journée|à la nuit|au week-end)\b/
];

for (const language of languages) {
  for (const [category, data] of Object.entries(languagePacks[language].datasets.phrase)) {
    for (const item of data.words) {
      const location = `${language}.phrase.${category}: ${item.english} = ${item.japanese}`;
      if (bannedJapanesePatterns.some((pattern) => pattern.test(item.japanese))) {
        failures.push(`unnatural Japanese phrase: ${location}`);
      }
      if (bannedTargetPatterns.some((pattern) => pattern.test(item.english))) {
        failures.push(`unnatural generated phrase target: ${location}`);
      }
    }
  }
}

if (failures.length) {
  console.error(`Strict phrase-mode audit failed (${failures.length})`);
  for (const failure of failures.slice(0, 200)) console.error(`- ${failure}`);
  if (failures.length > 200) console.error(`...and ${failures.length - 200} more`);
  process.exit(1);
}

console.log("Strict phrase-mode audit passed");
