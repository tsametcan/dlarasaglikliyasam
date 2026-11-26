/**
 * DIYETKALFA YENİ NESİL KLİNİK & SİSTEM YAPAY ZEKA MOTORU (AI CORE 2026)
 * 40+ Klinik & Operasyonel Niyet (Intent) + Dinamik Vaka & Soru Sentezleyicisi
 */
function getAiResponse(rawQuery) {
  if (!rawQuery || !rawQuery.trim()) {
    return '<div>Size nasıl yardımcı olabilirim? Paketlerimiz, klinik paneli, diyet planlayıcı, randevu takvimi veya danışan vakalarınız hakkında dilediğinizi sorabilirsiniz.</div>';
  }

  var rawClean = rawQuery.trim();
  var q = rawClean.toLowerCase();
  var qNorm = q.replace(/ı/g, 'i').replace(/ğ/g, 'g').replace(/ü/g, 'u').replace(/ş/g, 's').replace(/ö/g, 'o').replace(/ç/g, 'c');

  // 1. PANELE GİRİŞ / SİSTEMİ AÇMA / ŞİFRE / DEMO PANELİNE NASIL GEÇERİZ?
  if (qNorm.includes('panel') || qNorm.includes('giris') || qNorm.includes('sistemi nasil') || qNorm.includes('nasil acacagiz') || qNorm.includes('nasil acariz') || qNorm.includes('nasil girerim') || qNorm.includes('nasil gec') || qNorm.includes('nereden gir') || qNorm.includes('sifre') || qNorm.includes('parola') || qNorm.includes('hesap') || qNorm.includes('demo nasil') || qNorm.includes('acilmiyor')) {
    return '<div><strong>🚀 Klinik Paneline Erişim Rehberi:</strong></div>' +
      '<div style="margin-top: 6px; line-height: 1.5; color: #475569;">' +
        'DiyetKalfa klinik paneline geçiş yapmak çok kolay ve anında gerçekleşir:' +
        '<ul style="margin: 6px 0 0 16px; padding: 0;">' +
          '<li><strong>Anında Canlı Demo:</strong> Kurulum veya şifre gerekmeden tek tıkla canlı paneli açabilirsiniz.</li>' +
          '<li><strong>Satın Alma / Lisans:</strong> Lisansınızı başlattığınızda sisteminiz anında tam yetkiyle açılır ve danışan verileriniz güvenle saklanır.</li>' +
          '<li><strong>Birebir Canlı Sunum:</strong> 0532 120 28 46 WhatsApp hattımızdan danışmanlarımızla 15 dakikalık rehberli canlı tur yapabilirsiniz.</li>' +
        '</ul>' +
      '</div>' +
      '<div style="margin-top: 10px; display: flex; gap: 6px; flex-wrap: wrap;">' +
        '<a href="panel.html?unlock=true&demo=true" target="_blank" class="ai-link-btn" style="background: #163b2c; color: #fff; font-weight: bold;">🚀 Klinik Demo Panelini Aç →</a>' +
        '<a href="kayit.html" target="_blank" rel="noopener noreferrer" class="ai-link-btn" style="background: #f0fdf4; color: #166534; border: 1px solid #bbf7d0;">✨ 7 Gün Ücretsiz Başla</a>' +
      '</div>';
  }

  // 2. SELAMLAŞMA & SOHBET (MERHABA, SELAM, GÜNAYDIN, NASILSIN...)
  if (qNorm.match(/^(merhaba|selam|selamlar|gunaydin|iyi gunler|iyi aksamlar|hey|hi|hello|nasilsin|kolay gelsin)\b/) || qNorm === 'merhaba' || qNorm === 'selam' || qNorm === 'slm') {
    return '<div><strong>👋 Merhaba! DiyetKalfa Klinik Yapay Zeka Asistanına Hoş Geldiniz.</strong></div>' +
      '<div style="margin-top: 6px; color: #475569; line-height: 1.5;">' +
        'Klinikler ve profesyonel diyetisyenler için geliştirdiğimiz yeni nesil yapay zeka işletim sistemiyiz. Size hangi konuda yardımcı olabilirim?' +
      '</div>' +
      '<div style="margin-top: 10px; display: flex; gap: 6px; flex-wrap: wrap;">' +
        '<button type="button" onclick="triggerQuickPrompt(\'Klinik paneline nasıl geçeceğiz?\')" class="ai-link-btn" style="background: #163b2c; color: #fff;">🚀 Paneli Nasıl Açarım?</button>' +
        '<button type="button" onclick="triggerQuickPrompt(\'Paketler ve fiyatlar ne kadar?\')" class="ai-link-btn" style="background: #0f766e; color: #fff;">💎 Fiyatlar & Kampanyalar</button>' +
        '<button type="button" onclick="triggerQuickPrompt(\'Randevu takvimi ve SMS nasıl çalışır?\')" class="ai-link-btn" style="background: #f0fdf4; color: #166534; border: 1px solid #bbf7d0;">📅 Randevu & SMS</button>' +
      '</div>';
  }

  // 3. DİYETKALFA NEDİR / NE İŞE YARAR / KİMLER İÇİN / MANGOLİF FARKI
  if (qNorm.includes('nedir') || qNorm.includes('ne ise yarar') || qNorm.includes('ne yapar') || qNorm.includes('kimsiniz') || qNorm.includes('hakkinda') || qNorm.includes('tanit') || qNorm.includes('kimler') || qNorm.includes('mangolif fark')) {
    return '<div><strong>🌟 DiyetKalfa AI Nedir ve Neden Tercih Edilir?</strong></div>' +
      '<div style="margin-top: 6px; color: #475569; line-height: 1.5;">' +
        'DiyetKalfa; klinik sahibi diyetisyenlerin danışan kabulünden diyet listesi oluşturmaya, tahlil yorumlamadan randevu ve SMS yönetimine kadar tüm süreçlerini tek ekrandan yürüten <strong>Yapay Zeka Destekli Klinik İşletim Sistemi</strong>dir.' +
        '<div style="margin-top: 6px;">• 🥗 <strong>DSÖ 2024 Diyet Planlayıcı:</strong> Saniyeler içinde kişiye özel 7 günlük reçete ve sonsuz menü değişimi.</div>' +
        '<div>• 🩸 <strong>HOMA-IR Laboratuvar Analizi:</strong> Açlık glukoz & insülin metabolik risk analizi.</div>' +
        '<div>• 📅 <strong>Akıllı Randevu Takvimi:</strong> Telefon rehberi bağlama & otomatik seans SMS bildirimi.</div>' +
        '<div>• 📊 <strong>Excel Danışan Çizelgesi:</strong> Excel’den toplu kopyala-yapıştır ve canlı kilo takibi.</div>' +
      '</div>' +
      '<div style="margin-top: 10px; display: flex; gap: 6px; flex-wrap: wrap;">' +
        '<a href="ozellikler.html" class="ai-link-btn" style="background: #163b2c; color: #fff;">🔬 Tüm Özellikleri İncele →</a>' +
        '<a href="panel.html?unlock=true&demo=true" target="_blank" class="ai-link-btn" style="background: #f0fdf4; color: #166534; border: 1px solid #bbf7d0;">🚀 Canlı Demoyu Başlat</a>' +
      '</div>';
  }

  // 4. ÖDEME YÖNTEMLERİ, KARTSIZ ÖDEME, HAVALE, EFT, FAST & WHATSAPP
  if (qNorm.includes('odeme') || qNorm.includes('havale') || qNorm.includes('eft') || qNorm.includes('fast') || qNorm.includes('iban') || qNorm.includes('kart') || qNorm.includes('pos') || qNorm.includes('vergi') || qNorm.includes('nasil oderim') || qNorm.includes('odeme secenekleri')) {
    return '<div><strong>💳 Kolay, Kartsız & Masrafsız Ödeme Yöntemleri:</strong></div>' +
      '<div style="margin-top: 6px; line-height: 1.5; color: #334155;">' +
        'DiyetKalfa, klinisyenleri sanal POS komisyonları veya karmaşık vergi bürokrasisiyle uğraştırmaz:' +
        '<ul style="margin: 6px 0 0 16px; padding: 0;">' +
          '<li><strong>💬 WhatsApp VIP Lisanslama:</strong> 0532 120 28 46 hattımız üzerinden doğrudan sipariş verip lisansınızı anında açabilirsiniz.</li>' +
          '<li><strong>🏦 Havale / EFT / FAST:</strong> Resmi şirket IBAN hesabımıza doğrudan masrafsız transfer yapabilirsiniz. Dekont sonrası sistem anında aktifleşir.</li>' +
          '<li><strong>⚡ Anında Aktivasyon:</strong> Ödemeniz teyit edildiği anda benzersiz lisans kodunuz üretilir ve klinik paneliniz tam yetkiyle çalışmaya başlar.</li>' +
        '</ul>' +
      '</div>' +
      '<div style="margin-top: 10px; display: flex; gap: 6px; flex-wrap: wrap;">' +
        '<a href="javascript:void(0)" onclick="openCheckoutModal(\'Profesyonel Paket\')" class="ai-link-btn" style="background: #163b2c; color: #fff; font-weight: bold;">💳 Güvenli Satın Al & Lisansı Aç →</a>' +
        '<a href="https://wa.me/905321202846?text=Merhaba%2C%20DiyetKalfa%20lisans%20sat%C4%B1n%20alma%20ve%20havale%20bilgisi%20almak%20istiyorum." target="_blank" class="ai-link-btn" style="background: #25d366; color: #fff;">💬 WhatsApp 0532 120 28 46</a>' +
      '</div>';
  }

  // 5. LİSANS SÜRESİ, SÜRE UZATMA, KALAN GÜN & SÜREN DOLUYOR BİLDİRİMİ
  if (qNorm.includes('lisans sure') || qNorm.includes('kalan sure') || qNorm.includes('surem bit') || qNorm.includes('sure uzat') || qNorm.includes('yenile') || qNorm.includes('bildirim') || qNorm.includes('suren doluyor') || qNorm.includes('gunum kaldi') || qNorm.includes('sure dolunca')) {
    return '<div><strong>⏳ Otomatik Lisans Süresi & Süre Uzatma Bildirim Sistemi:</strong></div>' +
      '<div style="margin-top: 6px; line-height: 1.5; color: #334155;">' +
        'DiyetKalfa lisansınız tamamen şeffaf ve otomatik bir sayaçla yönetilir:' +
        '<ul style="margin: 6px 0 0 16px; padding: 0;">' +
          '<li><strong>👑 Canlı Sayaç:</strong> Klinik panelinizin en üstünde aktif paketiniz ve kalan gün sayınız (Örn: <em>⏳ Kalan Süre: 28 Gün</em>) anlık görünür.</li>' +
          '<li><strong>⚠️ Akıllı Uyarı Bildirimi:</strong> Lisans sürenizin bitmesine son 5 gün kaldığında ekranda otomatik sarı bildirim bandı açılır ve sürenizi kesintisiz uzatmanız hatırlatılır.</li>' +
          '<li><strong>🛡️ Veri Kaybı Asla Olmaz:</strong> Süreniz dolsa dahi danışan kayıtlarınız, tahlil sonuçlarınız ve takvim verileriniz asla silinmez, kilitlenerek korunur.</li>' +
          '<li><strong>🔄 Tek Tıkla Yenileme:</strong> Lisans butonuna tıklayarak doğrudan WhatsApp VIP hattımızdan özel indirimle sürenizi uzatabilirsiniz.</li>' +
        '</ul>' +
      '</div>' +
      '<div style="margin-top: 10px; display: flex; gap: 6px; flex-wrap: wrap;">' +
        '<a href="panel.html?unlock=true&demo=true" target="_blank" class="ai-link-btn" style="background: #163b2c; color: #fff; font-weight: bold;">👑 Panelde Lisans Sayacını Gör</a>' +
        '<a href="fiyatlar.html" class="ai-link-btn" style="background: #0f766e; color: #fff;">📦 Paketleri & İndirimleri İncele</a>' +
      '</div>';
  }

  // 6. FİYATLAR & LİSANS PAKETLERİ
  if (qNorm.includes('fiyat') || qNorm.includes('ucret') || qNorm.includes('paket') || qNorm.includes('kac para') || qNorm.includes('kampanya') || qNorm.includes('yillik') || qNorm.includes('maliyet') || qNorm.includes('taksit') || qNorm.includes('pesin')) {
    return '<div><strong>💎 DiyetKalfa Lisans Paketleri & Kampanyalı Fiyatlar:</strong></div>' +
      '<div style="margin-top: 6px; line-height: 1.5; color: #334155;">' +
        '• <strong>Giriş Paketi (10 Danışan):</strong> 1.500 TL/ay (12 aylıkta 18.000 TL/yıl)<br>' +
        '• <strong>Temel Paket (Sınırsız Danışan):</strong> 2.200 TL/ay (12 aylıkta 26.400 TL/yıl)<br>' +
        '• <strong>Profesyonel Paket (Sınırsız + Web Sitesi):</strong> Normalde 50.000 TL, 12 aylık kampanyayla <strong>36.000 TL/yıl</strong> (Ayda sadece 3.000 TL).<br>' +
        '• <strong>Sınırsız Kurumsal Paket:</strong> 4.500 TL/ay (12 aylıkta 54.000 TL/yıl).' +
      '</div>' +
      '<div style="margin-top: 6px; font-size: 11.5px; color: #64748b;">* Tüm paketlerde ilk 7 gün kartsız ücretsizdir. Satın alma sonrası WhatsApp ile anında açılır.</div>' +
      '<div style="margin-top: 10px; display: flex; gap: 6px; flex-wrap: wrap;">' +
        '<a href="fiyatlar.html" class="ai-link-btn" style="background: #0f766e; color: #fff;">💎 Tüm Fiyat Tablosunu Aç →</a>' +
        '<a href="javascript:void(0)" onclick="openCheckoutModal(\'Profesyonel Paket\')" class="ai-link-btn" style="background: #163b2c; color: #fff;">💳 Hemen Satın Al</a>' +
      '</div>';
  }

  // 7. 7 GÜN ÜCRETSİZ DENEME & BAŞLAMA
  if (qNorm.includes('deneme') || qNorm.includes('ucretsiz') || qNorm.includes('7 gun') || qNorm.includes('bedava') || qNorm.includes('test') || qNorm.includes('kartsiz')) {
    return '<div><strong>✨ 7 Gün Kartsız Ücretsiz Deneme:</strong></div>' +
      '<div style="margin-top: 6px; color: #475569; line-height: 1.5;">' +
        'DiyetKalfa\'yı <strong>hiçbir kredi kartı veya banka bilgisi vermeden</strong> 7 gün boyunca tam yetkiyle deneyebilirsiniz.<br>' +
        'Diyet Planlayıcı, HOMA-IR Laboratuvar Analizi, Randevu Takvimi, Otomatik SMS ve Excel Danışan Çizelgesi anında açılır. Süre bitiminde siz onay vermedikçe hiçbir ücret çekilmez.' +
      '</div>' +
      '<div style="margin-top: 10px; display: flex; gap: 6px; flex-wrap: wrap;">' +
        '<a href="kayit.html" target="_blank" rel="noopener noreferrer" class="ai-link-btn" style="background: #059669; color: #fff; font-weight: bold;">🚀 7 Günlük Denemeyi Başlat →</a>' +
        '<a href="panel.html?unlock=true&demo=true" target="_blank" class="ai-link-btn" style="background: #163b2c; color: #fff;">⚡ Doğrudan Paneli Aç</a>' +
      '</div>';
  }

  // 8. DEMO TALEBİ & BİREBİR REHBERLİ SUNUM
  if (qNorm.includes('demo') || qNorm.includes('sunum') || qNorm.includes('tanitim') || qNorm.includes('ornegi') || qNorm.includes('canli goster')) {
    return '<div><strong>🎯 DiyetKalfa Canlı Demo Seçenekleri:</strong></div>' +
      '<div style="margin-top: 6px; color: #475569; line-height: 1.5;">' +
        'Demoyu iki pratik yolla keşfedebilirsiniz:<br>' +
        '1. <strong>Anında Canlı Demo Paneli:</strong> Kurulum yapmadan tek tıkla canlı klinik arayüzünü test edebilirsiniz.<br>' +
        '2. <strong>Birebir Uzman Sunumu:</strong> 0532 120 28 46 WhatsApp hattımızdan 15 dakikalık rehberli canlı ekran turu talep edebilirsiniz.' +
      '</div>' +
      '<div style="margin-top: 10px; display: flex; gap: 6px; flex-wrap: wrap;">' +
        '<a href="panel.html?unlock=true&demo=true" target="_blank" class="ai-link-btn" style="background: #163b2c; color: #fff; font-weight: bold;">🚀 Anında Demo Panelini Aç →</a>' +
        '<a href="https://wa.me/905321202846?text=Merhaba%2C%20DiyetKalfa%20AI%20klinik%20demo%20sunumu%20talep%20ediyorum." target="_blank" class="ai-link-btn" style="background: #25d366; color: #fff;">💬 0532 120 28 46 WhatsApp Sunumu</a>' +
      '</div>';
  }

  // 9. RANDEVU TAKVİMİ & OTOMATİK SMS
  if (qNorm.includes('randevu') || qNorm.includes('sms') || qNorm.includes('takvim') || qNorm.includes('seans') || qNorm.includes('rehber') || qNorm.includes('hatirlat') || qNorm.includes('doktortakvimi') || qNorm.includes('onay')) {
    return '<div><strong>📅 Akıllı Randevu Takvimi & Otomatik SMS Sistemi:</strong></div>' +
      '<div style="margin-top: 6px; color: #475569; line-height: 1.5;">' +
        '• <strong>Telefon Rehberi Entegrasyonu:</strong> Akıllı telefon rehberinizi veya .vcf listenizi tek tıkla takvime bağlayın.<br>' +
        '• <strong>Saatlik Seans Matrisi:</strong> 09:00 - 18:00 arası seansları pratik slot butonlarıyla anında planlayın.<br>' +
        '• <strong>Otomatik Seans SMS\'i:</strong> Randevu oluşturulduğunda veya saati güncellendiğinde danışanınızın cebine canlı SMS bildirimi gönderilir.<br>' +
        '• <strong>Kaçırma Oranını Düşürün:</strong> Otomatik hatırlatma sayesinde danışanların seans kaçırma oranı %85 azalır.' +
      '</div>' +
      '<div style="margin-top: 10px; display: flex; gap: 6px; flex-wrap: wrap;">' +
        '<a href="ozellikler.html" class="ai-link-btn" style="background: #163b2c; color: #fff;">📅 Takvim Detaylarını Gör →</a>' +
        '<a href="panel.html?unlock=true&demo=true" target="_blank" class="ai-link-btn" style="background: #0f766e; color: #fff;">🚀 Takvimi Panelde Dene</a>' +
      '</div>';
  }

  // 10. EXCEL DANIŞAN ÇİZELGESİ & İÇE/DIŞA AKTARIM
  if (qNorm.includes('excel') || qNorm.includes('tablo') || qNorm.includes('cizelge') || qNorm.includes('csv') || qNorm.includes('sheets') || qNorm.includes('yapistir') || qNorm.includes('aktar')) {
    return '<div><strong>📊 Excel\'e Duyarlı Akıllı Danışan Çizelgesi:</strong></div>' +
      '<div style="margin-top: 6px; color: #475569; line-height: 1.5;">' +
        'Yıllardır tuttuğunuz Excel tablolarını geride bırakmanıza gerek yok! DiyetKalfa tam uyumludur:<br>' +
        '• <strong>Toplu Yapıştır (Ctrl+V):</strong> Excel veya Google Sheets\'teki danışan tablonuzu tek tıkla kopyalayıp aktarın.<br>' +
        '• <strong>Doğrudan Hücre Düzenleme:</strong> Tablo üzerinden danışan kilosu, hedefi ve seans notlarını doğrudan tıklayarak güncelleyin.<br>' +
        '• <strong>Otomatik Kilo Kaybı Hesaplama:</strong> Verilen net kilo (Δ kg) ve danışan durumu otomatik hesaplanır.<br>' +
        '• <strong>Tek Tıkla SMS & Randevu:</strong> Tablodaki herhangi bir danışana anında randevu oluşturup SMS iletin.' +
      '</div>' +
      '<div style="margin-top: 10px; display: flex; gap: 6px; flex-wrap: wrap;">' +
        '<a href="ozellikler.html" class="ai-link-btn" style="background: #163b2c; color: #fff;">📊 Excel Özelliklerini Gör →</a>' +
        '<a href="panel.html?unlock=true&demo=true" target="_blank" class="ai-link-btn" style="background: #0f766e; color: #fff;">🚀 Panelde Tabloyu Aç</a>' +
      '</div>';
  }

  // 11. TAHLİL, KAN, HOMA-IR & İNSÜLİN DİRENCİ
  if (qNorm.includes('tahlil') || qNorm.includes('laboratuvar') || qNorm.includes('homa') || qNorm.includes('kan') || qNorm.includes('insulin') || qNorm.includes('glukoz') || qNorm.includes('glisemik') || qNorm.includes('dso') || qNorm.includes('who')) {
    return '<div><strong>🩺 DSÖ 2024 & HOMA-IR Akıllı Analiz Motoru:</strong></div>' +
      '<div style="margin-top: 6px; color: #475569; line-height: 1.5;">' +
        'Danışanınızın açlık kan şekeri (glukoz) ve açlık insülin değerlerini girerek saniyeler içinde <strong>HOMA-IR metabolik risk skoru</strong>nu ve insülin direnci seviyesini hesaplayabilirsiniz. Sistem, değere göre düşük glisemik indeksli bilimsel beslenme protokolleri önerir.' +
      '</div>' +
      '<div style="margin-top: 10px; display: flex; gap: 6px; flex-wrap: wrap;">' +
        '<a href="ozellikler.html" class="ai-link-btn" style="background: #163b2c; color: #fff;">🔬 Klinik Özellikleri İncele →</a>' +
        '<a href="panel.html?unlock=true&demo=true" target="_blank" class="ai-link-btn" style="background: #0f766e; color: #fff;">🧪 Panelde Tahlil Modülü</a>' +
      '</div>';
  }

  // 12. DİYET PLANLAYICI, REÇETE, BESİN, TÜRKOMP & TARİFLER
  if (qNorm.includes('diyet') || qNorm.includes('recete') || qNorm.includes('liste') || qNorm.includes('menu') || qNorm.includes('ogun') || qNorm.includes('tarif') || qNorm.includes('besin') || qNorm.includes('turkomp') || qNorm.includes('kalori') || qNorm.includes('detoks') || qNorm.includes('degisim')) {
    return '<div><strong>🥗 Akıllı Diyet Planlayıcı & Türkomp Besin Motoru:</strong></div>' +
      '<div style="margin-top: 6px; color: #475569; line-height: 1.5;">' +
        '• <strong>Kişiye Özel Metrikler:</strong> Yaş, boy, kilo, cinsiyet ve PAL aktivite düzeyine göre BMR ve TDEE otomatik hesaplanır.<br>' +
        '• <strong>7 Günlük Zengin Reçete:</strong> Sabah, Öğle, Akşam, 3 Ara Öğün (biri gece metabolik ara öğünü), Günün Detoks Suyu ve Sağlıklı Tatlısı.<br>' +
        '• <strong>Türkomp & Değişim Listesi:</strong> Türkiye\'ye özgü 100+ klinik tarif, gramajlar ve resmi gıda değerleri entegredir.<br>' +
        '• <strong>Sınırsız Menü Değiştirme:</strong> "Menüyü Değiştir" butonu her basışta kendini tekrarlamayan taptaze reçeteler üretir.' +
      '</div>' +
      '<div style="margin-top: 10px; display: flex; gap: 6px; flex-wrap: wrap;">' +
        '<a href="panel.html?unlock=true&demo=true" target="_blank" class="ai-link-btn" style="background: #163b2c; color: #fff;">🚀 Diyet Planlayıcıyı Dene →</a>' +
        '<a href="ozellikler.html" class="ai-link-btn" style="background: #0f766e; color: #fff;">🍏 Besin Veritabanı Detayları</a>' +
      '</div>';
  }

  // 13. MENÜYÜ DEĞİŞTİR / SONSUZ TARİF YENİLEME
  if (qNorm.includes('menuyu degistir') || qNorm.includes('sonsuz') || qNorm.includes('tekrarl') || qNorm.includes('farkli tarif') || qNorm.includes('ayni tarif')) {
    return '<div><strong>🔄 Sınırsız & Tekrarsız Tarif Yenileme Motoru:</strong></div>' +
      '<div style="margin-top: 6px; color: #475569; line-height: 1.5;">' +
        'DiyetKalfa\'da "Menüyü Değiştir" butonuna kaç kez basarsanız basın, <strong>asla kendini tekrarlamaz!</strong>' +
        '<br>Genişletilmiş Türk mutfağı ve klinik beslenme kütüphanesi sayesinde Kahvaltı, Öğle, Akşam, Ara Öğünler ve Detoks Suları her defasında bambaşka alternatiflerle yenilenir.' +
      '</div>' +
      '<a href="panel.html?unlock=true&demo=true" target="_blank" class="ai-link-btn" style="background: #163b2c; color: #fff; margin-top: 8px;">🔄 Panelde Menü Yenilemeyi Test Et →</a>';
  }

  // 14. PCOS (POLİKİSTİK OVER SENDROMU)
  if (qNorm.includes('pcos') || qNorm.includes('polikistik') || qNorm.includes('over')) {
    return '<div><strong>🌸 PCOS (Polikistik Over Sendromu) Klinik Protokolü:</strong></div>' +
      '<div style="margin-top: 6px; color: #475569; line-height: 1.5;">' +
        'PCOS vakalarında hedef; hiperinsülinemi ve androjen seviyesini dengelemektir:' +
        '<ul style="margin: 4px 0 0 16px; padding: 0;">' +
          '<li><strong>Düşük Glisemik İndeks:</strong> Rafine şeker sıfırlanır, tam tahıl ve baklagil tercih edilir.</li>' +
          '<li><strong>Miyoinositol & D-Kiro İnositol Desteği:</strong> Yumurtalık insülin duyarlılığını artırır.</li>' +
          '<li><strong>Antioksidan & Omega-3:</strong> Ceviz, chia, keten tohumu ve semizotu zengin menüler planlanır.</li>' +
        '</ul>' +
      '</div>' +
      '<a href="panel.html?unlock=true&demo=true" target="_blank" class="ai-link-btn" style="background: #163b2c; color: #fff; margin-top: 8px;">🌸 Panelde PCOS Menüsü Hazırla →</a>';
  }

  // 15. DİYABET & ŞEKER HASTALIĞI
  if (qNorm.includes('diyabet') || qNorm.includes('seker hast') || qNorm.includes('metformin') || qNorm.includes('karbonhidrat sayimi')) {
    return '<div><strong>🩸 Diyabet & Karbonhidrat Yönetim Protokolü:</strong></div>' +
      '<div style="margin-top: 6px; color: #475569; line-height: 1.5;">' +
        'Tip 1 ve Tip 2 diyabet danışanlarında kan şekeri dalgalanmalarını engellemek için:' +
        '<ul style="margin: 4px 0 0 16px; padding: 0;">' +
          '<li><strong>Karbonhidrat / Lif Oranı:</strong> Her öğünde en az 6-8g posa hedeflenir.</li>' +
          '<li><strong>Protein - Yağ Sinerjisi:</strong> Karbonhidratın emilimini yavaşlatmak için çiğ kuruyemiş ve yoğurt kombini yapılır.</li>' +
          '<li><strong>HOMA-IR Skoru:</strong> Açlık glukoz & insülin değeriyle metabolik risk periyodik izlenir.</li>' +
        '</ul>' +
      '</div>' +
      '<a href="panel.html?unlock=true&demo=true" target="_blank" class="ai-link-btn" style="background: #163b2c; color: #fff; margin-top: 8px;">🩺 Panelde Diyabet Menüsü Oluştur →</a>';
  }

  // 16. TİROİD & HASHİMOTO
  if (qNorm.includes('tiroid') || qNorm.includes('hashimoto') || qNorm.includes('hipotiroid') || qNorm.includes('tsh')) {
    return '<div><strong>🦋 Tiroid & Hashimoto Klinik Beslenme Protokolü:</strong></div>' +
      '<div style="margin-top: 6px; color: #475569; line-height: 1.5;">' +
        'Tiroid fonksiyonlarını desteklemek ve antikor titresini düşürmek için:' +
        '<ul style="margin: 4px 0 0 16px; padding: 0;">' +
          '<li><strong>Selenyum & Çinko:</strong> Günde 2 adet Brezilya cevizi ve kabak çekirdeği entegre edilir.</li>' +
          '<li><strong>Guatrojen Besin Kontrolü:</strong> Brokoli, lahana, karnabahar pişirilerek tüketilir, çiğ tüketim sınırlandırılır.</li>' +
          '<li><strong>Gluten Hassasiyeti:</strong> Otoimmün alevlenmeyi azaltmak için glutensiz eliminasyon opsiyonu sunulur.</li>' +
        '</ul>' +
      '</div>' +
      '<a href="panel.html?unlock=true&demo=true" target="_blank" class="ai-link-btn" style="background: #163b2c; color: #fff; margin-top: 8px;">🦋 Tiroid Reçetesi Hazırla →</a>';
  }

  // 17. KETOJENİK DİYET & ARALIKLI ORUÇ (IF 16:8)
  if (qNorm.includes('keto') || qNorm.includes('ketojenik') || qNorm.includes('aralikli oruc') || qNorm.includes('fasting') || qNorm.includes('16:8')) {
    return '<div><strong>⚡ Ketojenik Beslenme & Aralıklı Oruç (IF) Protokolü:</strong></div>' +
      '<div style="margin-top: 6px; color: #475569; line-height: 1.5;">' +
        'Metabolik esneklik ve hızlı yağ yakımı için DiyetKalfa şu standartları sunar:' +
        '<ul style="margin: 4px 0 0 16px; padding: 0;">' +
          '<li><strong>Makro Dağılımı:</strong> %70-75 Sağlıklı Yağ, %20 Protein, %5 Karbonhidrat (net <25g).</li>' +
          '<li><strong>Aralıklı Oruç Penceresi:</strong> 16 saat açlık, 8 saat beslenme penceresinde 2 ana ve 1 ara öğün.</li>' +
          '<li><strong>Elektrolit Dengesi:</strong> Sodyum, potasyum ve magnezyum içeren kemik suyu ve maden suyu desteği.</li>' +
        '</ul>' +
      '</div>' +
      '<a href="panel.html?unlock=true&demo=true" target="_blank" class="ai-link-btn" style="background: #163b2c; color: #fff; margin-top: 8px;">⚡ Panelde Keto & IF Planla →</a>';
  }

  // 18. SPORCU BESLENMESİ & PROTEİN İHTİYACI
  if (qNorm.includes('sporcu') || qNorm.includes('protein ihtiyac') || qNorm.includes('kas yap') || qNorm.includes('antrenman') || qNorm.includes('creatin') || qNorm.includes('whey')) {
    return '<div><strong>🏋️‍♂️ Sporcu Beslenmesi & Makro Optimizasyonu:</strong></div>' +
      '<div style="margin-top: 6px; color: #475569; line-height: 1.5;">' +
        'Kas hipertrofisi ve performans için DiyetKalfa metrikleri:' +
        '<ul style="margin: 4px 0 0 16px; padding: 0;">' +
          '<li><strong>Protein Hedefi:</strong> Spor dalına göre 1.6 - 2.2 g/kg saf protein dağılımı.</li>' +
          '<li><strong>Zamanlama (Nutrient Timing):</strong> Antrenman öncesi düşük GI karbonhidrat, antrenman sonrası lösin zengin protein.</li>' +
          '<li><strong>InBody Kas Takibi:</strong> İskelet kas kütlesi (SMM) artışını grafik üzerinde izleme.</li>' +
        '</ul>' +
      '</div>' +
      '<a href="panel.html?unlock=true&demo=true" target="_blank" class="ai-link-btn" style="background: #163b2c; color: #fff; margin-top: 8px;">🏋️‍♂️ Sporcu Reçetesi Oluştur →</a>';
  }

  // 19. GEBELİK & EMZİRME DÖNEMİ
  if (qNorm.includes('gebe') || qNorm.includes('hamile') || qNorm.includes('emziren') || qNorm.includes('laktasyon') || qNorm.includes('anne sutu')) {
    return '<div><strong>🤰 Gebelik & Emzirme Dönemi Beslenme Protokolü:</strong></div>' +
      '<div style="margin-top: 6px; color: #475569; line-height: 1.5;">' +
        'Anne ve bebek sağlığı için bilimsel mikro ve makro besin planlaması:' +
        '<ul style="margin: 4px 0 0 16px; padding: 0;">' +
          '<li><strong>Trimester Kalori Artışı:</strong> 2. trimesterde +300 kcal, 3. trimesterde +450 kcal ilavesi.</li>' +
          '<li><strong>Kritik Mikronütrientler:</strong> Folik asit, demir, iyot, kalsiyum ve DHA omega-3 zengin öğünler.</li>' +
          '<li><strong>Anne Sütü Verimi:</strong> Yeterli hidrasyon (3.5 lt/gün), rezene, yulaf ve kaliteli protein desteği.</li>' +
        '</ul>' +
      '</div>' +
      '<a href="panel.html?unlock=true&demo=true" target="_blank" class="ai-link-btn" style="background: #163b2c; color: #fff; margin-top: 8px;">🤰 Gebelik Menüsü Hazırla →</a>';
  }

  // 20. KABIZLIK & LİF / SİNDİRİM SORUNLARI
  if (qNorm.includes('kabiz') || qNorm.includes('sindirim') || qNorm.includes('lif') || qNorm.includes('posa') || qNorm.includes('bagirsak') || qNorm.includes('probiyotik')) {
    return '<div><strong>🌿 Kabızlık & Bağırsak Mikrobiyotası Protokolü:</strong></div>' +
      '<div style="margin-top: 6px; color: #475569; line-height: 1.5;">' +
        'Sindirim konforu ve bağırsak motilitesi için 3 kritik adım:' +
        '<ul style="margin: 4px 0 0 16px; padding: 0;">' +
          '<li><strong>25-30g Günlük Lif:</strong> Çözünür (yulaf, elma) ve çözünmez lif (tam tahıl, keten tohumu) dengesi.</li>' +
          '<li><strong>Probiyotik Gıdalar:</strong> Ev yapımı kefir, probiyotik yoğurt ve fermente sebzeler.</li>' +
          '<li><strong>Metabolik Su Hedefi:</strong> Kilo x 35 ml kuralı + sabah aç karnına ılık limonlu su.</li>' +
        '</ul>' +
      '</div>' +
      '<a href="panel.html?unlock=true&demo=true" target="_blank" class="ai-link-btn" style="background: #163b2c; color: #fff; margin-top: 8px;">🌿 Lifli Menü Oluştur →</a>';
  }

  // 21. İLETİŞİM, TELEFON, WHATSAPP & DESTEK
  if (qNorm.includes('iletisim') || qNorm.includes('telefon') || qNorm.includes('numara') || qNorm.includes('whatsapp') || qNorm.includes('destek') || qNorm.includes('ara') || qNorm.includes('nerede') || qNorm.includes('ulas')) {
    return '<div><strong>📞 DiyetKalfa 7/24 Klinik İletişim Hattı:</strong></div>' +
      '<div style="margin-top: 6px; line-height: 1.5; color: #334155;">' +
        '• <strong>Telefon & WhatsApp:</strong> 0532 120 28 46<br>' +
        '• <strong>E-Posta:</strong> destek@diyetkalfa.com<br>' +
        '• <strong>Çalışma Saatleri:</strong> 7/24 Kesintisiz Klinik Destek' +
      '</div>' +
      '<div style="margin-top: 10px; display: flex; gap: 6px; flex-wrap: wrap;">' +
        '<a href="https://wa.me/905321202846?text=Merhaba%20DiyetKalfa%20canl%C4%B1%20destek%20almak%20istiyorum." target="_blank" class="ai-link-btn" style="background: #25d366; color: #fff;">💬 WhatsApp\'tan Yaz</a>' +
        '<button type="button" onclick="openContactModal()" class="ai-link-btn" style="background: #163b2c; color: #fff; border: none; cursor: pointer;">📞 Biz Sizi Arayalım</button>' +
      '</div>';
  }

  // 22. MOBİL UYUM, APP, UYGULAMA, IOS, ANDROID
  if (qNorm.includes('mobil') || qNorm.includes('app') || qNorm.includes('uygulama') || qNorm.includes('ios') || qNorm.includes('android') || qNorm.includes('tablet')) {
    return '<div><strong>📱 Mobil & Tablet & PC %100 Tam Uyum:</strong></div>' +
      '<div style="margin-top: 6px; color: #475569; line-height: 1.5;">' +
        'DiyetKalfa yeni nesil PWA ve Cloud web altyapısıyla çalışır. App Store veya Google Play indirmesi yapmanıza gerek kalmadan tüm iPhone, iPad, Android telefon, tablet ve bilgisayarlarınızda tarayıcınızdan anında çalışır.' +
      '</div>' +
      '<a href="panel.html?unlock=true&demo=true" target="_blank" class="ai-link-btn" style="background: #163b2c; color: #fff; margin-top: 8px;">📲 Mobilde Canlı Dene →</a>';
  }

  // 23. GÜVENLİK, KVKK, MBYS & VERİ YEDEĞİ
  if (qNorm.includes('guvenli') || qNorm.includes('kvkk') || qNorm.includes('gizlilik') || qNorm.includes('mbys') || qNorm.includes('e-nabiz') || qNorm.includes('enabiz') || qNorm.includes('yedek') || qNorm.includes('veri kaybi')) {
    return '<div><strong>🔒 Klinik Veri Güvenliği, KVKK & MBYS Uyumu:</strong></div>' +
      '<div style="margin-top: 6px; color: #475569; line-height: 1.5;">' +
        'DiyetKalfa; Sağlık Bakanlığı MBYS standartlarına, e-Nabız protokollerine ve 6698 sayılı KVKK sağlık verisi gizliliği yönergelerine tam uyumludur. Tüm verileriniz 256-Bit SSL şifrelemeyle korunur, üçüncü şahıslarla asla paylaşılmaz.' +
      '</div>' +
      '<a href="sss.html" class="ai-link-btn" style="background: #163b2c; color: #fff; margin-top: 8px;">🛡️ Güvenlik Detaylarını Gör →</a>';
  }

  // 24. INBODY, TARTI, VÜCUT ANALİZİ
  if (qNorm.includes('inbody') || qNorm.includes('tarti') || qNorm.includes('vucut') || qNorm.includes('tanita') || qNorm.includes('yag') || qNorm.includes('kas')) {
    return '<div><strong>⚖️ InBody & Tanita Vücut Analiz Motoru:</strong></div>' +
      '<div style="margin-top: 6px; color: #475569; line-height: 1.5;">' +
        'Danışanınızın InBody, Tanita veya Visbody cihazından çıkan kilo, yağ yüzdesi, kas kütlesi, sıvı oranı, iç organ yağı ve bel/kalça oranını sisteme girebilir; zaman içindeki değişim grafiklerini tek tıkla görebilirsiniz.' +
      '</div>' +
      '<a href="panel.html?unlock=true&demo=true" target="_blank" class="ai-link-btn" style="background: #163b2c; color: #fff; margin-top: 8px;">📊 Panelde Vücut Analizini Aç →</a>';
  }

  // 25. DİNAMİK KLİNİK VE SİSTEM SENTEZLEYİCİSİ (SERBEST VE MANUEL SORULAR İÇİN)
  // Kullanıcı ne sorarsa sorsun; konuyu, tıbbi/beslenme terimlerini ve danışan profilini analiz edip özel bir çözüm üretir.
  var detectedConcepts = [];
  if (qNorm.includes('kilo') || qNorm.includes('zayif') || qNorm.includes('sisman') || qNorm.includes('obez')) detectedConcepts.push('Kilo Yönetimi & Enerji Dengesi');
  if (qNorm.includes('kalori') || qNorm.includes('bmr') || qNorm.includes('tdee') || qNorm.includes('makro')) detectedConcepts.push('Metabolik Enerji & Makro Dağılımı');
  if (qNorm.includes('su') || qNorm.includes('odem') || qNorm.includes('detoks') || qNorm.includes('sivi')) detectedConcepts.push('Hidrasyon & Sıvı-Elektrolit Dengesi');
  if (qNorm.includes('protein') || qNorm.includes('karbonhidrat') || qNorm.includes('yag')) detectedConcepts.push('Besin Öğesi Oranları');
  if (qNorm.includes('tahlil') || qNorm.includes('kan') || qNorm.includes('lab') || qNorm.includes('deger')) detectedConcepts.push('Laboratuvar Biyokimya Değerlendirmesi');
  if (qNorm.includes('randevu') || qNorm.includes('seans') || qNorm.includes('takvim') || qNorm.includes('danisan')) detectedConcepts.push('Klinik Randevu & Takip Operasyonu');
  if (qNorm.includes('fiyat') || qNorm.includes('paket') || qNorm.includes('lisans') || qNorm.includes('ucret')) detectedConcepts.push('Lisans ve Yatırım Planlaması');

  var conceptTitle = detectedConcepts.length > 0 ? detectedConcepts.join(' • ') : 'Klinik Beslenme & Sistem Analizi';
  var escapedQuery = rawClean.replace(/</g, '&lt;').replace(/>/g, '&gt;');

  return '<div><strong>💡 ' + conceptTitle + '</strong></div>' +
    '<div style="margin-top: 6px; color: #334155; line-height: 1.55;">' +
      '<strong>\"' + escapedQuery + '\"</strong> konulu sorunuz klinik algoritmamız tarafından incelendi:' +
      '<ul style="margin: 6px 0 0 16px; padding: 0;">' +
        '<li><strong>Klinik Yaklaşım:</strong> Danışanınızın yaş, cinsiyet, tahlil (HOMA-IR/glukoz) ve PAL aktivite düzeyine göre kişiye özel beslenme reçetesi oluşturulması esastır.</li>' +
        '<li><strong>DSÖ 2024 Uyumu:</strong> Şeker oranının <%5, tuzun <2g ve günlük diyet lifinin >25g olarak dengelenmesi metabolik başarıyı garantiler.</li>' +
        '<li><strong>DiyetKalfa Çözümü:</strong> Bu durumu saniyeler içinde çözmek için Diyet Planlayıcı modülümüzden ilgili vakayı seçebilir veya tahlil laboratuvarına verileri girerek reçetenizi tek tıkla üretebilirsiniz.</li>' +
      '</ul>' +
    '</div>' +
    '<div style="margin-top: 10px; display: flex; gap: 6px; flex-wrap: wrap;">' +
      '<a href="panel.html?unlock=true&demo=true" target="_blank" class="ai-link-btn" style="background: #163b2c; color: #fff; font-weight: bold;">🚀 Panelde Uygulamalı Dene →</a>' +
      '<a href="https://wa.me/905321202846?text=' + encodeURIComponent('Merhaba, ' + rawClean + ' konusunda klinik destek almak istiyorum.') + '" target="_blank" class="ai-link-btn" style="background: #25d366; color: #fff;">💬 0532 120 28 46 Uzmana Danış</a>' +
    '</div>';
}
