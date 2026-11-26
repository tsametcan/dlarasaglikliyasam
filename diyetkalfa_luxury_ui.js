/**
 * ============================================================================
 * DIYETKALFA 3D EMBOSSED LUXURY UI, VECTOR ICON ENGINE & DATA GUARD (2026)
 * ============================================================================
 * 1. Kabartmalı (3D Embossed) Lüks Vektör Marka Logosu & İkonografi Motoru
 * 2. Tüm Buton, Sekme ve Kartlardaki Basit Emojileri 3D Kabartmalı SVG İkonlara Dönüştürücü
 * 3. Klinik Veri Koruma & Yedekleme Kalkanı (DiyetKalfaDataGuard)
 * 4. PC, Tablet ve Mobil 60FPS Ultra Hızlı Donanım İvmesi
 * ============================================================================
 */

(function(window, document) {
  'use strict';

  // 1. 3D KABARTMALI (EMBOSSED) VEKTÖR İKON KÜTÜPHANESİ
  var SVG_ICONS = {
    home: '<svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 9.5L12 3l9 6.5V20a1 1 0 0 1-1 1h-5v-6H9v6H4a1 1 0 0 1-1-1V9.5z"/></svg>',
    features: '<svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>',
    solutions: '<svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="7" height="7" rx="1.5"/><rect x="14" y="3" width="7" height="7" rx="1.5"/><rect x="14" y="14" width="7" height="7" rx="1.5"/><rect x="3" y="14" width="7" height="7" rx="1.5"/></svg>',
    pricing: '<svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 3h12l4 6-10 12L2 9z"/><path d="M2 9h20"/></svg>',
    faq: '<svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>',
    contact: '<svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>',
    demo: '<svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="3" width="20" height="14" rx="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></svg>',
    login: '<svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>',
    rocket: '<svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z"/><path d="M12 15l-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z"/></svg>',
    diet: '<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z"/><path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12"/></svg>',
    lab: '<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M10 2v7.31"/><path d="M14 9.3V1.99"/><path d="M8.5 2h7"/><path d="M14 9.3a6.5 6.5 0 1 1-4 0"/><path d="M5.52 16h12.96"/></svg>',
    foods: '<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 20.94c1.5 0 2.75 1.06 4 1.06 3 0 6-8 6-12.22A4.91 4.91 0 0 0 17 5c-2.22 0-4 1.44-5 2-1-.56-2.78-2-5-2a4.9 4.9 0 0 0-5 4.78C2 14 5 22 8 22c1.25 0 2.5-1.06 4-1.06Z"/><path d="M10 2c1 .5 2 2 2 5"/></svg>',
    inbody: '<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 12h-4l-3 9L9 3l-3 9H2"/></svg>',
    excel: '<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18"/><path d="M3 15h18"/><path d="M9 3v18"/></svg>',
    calendar: '<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>',
    users: '<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>',
    video: '<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><polygon points="23 7 16 12 23 17 23 7"/><rect x="1" y="5" width="15" height="14" rx="2"/></svg>',
    cart: '<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/></svg>',
    globe: '<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>',
    ai: '<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2v4"/><path d="m6.8 15-3.5 2"/><path d="m20.7 17-3.5-2"/><path d="M6.8 9 3.3 7"/><path d="m20.7 7-3.5 2"/><circle cx="12" cy="12" r="6"/></svg>',
    shield: '<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>',
    settings: '<svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>',
    crown: '<svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="m2 4 3 12h14l3-12-6 7-4-7-4 7-6-7zm3 16h14"/></svg>',
    calc: '<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><rect x="4" y="2" width="16" height="20" rx="2"/><line x1="8" y1="6" x2="16" y2="6"/><line x1="8" y1="10" x2="8" y2="10"/><line x1="12" y1="10" x2="12" y2="10"/><line x1="16" y1="10" x2="16" y2="10"/><line x1="8" y1="14" x2="8" y2="14"/><line x1="12" y1="14" x2="12" y2="14"/><line x1="16" y1="14" x2="16" y2="14"/></svg>',
    clinic: '<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><rect x="4" y="2" width="16" height="20" rx="2"/><path d="M9 22v-4h6v4"/><path d="M10 6h4"/><path d="M12 4v4"/></svg>',
    doc: '<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg>'
  };

  // Emoji -> 3D Vector Icon Eşleme Tablosu (Sekmeler, Çözümler Menüsü ve Butonlar İçin)
  var EMOJI_TO_SVG_KEY = {
    '⚡': 'home',
    '🏠': 'home',
    '🧬': 'features',
    '✨': 'features',
    '🧩': 'solutions',
    '💎': 'pricing',
    '📘': 'faq',
    '❓': 'faq',
    '💬': 'contact',
    '📞': 'contact',
    '🖥️': 'demo',
    '🔐': 'login',
    '🔒': 'login',
    '🚀': 'rocket',
    '🥗': 'diet',
    '🍲': 'diet',
    '🧪': 'lab',
    '🩸': 'lab',
    '🏥': 'clinic',
    '🩺': 'shield',
    '🍏': 'foods',
    '⚖️': 'inbody',
    '📊': 'excel',
    '📅': 'calendar',
    '👥': 'users',
    '🎬': 'video',
    '💻': 'demo',
    '🛒': 'cart',
    '🌐': 'globe',
    '🤖': 'ai',
    '🏢': 'clinic',
    '📋': 'doc',
    '📚': 'doc',
    '🔢': 'calc',
    '🧮': 'calc',
    '🔍': 'features',
    '⚙️': 'settings',
    '👑': 'crown'
  };

  function upgradeButtonsAndIconsTo3DEmbossed() {
    // 1. Çözümler Mega Menü İkonlarını (.sol-icon) 3D Kabartmalı Rozete Dönüştür
    var solIcons = document.querySelectorAll('.sol-icon');
    for (var i = 0; i < solIcons.length; i++) {
      var el = solIcons[i];
      if (el.getAttribute('data-3d-upgraded')) continue;
      var txt = (el.textContent || '').trim();
      var svgKey = EMOJI_TO_SVG_KEY[txt] || 'features';
      el.innerHTML = SVG_ICONS[svgKey];
      el.className = 'sol-icon dk-3d-icon-pod';
      el.setAttribute('data-3d-upgraded', '1');
    }

    // 2. Klinik Paneli Sekme Butonları (.saas-tab-btn) ve Header Butonlarındaki İlk Span Emojilerini 3D SVG'ye Dönüştür
    var tabBtns = document.querySelectorAll('.saas-tab-btn, .dk-nav-pill, .dk-btn-sim, .dk-btn-login, .dk-btn-start, .header-clinical-actions button, .header-clinical-actions a');
    for (var j = 0; j < tabBtns.length; j++) {
      var btn = tabBtns[j];
      var spans = btn.querySelectorAll('span');
      if (spans.length > 0) {
        var firstSpan = spans[0];
        if (firstSpan.getAttribute('data-3d-upgraded')) continue;
        var sText = (firstSpan.textContent || '').trim();
        if (EMOJI_TO_SVG_KEY[sText]) {
          firstSpan.innerHTML = SVG_ICONS[EMOJI_TO_SVG_KEY[sText]];
          firstSpan.classList.add('dk-3d-btn-svg');
          firstSpan.setAttribute('data-3d-upgraded', '1');
        }
      }
    }
  }

  // 3. KLİNİK VERİ KORUMA & OTOMATİK YEDEKLEME MOTORU (DATA GUARD)
  function initDataGuard() {
    try {
      var backupTimestamp = localStorage.getItem('diyetkalfa_last_backup_ts');
      var now = Date.now();
      if (!backupTimestamp || (now - parseInt(backupTimestamp)) > 60000) {
        var snapshot = {
          ts: now,
          license: localStorage.getItem('diyetkalfa_license'),
          clients: localStorage.getItem('diyetkalfa_excel_clients'),
          appointments: localStorage.getItem('diyetkalfa_appointments'),
          vault: localStorage.getItem('diyetkalfa_client_vault')
        };
        localStorage.setItem('diyetkalfa_secure_vault_backup', JSON.stringify(snapshot));
        localStorage.setItem('diyetkalfa_last_backup_ts', String(now));
      }
    } catch(e) {}
  }

  window.DiyetKalfaLuxuryUI = {
    SVG_ICONS: SVG_ICONS,
    upgradeButtonsAndIconsTo3DEmbossed: upgradeButtonsAndIconsTo3DEmbossed,
    initDataGuard: initDataGuard
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function() {
      upgradeButtonsAndIconsTo3DEmbossed();
      initDataGuard();
    });
  } else {
    upgradeButtonsAndIconsTo3DEmbossed();
    initDataGuard();
  }
  setTimeout(upgradeButtonsAndIconsTo3DEmbossed, 250);

})(window, document);
