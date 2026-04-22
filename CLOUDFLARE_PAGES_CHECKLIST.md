# Cloudflare Pages Checklist

StrideWords を Cloudflare Pages に公開するときの短いチェックリストです。

## 事前準備

- `contact.html` の連絡先を本番用に変更する
- `privacy.html` の内容を運営方針に合わせる
- `terms.html` の内容を運営方針に合わせる
- `robots.txt` の `example.com` を本番ドメインへ変更する
- `sitemap.xml` の `example.com` を本番ドメインへ変更する

## Cloudflare Pages 側の設定

- Framework preset: `None`
- Build command: 空欄
- Build output directory: `/`
- Root directory: 空欄

## 公開後に確認すること

- トップページが開くか
- `privacy.html` `terms.html` `contact.html` が開くか
- スマホ表示が崩れていないか
- `404.html` が効いているか
- AdSense を使う場合は `adsense-config.js` の設定が本番値か

## AdSense を有効化する前に

- サイトを AdSense の `Sites` に追加する
- 審査が通るまで `enableAutoAds` は `false` のままにする
- 審査完了後に `publisherId` を設定して再デプロイする
