/**
 * DIYETKALFA LİSANS, SÜRE VE KARTSIZ ÖDEME MOTORU (CHECKOUT & LICENSE ENGINE 2026)
 * - WhatsApp VIP Sipariş & Anında Lisans Aktivasyonu
 * - Havale / EFT / FAST Doğrudan Banka Ödemesi
 * - Kalan Gün Sayacı & Süre Dolum Bildirimleri
 */

var DIYETKALFA_PRICING_MATRIX = {
  '1': {
    starter: { orig: '2.500 TL', price: '2.500', billed: 'Aylık 2.500 TL faturalandırılır', total: '2.500 TL', days: 30 },
    core: { orig: '3.500 TL', price: '3.500', billed: 'Aylık 3.500 TL faturalandırılır', total: '3.500 TL', days: 30 },
    pro: { orig: '5.000 TL', price: '4.800', billed: 'Aylık 4.800 TL faturalandırılır', total: '4.800 TL', days: 30 },
    enterprise: { orig: '7.500 TL', price: '7.500', billed: 'Aylık 7.500 TL faturalandırılır', total: '7.500 TL', days: 30 }
  },
  '3': {
    starter: { orig: '2.500 TL', price: '2.125', billed: '3 Aylık 6.375 TL faturalandırılır', total: '6.375 TL', days: 90 },
    core: { orig: '3.500 TL', price: '2.975', billed: '3 Aylık 8.925 TL faturalandırılır', total: '8.925 TL', days: 90 },
    pro: { orig: '5.000 TL', price: '4.080', billed: '3 Aylık 12.240 TL faturalandırılır', total: '12.240 TL', days: 90 },
    enterprise: { orig: '7.500 TL', price: '6.375', billed: '3 Aylık 19.125 TL faturalandırılır', total: '19.125 TL', days: 90 }
  },
  '6': {
    starter: { orig: '2.500 TL', price: '1.875', billed: '6 Aylık 11.250 TL faturalandırılır', total: '11.250 TL', days: 180 },
    core: { orig: '3.500 TL', price: '2.625', billed: '6 Aylık 15.750 TL faturalandırılır', total: '15.750 TL', days: 180 },
    pro: { orig: '5.000 TL', price: '3.600', billed: '6 Aylık 21.600 TL faturalandırılır', total: '21.600 TL', days: 180 },
    enterprise: { orig: '7.500 TL', price: '5.625', billed: '6 Aylık 33.750 TL faturalandırılır', total: '33.750 TL', days: 180 }
  },
  '12': {
    starter: { orig: '2.500 TL', price: '1.500', billed: 'Yıllık 18.000 TL faturalandırılır', total: '18.000 TL', days: 365 },
    core: { orig: '3.500 TL', price: '2.200', billed: 'Yıllık 26.400 TL faturalandırılır', total: '26.400 TL', days: 365 },
    pro: { orig: '4.166 TL', price: '3.000', billed: 'Kampanyalı 36.000 TL / yıl (50.000 TL yerine)', total: '36.000 TL', days: 365 },
    enterprise: { orig: '7.500 TL', price: '4.500', billed: 'Yıllık 54.000 TL faturalandırılır', total: '54.000 TL', days: 365 }
  }
};

var DiyetKalfaLicenseEngine = {
  getLicense: function() {
    try {
      var raw = localStorage.getItem('diyetkalfa_license');
      if (raw) {
        var parsed = JSON.parse(raw);
        if (parsed && parsed.expiryDate) return parsed;
      }
    } catch(e) {}

    // Fallback: Eğer diyetkalfa_licensed veya diyetkalfa_unlocked varsa otomatik 30 günlük aktif lisans başlat
    var isOldLicensed = (localStorage.getItem('diyetkalfa_licensed') === 'true' || localStorage.getItem('diyetkalfa_unlocked') === 'true');
    if (isOldLicensed) {
      return this.activateLicense('Profesyonel Paket', 1, 'Uzm. Dyt. Zehra Bölük', 'DiyetKalfa Klinik', '05321202846');
    }
    return null;
  },

  calculateDaysLeft: function(lic) {
    if (!lic || !lic.expiryDate) return 0;
    var now = new Date();
    var expiry = new Date(lic.expiryDate);
    var diffMs = expiry.getTime() - now.getTime();
    return Math.max(0, Math.ceil(diffMs / (1000 * 60 * 60 * 24)));
  },

  activateLicense: function(tierName, cycleMonths, dietitianName, clinicName, phone, customKey) {
    var months = parseInt(cycleMonths) || 1;
    var days = (months === 12) ? 365 : (months === 6) ? 180 : (months === 3) ? 90 : 30;
    var key = customKey || ('DK-2026-' + (tierName.indexOf('Giriş') >= 0 ? 'START' : tierName.indexOf('Temel') >= 0 ? 'CORE' : tierName.indexOf('Sınırsız') >= 0 ? 'ENT' : 'PRO') + '-' + Math.floor(1000 + Math.random() * 9000));
    
    var now = new Date();
    var expiry = new Date(now.getTime() + days * 24 * 60 * 60 * 1000);

    var licObj = {
      status: 'active',
      tier: tierName || 'Profesyonel Paket',
      tierCode: (tierName.indexOf('Giriş') >= 0 ? 'starter' : tierName.indexOf('Temel') >= 0 ? 'core' : tierName.indexOf('Sınırsız') >= 0 ? 'enterprise' : 'pro'),
      cycleMonths: months,
      cycleDays: days,
      startDate: now.toISOString(),
      expiryDate: expiry.toISOString(),
      licenseKey: key,
      dietitianName: dietitianName || 'Uzm. Diyetisyen',
      clinicName: clinicName || 'Diyet & Sağlık Kliniği',
      phone: phone || '0532 120 28 46'
    };

    try {
      localStorage.setItem('diyetkalfa_license', JSON.stringify(licObj));
      localStorage.setItem('diyetkalfa_licensed', 'true');
      localStorage.setItem('diyetkalfa_unlocked', 'true');
      localStorage.setItem('diyetkalfa_plan', licObj.tier);
      localStorage.setItem('diyetkalfa_tier', licObj.tier);
      localStorage.setItem('diyetkalfa_license_key', key);
    } catch(err) {}

    return licObj;
  },

  renewLicense: function(extraDays) {
    var lic = this.getLicense();
    if (!lic) {
      return this.activateLicense('Profesyonel Paket', 1);
    }
    var addDays = extraDays || 30;
    var currentExp = new Date(lic.expiryDate);
    var baseDate = (currentExp > new Date()) ? currentExp : new Date();
    var newExp = new Date(baseDate.getTime() + addDays * 24 * 60 * 60 * 1000);
    
    lic.expiryDate = newExp.toISOString();
    lic.status = 'active';
    try {
      localStorage.setItem('diyetkalfa_license', JSON.stringify(lic));
    } catch(e) {}
    return lic;
  },

  setTestDaysLeft: function(days) {
    var lic = this.getLicense() || this.activateLicense('Profesyonel Paket', 1);
    var now = new Date();
    var newExp = new Date(now.getTime() + days * 24 * 60 * 60 * 1000);
    lic.expiryDate = newExp.toISOString();
    try {
      localStorage.setItem('diyetkalfa_license', JSON.stringify(lic));
    } catch(e) {}
    return lic;
  }
};

// CHECKOUT MODAL UI CONTROLLER
var activeCheckoutPlan = 'Profesyonel Paket';
var activeCheckoutCycle = '12';

function openCheckoutModal(planName, cycle) {
  if (planName) activeCheckoutPlan = planName;
  if (cycle) activeCheckoutCycle = cycle;
  else if (typeof activeCycle !== 'undefined') activeCheckoutCycle = activeCycle;

  var modal = document.getElementById('modal-checkout') || document.getElementById('modal-direct-checkout');
  if (!modal) return;

  var formCont = document.getElementById('checkout-form-container');
  var succView = document.getElementById('checkout-success-view');
  if (formCont) formCont.style.display = 'block';
  if (succView) succView.style.display = 'none';

  // Fiyat ve paket verilerini eşle
  var cycleData = DIYETKALFA_PRICING_MATRIX[activeCheckoutCycle] || DIYETKALFA_PRICING_MATRIX['12'];
  var planKey = 'pro';
  if (activeCheckoutPlan.indexOf('Giriş') >= 0 || activeCheckoutPlan.toLowerCase().indexOf('starter') >= 0) planKey = 'starter';
  else if (activeCheckoutPlan.indexOf('Temel') >= 0 || activeCheckoutPlan.toLowerCase().indexOf('core') >= 0) planKey = 'core';
  else if (activeCheckoutPlan.indexOf('Sınırsız') >= 0 || activeCheckoutPlan.toLowerCase().indexOf('enterprise') >= 0) planKey = 'enterprise';

  var pData = cycleData[planKey] || cycleData.pro;

  var cycleLabels = {
    '1': '1 Ay (Aylık Taahhütsüz)',
    '3': '3 Ay (%15 İndirimli)',
    '6': '6 Ay (%25 Tasarruflu)',
    '12': '12 Ay Yıllık Kampanyalı Plan'
  };

  var titleEl = document.getElementById('checkout-title') || document.getElementById('checkout-plan-name');
  var subEl = document.getElementById('checkout-subtitle') || document.getElementById('checkout-plan-cycle');
  var amountEl = document.getElementById('checkout-amount') || document.getElementById('checkout-plan-price');

  if (titleEl) titleEl.textContent = activeCheckoutPlan;
  if (subEl) subEl.textContent = (cycleLabels[activeCheckoutCycle] || '12 Ay Yıllık') + ' • Vergi/POS Masrafsız';
  if (amountEl) amountEl.textContent = pData.total;

  var codePreview = document.getElementById('checkout-desc-code');
  if (codePreview) codePreview.textContent = 'DK-' + Math.floor(1000 + Math.random() * 9000);

  modal.style.display = 'flex';
}

function closeCheckoutModal() {
  var modal = document.getElementById('modal-checkout') || document.getElementById('modal-direct-checkout');
  if (modal) modal.style.display = 'none';
}

function switchCheckoutTab(tab) {
  var btnWa = document.getElementById('tab-btn-whatsapp');
  var btnBank = document.getElementById('tab-btn-bank');
  var btnKey = document.getElementById('tab-btn-key');

  var secWa = document.getElementById('checkout-section-whatsapp');
  var secBank = document.getElementById('checkout-section-bank');
  var secKey = document.getElementById('checkout-section-key');

  if (btnWa) btnWa.className = (tab === 'whatsapp' ? 'active' : '');
  if (btnBank) btnBank.className = (tab === 'bank' ? 'active' : '');
  if (btnKey) btnKey.className = (tab === 'key' ? 'active' : '');

  if (secWa) secWa.style.display = (tab === 'whatsapp' ? 'block' : 'none');
  if (secBank) secBank.style.display = (tab === 'bank' ? 'block' : 'none');
  if (secKey) secKey.style.display = (tab === 'key' ? 'block' : 'none');
}

function handleCheckoutWhatsAppOrder(e) {
  if (e) e.preventDefault();
  
  var name = document.getElementById('co-name') ? document.getElementById('co-name').value.trim() : 'Uzm. Diyetisyen';
  var clinic = document.getElementById('co-clinic') ? document.getElementById('co-clinic').value.trim() : 'Diyet Kliniği';
  var phone = document.getElementById('co-phone') ? document.getElementById('co-phone').value.trim() : '0532 120 28 46';
  var city = document.getElementById('co-city') ? document.getElementById('co-city').value.trim() : '';

  if (!name) { alert('Lütfen Adınızı ve Soyadınızı giriniz.'); return; }
  if (!phone) { alert('Lütfen WhatsApp Telefon Numaranızı giriniz.'); return; }

  // Lisansı hemen aktifleştir
  var months = parseInt(activeCheckoutCycle) || 12;
  var lic = DiyetKalfaLicenseEngine.activateLicense(activeCheckoutPlan, months, name, clinic, phone);

  // WhatsApp Mesajını Hazırla
  var cycleText = (months === 12) ? '12 Aylık Yıllık' : (months + ' Aylık');
  var amount = document.getElementById('checkout-amount') ? document.getElementById('checkout-amount').innerText : '36.000 TL';
  
  var waText = "Merhaba DiyetKalfa Yetkilisi,\n\n" +
    "💎 Paket: " + activeCheckoutPlan + " (" + cycleText + ", Tutar: " + amount + ")\n" +
    "🔑 Lisans Kodum: " + lic.licenseKey + "\n" +
    "👩‍⚕️ Diyetisyen: " + name + "\n" +
    "🏥 Klinik: " + clinic + "\n" +
    "📞 İletişim: " + phone + (city ? " / " + city : "") + "\n\n" +
    "Lisansımı aktive etmek ve siparişimi onaylamak istiyorum. Teşekkürler!";

  var waUrl = "https://wa.me/905321202846?text=" + encodeURIComponent(waText);
  window.open(waUrl, '_blank');

  // Başarı ekranını göster
  showCheckoutSuccess(lic);
}

function handleCheckoutBankOrder(e) {
  if (e) e.preventDefault();

  var name = document.getElementById('co-name') ? document.getElementById('co-name').value.trim() : 'Uzm. Diyetisyen';
  var clinic = document.getElementById('co-clinic') ? document.getElementById('co-clinic').value.trim() : 'Diyet Kliniği';
  var phone = document.getElementById('co-phone') ? document.getElementById('co-phone').value.trim() : '0532 120 28 46';

  if (!name) { alert('Lütfen Adınızı ve Soyadınızı giriniz.'); return; }

  var months = parseInt(activeCheckoutCycle) || 12;
  var lic = DiyetKalfaLicenseEngine.activateLicense(activeCheckoutPlan, months, name, clinic, phone);
  showCheckoutSuccess(lic);
}

function handleCheckoutKeyActivation(e) {
  if (e) e.preventDefault();
  var keyInput = document.getElementById('co-license-key');
  var key = keyInput ? keyInput.value.trim().toUpperCase() : '';

  if (!key) { alert('Lütfen geçerli bir lisans kodu giriniz.'); return; }

  var plan = 'Profesyonel Paket';
  var months = 12;

  if (key.indexOf('START') >= 0 || key === 'DEMO30') { plan = 'Giriş Paketi'; months = 1; }
  else if (key.indexOf('CORE') >= 0) { plan = 'Temel Paket'; months = 3; }
  else if (key.indexOf('ENT') >= 0 || key === 'VIP365') { plan = 'Sınırsız Paket'; months = 12; }

  var lic = DiyetKalfaLicenseEngine.activateLicense(plan, months, 'Uzm. Diyetisyen', 'DiyetKalfa Lisanslı Klinik', '0532 120 28 46', key);
  showCheckoutSuccess(lic);
}

function showCheckoutSuccess(lic) {
  var formCont = document.getElementById('checkout-form-container');
  var succView = document.getElementById('checkout-success-view');

  if (formCont) formCont.style.display = 'none';
  if (succView) {
    succView.style.display = 'block';
    var keyEl = document.getElementById('co-success-key');
    var planEl = document.getElementById('co-success-plan');
    var daysEl = document.getElementById('co-success-days');
    var expEl = document.getElementById('co-success-expiry');

    if (keyEl) keyEl.textContent = lic.licenseKey;
    if (planEl) planEl.textContent = lic.tier;
    if (daysEl) daysEl.textContent = lic.cycleDays + ' Gün Kesintisiz Lisans';
    if (expEl) {
      var d = new Date(lic.expiryDate);
      expEl.textContent = d.toLocaleDateString('tr-TR', { day: 'numeric', month: 'long', year: 'numeric' });
    }
  }
}

function copyIban() {
  var iban = "TR56 0006 2000 0001 2345 6789 01";
  navigator.clipboard.writeText(iban.replace(/\s+/g, '')).then(function() {
    alert("✅ IBAN Numarası Panoya Kopyalandı:\n" + iban);
  }).catch(function() {
    alert("IBAN: " + iban);
  });
}
