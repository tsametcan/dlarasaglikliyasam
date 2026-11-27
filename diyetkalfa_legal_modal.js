/**
 * ============================================================================
 * DIYETKALFA HUKUKİ METİNLER & POLİTİKA MODALI (KVKK, SÖZLEŞME, ÇEREZ, ISO 27001)
 * ============================================================================
 */

(function() {
  'use strict';

  var legalModalHtml = `
  <div id="modal-legal-doc" style="display: none; position: fixed; inset: 0; background: rgba(2, 6, 23, 0.85); backdrop-filter: blur(16px); -webkit-backdrop-filter: blur(16px); z-index: 999999; align-items: center; justify-content: center; padding: 20px; font-family: 'Plus Jakarta Sans', system-ui, -apple-system, sans-serif;">
    <div style="background: #0f172a; border: 1.5px solid rgba(56, 189, 248, 0.35); border-radius: 20px; max-width: 860px; width: 100%; max-height: 90vh; display: flex; flex-direction: column; box-shadow: 0 25px 60px -15px rgba(2, 6, 23, 0.9), inset 0 1px 0 rgba(255, 255, 255, 0.12); color: #f8fafc; overflow: hidden; animation: legalModalFadeIn 0.25s cubic-bezier(0.16, 1, 0.3, 1);">
      
      <!-- MODAL ÜST BAŞLIK & SEKMELER -->
      <div style="padding: 20px 24px; border-bottom: 1px solid rgba(255, 255, 255, 0.1); background: linear-gradient(135deg, #060d1f 0%, #0f172a 100%); display: flex; justify-content: space-between; align-items: center; gap: 14px;">
        <div style="display: flex; align-items: center; gap: 10px;">
          <div style="width: 36px; height: 36px; border-radius: 10px; background: rgba(56, 189, 248, 0.15); border: 1px solid rgba(56, 189, 248, 0.35); display: flex; align-items: center; justify-content: center; color: #38bdf8; font-size: 18px;">
            ⚖️
          </div>
          <div>
            <h3 id="legal-modal-title" style="margin: 0; font-family: 'Outfit', sans-serif; font-size: 18px; font-weight: 800; color: #ffffff; letter-spacing: -0.01em;">DiyetKalfa™ Hukuki Bilgilendirme</h3>
            <div style="font-size: 12px; color: #94a3b8; margin-top: 2px;">Resmi Kurumsal Standartlar, Gizlilik ve Yasal Haklarınız</div>
          </div>
        </div>
        <button type="button" onclick="closeLegalModal()" style="background: rgba(255, 255, 255, 0.08); border: 1px solid rgba(255, 255, 255, 0.15); color: #cbd5e1; width: 34px; height: 34px; border-radius: 50%; font-size: 16px; cursor: pointer; display: flex; align-items: center; justify-content: center; transition: all 0.2s;">✕</button>
      </div>

      <!-- SEKMELER (TABS) -->
      <div style="display: flex; gap: 4px; padding: 10px 20px; background: rgba(2, 6, 23, 0.5); border-bottom: 1px solid rgba(255, 255, 255, 0.08); overflow-x: auto; flex-shrink: 0;">
        <button type="button" id="tab-btn-kvkk" onclick="switchLegalTab('kvkk')" class="legal-tab-btn active">KVKK Metni</button>
        <button type="button" id="tab-btn-terms" onclick="switchLegalTab('terms')" class="legal-tab-btn">Kullanıcı Sözleşmesi</button>
        <button type="button" id="tab-btn-cookies" onclick="switchLegalTab('cookies')" class="legal-tab-btn">Çerez Politikası</button>
        <button type="button" id="tab-btn-iso" onclick="switchLegalTab('iso')" class="legal-tab-btn">ISO 27001 Güvenlik</button>
        <button type="button" id="tab-btn-refund" onclick="switchLegalTab('refund')" class="legal-tab-btn">14 Gün İade İlkesi</button>
      </div>

      <!-- MODAL İÇERİK ALANI (KAYDIRILABİLİR) -->
      <div id="legal-modal-body" style="padding: 24px 28px; overflow-y: auto; font-size: 13.5px; line-height: 1.7; color: #cbd5e1;">
        <!-- Dinamik İçerik Buraya Gelecek -->
      </div>

      <!-- MODAL ALT BUTON & TEYİT ALANI -->
      <div style="padding: 16px 24px; border-top: 1px solid rgba(255, 255, 255, 0.1); background: #060d1f; display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 12px;">
        <div style="font-size: 12px; color: #64748b;">
          Güncelleme Tarihi: <strong>Ocak 2026</strong> • DiyetKalfa Hukuk ve Uyum Birimi
        </div>
        <div style="display: flex; gap: 10px; align-items: center;">
          <a href="javascript:void(0)" onclick="toggleAiChat(); return false;" target="_blank" rel="noopener noreferrer" style="color: #38bdf8; font-size: 12.5px; font-weight: 700; text-decoration: none; display: inline-flex; align-items: center; gap: 5px;">
            <span>💬 Hukuki Destek Hattı</span>
          </a>
          <button type="button" onclick="closeLegalModal()" style="background: linear-gradient(135deg, #0284c7 0%, #1d4ed8 100%); color: #ffffff; border: 1px solid rgba(125, 211, 252, 0.4); padding: 8px 20px; border-radius: 10px; font-weight: 700; font-size: 13px; cursor: pointer; transition: all 0.2s;">
            Anladım & Kapat
          </button>
        </div>
      </div>

    </div>
  </div>

  <style>
    @keyframes legalModalFadeIn {
      from { opacity: 0; transform: scale(0.96) translateY(8px); }
      to { opacity: 1; transform: scale(1) translateY(0); }
    }
    .legal-tab-btn {
      background: transparent;
      color: #94a3b8;
      border: 1px solid transparent;
      padding: 7px 14px;
      border-radius: 8px;
      font-size: 12.5px;
      font-weight: 600;
      cursor: pointer;
      white-space: nowrap;
      transition: all 0.2s ease;
      font-family: inherit;
    }
    .legal-tab-btn:hover {
      color: #ffffff;
      background: rgba(255, 255, 255, 0.05);
    }
    .legal-tab-btn.active {
      background: rgba(56, 189, 248, 0.12);
      color: #38bdf8;
      border-color: rgba(56, 189, 248, 0.35);
      font-weight: 700;
    }
    #legal-modal-body h4 {
      color: #ffffff;
      font-size: 15px;
      font-weight: 800;
      margin: 20px 0 8px 0;
      font-family: 'Outfit', sans-serif;
    }
    #legal-modal-body h4:first-child {
      margin-top: 0;
    }
    #legal-modal-body p {
      margin: 0 0 12px 0;
    }
    #legal-modal-body ul {
      margin: 0 0 14px 0;
      padding-left: 20px;
    }
    #legal-modal-body li {
      margin-bottom: 6px;
    }
    .legal-highlight-box {
      background: rgba(30, 58, 138, 0.3);
      border-left: 3px solid #38bdf8;
      padding: 12px 16px;
      border-radius: 8px;
      margin-bottom: 16px;
      font-size: 13px;
      color: #e0f2fe;
    }
  </style>
  `;

  var LEGAL_DOCS = {
    'kvkk': {
      title: 'DiyetKalfa™ Kişisel Verilerin Korunması (KVKK) Aydınlatma Metni',
      content: `
        <div class="legal-highlight-box">
          <strong>6698 Sayılı Kanun Kapsamında Bilgilendirme:</strong> DiyetKalfa™, sağlık çalışanları ve danışanlarına ait özel nitelikli kişisel sağlık verilerini en üst düzey şifreleme ve mevzuat uyumu ile korumayı taahhüt eder.
        </div>

        <h4>1. Veri Sorumlusu Sıfatı</h4>
        <p>6698 sayılı Kişisel Verilerin Korunması Kanunu ("KVKK") uyarınca, DiyetKalfa™ Beslenme Bilgi Sistemleri ("Şirket"), platform kullanıcıları ve kullanıcıların sisteme kaydettiği danışan verileri bakımından Veri İşleyen ve/veya Veri Sorumlusu sıfatıyla hareket etmektedir.</p>

        <h4>2. İşlenen Kişisel Veriler ve Sağlık Verileri</h4>
        <p>Platformumuz üzerinden sunulan klinik diyetisyen karar destek hizmetleri kapsamında aşağıdaki veri kategorileri işlenmektedir:</p>
        <ul>
          <li><strong>Kimlik ve İletişim Verileri:</strong> Ad, soyad, unvan, e-posta, telefon numarası (WhatsApp bildirimleri için).</li>
          <li><strong>Özel Nitelikli Sağlık Verileri:</strong> Danışanlara ait boy, kilo, bel/kalça çevre ölçümleri, InBody/Tanita vücut kompozisyonu analizleri, kan şekeri, insülin, HbA1c ve biyokimya laboratuvar sonuçları, besin alerjileri, kronik hastalık ve anamnez bilgileri.</li>
          <li><strong>Klinik İşlem Bilgileri:</strong> Diyet reçetesi içerikleri, makro ve mikro besin hedefleri, randevu tarihleri ve görüşme notları.</li>
        </ul>

        <h4>3. Kişisel Verilerin İşlenme Amaçları</h4>
        <p>Toplanan kişisel verileriniz;</p>
        <ul>
          <li>Dünya Sağlık Örgütü (DSÖ 2024) ve Sağlık Bakanlığı TÜBER protokollerine uygun kişiselleştirilmiş klinik diyet reçetelerinin hazırlanması,</li>
          <li>HOMA-IR insülin direnci ve metabolik durum simülasyonlarının gerçekleştirilmesi,</li>
          <li>Danışan randevularının takibi ve bilgilendirme SMS / WhatsApp mesajlarının iletilmesi,</li>
          <li>White-label formatında diyetisyen kaşeli PDF çıktılarının oluşturulması amaçlarıyla sınırlı olarak işlenir.</li>
        </ul>

        <h4>4. Veri Güvenliği ve Saklama</h4>
        <p>Sağlık verileri, üçüncü taraf reklam ağlarıyla veya veri simsarlarıyla <u>asla paylaşılmaz</u>. Veriler 256-bit SSL ve ISO/IEC 27001 standartlarında şifrelenir; yerel tarayıcı ortamında koruma altına alınır.</p>

        <h4>5. İlgili Kişinin Hakları (KVKK Madde 11)</h4>
        <p>Kişisel verilerinizin işlenip işlenmediğini öğrenme, işlenmişse bilgi talep etme, amaca uygun kullanılıp kullanılmadığını öğrenme ve verilerin silinmesini / anonim hale getirilmesini talep etme hakkına sahipsiniz. Başvurularınızı <strong>destek@diyetkalfa.com</strong> adresine veya <strong>7/24 Canlı Destek Masası</strong> numaralı destek hattımıza iletebilirsiniz.</p>
      `
    },

    'terms': {
      title: 'DiyetKalfa™ Kullanıcı Lisans Sözleşmesi (SaaS Şartları)',
      content: `
        <div class="legal-highlight-box">
          <strong>Hizmet ve Lisans Şartları:</strong> DiyetKalfa™ platformuna kayıt olan veya lisans paketi satın alan her kullanıcı bu sözleşme hükümlerini kabul etmiş sayılır.
        </div>

        <h4>1. Sözleşmenin Konusu ve Taraflar</h4>
        <p>İşbu Sözleşme, DiyetKalfa™ web ve bulut tabanlı klinik karar destek yazılımının kullanım koşullarını, kullanıcı (Diyetisyen / Klinik) ile DiyetKalfa™ arasındaki hak ve yükümlülükleri düzenler.</p>

        <h4>2. Lisans Hakları ve Kapsamı</h4>
        <p>Kullanıcıya, seçilen paket (Giriş, Temel, Profesyonel veya Sınırsız) doğrultusunda münhasır olmayan, devredilemez bir kullanım lisansı verilmektedir. Lisanslı kullanıcı, kendi logosunu PDF çıktılarında ve sistemde kullanma (White-Label) hakkına sahiptir.</p>

        <h4>3. Tıbbi Tavsiye ve Sorumluluk Sınırı</h4>
        <p>DiyetKalfa™, beslenme uzmanlarına ve hekimlere yardımcı bir <strong>klinik karar destek ve hesaplama motorudur</strong>. Sistemde üretilen makrolar, besin listeleri ve tahlil yorumları bir hekim teşhisi yerine geçmez; nihai klinik değerlendirme ve reçete onayı tamamen yetkili diyetisyenin mesleki sorumluluğundadır.</p>

        <h4>4. Hesap Güvenliği ve Yetkisiz Kullanım</h4>
        <p>Kullanıcı, lisans şifresini ve klinik erişim bilgilerini üçüncü kişilerle paylaşamaz. Her klinik hesabı, ilgili pakette belirtilen kullanıcı ve danışan kotalarına tabidir.</p>

        <h4>5. Hizmet Sürekliliği (SLA)</h4>
        <p>DiyetKalfa™, platformun %99.99 erişilebilirlik oranıyla çalışmasını sağlamak için gerekli teknik altyapı tedbirlerini almaktadır. Planlı bakım çalışmaları önceden bildirilir.</p>
      `
    },

    'cookies': {
      title: 'DiyetKalfa™ Çerez (Cookie) Politikası',
      content: `
        <div class="legal-highlight-box">
          <strong>Şeffaf Gizlilik İlkesi:</strong> Sitemizde kullanıcı deneyimini artırmak, klinik oturum güvenliğini sağlamak ve tercihlerinizi hatırlamak amacıyla zorunlu ve işlevsel çerezler kullanılmaktadır.
        </div>

        <h4>1. Çerez Nedir?</h4>
        <p>Çerezler, web sitemizi ziyaret ettiğinizde bilgisayarınızda veya mobil cihazınızda saklanan küçük metin dosyalarıdır. Platformumuzda üçüncü taraf izleme çerezleri veya reklam çerezleri <u>bulunmamaktadır</u>.</p>

        <h4>2. Kullandığımız Çerez Türleri</h4>
        <ul>
          <li><strong>Zorunlu Çerezler:</strong> Klinik oturumunuzun açık kalmasını sağlayan, lisans durumunuzu teyit eden ve güvenlik katmanlarını çalıştıran çerezlerdir. Bu çerezler olmadan sistem işlev göremez.</li>
          <li><strong>İşlevsel Çerezler:</strong> Reçete hazırlarken seçtiğiniz besin filtrelerini, son açtığınız sekmeleri ve klinik tercihlerinizi tarayıcınızda yerel olarak (localStorage) hatırlar.</li>
          <li><strong>Performans Çerezleri:</strong> Sayfa yükleme hızlarını optimize etmek ve olası teknik hataları tespit etmek amacıyla anonim olarak kullanılan ölçüm çerezleridir.</li>
        </ul>

        <h4>3. Çerezlerin Yönetimi ve Silinmesi</h4>
        <p>Tarayıcınızın ayarlar menüsünden (Chrome, Safari, Edge, Firefox vb.) dilediğiniz an çerezleri temizleyebilir veya engelleyebilirsiniz. Ancak zorunlu çerezleri engellemeniz durumunda klinik panel oturumunuz doğru şekilde açılamayabilir.</p>
      `
    },

    'iso': {
      title: 'DiyetKalfa™ ISO/IEC 27001 Bilgi Güvenliği Standardı',
      content: `
        <div class="legal-highlight-box">
          <strong>Uluslararası Güvenlik Standartları:</strong> DiyetKalfa™, sağlık sektöründeki hassas danışan verilerinin korunmasında ISO/IEC 27001:2022 Bilgi Güvenliği Yönetim Sistemi prensiplerini eksiksiz uygular.
        </div>

        <h4>1. Bilgi Güvenliği Politikamız</h4>
        <p>DiyetKalfa™, kliniklerde üretilen diyet listelerinin, hasta tahlil sonuçlarının ve kişisel verilerin gizliliğini (Confidentiality), bütünlüğünü (Integrity) ve erişilebilirliğini (Availability) güvence altına almayı temel ilke edinmiştir.</p>

        <h4>2. Uygulanan Güvenlik Tedbirleri</h4>
        <ul>
          <li><strong>Uçtan Uca Şifreleme:</strong> Tüm veri trafiği 256-Bit SSL / TLS 1.3 protokolleri ile şifreli olarak taşınır.</li>
          <li><strong>Sağlık Verisi Yalıtımı:</strong> Danışanlara ait laboratuvar ve kilo ölçüm verileri, harici sunucu havuzlarına aktarılmaksızın yüksek korumalı yerel bellek mimarisiyle işlenir.</li>
          <li><strong>Yetki ve Rol Yönetimi:</strong> Klinik personeli yalnızca kendi yetkilendirildiği modüllere ve danışan dosyalarına erişebilir.</li>
          <li><strong>Yedekleme Güvencesi:</strong> Danışan kayıtları tek tıkla Excel/JSON olarak güvenle dışa aktarılabilir ve diyetisyen tarafından kendi güvenli arşivinde saklanabilir.</li>
        </ul>

        <h4>3. Bağımsız Denetim ve Uyumluluk</h4>
        <p>Platform altyapımız ulusal ve uluslararası veri koruma mevzuatlarına (KVKK, GDPR, DSÖ Standartları) tam uyumlu olarak sürekli denetlenmekte ve güncellenmektedir.</p>
      `
    },

    'refund': {
      title: 'DiyetKalfa™ 14 Gün Koşulsuz Para İade İlkesi',
      content: `
        <div class="legal-highlight-box">
          <strong>%100 Memnuniyet Güvencesi:</strong> Satın aldığınız herhangi bir DiyetKalfa™ lisans paketinden ilk 14 gün içerisinde hiçbir gerekçe göstermeksizin vazgeçebilir, paranızı eksiksiz iade alabilirsiniz.
        </div>

        <h4>1. İade Hakkının Kapsamı</h4>
        <p>DiyetKalfa™ web sitesi üzerinden havale, EFT veya yetkili ödeme kanallarıyla satın alınan tüm aylık ve yıllık lisans paketleri 14 Günlük Koşulsuz İade Garantisi kapsamındadır.</p>

        <h4>2. İade Süreci Nasıl İşler?</h4>
        <p>İade talebinde bulunmak için lisans satın alma tarihinizden itibaren 14 gün içinde;</p>
        <ul>
          <li><strong>7/24 Canlı Destek Masası</strong> WhatsApp hattımıza sipariş bilginizi yazarak, veya</li>
          <li><strong>destek@diyetkalfa.com</strong> adresine e-posta göndererek</li>
        </ul>
        <p>talebinizi iletmeniz yeterlidir. Herhangi bir bürokrasi veya ek şart aranmaz.</p>

        <h4>3. Ücret İadesinin Gerçekleşmesi</h4>
        <p>Talebiniz incelenip onaylandığı anda, ödediğiniz tutar 1-3 iş günü içerisinde ödeme yaptığınız banka hesabınıza veya IBAN numaranıza kesintisiz olarak iade edilir.</p>
      `
    }
  };

  // Modalı Sayfaya Ekle
  function injectLegalModal() {
    if (!document.getElementById('modal-legal-doc')) {
      var div = document.createElement('div');
      div.innerHTML = legalModalHtml;
      document.body.appendChild(div);
    }
  }

  window.openLegalModal = function(docType) {
    injectLegalModal();
    var modal = document.getElementById('modal-legal-doc');
    if (!modal) return;

    docType = docType || 'kvkk';
    switchLegalTab(docType);
    modal.style.display = 'flex';
    document.body.style.overflow = 'hidden';
  };

  window.closeLegalModal = function() {
    var modal = document.getElementById('modal-legal-doc');
    if (modal) {
      modal.style.display = 'none';
      document.body.style.overflow = '';
    }
  };

  window.switchLegalTab = function(docType) {
    var doc = LEGAL_DOCS[docType] || LEGAL_DOCS['kvkk'];
    var titleEl = document.getElementById('legal-modal-title');
    var bodyEl = document.getElementById('legal-modal-body');

    if (titleEl) titleEl.textContent = doc.title;
    if (bodyEl) {
      bodyEl.innerHTML = doc.content;
      bodyEl.scrollTop = 0;
    }

    var tabIds = ['kvkk', 'terms', 'cookies', 'iso', 'refund'];
    tabIds.forEach(function(t) {
      var btn = document.getElementById('tab-btn-' + t);
      if (btn) {
        if (t === docType) {
          btn.classList.add('active');
        } else {
          btn.classList.remove('active');
        }
      }
    });
  };

  // Sayfa yüklendiğinde modalı hazırla
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', injectLegalModal);
  } else {
    injectLegalModal();
  }

})();
