(() => {
  'use strict';

  const D = window.SITE;
  if (!D) return;

  const root = document.documentElement;
  const $ = (sel, ctx = document) => ctx.querySelector(sel);
  const $$ = (sel, ctx = document) => Array.from(ctx.querySelectorAll(sel));
  const mqReduce = window.matchMedia('(prefers-reduced-motion: reduce)');
  const mqFine = window.matchMedia('(hover: hover) and (pointer: fine)');
  const prefersReduced = () => mqReduce.matches;

  /* ───────────── Icons (Lucide-style, inline SVG) ───────────── */
  const ICONS = {
    github: [['path', { d: 'M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4' }], ['path', { d: 'M9 18c-4.51 2-5-2-7-2' }]],
    linkedin: [['path', { d: 'M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z' }], ['rect', { x: 2, y: 9, width: 4, height: 12 }], ['circle', { cx: 4, cy: 4, r: 2 }]],
    stackoverflow: [['path', { d: 'M4 15v6h15v-6' }], ['path', { d: 'M8 18h7' }], ['path', { d: 'm8.3 14.6 7 1.3' }], ['path', { d: 'm9.4 10.6 6.5 3' }], ['path', { d: 'm11.8 6.9 5.5 4.6' }], ['path', { d: 'm15.6 3.4 4.1 5.8' }]],
    facebook: [['path', { d: 'M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z' }]],
    mail: [['rect', { x: 2, y: 4, width: 20, height: 16, rx: 2 }], ['path', { d: 'm22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7' }]],
    download: [['path', { d: 'M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4' }], ['path', { d: 'm7 10 5 5 5-5' }], ['path', { d: 'M12 15V3' }]],
    arrowUpRight: [['path', { d: 'M7 7h10v10' }], ['path', { d: 'M7 17 17 7' }]],
    arrowDown: [['path', { d: 'M12 5v14' }], ['path', { d: 'm19 12-7 7-7-7' }]],
    arrowUp: [['path', { d: 'm5 12 7-7 7 7' }], ['path', { d: 'M12 19V5' }]],
    sun: [['circle', { cx: 12, cy: 12, r: 4 }], ['path', { d: 'M12 2v2M12 20v2m-7.07-17.07 1.41 1.41m11.32 11.32 1.41 1.41M2 12h2m16 0h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41' }]],
    moon: [['path', { d: 'M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z' }]],
    copy: [['rect', { x: 8, y: 8, width: 14, height: 14, rx: 2 }], ['path', { d: 'M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2' }]],
    check: [['path', { d: 'M20 6 9 17l-5-5' }]],
    plus: [['path', { d: 'M12 5v14M5 12h14' }]],
    code: [['path', { d: 'm16 18 6-6-6-6' }], ['path', { d: 'm8 6-6 6 6 6' }]],
    pen: [['path', { d: 'M12 20h9' }], ['path', { d: 'M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z' }]],
    graduation: [['path', { d: 'M22 10 12 5 2 10l10 5 10-5Z' }], ['path', { d: 'M6 12v5c3 3 9 3 12 0v-5' }]],
  };
  const SVG_NS = 'http://www.w3.org/2000/svg';

  function icon(name, size = 18) {
    const svg = document.createElementNS(SVG_NS, 'svg');
    const attrs = {
      width: size, height: size, viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor',
      'stroke-width': 1.8, 'stroke-linecap': 'round', 'stroke-linejoin': 'round',
      'aria-hidden': 'true', focusable: 'false', class: `i i-${name}`,
    };
    for (const [k, v] of Object.entries(attrs)) svg.setAttribute(k, v);
    for (const [tag, a] of ICONS[name] || []) {
      const el = document.createElementNS(SVG_NS, tag);
      for (const [k, v] of Object.entries(a)) el.setAttribute(k, v);
      svg.append(el);
    }
    return svg;
  }

  /* ───────────── Safe DOM helpers (no innerHTML anywhere) ───────────── */
  function safeUrl(value) {
    const url = String(value ?? '').trim();
    if (/^(https?:\/\/|mailto:)/i.test(url)) return url;
    if (/^[a-z][a-z\d+.-]*:/i.test(url) || url.startsWith('//')) return '#';
    return url; // relative path or #hash
  }

  function h(tag, props = {}, ...children) {
    const el = document.createElement(tag);
    for (const [k, v] of Object.entries(props)) {
      if (v == null || v === false) continue;
      if (k === 'class') el.className = v;
      else if (k === 'text') el.textContent = v;
      else if (k === 'href' || k === 'src') el.setAttribute(k, safeUrl(v));
      else if (k.startsWith('on') && typeof v === 'function') el.addEventListener(k.slice(2), v);
      else el.setAttribute(k, v === true ? '' : String(v));
    }
    for (const c of children.flat()) {
      if (c == null || c === false) continue;
      el.append(c instanceof Node ? c : document.createTextNode(String(c)));
    }
    return el;
  }

  const linkProps = (url) =>
    /^https?:/i.test(url) ? { href: url, target: '_blank', rel: 'noopener noreferrer' } : { href: url };

  // Supports **bold** only; everything else is plain text.
  function rich(text) {
    const frag = document.createDocumentFragment();
    String(text).split(/\*\*(.+?)\*\*/g).forEach((part, i) => {
      if (part) frag.append(i % 2 ? h('strong', { text: part }) : document.createTextNode(part));
    });
    return frag;
  }

  const stagger = (els, step = 70, mod = Infinity) =>
    els.forEach((el, i) => el.style.setProperty('--d', `${(i % mod) * step}ms`));

  const allSocials = () => [{ label: 'Email', url: `mailto:${D.email}`, icon: 'mail' }, ...D.socials];

  function socialItems(list) {
    return list.map((s) =>
      h('li', {}, h('a', { ...linkProps(s.url), class: 'icon-btn social magnetic', 'aria-label': s.label, title: s.label }, icon(s.icon, 18)))
    );
  }

  /* ───────────── Renderers ───────────── */
  function renderHero() {
    const { hero } = D;
    $('#hero-eyebrow').textContent = hero.eyebrow;
    $('#hero-greet').textContent = hero.greeting;

    const title = $('#hero-title');
    title.textContent = '';
    title.setAttribute('aria-label', hero.nameLines.join(' '));
    let i = 0;
    hero.nameLines.forEach((line, li) => {
      const accent = li === hero.nameLines.length - 1;
      const lineEl = h('span', { class: 'line', 'aria-hidden': 'true' });
      line.split(' ').forEach((word, wi) => {
        if (wi) lineEl.append(' ');
        const wordEl = h('span', { class: 'word' });
        // Gradient words animate as a whole so background-clip:text stays intact.
        const parts = accent ? [word] : Array.from(word);
        parts.forEach((p) => {
          const c = h('span', { class: accent ? 'char grad-text' : 'char', text: p });
          c.style.setProperty('--i', i++);
          wordEl.append(c);
        });
        lineEl.append(wordEl);
      });
      title.append(lineEl);
    });

    $('#hero-role-prefix').textContent = hero.rolePrefix;
    $('#typed-sr').textContent = hero.roles.join(', ');
    $('#hero-tagline').textContent = hero.tagline;

    $('#hero-cta').append(
      h('a', { class: 'btn btn-primary magnetic', href: '#projects' }, 'View my work', icon('arrowDown', 16)),
      h('a', { class: 'btn btn-ghost magnetic', href: D.cv, download: D.cv.split('/').pop() }, 'Download CV', icon('download', 16))
    );
    $('#hero-socials').append(...socialItems(allSocials()));
  }

  function typewriter(el, words) {
    if (!el || !words.length) return;
    if (prefersReduced()) { el.textContent = words[0]; return; }
    let w = 0, c = 0, deleting = false;
    const tick = () => {
      const word = words[w];
      c += deleting ? -1 : 1;
      el.textContent = word.slice(0, c);
      let delay = deleting ? 32 : 65;
      if (!deleting && c === word.length) { delay = 1900; deleting = true; }
      else if (deleting && c === 0) { deleting = false; w = (w + 1) % words.length; delay = 380; }
      setTimeout(tick, delay);
    };
    setTimeout(tick, 1300);
  }

  function renderAbout() {
    const text = $('#about-text');
    D.about.paragraphs.forEach((p) => text.append(h('p', { class: 'reveal' }, rich(p))));
    if (D.about.quip) text.append(h('p', { class: 'quip mono reveal', text: D.about.quip }));
    if (D.education?.length) {
      text.append(h('div', { class: 'edu reveal' }, D.education.map((e) =>
        h('div', { class: 'edu-item' },
          h('span', { class: 'edu-icon' }, icon('graduation', 18)),
          h('div', {},
            h('p', { class: 'edu-degree', text: e.degree }),
            h('p', { class: 'edu-school', text: `${e.school} · ${e.period}` })))
      )));
    }
    stagger($$('.reveal', text), 80);

    const img = h('img', { src: D.photo, alt: `Portrait of ${D.name}`, width: 800, height: 800, loading: 'lazy', decoding: 'async' });
    const inner = h('div', { class: 'photo-inner' }, img);
    img.addEventListener('error', () => inner.replaceChildren(h('span', { class: 'photo-fallback grad-text', text: D.initials })), { once: true });
    $('#photo').append(h('div', { class: 'photo-frame' }, inner));

    const stats = $('#stats');
    D.stats.forEach((s) => {
      const num = h('span', { class: 'num', text: '0', 'data-target': s.value, 'data-decimals': s.decimals || 0 });
      stats.append(h('li', { class: 'stat reveal' },
        h('span', { class: 'stat-value grad-text', 'aria-hidden': 'true' }, s.prefix || '', num, s.suffix || ''),
        h('span', { class: 'sr-only', text: `${s.prefix || ''}${s.value}${s.suffix || ''}` }),
        h('span', { class: 'stat-label', text: s.label })));
    });
    stagger($$('.stat', stats), 90);
  }

  const pointsList = (pts) => h('ul', { class: 'points' }, pts.map((p) => h('li', {}, rich(p))));

  function renderExperience() {
    const list = $('#timeline-list');
    D.experience.forEach((job) => {
      const current = /present/i.test(job.end);
      const card = h('article', { class: 'card tl-card' },
        h('header', { class: 'tl-head' },
          h('div', {},
            h('h3', { class: 'tl-role' }, job.role, ' ', h('span', { class: 'tl-company', text: `@ ${job.company}` })),
            h('p', { class: 'tl-meta', text: [job.type, job.location].filter(Boolean).join(' · ') })),
          h('p', { class: 'tl-date mono' }, h('time', { text: job.start }), ' — ', h('time', { text: job.end }))),
        job.points?.length ? pointsList(job.points) : null,
        job.groups?.length
          ? h('div', { class: 'tl-groups' }, job.groups.map((g, gi) =>
            h('details', { class: 'group', open: gi === 0 },
              h('summary', {}, h('span', { text: g.title }), h('span', { class: 'chev' }, icon('plus', 16))),
              pointsList(g.points))))
          : null);
      list.append(h('li', { class: `tl-item reveal${current ? ' current' : ''}` }, h('span', { class: 'tl-dot', 'aria-hidden': 'true' }), card));
    });
  }

  function renderProjects() {
    const grid = $('#projects-grid');
    const filters = $('#project-filters');
    const cats = ['All', ...new Set(D.projects.flatMap((p) => p.categories || []))];

    const cards = D.projects.map((p) => h('article', { class: 'card project reveal', 'data-cats': (p.categories || []).join('|') },
      h('div', { class: 'project-top' },
        h('span', { class: 'project-icon' }, icon('code', 20)),
        p.link ? h('a', { ...linkProps(p.link), class: 'project-link', 'aria-label': `Open ${p.title}` }, icon('arrowUpRight', 18)) : null),
      h('p', { class: 'project-org mono', text: p.org }),
      h('h3', { class: 'project-title', text: p.title }),
      h('p', { class: 'project-desc', text: p.description }),
      p.impact ? h('p', { class: 'impact mono', text: p.impact }) : null,
      h('ul', { class: 'tags', 'aria-label': 'Topics' }, (p.tags || []).map((t) => h('li', { text: t })))));

    if (D.projectsMore) {
      const m = D.projectsMore;
      cards.push(h('a', { ...linkProps(m.url), class: 'card project project-more reveal', 'data-cats': '*' },
        h('span', { class: 'project-icon' }, icon('github', 20)),
        h('h3', { class: 'project-title', text: m.title }),
        h('p', { class: 'project-desc', text: m.text }),
        h('span', { class: 'more-link mono' }, m.label, icon('arrowUpRight', 16))));
    }
    grid.append(...cards);
    stagger(cards, 70, 3);

    const buttons = cats.map((cat) => h('button', { class: 'chip-btn', type: 'button', 'aria-pressed': cat === 'All' ? 'true' : 'false', text: cat }));
    filters.append(...buttons);
    filters.addEventListener('click', (e) => {
      const btn = e.target.closest('.chip-btn');
      if (!btn || btn.getAttribute('aria-pressed') === 'true') return;
      buttons.forEach((b) => b.setAttribute('aria-pressed', String(b === btn)));
      const cat = btn.textContent;
      let n = 0;
      cards.forEach((card) => {
        const c = card.dataset.cats;
        const show = cat === 'All' || c === '*' || c.split('|').includes(cat);
        card.classList.toggle('is-hidden', !show);
        card.classList.remove('is-entering');
        if (show) {
          void card.offsetWidth; // restart animation
          card.style.setProperty('--d', `${n++ * 60}ms`);
          card.classList.add('is-entering');
        }
      });
      announce(`Showing ${n} ${cat === 'All' ? '' : cat + ' '}projects`);
    });
  }

  function renderSkills() {
    const words = D.marquee?.length ? D.marquee : D.skills.flatMap((s) => s.items).slice(0, 12);
    const track = $('#marquee-track');
    for (let k = 0; k < 2; k++) words.forEach((w) => track.append(h('span', { class: 'marquee-item', text: w })));

    const grid = $('#skills-grid');
    const cards = D.skills.map((s) => h('div', { class: 'card skill-card reveal' },
      h('h3', { class: 'skill-group mono', text: s.group }),
      h('ul', { class: 'skill-list' }, s.items.map((it) => h('li', { text: it })))));
    grid.append(...cards);
    stagger(cards, 60, 4);
  }

  function renderWriting() {
    const wrap = $('#writing-list');
    if (D.writing?.length) {
      const list = h('ul', { class: 'posts' }, D.writing.map((p) =>
        h('li', { class: 'reveal' }, h('a', { ...linkProps(p.url), class: 'post' },
          h('span', { class: 'post-date mono', text: p.date }),
          h('span', { class: 'post-body' }, h('span', { class: 'post-title', text: p.title }), p.summary ? h('span', { class: 'post-summary', text: p.summary }) : null),
          icon('arrowUpRight', 18)))));
      wrap.append(list);
      stagger($$('.reveal', list), 70);
      return;
    }
    const ph = D.writingPlaceholder;
    wrap.append(h('div', { class: 'card placeholder reveal' },
      h('span', { class: 'project-icon' }, icon('pen', 20)),
      h('h3', { text: ph.title }),
      h('p', { text: ph.text }),
      h('div', { class: 'skeleton', 'aria-hidden': 'true' }, h('span'), h('span'), h('span'))));
  }

  function renderContact() {
    $('#contact-title').textContent = D.contact.title;
    $('#contact-text').textContent = D.contact.text;

    const copyBtn = h('button', { class: 'icon-btn copy-btn', type: 'button', 'aria-label': 'Copy email address', title: 'Copy email' }, icon('copy', 18), icon('check', 18));
    copyBtn.addEventListener('click', async () => {
      try {
        await navigator.clipboard.writeText(D.email);
        copyBtn.classList.add('copied');
        announce('Email address copied to clipboard');
        setTimeout(() => copyBtn.classList.remove('copied'), 1800);
      } catch {
        window.location.href = `mailto:${D.email}`;
      }
    });
    $('#email-row').append(h('a', { class: 'email-link', href: `mailto:${D.email}`, text: D.email }), copyBtn);

    $('#contact-actions').append(
      h('a', { class: 'btn btn-primary magnetic', href: `mailto:${D.email}` }, 'Say hello', icon('mail', 16)),
      h('a', { class: 'btn btn-ghost magnetic', href: D.cv, download: D.cv.split('/').pop() }, 'Download CV', icon('download', 16)),
      h('ul', { class: 'socials', 'aria-label': 'Social links' }, socialItems(D.socials))
    );

    $('#footer-copy').textContent = `© ${new Date().getFullYear()} ${D.name}`;
  }

  /* ───────────── Behaviour ───────────── */
  const live = $('#live');
  function announce(msg) {
    live.textContent = '';
    setTimeout(() => { live.textContent = msg; }, 50);
  }

  function initReveal() {
    const els = $$('.reveal');
    if (!('IntersectionObserver' in window)) { els.forEach((el) => el.classList.add('in')); return; }
    const io = new IntersectionObserver((entries) => {
      for (const e of entries) {
        if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
      }
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0 });
    els.forEach((el) => io.observe(el));
  }

  function initCounters() {
    const run = (el) => {
      const target = Number(el.dataset.target);
      const dec = Number(el.dataset.decimals) || 0;
      if (prefersReduced()) { el.textContent = target.toFixed(dec); return; }
      const t0 = performance.now();
      const dur = 1800;
      const step = (now) => {
        const t = Math.min(1, (now - t0) / dur);
        el.textContent = (target * (1 - Math.pow(1 - t, 4))).toFixed(dec);
        if (t < 1) requestAnimationFrame(step);
      };
      requestAnimationFrame(step);
    };
    const io = new IntersectionObserver((entries) => entries.forEach((e) => {
      if (e.isIntersecting) { run(e.target); io.unobserve(e.target); }
    }), { threshold: 0.6 });
    $$('.stat .num').forEach((n) => io.observe(n));
  }

  function initActiveNav() {
    const links = new Map($$('#nav-links a').map((a) => [a.getAttribute('href').slice(1), a]));
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        const link = links.get(e.target.id);
        if (!link) return;
        if (e.isIntersecting) {
          links.forEach((l) => { l.classList.remove('active'); l.removeAttribute('aria-current'); });
          link.classList.add('active');
          link.setAttribute('aria-current', 'true');
        } else {
          link.classList.remove('active');
          link.removeAttribute('aria-current');
        }
      });
    }, { rootMargin: '-45% 0px -50% 0px' });
    $$('main > section[id]').forEach((s) => io.observe(s));
  }

  function initScroll() {
    const nav = $('#nav');
    const bar = $('#scroll-progress');
    const toTop = $('#to-top');
    const timeline = $('#timeline');
    const tlItems = $$('.tl-item', timeline);
    let lastY = window.scrollY;
    let ticking = false;

    toTop.append(icon('arrowUp', 18));
    toTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: prefersReduced() ? 'auto' : 'smooth' }));
    nav.addEventListener('focusin', () => nav.classList.remove('hidden'));

    const update = () => {
      ticking = false;
      const y = window.scrollY;
      const vh = window.innerHeight;
      const max = document.documentElement.scrollHeight - vh;
      bar.style.setProperty('--p', max > 0 ? (y / max).toFixed(4) : '0');

      nav.classList.toggle('scrolled', y > 10);
      if (Math.abs(y - lastY) > 6) {
        nav.classList.toggle('hidden', y > lastY && y > 320 && !root.classList.contains('menu-open'));
        lastY = y;
      }
      toTop.classList.toggle('show', y > vh * 1.2);

      if (timeline) {
        const r = timeline.getBoundingClientRect();
        const line = vh * 0.6;
        const p = Math.min(1, Math.max(0, (line - r.top) / r.height));
        timeline.style.setProperty('--p', p.toFixed(4));
        tlItems.forEach((item) => item.classList.toggle('active', item.firstElementChild.getBoundingClientRect().top < line));
      }
    };
    const onScroll = () => { if (!ticking) { ticking = true; requestAnimationFrame(update); } };
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });
    update();
  }

  function initTheme() {
    const btn = $('#theme-toggle');
    const meta = $('meta[name="theme-color"]');
    btn.append(icon('sun', 18), icon('moon', 18));

    const apply = (theme, persist) => {
      root.setAttribute('data-theme', theme);
      meta?.setAttribute('content', theme === 'light' ? '#fafafa' : '#09090b');
      btn.setAttribute('aria-label', `Switch to ${theme === 'light' ? 'dark' : 'light'} theme`);
      if (persist) { try { localStorage.setItem('theme', theme); } catch { /* ignore */ } }
    };
    apply(root.getAttribute('data-theme'), false);

    btn.addEventListener('click', (e) => {
      const next = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
      if (!document.startViewTransition || prefersReduced()) { apply(next, true); return; }
      const rect = btn.getBoundingClientRect();
      const x = e.clientX || rect.left + rect.width / 2;
      const y = e.clientY || rect.top + rect.height / 2;
      const r = Math.hypot(Math.max(x, window.innerWidth - x), Math.max(y, window.innerHeight - y));
      const t = document.startViewTransition(() => apply(next, true));
      t.ready.then(() => {
        root.animate(
          { clipPath: [`circle(0px at ${x}px ${y}px)`, `circle(${r}px at ${x}px ${y}px)`] },
          { duration: 650, easing: 'cubic-bezier(.22,1,.36,1)', pseudoElement: '::view-transition-new(root)' }
        );
      }).catch(() => { /* transition skipped */ });
    });

    // Follow OS theme until the user picks one explicitly.
    window.matchMedia('(prefers-color-scheme: light)').addEventListener('change', (e) => {
      let stored = null;
      try { stored = localStorage.getItem('theme'); } catch { /* ignore */ }
      if (!stored) apply(e.matches ? 'light' : 'dark', false);
    });
  }

  function initMenu() {
    const btn = $('#menu-btn');
    const links = $$('#nav-links a');
    links.forEach((a, i) => a.style.setProperty('--i', i));
    const set = (open) => {
      root.classList.toggle('menu-open', open);
      btn.setAttribute('aria-expanded', String(open));
      btn.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
    };
    btn.addEventListener('click', () => set(!root.classList.contains('menu-open')));
    links.forEach((a) => a.addEventListener('click', () => set(false)));
    document.addEventListener('keydown', (e) => { if (e.key === 'Escape' && root.classList.contains('menu-open')) { set(false); btn.focus(); } });
    window.matchMedia('(min-width: 761px)').addEventListener('change', (e) => { if (e.matches) set(false); });
  }

  function initPointerFx() {
    if (!mqFine.matches || prefersReduced()) return;

    // Soft glow that follows the cursor
    const glow = $('.cursor-glow');
    let x = window.innerWidth / 2, y = window.innerHeight / 2, tx = x, ty = y, raf = 0;
    const loop = () => {
      x += (tx - x) * 0.14;
      y += (ty - y) * 0.14;
      glow.style.transform = `translate3d(${x}px, ${y}px, 0)`;
      raf = Math.abs(tx - x) + Math.abs(ty - y) > 0.5 ? requestAnimationFrame(loop) : 0;
    };
    window.addEventListener('pointermove', (e) => {
      tx = e.clientX; ty = e.clientY;
      glow.classList.add('on');
      if (!raf) raf = requestAnimationFrame(loop);

      // Card spotlight
      const card = e.target.closest?.('.card');
      if (card) {
        const r = card.getBoundingClientRect();
        card.style.setProperty('--mx', `${e.clientX - r.left}px`);
        card.style.setProperty('--my', `${e.clientY - r.top}px`);
      }
    }, { passive: true });
    document.documentElement.addEventListener('pointerleave', () => glow.classList.remove('on'));

    // Magnetic buttons
    $$('.magnetic').forEach((el) => {
      el.addEventListener('pointermove', (e) => {
        const r = el.getBoundingClientRect();
        const dx = e.clientX - (r.left + r.width / 2);
        const dy = e.clientY - (r.top + r.height / 2);
        el.style.transform = `translate(${dx * 0.18}px, ${dy * 0.28}px)`;
      });
      el.addEventListener('pointerleave', () => { el.style.transform = ''; });
    });
  }

  /* ───────────── Boot ───────────── */
  renderHero();
  renderAbout();
  renderExperience();
  renderProjects();
  renderSkills();
  renderWriting();
  renderContact();

  initTheme();
  initMenu();
  initReveal();
  initCounters();
  initActiveNav();
  initScroll();
  initPointerFx();
  typewriter($('#typed'), D.hero.roles);
})();
