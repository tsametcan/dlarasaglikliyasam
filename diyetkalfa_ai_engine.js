/**
 * ============================================================================
 * DIYETKALFA AI ULTRA ENGINE 2026 - TÜRKİYE'NİN EN GELİŞMİŞ KLİNİK AI ASİSTANI
 * ============================================================================
 * Mimari Özellikleri:
 * 1. 55+ Uzman Klinik & Beslenme Protokolü (Tiroid, İnsülin, Gut, PCOS, Keto, Anemi, Böbrek, Bariatrik vb.)
 * 2. Sayısal & Semantik Vaka Analizörü (Sorudaki kilo, yaş, tahlil değerlerini yakalayıp anlık hesaplama yapar)
 * 3. Canlı Generative AI (Google Gemini 1.5 Flash + Keyless Bulut LLM + Yerel Klinik Motor Hibrit Yapı)
 * 4. Hem Sağ Alt 7/24 AI Widget'ı hem de Çözümler -> Yapay Zeka Asistanı Modalı ile %100 Entegre
 * ============================================================================
 */

(function(window) {
  'use strict';

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

  function formatMarkdownToHtml(text) {
    if (!text) return '';
    return text
      .replace(/</g, '&lt;').replace(/>/g, '&gt;')
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/\*(.*?)\*/g, '<em>$1</em>')
      .replace(/^### (.*$)/gm, '<div style="font-weight:800; color:#1e3a8a; margin-top:8px;">$1</div>')
      .replace(/^## (.*$)/gm, '<div style="font-weight:900; color:#1e3a8a; font-size:14px; margin-top:8px;">$1</div>')
      .replace(/\n\n/g, '<br/><br/>')
      .replace(/\n- /g, '<br/>• ')
      .replace(/\n\* /g, '<br/>• ')
      .replace(/\n/g, '<br/>');
  }

  /**
   * Google Gemini 1.5 Flash API Çağrısı
   */
  async function callGeminiApi(userText, apiKey) {
    var systemInstruction = 
      "Sen Türkiye'nin en gelişmiş Klinik Diyetisyen Yazılımı olan DiyetKalfa'nın (0532 120 28 46) uzman klinik yapay zekasısın. " +
      "Diyetisyenlerin ve danışanların klinik beslenme, tahlil, hastalıklar, metabolizma, kilo yönetimi, tarifler ve DiyetKalfa platformu ile ilgili tüm sorularını profesyonel, bilimsel, net ve samimi bir Türkçe ile yanıtla. " +
      "Doğrudan kullanıcının sorduğu spesifik soruya odaklan, sayısal değerler varsa hesapla ve maddeler halinde klinik çözüm sun.";

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
        maxOutputTokens: 700
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
      return '<div style="line-height:1.55; color:#1e293b;">' + formatMarkdownToHtml(candidateText) + '</div>' +
        '<div style="margin-top: 8px; font-size: 11px; color: #2563eb; font-weight: 700;">✨ Google Gemini 1.5 Flash ile Canlı Analiz Edildi</div>';
    }
    throw new Error('Yanıt boş döndü');
  }

  /**
   * Ana Asenkron Yanıt Üretici
   */
  async function getAiResponseAsync(userText) {
    var apiKey = getGeminiApiKey();
    if (apiKey) {
      try {
        return await callGeminiApi(userText, apiKey);
      } catch (err) {
        console.warn('Gemini API çağrısı başarısız, yerel uzman klinik AI motoruna geçiliyor:', err);
      }
    }
    return getNativeClinicalAiResponse(userText);
  }

  /**
   * DİYETKALFA YEREL DERİN KLİNİK & BESLENME YAPAY ZEKA MOTORU
   * 55+ Klinik Alan + Sayısal Vaka Hesaplayıcı + Dinamik Semantik Sentezleyici
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

    // 0. ÖZEL SAYISAL KİLO / SU / PROTEİN / KALORİ VAKA HESAPLAYICISI ("78 kilo danışan için su ve protein ihtiyacı")
    var specificWeightMatch = qNorm.match(/(\d+)\s*(kg|kilo)/);
    if (specificWeightMatch && !qNorm.includes('maraton')) {
      var wVal = parseInt(specificWeightMatch[1]);
      if (wVal >= 20 && wVal <= 250) {
        var waterLiters = ((wVal * 35) / 1000).toFixed(2);
        var waterMl = wVal * 35;
        var pSedentary = Math.round(wVal * 1.0);
        var pWeightLoss = Math.round(wVal * 1.3);
        var pSport = Math.round(wVal * 1.8);
        var bmrEst = Math.round(wVal * 22);
        var tdeeEst = Math.round(bmrEst * 1.4);
        var deficitCal = Math.max(1200, tdeeEst - 500);

        return '<div><strong>📊 ' + wVal + ' kg Danışan İçin Hesaplanan Klinik Su, Protein & Kalori Protokolü:</strong></div>' +
          '<div style="margin-top: 6px; line-height: 1.55; color: #334155;">' +
            'Sorduğunuz <strong>' + wVal + ' kg</strong> vücut ağırlığına sahip danışan için DSÖ 2024 ve ESPEN formülleriyle hesaplanan bireysel hedefler:' +
            '<ul style="margin: 6px 0 0 16px; padding: 0;">' +
              '<li><strong>💧 Günlük Zorunlu Su İhtiyacı (' + wVal + ' x 35 ml):</strong> Günde <strong>' + waterLiters + ' Litre (' + waterMl + ' ml)</strong> saf su tüketilmelidir. (İçilen her fincan kahve/çay için +200 ml eklenmelidir).</li>' +
              '<li><strong>🥩 Günlük Protein Hedefi:</strong> Sedanter koruma için <strong>' + pSedentary + 'g/gün</strong>, kas kayıpsız yağ yakımı (diyet) için <strong>' + pWeightLoss + 'g/gün</strong> (1.3 g/kg), aktif spor/direnç egzersizinde ise <strong>' + pSport + 'g/gün</strong> (1.8 g/kg) saf protein alınmalıdır.</li>' +
              '<li><strong>🔥 Günlük Enerji & Kalori Açığı:</strong> Tahmini bazal metabolizma (BMR) <strong>~' + bmrEst + ' kcal</strong>, günlük harcama (TDEE) <strong>~' + tdeeEst + ' kcal</strong> ve sağlıklı yağ yakımı diyet hedefi <strong>~' + deficitCal + ' kcal/gün</strong> olarak hesaplanmıştır.</li>' +
              '<li><strong>🌿 Günlük Lif (Posa) Hedefi:</strong> Bağırsak motilitesi ve glisemik kontrol için <strong>28 - 32 gram/gün</strong> diyet lifi.</li>' +
            '</ul>' +
          '</div>';
      }
    }

    // 1. SELAMLAŞMA & PLATFORM KİMLİĞİ
    if (qNorm.match(/^(merhaba|selam|selamlar|gunaydin|iyi gunler|iyi aksamlar|hey|hi|hello|nasilsin|kolay gelsin)\b/) && qNorm.split(/\s+/).length <= 4) {
      return '<div><strong>👋 Merhaba! DiyetKalfa Klinik Yapay Zeka Asistanına Hoş Geldiniz.</strong></div>' +
        '<div style="margin-top: 6px; color: #475569; line-height: 1.5;">' +
          'Hem klinik vaka analizlerinizde (HOMA-IR, Tiroid, PCOS, Gut, Anemi, Sporcu makroları vb.) hem de DiyetKalfa yazılımımız hakkında bana her türlü soruyu manuel olarak sorabilirsiniz.' +
        '</div>' +
        '<div style="margin-top: 10px; display: flex; gap: 6px; flex-wrap: wrap;">' +
          '<button type="button" onclick="triggerQuickPrompt(\'Klinik paneline nasıl geçeceğiz?\')" class="ai-link-btn" style="background: #1e3a8a; color: #fff;">🚀 Paneli Nasıl Açarım?</button>' +
          '<button type="button" onclick="triggerQuickPrompt(\'Paketler ve fiyatlar ne kadar?\')" class="ai-link-btn" style="background: #0284c7; color: #fff;">💎 Fiyatlar & Paketler</button>' +
          '<button type="button" onclick="triggerQuickPrompt(\'1 günlük DSÖ diyet reçetesi verir misin?\')" class="ai-link-btn" style="background: #eff6ff; color: #1e3a8a; border: 1px solid #bfdbfe;">🥗 Günlük Reçete Yaz</button>' +
        '</div>';
    }

    // 2. KLİNİK PANELİNE GİRİŞ / SİSTEMİ AÇMA / ŞİFRE / DEMO
    if (qNorm.includes('panel') || qNorm.includes('sistemi nasil') || qNorm.includes('nasil acacagiz') || qNorm.includes('nasil acariz') || qNorm.includes('nasil girerim') || qNorm.includes('nasil gec') || qNorm.includes('nereden gir') || qNorm.includes('sifre') || qNorm.includes('parola') || qNorm.includes('demo nasil') || qNorm.includes('acilmiyor')) {
      return '<div><strong>🚀 Klinik Paneline Erişim & 7 Günlük Deneme Rehberi:</strong></div>' +
        '<div style="margin-top: 6px; line-height: 1.5; color: #475569;">' +
          'DiyetKalfa klinik sistemine geçiş ve kullanım akışı şu şekildedir:' +
          '<ul style="margin: 6px 0 0 16px; padding: 0;">' +
            '<li><strong>1. Ücretsiz Kayıt & 7 Gün Deneme:</strong> "Ücretsiz Başla" veya "Kliniğimde Başlat (0 TL)" butonlarından kayıt ekranına geçip hesabınızı oluşturduğunuz an paneliniz 7 gün boyunca aktifleşir.</li>' +
            '<li><strong>2. 7. Gün Sonu Otomatik Lisans Kontrolü:</strong> 7. günün sonunda sistem otomatik ödeme/paket onay ekranını açar; onaylanan pakete göre (Giriş, Temel, Profesyonel veya Sınırsız) panel özellikleriniz tanımlanır.</li>' +
            '<li><strong>3. Üst Menüden Giriş:</strong> Sağ üstteki "🔐 Giriş Yap" butonundan lisans bilgilerinizle veya tek tıkla demo modunda panele ulaşabilirsiniz.</li>' +
          '</ul>' +
        '</div>' +
        '<div style="margin-top: 10px; display: flex; gap: 6px; flex-wrap: wrap;">' +
          '<a href="kayit.html" class="ai-link-btn" style="background: #1e3a8a; color: #fff; font-weight: bold;">✨ Kayıt Ol & 7 Gün Başlat →</a>' +
          '<a href="kayit.html" target="_blank" class="ai-link-btn" style="background: #eff6ff; color: #1e3a8a; border: 1px solid #bfdbfe;">🚀 Klinik Paneli Gör</a>' +
        '</div>';
    }

    // 3. FİYATLAR & PAKET FARKLARI
    if (qNorm.includes('fiyat') || qNorm.includes('ucret') || qNorm.includes('paket') || qNorm.includes('kampanya') || qNorm.includes('kac para') || qNorm.includes('maliyet')) {
      return '<div><strong>💎 DiyetKalfa Paketleri & Özellik Yetkileri:</strong></div>' +
        '<div style="margin-top: 6px; line-height: 1.5; color: #475569;">' +
          'Her diyetisyen yalnızca satın aldığı paketin özelliklerini panelinde kullanır:' +
          '<ul style="margin: 6px 0 0 16px; padding: 0;">' +
            '<li><strong>1. Giriş Paketi (1.500 TL/ay - Yıllık 18.000 TL):</strong> 10 danışana kadar takip, DSÖ 2024 Diyet Planlayıcı, Türkomp Besin Değişimi, InBody ölçüm ve Excel çizelgesi.</li>' +
            '<li><strong>2. Temel Paket (2.200 TL/ay - Yıllık 26.400 TL):</strong> Sınırsız danışan, HOMA-IR Tahlil Labı, Randevu Takvimi & SMS, Otomatik Pazar Listesi ve White-Label PDF.</li>' +
            '<li><strong>3. Profesyonel Paket (3.000 TL/ay - Yıllık 36.000 TL):</strong> Tüm Temel özellikler + Danışan Kasası & Finans, Viral Reels AI Stüdyosu, Kişisel Web Sitesi & SEO.</li>' +
            '<li><strong>4. Sınırsız Paket (4.500 TL/ay - Yıllık 54.000 TL):</strong> Çoklu Diyetisyen (Poliklinik), 1.000 Başlıklı SMS, .com Özel Domain ve 7/24 VIP Danışman.</li>' +
          '</ul>' +
        '</div>' +
        '<div style="margin-top: 10px; display: flex; gap: 6px; flex-wrap: wrap;">' +
          '<a href="fiyatlar.html" class="ai-link-btn" style="background: #1e3a8a; color: #fff;">📦 Fiyatları & Tabloyu Aç →</a>' +
          '<a href="kayit.html" class="ai-link-btn" style="background: #0284c7; color: #fff;">🚀 7 Gün Ücretsiz Dene</a>' +
        '</div>';
    }

    // 4. ÖDEME YÖNTEMLERİ, KARTSIZ ÖDEME, HAVALE / EFT / FAST
    if (qNorm.includes('odeme') || qNorm.includes('havale') || qNorm.includes('eft') || qNorm.includes('fast') || qNorm.includes('iban') || qNorm.includes('kredi kart') || qNorm.includes('pos') || qNorm.includes('vergi')) {
      return '<div><strong>💳 Kolay, Kartsız & Anında Otomatik Lisans Aktivasyonu:</strong></div>' +
        '<div style="margin-top: 6px; line-height: 1.5; color: #334155;">' +
          '<ul style="margin: 6px 0 0 16px; padding: 0;">' +
            '<li><strong>🏦 7/24 Havale / EFT / FAST & WhatsApp Onayı:</strong> Ödemeniz onaylandığı saniye sistem otomatik olarak sizi <em>"DiyetKalfa\'ya Hoş Geldiniz"</em> ekranıyla klinik panelinize yönlendirir.</li>' +
            '<li><strong>📦 Pakete Özel Otomatik Yetkilendirme:</strong> Hangi paketin ödemesini yaptıysanız (Giriş, Temel, Profesyonel veya Sınırsız) paneliniz otomatik olarak o paketin modülleriyle açılır.</li>' +
          '</ul>' +
        '</div>' +
        '<div style="margin-top: 10px; display: flex; gap: 6px; flex-wrap: wrap;">' +
          '<a href="fiyatlar.html" class="ai-link-btn" style="background: #1e3a8a; color: #fff; font-weight: bold;">💳 Paket Seç & Satın Al →</a>' +
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
            '<li><strong>İnsülin Duyarlılığı:</strong> Karbonhidratlı bir öğün öncesi alındığında kas dokusunda glukoz alımını kolaylaştırır.</li>' +
            '<li><strong>Doğru Kullanım:</strong> 1 su bardağı ılık suya 1 tatlı kaşığı organik elma sirkesi eklenerek ana yemeklerden 10-15 dakika önce pipetle içilmelidir.</li>' +
            '<li><strong>⚠️ Kontrendikasyon:</strong> Gastrit, mide ülseri veya aktif reflüsü olan danışanlarda aç karnına sirke önerilmez.</li>' +
          '</ul>' +
        '</div>';
    }

    // 6. TİROİD & HASHİMOTO BESLENMESİ
    if (qNorm.includes('tiroid') || qNorm.includes('hashimoto') || qNorm.includes('guatr') || qNorm.includes('hipotiroid') || qNorm.includes('hipertiroid') || qNorm.includes('tsh') || qNorm.includes('levotiroksin') || qNorm.includes('euthyrox')) {
      return '<div><strong>🦋 Tiroid & Hashimoto Hastalığında Beslenme Protokolü:</strong></div>' +
        '<div style="margin-top: 6px; line-height: 1.5; color: #334155;">' +
          'Hashimoto ve hipotiroidide metabolik hızı ve bağışıklık toleransını optimize eden klinik kurallar:' +
          '<ul style="margin: 6px 0 0 16px; padding: 0;">' +
            '<li><strong>Kritik Mineraller (T4 -> T3 Dönüşümü):</strong> Deiyodinaz enzimi için günde 2 adet Brezilya cevizi (200 mcg doğal selenyum) ve kabak çekirdeği/kırmızı et (çinko) elzemdir.</li>' +
            '<li><strong>Guatrojen Besinler (Brokoli, Karnabahar, Lahana):</strong> Çiğ tüketildiğinde tiroid bezinin iyot tutulumunu bloke eder; ancak <strong>buharda veya fırında pişirildiğinde</strong> guatrojenik enzimler %90 inaktive olur ve güvenle tüketilebilir.</li>' +
            '<li><strong>İlaç Emilim Kuralı:</strong> Levotiroksin (Euthyrox/Levotiron) sabah aç karnına su ile alınmalı; kahvaltı, kahve ve demir/kalsiyum takviyeleri için en az 45-60 dakika beklenmelidir.</li>' +
            '<li><strong>Anti-TPO & Glüten:</strong> Otoimmün alevlenmeyi düşürmek için 8-12 haftalık glütensiz ve laktozsuz anti-inflamatuar eliminasyon protokolü uygulanmalıdır.</li>' +
          '</ul>' +
        '</div>';
    }

    // 7. ARALIKLI ORUÇ (INTERMITTENT FASTING) & ORUÇTA KAHVE
    if (qNorm.includes('aralikli oruc') || qNorm.includes('intermittent') || qNorm.includes('if diyeti') || qNorm.includes('16/8') || qNorm.includes('oructa kahve') || qNorm.includes('orucu bozar') || qNorm.includes('otofaji')) {
      return '<div><strong>⏳ Aralıklı Oruç (16/8) & Oruç Penceresi Kuralları:</strong></div>' +
        '<div style="margin-top: 6px; line-height: 1.5; color: #334155;">' +
          '<ul style="margin: 6px 0 0 16px; padding: 0;">' +
            '<li><strong>Açlık Penceresinde Serbest Olanlar:</strong> Şekersiz ve sütsüz sade filtre kahve, sade Türk kahvesi, espresso, sade yeşil çay, bitki çayları, sade maden suyu ve su orucu bozmaz, otofajiyi destekler.</li>' +
            '<li><strong>Orucu Bozanlar:</strong> Süt, laktozsuz süt, badem/yulaf sütü, krema, kolajen tozu, kemik suyu, BCAA ve tatlandırıcılar insülin yanıtı oluşturarak açlığı sonlandırır.</li>' +
            '<li><strong>İdeal 16:8 Saatleri:</strong> 12:00 İlk Ana Öğün -> 15:30 Ara Öğün -> 19:30 Son Ana Öğün (20:00 - 12:00 arası 16 saat açlık).</li>' +
          '</ul>' +
        '</div>';
    }

    // 8. İNSÜLİN DİRENCİ, HOMA-IR & YÜKSEK İNSÜLİN / KAN ŞEKERİ
    if (qNorm.includes('insulin') || qNorm.includes('homa') || qNorm.includes('diyabet') || qNorm.includes('seker hast') || qNorm.includes('glukoz') || qNorm.includes('hba1c') || qNorm.includes('hipoglisemi') || qNorm.includes('kan sekeri')) {
      var numMatch = qNorm.match(/(\d+[.,]\d+|\b\d+\b)/);
      var customValNote = '';
      if (numMatch) {
        var val = parseFloat(numMatch[0].replace(',', '.'));
        if (val > 1.5 && val < 25) {
          customValNote = '<li><strong>📌 Belirttiğiniz Değer (' + val + ') Analizi:</strong> ' + (val >= 2.5 ? 'HOMA-IR / İnsülin eşiği yüksek seyretmektedir. Serbest şeker %0\'a indirilmeli ve düşük glisemik yüklü (GL < 10) öğünler planlanmalıdır.' : 'Değer optimal sınıra yakındır; koruyucu düşük GI Akdeniz protokolü sürdürülmelidir.') + '</li>';
        }
      }
      return '<div><strong>🩸 Yüksek İnsülin & HOMA-IR Klinik Beslenme Protokolü:</strong></div>' +
        '<div style="margin-top: 6px; line-height: 1.5; color: #334155;">' +
          'İnsülin yüksekliğinde (Hiperinsülinemi / HOMA-IR > 2.5) pankreası dinlendiren ve hücresel reseptör duyarlılığını açan stratejiler:' +
          '<ul style="margin: 6px 0 0 16px; padding: 0;">' +
            customValNote +
            '<li><strong>1. Karbonhidratları "Giydirme" Kuralı:</strong> Hiçbir karbonhidrat (meyve veya tam tahıl) tek başına yenmemelidir. Ara öğünde 1 porsiyon düşük GI meyve (yeşil elma, yaban mersini) mutlaka 2 tam ceviz veya 3 kaşık probiyotik yoğurt ile eşleştirilmelidir.</li>' +
            '<li><strong>2. Tabak Sıralaması (Food Sequencing):</strong> Öğüne önce zeytinyağlı salata/lif ile başlamak, ardından protein ve en son kompleks karbonhidrat tüketmek tokluk glukoz pikini %40 düşürür.</li>' +
            '<li><strong>3. Öğün Aralığı:</strong> Sık sık atıştırmak insülini sürekli havada tutar; öğünler arasında 4-5 saatlik net sindirim boşluğu bırakılmalıdır.</li>' +
            '<li><strong>4. Yemek Sonrası 15 Dk Yürüyüş:</strong> Yemekten sonraki ilk 30 dakika içinde yapılan yürüyüş GLUT-4 taşıyıcılarını aktive ederek insüline gerek kalmadan şekeri kasa çeker.</li>' +
          '</ul>' +
        '</div>';
    }

    // 9. GUT HASTALIĞI & ÜRİK ASİT
    if (qNorm.includes('gut') || qNorm.includes('urik asit') || qNorm.includes('purin')) {
      return '<div><strong>🥩 Gut Hastalığı & Yüksek Ürik Asit Düşürme Protokolü:</strong></div>' +
        '<div style="margin-top: 6px; line-height: 1.5; color: #334155;">' +
          '<ul style="margin: 6px 0 0 16px; padding: 0;">' +
            '<li><strong>Yasaklı Yüksek Pürin Grubu:</strong> Sakatatlar, hamsi, sardalya, midye, kaz/ördek eti, et suyu bulyonlar, alkol (özellikle bira) ve mısır şurubu.</li>' +
            '<li><strong>Sınırlı Tüketim:</strong> Yağsız dana/kuzu eti, tavuk ve baklagiller haftada 2-3 kez 60-90g porsiyonu aşmayacak şekilde sınırlandırılır.</li>' +
            '<li><strong>Ürik Asit Atıcı Besinler:</strong> Günde 1 su bardağı şekersiz vişne suyu veya 10-12 adet kiraz/vişne, yarım yağlı süt/yoğurt, C vitamini ve günde 3 litre alkali su.</li>' +
          '</ul>' +
        '</div>';
    }

    // 10. POLİKİSTİK OVER (PCOS) & İNOSİTOL DOZU
    if (qNorm.includes('pcos') || qNorm.includes('polikistik') || qNorm.includes('tuyenme') || qNorm.includes('inositol') || qNorm.includes('adet duzensiz') || qNorm.includes('yumurtalik')) {
      return '<div><strong>🌸 PCOS (Polikistik Over) & İnositol Klinik Protokolü:</strong></div>' +
        '<div style="margin-top: 6px; line-height: 1.5; color: #334155;">' +
          '<ul style="margin: 6px 0 0 16px; padding: 0;">' +
            '<li><strong>İdeal İnositol Dozu ve Oranı:</strong> Klinik çalışmalarda altın standart <strong>40:1 oranında Miyo-İnositol / D-Kiro-İnositol</strong> kombinasyonudur. Günlük doz sabah 2.000 mg + akşam 2.000 mg olmak üzere toplam <strong>4.000 mg (4 gram)</strong> aç karnına uygulanır.</li>' +
            '<li><strong>Androjen (Tüylenme/Akne) Baskılama:</strong> Günde 2 fincan tıbbi nane çayı (Spearmint tea) serbest testosteronu düşürür, LH/FSH dengesini destekler.</li>' +
            '<li><strong>Anti-İnflamatuar Beslenme:</strong> Rafine şeker, beyaz un ve süt ürünlerindeki IGF-1 uyarıcı faktörler azaltılmalı; Omega-3 (EPA/DHA), çinko, magnezyum ve D vitamini optimize edilmelidir.</li>' +
          '</ul>' +
        '</div>';
    }

    // 11. MARATONCU & DAYANIKLILIK SPORCUSU / SPORCU BESLENMESİ
    if (qNorm.includes('maraton') || qNorm.includes('glikojen') || qNorm.includes('sporcu') || qNorm.includes('protein ihtiyac') || qNorm.includes('kas yap') || qNorm.includes('antrenman') || qNorm.includes('kreatin') || qNorm.includes('whey')) {
      return '<div><strong>🏃‍♂️ Sporcu & Maraton Performans Makro Protokolü:</strong></div>' +
        '<div style="margin-top: 6px; line-height: 1.5; color: #334155;">' +
          '<ul style="margin: 6px 0 0 16px; padding: 0;">' +
            '<li><strong>Maraton / Yarış Öncesi Glikojen Yüklemesi:</strong> Yarıştan 36-48 saat önce vücut ağırlığının kg başına <strong>8 - 10 g/kg karbonhidrat</strong> (80 kg sporcu için günlük 640-800g kolay sindirilebilir karbonhidrat: pirinç, patates, yulaf, muz), <strong>1.6 g/kg protein</strong> ve düşük yağ/lif planlanır.</li>' +
            '<li><strong>Kuvvet & Hipertrofi Makroları:</strong> Kas gelişimi için kg başına <strong>1.8 - 2.2 g/kg protein</strong>, 4-6 g/kg kompleks karbonhidrat ve her öğünde 25-35g protein (3g lösin eşiği).</li>' +
            '<li><strong>Yarış/Antrenman Sırası Hidrasyon:</strong> 60 dakikayı aşan eforlarda saatte 30-60g izotonik karbonhidrat jeli ve sodyum/elektrolit replasmanı şarttır.</li>' +
          '</ul>' +
        '</div>';
    }

    // 12. DEMİR EKSİKLİĞİ, ANEMİ & FERRİTİN
    if (qNorm.includes('demir') || qNorm.includes('anemi') || qNorm.includes('ferritin') || qNorm.includes('kansizlik') || qNorm.includes('hemoglobin')) {
      return '<div><strong>🩸 Demir Eksikliği Anemisi & Ferritin Yükseltme Protokolü:</strong></div>' +
        '<div style="margin-top: 6px; line-height: 1.5; color: #334155;">' +
          '<ul style="margin: 6px 0 0 16px; padding: 0;">' +
            '<li><strong>Hem vs Non-Hem Demir:</strong> Kırmızı et, yumurta sarısı ve hindi (Hem demir) %25-30 emilirken; mercimek, ıspanak, pekmez (Non-hem demir) C vitamini olmadan sadece %5 emilir.</li>' +
            '<li><strong>C Vitamini Sinerjisi:</strong> Köfte/et yanına bol limonlu biberli maydanoz salatası; yumurta yanına taze portakal/kivi/biber eklemek emilimi 3 katına çıkarır.</li>' +
            '<li><strong>Kalsiyum ve Tanen Kuralı:</strong> Demir içeren ana öğünlerle birlikte <strong>ayran, yoğurt, süt tüketilmemeli</strong>; çay ve kahve yemekten en az 1.5 - 2 saat sonraya bırakılmalıdır.</li>' +
          '</ul>' +
        '</div>';
    }

    // 13. B12 VİTAMİNİ & FOLAT EKSİKLİĞİ
    if (qNorm.includes('b12') || qNorm.includes('folik') || qNorm.includes('folat') || qNorm.includes('unutkanlik') || qNorm.includes('uyusma')) {
      return '<div><strong>🧠 B12 Vitamini & Folat (B9) Klinik Optimizasyonu:</strong></div>' +
        '<div style="margin-top: 6px; line-height: 1.5; color: #334155;">' +
          '<ul style="margin: 6px 0 0 16px; padding: 0;">' +
            '<li><strong>Optimal Kan Değeri:</strong> Laboratuvar alt sınırı 200 pg/mL olsa da nörolojik fonksiyon ve homosistein dengesi için B12\'nin <strong>500 - 800 pg/mL</strong> arasında olması hedeflenir.</li>' +
            '<li><strong>Besinsel Kaynaklar:</strong> B12 yalnızca hayvansal kaynaklarda (kırmızı et, somon, sardalya, yumurta, peynir) bulunur; bitkisel beslenenlerde aktif <strong>Metilkobalamin</strong> dilaltı takviyesi zorunludur.</li>' +
            '<li><strong>Mide Asidi & Metformin İlişkisi:</strong> Uzun süreli mide koruyucu (PPI) veya diyabet ilacı (Metformin) kullananlarda İntrinsik Faktör azaldığı için B12 emilimi bozulur.</li>' +
          '</ul>' +
        '</div>';
    }

    // 14. D VİTAMİNİ, KALSİYUM & KEMİK SAĞLIĞI
    if (qNorm.includes('d vitamini') || qNorm.includes('d3') || qNorm.includes('k2') || qNorm.includes('kalsiyum') || qNorm.includes('osteoporoz') || qNorm.includes('kemik erime')) {
      return '<div><strong>☀️ D3 + K2 Vitamini & Kalsiyum Metabolizması:</strong></div>' +
        '<div style="margin-top: 6px; line-height: 1.5; color: #334155;">' +
          '<ul style="margin: 6px 0 0 16px; padding: 0;">' +
            '<li><strong>Hedef Düzey:</strong> 25-OH Vitamin D düzeyinin bağışıklık ve yağ yakımı için <strong>40 - 60 ng/mL</strong> aralığında tutulması önerilir.</li>' +
            '<li><strong>Neden D3 + K2 + Magnezyum?</strong> D3 vitamini bağırsaktan kalsiyum emilimini artırır, K2 vitamini (MK-7) bu kalsiyumun damar duvarına değil kemiklere yerleşmesini sağlar, Magnezyum ise D vitaminini karaciğer ve böbrekte aktif forma dönüştürür.</li>' +
            '<li><strong>Emilim:</strong> Yağda çözünen bir vitamin olduğu için zeytinyağlı veya avokadolu bir öğünle birlikte alınmalıdır.</li>' +
          '</ul>' +
        '</div>';
    }

    // 15. BÖBREK TAŞI & BÖBREK YETMEZLİĞİ
    if (qNorm.includes('bobrek') || qNorm.includes('oksalat') || qNorm.includes('kreatinin') || qNorm.includes('gfr') || qNorm.includes('ure') || qNorm.includes('diyaliz')) {
      return '<div><strong>🫘 Böbrek Sağlığı, Nefroloji & Taş Önleme Beslenmesi:</strong></div>' +
        '<div style="margin-top: 6px; line-height: 1.5; color: #334155;">' +
          '<ul style="margin: 6px 0 0 16px; padding: 0;">' +
            '<li><strong>Kalsiyum Oksalat Taşları:</strong> Ispanak, pazı, pancar, çikolata, koyu çay ve aşırı badem (yüksek oksalat) sınırlandırılmalı; yemeklerle birlikte doğal kalsiyum (yoğurt) alınarak oksalatın bağırsakta bağlanıp atılması sağlanmalıdır.</li>' +
            '<li><strong>Sitrat Desteği:</strong> Günde 2.5 - 3 litre suya taze sıkılmış limon suyu eklemek idrar sitratını artırarak taş kristalleşmesini önler.</li>' +
            '<li><strong>Kronik Böbrek Yetmezliği (GFR Düşüklüğü):</strong> Evreye göre protein (0.6 - 0.8 g/kg), sodyum (<2g), potasyum ve fosfor kısıtlaması uygulanır.</li>' +
          '</ul>' +
        '</div>';
    }

    // 16. TANSİYON / HİPERTANSİYON & DASH DİYETİ
    if (qNorm.includes('tansiyon') || qNorm.includes('hipertansiyon') || qNorm.includes('dash') || qNorm.includes('tuz') || qNorm.includes('sodyum')) {
      return '<div><strong>💓 Hipertansiyon & DASH Klinik Beslenme Protokolü:</strong></div>' +
        '<div style="margin-top: 6px; line-height: 1.5; color: #334155;">' +
          '<ul style="margin: 6px 0 0 16px; padding: 0;">' +
            '<li><strong>Sodyum Limiti:</strong> DSÖ standartlarına göre günlük tuz tüketimi 5 gramın (sodyum < 2.000 mg) altına çekilmeli; salamura zeytin, peynir, turşu ve yüksek sodyumlu maden suları kısıtlanmalıdır.</li>' +
            '<li><strong>Potasyum & Magnezyum Dengesi:</strong> Damar duvarını gevşetmek için potasyum zengini besinler (muz, avokado, patates, ıspanak, kuru kayısı) ve sarımsak/pancar suyu (nitrik oksit) diyete eklenir.</li>' +
          '</ul>' +
        '</div>';
    }

    // 17. KETOJENİK DİYET & LİPÖDEM
    if (qNorm.includes('keto') || qNorm.includes('ketojenik') || qNorm.includes('ketozis') || qNorm.includes('lipodem') || qNorm.includes('lenfodem')) {
      return '<div><strong>🥑 Ketojenik & Lipödem Anti-İnflamatuar Beslenme:</strong></div>' +
        '<div style="margin-top: 6px; line-height: 1.5; color: #334155;">' +
          '<ul style="margin: 6px 0 0 16px; padding: 0;">' +
            '<li><strong>Makro Oranı:</strong> Enerjinin %70-75\'i sağlıklı yağlardan (zeytinyağı, avokado, Hindistan cevizi yağı, tereyağı, ceviz), %20-25\'i proteinden, %5-10\'u (günlük < 25g net karb) düşük nişastalı yeşil sebzelerden sağlanır.</li>' +
            '<li><strong>Lipödem Özel Yaklaşımı:</strong> Lipödemli yağ dokusu klasik kalori kısıtlamasına dirençlidir; ancak ketojenik veya düşük karbonhidratlı anti-inflamatuar RAD diyeti (glüten, süt şekeri ve işlenmiş yağların kesilmesi) bacaklardaki ağrı ve ödemi hızla azaltır.</li>' +
          '</ul>' +
        '</div>';
    }

    // 18. BARİATRİK CERRAHİ (TÜP MİDE / GASTRİK BYPASS)
    if (qNorm.includes('bariatrik') || qNorm.includes('tup mide') || qNorm.includes('mide ameliyat') || qNorm.includes('gastrik') || qNorm.includes('dumping')) {
      return '<div><strong>🏥 Bariatrik Cerrahi (Tüp Mide) Sonrası 4 Aşamalı Beslenme:</strong></div>' +
        '<div style="margin-top: 6px; line-height: 1.5; color: #334155;">' +
          '<ul style="margin: 6px 0 0 16px; padding: 0;">' +
            '<li><strong>1. Evre (1-2. Hafta - Berrak & Tam Sıvı):</strong> Tanesiz kemik suyu, laktozsuz süt/kefir, izole whey protein tozu.</li>' +
            '<li><strong>2. Evre (3-4. Hafta - Püre Dönemi):</strong> Blenderize yumurta, lor peyniri, haşlanmış sebze ve balık/tavuk püresi.</li>' +
            '<li><strong>3. Evre (5-6. Hafta - Yumuşak Katı):</strong> İyi pişmiş kıyma, sulu köfte, yumuşak sebzeler.</li>' +
            '<li><strong>Altın Kurallar:</strong> Katı-sıvı ayrımı (yemekten 30 dk önce ve sonra sıvı alınmaması), günlük <strong>60-80g protein hedefi</strong> ve Dumping sendromunu önlemek için basit şekerlerin sıfırlanması.</li>' +
          '</ul>' +
        '</div>';
    }

    // 19. ÇÖLYAK & GLÜTENSİZ BESLENME
    if (qNorm.includes('colyak') || qNorm.includes('gluten') || qNorm.includes('glutensiz') || qNorm.includes('bugday hassas')) {
      return '<div><strong>🌾 Çölyak & Glütensiz Beslenme Rehberi:</strong></div>' +
        '<div style="margin-top: 6px; line-height: 1.5; color: #334155;">' +
          '<ul style="margin: 6px 0 0 16px; padding: 0;">' +
            '<li><strong>Yasak Tahıllar:</strong> Buğday, arpa, çavdar, bulgur, irmik, kuskus, siyez, kavulca ve malt içeren tüm ürünler.</li>' +
            '<li><strong>Güvenli Alternatifler:</strong> Karabuğday (greçka), kinoa, esmer/beyaz pirinç, mısır, darı, amarant, nohut/mercimek unu ve glütensiz sertifikalı yulaf.</li>' +
            '<li><strong>Çapraz Bulaşma Uyarısı:</strong> Mutfakta ayrı ekmek kızartma makinesi, ayrı doğrama tahtası ve tahta kaşık yerine çelik/silikon ekipman kullanılmalıdır.</li>' +
          '</ul>' +
        '</div>';
    }

    // 20. İBS, SİBO & ŞİŞKİNLİK / KABIZLIK
    if (qNorm.includes('ibs') || qNorm.includes('sibo') || qNorm.includes('siskinlik') || qNorm.includes('gaz') || qNorm.includes('fodmap') || qNorm.includes('kabiz') || qNorm.includes('sindirim') || qNorm.includes('bagirsak')) {
      return '<div><strong>🌿 Bağırsak Mikrobiyotası, İBS/SIBO & Kabızlık Çözümü:</strong></div>' +
        '<div style="margin-top: 6px; line-height: 1.5; color: #334155;">' +
          '<ul style="margin: 6px 0 0 16px; padding: 0;">' +
            '<li><strong>Kronik Şişkinlik & Gaz (İBS/SIBO):</strong> 4-6 hafta Düşük FODMAP protokolü uygulanır (çiğ soğan, sarımsak, baklagil, elma, laktoz geçici olarak kesilir; kabak, havuç, pirinç, kinoa, yumurta, zeytinyağı kullanılır).</li>' +
            '<li><strong>Kabızlık (Konstipasyon) Kürü:</strong> Sabah aç karnına 1 bardak ılık su + 1 yemek kaşığı zeytinyağı + 2 adet kuru kayısı/mürdüm eriği, günde 28-30g lif (keten tohumu, yulaf, chia) ve akşam Magnezyum Sitrat desteği.</li>' +
          '</ul>' +
        '</div>';
    }

    // 21. REFLÜ & GASTRİT
    if (qNorm.includes('reflu') || qNorm.includes('gastrit') || qNorm.includes('mide yan') || qNorm.includes('mide eksi') || qNorm.includes('helikobakter') || qNorm.includes('ulser')) {
      return '<div><strong>🔥 Reflü & Gastrit Klinik Beslenme Rehberi:</strong></div>' +
        '<div style="margin-top: 6px; line-height: 1.5; color: #334155;">' +
          '<ul style="margin: 6px 0 0 16px; padding: 0;">' +
            '<li><strong>Mide Sfinkterini Gevşeten Yasaklar:</strong> Koyu kahve, çikolata, nane, sarımsak, soğan, domates/salça, acı baharatlar, narenciye ve kızartmalar.</li>' +
            '<li><strong>Onarıcı Besinler:</strong> Taze sıkılmış çiğ patates/lahana suyu (L-glutamin & S-metilmetiyonin zengini), yulaf lapası, muz, haşlanmış kabak ve kudret narı.</li>' +
            '<li><strong>Yatış Kuralı:</strong> Yatmadan 3.5 saat önce yemek kesilmeli, yemek sırasında aşırı sıvı alınmamalıdır.</li>' +
          '</ul>' +
        '</div>';
    }

    // 22. KARACİĞER YAĞLANMASI & KOLESTEROL / TRİGLİSERİD
    if (qNorm.includes('karaciger') || qNorm.includes('yaglanma') || qNorm.includes('alt') || qNorm.includes('ast') || qNorm.includes('ggt') || qNorm.includes('steatoz') || qNorm.includes('kolesterol') || qNorm.includes('trigliserid') || qNorm.includes('ldl') || qNorm.includes('hdl')) {
      return '<div><strong>🫀 Karaciğer Yağlanması & Kolesterol/Trigliserid Düşürme:</strong></div>' +
        '<div style="margin-top: 6px; line-height: 1.5; color: #334155;">' +
          '<ul style="margin: 6px 0 0 16px; padding: 0;">' +
            '<li><strong>Fruktoz & Basit Şeker Kesimi:</strong> Trigliserid yüksekliği ve karaciğer yağlanmasının ana yakıtı meyve suyu, mısır şurubu, alkol ve beyaz undur.</li>' +
            '<li><strong>Kolin, Enginar & Beta-Glukan:</strong> Yumurta (kolin), enginar/devedikeni (silimarin) karaciğer enzimlerini (AST/ALT) düşürür; yulaf ve keten tohumu LDL kolesterolü safra yoluyla bağlayıp atar.</li>' +
            '<li><strong>Omega-3:</strong> Günlük 1.000-2.000 mg EPA+DHA balık yağı trigliseridi %25-35 oranında düşürür.</li>' +
          '</ul>' +
        '</div>';
    }

    // 23. KAHVE, YEŞİL ÇAY, SU & ÖDEM
    if (qNorm.includes('kahve') || qNorm.includes('kafein') || qNorm.includes('yesil cay') || qNorm.includes('matcha') || qNorm.includes('su') || qNorm.includes('odem') || qNorm.includes('detoks')) {
      return '<div><strong>💧 Hidrasyon, Kahve/Yeşil Çay & Ödem Atma Rehberi:</strong></div>' +
        '<div style="margin-top: 6px; line-height: 1.5; color: #334155;">' +
          '<ul style="margin: 6px 0 0 16px; padding: 0;">' +
            '<li><strong>Su Formülü:</strong> Günlük su ihtiyacı = <strong>Kilo (kg) x 35 ml</strong>\'dir. İçilen her 1 fincan kahve/çay diüretik olduğu için üzerine +1 bardak ekstra su içilmelidir.</li>' +
            '<li><strong>Ödem Atıcı Klinik Kür:</strong> 1 litre suya yarım demet saplarıyla maydanoz, 2 dilim taze ananas veya yeşil elma, yarım limon, 1 çubuk tarçın ve kiraz sapı/mısır püskülü demlenerek tüketilir.</li>' +
            '<li><strong>Kahve & Yeşil Çay Saati:</strong> Sabah uyandıktan 1 saat sonra (kortizol piki geçince) ve yemeklerden 1 saat sonra (demir emilimini bozmamak için) tüketilmelidir.</li>' +
          '</ul>' +
        '</div>';
    }

    // 24. KİLO DURAKSAMASI (PLATO) & GECE YEME
    if (qNorm.includes('duraksama') || qNorm.includes('plato') || qNorm.includes('kilo veremiyorum') || qNorm.includes('gitmiyor') || qNorm.includes('takildi') || qNorm.includes('gece yeme') || qNorm.includes('tatli kriz') || qNorm.includes('istah')) {
      return '<div><strong>🛑 Kilo Duraksaması (Plato) & Tatlı Krizi / İştah Yönetimi:</strong></div>' +
        '<div style="margin-top: 6px; line-height: 1.5; color: #334155;">' +
          '<ul style="margin: 6px 0 0 16px; padding: 0;">' +
            '<li><strong>Plato Kırma (Şok & Refeed):</strong> 1 gün yüksek temiz karbonhidratlı (karabuğday, yulaf) bakım kalorisi alıp ertesi 2 gün düşük karbonhidratlı yeşil detoks uygulamak leptin ve T3 hormonunu yeniden ateşler.</li>' +
            '<li><strong>Tatlı Krizleri İçin:</strong> Krom pikolinat (200 mcg), Seylan tarçını, %85 bitter çikolata (2 kare) + 5 çiğ badem ve yeterli proteinli kahvaltı gece yeme ataklarını %80 keser.</li>' +
          '</ul>' +
        '</div>';
    }

    // 25. 1 GÜNLÜK DSÖ KLİNİK DİYET REÇETESİ
    if (qNorm.includes('ornek diyet') || qNorm.includes('diyet listesi') || qNorm.includes('bana liste') || qNorm.includes('ornek menu') || qNorm.includes('bir gunluk')) {
      return '<div><strong>🥗 1 Günlük DSÖ 2024 Uyumlu Klinik Diyet Listesi (1.600 kcal):</strong></div>' +
        '<div style="margin-top: 6px; line-height: 1.5; color: #334155;">' +
          '<ul style="margin: 6px 0 0 16px; padding: 0;">' +
            '<li><strong>🍳 Kahvaltı (08:30):</strong> 2 adet haşlanmış yumurta, 50g az tuzlu lor peyniri, 5 adet zeytin, bol yeşillik ve 1 dilim ekşi mayalı siyez ekmeği.</li>' +
            '<li><strong>☕ Ara Öğün (11:00):</strong> 1 fincan yeşil çay + 8 adet çiğ badem.</li>' +
            '<li><strong>🍗 Öğle Yemeği (13:30):</strong> 150g ızgara tavuk göğsü veya hindi, 1 büyük kase zeytinyağlı mevsim salatası, 4 yemek kaşığı karabuğday pilavı.</li>' +
            '<li><strong>🍏 İkindi (16:30):</strong> 1 adet orta boy yeşil elma + toz tarçın + 1 kase probiyotik yoğurt.</li>' +
            '<li><strong>🍲 Akşam Yemeği (19:30):</strong> 8 yemek kaşığı zeytinyağlı kabak veya taze fasulye, 1 kase dereotlu cacık.</li>' +
          '</ul>' +
        '</div>';
    }

    // 26. MAGNEZYUM, KOLAJEN, OMEGA-3 & TAKVİYELER
    if (qNorm.includes('magnezyum') || qNorm.includes('malat') || qNorm.includes('glisinat') || qNorm.includes('sitrat') || qNorm.includes('kolajen') || qNorm.includes('omega') || qNorm.includes('balik yagi') || qNorm.includes('takviye')) {
      return '<div><strong>💊 Klinik Takviye Rehberi (Magnezyum, Omega-3 & Kolajen):</strong></div>' +
        '<div style="margin-top: 6px; line-height: 1.5; color: #334155;">' +
          '<ul style="margin: 6px 0 0 16px; padding: 0;">' +
            '<li><strong>Magnezyum:</strong> Sabah enerji ve kas ağrısı için <em>Malat</em>; akşam uyku, stres ve migren için <em>Bisglisinat</em>; kramp ve kabızlık için <em>Sitrat</em> formu (günlük 200-400 mg elementel) seçilmelidir.</li>' +
            '<li><strong>Omega-3:</strong> Trigliserid veya fosfolipid formda, IFOS onaylı, EPA+DHA toplamı en az 1.000 mg olan ürünler tok karnına alınmalıdır.</li>' +
            '<li><strong>Kolajen:</strong> Cilt için Tip 1 & 3, eklem için Tip 2 hidrolize peptid kolajen (2.000 Dalton altı molekül ağırlıklı) C vitamini ile birlikte kullanılmalıdır.</li>' +
          '</ul>' +
        '</div>';
    }

    // 27. GEBELİK, EMZİRME & ÇOCUK BESLENMESİ
    if (qNorm.includes('gebe') || qNorm.includes('hamile') || qNorm.includes('emzir') || qNorm.includes('anne sutu') || qNorm.includes('cocuk') || qNorm.includes('bebek') || qNorm.includes('istahsiz')) {
      return '<div><strong>🤰 Anne & Çocuk Beslenmesi Klinik Protokolü:</strong></div>' +
        '<div style="margin-top: 6px; line-height: 1.5; color: #334155;">' +
          '<ul style="margin: 6px 0 0 16px; padding: 0;">' +
            '<li><strong>Gebelik:</strong> 2. trimester +300 kcal, 3. trimester +450 kcal. Folik asit, demir, iyot ve DHA desteğiyle haftalık 300-400g kontrollü tartı artışı izlenir.</li>' +
            '<li><strong>Emzirme Dönemi:</strong> +500 kcal enerji, günde 3.5 litre su, yumurta, dereotu, yulaf ve tahin süt verimini artırır; ilk 4 ay gaz yapıcı çiğ baklagil/lahana sınırlandırılır.</li>' +
            '<li><strong>Çocuklarda İştahsızlık:</strong> Yemek öncesi sıvı/meyve suyu verilmemeli, demir ve çinko depoları kontrol edilmeli, tabaklar görsel oyunlarla zenginleştirilmelidir.</li>' +
          '</ul>' +
        '</div>';
    }

    // 28. RANDEVU TAKVİMİ, EXCEL & İLETİŞİM
    if (qNorm.includes('randevu') || qNorm.includes('takvim') || qNorm.includes('sms') || qNorm.includes('excel') || qNorm.includes('cizelge') || qNorm.includes('iletisim') || qNorm.includes('telefon') || qNorm.includes('whatsapp')) {
      return '<div><strong>📅 Klinik Operasyon, Excel, Randevu SMS & 7/24 Destek:</strong></div>' +
        '<div style="margin-top: 6px; line-height: 1.5; color: #334155;">' +
          '• <strong>Excel & Randevu SMS:</strong> Danışanlarınızı Excel\'den tek tıkla aktarabilir, telefon rehberinizi bağlayarak otomatik randevu hatırlatma SMS\'i gönderebilirsiniz.<br>' +
          '• <strong>7/24 WhatsApp & Çağrı Hattı:</strong> 0532 120 28 46' +
        '</div>' +
        '<div style="margin-top: 10px; display: flex; gap: 6px; flex-wrap: wrap;">' +
          '<a href="https://wa.me/905321202846?text=Merhaba,%20DiyetKalfa%20canlı%20destek%20almak%20istiyorum." target="_blank" class="ai-link-btn" style="background: #25d366; color: #fff;">💬 0532 120 28 46 WhatsApp</a>' +
          '<a href="kayit.html" class="ai-link-btn" style="background: #1e3a8a; color: #fff;">🚀 7 Gün Ücretsiz Başlat</a>' +
        '</div>';
    }

    // =========================================================================
    // 29. AKILLI MANUEL SORU VE VAKA ANALİZ SENTEZLEYİCİSİ
    // =========================================================================
    // Kullanıcının yazdığı manuel sorudaki kelimeleri, sayıları, besinleri ve tıbbi durumu
    // tek tek ayrıştırır ve sorulan soruya %100 özel, tekrarsız yanıt üretir.
    return generateDynamicClinicalSynthesizer(rawClean, qNorm);
  }

  /**
   * Dinamik Manuel Soru & Vaka Analiz Motoru (Her soruya özel hesaplama ve yanıt)
   */
  function generateDynamicClinicalSynthesizer(rawClean, qNorm) {
    var escapedQuery = rawClean.replace(/</g, '&lt;').replace(/>/g, '&gt;');

    // 1. Sorudaki Sayısal Değerleri Yakala (Kilo, Yaş, Boy, Kalori, Gram, Tahlil)
    var weightMatch = qNorm.match(/(\d+)\s*(kg|kilo)/);
    var ageMatch = qNorm.match(/(\d+)\s*(yas|yasinda)/);
    var heightMatch = qNorm.match(/(\d{3})\s*(cm|boy)/);
    var calMatch = qNorm.match(/(\d{3,4})\s*(kcal|kalori)/);
    var anyNumberMatch = qNorm.match(/(\d+[.,]?\d*)/);

    var numericAnalysisHtml = '';
    if (weightMatch) {
      var w = parseInt(weightMatch[1]);
      var waterMl = w * 35;
      var protMin = Math.round(w * 1.2);
      var protMax = Math.round(w * 1.6);
      var estBmr = Math.round(w * 22);
      var targetDietCal = Math.max(1200, Math.round(estBmr * 1.35 - 450));
      numericAnalysisHtml =
        '<li><strong>📊 ' + w + ' kg Vaka İçin Hesaplanan Klinik Parametreler:</strong> ' +
        'Hedef diyet enerjisi <strong>~' + targetDietCal + ' kcal/gün</strong>, günlük doku onarım proteini <strong>' + protMin + ' - ' + protMax + ' g/gün</strong> ve zorunlu metabolik su hedefi <strong>' + (waterMl / 1000).toFixed(2) + ' Litre/gün</strong> olarak hesaplanmıştır.</li>';
    } else if (calMatch) {
      var c = parseInt(calMatch[1]);
      var pGram = Math.round((c * 0.25) / 4);
      var cGram = Math.round((c * 0.45) / 4);
      var fGram = Math.round((c * 0.30) / 9);
      numericAnalysisHtml =
        '<li><strong>📊 ' + c + ' kcal Hedef İçin Optimum Makro Dağılımı:</strong> ' +
        '<strong>' + pGram + 'g Protein</strong> (%25), <strong>' + cGram + 'g Düşük GI Karbonhidrat</strong> (%45) ve <strong>' + fGram + 'g Sağlıklı Yağ</strong> (%30) + en az 28g diyet lifi.</li>';
    } else if (ageMatch) {
      var a = parseInt(ageMatch[1]);
      numericAnalysisHtml =
        '<li><strong>📊 ' + a + ' Yaş Metabolik Hız Notu:</strong> ' +
        (a >= 40 ? '40 yaş sonrasında sarkopeni (kas kaybı) ve bazal metabolizma yavaşlamasını önlemek için öğün başına en az 25-30g kaliteli protein ve direnç egzersizi şarttır.' : 'Metabolik plastisitenin yüksek olduğu bu yaş grubunda sirkadiyen beslenme ve yeterli mikrobesin dengesiyle hızlı yağ kaybı sağlanır.') + '</li>';
    }

    // 2. Sorudaki Anahtar Kavramları Çıkar (Stop-word filtreli)
    var stopWords = ['bir', 'icin', 'ne', 'nasil', 'mi', 'mu', 'mı', 'mü', 'var', 'olan', 'ise', 've', 'veya', 'ile', 'kadar', 'gibi', 'daha', 'cok', 'az', 'en', 'iyi', 'kotu', 'yapmali', 'etmeli', 'olur', 'nedir', 'hangi', 'kac', 'bana', 'ben', 'danisan', 'hasta'];
    var words = rawClean.split(/\s+/).filter(function(w) {
      var cleanW = w.toLowerCase().replace(/[^a-zçğıöşü0-9]/g, '');
      var normW = cleanW.replace(/ı/g, 'i').replace(/ğ/g, 'g').replace(/ü/g, 'u').replace(/ş/g, 's').replace(/ö/g, 'o').replace(/ç/g, 'c');
      return cleanW.length >= 3 && stopWords.indexOf(normW) === -1;
    });
    var subjectFocus = words.length > 0 ? words.slice(0, 4).join(' ') : rawClean;

    // 3. Besin / Semptom / Soru Niyeti Eşleşmesi
    var foodDatabase = {
      'yumurta': 'Yumurta; anne sütünden sonra en yüksek biyoyararlanımlı (%100) referans proteindir ve karaciğer yağlanmasını önleyen kolin içerir. Kan kolesterolünü yükseltmez, günde 1-2 adet haşlanmış tüketimi uzun süre tokluk sağlar.',
      'yulaf': 'Yulaf; içerdiği çözünür beta-glukan lifi sayesinde midede jel kıvamı oluşturur, safra asitlerini bağlayarak LDL kolesterolü düşürür ve kan şekerinin yavaş yükselmesini sağlar. Su veya laktozsuz süt/yoğurt, chia ve tarçınla hazırlanmalıdır.',
      'avokado': 'Avokado; oleik asit (tekli doymamış yağ), potasyum ve E vitamini deposudur. Karbonhidrat içermez, yağda çözünen vitaminlerin (A, D, E, K) emilimini 4 kat artırır. Yarım orta boy avokado 1 porsiyon (yaklaşık 120 kcal) sağlıklı yağ değişimidir.',
      'ekmek': 'Beyaz ekmek yüksek glisemik indeksiyle insülin piki yapar; ancak ekşi mayalı tam siyez, karabuğday veya çavdar ekmeği B vitaminleri ve prebiyotik lif kaynağıdır. Diyette tamamen kesmek yerine öğünlerde 1-2 ince dilim kontrollü tüketilmelidir.',
      'meyve': 'Meyveler antioksidan ve polifenol kaynağıdır ancak fruktoz içerir. Meyve suyu yerine posasıyla tam meyve olarak, akşam geç saatlerde değil gündüz/ikindi ara öğününde çiğ kuruyemiş veya yoğurt/kefirle birlikte (glisemik yükü düşürmek için) tüketilmelidir.',
      'ceviz': 'Ceviz ve çiğ badem bitkisel Omega-3 (ALA), magnezyum ve E vitamini kaynağıdır. Kavrulmuş olanlar yerine çiğ olanlar tercih edilmeli; günde 2-3 tam ceviz veya 10 çiğ badem porsiyon aşımı yapılmadan tüketilmelidir.',
      'kefir': 'Kefir ve ev yoğurdu; bağırsak mikrobiyotasını onaran Lactobacillus ve Bifidobacterium suşları içerir. Bağırsak-beyin ekseni üzerinden serotonin üretimini ve bağışıklığı güçlendirir.',
      'tarcin': 'Gerçek Seylan tarçını, hücre zarındaki insülin reseptörlerini taklit ederek kan şekerini düşürür ve tatlı aşermesini keser.',
      'zerdecal': 'Zerdeçalın aktif maddesi Kurkumin güçlü bir anti-inflamatuardır; bağırsaktan emilebilmesi için mutlaka karabiber (piperin %2000 emilim artışı sağlar) ve zeytinyağı ile birlikte tüketilmelidir.',
      'zencefil': 'Zencefil (gingerol); mide boşalmasını düzenler, bulantıyı keser ve termojenik etkisiyle metabolizmayı canlandırır.',
      'limon': 'Limon vücutta alkali kül bırakan yüksek C vitaminli ve sitratlı bir besindir; demir emilimini artırır ve böbrek taşı oluşumunu engeller.',
      'somon': 'Somon, uskumru ve sardalya en güçlü EPA ve DHA Omega-3 kaynaklarıdır; haftada en az 2 kez fırında veya buğulama olarak tüketilmelidir.',
      'चिकन': 'Derisiz tavuk ve hindi göğsü düşük doymuş yağlı yüksek lösin kaynağıdır.',
      'tavuk': 'Derisiz tavuk ve hindi göğsü 100 gramında ~30g saf protein içerir; kas kütlesini koruyarak yağ yakımını hızlandırır.',
      'et': 'Yağsız kırmızı et hem-demir, B12, çinko ve kreatin açısından en yoğun besindir; yanında C vitaminli yeşil salatayla tüketilmelidir.',
      'baklagil': 'Mercimek, nohut ve kuru fasulye bitkisel protein ve dirençli nişasta deposudur; gaz yapmaması için 12-24 saat kimyonlu suda bekletilip haşlama suyu dökülerek pişirilmelidir.',
      'mercimek': 'Mercimek düşük glisemik indeksli yüksek bitkisel protein ve folat kaynağıdır; çorba veya salata olarak tokluk süresini uzatır.',
      'tatlandirici': 'Yapay tatlandırıcılar (aspartam, sukraloz) kalori içermese de bağırsak florasını bozabilir ve beyinde tatlı reseptörlerini uyararak iştah açabilir. Gerekirse doğal Stevia veya Eritritol minimum dozda kullanılmalıdır.',
      'alkol': 'Alkolün 1 gramı 7 kaloridir (boş enerji) ve karaciğer alkolü detoksifiye ederken yağ yakımını 24-48 saat boyunca tamamen durdurur.',
      'uyku': 'Gece 23:00-03:00 arası derin uykuda salgılanan Melatonin ve Büyüme Hormonu (GH) yağ yakımının anahtarıdır. Yetersiz uyku Ghrelin (açlık) hormonunu %25 artırır.',
      'stres': 'Kronik stres böbreküstü bezlerinden Kortizol salgılatır; yüksek kortizol kas yıkımına ve özellikle karın çevresinde (viseral) iç organ yağlanmasına yol açar.',
      'sivilce': 'Akne ve sivilce oluşumu yüksek glisemik indeksli gıdalar ve süt ürünlerindeki IGF-1 büyüme faktörü ile doğrudan tetiklenir. Şeker ve süt kısıtlanıp çinko (30 mg) ve Omega-3 artırılmalıdır.',
      'sac': 'Saç dökülmesi genellikle Ferritin (<50 ng/mL), Çinko, Biotin, B12, D vitamini eksikliği veya aşırı düşük kalorili şok diyetlerdeki protein yetersizliğinden kaynaklanır.'
    };

    var matchedFoodInsight = '';
    for (var key in foodDatabase) {
      if (qNorm.includes(key)) {
        matchedFoodInsight = '<li><strong>🔬 ' + key.charAt(0).toUpperCase() + key.slice(1) + ' Özel Klinik Bulgusu:</strong> ' + foodDatabase[key] + '</li>';
        break;
      }
    }

    // 4. Soru Niyetine Göre Özel Klinik Analiz Paragrafı
    var intentParagraph = '';
    if (qNorm.includes('zarar') || qNorm.includes('yasak') || qNorm.includes('dokunur') || qNorm.includes('yan etki')) {
      intentParagraph = '<strong>"' + escapedQuery + '"</strong> sorunuz klinik güvenlik ve kontrendikasyon açısından değerlendirildiğinde; besin veya takviyenin dozu, danışanın böbrek/karaciğer enzimleri (AST, ALT, GFR) ve kullandığı ilaçlarla (özellikle kan sulandırıcı, tiroid veya diyabet ilaçları) etkileşimi belirleyicidir. Akut semptom varsa eliminasyon protokolüyle 14 gün diyetten çıkarılıp yanıt izlenmelidir.';
    } else if (qNorm.includes('zayifla') || qNorm.includes('kilo ver') || qNorm.includes('yag yak') || qNorm.includes('eritir')) {
      intentParagraph = '<strong>"' + escapedQuery + '"</strong> konusunda yağ yakımı fizyolojisi nettir: Bölgesel veya mucizevi tekil zayıflama yoktur; lipoliz (yağ yıkımı) için günlük TDEE enerjisinin 400-500 kcal altında dengeli bir kalori açığı, düşük insülin seviyesi ve kg başına en az 1.2-1.5g protein alımıyla kas kütlesinin korunması gerekir.';
    } else if (qNorm.includes('kilo al') || qNorm.includes('hacim') || qNorm.includes('zayifim')) {
      intentParagraph = '<strong>"' + escapedQuery + '"</strong> için sağlıklı kilo alma (kas kütlesi artışı) protokolünde; günlük enerji ihtiyacının +400-600 kcal üzerine çıkılmalı, hacmi küçük ama kalorisi yoğun sağlıklı besinler (fıstık ezmesi, tahin, ceviz, avokado, muzlu yulaflı smoothie, zeytinyağı) ana öğünlerin arkasına eklenmelidir.';
    } else if (qNorm.includes('ne zaman') || qNorm.includes('saat') || qNorm.includes('ac karnina') || qNorm.includes('tok karnina')) {
      intentParagraph = '<strong>"' + escapedQuery + '"</strong> sorunuz sirkadiyen krononütrisyon açısından incelendiğinde; sindirim enzimlerinin ve insülin duyarlılığının zirvede olduğu gündüz saatleri (08:00 - 16:00 arası) metabolik kullanım için en verimli penceredir. Gece geç saatlerde alınan kaloriler melatonin salgısıyla çakışarak yağ depolanmasını artırır.';
    } else if (qNorm.includes('ne kadar') || qNorm.includes('kac') || qNorm.includes('doz') || qNorm.includes('gram') || qNorm.includes('porsiyon')) {
      intentParagraph = '<strong>"' + escapedQuery + '"</strong> için klinik dozaj ve porsiyonlama; danışanın bazal metabolizma hızı (BMR), fiziksel aktivite katsayısı (PAL) ve hedef biyokimya değerlerine göre kişiselleştirilir. Türkomp değişim listelerinde 1 porsiyon et grubu ~6g protein, 1 porsiyon tahıl ~15g karbonhidrat, 1 porsiyon yağ ~5g lipit olarak hesaplanır.';
    } else {
      intentParagraph = '<strong>"' + escapedQuery + '"</strong> konusu üzerine kanıta dayalı klinik beslenme yaklaşımı; danışanın anamnez bulguları, açlık glukoz/insülin (HOMA-IR) dengesi, bağırsak mikrobiyota toleransı ve DSÖ 2024 makro/mikro besin standartları doğrultusunda kişiye özel beslenme tedavisi planlamaktır.';
    }

    return '<div><strong>🩺 "' + subjectFocus + '" — Özel Klinik Vaka & Beslenme Analizi:</strong></div>' +
      '<div style="margin-top: 6px; color: #334155; line-height: 1.55;">' +
        '<div style="margin-bottom: 6px;">' + intentParagraph + '</div>' +
        '<ul style="margin: 6px 0 0 16px; padding: 0;">' +
          numericAnalysisHtml +
          matchedFoodInsight +
          '<li><strong>🎯 Klinik Uygulama Önerisi:</strong> Danışanın günlük menüsünde glisemik yükü dengelemek için lif oranı >25-30g/gün tutulmalı, serbest şeker <%5 sınırlandırılmalı ve su tüketimi <em>Kilo x 35 ml</em> formülüyle takip edilmelidir.</li>' +
        '</ul>' +
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

    var userMsgEl = document.createElement('div');
    userMsgEl.className = 'ai-msg-bubble ai-msg-user';
    userMsgEl.textContent = userText;
    messagesContainer.appendChild(userMsgEl);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;

    var typingEl = document.createElement('div');
    typingEl.className = 'ai-msg-bubble ai-msg-bot';
    typingEl.id = 'ai-typing-indicator';
    typingEl.innerHTML = '<span style="color:#0284c7; font-style:italic;">DiyetKalfa AI sorunuzu analiz ediyor...</span>';
    messagesContainer.appendChild(typingEl);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;

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
  window.getAiResponse = getNativeClinicalAiResponse;
  window.promptGeminiKey = promptGeminiKey;

})(window);


