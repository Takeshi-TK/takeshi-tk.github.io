# StrideWords

英単語をカテゴリ別に学べるシンプルな静的サイトです。

## できること

- 初級 / 中級 / 上級 / ビジネスの4カテゴリ切り替え
- 日本語の意味を見て英単語を選ぶ四択クイズ
- `SpeechSynthesis` を使ったウォーキングモード
- 選択中レベルの単語一覧表示と絞り込み
- 学習結果の簡易保存（`localStorage`）
- プライバシーポリシー / 利用規約 / お問い合わせページ
- AdSense 導入用の設定ファイル
- 回答後にサイト内で用意した使用例・意味補足を表示する補助機能

## 使い方

1. `index.html` をブラウザで開く
2. 左側でカテゴリを選ぶ
3. 「四択クイズ」または「ウォーキング」を切り替える

## 公開前にやること

1. `contact.html` の連絡先を本番用に変更する
2. `privacy.html` と `terms.html` を運営方針に合わせて見直す
3. 静的ホスティングにアップロードする
   例: GitHub Pages / Cloudflare Pages
4. 詳細手順は `DEPLOYMENT.md` を参照する
5. Cloudflare Pages を使う場合は `CLOUDFLARE_PAGES_CHECKLIST.md` も確認する

## AdSense 準備

AdSense の publisher ID は設定済みです。

- `enableAutoAds: true`
- `publisherId: "ca-pub-3121682237695422"`
- `ads.txt` をサイトルートで配信

公開ドメインを AdSense のサイト一覧に追加して、審査完了後に表示される想定です。

## 開発・デプロイ補助

Cloudflare Pages向けに `wrangler.toml` と `package.json` を追加しています。

```powershell
npm install
npm run check
npm run dev
npm run deploy:cloudflare
```

## 補足

- 読み上げ機能はブラウザ依存です
- 単語データは `vocabulary.js` を編集すれば増やせます
- フレーズデータは `phrases.js` を編集すれば増やせます
- GitHub Pages を使う場合は `.github/workflows/pages.yml` を利用できます
