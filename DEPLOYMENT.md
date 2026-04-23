# Deployment Guide

StrideWords をオンライン公開するための手順メモです。

## 先に直す項目

公開前に次のファイルを編集してください。

- `contact.html`
  - 本番の連絡先メールアドレス
  - 返信ポリシー
- `privacy.html`
  - 運営者名
  - 広告配信方針
- `terms.html`
  - サービス運営ポリシー
- `robots.txt`
  - `https://example.com/sitemap.xml` を本番ドメインに変更
- `sitemap.xml`
  - `https://example.com/` を本番ドメインに変更

## 公開方法 1: Cloudflare Pages

Cloudflare Pages は静的サイト公開に向いていて、あとからバックエンドを足す場合も相性が良いです。

### 手順

1. GitHub にこのフォルダの内容を push する
2. Cloudflare Dashboard で `Pages` を開く
3. `Connect to Git` を選ぶ
4. 対象のリポジトリを選ぶ
5. Project name は `stridewords` にする
6. Build settings は次のようにする
   - Framework preset: `None`
   - Build command: 空欄
   - Build output directory: `/`
7. Deploy を実行する

`wrangler.toml` も `stridewords` で設定してあります。別名のCloudflare Pagesプロジェクトにした場合は、`wrangler.toml` の `name` も同じ名前へ変更してください。

### 公開後にやること

1. 発行された `*.pages.dev` URL で表示確認
2. カスタムドメインを使う場合はドメイン設定を追加
3. `robots.txt` と `sitemap.xml` の URL を本番ドメインへ更新

### こちら側からデプロイしやすくする設定

GitHub Actions 用の `.github/workflows/cloudflare-pages.yml` を用意しています。

1. GitHub の `Settings > Secrets and variables > Actions` を開く
2. `Variables` に `CLOUDFLARE_PAGES_ENABLED=true` を追加する
3. `Secrets` に `CLOUDFLARE_API_TOKEN` と `CLOUDFLARE_ACCOUNT_ID` を追加する
4. 以降は `main` へpushするとCloudflare Pagesへデプロイできます

この設定をしておくと、こちらでGitHubへ反映した修正がCloudflare側にも反映されやすくなります。

## 公開方法 2: GitHub Pages

GitHub Pages でも静的サイトとしてそのまま公開できます。

### 手順

1. GitHub にリポジトリを作成
2. このフォルダの内容を push する
3. GitHub の `Settings > Pages` を開く
4. Source を `Deploy from a branch` にする
5. Branch は `main`、Folder は `/ (root)` を選ぶ
6. 保存して公開完了を待つ

`.nojekyll` を入れてあるので、Jekyll の自動処理を避けてそのまま静的ファイルを配信できます。

## AdSense を有効化する手順

1. 公開後の本番ドメインを AdSense の `Sites` に追加
2. サイト審査が通るまで待つ
3. `adsense-config.js` が本番 publisher ID になっていることを確認する

```js
window.strideWordsAdsense = {
  enableAutoAds: true,
  publisherId: "ca-pub-3121682237695422",
  note: "本番用の publisher ID"
};
```

4. `ads.txt` がサイトルートで開けることを確認する
5. デプロイし直す

## 注意

- 今の `ID + password` と `管理者メニュー` はブラウザ内保存ベースです
- 本番公開で本当に安全な認証にするなら、バックエンド移行が必要です
- 本番では `Supabase Auth` などの認証基盤を使う方が安全です
