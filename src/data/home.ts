// Copy for the home page in English and Japanese. Detail pages keep their own text.
export type Lang = 'en' | 'ja'

type Text = Record<Lang, string>

export const person = {
  name: 'Hinata Kurashina',
  handle: 'h.kurashina',
  githubUrl: 'https://github.com/hina-kura49',
  xUrl: 'https://x.com/hkurashina49',
  email: 'h.kurashina49@gmail.com',
}

export const nav: { id: string; label: Text }[] = [
  { id: 'about', label: { en: 'About', ja: 'About' } },
  { id: 'security', label: { en: 'Security', ja: 'Security' } },
  { id: 'projects', label: { en: 'Projects', ja: 'Projects' } },
  { id: 'open-source', label: { en: 'Open Source', ja: 'Open Source' } },
  { id: 'translate', label: { en: 'Translate', ja: 'Translate' } },
  { id: 'contact', label: { en: 'Contact', ja: 'Contact' } },
]

export const hero = {
  status: { en: 'Available for opportunities', ja: 'お仕事のご相談を受け付けています' },
  // The middle part is drawn in brand colors, one color per letter.
  // Kept in English in both languages.
  title: ['Full-Stack Engineer', 'for a More ', 'Secure', ' Internet'],

  lead: {
    en: 'A software engineer and security researcher who loves building, breaking, and improving software.',
    ja: 'ソフトウェアをつくり、壊し、より良くすることが好きな、ソフトウェアエンジニア・セキュリティリサーチャーです。',
  },
  primary: { en: 'View My Work', ja: '作品を見る' },
  secondary: { en: 'Contact Me', ja: 'お問い合わせ' },
}

// Vulnerability reports by vendor, shown in the home band and on /case-study.
// Details of these reports are not published.
export const securityBand = {
  label: { en: 'Security Research', ja: 'セキュリティリサーチ' },
  note: { en: 'Reported vulnerabilities at Google, Meta, and more.', ja: 'Google・Meta などに脆弱性を報告しています。' },
  companies: { en: 'Companies', ja: '企業' },
  oss: { en: 'Open source', ja: 'オープンソース' },
  total: { en: 'reports', ja: '件の報告' },
  unit: { en: 'Reports ×', ja: '報告 ' },
  unitAfter: { en: '', ja: ' 件' },
  vendors: [
    { id: 'google', name: 'Google', count: 1, logo: '/images/logos/google.svg' },
    { id: 'meta', name: 'Meta', count: 2, logo: '/images/logos/meta.svg' },
    { id: 'openai', name: 'OpenAI', count: 1, logo: '/images/logos/openai.png' },
    { id: 'line', name: 'LINE', count: 2, logo: '/images/logos/line.svg' },
  ],
}

// OSS projects with submitted reports (tracked in Linear MYT: submitted / triage / in review / accepted).
// Logos: the project's own logo, Simple Icons (CC0), or the organization's GitHub avatar.
// Personal projects without a logo show the logo of their language (lang-*.svg).
export const ossResearch: { id: string; name: string; logo?: string; counted?: boolean}[] = [
  { id: 'dokku', name: 'Dokku', logo: '/images/logos/dokku.png' },
  { id: 'dokploy', name: 'Dokploy', logo: '/images/logos/dokploy.png' },
  { id: 'arcane', name: 'Arcane', logo: '/images/logos/arcane.png' },
  // Same report as OpenAI in the company row, so it is not counted twice.
  { id: 'codex', name: 'Codex', logo: '/images/logos/codex.png', counted: false },
  { id: 'maxun', name: 'Maxun', logo: '/images/logos/maxun.png' },
  { id: 'apitable', name: 'APITable', logo: '/images/logos/apitable.png' },
  { id: 'komodo', name: 'Komodo', logo: '/images/logos/komodo.png' },
  { id: 'morphik', name: 'Morphik', logo: '/images/logos/morphik.png' },
  { id: 'supabase-mcp', name: 'Supabase MCP', logo: '/images/logos/supabase.svg' },
  { id: 'khoj', name: 'Khoj', logo: '/images/logos/khoj.png' },
  { id: 'homarr', name: 'Homarr', logo: '/images/logos/homarr.png' },
  { id: 'tinyauth', name: 'Tinyauth', logo: '/images/logos/tinyauth.png' },
  { id: 'shaarli', name: 'Shaarli', logo: '/images/logos/shaarli.png' },
  { id: 'lemmy', name: 'Lemmy', logo: '/images/logos/lemmy.png' },
  { id: 'readeck', name: 'Readeck', logo: '/images/logos/readeck.png' },
  { id: 'linkace', name: 'LinkAce', logo: '/images/logos/linkace.svg' },
  { id: 'qsv', name: 'qsv', logo: '/images/logos/qsv.png' },
  { id: 'antirion', name: 'antirion', logo: '/images/logos/lang-rust.svg' },
  { id: 'qdata', name: 'qData', logo: '/images/logos/qdata.png' },
  { id: 'tinyexr', name: 'tinyexr', logo: '/images/logos/lang-c.svg' },
  { id: 'bitpacking', name: 'bitpacking', logo: '/images/logos/bitpacking.png' },
  { id: 'jam-codec', name: 'jam-codec', logo: '/images/logos/jam-codec.png' },
  { id: 'bincode-next', name: 'bincode-next', logo: '/images/logos/bincode-next.png' },
  { id: 'fontdue', name: 'fontdue', logo: '/images/logos/lang-rust.svg' },
  { id: 'zune-png', name: 'zune-png', logo: '/images/logos/lang-rust.svg' },
  { id: 'desert', name: 'desert', logo: '/images/logos/lang-rust.svg' },
  { id: 'yaxpeax', name: 'yaxpeax-x86', logo: '/images/logos/lang-rust.svg' },
]

// Penetration testing clients (listed with each company's permission). Logos only, no names.
export const clients = {
  label: { en: 'Penetration Testing', ja: 'ペネトレーションテスト' },
  heading: { en: 'Trusted to test their products', ja: 'Web サイトやアプリの診断を任されています' },
  note: { en: 'Security assessments for websites and apps, trusted by companies.', ja: '企業の Web サイトやアプリのセキュリティ診断を担当しています。' },
  unit: { en: 'companies', ja: '社' },
  items: [
    { id: 'c01', logo: '/images/clients/c01.png' },
    { id: 'c02', logo: '/images/clients/c02.png' },
    { id: 'c03', logo: '/images/clients/c03.png' },
    { id: 'c04', logo: '/images/clients/c04.png' },
    { id: 'c05', logo: '/images/clients/c05.png' },
    { id: 'c06', logo: '/images/clients/c06.png' },
    { id: 'c07', logo: '/images/clients/c07.png' },
    { id: 'c08', logo: '/images/clients/c08.png' },
    { id: 'c09', logo: '/images/clients/c09.png' },
    { id: 'c10', logo: '/images/clients/c10.png' },
    { id: 'c11', logo: '/images/clients/c11.png' },
    { id: 'c12', logo: '/images/clients/c12.png' },
    { id: 'c13', logo: '/images/clients/c13.png' },
    { id: 'c14', logo: '/images/clients/c14.png' },
    { id: 'c15', logo: '/images/clients/c15.png' },
    { id: 'c16', logo: '/images/clients/c16.png' },
  ] as { id: string; logo: string }[],
}

export const about = {
  title: { en: 'About Me', ja: 'About Me' },
  body: {
    en: "I'm a full-stack engineer with a strong foundation in security, systems, and open source. I enjoy exploring the deepest layers of software — from OS and networks to application logic — and turning that knowledge into real-world impact. Alongside engineering, I lead a business at a startup.",
    ja: 'セキュリティ・システム・オープンソースを土台にしたフルスタックエンジニアです。OS やネットワークからアプリケーションのロジックまで、ソフトウェアの深い層を探り、その知識を現実の成果につなげることが好きです。開発と並行して、スタートアップで事業責任者を務めています。',
  },
  tags: ['Rust', 'Security', 'Malware Analysis', 'Incident Response', 'Linux', 'Distributed Systems', 'Web Development', 'Open Source', 'System Design'],
  nowTitle: { en: 'Now', ja: 'Now' },
  now: [
    { role: { en: 'Business Lead', ja: '事業責任者' }, place: { en: 'A startup · since 2026', ja: 'スタートアップ・2026 年〜' } },
    { role: { en: 'Software Engineer', ja: 'ソフトウェアエンジニア' }, place: { en: 'Web & mobile, full-stack', ja: 'Web・モバイル、フルスタック' } },
    { role: { en: 'Vulnerability Researcher', ja: '脆弱性リサーチャー' }, place: { en: 'Open source & companies', ja: 'オープンソース・企業への報告' } },
    { role: { en: 'Incident Response & Malware Analysis', ja: 'インシデント対応・マルウェア解析' }, place: { en: 'Compromised websites (WordPress, PHP)', ja: 'WordPress などの Web サイト' } },
    { role: { en: 'Rust compiler contributor', ja: 'Rust コンパイラのコントリビューター' }, place: { en: 'rust-lang/rust', ja: 'rust-lang/rust' } },
  ],
}

export const featured = {
  title: { en: 'Projects', ja: 'Projects' },
  note: { en: 'Things I build and maintain.', ja: 'つくって、育てているもの。' },
  soon: { en: 'Coming soon', ja: '近日公開' },
  items: [
    {
      id: 'jot',
      icon: '/images/projects/jot-icon.png',
      url: 'https://github.com/hina-kura49/jot',
      media: { kind: 'video', src: '/images/projects/jot-demo.webm', poster: '/images/projects/jot-demo-poster.webp' },
      tags: { en: ['Notes app', 'Desktop'], ja: ['ノートアプリ', 'デスクトップ'] },
      title: { en: 'Jot — Markdown notes that stay yours', ja: 'Jot — 自分の手元に残る Markdown ノート' },
      roles: { en: ['Plain .md files', 'Block editor', 'Vim mode', 'Tauri · React · Rust'], ja: ['ただの .md ファイル', 'ブロックエディタ', 'Vim モード', 'Tauri・React・Rust'] },
    },
    {
      id: 'ccbar',
      icon: '/images/projects/ccbar-icon.png',
      url: 'https://github.com/hina-kura49/ccbar',
      media: { kind: 'scene', scene: 'ccbar' },
      tags: { en: ['Developer tool', 'macOS'], ja: ['開発者ツール', 'macOS'] },
      title: { en: 'ccbar — Your Claude Code limit, always in sight', ja: 'ccbar — Claude Code の残りを、いつも目の端に' },
      roles: { en: ['Menu bar app', 'Reset notifications', 'Swift · Rust'], ja: ['メニューバーのアプリ', '回復の通知', 'Swift・Rust'] },
    },
    {
      id: 'unforge',
      icon: '/images/logos/org-rustsecjp.png',
      url: 'https://github.com/RustSecJP/unforge',
      media: { kind: 'scene', scene: 'unforge' },
      tags: { en: ['Reverse engineering', 'Rust'], ja: ['リバースエンジニアリング', 'Rust'] },
      title: { en: 'unforge — Read Rust binaries as Rust', ja: 'unforge — Rust のバイナリを、Rust として読む' },
      roles: { en: ['Panic-free ELF reader', 'No unsafe', 'Zero-copy', 'Fuzzed'], ja: ['パニックしない ELF リーダー', 'unsafe なし', 'ゼロコピー', 'ファズで検証'] },
    },
    {
      id: 'liwin',
      icon: '/images/projects/liwin-icon.svg',
      url: 'https://github.com/hina-kura49/liwin',
      media: { kind: 'scene', scene: 'liwin' },
      tags: { en: ['Window manager', 'Linux'], ja: ['ウィンドウ管理', 'Linux'] },
      title: { en: 'liwin — i3-style tiling for GNOME', ja: 'liwin — GNOME に、i3 風のタイル配置を' },
      roles: { en: ['Keyboard-driven', 'D-Bus daemon', 'GNOME Shell extension', 'Rust · TypeScript'], ja: ['キーボードで操作', 'D-Bus のデーモン', 'GNOME Shell の拡張', 'Rust・TypeScript'] },
    },
  ] as {
    id: string; icon: string; url: string; soon?: boolean
    media: { kind: 'gif'; src: string } | { kind: 'video'; src: string; poster: string } | { kind: 'scene'; scene: 'jot' | 'ccbar' | 'liwin' | 'unforge' | 'check' | 'trail' | 'wpware' }
    tags: Record<Lang, string[]>; title: Record<Lang, string>; roles: Record<Lang, string[]>
  }[],
}

export const organizations = {
  title: { en: 'Organizations', ja: 'Organizations' },
  note: { en: 'Organizations I founded and run.', ja: '自分で立ち上げ、動かしている組織。' },
  founder: { en: 'Founder', ja: '創設者' },
  items: [
    {
      id: 'rustsecjp', name: 'RustSecJP', logo: '/images/logos/org-rustsecjp.png', url: 'https://github.com/RustSecJP',
      description: { en: 'An unofficial Japanese community for Rust security: translations, incident records and tools.', ja: 'Rust のセキュリティを日本語で。翻訳・事件の記録・道具をつくる非公式のコミュニティ。' },
    },
    {
      id: 'minusone', name: 'MinusOne', logo: '/images/logos/org-minusone.png', url: 'https://github.com/0xFF-MinusOne',
      description: { en: 'An independent white-hat initiative for vulnerability response that does not depend on private companies.', ja: '民間企業にたよらない脆弱性対策を進める、独立したホワイトハットの取り組み。' },
    },
    {
      id: 'kura-rs', name: 'kura-rs', logo: '/images/logos/org-kura-rs.png', url: 'https://github.com/kura-rs',
      description: { en: 'Hand-written Rust components and ports — no LLM-generated code.', ja: '手で書いた Rust の部品と移植。LLM が書いたコードは使わない。' },
    },
  ],
}

// Unofficial Japanese translations. Icons are the upstream organization's or author's GitHub avatar.
export const translations = {
  title: { en: 'Translate', ja: 'Translate' },
  note: { en: 'Unofficial Japanese translations of security docs and courses.', ja: 'セキュリティの文書と講座の、非公式な日本語訳。' },
  groups: [
    { org: 'RustSecJP', label: 'Rust security', items: [
      { repo: 'nomicon-ja', title: 'The Rustonomicon', icon: '/images/translate/rust-lang.png' },
      { repo: 'unsafe-code-guidelines-ja', title: 'Unsafe Code Guidelines', icon: '/images/translate/rust-lang.png' },
      { repo: 'exploit-mitigations-ja', title: 'Exploit Mitigations', icon: '/images/translate/rust-lang.png' },
      { repo: 'rust-security-advisories-ja', title: 'Rust security advisories', icon: '/images/translate/rust-lang.png' },
      { repo: 'trusted-publishing-ja', title: 'Trusted Publishing', icon: '/images/translate/rust-lang.png' },
      { repo: 'miri-ja', title: 'Miri', icon: '/images/translate/rust-lang.png' },
      { repo: 'rust-guide-ja', title: 'Secure Rust Guidelines (ANSSI)', icon: '/images/translate/ANSSI-FR.png' },
      { repo: 'rust-guidelines-ja', title: 'Pragmatic Rust Guidelines', icon: '/images/translate/microsoft.png' },
      { repo: 'advisory-db-ja', title: 'RustSec advisory-db', icon: '/images/translate/rustsec.png' },
      { repo: 'cargo-vet-ja', title: 'cargo-vet', icon: '/images/translate/mozilla.png' },
      { repo: 'cargo-deny-ja', title: 'cargo-deny', icon: '/images/translate/EmbarkStudios.png' },
      { repo: 'supply-chain-tools-ja', title: 'cargo-auditable & cargo-crev', icon: '/images/translate/rust-secure-code.png' },
      { repo: 'unsafe-tools-ja', title: 'cargo-careful & cargo-geiger', icon: '/images/translate/geiger-rs.png' },
      { repo: 'kani-ja', title: 'Kani Rust Verifier', icon: '/images/translate/model-checking.png' },
      { repo: 'verus-ja', title: 'Verus', icon: '/images/translate/verus-lang.png' },
      { repo: 'safety-critical-rust-coding-guidelines-ja', title: 'Safety-Critical Rust Guidelines', icon: '/images/translate/rustfoundation.png' },
      { repo: 'package-repository-security-ja', title: 'Securing Software Repositories', icon: '/images/translate/ossf.png' },
    ] },
    { org: '0xFF-MinusOne', label: 'Offensive security', items: [
      { repo: 'testing-handbook-ja', title: 'Testing Handbook', icon: '/images/translate/trailofbits.png' },
      { repo: 'fuzzing101-ja', title: 'Fuzzing101', icon: '/images/translate/githubsecuritylab.png' },
      { repo: 'ost2-arch1001-ja', title: 'OST2 Arch1001: x86-64 Assembly', icon: '/images/translate/ost2.png' },
      { repo: 'how2heap-ja', title: 'how2heap', icon: '/images/translate/shellphish.png' },
      { repo: 'pwntools-docs-ja', title: 'pwntools docs', icon: '/images/translate/Gallopsled.png' },
      { repo: 'pwntools-tutorial-ja', title: 'pwntools tutorial', icon: '/images/translate/Gallopsled.png' },
      { repo: 'pwntools-api-ja', title: 'pwntools API', icon: '/images/translate/Gallopsled.png' },
      { repo: 'MBE-ja', title: 'Modern Binary Exploitation', icon: '/images/translate/RPISEC.png' },
      { repo: 'Malware-lectures-ja', title: 'RPISEC Malware', icon: '/images/translate/RPISEC.png' },
      { repo: 'Z0FCourse_ReverseEngineering-ja', title: 'Z0FCourse Reverse Engineering', icon: '/images/translate/0xZ0F.png' },
      { repo: 'linux-kernel-exploitation-ja', title: 'Linux Kernel Exploitation', icon: '/images/translate/xairy.png' },
      { repo: 'linux-exploitation-course-ja', title: 'Linux Exploitation Course', icon: '/images/translate/nnamon.png' },
      { repo: 'heap-exploitation-ja', title: 'Heap Exploitation', icon: '/images/translate/DhavalKapil.png' },
      { repo: 'cybersec-notes-ja', title: 'Cybersec Notes', icon: '/images/translate/ir0nstone.png' },
      { repo: 'ctf-wiki-ja', title: 'CTF Wiki', icon: '/images/translate/ctf-wiki.png' },
      { repo: 'BinExp-ja', title: 'BinExp', icon: '/images/translate/rosehgal.png' },
    ] },
  ] as { org: string; label: string; items: { repo: string; title: string; icon?: string }[] }[],
}

export const openSource = {
  title: { en: 'Open Source', ja: 'Open Source' },
  note: { en: 'Building tools for the community.', ja: 'コミュニティのための道具づくり。' },
}

export const contact = {
  title: { en: 'Contact', ja: 'Contact' },
  body: { en: 'Feel free to reach out by email, GitHub, or X.', ja: 'メール・GitHub・X から、お気軽にご連絡ください。' },
}
