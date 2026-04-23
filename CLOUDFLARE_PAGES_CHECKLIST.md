# Cloudflare Pages Checklist

StrideWords を Cloudflare Pages に公開するときの短いチェックリストです。

## 事前準備

- `contact.html` の連絡先を本番用に変更する
- `privacy.html` の内容を運営方針に合わせる
- `terms.html` の内容を運営方針に合わせる
- `robots.txt` の `example.com` を本番ドメインへ変更する
- `sitemap.xml` の `example.com` を本番ドメインへ変更する
- AI 解説を使う場合は OpenAI API キーを用意する

## Cloudflare Pages 側の設定

- Framework preset: `None`
- Build command: 空欄
- Build output directory: `/`
- Root directory: 空欄
- Project name: `stridewords`
- AI 解説用の Variables and Secrets:
  - `OPENAI_API_KEY`: Secret として登録
  - 任意で `OPENAI_MODEL`: 例 `gpt-4.1-mini`
  - 任意で `GEMINI_API_KEY`: Secret として登録
  - 任意で `GEMINI_MODEL`: 例 `gemini-2.5-flash`
- Variables and Secrets を追加した後に再デプロイする
- GitHub Actionsでデプロイする場合は `CLOUDFLARE_CONTROL.md` を確認する

## 公開後に確認すること

- トップページが開くか
- `privacy.html` `terms.html` `contact.html` が開くか
- スマホ表示が崩れていないか
- `404.html` が効いているか
- AdSense を使う場合は `adsense-config.js` と `ads.txt` が本番値か
- Cloudflare Pages のURLで回答後の `AIで使用例を見る` がサイト内に解説を表示するか
- GitHub Pages のURLではAI解説APIが動かないため、AI確認には使わない

## AdSense を有効化する前に

- サイトを AdSense の `Sites` に追加する
- 審査完了後に広告配信ステータスを確認する
- `ads.txt` が `https://公開ドメイン/ads.txt` で開けるか確認する
