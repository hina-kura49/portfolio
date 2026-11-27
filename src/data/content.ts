import type { Contribution } from '../types/project'
import caseStudiesData from './case-studies.json' with { type: 'json' }

export type CaseStudy = {
  id: string
  title: string
  title_en?: string // English title for the home page
  tags_en?: string[]
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

export const caseStudies: CaseStudy[] = caseStudiesData as CaseStudy[]
export const contributions: Contribution[] = [
  {
    id: 'comprehensive-rust-3348',
    repository: 'google/comprehensive-rust',
    pullRequestUrl: 'https://github.com/google/comprehensive-rust/pull/3348',
    title: 'ja: Refresh translation with msgmerge',
    description: 'Google の Rust 講座（Comprehensive Rust）の日本語訳を、原文の更新に合わせて msgmerge で最新にした。',
    status: 'open',
    date: '2026-11-20',
    languages: ['Japanese'],
  },
  {
    id: 'rust-164910',
    repository: 'rust-lang/rust',
    pullRequestUrl: 'https://github.com/rust-lang/rust/pull/164910',
    title: 'Add regression tests for #164253',
    description: '-Znext-solver=globally でコンパイラがクラッシュ（ICE）していた issue #164253 の2つの例に、回帰テストを追加。現在の nightly ではクラッシュしなくなっていることを確かめ、issue を閉じられるようにした。',
    status: 'merged',
    date: '2026-10-25',
    languages: ['Rust'],
  },
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
