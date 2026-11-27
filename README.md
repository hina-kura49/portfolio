# h.kurashina Portfolio

React・TypeScript・Viteで作る個人ポートフォリオです。白を基調とした 1 枚のページです。

## ローカルで起動

Node.js 22.12以上とnpmを使用します。

```sh
git clone https://github.com/h-kurashina/portfolio.git
cd portfolio
npm ci
npm run dev
```

http://localhost:5173 を開いてください。ポートが使用中の場合、別のポートへ自動移動せず停止します。

## ビルドとテスト

```sh
npm run build
npx playwright install chromium
npm test
```

テスト用サーバーはPlaywrightが起動します。ローカルで起動済みの開発サーバーがある場合は再利用します。インストール済みのGoogle Chromeを使う場合は `PORTFOLIO_BROWSER_CHANNEL=chrome npm test` を実行してください。

GitHub Actionsでもビルドとブラウザテストを実行します。

## ページ

1 枚のページだけです（別のページは作らない）。上から、ヒーロー・脆弱性の報告実績・ペネトレーションテストの取引先・About と Now・Projects・Organizations・Open Source・Translate・Contact の順に並びます。右上で英語と日本語を切り替えられます（`?lang=ja` でも指定可）。文言は `src/data/home.ts` にまとめています。

## ロゴ・アイコンについて

`public/images/logos/` の企業・プロジェクトのロゴは、報告先や調査対象を示すためだけに使っています。商標は各社・各プロジェクトのものです。Meta・LINE・Supabase・Rust・C は [Simple Icons](https://simpleicons.org/)（CC0。`public/licenses/simple-icons-CC0.txt`）、Google の G は Wikimedia Commons、Codex は公式サイトのアプリのアイコン、OpenAI・APITable などは各組織の GitHub のアイコン、LinkAce はプロジェクトのロゴです。ロゴの無い個人のプロジェクトには、使っている言語（Rust・C）のロゴを付けています。

`public/images/clients/` は、ペネトレーションテストの取引先の各社サイトのアイコンです（各社の許可を得て掲載）。ドメインやサーバーなどの診断の中身は載せません。

`public/images/translate/` は、翻訳元の組織・作者の GitHub のアイコンです（翻訳元を示すためだけに使っています）。
