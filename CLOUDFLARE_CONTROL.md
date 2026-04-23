# Cloudflare Control Notes

このサイトを、こちら側からできるだけ編集・反映しやすくするための運用メモです。

## こちらでできること

- GitHub の `main` ブランチへコード修正を push する
- Cloudflare Pages Functions 用の `/api/ai-study` を編集する
- GitHub Actions のデプロイ設定を更新する
- `wrangler.toml` のCloudflare Pages設定を調整する

## 最初に一度だけ必要な設定

Cloudflare と API キーは機密情報なので、チャットやGitHubには貼らないでください。

1. Cloudflare Pages のプロジェクト名を `stridewords` で作成する
2. Cloudflare Pages の `Settings > Variables and Secrets` に `OPENAI_API_KEY` をSecretで追加する
3. Geminiも予備で使う場合は `GEMINI_API_KEY` をSecretで追加する
4. GitHub ActionsからCloudflareへデプロイしたい場合は、GitHubリポジトリに次を登録する
   - Repository variable: `CLOUDFLARE_PAGES_ENABLED` = `true`
   - Repository secret: `CLOUDFLARE_API_TOKEN`
   - Repository secret: `CLOUDFLARE_ACCOUNT_ID`

## ローカルから操作する場合

Node.js と npm が使える環境なら、次のコマンドで確認できます。

```powershell
npm install
npm run check
npm run dev
```

Cloudflareへ直接デプロイする場合は、Cloudflareにログインした状態で次を使います。

```powershell
npm run deploy:cloudflare
```

## 注意

- `https://takeshi-tk.github.io/` はGitHub Pagesなので、AI解説APIは動きません
- AI解説を動かす本番URLは、Cloudflare PagesのURLかCloudflareに紐づけた独自ドメインにしてください
- APIキーは `.dev.vars` やCloudflare Secretsにのみ置き、GitHubへpushしないでください
- ローカル開発用の見本は `dev.vars.example` に置いてあります
