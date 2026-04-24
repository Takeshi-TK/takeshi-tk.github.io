import { languagePacks } from "../language-packs.js?v=inspect-word-labels";

const languages = ["ko", "zh", "fr"];
const categories = ["basic", "practical", "business", "travel"];
const groups = new Map();

function groupFor(label) {
  if (/「.+」の/.test(label)) return "quoted-study-label";
  if (/についての/.test(label)) return "about-label";
  if (/の(意味|発音|復習|練習|例文|説明|メモ|関連表現|基本表現|聞き取り練習|発話練習)$/.test(label)) {
    return "study-label-unquoted";
  }
  if (/の(確認|情報|質問|メモ|注意点|基本|関連表現|見直し|発音|例文|言い換え|練習|設定|保存方法|削除方法|接続確認|手順|優先順位|記録|要点|状況|提出|修正|共有|最終確認|担当確認|検討|調整|管理|報告|案内|旅行表現|使い方|必須表現|場所|近く|予約|問い合わせ|準備|変更|予報|一覧|利用時間|写真|名前|中|外|入口|出口|前|後ろ|横|周り|向かい)$/.test(label)) {
    return "suffix-compound";
  }
  if (/を(受け取る|見せる|利用する|確認する|記録する|保存する|探す|変える|整理する|説明する|送る|比べる|練習する|覚える|削除する|おすすめする|始める|やめる|予約する|変更する|支払う|預ける|交換する|返金する|案内する|乗り換える|注文する|借りる|連絡する)$/.test(label)) {
    return "verb-object";
  }
  if (/^(新しい|小さい|大きい|きれいな|最初の|次の).+/.test(label)) return "modifier";
  return "simple";
}

for (const language of languages) {
  for (const category of categories) {
    for (const item of languagePacks[language].datasets.word[category].words) {
      const key = groupFor(item.japanese);
      const bucket = groups.get(key) || [];
      bucket.push(`${language}.${category}: ${item.english} = ${item.japanese}`);
      groups.set(key, bucket);
    }
  }
}

for (const [key, items] of groups) {
  console.log(`\n## ${key} (${items.length})`);
  console.log(items.slice(0, 120).join("\n"));
}
