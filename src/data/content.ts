import type { Contribution } from '../types/project'
import caseStudiesData from './case-studies.json' with { type: 'json' }

export type DevelopmentWork = {
  imageUrl?: string
  id: string
  title: string
  description: string
  languages: string[]
  fields: string[]
  url?: string
}

export type Book = {
  imageUrl?: string
  id: string
  title: string
  author: string
  review?: string
  status: 'unread' | 'reading' | 'read' | null
  languages: string[]
  fields: string[]
  nickname?: string
  recommended: boolean
  url?: string
}

export type CaseStudy = {
  id: string
  title: string
  target: string
  severity: 'critical' | 'high' | 'medium' | 'low'
  date: string
  tags: string[]
  // 'embargoed' = reported but not yet public; the 5-step details are withheld
  // and never stored in this repo until the advisory is public. The daily
  // sync-case-studies workflow flips it to 'published' and fills the details
  // from the now-public advisory. See scripts/sync-case-studies.mjs.
  status: 'embargoed' | 'published'
  advisory?: string // GitHub advisory id (GHSA-…) to poll
  cve?: string // CVE id to poll via OSV (e.g. for findings reported by email)
  situation?: string
  approach?: string
  finding?: string
  fix?: string
  lesson?: string
  url?: string
}

export type Biography = {
  role: string
  openSource: string
  introduction: string
  motivation: string
  company: { name: string; url?: string }
  education: string
  product: string
  history: { period: string; title: string; detail?: string }[]
  languages: string[]
  frameworks: string[]
  security: string
  interests: string[]
  outlook: string
  hobby: string
  email?: string
  photo: { src: string; alt: string; width: number; height: number }
  githubUrl?: string
  xUrl?: string
}

export const biography: Biography = {
  role: 'Software Engineer / Vulnerability Researcher / Business Lead',
  openSource: 'Contributor to the Rust compiler (rustc)',
  introduction: 'スタートアップで、Beaulabの開発に取り組んでいます。ソフトウェアエンジニアリングを軸に、事業責任者も務めています。',
  motivation: 'Beaulabを事業としてつくることになったのが、開発を始めたきっかけです。必要な技術を学ぶうちに、プログラミングそのものの面白さを感じるようになりました。',
  company: { name: 'スタートアップ' },
  education: '中央大学',
  product: 'Beaulab',
  history: [
    { period: '2025', title: '中央大学 入学' },
    { period: '2026.02', title: 'スタートアップに入社' },
    { period: '2026.04', title: '事業責任者に就任' },
    { period: '2026.09', title: 'Rust Developer JP 参加', detail: 'プログラミング言語Rustのコミュニティ。' },
    { period: '2026.09', title: 'rust-jp 参加' },
    { period: '2026.10', title: 'Contributor to the Rust compiler (rustc)', detail: 'Rustのコンパイラ（rust-lang/rust）に送った修正がマージされました。' },
  ],
  languages: ['TypeScript', 'Python', 'Go', 'Rust'],
  frameworks: ['React'],
  security: '日本ハッカー協会の認定ハッカーです。Hack The Boxなどは趣味で続けていて、最近はAIとWebアプリの脆弱性診断に力を入れています。Burp Suiteを用いたWebペネトレーションテストの経験があります。脆弱性リサーチャーとしてOSSの脆弱性調査にも取り組んでいて、見つけた脆弱性を開発元に報告し、修正の公開に向けて調整を進めています。',
  interests: ['AI・Webの脆弱性診断', 'Rust / OSS', '低レイヤー', 'インフラ', '競技プログラミング'],
  outlook: 'AIとWebアプリの脆弱性診断の経験を積み、見つけた問題を開発側で直すところまで関わっていきたいです。また、Rust Developer JPやrust-jpに参加し、RustのOSSへのコントリビュートを始めました。低レイヤーやインフラの分野を学び、競技プログラミングにも挑戦したいです。開発者や学生起業家など、さまざまな人との交流も広げていきたいと思っています。',
  hobby: 'チェス / Hack The Box',
  githubUrl: 'https://github.com/h-kurashina',
  xUrl: 'https://x.com/hkurashina49',
  photo: {
    src: '/images/profile/h-kurashina.jpg',
    alt: 'ライトアップされた水辺でのh.kurashina',
    width: 1108,
    height: 1477,
  },
}
export const developmentWorks: DevelopmentWork[] = [
  {
    id: 'beaulab',
    title: 'Beaulab',
    description: '美容クリニックのためのSNSプラットフォーム。口コミや投稿でクリニックを探し、予約やメッセージのやり取りまでできます。事業責任者を務めながら、Web（Next.js）とモバイルアプリ（React Native / Expo）を開発しています。',
    languages: ['TypeScript', 'React Native'],
    fields: ['Webアプリ', 'モバイルアプリ'],
    imageUrl: '/images/projects/beaulab-icon.png',
    url: 'https://beaulab.jp',
  },
  {
    id: 'tadori',
    title: 'Tadori',
    description: '誰かが作った学びの道を、辿る。技術書・ビジネス書を「順番」と「できるようになること」でつなぐ、学習ロードマップのモバイルアプリ。ホームには今読む一冊を表示し、各本のチェックポイントに到達すると次の一冊へ進みます。Expo（React Native）とExpo Routerで開発中のMVPです。',
    languages: ['TypeScript', 'React Native'],
    fields: ['モバイルアプリ'],
    imageUrl: '/images/projects/tadori-icon.svg',
    url: 'https://github.com/h-kurashina/tadori',
  },
  {
    id: 'wryte',
    title: 'Wryte',
    description: '技術知識を、書く・確かめる・整える・公開するための技術執筆・知識共有サービス。フロントエンドはReactとVite、バックエンドはPython（FastAPI）とPostgreSQLで開発しています。',
    languages: ['TypeScript', 'React', 'Python'],
    fields: ['Webアプリ'],
    imageUrl: '/images/projects/wryte-icon.svg',
  },
  {
    id: 'kura',
    title: 'kura-rs',
    description: 'コピーして使う、証拠つきのRust部品集。AIのデータ処理（チャンク分割・テキスト正規化・重複除去・トークン数の計測）とセキュリティ（ログ解析・パターン照合・ハッシュ・バイナリ解析）向けの小さな部品を、shadcn/uiのように自分のプロジェクトへソースごとコピーして使う形を目指しています。部品ごとに、参照実装との差分テストとベンチマークを付ける設計です。CLI・スキーマ・レジストリ検証・axumのAPIサーバーをRustのワークスペースで作り、ドキュメントサイトはNext.jsで8言語に対応しました。現在は開発中で、登録している8つの部品はサンプルデータです。MITとApache 2.0のデュアルライセンスで公開しています。',
    languages: ['Rust', 'TypeScript'],
    fields: ['ライブラリ', 'ツール・自動化'],
    imageUrl: '/images/projects/kura-icon.svg',
    url: 'https://kura-tau.vercel.app',
  },
  {
    id: 'sorted-multiset-rs',
    title: 'SortedMultiset for Rust',
    description: '競技プログラミング向けの、重複を許す順序付き集合。tatyam氏のPython版SortedSetと同じ平方分割で実装し、同じ感覚で使えるAPIにしています。標準ライブラリのみ・unsafeなしの1ファイルで、提出コードにそのまま貼り付けて使えます。参照実装との差分テストで検証し、同じ操作列でPython版の約10〜13倍の速さを確認しました。CC0で公開しています。',
    languages: ['Rust'],
    fields: ['競技プログラミング', 'ライブラリ'],
    imageUrl: '/images/projects/sorted-multiset-icon.svg',
    url: 'https://github.com/h-kurashina/sorted-multiset-rs',
  },
  {
    id: 'trail',
    title: 'trail',
    description: 'Gitのworktreeの開発履歴を再構成する、ローカル完結のCLI。コミットだけでなく、作業ツリーの変更やHEADの移動も時系列のチェックポイントとして並べ、「何が変わったか」だけでなく「どう変わったか」を確認できます。最後のpush以降のレビューや、worktree・コミット単位のdiffにも対応しています。Rustで実装し、MITライセンスで公開しています。crates.ioにも「git-trail」として公開しており、cargo install git-trail でインストールできます。',
    languages: ['Rust'],
    fields: ['ツール・自動化'],
    imageUrl: '/images/projects/trail-icon.svg',
    url: 'https://github.com/h-kurashina/git-trail',
  },
  {
    id: 'sta',
    title: 'sta.',
    description: '科目を選んでから撮る、学生向けのドキュメント整理アプリ。スキャンした資料を科目へ直接保存し、閲覧中も科目をすばやく切り替えられます。SwiftUIとVisionKitで実装し、MITライセンスで公開しています。',
    languages: ['Swift'],
    fields: ['iOSアプリ'],
    imageUrl: '/images/projects/sta-logo.svg',
    url: 'https://github.com/h-kurashina/sta.',
  },
]
// Editions and reading dates are intentionally omitted until confirmed.
export const books: Book[] = [
  { id: 'typescript-blueberry', imageUrl: '/images/books/typescript-blueberry.jpg', title: 'プロを目指す人のためのTypeScript入門', author: '鈴木 僚太', nickname: 'ブルーベリー本', languages: ['TypeScript'], fields: ['言語の基礎', '型システム'], status: null, recommended: false, url: 'https://gihyo.jp/book/2022/978-4-297-12747-3' },
  { id: 'effective-typescript', imageUrl: '/images/books/effective-typescript.jpg', title: 'Effective TypeScript 第2版', author: 'Dan Vanderkam', languages: ['TypeScript'], fields: ['型システム', '実践・設計'], status: null, recommended: false, url: 'https://www.oreilly.co.jp/books/9784814401093/' },
  { id: 'introducing-python', imageUrl: '/images/books/introducing-python.jpg', title: '入門 Python 3', author: 'Bill Lubanovic', languages: ['Python'], fields: ['言語の基礎'], status: null, recommended: false, url: 'https://www.oreilly.co.jp/books/9784873117386/' },
  { id: 'effective-python', imageUrl: '/images/books/effective-python.jpg', title: 'Effective Python 第3版', author: 'Brett Slatkin', languages: ['Python'], fields: ['実践・設計'], status: null, recommended: false, url: 'https://www.oreilly.co.jp/books/9784814401338/' },
  { id: 'ddia', imageUrl: '/images/books/ddia.jpg', title: 'データ指向アプリケーションデザイン', author: 'Martin Kleppmann', nickname: 'DDIA / イノシシ本', languages: [], fields: ['分散システム', 'データ設計'], status: 'unread', recommended: false, url: 'https://www.oreilly.co.jp/books/9784873118703/' },
  { id: 'command-line-rust', imageUrl: '/images/books/rust-workbook.jpg', title: 'Rustの練習帳', author: 'Ken Youens-Clark', languages: ['Rust'], fields: ['言語の基礎', 'CLI・ツール'], status: 'unread', recommended: false, url: 'https://www.oreilly.co.jp/books/9784814400584/' },
  { id: 'ruby-cherry', imageUrl: '/images/books/ruby-cherry.jpg', title: 'プロを目指す人のためのRuby入門', author: '伊藤 淳一', nickname: 'チェリー本', languages: ['Ruby'], fields: ['言語の基礎'], status: null, recommended: false, url: 'https://gihyo.jp/book/2017/978-4-7741-9397-7' },
  { id: 'professional-react', imageUrl: '/images/books/professional-react.jpg', title: 'プロフェッショナルWebプログラミング React', author: '西畑 一馬・長谷川 広武・伊藤 祐策・扇田 心', languages: ['JavaScript', 'React'], fields: ['Webフロントエンド'], status: null, recommended: false, url: 'https://books.mdn.co.jp/books/3224303034/' },
]
// 公開してよい題材（自作の脆弱なアプリ・学習用ラボ・公開済みの報告など）だけを載せる。仕事の診断結果は載せない。
// データは src/data/case-studies.json（機械で更新可能）。開示前のエントリは status: 'embargoed'
// で詳細を持たず、sync-case-studies ワークフローが公開後に 'published' へ切り替える。
export const caseStudies: CaseStudy[] = caseStudiesData as CaseStudy[]
export const contributions: Contribution[] = [
  {
    id: 'rust-issue-164904',
    repository: 'rust-lang/rust',
    issueUrl: 'https://github.com/rust-lang/rust/issues/164904',
    resolutionUrl: 'https://github.com/rust-lang/rust/pull/165681',
    title: 'Searcher の安全性契約に不足する条件を報告',
    description: 'Rust標準ライブラリの文字列検索で、str::split が依存する安全性の条件が Searcher のドキュメントに明記されていない問題を、nightlyでの再現コードと実行結果を添えて報告。安全性要件を明文化する修正PR #165681 が2026年11月10日（UTC）にマージされ、Issueが解決済みになりました。担当したのは問題の検証・報告で、修正PRの実装は別のコントリビューターによるものです。',
    status: 'resolved',
    date: '2026-10-25',
    languages: ['Rust'],
  },
  {
    id: 'rust-163371',
    repository: 'rust-lang/rust',
    pullRequestUrl: 'https://github.com/rust-lang/rust/pull/163371',
    title: "Don't suggest replacing foreign format specifiers in `concat!` output",
    description: '#163368 の作業中に見つけた同じ種類の不具合を修正。concat! で組み立てたフォーマット文字列に printf 形式の指定子（%d など）があると、コンパイラが無関係なソースを書き換える修正案を出していた。修正案を出すのをやめ、「`%d` は `{}` と書く」という説明の注記に置き換えた。',
    status: 'merged',
    date: '2026-09-26',
    languages: ['Rust'],
  },
  {
    id: 'rust-163368',
    repository: 'rust-lang/rust',
    pullRequestUrl: 'https://github.com/rust-lang/rust/pull/163368',
    title: "Don't build format string suggestions from `concat!` offsets",
    description: 'concat! で組み立てたフォーマット文字列に対して、コンパイラが展開後の文字列の位置をもとに修正案を作っていた問題（issue #156101）を修正。マルチバイト文字の途中を指してコンパイラ自体がクラッシュ（ICE）したり、無関係なコードを引数として提案したりしていた。ソースに直接書かれた文字列リテラルのときだけ修正案を出すようにした。',
    status: 'merged',
    date: '2026-09-26',
    languages: ['Rust'],
  },
  {
    id: 'ac-library-rs-183',
    repository: 'rust-lang-ja/ac-library-rs',
    pullRequestUrl: 'https://github.com/rust-lang-ja/ac-library-rs/pull/183',
    title: 'Output test binary to the temporary directory in test-expand.sh',
    description: '展開テスト用スクリプトが、実行するたびにコンパイル済みバイナリをリポジトリ直下に残していた問題（issue #134）を修正。rustc に出力先を指定し、一時ディレクトリに出力するようにした。',
    status: 'open',
    date: '2026-09-24',
    languages: ['Shell', 'Rust'],
  },
  {
    id: 'rust-clippy-17774',
    repository: 'rust-lang/rust-clippy',
    pullRequestUrl: 'https://github.com/rust-lang/rust-clippy/pull/17774',
    title: 'Avoid cloning cached test item names in `is_in_test`',
    description: 'Clippy内部のユーティリティで、キャッシュが当たるたびにVecを複製していた処理をArc<[Symbol]>の共有に置き換え、あわせて判定の順序を見直して不要な処理を省く性能改善。',
    status: 'open',
    date: '2026-09-23',
    languages: ['Rust'],
  },
]
export const languages = ['TypeScript', 'JavaScript', 'Python', 'Go', 'Rust']
export const fields = ['Webアプリ', 'インフラ', 'セキュリティ', 'ツール・自動化']

export function filterWorks(works: DevelopmentWork[], language: string, field: string) {
  return works.filter(work => (!language || work.languages.includes(language)) && (!field || work.fields.includes(field)))
}
