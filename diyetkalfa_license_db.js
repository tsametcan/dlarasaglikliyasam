/**
 * ============================================================================
 * DIYETKALFA LICENSE, USER DATABASE & PACKAGE FEATURE GATING ENGINE (2026)
 * ============================================================================
 * 1. Kayıt Olma & 7 Günlük Ücretsiz Deneme Veritabanı (diyetkalfa_users_db)
 * 2. 7. Günün Sonunda Otomatik Para Çekim Talebi & Ödenmezse Sistemden Atma (Kick-Out)
 * 3. Ödeme Onaylandığı Anda Otomatik Panele Yönlendirme & "DiyetKalfa'ya Hoş Geldiniz" Ekranı
 * 4. Pakete Göre (Giriş, Temel, Profesyonel, Sınırsız) Dinamik Modül & Özellik Yetkilendirmesi
 * ============================================================================
 */

(function(window) {
  'use strict';

  var PACKAGE_CONFIGS = {
    'starter': {
      code: 'starter',
      name: 'Giriş Paketi',
      monthlyPrice: '1.500 TL',
      yearlyTotal: '18.000 TL',
      maxClients: 10,
      badgeColor: '#0284c7',
      allowWhiteLabel: false,
      allowMultiDietitian: false,
      smsQuota: 0,
      allowedTabs: ['diet', 'foods', 'inbody', 'excel'],
      lockedTabs: {
        'lab': { reqPlan: 'Temel Paket', price: '2.200 TL/ay', title: 'Biyokimya & HOMA-IR Tahlil Laboratuvarı' },
        'appointments': { reqPlan: 'Temel Paket', price: '2.200 TL/ay', title: 'Akıllı Randevu Takvimi & Otomatik SMS' },
        'grocery': { reqPlan: 'Temel Paket', price: '2.200 TL/ay', title: 'Otomatik Manav & Pazar Alışveriş Listesi' },
        'crm': { reqPlan: 'Profesyonel Paket', price: '3.000 TL/ay', title: 'Danışan Kasası, Tahsilat & Finans Takibi' },
        'reels': { reqPlan: 'Profesyonel Paket', price: '3.000 TL/ay', title: 'Viral Reels & Sosyal Medya Video AI Stüdyosu' },
        'biolink': { reqPlan: 'Profesyonel Paket', price: '3.000 TL/ay', title: 'Kişisel Klinik Web Sitesi, Google SEO & BioLink' }
      },
      includedFeatures: [
        '10 Danışana Kadar Aktif Takip Kapasitesi',
        'DSÖ 2024 & TÜBER Diyet Planlayıcı',
        'Temel Türkomp Besin Değişimi Veritabanı',
        'Tartı, InBody & Tanita Ölçüm Okuma',
        'Excel Danışan Çizelgesi (10 Danışan Limiti)',
        'Dijital Onam & WhatsApp Liste Paylaşımı'
      ],
      excludedFeatures: [
        'Biyokimya & HOMA-IR Tahlil Laboratuvarı (Temel Paket+)',
        'Akıllı Randevu Takvimi & Otomatik SMS (Temel Paket+)',
        'Otomatik Pazar Alışveriş Listesi (Temel Paket+)',
        'White-Label Kendi Logonuzla PDF Çıktısı (Temel Paket+)',
        'Danışan Kasası & Finans Takibi (Profesyonel Paket+)',
        'Viral Reels & Sosyal Medya AI Stüdyosu (Profesyonel Paket+)',
        'Kişisel Web Sitesi & Google SEO (Profesyonel Paket+)'
      ]
    },
    'core': {
      code: 'core',
      name: 'Temel Paket',
      monthlyPrice: '2.200 TL',
      yearlyTotal: '26.400 TL',
      maxClients: 999999,
      badgeColor: '#1d4ed8',
      allowWhiteLabel: true,
      allowMultiDietitian: false,
      smsQuota: 250,
      allowedTabs: ['diet', 'lab', 'foods', 'inbody', 'excel', 'appointments', 'grocery'],
      lockedTabs: {
        'crm': { reqPlan: 'Profesyonel Paket', price: '3.000 TL/ay', title: 'Danışan Kasası, Tahsilat & Finans Takibi' },
        'reels': { reqPlan: 'Profesyonel Paket', price: '3.000 TL/ay', title: 'Viral Reels & Sosyal Medya Video AI Stüdyosu' },
        'biolink': { reqPlan: 'Profesyonel Paket', price: '3.000 TL/ay', title: 'Kişisel Klinik Web Sitesi, Google SEO & BioLink' }
      },
      includedFeatures: [
        'Sınırsız Danışan ve Dosya Takibi',
        'DSÖ 2024 & Sonsuz Tekrarsız Tarif Motoru',
        'Biyokimya & HOMA-IR Tahlil Laboratuvarı',
        'InBody & Tanita Gelişim Grafikleri',
        'Akıllı Randevu Takvimi & Rehber Bağlama + SMS',
        'Otomatik Manav & Pazar Alışveriş Listesi',
        'White-Label Kendi Logonuzla Lüks PDF Reçete',
        'e-Nabız, e-Reçete & MBYS Uyumlu Altyapı'
      ],
      excludedFeatures: [
        'Danışan Kasası, Tahsilat & Muhasebe Takibi (Profesyonel Paket+)',
        'Viral Reels & Video İçerik AI Stüdyosu (Profesyonel Paket+)',
        'Kişisel Klinik Web Sitesi & Google SEO Vitrini (Profesyonel Paket+)',
        'Çoklu Diyetisyen & 1.000 Başlıklı SMS (Sınırsız Paket)'
      ]
    },
    'pro': {
      code: 'pro',
      name: 'Profesyonel Paket',
      monthlyPrice: '3.000 TL',
      yearlyTotal: '36.000 TL',
      maxClients: 999999,
      badgeColor: '#1e3a8a',
      allowWhiteLabel: true,
      allowMultiDietitian: false,
      smsQuota: 500,
      allowedTabs: ['diet', 'lab', 'foods', 'inbody', 'excel', 'appointments', 'crm', 'reels', 'grocery', 'biolink'],
      lockedTabs: {},
      includedFeatures: [
        'Sınırsız Danışan + Kişisel Klinik Web Sitesi & Google SEO',
        'BioLink Randevu & Online Diyet Vitrini',
        'Viral Reels & Sosyal Medya AI Video İçerik Stüdyosu',
        'Danışan Kasası, Seans Paketi & Finans/Muhasebe Takibi',
        'Biyokimya & HOMA-IR Tahlil Laboratuvarı',
        'Akıllı Randevu Takvimi & Otomatik Hatırlatma SMS',
        'White-Label Kendi Logonuz & Kaşenizle PDF Reçete',
        'Akıllı Danışan Eşleştirme Ağından Hasta Yönlendirme'
      ],
      excludedFeatures: [
        'Çoklu Diyetisyen / Poliklinik Alt Hesap Yönetimi (Sınırsız Paket)',
        '1.000 Hediye Başlıklı Kurumsal SMS Paketi (Sınırsız Paket)'
      ]
    },
    'enterprise': {
      code: 'enterprise',
      name: 'Sınırsız Paket',
      monthlyPrice: '4.500 TL',
      yearlyTotal: '54.000 TL',
      maxClients: 999999,
      badgeColor: '#7c2d12',
      allowWhiteLabel: true,
      allowMultiDietitian: true,
      smsQuota: 1000,
      allowedTabs: ['diet', 'lab', 'foods', 'inbody', 'excel', 'appointments', 'crm', 'reels', 'grocery', 'biolink'],
      lockedTabs: {},
      includedFeatures: [
        'Sınırsız Danışan + Çoklu Diyetisyen (Poliklinik Yönetimi)',
        '1.000 Adet Başlıklı Kurumsal Randevu SMS Paketi Dahil',
        'Özel Alan Adı (.com) & VIP Kurumsal Barındırma',
        'Tüm 10 Klinik Modül (Diyet, Lab, Kasa, Reels, Takvim, Excel, Web) Tam Yetki',
        'Özel AI Model Eğitimi & Kurumsal Reçete Şablonları',
        '7/24 Birebir VIP Klinik Danışman & Öncelikli Destek'
      ],
      excludedFeatures: []
    }
  };

  function resolveTierCode(tierName) {
    if (!tierName) return 'pro';
    var t = tierName.toLowerCase();
    if (t.indexOf('giriş') >= 0 || t.indexOf('giris') >= 0 || t.indexOf('starter') >= 0 || t.indexOf('başlangıç') >= 0 || t.indexOf('baslangic') >= 0) return 'starter';
    if (t.indexOf('temel') >= 0 || t.indexOf('core') >= 0) return 'core';
    if (t.indexOf('sınırsız') >= 0 || t.indexOf('sinirsiz') >= 0 || t.indexOf('enterprise') >= 0 || t.indexOf('kurumsal') >= 0) return 'enterprise';
    return 'pro';
  }

  function getPackageConfig(tierNameOrCode) {
    var code = PACKAGE_CONFIGS[tierNameOrCode] ? tierNameOrCode : resolveTierCode(tierNameOrCode);
    return PACKAGE_CONFIGS[code] || PACKAGE_CONFIGS['pro'];
  }

  function getUsersDb() {
    try {
      var raw = localStorage.getItem('diyetkalfa_users_db');
      return raw ? JSON.parse(raw) : [];
    } catch(e) {
      return [];
    }
  }

  function saveUserToDb(userObj) {
    try {
      var db = getUsersDb();
      var found = false;
      for (var i = 0; i < db.length; i++) {
        if (db[i].email && userObj.email && db[i].email.toLowerCase() === userObj.email.toLowerCase()) {
          db[i] = userObj;
          found = true;
          break;
        }
      }
      if (!found) db.push(userObj);
      localStorage.setItem('diyetkalfa_users_db', JSON.stringify(db));
    } catch(e) {}
  }

  /**
   * 1. Yeni Kayıt Olma -> 7 Günlük Ücretsiz Deneme Başlatıcı
   */
  function registerTrialUser(info) {
    var cfg = getPackageConfig(info.planName || 'Profesyonel Paket');
    var now = new Date();
    var expiry = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000); // Tam 7 Gün
    var key = 'DK-TRIAL-7G-' + Math.floor(1000 + Math.random() * 9000);

    var licObj = {
      userId: 'USR-' + Date.now(),
      status: 'trial',
      isTrial: true,
      isPaid: false,
      tier: (info.planName || cfg.name),
      tierCode: cfg.code,
      cycleMonths: 0,
      cycleDays: 7,
      startDate: now.toISOString(),
      expiryDate: expiry.toISOString(),
      licenseKey: key,
      dietitianName: (info.title ? info.title + ' ' : '') + (info.name || 'Uzm. Diyetisyen'),
      clinicName: info.clinic || ((info.name || 'DiyetKalfa') + ' Beslenme Kliniği'),
      email: info.email || 'diyetisyen@klinik.com',
      phone: info.phone || '0532 120 28 46',
      justPaidWelcome: false,
      justRegisteredTrial: true
    };

    try {
      localStorage.setItem('diyetkalfa_license', JSON.stringify(licObj));
      localStorage.setItem('diyetkalfa_user', JSON.stringify(licObj));
      localStorage.setItem('diyetkalfa_licensed', 'true');
      localStorage.setItem('diyetkalfa_unlocked', 'true');
      localStorage.setItem('diyetkalfa_plan', cfg.name);
      localStorage.setItem('diyetkalfa_tier', cfg.name);
      localStorage.setItem('diyetkalfa_clinic_name', licObj.clinicName);
      localStorage.setItem('diyetkalfa_dietitian_name', licObj.dietitianName);
      saveUserToDb(licObj);
    } catch(e) {}

    return licObj;
  }

  /**
   * 2. Ödeme Onayı -> Paketi Satın Alınan Özelliklerle Aktifleştir & Panele Hoş Geldiniz İle Yönlendir
   */
  function activatePaidLicense(tierName, cycleMonths, dietitianName, clinicName, phone, customKey, autoRedirectToPanel) {
    var cfg = getPackageConfig(tierName || 'Profesyonel Paket');
    var months = parseInt(cycleMonths) || 12;
    var days = (months === 12) ? 365 : (months === 6) ? 180 : (months === 3) ? 90 : 30;
    var prefix = cfg.code === 'starter' ? 'START' : cfg.code === 'core' ? 'CORE' : cfg.code === 'enterprise' ? 'ENT' : 'PRO';
    var key = customKey || ('DK-2026-' + prefix + '-' + Math.floor(1000 + Math.random() * 9000));

    var existing = null;
    try {
      var raw = localStorage.getItem('diyetkalfa_license');
      if (raw) existing = JSON.parse(raw);
    } catch(e) {}

    var now = new Date();
    var expiry = new Date(now.getTime() + days * 24 * 60 * 60 * 1000);

    var licObj = {
      userId: (existing && existing.userId) ? existing.userId : ('USR-' + Date.now()),
      status: 'active_paid',
      isTrial: false,
      isPaid: true,
      tier: (info.planName || cfg.name),
      tierCode: cfg.code,
      cycleMonths: months,
      cycleDays: days,
      startDate: now.toISOString(),
      expiryDate: expiry.toISOString(),
      licenseKey: key,
      dietitianName: dietitianName || (existing && existing.dietitianName) || 'Uzm. Diyetisyen',
      clinicName: clinicName || (existing && existing.clinicName) || 'DiyetKalfa Beslenme Kliniği',
      email: (existing && existing.email) || 'lisans@klinik.com',
      phone: phone || (existing && existing.phone) || '0532 120 28 46',
      paidAmount: (months === 12) ? cfg.yearlyTotal : cfg.monthlyPrice,
      justPaidWelcome: true,
      justRegisteredTrial: false
    };

    try {
      localStorage.setItem('diyetkalfa_license', JSON.stringify(licObj));
      localStorage.setItem('diyetkalfa_user', JSON.stringify(licObj));
      localStorage.setItem('diyetkalfa_licensed', 'true');
      localStorage.setItem('diyetkalfa_unlocked', 'true');
      localStorage.setItem('diyetkalfa_plan', cfg.name);
      localStorage.setItem('diyetkalfa_tier', cfg.name);
      localStorage.setItem('diyetkalfa_license_key', key);
      localStorage.setItem('diyetkalfa_clinic_name', licObj.clinicName);
      localStorage.setItem('diyetkalfa_dietitian_name', licObj.dietitianName);
      saveUserToDb(licObj);
    } catch(e) {}

    if (autoRedirectToPanel) {
      if (window.location.pathname.toLowerCase().indexOf('panel.html') >= 0) {
        if (typeof window.initLicenseUI === 'function') window.initLicenseUI();
        if (typeof window.applyPackagePermissionsToPanel === 'function') window.applyPackagePermissionsToPanel();
        if (typeof window.showPaidWelcomeModal === 'function') window.showPaidWelcomeModal();
      } else {
        window.location.href = 'panel.html?welcome=1&plan=' + encodeURIComponent(cfg.code);
      }
    }

    return licObj;
  }

  /**
   * 3. 7. Gün Sonu Para Çekim Talebini Simüle Et / Süreyi Bitir
   */
  function triggerSeventhDayExpiration() {
    var raw = localStorage.getItem('diyetkalfa_license');
    var lic = raw ? JSON.parse(raw) : registerTrialUser({ name: 'Uzm. Dyt. Selin Yılmaz', planName: 'Profesyonel Paket' });
    var pastDate = new Date(Date.now() - 1000 * 60 * 60); // Süresi dolmuş
    lic.isTrial = true;
    lic.isPaid = false;
    lic.status = 'trial_expired_payment_due';
    lic.expiryDate = pastDate.toISOString();
    try {
      localStorage.setItem('diyetkalfa_license', JSON.stringify(lic));
      saveUserToDb(licObjOrFallback(lic));
    } catch(e) {}
    return lic;
  }

  function licObjOrFallback(l) { return l || {}; }

  /**
   * 4. Ödeme Yapmayan Kullanıcıyı Sistemden At (Kick-Out)
   */
  function kickUnpaidUserFromSystem() {
    try {
      var raw = localStorage.getItem('diyetkalfa_license');
      if (raw) {
        var lic = JSON.parse(raw);
        lic.status = 'kicked_unpaid';
        lic.isPaid = false;
        localStorage.setItem('diyetkalfa_license', JSON.stringify(lic));
        saveUserToDb(lic);
      }
      localStorage.removeItem('diyetkalfa_licensed');
      localStorage.removeItem('diyetkalfa_unlocked');
    } catch(e) {}
    alert('⛔ 7 Günlük Deneme Süreniz Sona Erdi ve Ödeme Onaylanmadı!\n\nGüvenlik protokolü gereği klinik panel oturumunuz kapatılmıştır. Sistemi tekrar kullanabilmek için paket seçerek ödemenizi tamamlamanız gerekmektedir.');
    window.location.href = 'fiyatlar.html?expired=1';
  }

  window.DiyetKalfaDB = {
    PACKAGE_CONFIGS: PACKAGE_CONFIGS,
    resolveTierCode: resolveTierCode,
    getPackageConfig: getPackageConfig,
    getUsersDb: getUsersDb,
    registerTrialUser: registerTrialUser,
    activatePaidLicense: activatePaidLicense,
    triggerSeventhDayExpiration: triggerSeventhDayExpiration,
    kickUnpaidUserFromSystem: kickUnpaidUserFromSystem
  };

})(window);

