// English text for the default (English) site. The Japanese originals stay in
// content.ts, projects.ts and case-studies.json, which the sync scripts edit;
// anything missing here falls back to the Japanese original.
import type { Biography, CaseStudy } from './content'

export const projectsEn: Record<string, { description: string }> = {
  'personal-portfolio': { description: 'My profile and career so far.' },
  development: { description: 'Products and services I have built.' },
  'case-study': { description: 'Finding vulnerabilities in permitted environments, through to the fix.' },
  'open-source': { description: 'Contributions to other repositories.' },
}

export const biographyEn: Partial<Biography> = {
  introduction: 'I work on Beaulab at a startup, with software engineering at the core, and also serve as its business lead.',
  motivation: 'I started programming when I set out to build Beaulab as a business. Learning the skills it needed, I came to enjoy programming for its own sake.',
  company: { name: 'Startup' },
  education: 'Chuo University',
  history: [
    { period: '2025', title: 'Entered Chuo University' },
    { period: '2026.02', title: 'Joined a startup' },
    { period: '2026.04', title: 'Became business lead' },
    { period: '2026.09', title: 'Joined Rust Developer JP', detail: 'A community for the Rust programming language.' },
    { period: '2026.09', title: 'Joined rust-jp' },
    { period: '2026.10', title: 'Contributor to the Rust compiler (rustc)', detail: 'My fixes to the Rust compiler (rust-lang/rust) were merged.' },
    { period: '2026.11', title: 'Reported vulnerabilities to Google, Microsoft, Meta and others', detail: 'Submitted through each company’s vulnerability reporting program. Details stay private until fixes are released.' },
  ],
  security: 'I am a certified hacker of the Japan Hacker Association. I keep up with Hack The Box and similar platforms as a hobby, and lately I focus on vulnerability assessment of AI and web applications. I have experience with web penetration testing using Burp Suite. In Rust, I reported a gap in a standard library safety contract (the conditions unsafe code must uphold), which led to a fix. As a vulnerability researcher I also audit open source software, report what I find to the maintainers, and coordinate toward the release of fixes. In November 2026 I also reported vulnerabilities to Google, Microsoft, Meta and others.',
  interests: ['AI & web vulnerability assessment', 'Rust / OSS', 'Low-level systems', 'Infrastructure', 'Competitive programming'],
  outlook: 'I want to keep building experience in vulnerability assessment of AI and web applications, and stay involved until the problems I find are fixed on the developer side. I have also joined Rust Developer JP and rust-jp and started contributing to Rust open source projects. I want to learn low-level systems and infrastructure, take on competitive programming, and meet more people, from developers to student founders.',
  hobby: 'Chess / Hack The Box',
  photo: { src: '/images/profile/h-kurashina.jpg', alt: 'h.kurashina by an illuminated waterside', width: 1108, height: 1477 },
}

export const worksEn: Record<string, { description: string }> = {
  beaulab: { description: 'A social platform for aesthetic clinics. Find clinics through reviews and posts, then book and message them in one place. As business lead, I also build the web app (Next.js) and the mobile app (React Native / Expo).' },
  tadori: { description: 'Follow a learning path someone else has laid out. A learning-roadmap mobile app that links technical and business books by order and by what you will be able to do. The home screen shows the book to read now, and reaching each book’s checkpoints moves you on to the next. An MVP in development with Expo (React Native) and Expo Router.' },
  wryte: { description: 'A technical writing and knowledge-sharing service for writing, verifying, refining and publishing technical knowledge. The frontend uses React and Vite; the backend uses Python (FastAPI) and PostgreSQL.' },
  kura: { description: 'A collection of copy-in Rust components that come with evidence. Small components for AI data processing (chunking, text normalization, deduplication, token counting) and security (log parsing, pattern matching, hashing, binary analysis), meant to be copied into your project as source, in the spirit of shadcn/ui. Each component is designed to ship with differential tests against a reference implementation and benchmarks. The CLI, schema, registry validation and an axum API server live in a Rust workspace, and the documentation site is built with Next.js in eight languages. Still in development; the eight registered components are sample data. Dual-licensed under MIT and Apache 2.0.' },
  'sorted-multiset-rs': { description: 'An ordered multiset for competitive programming. It uses the same square-root decomposition as tatyam’s Python SortedSet, with an API that feels the same. A single file with only the standard library and no unsafe, ready to paste into a submission. Verified with differential tests against a reference implementation, and about 10–13× faster than the Python version on the same operation sequences. Released under CC0.' },
  trail: { description: 'A fully local CLI that reconstructs the development history of a Git worktree. Beyond commits, it lays out working-tree changes and HEAD moves as checkpoints in time, so you can see not just what changed but how. It also supports reviewing everything since the last push and diffs per worktree or commit. Written in Rust under the MIT license, and published on crates.io as “git-trail” (cargo install git-trail).' },
  sta: { description: 'A document organizer for students: pick the subject first, then scan. Scans are saved straight into their subject, and you can switch subjects quickly while viewing. Built with SwiftUI and VisionKit under the MIT license.' },
}

/** Display names for the Japanese field/tag values used as filter keys and tags. */
export const termsEn: Record<string, string> = {
  'Webアプリ': 'Web apps',
  'モバイルアプリ': 'Mobile apps',
  'iOSアプリ': 'iOS apps',
  'ライブラリ': 'Libraries',
  'ツール・自動化': 'Tools & automation',
  '競技プログラミング': 'Competitive programming',
  'インフラ': 'Infrastructure',
  'セキュリティ': 'Security',
  'インシデント対応': 'Incident response',
  'トリアージ': 'Triage',
  '任意ファイル書き込み': 'Arbitrary file write',
  'シンボリックリンク': 'Symlinks',
  '認可不備': 'Broken authorization',
  '情報漏えい': 'Information disclosure',
  '未認証': 'Unauthenticated',
  'SQLインジェクション': 'SQL injection',
  '認証境界': 'Auth boundary',
  'マルチテナント': 'Multi-tenant',
  '確認バイパス': 'Confirmation bypass',
  'クラウドメタデータ': 'Cloud metadata',
  '対策の抜け道': 'Mitigation gap',
  'DNS リバインディング': 'DNS rebinding',
}

type CaseText = Partial<Pick<CaseStudy, 'title' | 'target' | 'situation' | 'approach' | 'finding' | 'fix' | 'lesson'>>

const withheld = 'Exploitation details will be published once the fix is public.'

export const caseStudiesEn: Record<string, CaseText> = {
  'php2shell-triage': {
    title: 'First response to php2shell, a critical PHP vulnerability (cross-site triage)',
    target: 'PHP runtime (php2shell / CVE-2026-109618, 109619)',
    situation: 'After php2shell (CVE-2026-109618 / 109619), a critical flaw in PHP itself that allows unauthenticated remote code execution, was disclosed on 2026-10-21, I led the first response for several websites I am responsible for. A proof of concept had leaked and indiscriminate attacks had begun. Company names, domains and credentials are withheld for confidentiality.',
    approach: 'I limited the work to external checks that would not break production sites. First, HTTP response headers (Server / X-Powered-By) let me rule out sites not running PHP early and narrow the scope. Next, DNS (NS and A records) identified the hosting providers, which led to a practical plan: if a provider already offers a patched PHP, each site only needs its version checked and switched. I also enumerated subdomains from certificate transparency logs (crt.sh) and reviewed SPF / DMARC across the board.',
    finding: 'Besides the sites running PHP, I found forgotten assets: unused subdomains and staging / dev environments on separate infrastructure. Indiscriminate attacks do not distinguish production from staging, so neglected assets are the biggest risk. The review also surfaced cross-cutting risks unrelated to php2shell, such as weak or reused passwords and missing SPF / DMARC.',
    fix: 'The fix is to upgrade the PHP runtime to a patched version; updating the application does not help. I prepared a step-by-step check guide and a request sheet so each owner could confirm and switch the version in their hosting control panel on their own. I also proposed an inventory of neglected assets and corrections to the mail settings (SPF / DMARC).',
    lesson: 'Separating fact from inference in the report (no evidence of compromise, so this is prevention), confirming suspicions with measurements such as redirects and HSTS before sharing them, keeping the PHP flaw apart from operational gaps (passwords, mail settings), and tailoring the same content for executives, developers and non-technical readers: these made the first response accurate and trusted.',
  },
  'dokku-tar-symlink': {
    title: 'Dokku: arbitrary file write via symlinks in tar archives',
    target: 'Dokku (git:from-archive, certs:add / CVE-2026-45405)',
    finding: 'git:from-archive and certs:add do not validate symlinks inside the tar archives they extract, so following a link lets an attacker write files to arbitrary paths that should not be writable. CVSS 3.1: 9.0 (Critical).',
  },
  'dokploy-cross-org-idor': {
    title: 'Dokploy: missing authorization checks across organizations (IDOR)',
    target: 'Dokploy (tRPC endpoints / CVE-2026-43917)',
    finding: 'Several tRPC endpoints lack activeOrganizationId validation, a cross-organization IDOR that lets users read and modify another organization’s resources. CVSS 4.0: 5.3 (Medium).',
  },
  'arcane-compose-env-disclosure': {
    title: 'Arcane: unauthenticated disclosure of Compose templates and .env',
    target: 'Arcane (custom Compose templates / CVE-2026-42461)',
    finding: 'Custom Compose templates can be fetched without authentication, leaking even the .env secrets they contain. CVSS 4.0: 8.7 (High).',
  },
  'apitable-sqli': {
    title: 'SQL injection (an open source business database app)',
    situation: `In an open source business database app, I found and reported a SQL injection vulnerability where user-supplied parameters are embedded into SQL unsafely. I confirmed it works against a real database. ${withheld}`,
  },
  'maxun-rce': {
    title: 'Remote code execution by regular users (an open source scraping tool)',
    situation: `In an open source no-code scraping tool, I found that a self-registered regular user can execute code on the server (remote code execution), and reported it to the maintainers. ${withheld}`,
  },
  'komodo-alerter': {
    title: 'Secret exfiltration and SSRF by non-admins (an open source deployment platform)',
    situation: `In an open source server deployment platform, I found and reported a vulnerability that lets a regular, non-admin user exfiltrate server-side secrets and, by controlling the destination, reach the internal network (SSRF). ${withheld}`,
  },
  'morphik-idor': {
    title: 'Reading chat history across tenants (an open source AI app)',
    situation: `In an AI app where several customers share the same platform, I found and reported an authorization flaw (IDOR) that exposes other tenants’ chat histories, not just your own. I confirmed it in a real environment. ${withheld}`,
  },
  'supabase-mcp-cte': {
    title: 'Bypassing the confirmation flow for destructive SQL (an open source MCP server)',
    situation: `In an MCP server that connects AI to databases, I found and reported a way to slip past the confirmation flow meant to run before potentially destructive SQL. The root cause was that the safety check relied on the statement’s surface text. ${withheld}`,
  },
  'mcp-server-ssrf': {
    title: 'SSRF from server-side fetches into the internal network (an open source MCP server)',
    target: 'An open source MCP server (for browser automation)',
    situation: `In an MCP server for driving a browser from AI, the destination check on the server’s own requests does not block internal addresses, so with default settings it reaches the internal network, including cloud metadata (SSRF). I found and reported it, and confirmed in an isolated environment that fake credentials could be read. ${withheld}`,
  },
  'ai-assistant-ssrf': {
    title: 'SSRF from a web fetch feature into internal services (an open source AI assistant)',
    target: 'An open source AI assistant',
    situation: `In a self-hostable AI assistant, when the server fetches a URL requested by a logged-in user, the internal-address check is only used to route the request rather than block it, so it reaches internal services and cloud metadata (SSRF). I found and reported it. ${withheld}`,
  },
  'dashboard-ping-ssrf': {
    title: 'Only the health-check path skips SSRF protection (an open source dashboard)',
    target: 'An open source home server dashboard',
    situation: `In a home server dashboard with solid SSRF protection on other requests, only the health check (ping) for registered apps bypasses it, letting someone probe for internal hosts and ports. I found and reported it. ${withheld}`,
  },
  'bookmark-cgnat-ssrf': {
    title: 'SSRF filter lets the CGNAT range through (an open source bookmark manager)',
    target: 'An open source bookmark manager (Laravel)',
    situation: `In a library used by a bookmark manager, the filter that blocks internal addresses treats the CGNAT range (100.64.0.0/10, used by Tailscale and others) as public, so internal services in that range are reachable. I found and reported it, and confirmed the misclassification in an isolated environment. ${withheld}`,
  },
  'readlater-dns-rebinding': {
    title: 'DNS rebinding slips past SSRF protection (an open source read-later app)',
    target: 'An open source read-later app (Go)',
    situation: `In a read-later app, the destination IP is checked, but the name is resolved again when actually connecting, so swapping the DNS answer in between allows connections to internal addresses (a time-of-check to time-of-use gap). I found and reported it. ${withheld}`,
  },
  'linkshare-cgnat-ssrf': {
    title: 'Internal-address check misses the CGNAT range (an open source link-sharing tool)',
    target: 'An open source link-sharing tool (PHP)',
    situation: `In a self-hosted link-sharing tool, the function that detects internal addresses does not include the CGNAT range (100.64.0.0/10), so internal devices connected via Tailscale and similar tools are reachable. I found and reported it, and confirmed it by reproducing the check function as-is. ${withheld}`,
  },
  'auth-proxy-acl': {
    title: 'Allow list ignored, letting anyone through (an open source auth proxy)',
    target: 'An open source auth proxy (Go)',
    situation: `In an auth proxy placed in front of apps, configuring both an allow list and a deny list causes the allow list to be skipped, so anyone not explicitly denied gets through. I found and reported it, and reproduced the logic in an isolated environment. ${withheld}`,
  },
}

/** Generic narrative written by scripts/sync-case-studies.mjs when a case is published. */
export const genericStepsEn: Record<string, string> = {
  'AI・Webの脆弱性診断の一環として、許可された対象のOSSを精査して見つけた脆弱性です。責任ある開示の手順で報告しました。': 'Found while auditing permitted open source targets as part of my AI and web vulnerability assessment work, and reported through responsible disclosure.',
  'ソースコードを精査して危険な箇所を特定し、手元の環境で実証（PoC）して影響を確認しました。': 'I reviewed the source code to pinpoint the dangerous code path, then confirmed the impact with a proof of concept in a local environment.',
  '詳しい内容と修正は、公開されたアドバイザリ（下のリンク）を参照してください。': 'See the published advisory (linked below) for full details and the fix.',
  '守り（セキュリティ機能）そのものを検証すること、そしてPoCで事実として示すことが、信頼される報告につながると実感しました。': 'Testing the defenses themselves, and demonstrating the issue as fact with a proof of concept, is what makes a report trusted.',
}

export const contributionsEn: Record<string, { title?: string; description: string }> = {
  'rust-issue-164904': {
    title: 'Reported missing conditions in the Searcher safety contract',
    description: 'Reported, with a nightly reproduction and its output, that a safety condition str::split relies on in the standard library’s string search was not documented on Searcher. Fix PR #165681, which spells out the safety requirements, was merged on November 10, 2026 (UTC), and the issue was resolved. My part was verifying and reporting the problem; the fix PR was written by another contributor.',
  },
  'rust-163371': { description: 'Fixed a bug of the same kind found while working on #163368. When a format string built with concat! contained printf-style specifiers (such as %d), the compiler suggested rewriting unrelated source. The suggestion is now replaced with a note explaining that `%d` should be written as `{}`.' },
  'rust-163368': { description: 'Fixed the compiler building suggestions for format strings assembled with concat! from offsets into the expanded string (issue #156101). It could point into the middle of a multibyte character and crash the compiler itself (ICE), or suggest unrelated code as arguments. Suggestions are now offered only for string literals written directly in the source.' },
  'ac-library-rs-183': { description: 'Fixed the expansion test script leaving a compiled binary in the repository root on every run (issue #134). It now tells rustc to write the output to a temporary directory.' },
  'rust-clippy-17774': { description: 'A performance improvement in an internal Clippy utility: replaced cloning a Vec on every cache hit with sharing an Arc<[Symbol]>, and reordered the checks to skip unnecessary work.' },
}
