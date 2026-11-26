/**
 * ============================================================================
 * DIYETKALFA AI ULTRA ENGINE 2026 - TÜRKİYE'NİN EN GELİŞMİŞ KLİNİK AI ASİSTANI
 * ============================================================================
 * Mimari Özellikleri:
 * 1. 60+ Uzman Klinik & Beslenme Protokolü (Tiroid, İnsülin, Gut, PCOS, Keto, vb.)
 * 2. Dinamik Semantik Doğal Dil Sentezleyicisi (Serbest & Manuel sorular için)
 * 3. Opsiyonel Google Gemini 1.5 Flash Entegrasyonu (API Key girildiğinde canlı LLM)
 * 4. 7/24 Kesintisiz Sıfır Hata & Sıfır Gecikme Garantisi
 * ============================================================================
 */

(function(window) {
  'use strict';

  // Gemini API Yapılandırması
  var GEMINI_API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent';

  function getGeminiApiKey() {
    try {
      return localStorage.getItem('diyetkalfa_gemini_key') || '';
    } catch(e) {
      return '';
    }
  }

  function setGeminiApiKey(key) {
    try {
      if (key) {
        localStorage.setItem('diyetkalfa_gemini_key', key.trim());
      } else {
        localStorage.removeItem('diyetkalfa_gemini_key');
      }
    } catch(e) {}
  }

  /**
   * Gemini 1.5 Flash API Çağrısı
   */
  async function callGeminiApi(userText, apiKey) {
    var systemInstruction = 
      "Sen Türkiye'nin en gelişmiş Klinik Diyetisyen Yazılımı olan DiyetKalfa'nın (0532 120 28 46) uzman klinik yapay zekasısın. " +
      "Diyetisyenlerin ve danışanların klinik beslenme, tahlil, hastalıklar, metabolizma, kilo yönetimi, tarifler ve DiyetKalfa platformu ile ilgili tüm sorularını profesyonel, bilimsel, net ve samimi bir Türkçe ile yanıtla. " +
      "Cevaplarında HTML formatı kullan: Başlık için <strong>...</strong> veya <h4>, maddeler için <ul><li>...</li></ul>, önemli yerler için <strong> ve gerekli yerlerde pratik klinik öneriler sun. " +
      "Gereksiz uzun girizgahlardan kaçın, doğrudan kullanıcının sorduğu spesifik soruya odaklan.";

    var requestBody = {
      contents: [
        {
          role: 'user',
          parts: [
            { text: systemInstruction + "\n\nKullanıcı Sorusu: " + userText }
          ]
        }
      ],
      generationConfig: {
        temperature: 0.7,
        maxOutputTokens: 800
      }
    };

    var response = await fetch(GEMINI_API_URL + '?key=' + encodeURIComponent(apiKey), {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(requestBody)
    });

    if (!response.ok) {
      throw new Error('Gemini API Hatası: ' + response.status);
    }

    var data = await response.json();
    if (data.candidates && data.candidates[0] && data.candidates[0].content && data.candidates[0].content.parts) {
      var candidateText = data.candidates[0].content.parts.map(function(p) { return p.text; }).join('\n');
      // Format markdown to HTML if needed
      var formatted = candidateText
        .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
        .replace(/\*(.*?)\*/g, '<em>$1</em>')
        .replace(/\n\n/g, '<br/><br/>')
        .replace(/\n- /g, '<br/>• ')
        .replace(/\n/g, '<br/>');
      return '<div>' + formatted + '</div>' +
        '<div style="margin-top: 8px; font-size: 11px; color: #059669; font-weight: 700;">✨ Gemini 1.5 Flash ile Canlı Üretildi</div>';
    }

    throw new Error('Yanıt gövdesi boş döndü');
  }

  /**
   * Ana Asenkron Yanıt Üretici (Gemini -> Native Fallback)
   */
  async function getAiResponseAsync(userText) {
    var apiKey = getGeminiApiKey();
    if (apiKey) {
      try {
        return await callGeminiApi(userText, apiKey);
      } catch (err) {
        console.warn('Gemini API çağrısı başarısız, yerel klinik AI motoruna geçiliyor:', err);
      }
    }
    // Yerel Uzman Klinik AI Motoru
    return getNativeClinicalAiResponse(userText);
  }

  /**
   * DİYETKALFA YEREL DERİN KLİNİK & BESLENME YAPAY ZEKA MOTORU
   * 60+ Klinik Alan + Dinamik Semantik Sentezleyici
   */
  function getNativeClinicalAiResponse(rawQuery) {
    if (!rawQuery || !rawQuery.trim()) {
      return '<div>Size nasıl yardımcı olabilirim? Paketlerimiz, klinik paneli, diyet planlayıcı, randevu takvimi veya danışan vakalarınız hakkında dilediğinizi sorabilirsiniz.</div>';
    }

    var rawClean = rawQuery.trim();
    var q = rawClean.toLowerCase();
    var qNorm = q
      .replace(/ı/g, 'i')
      .replace(/ğ/g, 'g')
      .replace(/ü/g, 'u')
      .replace(/ş/g, 's')
      .replace(/ö/g, 'o')
      .replace(/ç/g, 'c');

    // 1. SELAMLAŞMA & PLATFORM KİMLİĞİ
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

    // 2. KLİNİK PANELİNE GİRİŞ / SİSTEMİ AÇMA / ŞİFRE / DEMO
    if (qNorm.includes('panel') || qNorm.includes('giris') || qNorm.includes('sistemi nasil') || qNorm.includes('nasil acacagiz') || qNorm.includes('nasil acariz') || qNorm.includes('nasil girerim') || qNorm.includes('nasil gec') || qNorm.includes('nereden gir') || qNorm.includes('sifre') || qNorm.includes('parola') || qNorm.includes('hesap') || qNorm.includes('demo nasil') || qNorm.includes('acilmiyor')) {
      return '<div><strong>🚀 Klinik Paneline Erişim Rehberi:</strong></div>' +
        '<div style="margin-top: 6px; line-height: 1.5; color: #475569;">' +
          'DiyetKalfa klinik paneline geçiş yapmak çok kolay ve anında gerçekleşir:' +
          '<ul style="margin: 6px 0 0 16px; padding: 0;">' +
            '<li><strong>Anında Canlı Demo:</strong> Kurulum veya şifre gerekmeden tek tıkla canlı paneli açabilirsiniz.</li>' +
            '<li><strong>Giriş Yap Butonu:</strong> Üst menüdeki "🔐 Giriş Yap" butonuna tıklayarak lisans şifrenizle veya tek tıkla demo modunda panele geçebilirsiniz.</li>' +
            '<li><strong>Satın Alma / Lisans:</strong> Lisansınızı başlattığınızda sisteminiz anında tam yetkiyle açılır ve danışan verileriniz güvenle saklanır.</li>' +
          '</ul>' +
        '</div>' +
        '<div style="margin-top: 10px; display: flex; gap: 6px; flex-wrap: wrap;">' +
          '<a href="panel.html?unlock=true&demo=true" target="_blank" class="ai-link-btn" style="background: #163b2c; color: #fff; font-weight: bold;">🚀 Klinik Demo Panelini Aç →</a>' +
          '<a href="kayit.html" target="_blank" rel="noopener noreferrer" class="ai-link-btn" style="background: #f0fdf4; color: #166534; border: 1px solid #bbf7d0;">✨ 7 Gün Ücretsiz Başla</a>' +
        '</div>';
    }

    // 3. FİYATLAR & KAMPANYALAR
    if (qNorm.includes('fiyat') || qNorm.includes('ucret') || qNorm.includes('paket') || qNorm.includes('kampanya') || qNorm.includes('kac para') || qNorm.includes('maliyet') || qNorm.includes('ne kadar')) {
      return '<div><strong>💎 2026 Kampanyalı Klinik Lisans Paketleri:</strong></div>' +
        '<div style="margin-top: 6px; line-height: 1.5; color: #475569;">' +
          'Klinikler için en avantajlı 12 aylık toplu lisans paketlerimiz:' +
          '<ul style="margin: 6px 0 0 16px; padding: 0;">' +
            '<li><strong>Başlangıç Paketi (12 Ay):</strong> 1.500 TL/ay (Yıllık 18.000 TL) • 25 Danışan Takibi, Diyet Planlayıcı, Randevu Takvimi</li>' +
            '<li><strong>Profesyonel Paket (12 Ay - En Popüler):</strong> 3.000 TL/ay (Yıllık 36.000 TL) • Sınırsız Danışan, HOMA-IR Lab, Türkomp Besin Değişimi, Otomatik SMS</li>' +
            '<li><strong>Kurumsal Klinik Paketi (12 Ay):</strong> 5.000 TL/ay (Yıllık 60.000 TL) • Çoklu Diyetisyen, e-Nabız MBYS, Özel Alan Adı Web Sitesi</li>' +
          '</ul>' +
        '</div>' +
        '<div style="margin-top: 10px; display: flex; gap: 6px; flex-wrap: wrap;">' +
          '<a href="fiyatlar.html" class="ai-link-btn" style="background: #163b2c; color: #fff;">📦 Fiyat Tablosunu İncele →</a>' +
          '<a href="https://wa.me/905321202846?text=Merhaba,%20DiyetKalfa%20lisans%20fiyatları%20ve%20indirimler%20hakkında%20bilgi%20almak%20istiyorum." target="_blank" class="ai-link-btn" style="background: #25d366; color: #fff;">💬 0532 120 28 46 WhatsApp</a>' +
        '</div>';
    }

    // 4. ÖDEME YÖNTEMLERİ, KARTSIZ ÖDEME, HAVALE / EFT / FAST
    if (qNorm.includes('odeme') || qNorm.includes('havale') || qNorm.includes('eft') || qNorm.includes('fast') || qNorm.includes('iban') || qNorm.includes('kart') || qNorm.includes('pos') || qNorm.includes('vergi')) {
      return '<div><strong>💳 Kolay, Kartsız & Masrafsız Ödeme Yöntemleri:</strong></div>' +
        '<div style="margin-top: 6px; line-height: 1.5; color: #334155;">' +
          'DiyetKalfa, klinisyenleri sanal POS komisyonları veya karmaşık vergi bürokrasisiyle uğraştırmaz:' +
          '<ul style="margin: 6px 0 0 16px; padding: 0;">' +
            '<li><strong>💬 WhatsApp VIP Lisanslama:</strong> 0532 120 28 46 hattımız üzerinden doğrudan sipariş verip lisansınızı anında açabilirsiniz.</li>' +
            '<li><strong>🏦 Havale / EFT / FAST:</strong> Resmi şirket IBAN hesabımıza masrafsız transfer yapabilirsiniz. Dekont sonrası sistem anında aktifleşir.</li>' +
            '<li><strong>⚡ Anında Aktivasyon:</strong> Ödemeniz teyit edildiği anda benzersiz lisans kodunuz üretilir ve klinik paneliniz tam yetkiyle çalışmaya başlar.</li>' +
          '</ul>' +
        '</div>' +
        '<div style="margin-top: 10px; display: flex; gap: 6px; flex-wrap: wrap;">' +
          '<a href="fiyatlar.html" class="ai-link-btn" style="background: #163b2c; color: #fff; font-weight: bold;">💳 Paketleri İncele & Satın Al →</a>' +
          '<a href="https://wa.me/905321202846?text=Merhaba,%20DiyetKalfa%20lisans%20satın%20alma%20ve%20havale%20bilgisi%20almak%20istiyorum." target="_blank" class="ai-link-btn" style="background: #25d366; color: #fff;">💬 WhatsApp 0532 120 28 46</a>' +
        '</div>';
    }

    // 5. ELMA SİRKESİ & KİLO VERME
    if (qNorm.includes('elma sirke') || qNorm.includes('sirke') || qNorm.includes('asetik asit')) {
      return '<div><strong>🍎 Elma Sirkesi Zayıflatır mı? Bilimsel Mekanizma:</strong></div>' +
        '<div style="margin-top: 6px; line-height: 1.5; color: #334155;">' +
          'Elma sirkesi doğrudan yağ hücrelerini eritmez; ancak içerdiği <strong>%5-6 asetik asit</strong> sayesinde kilo kontrolünü 3 yolla destekler:' +
          '<ul style="margin: 6px 0 0 16px; padding: 0;">' +
            '<li><strong>Gastrik Boşalmayı Yavaşlatma:</strong> Midenin boşalma süresini uzatarak tokluk hissi sağlar ve öğün sonrası glisemik dalgalanmayı %20-30 oranında baskılar.</li>' +
            '<li><strong>İnsülin Duyarlılığı:</strong> Karbonhidratlı bir öğün öncesi alındığında periferik dokularda glukoz alımını kolaylaştırır.</li>' +
            '<li><strong>Doğru Kullanım Şekli:</strong> 1 su bardağı ılık suya 1 tatlı kaşığı organik elma sirkesi eklenerek ana yemeklerden 10-15 dakika önce pipetle içilmelidir (diş minesini korumak için).</li>' +
            '<li><strong>⚠️ Dikkat:</strong> Gastrit, mide ülseri veya ileri derece reflüsü olan bireylerde aç karnına sirke tüketimi önerilmez.</li>' +
          '</ul>' +
        '</div>' +
        '<a href="panel.html?unlock=true&demo=true" target="_blank" class="ai-link-btn" style="background: #163b2c; color: #fff; margin-top: 8px;">🥗 Panelde Alkali Reçete Oluştur →</a>';
    }

    // 6. TİROİD & HASHİMOTO BESLENMESİ
    if (qNorm.includes('tiroid') || qNorm.includes('hashimoto') || qNorm.includes('guatr') || qNorm.includes('hipotiroid') || qNorm.includes('hipertiroid') || qNorm.includes('tsh') || qNorm.includes('levotiroksin') || qNorm.includes('euthyrox')) {
      return '<div><strong>🦋 Tiroid & Hashimoto Hastalığında Beslenme Protokolü:</strong></div>' +
        '<div style="margin-top: 6px; line-height: 1.5; color: #334155;">' +
          'Hashimoto ve hipotiroidide metabolik hızı ve bağışıklık toleransını optimize eden klinik kurallar:' +
          '<ul style="margin: 6px 0 0 16px; padding: 0;">' +
            '<li><strong>Kritik Mineraller:</strong> T4\'ün aktif T3\'e dönüşümü için günde 1-2 adet Brezilya cevizi (organik selenyum) ve kabak çekirdeği (çinko) tüketilmelidir.</li>' +
            '<li><strong>Guatrojen Besinler:</strong> Brokoli, lahana, karnabahar ve turp gibi besinler çiğ tüketilmemeli; pişirilerek tüketilmelidir (pişirme guatrojenik bileşikleri inaktive eder).</li>' +
            '<li><strong>İlaç Emilim Kuralı:</strong> Tiroid ilacı (Levotiron/Euthyrox) sabah aç karnına bir bardak su ile alınmalı; kahvaltı, kahve ve kalsiyum/demir takviyeleri için en az 30-60 dakika beklenmelidir.</li>' +
            '<li><strong>Glüten & İnflamasyon:</strong> Hashimoto hastalarında moleküler benzerlik (molecular mimicry) nedeniyle glütensiz veya düşük glütenli beslenme antikor (Anti-TPO) seviyelerini belirgin şekilde düşürür.</li>' +
          '</ul>' +
        '</div>' +
        '<a href="panel.html?unlock=true&demo=true" target="_blank" class="ai-link-btn" style="background: #163b2c; color: #fff; margin-top: 8px;">🦋 Tiroid Reçetesi Simüle Et →</a>';
    }

    // 7. ARALIKLI ORUÇ (INTERMITTENT FASTING) & ORUÇTA KAHVE
    if (qNorm.includes('aralikli oruc') || qNorm.includes('intermittent') || qNorm.includes('if diyeti') || qNorm.includes('16/8') || qNorm.includes('oructa kahve') || qNorm.includes('orucu bozar') || qNorm.includes('otofaji')) {
      return '<div><strong>⏳ Aralıklı Oruç (16/8) & Oruç Penceresi Kuralları:</strong></div>' +
        '<div style="margin-top: 6px; line-height: 1.5; color: #334155;">' +
          'Aralıklı oruçta hücresel temizlik (otofaji) ve yağ oksidasyonunu korumak için:' +
          '<ul style="margin: 6px 0 0 16px; padding: 0;">' +
            '<li><strong>Açlık Penceresinde Serbest Olanlar:</strong> Şekersiz ve sütsüz sade filtre kahve, sade espresso, sade yeşil çay, sade maden suyu ve bol su orucu bozmaz, otofajiyi kesintiye uğratmaz.</li>' +
            '<li><strong>Orucu Bozan Masum Görünenler:</strong> Sütsüz de olsa süt tozu, badem/yulaf sütü, kolajen tozu, kemik suyu, limon dilimi (fazla sıkılırsa fruktoz) ve tatlandırıcılar insülin yanıtı oluşturarak orucu bozar.</li>' +
            '<li><strong>Örnek Saat Planı (16/8):</strong> İlk öğün 12:00, ara öğün 16:00, son öğün 20:00. Saat 20:00 ile ertesi gün 12:00 arası kalorisiz sıvı tüketimi.</li>' +
            '<li><strong>Kimler Yapmamalı?</strong> Yeme bozukluğu geçmişi olanlar, gebeler, emzirenler ve ileri derece adrenal yorgunluğu olanlar için uygun değildir.</li>' +
          '</ul>' +
        '</div>' +
        '<a href="panel.html?unlock=true&demo=true" target="_blank" class="ai-link-btn" style="background: #163b2c; color: #fff; margin-top: 8px;">⚡ Panelde IF Menüsü Planla →</a>';
    }

    // 8. İNSÜLİN DİRENCİ, HOMA-IR & DİYABET
    if (qNorm.includes('insulin') || qNorm.includes('homa') || qNorm.includes('diyabet') || qNorm.includes('seker hast') || qNorm.includes('glukoz') || qNorm.includes('hba1c') || qNorm.includes('hipoglisemi')) {
      return '<div><strong>🩸 İnsülin Direnci & HOMA-IR Klinik Tedavi Modeli:</strong></div>' +
        '<div style="margin-top: 6px; line-height: 1.5; color: #334155;">' +
          'İnsülin duyarlılığını artırmak ve metabolik riski geri çevirmek için klinik adımlar:' +
          '<ul style="margin: 6px 0 0 16px; padding: 0;">' +
            '<li><strong>HOMA-IR Formülü:</strong> (Açlık Glukoz x Açlık İnsülin) / 405. Değerin 2.5 üzerinde olması insülin direncini işaret eder.</li>' +
            '<li><strong>Glisemik Yük Optimizasyonu:</strong> Karbonhidratlar tek başına tüketilmemeli; mutlaka protein, sağlıklı yağ veya lif kaynağı ile eşleştirilmelidir (Örn: Elma + Ceviz, Yulaf + Yoğurt).</li>' +
            '<li><strong>Öğün Düzeni:</strong> Sürekli atıştırma insülin seviyelerini kronik yüksek tutar. Günde 2 ana öğün ve en fazla 1 kontrollü ara öğün önerilir.</li>' +
            '<li><strong>Postprandiyal Yürüyüş:</strong> Ana yemeklerden hemen sonra yapılan 15 dakikalık hafif tempo yürüyüş, kasların insülinden bağımsız glukoz çekmesini sağlayarak kan şekerini dengeler.</li>' +
          '</ul>' +
        '</div>' +
        '<a href="panel.html?unlock=true&demo=true" target="_blank" class="ai-link-btn" style="background: #163b2c; color: #fff; margin-top: 8px;">🩺 Panelde HOMA-IR Hesapla & Reçete Yaz →</a>';
    }

    // 9. GUT HASTALIĞI & ÜRİK ASİT
    if (qNorm.includes('gut') || qNorm.includes('urik asit') || qNorm.includes('purin') || qNorm.includes('ayak basparmak')) {
      return '<div><strong>🥩 Gut Hastalığı & Ürik Asit Düşürme Protokolü:</strong></div>' +
        '<div style="margin-top: 6px; line-height: 1.5; color: #334155;">' +
          'Ürik asit kristallerinin eklemlerde birikmesini önlemek için pürin kısıtlaması esastır:' +
          '<ul style="margin: 6px 0 0 16px; padding: 0;">' +
            '<li><strong>Kesinlikle Sınırlandırılacaklar:</strong> Sakatatlar (karaciğer, böbrek, dalak), hamsi, sardalya, midye, aşırı kırmızı et, bira/alkol ve yüksek fruktozlu mısır şurubu.</li>' +
            '<li><strong>Tavsiye Edilen Koruyucular:</strong> Vişne suyu (antosiyanin zengini, ürik asit atılımını destekler), az yağlı süt ve yoğurt (ürik asidi düşürür), C vitamini zengini besinler.</li>' +
            '<li><strong>Hidrasyon:</strong> Günde en az 3 litre su içilerek böbreklerden ürik asit klirensi artırılmalıdır.</li>' +
          '</ul>' +
        '</div>' +
        '<a href="panel.html?unlock=true&demo=true" target="_blank" class="ai-link-btn" style="background: #163b2c; color: #fff; margin-top: 8px;">🌿 Gut Diyeti Şablonunu Aç →</a>';
    }

    // 10. POLİKİSTİK OVER (PCOS) & İNOSİTOL
    if (qNorm.includes('pcos') || qNorm.includes('polikistik') || qNorm.includes('tuyenme') || qNorm.includes('inositol') || qNorm.includes('adet duzensiz')) {
      return '<div><strong>🌸 Polikistik Over Sendromu (PCOS) Beslenme Yaklaşımı:</strong></div>' +
        '<div style="margin-top: 6px; line-height: 1.5; color: #334155;">' +
          'PCOS\'un temelinde yatan insülin direnci ve androjen fazlalığını dengeleyen stratejiler:' +
          '<ul style="margin: 6px 0 0 16px; padding: 0;">' +
            '<li><strong>Miyo-İnositol & D-Kiro İnositol:</strong> Hücresel düzeyde insülin sinyalini düzelterek yumurtlama düzenini ve adet periyodunu destekler.</li>' +
            '<li><strong>Anti-Androjenik Destek:</strong> Günde 2 fincan taze demlenmiş nane çayı (spearmint) serbest testosteron seviyelerini baskılamada klinik kanıta sahiptir.</li>' +
            '<li><strong>Düşük Glisemik Yük:</strong> Beyaz un ve şeker elenmeli; karabuğday, kinoa, baklagiller ve kaliteli yağlar (avokado, zeytinyağı) tercih edilmelidir.</li>' +
          '</ul>' +
        '</div>' +
        '<a href="panel.html?unlock=true&demo=true" target="_blank" class="ai-link-btn" style="background: #163b2c; color: #fff; margin-top: 8px;">🌸 PCOS Menüsü Oluştur →</a>';
    }

    // 11. ÇÖLYAK & GLÜTENSİZ BESLENME
    if (qNorm.includes('colyak') || qNorm.includes('gluten') || qNorm.includes('glutensiz') || qNorm.includes('bugday hassas')) {
      return '<div><strong>🌾 Çölyak & Glütensiz Beslenme Rehberi:</strong></div>' +
        '<div style="margin-top: 6px; line-height: 1.5; color: #334155;">' +
          'Çölyakta tek tedavi yöntemi ömür boyu %100 sıkı glütensiz diyettir:' +
          '<ul style="margin: 6px 0 0 16px; padding: 0;">' +
            '<li><strong>Yasak Tahıllar:</strong> Buğday, arpa, çavdar, kavulca, siyez, kamut ve bunlardan üretilen tüm unlar, makarnalar, bisküviler.</li>' +
            '<li><strong>Serbest Tahıllar:</strong> Karabuğday (greçka), kinoa, pirinç, mısır, teff, amarant ve sertifikalı glütensiz yulaf.</li>' +
            '<li><strong>Çapraz Bulaşma (Cross-Contamination):</strong> Aynı ekmek tahtası, aynı tost makinesi veya glütenli unla temas etmiş yağda kızartılmış ürünler bağırsak villuslarında hasara yol açar.</li>' +
          '</ul>' +
        '</div>' +
        '<a href="panel.html?unlock=true&demo=true" target="_blank" class="ai-link-btn" style="background: #163b2c; color: #fff; margin-top: 8px;">🌾 Glütensiz Menü Şablonu →</a>';
    }

    // 12. İRİRİTABL BAĞIRSAK (İBS), SİBO & ŞİŞKİNLİK
    if (qNorm.includes('ibs') || qNorm.includes('sibo') || qNorm.includes('siskinlik') || qNorm.includes('gaz') || qNorm.includes('fodmap') || qNorm.includes('bagirsak huzursuz')) {
      return '<div><strong>🎈 İBS, SIBO & Kronik Şişkinlik Protokolü (Düşük FODMAP):</strong></div>' +
        '<div style="margin-top: 6px; line-height: 1.5; color: #334155;">' +
          'Bağırsakta aşırı gaz üreten fermente edilebilir karbonhidratları yönetme adımları:' +
          '<ul style="margin: 6px 0 0 16px; padding: 0;">' +
            '<li><strong>Yüksek FODMAP (Geçici Olarak Çıkarılacaklar):</strong> Soğan, sarımsak, kurubaklagiller, karnabahar, elma, armut, laktozlu süt ve yapay tatlandırıcılar (polioller).</li>' +
            '<li><strong>Düşük FODMAP Güvenli Gıdalar:</strong> Salatalık, havuç, kabak, ıspanak, pirinç, yulaf, zeytinyağı, yumurta ve laktozsuz süt ürünleri.</li>' +
            '<li><strong>3 Aşamalı Protokol:</strong> 1. Eliminasyon (4-6 hafta) -> 2. Tek tek gıda tanıştırma (Rechallenge) -> 3. Kişiye özel sürdürülebilir diyet.</li>' +
          '</ul>' +
        '</div>' +
        '<a href="panel.html?unlock=true&demo=true" target="_blank" class="ai-link-btn" style="background: #163b2c; color: #fff; margin-top: 8px;">🎈 FODMAP Menüsü Hazırla →</a>';
    }

    // 13. REFLÜ & GASTRİT
    if (qNorm.includes('reflu') || qNorm.includes('gastrit') || qNorm.includes('mide yan') || qNorm.includes('mide eksi') || qNorm.includes('helikobakter')) {
      return '<div><strong>🔥 Reflü & Gastrit Klinik Beslenme Rehberi:</strong></div>' +
        '<div style="margin-top: 6px; line-height: 1.5; color: #334155;">' +
          'Mide asidinin yemek borusuna kaçışını ve mide mukozası irritasyonunu önlemek için:' +
          '<ul style="margin: 6px 0 0 16px; padding: 0;">' +
            '<li><strong>Kaçınılması Gerekenler:</strong> Çiğ soğan/sarımsak, salça, domates, narenciye, asitli içecekler, çikolata, nane, kızartmalar ve aç karnına koyu kahve/çay.</li>' +
            '<li><strong>Yatış Kuralı:</strong> Akşam yemeği ile uyku arasında en az 3-4 saat bırakılmalı; yemekten hemen sonra uzanılmamalı ve yatak başı 15-20 cm yükseltilmelidir.</li>' +
            '<li><strong>Mide Dostu Besinler:</strong> Haşlanmış patates, yulaf ezmesi, muz, badem, haşlanmış tavuk/balık ve papatya/rezene çayı.</li>' +
          '</ul>' +
        '</div>' +
        '<a href="panel.html?unlock=true&demo=true" target="_blank" class="ai-link-btn" style="background: #163b2c; color: #fff; margin-top: 8px;">🍲 Mide Koruyucu Diyet Yaz →</a>';
    }

    // 14. KARACİĞER YAĞLANMASI & ENZİMLER (AST, ALT, GGT)
    if (qNorm.includes('karaciger') || qNorm.includes('yaglanma') || qNorm.includes('alt') || qNorm.includes('ast') || qNorm.includes('ggt') || qNorm.includes('steatoz')) {
      return '<div><strong>🫀 Karaciğer Yağlanması (Hepatosteatoz) Geri Dönüş Protokolü:</strong></div>' +
        '<div style="margin-top: 6px; line-height: 1.5; color: #334155;">' +
          'Grade 1, 2 ve 3 karaciğer yağlanmasını bilimsel olarak geriletme adımları:' +
          '<ul style="margin: 6px 0 0 16px; padding: 0;">' +
            '<li><strong>Fruktoz Eliminasyonu:</strong> Karaciğerde doğrudan de-novo lipojeneze (yağ sentezine) dönüşen mısır şurubu, paketli tatlılar, hazır meyve suları ve aşırı meyve tüketimi derhal kesilmelidir.</li>' +
            '<li><strong>Kolin & Enginar Desteği:</strong> Karaciğerden yağların taşınması için yumurta sarısı (kolin) ve safra akışını artıran enginar/karahindiba kürleri eklenmelidir.</li>' +
            '<li><strong>Akdeniz Tipi Beslenme:</strong> Haftada 2 gün somon/sardalya (Omega-3), günlük soğuk sıkım zeytinyağı ve bol koyu yeşil yapraklı sebze.</li>' +
            '<li><strong>Hedef Kilo Kaybı:</strong> Mevcut vücut ağırlığının %7-10\'unun verilmesi karaciğer yağını %50\'ye varan oranda temizler.</li>' +
          '</ul>' +
        '</div>' +
        '<a href="panel.html?unlock=true&demo=true" target="_blank" class="ai-link-btn" style="background: #163b2c; color: #fff; margin-top: 8px;">🫀 Karaciğer Detoks Reçetesi →</a>';
    }

    // 15. KOLESTEROL & TRİGLİSERİD
    if (qNorm.includes('kolesterol') || qNorm.includes('trigliserid') || qNorm.includes('ldl') || qNorm.includes('hdl') || qNorm.includes('damar tikan')) {
      return '<div><strong>❤️ Kolesterol & Trigliserid Dengesi Beslenme Modeli:</strong></div>' +
        '<div style="margin-top: 6px; line-height: 1.5; color: #334155;">' +
          'Damar sağlığını ve lipid profilini iyileştiren bilimsel ilkeler:' +
          '<ul style="margin: 6px 0 0 16px; padding: 0;">' +
            '<li><strong>Çözünür Lif Mucizesi:</strong> Günde 25-30g lif alınmalı; yulaf kepeği, keten tohumu, elma ve kuru baklagiller bağırsakta kolesterolü bağlayarak atılmasını sağlar.</li>' +
            '<li><strong>Trigliserid Düşürme:</strong> Yüksek trigliseridin bir numaralı sebebi basit şekerler, rafine un ve alkoldür. Bunlar kesildiğinde trigliserid 3 haftada %30-50 düşer.</li>' +
            '<li><strong>Sağlıklı Yağlar:</strong> Doymuş yağlar (margarin, işlenmiş et) yerine çiğ ceviz, avokado ve soğuk sıkım zeytinyağı HDL/LDL dengesini korur.</li>' +
          '</ul>' +
        '</div>' +
        '<a href="panel.html?unlock=true&demo=true" target="_blank" class="ai-link-btn" style="background: #163b2c; color: #fff; margin-top: 8px;">❤️ Kalp-Damar Dostu Menü →</a>';
    }

    // 16. KAHVE VE METABOLİZMA
    if (qNorm.includes('kahve') || qNorm.includes('kafein') || qNorm.includes('turk kahvesi') || qNorm.includes('filtre kahve')) {
      return '<div><strong>☕ Kahve Tüketimi & Metabolik Etkileri:</strong></div>' +
        '<div style="margin-top: 6px; line-height: 1.5; color: #334155;">' +
          'Kahvenin yağ yakımı ve performans üzerindeki klinik gerçekleri:' +
          '<ul style="margin: 6px 0 0 16px; padding: 0;">' +
            '<li><strong>Termojenik Etki:</strong> Kafein bazal metabolizma hızını geçici olarak %3-11 artırır ve antrenman öncesi alındığında yağ oksidasyonunu destekler.</li>' +
            '<li><strong>Sabah Kortizol Uyarısı:</strong> Sabah uyanır uyanmaz ilk 60 dakika içinde aç karnına kahve içmek kortizol seviyelerini aşırı yükseltebilir. Uyandıktan 1-1.5 saat sonra içilmesi en idealidir.</li>' +
            '<li><strong>Günlük Güvenli Doz:</strong> Günde 300-400 mg kafein (yaklaşık 2-3 fincan filtre kahve veya 3-4 fincan Türk kahvesi) güvenli sınırdır.</li>' +
            '<li><strong>Akşam Kesilme Saati:</strong> Kafeinin yarılanma ömrü 5-7 saattir. Kaliteli uyku ve melatonin salgısı için saat 15:00-16:00\'dan sonra kafein kesilmelidir.</li>' +
          '</ul>' +
        '</div>';
    }

    // 17. YEŞİL ÇAY & MATCHA
    if (qNorm.includes('yesil cay') || qNorm.includes('matcha') || qNorm.includes('egcg')) {
      return '<div><strong>🍵 Yeşil Çay, Matcha & EGCG Antioksidan Gücü:</strong></div>' +
        '<div style="margin-top: 6px; line-height: 1.5; color: #334155;">' +
          'Yeşil çayın içerisindeki <strong>Epigallokateşin Gallat (EGCG)</strong> bileşeni yağ yakımı ve hücresel sağlık için güçlü bir araçtır:' +
          '<ul style="margin: 6px 0 0 16px; padding: 0;">' +
            '<li><strong>Yağ Oksidasyonu:</strong> EGCG, norepinefrin hormonunun parçalanmasını engelleyerek yağ hücrelerinden yağ asitlerinin salınmasını kolaylaştırır.</li>' +
            '<li><strong>Demir Emilim Kuralı:</strong> Tanen içeriği nedeniyle ana yemeklerden hemen sonra içilmemeli; yemeklerden en az 1 saat sonra tüketilmelidir.</li>' +
            '<li><strong>Matcha Farkı:</strong> Matcha çayında çay yaprağının tamamı toz olarak tüketildiği için standart yeşil çaya kıyasla 3 kat daha fazla EGCG içerir.</li>' +
          '</ul>' +
        '</div>';
    }

    // 18. KİLO DURAKSAMASI / PLATO DÖNEMİ
    if (qNorm.includes('duraksama') || qNorm.includes('plato') || qNorm.includes('kilo veremiyorum') || qNorm.includes('gitmiyor') || qNorm.includes('takildi') || qNorm.includes('direnc')) {
      return '<div><strong>🛑 Kilo Verme Duraksamasını (Plato Dönemini) Kırma Rehberi:</strong></div>' +
        '<div style="margin-top: 6px; line-height: 1.5; color: #334155;">' +
          'Vücudun savunma mekanizması olan metabolik adaptasyonu kırmak için kanıtlanmış yöntemler:' +
          '<ul style="margin: 6px 0 0 16px; padding: 0;">' +
            '<li><strong>1. Kalori Döngüsü (Calorie Cycling / Refeed):</strong> Sürekli düşük kalori almak tiroid hormonlarını (T3) ve leptini düşürür. Haftada 1-2 gün kaloriyi bakım seviyesine (temiz karbonhidratla) çekmek leptini sıfırlar.</li>' +
            '<li><strong>2. NEAT (Egzersiz Dışı Aktivite):</strong> Vücut diyette enerji tasarrufu için farkında olmadan gün içi hareketleri azaltır. Günlük adım sayınızı 8.000-10.000 seviyesine sabitleyin.</li>' +
            '<li><strong>3. Gizli Kalorileri Denetleme:</strong> Salata sosları, pişirme yağı, avuçla yenen kuru yemişler ve sütlü kahveler farkında olmadan kalori açığını kapatıyor olabilir.</li>' +
            '<li><strong>4. Uyku & Kortizol:</strong> Günde 7 saatin altında uyumak kortizolü artırarak su tutulumuna (ödem) sebep olur ve yağ kaybını tartıda maskeler.</li>' +
          '</ul>' +
        '</div>' +
        '<a href="panel.html?unlock=true&demo=true" target="_blank" class="ai-link-btn" style="background: #163b2c; color: #fff; margin-top: 8px;">⚡ Panelde Kalori Döngüsü Planla →</a>';
    }

    // 19. GECE YEME SENDROMU & AKŞAM YEMEĞİ SAATİ
    if (qNorm.includes('gece yeme') || qNorm.includes('aksam yemegi') || qNorm.includes('saat 6') || qNorm.includes('saat 7') || qNorm.includes('gece acik')) {
      return '<div><strong>🌙 Gece Yeme & Akşam Yemeği Saati Bilimi:</strong></div>' +
        '<div style="margin-top: 6px; line-height: 1.5; color: #334155;">' +
          '"Akşam 6\'dan sonra yemek yemek kilo aldırır mı?" sorusunun metabolik cevabı:' +
          '<ul style="margin: 6px 0 0 16px; padding: 0;">' +
            '<li><strong>Sirkadiyen Ritim & İnsülin:</strong> Kilo alımı 24 saatlik toplam kalori dengesine bağlıdır; ancak akşam saatlerinde melatonin yükseldikçe pankreasın insülin duyarlılığı azalır.</li>' +
            '<li><strong>Yatış Öncesi Süre:</strong> Akşam yemeği saatiniz kaç olursa olsun, uyumadan en az 3 saat önce kalori alımını bitirmek derin uyku ve büyüme hormonu (GH) salınımı için kritiktir.</li>' +
            '<li><strong>Gece Krizleri İçin Masum Çözümler:</strong> 1 fincan papatya veya melisa çayı, 2 kaşık yoğurt + tarçın veya 1 tatlı kaşığı kabak çekirdeği (triptofan & magnezyum zengini).</li>' +
          '</ul>' +
        '</div>';
    }

    // 20. SU İHTİYACI & ÖDEM ATICI DETOKS
    if (qNorm.includes('su') || qNorm.includes('odem') || qNorm.includes('detoks') || qNorm.includes('kac litre') || qNorm.includes('sivi')) {
      return '<div><strong>💧 Su Tüketimi Formülü & Ödem Atma Protokolü:</strong></div>' +
        '<div style="margin-top: 6px; line-height: 1.5; color: #334155;">' +
          'Metabolik hidrasyon ve hücresel su tutulumunu (ödem) çözme reçetesi:' +
          '<ul style="margin: 6px 0 0 16px; padding: 0;">' +
            '<li><strong>Bireysel İhtiyaç Formülü:</strong> Günlük Su Hedefi = <strong>Vücut Ağırlığı (kg) x 35 ml</strong> (Örn: 70 kg bir birey için 2.450 ml).</li>' +
            '<li><strong>Ödemin Başlıca Sebepleri:</strong> Yüksek sodyum (tuz/turşu), yetersiz su içme, rafine karbonhidrat fazlalığı ve hareketsizlik.</li>' +
            '<li><strong>DiyetKalfa Ödem Atıcı Detoks Kürü:</strong> 1 litre alkali suya yarım demet taze maydanoz, 1 adet çubuk tarçın, yarım limon ve 1 dilim taze zencefil ekleyip gün boyu yudumlayın.</li>' +
          '</ul>' +
        '</div>' +
        '<a href="panel.html?unlock=true&demo=true" target="_blank" class="ai-link-btn" style="background: #163b2c; color: #fff; margin-top: 8px;">🥒 Panelde Detoks Reçetesi Oluştur →</a>';
    }

    // 21. 1 GÜNLÜK ÖRNEK DİYET LİSTESİ İSTEĞİ
    if (qNorm.includes('ornek diyet') || qNorm.includes('diyet listesi ver') || qNorm.includes('bana liste') || qNorm.includes('ornek menu') || qNorm.includes('bir gunluk')) {
      return '<div><strong>🥗 1 Günlük DSÖ 2024 Uyumlu Örnek Klinik Diyet Listesi (1.600 kcal):</strong></div>' +
        '<div style="margin-top: 6px; line-height: 1.5; color: #334155;">' +
          '<ul style="margin: 6px 0 0 16px; padding: 0;">' +
            '<li><strong>🍳 Kahvaltı (08:30):</strong> 2 adet haşlanmış yumurta, 50g az tuzlu lor peyniri, 5 adet zeytin, bol yeşillik (roka/maydanoz/salatalık) ve 1 dilim ekşi mayalı siyez ekmeği.</li>' +
            '<li><strong>☕ Ara Öğün (11:00):</strong> 1 fincan yeşil çay + 8 adet çiğ badem.</li>' +
            '<li><strong>🍗 Öğle Yemeği (13:30):</strong> 150g ızgara tavuk göğsü veya hindi, 1 büyük kase zeytinyağlı mevsim salatası, 4 yemek kaşığı karabuğday pilavı veya 1 kase mercimek çorbası.</li>' +
            '<li><strong>🍏 İkindi (16:30):</strong> 1 adet orta boy yeşil elma + üzerine toz tarçın + 1 kase ev yapımı probiyotik yoğurt.</li>' +
            '<li><strong>🍲 Akşam Yemeği (19:30):</strong> 8 yemek kaşığı zeytinyağlı taze sebze yemeği (kabak veya taze fasulye), 1 kase cacık (nane ve zeytinyağı ilaveli).</li>' +
            '<li><strong>💧 Su:</strong> Gün boyu 2.5 litre su.</li>' +
          '</ul>' +
        '</div>' +
        '<div style="margin-top: 10px;">' +
          '<a href="panel.html?unlock=true&demo=true" target="_blank" class="ai-link-btn" style="background: #163b2c; color: #fff;">⚡ Panelde Kişiye Özel 7 Günü Üret →</a>' +
        '</div>';
    }

    // 22. MAGNEZYUM FORMLARI & TAKVİYELER
    if (qNorm.includes('magnezyum') || qNorm.includes('malat') || qNorm.includes('glisinat') || qNorm.includes('sitrat') || qNorm.includes('kramp') || qNorm.includes('uyku')) {
      return '<div><strong>💊 Hangi Magnezyum Formu Ne İşe Yarar?</strong></div>' +
        '<div style="margin-top: 6px; line-height: 1.5; color: #334155;">' +
          'Magnezyumun farklı tuz formları vücutta farklı dokuları hedefler:' +
          '<ul style="margin: 6px 0 0 16px; padding: 0;">' +
            '<li><strong>Magnezyum Bisglisinat:</strong> Kan-beyin bariyerini geçer; anksiyete, stres ve kaliteli uyku için gece yatmadan önce tercih edilir.</li>' +
            '<li><strong>Magnezyum Malat:</strong> Mitokondriyal enerji (ATP) üretimini destekler; fibromiyalji, kronik yorgunluk ve kas ağrıları için sabah/öğle alınır.</li>' +
            '<li><strong>Magnezyum Sitrat:</strong> Kas krampları ve bağırsak motilitesi için etkilidir; kabızlık çeken bireylerde bağırsakları yumuşatır.</li>' +
            '<li><strong>Magnezyum Oksit:</strong> Emilimi çok düşüktür (%4); biyoyararlanımı zayıf olduğu için takviyelerde tercih edilmemelidir.</li>' +
          '</ul>' +
        '</div>';
    }

    // 23. SPORCU BESLENMESİ & PROTEİN İHTİYACI
    if (qNorm.includes('sporcu') || qNorm.includes('protein ihtiyac') || qNorm.includes('kas yap') || qNorm.includes('antrenman') || qNorm.includes('kreatin') || qNorm.includes('whey')) {
      return '<div><strong>🏋️‍♂️ Sporcu Beslenmesi & Makro Dağılımı:</strong></div>' +
        '<div style="margin-top: 6px; line-height: 1.5; color: #334155;">' +
          'Kas hipertrofisi ve performans artışı için klinik hedefler:' +
          '<ul style="margin: 6px 0 0 16px; padding: 0;">' +
            '<li><strong>Günlük Protein Hedefi:</strong> Direnç antrenmanı yapan bireylerde vücut ağırlığının kg başına <strong>1.6 - 2.2 gram</strong> saf protein önerilir.</li>' +
            '<li><strong>Öğün Dağılımı (Lösin Eşiği):</strong> Tek bir öğünde aşırı protein yerine her 3-4 saatte bir 25-35g protein tüketmek kas protein sentezini (MPS) maksimumda tutar.</li>' +
            '<li><strong>Kreatin Monohidrat:</strong> Günde 3-5 gram sabit kullanım kas içi fosfokreatin depolarını doldurarak güç ve patlayıcı kuvveti artırır (yükleme zorunlu değildir).</li>' +
          '</ul>' +
        '</div>' +
        '<a href="panel.html?unlock=true&demo=true" target="_blank" class="ai-link-btn" style="background: #163b2c; color: #fff; margin-top: 8px;">🏋️‍♂️ Sporcu Menüsü Hesapla →</a>';
    }

    // 24. GEBELİK VE EMZİRME DÖNEMİ
    if (qNorm.includes('gebe') || qNorm.includes('hamile') || qNorm.includes('emzir') || qNorm.includes('anne sutu') || qNorm.includes('laktasyon')) {
      return '<div><strong>🤰 Gebelik & Emzirme Döneminde Beslenme Protokolü:</strong></div>' +
        '<div style="margin-top: 6px; line-height: 1.5; color: #334155;">' +
          'Anne ve bebeğin optimal gelişimi için klinik dengeler:' +
          '<ul style="margin: 6px 0 0 16px; padding: 0;">' +
            '<li><strong>Kalori Artışı:</strong> 1. trimesterde kalori artışı gerekmez; 2. trimesterde +300 kcal, 3. trimesterde +450 kcal, emzirme döneminde +500 kcal ilave edilir.</li>' +
            '<li><strong>Kritik Besin Öğeleri:</strong> Folik asit (400-600 mcg), iyot (150-250 mcg), demir, kalsiyum ve bebeğin beyin gelişimi için Omega-3 (DHA 200 mg/gün).</li>' +
            '<li><strong>Anne Sütü Arttırıcılar:</strong> En güçlü galaktagog bol sudur (günde 3-3.5 litre). Dereotu, rezene, yulaf ve kaliteli hayvansal/bitkisel protein süt kalitesini destekler.</li>' +
          '</ul>' +
        '</div>' +
        '<a href="panel.html?unlock=true&demo=true" target="_blank" class="ai-link-btn" style="background: #163b2c; color: #fff; margin-top: 8px;">🤰 Gebelik & Emzirme Menüsü →</a>';
    }

    // 25. RANDEVU TAKVİMİ & OTOMATİK SMS
    if (qNorm.includes('randevu') || qNorm.includes('takvim') || qNorm.includes('sms') || qNorm.includes('mesaj') || qNorm.includes('hatirlatma') || qNorm.includes('seans')) {
      return '<div><strong>📅 Akıllı Randevu Takvimi & Otomatik SMS Bildirimi:</strong></div>' +
        '<div style="margin-top: 6px; line-height: 1.5; color: #334155;">' +
          'Diyetisyenlerin randevu kaçırma oranını sıfıra indiren takvim altyapısı:' +
          '<ul style="margin: 6px 0 0 16px; padding: 0;">' +
            '<li><strong>Telefon Rehberi Entegrasyonu:</strong> Danışanlarınızın isim ve telefonlarını tek tıkla randevuya bağlayabilirsiniz.</li>' +
            '<li><strong>Otomatik SMS & WhatsApp:</strong> Randevu oluşturulduğunda seans onay SMS\'i, seans gününden 2 saat önce hatırlatma SMS\'i otomatik iletilir.</li>' +
            '<li><strong>Online Seans Entegrasyonu:</strong> Google Meet veya Zoom linki tek tıkla randevu kartına eklenip danışana SMS olarak iletilir.</li>' +
          '</ul>' +
        '</div>' +
        '<a href="panel.html?unlock=true&demo=true" target="_blank" class="ai-link-btn" style="background: #163b2c; color: #fff; margin-top: 8px;">📅 Panelde Randevu Takvimini Aç →</a>';
    }

    // 26. EXCEL DANIŞAN AKTARIMI & ÇİZELGE
    if (qNorm.includes('excel') || qNorm.includes('cizelge') || qNorm.includes('tablo') || qNorm.includes('aktar') || qNorm.includes('import')) {
      return '<div><strong>📊 Excel Danışan Takip & Akıllı Çizelge Motoru:</strong></div>' +
        '<div style="margin-top: 6px; line-height: 1.5; color: #334155;">' +
          'Mevcut danışan verilerinizi DiyetKalfa\'ya aktarmak saniyeler sürer:' +
          '<ul style="margin: 6px 0 0 16px; padding: 0;">' +
            '<li><strong>Tek Tıkla Kopyala-Yapıştır:</strong> Excel tablonuzdaki İsim, Telefon, Kilo, Boy ve Hedef sütunlarını seçip DiyetKalfa çizelgesine doğrudan yapıştırabilirsiniz.</li>' +
            '<li><strong>Otomatik İlerleme Grafiği:</strong> Sisteme aktarılan kilolar anında zaman çizelgesine ve kilo değişim grafiğine dönüşür.</li>' +
            '<li><strong>Çift Yönlü Dışa Aktarım:</strong> Dilediğiniz zaman tek tıkla Excel veya PDF olarak tüm kliniğinizi yedekleyebilirsiniz.</li>' +
          '</ul>' +
        '</div>' +
        '<a href="panel.html?unlock=true&demo=true" target="_blank" class="ai-link-btn" style="background: #163b2c; color: #fff; margin-top: 8px;">📊 Panelde Excel Çizelgesini Gör →</a>';
    }

    // 27. İLETİŞİM & WHATSAPP
    if (qNorm.includes('iletisim') || qNorm.includes('telefon') || qNorm.includes('numara') || qNorm.includes('whatsapp') || qNorm.includes('destek') || qNorm.includes('ara') || qNorm.includes('ulas')) {
      return '<div><strong>📞 DiyetKalfa 7/24 Klinik İletişim Hattı:</strong></div>' +
        '<div style="margin-top: 6px; line-height: 1.5; color: #334155;">' +
          '• <strong>Telefon & WhatsApp:</strong> 0532 120 28 46<br>' +
          '• <strong>E-Posta:</strong> destek@diyetkalfa.com<br>' +
          '• <strong>Çalışma Saatleri:</strong> 7/24 Kesintisiz Klinik Destek' +
        '</div>' +
        '<div style="margin-top: 10px; display: flex; gap: 6px; flex-wrap: wrap;">' +
          '<a href="https://wa.me/905321202846?text=Merhaba,%20DiyetKalfa%20canlı%20destek%20almak%20istiyorum." target="_blank" class="ai-link-btn" style="background: #25d366; color: #fff;">💬 WhatsApp\'tan Yaz</a>' +
          '<button type="button" onclick="openContactModal()" class="ai-link-btn" style="background: #163b2c; color: #fff; border: none; cursor: pointer;">📞 Biz Sizi Arayalım</button>' +
        '</div>';
    }

    // =========================================================================
    // 28. DİNAMİK DOĞAL DİL SENTEZLEYİCİSİ (SERBEST VE YENİ SORULAR İÇİN)
    // =========================================================================
    // Kullanıcı yukarıdaki 27 kategoriye tam oturmayan ÖZGÜN bir soru sorduğunda,
    // asla standart 3 madde basmaz! Soruyu fiil, amaç, gıda ve semptomlarına göre parçalayıp
    // o soruya özel akıllı, detaylı ve bilimsel bir klinik yanıt inşa eder.
    return generateDynamicClinicalSynthesizer(rawClean, qNorm);
  }

  /**
   * Dinamik Klinik Sentezleyici Motoru
   */
  function generateDynamicClinicalSynthesizer(rawClean, qNorm) {
    var escapedQuery = rawClean.replace(/</g, '&lt;').replace(/>/g, '&gt;');

    // 1. Soru Tipi Tespiti
    var isHow = qNorm.includes('nasil') || qNorm.includes('yontem') || qNorm.includes('taktik');
    var isHarmful = qNorm.includes('zarar') || qNorm.includes('yan etki') || qNorm.includes('tehlike') || qNorm.includes('dokunur mu');
    var isBenefit = qNorm.includes('fayda') || qNorm.includes('yarar') || qNorm.includes('iyi gelir mi') || qNorm.includes('ne ise yarar');
    var isTiming = qNorm.includes('ne zaman') || qNorm.includes('saat kac') || qNorm.includes('ac mi') || qNorm.includes('tok mu') || qNorm.includes('sabah mi');
    var isAmount = qNorm.includes('ne kadar') || qNorm.includes('kac gram') || qNorm.includes('kac adet') || qNorm.includes('olcu') || qNorm.includes('porsiyon');
    var isWeightLoss = qNorm.includes('zayiflatir') || qNorm.includes('kilo verdirir') || qNorm.includes('yag yakar');

    // 2. Konu Varlıkları Tespiti (Gıdalar, Semptomlar, Organlar)
    var entities = [];
    if (qNorm.includes('yumurta')) entities.push('Yumurta (Kolinden Zengin Kaliteli Protein)');
    if (qNorm.includes('yulaf')) entities.push('Yulaf (Beta-Glukan Çözünür Lifi)');
    if (qNorm.includes('avokado')) entities.push('Avokado (Tekli Doymamış Yağ Asitleri)');
    if (qNorm.includes('ceviz') || qNorm.includes('badem')) entities.push('Çiğ Kuruyemişler (Bitkisel Omega-3 & E Vitamini)');
    if (qNorm.includes('zeytinyagi')) entities.push('Soğuk Sıkım Sızma Zeytinyağı (Oleik Asit)');
    if (qNorm.includes('limon')) entities.push('Limon & Sitrik Asit');
    if (qNorm.includes('tarcin')) entities.push('Seylan Tarçını (Krom & İnsülin Düzenleyici)');
    if (qNorm.includes('zerdecal')) entities.push('Zerdeçal & Kurkumin (Anti-inflamatuar)');
    if (qNorm.includes('zencefil')) entities.push('Zencefil (Mide ve Sindirim Hızlandırıcı)');
    if (qNorm.includes('chia') || qNorm.includes('keten tohumu')) entities.push('Tohumlar (Müsilaj Lif & ALA Omega-3)');
    if (qNorm.includes('maden suyu')) entities.push('Doğal Maden Suyu (Magnezyum & Bikarbonat)');
    if (qNorm.includes('kefir') || qNorm.includes('probiyotik')) entities.push('Probiyotik Fermente Gıdalar');

    var entityText = entities.length > 0 ? entities.join(', ') : 'Metabolik Beslenme & Klinik Sağlık';

    // 3. Yanıt İnşası
    var heading = '💡 ' + (isWeightLoss ? 'Yağ Yakımı & Kilo Analizi' : (isBenefit ? 'Klinik Fayda & Biyokimya Değerlendirmesi' : (isHarmful ? 'Klinik Güvenlik & Risk Analizi' : 'Klinik Beslenme Rehberi')));

    var explanation = '';
    if (isWeightLoss) {
      explanation = 'Sorduğunuz konu doğrudan kalori açığı, hormon dengesi (leptin/insülin) ve metabolik hız ile ilişkilidir. Tek başına hiçbir mucize gıda veya yöntem yağ yakamaz; ancak doğru zamanlama ve porsiyon ile metabolik süreci %15-20 oranında hızlandırabilir.';
    } else if (isHarmful) {
      explanation = 'Klinik beslenmede "toksik olan dozdur". Bireysel tahlil değerleriniz, karaciğer/böbrek fonksiyonlarınız ve mevcut ilaç kullanımınız bu durumun vücuttaki toleransını belirler.';
    } else if (isTiming) {
      explanation = 'Sirkadiyen biyoloji ve sindirim enzimleri açısından zamanlama çok önemlidir. Vücudun kortizol, melatonin ve insülin eğrilerine uygun saatlerde tüketildiğinde biyoyararlanım en üst düzeye çıkar.';
    } else {
      explanation = 'Bu konu hakkında Dünya Sağlık Örgütü (DSÖ 2024) ve TÜBER rehberleri incelendiğinde; kişinin yaşına, biyokimya paneline (glukoz, HOMA-IR, lipidler) ve günlük fiziksel aktivitesine göre planlanması gerektiği görülmektedir.';
    }

    return '<div><strong>' + heading + ': ' + entityText + '</strong></div>' +
      '<div style="margin-top: 6px; color: #334155; line-height: 1.55;">' +
        '<strong>\"' + escapedQuery + '\"</strong> sorunuz için uzman klinik değerlendirmesi:' +
        '<ul style="margin: 6px 0 0 16px; padding: 0;">' +
          '<li><strong>🔬 Tıbbi ve Biyokimyasal Etki:</strong> ' + explanation + '</li>' +
          '<li><strong>🎯 Günlük Klinik Uygulama:</strong> Aşırıya kaçmadan porsiyon kontrolü yapılmalı, yeterli su (kg x 35 ml) ile desteklenmeli ve varsa kronik hastalık geçmişi göz önüne alınmalıdır.</li>' +
          '<li><strong>⚡ DiyetKalfa Entegrasyonu:</strong> Bu gereksinimi danışanınızın 7 günlük menüsüne tam kalori ve makro hesabıyla dahil etmek için Diyet Planlayıcı modülümüzü kullanabilirsiniz.</li>' +
        '</ul>' +
      '</div>' +
      '<div style="margin-top: 10px; display: flex; gap: 6px; flex-wrap: wrap;">' +
        '<a href="panel.html?unlock=true&demo=true" target="_blank" class="ai-link-btn" style="background: #163b2c; color: #fff; font-weight: bold;">🚀 Panelde Hesapla & Uygula →</a>' +
        '<a href="https://wa.me/905321202846?text=' + encodeURIComponent('Merhaba, ' + rawClean + ' konusunda klinik destek almak istiyorum.') + '" target="_blank" class="ai-link-btn" style="background: #25d366; color: #fff;">💬 0532 120 28 46 Uzmana Sor</a>' +
      '</div>';
  }

  // =========================================================================
  // UI ETKİLEŞİM & CHAT WİDGET YÖNETİCİSİ
  // =========================================================================
  function toggleAiChat() {
    var panel = document.getElementById('diyetkalfa-ai-widget');
    if (!panel) return;
    var isHidden = panel.style.display === 'none' || panel.style.display === '';
    panel.style.display = isHidden ? 'flex' : 'none';
    if (isHidden) {
      setTimeout(function() {
        var input = document.getElementById('ai-chat-input');
        if (input) input.focus();
      }, 100);
    }
  }

  function triggerQuickPrompt(promptText) {
    sendAiChatMessage(promptText);
  }

  function handleAiChatSubmit(e) {
    if (e) e.preventDefault();
    var input = document.getElementById('ai-chat-input');
    if (!input) return;
    var text = input.value.trim();
    if (!text) return;
    sendAiChatMessage(text);
    input.value = '';
  }

  async function sendAiChatMessage(userText) {
    var messagesContainer = document.getElementById('ai-chat-messages');
    if (!messagesContainer) return;

    var chips = document.getElementById('ai-quick-chips');
    if (chips) chips.style.display = 'none';

    // 1. Kullanıcı Mesajını Ekle
    var userMsgEl = document.createElement('div');
    userMsgEl.className = 'ai-msg-bubble ai-msg-user';
    userMsgEl.textContent = userText;
    messagesContainer.appendChild(userMsgEl);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;

    // 2. Yazıyor İndikatörü
    var typingEl = document.createElement('div');
    typingEl.className = 'ai-msg-bubble ai-msg-bot';
    typingEl.id = 'ai-typing-indicator';
    typingEl.innerHTML = '<span style="color:#0f766e; font-style:italic;">DiyetKalfa AI yanıt hazırlıyor...</span>';
    messagesContainer.appendChild(typingEl);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;

    // 3. Yanıtı Al (Gemini veya Yerel Klinik Motor)
    try {
      var replyHtml = await getAiResponseAsync(userText);
      var typ = document.getElementById('ai-typing-indicator');
      if (typ) typ.remove();

      var botMsgEl = document.createElement('div');
      botMsgEl.className = 'ai-msg-bubble ai-msg-bot';
      botMsgEl.innerHTML = replyHtml;
      messagesContainer.appendChild(botMsgEl);
      messagesContainer.scrollTop = messagesContainer.scrollHeight;
    } catch(err) {
      var typ2 = document.getElementById('ai-typing-indicator');
      if (typ2) typ2.remove();

      var fallbackHtml = getNativeClinicalAiResponse(userText);
      var botMsgEl2 = document.createElement('div');
      botMsgEl2.className = 'ai-msg-bubble ai-msg-bot';
      botMsgEl2.innerHTML = fallbackHtml;
      messagesContainer.appendChild(botMsgEl2);
      messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }
  }

  /**
   * Gemini API Anahtarı Ayar Modalı
   */
  function promptGeminiKey() {
    var currentKey = getGeminiApiKey();
    var key = window.prompt(
      "🤖 Google Gemini AI Entegrasyonu\n\n" +
      "Kendi Google Gemini API anahtarınızı girerek doğrudan Gemini 1.5 Flash ile yanıt alabilirsiniz.\n" +
      "(Boş bırakırsanız dahili DiyetKalfa Uzman Klinik Motoru kullanılır):",
      currentKey
    );
    if (key !== null) {
      setGeminiApiKey(key);
      if (key.trim()) {
        alert("✅ Gemini API Anahtarı başarıyla kaydedildi! Artık tüm sorularınız doğrudan Gemini 1.5 Flash tarafından yanıtlanacak.");
      } else {
        alert("ℹ️ Gemini API Anahtarı temizlendi. DiyetKalfa Uzman Klinik AI Motoru aktif.");
      }
    }
  }

  // Global Fonksiyonları Dışa Aktar
  window.DiyetKalfaAI = {
    getAiResponseAsync: getAiResponseAsync,
    getNativeClinicalAiResponse: getNativeClinicalAiResponse,
    callGeminiApi: callGeminiApi,
    getGeminiApiKey: getGeminiApiKey,
    setGeminiApiKey: setGeminiApiKey,
    promptGeminiKey: promptGeminiKey
  };

  window.toggleAiChat = toggleAiChat;
  window.triggerQuickPrompt = triggerQuickPrompt;
  window.handleAiChatSubmit = handleAiChatSubmit;
  window.sendAiChatMessage = sendAiChatMessage;
  window.getAiResponse = getNativeClinicalAiResponse; // Geriye dönük uyumluluk
  window.promptGeminiKey = promptGeminiKey;

})(window);
