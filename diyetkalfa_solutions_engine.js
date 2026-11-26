/* DIYETKALFA - 14 KLİNİK ÇÖZÜM MOTORU VE İNTERAKTİF ARAÇLAR                  */
/* ========================================================================== */

function toggleSolutionsMenu(e) {
  if (e) {
    e.preventDefault();
    e.stopPropagation();
  }
  var panel = document.getElementById('solutions-dropdown-panel');
  var chevron = document.getElementById('solutions-chevron');
  if (!panel) return;

  var isVisible = panel.style.display === 'block';
  panel.style.display = isVisible ? 'none' : 'block';
  if (chevron) {
    chevron.style.transform = isVisible ? 'rotate(0deg)' : 'rotate(180deg)';
  }
}

// Dışarı tıklandığında menüyü kapat
document.addEventListener('click', function(e) {
  var container = document.querySelector('.dropdown-solutions-container');
  var panel = document.getElementById('solutions-dropdown-panel');
  var chevron = document.getElementById('solutions-chevron');
  if (panel && container && !container.contains(e.target)) {
    panel.style.display = 'none';
    if (chevron) chevron.style.transform = 'rotate(0deg)';
  }
});

var SOLUTIONS_DATA = {
  'diet_program': {
    icon: '🥗',
    title: 'Diyet Programı Hazırlama',
    desc: 'Kişiye özel 7 günlük reçeteler, DSÖ 2024 standartları ve akıllı besin değişim modeli',
    render: function() {
      return `
        <div style="background: #faf8f4; border: 1.5px solid #e6ded1; border-radius: 16px; padding: 18px; margin-bottom: 16px;">
          <h4 style="font-size: 15px; font-weight: 800; color: #163b2c; margin-bottom: 10px;">⚡ Hızlı Klinik Reçete Simülatörü</h4>
          <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(130px, 1fr)); gap: 10px; margin-bottom: 12px;">
            <div>
              <label style="font-size: 11px; font-weight: 700; color: #685951;">Hedef Protokol</label>
              <select id="sol-diet-proto" style="width: 100%; padding: 8px; border-radius: 8px; border: 1.5px solid #d8cdbc; font-size: 12.5px; font-weight: 700;">
                <option value="insulin">İnsülin Direnci (HOMA-IR > 2.5)</option>
                <option value="kilo">Kilo Verme & Yağ Yakımı</option>
                <option value="sporcu">Sporcu Hipertrofi (Yüksek Protein)</option>
                <option value="pcos">PCOS Hormonal Denge</option>
                <option value="if">Aralıklı Oruç (IF 16:8)</option>
              </select>
            </div>
            <div>
              <label style="font-size: 11px; font-weight: 700; color: #685951;">Kalori Limiti</label>
              <input type="number" id="sol-diet-cal" value="1650" style="width: 100%; padding: 8px; border-radius: 8px; border: 1.5px solid #d8cdbc; font-size: 12.5px; font-weight: 700;">
            </div>
          </div>
          <button type="button" onclick="runSolDietGen()" style="background: #163b2c; color: #ffffff; border: none; padding: 9px 16px; border-radius: 8px; font-weight: 800; font-size: 13px; cursor: pointer;">Örnek Günlük Menü Üret</button>
          
          <div id="sol-diet-preview-box" style="margin-top: 14px; background: #ffffff; border: 1px solid #e6ded1; border-radius: 12px; padding: 14px;">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px;">
              <strong style="color: #170c07; font-size: 13px;">1. Gün: Metabolik Dengeleme Menüsü</strong>
              <span style="background: #edf5f0; color: #163b2c; font-size: 11px; font-weight: 800; padding: 2px 8px; border-radius: 6px;">1.650 kcal</span>
            </div>
            <ul style="font-size: 12.5px; color: #475569; line-height: 1.7; padding-left: 18px; margin: 0;">
              <li><strong>Kahvaltı (09:00):</strong> 2 adet haşlanmış organik yumurta, 60g lor peyniri, bol roka-maydanoz (limonlu), 1 dilim siyez ekmeği</li>
              <li><strong>Ara Öğün (11:30):</strong> 1 fincan yeşil çay + 10 adet çiğ badem (E vitamini desteği)</li>
              <li><strong>Öğle (13:30):</strong> 150g fırında levrek fileto, zeytinyağlı ızgara brokoli & kinoa salatası</li>
              <li><strong>İkindi (16:30):</strong> 1 kase laktozsuz probiyotik yoğurt + 1 tatlı kaşığı chia tohumu + toz tarçın</li>
              <li><strong>Akşam (19:30):</strong> Fırında Somon & Kuşkonmazlı Roka Salatası (Hafif akşam sindirimi)</li>
              <li><strong>Gece (21:30):</strong> 1 bardak ılık rezene & papatya çayı (Melatonin ve uyku protokolü)</li>
            </ul>
          </div>
        </div>
      `;
    }
  },

  'ai_assistant': {
    icon: '🤖',
    title: 'Yapay Zeka Asistanı',
    desc: 'Klinik vaka analizi, besin etkileşimleri ve kanıta dayalı diyetisyen sohbet botu',
    render: function() {
      return `
        <div style="background: #faf8f4; border: 1.5px solid #e6ded1; border-radius: 16px; padding: 16px;">
          <div style="margin-bottom: 12px; display: flex; flex-wrap: wrap; gap: 6px;">
            <span style="font-size: 11px; font-weight: 800; color: #685951; width: 100%; margin-bottom: 2px;">ÖNERİLEN KLİNİK SORULAR (Tıklayın):</span>
            <button type="button" onclick="askAiAssistant('HOMA-IR 3.2 olan 34 yaş kadın danışana ara öğün ne yazmalıyım?')" style="background: #ffffff; border: 1px solid #d8cdbc; padding: 4px 10px; border-radius: 999px; font-size: 11.5px; color: #170c07; font-weight: 700; cursor: pointer;">🩸 HOMA-IR 3.2 Ara Öğün</button>
            <button type="button" onclick="askAiAssistant('Hashimoto tiroiditi olan hastada brokoli ve karnabahar tüketimi nasıl olmalı?')" style="background: #ffffff; border: 1px solid #d8cdbc; padding: 4px 10px; border-radius: 999px; font-size: 11.5px; color: #170c07; font-weight: 700; cursor: pointer;">🥑 Hashimoto Guatrojenler</button>
            <button type="button" onclick="askAiAssistant('80 kg maraton sporcusu için yarış öncesi glikojen yükleme makroları')" style="background: #ffffff; border: 1px solid #d8cdbc; padding: 4px 10px; border-radius: 999px; font-size: 11.5px; color: #170c07; font-weight: 700; cursor: pointer;">🏃 Maratoncu Makroları</button>
          </div>

          <div id="ai-chat-history" style="background: #ffffff; border: 1px solid #e6ded1; border-radius: 12px; padding: 14px; min-height: 150px; max-height: 220px; overflow-y: auto; font-size: 13px; margin-bottom: 12px;">
            <div style="background: #edf5f0; border: 1px solid #2e5e4b; border-radius: 10px; padding: 10px 12px; color: #163b2c; margin-bottom: 8px;">
              <strong>🤖 DiyetKalfa AI:</strong> Merhaba Meslektaşım! Danışanlarınızın tahlil değerleri, kronik hastalık protokolleri veya özel besin değişimleri hakkında bana dilediğiniz klinik soruyu sorabilirsiniz.
            </div>
          </div>

          <div style="display: flex; gap: 8px;">
            <input type="text" id="ai-sim-input" placeholder="Klinik sorunuzu yazın (Örn: PCOS için en iyi inositol dozu...)" style="flex: 1; padding: 10px 14px; border-radius: 10px; border: 1.5px solid #d8cdbc; font-size: 13px; outline: none;" onkeydown="if(event.key==='Enter') sendLegacyAiSimulationMessage();">
            <button type="button" onclick="sendLegacyAiSimulationMessage()" style="background: #163b2c; color: #ffffff; border: none; padding: 10px 18px; border-radius: 10px; font-weight: 800; font-size: 13px; cursor: pointer;">Gönder</button>
          </div>
        </div>
      `;
    }
  },

  'clinic_mgmt': {
    icon: '🏢',
    title: 'Klinik Yönetimi & White-Label',
    desc: 'Kliniğinizin adını, logosunu ve unvanını tüm reçete ve çıktılarda tescilleyin',
    render: function() {
      return `
        <div style="background: #faf8f4; border: 1.5px solid #e6ded1; border-radius: 16px; padding: 18px;">
          <h4 style="font-size: 15px; font-weight: 800; color: #170c07; margin-bottom: 12px;">Kurumsal Marka ve White-Label Kimliği</h4>
          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 12px; margin-bottom: 14px;">
            <div>
              <label style="font-size: 11.5px; font-weight: 700; color: #685951;">Klinik / Merkez Adı</label>
              <input type="text" id="demo-clinic-name" value="DiyetKalfa Sağlıklı Yaşam Merkezi" style="width: 100%; padding: 9px 12px; border-radius: 8px; border: 1.5px solid #d8cdbc; font-size: 13px; font-weight: 700;">
            </div>
            <div>
              <label style="font-size: 11.5px; font-weight: 700; color: #685951;">Yetkili Diyetisyen & Unvan</label>
              <input type="text" id="demo-dietitian-name" value="Uzm. Dyt. Selin Yılmaz" style="width: 100%; padding: 9px 12px; border-radius: 8px; border: 1.5px solid #d8cdbc; font-size: 13px; font-weight: 700;">
            </div>
          </div>
          <div style="background: #ffffff; border: 1.5px dashed #163b2c; border-radius: 12px; padding: 14px; text-align: center; margin-bottom: 14px;">
            <span style="font-size: 24px;">🏷️</span>
            <div style="font-size: 13px; font-weight: 800; color: #163b2c; margin-top: 4px;">Kendi Logonuzla PDF Reçete ve WhatsApp Başlığı</div>
            <p style="font-size: 11.5px; color: #685951; margin: 2px 0 0;">Yazdırdığınız tüm diyet reçetelerinin ve WhatsApp mesajlarının başında kendi logonuz ve unvanınız yer alır.</p>
          </div>
          <button type="button" onclick="alert('✅ Klinik ayarlarınız başarıyla simüle edildi!');" style="background: #163b2c; color: #fff; border: none; padding: 10px 18px; border-radius: 10px; font-weight: 800; font-size: 13px; cursor: pointer;">Klinik Markasını Kaydet</button>
        </div>
      `;
    }
  },

  'client_tracking': {
    icon: '👥',
    title: 'Diyetisyen Danışan Takip Programı',
    desc: 'Danışanlarınızın kilo grafiği, vücut ölçümleri, tahlil geçmişi ve uyum puanı',
    render: function() {
      return `
        <div style="background: #faf8f4; border: 1.5px solid #e6ded1; border-radius: 16px; padding: 16px;">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 14px;">
            <div style="display: flex; align-items: center; gap: 10px;">
              <div style="width: 40px; height: 40px; border-radius: 50%; background: #163b2c; color: #fff; display: flex; align-items: center; justify-content: center; font-weight: 900;">AY</div>
              <div>
                <strong style="font-size: 14px; color: #170c07;">Ahmet Yılmaz (32 Yaş)</strong>
                <div style="font-size: 11.5px; color: #685951;">Hedef: Kilo Verme & İnsülin Direnci • 4. Hafta</div>
              </div>
            </div>
            <span style="background: #edf5f0; color: #163b2c; font-size: 12px; font-weight: 800; padding: 4px 10px; border-radius: 8px;">Uyum: %94</span>
          </div>

          <div style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 8px; margin-bottom: 14px; text-align: center;">
            <div style="background: #fff; border: 1px solid #e6ded1; border-radius: 10px; padding: 10px;">
              <div style="font-size: 10.5px; color: #685951; font-weight: 700;">BAŞLANGIÇ</div>
              <div style="font-size: 16px; font-weight: 900; color: #170c07;">88.5 kg</div>
            </div>
            <div style="background: #fff; border: 1px solid #e6ded1; border-radius: 10px; padding: 10px;">
              <div style="font-size: 10.5px; color: #685951; font-weight: 700;">GÜNCEL</div>
              <div style="font-size: 16px; font-weight: 900; color: #163b2c;">81.2 kg</div>
            </div>
            <div style="background: #fff; border: 1px solid #e6ded1; border-radius: 10px; padding: 10px;">
              <div style="font-size: 10.5px; color: #685951; font-weight: 700;">VERİLEN KİLO</div>
              <div style="font-size: 16px; font-weight: 900; color: #94593f;">-7.3 kg</div>
            </div>
            <div style="background: #fff; border: 1px solid #e6ded1; border-radius: 10px; padding: 10px;">
              <div style="font-size: 10.5px; color: #685951; font-weight: 700;">HEDEF</div>
              <div style="font-size: 16px; font-weight: 900; color: #170c07;">75.0 kg</div>
            </div>
          </div>

          <div style="background: #ffffff; border: 1px solid #e6ded1; border-radius: 12px; padding: 12px; font-size: 12px; color: #475569;">
            <strong>📝 Son Seans Klinik Notu (21 Kasım):</strong> Açlık insülini 18'den 11'e geriledi. Akşam hafif menüsüne sadık kalındı. İkinci ay için porsiyonlar 1.700 kcal bandına revize edildi.
          </div>
        </div>
      `;
    }
  },

  'online_diet': {
    icon: '💻',
    title: 'Online Diyetisyen Programı',
    desc: 'Dünyanın her yerindeki danışanlarınıza uzaktan seans ve otomatik WhatsApp takibi',
    render: function() {
      return `
        <div style="background: #faf8f4; border: 1.5px solid #e6ded1; border-radius: 16px; padding: 18px;">
          <h4 style="font-size: 14.5px; font-weight: 800; color: #170c07; margin-bottom: 12px;">🌐 Uzaktan Danışan & Video Seans Konsolu</h4>
          <div style="display: flex; flex-direction: column; gap: 10px; margin-bottom: 14px;">
            <div style="background: #ffffff; border: 1px solid #e6ded1; border-radius: 10px; padding: 12px; display: flex; justify-content: space-between; align-items: center;">
              <div>
                <strong style="font-size: 13px; color: #170c07;">Google Meet / Zoom Seans Bağlantısı</strong>
                <div style="font-size: 11.5px; color: #685951;">Tek tıkla danışana özel şifreli görüşme linki oluşturun</div>
              </div>
              <button type="button" onclick="alert('🔗 Canlı Seans Linki Oluşturuldu: https://meet.google.com/dyt-online-seans');" style="background: #163b2c; color: #fff; border: none; padding: 7px 14px; border-radius: 8px; font-size: 12px; font-weight: 800; cursor: pointer;">Link Üret</button>
            </div>
            <div style="background: #ffffff; border: 1px solid #e6ded1; border-radius: 10px; padding: 12px; display: flex; justify-content: space-between; align-items: center;">
              <div>
                <strong style="font-size: 13px; color: #170c07;">Otomatik WhatsApp Seans Hatırlatıcı</strong>
                <div style="font-size: 11.5px; color: #685951;">Seansa 2 saat kala danışanın telefonuna otomatik mesaj gider</div>
              </div>
              <span style="background: #edf5f0; color: #163b2c; font-size: 11px; font-weight: 800; padding: 4px 8px; border-radius: 6px;">Aktif</span>
            </div>
          </div>
        </div>
      `;
    }
  },

  'excel_tracking': {
    icon: '📊',
    title: 'Excel Danışan Takip & Akıllı Tablo',
    desc: 'Excel dosyalarınızı doğrudan yükleyin, satır içi düzenleyin ve tek tıkla SMS gönderin',
    render: function() {
      return `
        <div style="background: #faf8f4; border: 1.5px solid #e6ded1; border-radius: 16px; padding: 16px;">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px;">
            <strong style="font-size: 14px; color: #170c07;">📊 Excel Danışan Çizelgesi (Önizleme)</strong>
            <span style="background: #dcfce7; color: #166534; font-size: 11px; font-weight: 800; padding: 3px 8px; border-radius: 6px;">Excel/CSV Uyumlu</span>
          </div>
          <div style="overflow-x: auto; background: #ffffff; border: 1px solid #e6ded1; border-radius: 8px; margin-bottom: 10px;">
            <table style="width: 100%; border-collapse: collapse; font-size: 11.5px;">
              <tr style="background: #163b2c; color: #fff; font-weight: 800;">
                <th style="padding: 6px 10px;">Danışan</th>
                <th style="padding: 6px 10px;">Telefon</th>
                <th style="padding: 6px 10px;">Başlangıç</th>
                <th style="padding: 6px 10px;">Güncel</th>
                <th style="padding: 6px 10px;">Fark</th>
                <th style="padding: 6px 10px;">Protokol</th>
              </tr>
              <tr style="border-bottom: 1px solid #f4efe6;">
                <td style="padding: 6px 10px; font-weight: 800; color: #163b2c;">Zehra Bölük</td>
                <td style="padding: 6px 10px;">0555 123 45 67</td>
                <td style="padding: 6px 10px;">78.5 kg</td>
                <td style="padding: 6px 10px; font-weight: 800;">72.8 kg</td>
                <td style="padding: 6px 10px;"><span style="color:#166534; font-weight:800;">-5.7 kg 🔻</span></td>
                <td style="padding: 6px 10px;">HOMA-IR / Düşük GI</td>
              </tr>
              <tr>
                <td style="padding: 6px 10px; font-weight: 800; color: #163b2c;">Murat Korkmaz</td>
                <td style="padding: 6px 10px;">0555 987 65 43</td>
                <td style="padding: 6px 10px;">96.0 kg</td>
                <td style="padding: 6px 10px; font-weight: 800;">91.2 kg</td>
                <td style="padding: 6px 10px;"><span style="color:#166534; font-weight:800;">-4.8 kg 🔻</span></td>
                <td style="padding: 6px 10px;">Akdeniz & Defisit</td>
              </tr>
            </table>
          </div>
          <p style="font-size: 12px; color: #685951; line-height: 1.5; margin: 0;">
            Excel alışkanlığınızı bozmadan danışanlarınızı takip edebilir; tek tıkla seans takvimine randevu ekleyip danışanınıza otomatik SMS gönderebilirsiniz.
          </p>
        </div>
      `;
    }
  },

  'appointments': {
    icon: '📅',
    title: 'Akıllı Randevu Takvimi & Otomatik SMS',
    desc: 'Haftalık seans ajandası, rehber bağlama ve danışana anında onay/hatırlatma SMS bildirimi',
    render: function() {
      return `
        <div style="background: #faf8f4; border: 1.5px solid #e6ded1; border-radius: 16px; padding: 16px;">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px;">
            <strong style="font-size: 14px; color: #170c07;">📅 Akıllı Randevu & Seans Ajandası</strong>
            <span style="background: #dcfce7; color: #166534; font-size: 11px; font-weight: 800; padding: 3px 8px; border-radius: 6px;">SMS Onayı Aktif</span>
          </div>
          <div style="display: flex; flex-direction: column; gap: 8px;">
            <div style="background: #ffffff; border-left: 4px solid #163b2c; border-radius: 8px; padding: 10px 14px; display: flex; justify-content: space-between; align-items: center; border-top: 1px solid #e6ded1; border-right: 1px solid #e6ded1; border-bottom: 1px solid #e6ded1;">
              <div>
                <strong style="font-size: 13px; color: #170c07;">10:00 - Zeynep Kaya (Online)</strong>
                <div style="font-size: 11.5px; color: #685951;">2. Kontrol Seansı • SMS Bildirimi İletildi (✓)</div>
              </div>
              <span style="background: #edf5f0; color: #163b2c; font-size: 11px; font-weight: 800; padding: 3px 8px; border-radius: 6px;">SMS İletildi</span>
            </div>
            <div style="background: #ffffff; border-left: 4px solid #94593f; border-radius: 8px; padding: 10px 14px; display: flex; justify-content: space-between; align-items: center; border-top: 1px solid #e6ded1; border-right: 1px solid #e6ded1; border-bottom: 1px solid #e6ded1;">
              <div>
                <strong style="font-size: 13px; color: #170c07;">14:30 - Caner Demir (Yüz Yüze)</strong>
                <div style="font-size: 11.5px; color: #685951;">İlk Görüşme & Anamnez • Rehberden Aktarıldı</div>
              </div>
              <span style="background: #fbf4f0; color: #94593f; font-size: 11px; font-weight: 800; padding: 3px 8px; border-radius: 6px;">Onay Bekliyor</span>
            </div>
          </div>
          <div style="margin-top: 10px; font-size: 11.5px; color: #166534; font-weight: 700;">
            💬 Yeni randevu oluşturulduğunda danışanınızın cep telefonuna otomatik SMS gider.
          </div>
        </div>
      `;
    }
  },

  'enabiz': {
    icon: '🏥',
    title: 'e-Nabız Uyumlu Diyetisyen Yazılımı',
    desc: 'Sağlık Bakanlığı laboratuvar tetkik formatlarıyla biyokimya tahlili eşleştirme',
    render: function() {
      return `
        <div style="background: #faf8f4; border: 1.5px solid #e6ded1; border-radius: 16px; padding: 18px;">
          <h4 style="font-size: 14.5px; font-weight: 800; color: #170c07; margin-bottom: 10px;">🩸 e-Nabız Tahlil İçe Aktarma & HOMA-IR Simülatörü</h4>
          <p style="font-size: 12px; color: #685951; margin-bottom: 12px;">Danışanın e-Nabız laboratuvar raporunu otomatik ayrıştırır, insülin direnci ve karaciğer enzimlerini hesaplar.</p>
          
          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 10px; margin-bottom: 12px;">
            <div>
              <label style="font-size: 11px; font-weight: 700; color: #685951;">Açlık Glikoz (mg/dL)</label>
              <input type="number" id="sol-enabiz-glikoz" value="108" style="width: 100%; padding: 8px; border-radius: 8px; border: 1.5px solid #d8cdbc; font-size: 13px; font-weight: 700;">
            </div>
            <div>
              <label style="font-size: 11px; font-weight: 700; color: #685951;">Açlık İnsülin (µU/mL)</label>
              <input type="number" id="sol-enabiz-insulin" value="16.5" style="width: 100%; padding: 8px; border-radius: 8px; border: 1.5px solid #d8cdbc; font-size: 13px; font-weight: 700;">
            </div>
          </div>

          <button type="button" onclick="calcSolEnabizHoma()" style="background: #163b2c; color: #ffffff; border: none; padding: 9px 18px; border-radius: 8px; font-weight: 800; font-size: 13px; cursor: pointer;">e-Nabız Analizini Yap</button>

          <div id="sol-enabiz-result" style="margin-top: 14px; background: #ffffff; border: 1.5px solid #e6ded1; border-radius: 12px; padding: 14px;">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 6px;">
              <strong style="color: #170c07; font-size: 13px;">HOMA-IR Skoru:</strong>
              <span id="sol-enabiz-homa-val" style="background: #fbf4f0; color: #94593f; font-weight: 900; font-size: 14px; padding: 3px 10px; border-radius: 6px;">4.40 (Yüksek İnsülin Direnci)</span>
            </div>
            <p style="font-size: 11.5px; color: #685951; line-height: 1.5; margin: 0;">
              <strong>Klinik Yorum:</strong> HOMA-IR > 2.5 eşiği aşılmıştır. Danışanda belirgin hiperinsülinemi mevcuttur. Düşük glisemik indeksli fonksiyonel beslenme, krom desteği ve akşam öğününde hafif sebze protokolü önerilir.
            </p>
          </div>
        </div>
      `;
    }
  },

  'anamnez': {
    icon: '📋',
    title: 'Dijital Onam ve Anamnez Formu',
    desc: 'Danışanların cep telefonundan tek tıkla doldurabileceği KVKK onaylı anamnez formu',
    render: function() {
      return `
        <div style="background: #faf8f4; border: 1.5px solid #e6ded1; border-radius: 16px; padding: 18px;">
          <h4 style="font-size: 14.5px; font-weight: 800; color: #170c07; margin-bottom: 12px;">📱 Danışan Dijital Anamnez Formu</h4>
          <div style="display: flex; flex-direction: column; gap: 10px; margin-bottom: 14px;">
            <div style="background: #ffffff; border: 1px solid #e6ded1; border-radius: 10px; padding: 12px;">
              <strong style="font-size: 12.5px; color: #170c07;">1. Sağlık ve Tıbbi Geçmiş</strong>
              <div style="font-size: 11.5px; color: #685951; margin-top: 2px;">Tansiyon, tiroid, diyabet, gıda alerjileri ve kullanılan ilaçlar</div>
            </div>
            <div style="background: #ffffff; border: 1px solid #e6ded1; border-radius: 10px; padding: 12px;">
              <strong style="font-size: 12.5px; color: #170c07;">2. Beslenme ve Yaşam Alışkanlıkları</strong>
              <div style="font-size: 11.5px; color: #685951; margin-top: 2px;">Su tüketimi, uyku saatleri, alkol/sigara, sevilen ve sevilmeyen besinler</div>
            </div>
            <div style="background: #ffffff; border: 1px solid #e6ded1; border-radius: 10px; padding: 12px;">
              <strong style="font-size: 12.5px; color: #170c07;">3. KVKK ve Açık Rıza Onamı</strong>
              <div style="font-size: 11.5px; color: #685951; margin-top: 2px;">Kişisel sağlık verilerinin klinik takibi için yasal dijital onay</div>
            </div>
          </div>
          <button type="button" onclick="alert('📲 Danışana Gönderilecek Anamnez Form Linki Kopyalandı:\nhttps://diyetkalfa.com/anamnez/dr-selin-yilmaz');" style="background: #163b2c; color: #fff; border: none; padding: 10px 18px; border-radius: 10px; font-weight: 800; font-size: 13px; cursor: pointer;">WhatsApp Form Linki Al</button>
        </div>
      `;
    }
  },

  'website': {
    icon: '🌐',
    title: 'Diyetisyen Web Sitesi & BioLink',
    desc: 'Kliniğinize özel alan adı ile profesyonel web sitesi ve Instagram Bio linki',
    render: function() {
      return `
        <div style="background: #faf8f4; border: 1.5px solid #e6ded1; border-radius: 16px; padding: 18px;">
          <h4 style="font-size: 14.5px; font-weight: 800; color: #170c07; margin-bottom: 12px;">Kliniğinize Özel Canlı BioLink Vitrini</h4>
          <div style="background: #ffffff; border: 1.5px solid #e6ded1; border-radius: 16px; padding: 18px; max-width: 380px; margin: 0 auto 14px; text-align: center; box-shadow: 0 4px 15px rgba(0,0,0,0.05);">
            <div style="width: 64px; height: 64px; border-radius: 50%; background: #163b2c; color: #fff; display: flex; align-items: center; justify-content: center; font-size: 26px; margin: 0 auto 10px;">🩺</div>
            <h3 style="font-size: 16px; font-weight: 900; color: #170c07; margin: 0;">Uzm. Dyt. Selin Yılmaz</h3>
            <p style="font-size: 12px; color: #685951; margin: 4px 0 14px;">Klinik & Fonksiyonel Beslenme Uzmanı</p>
            
            <div style="display: flex; flex-direction: column; gap: 8px;">
              <a href="javascript:void(0)" style="background: #edf5f0; border: 1px solid #2e5e4b; color: #163b2c; padding: 10px; border-radius: 10px; text-decoration: none; font-weight: 800; font-size: 12.5px;">📅 Online Randevu Al</a>
              <a href="javascript:void(0)" style="background: #fbf4f0; border: 1px solid #e6d3c9; color: #94593f; padding: 10px; border-radius: 10px; text-decoration: none; font-weight: 800; font-size: 12.5px;">💬 WhatsApp ile Danış</a>
              <a href="javascript:void(0)" style="background: #faf8f4; border: 1px solid #e6ded1; color: #170c07; padding: 10px; border-radius: 10px; text-decoration: none; font-weight: 800; font-size: 12.5px;">🥗 7 Günlük Örnek Diyet Listesi</a>
            </div>
          </div>
        </div>
      `;
    }
  },

  'calorie': {
    icon: '🔢',
    title: 'Kalori ve Makro Hesaplama Motoru',
    desc: 'Dünya Sağlık Örgütü ve Mifflin-St Jeor bilimsel BMR & TDEE hesaplayıcısı',
    render: function() {
      return `
        <div style="background: #faf8f4; border: 1.5px solid #e6ded1; border-radius: 16px; padding: 18px;">
          <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(110px, 1fr)); gap: 10px; margin-bottom: 12px;">
            <div>
              <label style="font-size: 11px; font-weight: 700; color: #685951;">Cinsiyet</label>
              <select id="sol-calc-gender" style="width: 100%; padding: 8px; border-radius: 8px; border: 1.5px solid #d8cdbc; font-size: 12.5px; font-weight: 700;">
                <option value="k">Kadın</option>
                <option value="e">Erkek</option>
              </select>
            </div>
            <div>
              <label style="font-size: 11px; font-weight: 700; color: #685951;">Yaş</label>
              <input type="number" id="sol-calc-age" value="30" style="width: 100%; padding: 8px; border-radius: 8px; border: 1.5px solid #d8cdbc; font-size: 12.5px; font-weight: 700;">
            </div>
            <div>
              <label style="font-size: 11px; font-weight: 700; color: #685951;">Boy (cm)</label>
              <input type="number" id="sol-calc-height" value="168" style="width: 100%; padding: 8px; border-radius: 8px; border: 1.5px solid #d8cdbc; font-size: 12.5px; font-weight: 700;">
            </div>
            <div>
              <label style="font-size: 11px; font-weight: 700; color: #685951;">Kilo (kg)</label>
              <input type="number" id="sol-calc-weight" value="68" style="width: 100%; padding: 8px; border-radius: 8px; border: 1.5px solid #d8cdbc; font-size: 12.5px; font-weight: 700;">
            </div>
            <div>
              <label style="font-size: 11px; font-weight: 700; color: #685951;">Fiziksel Aktivite</label>
              <select id="sol-calc-pal" style="width: 100%; padding: 8px; border-radius: 8px; border: 1.5px solid #d8cdbc; font-size: 12.5px; font-weight: 700;">
                <option value="1.2">Masa Başı (Sedanter 1.2)</option>
                <option value="1.375">Hafif Egzersiz (1.375)</option>
                <option value="1.55" selected>Orta Düzey (1.55)</option>
                <option value="1.725">Ağır Sporcu (1.725)</option>
              </select>
            </div>
          </div>

          <button type="button" onclick="runSolCalorieCalc()" style="background: #163b2c; color: #ffffff; border: none; padding: 10px 20px; border-radius: 8px; font-weight: 800; font-size: 13px; cursor: pointer;">Metrikleri Hesapla</button>

          <div id="sol-calc-result" style="margin-top: 14px; display: grid; grid-template-columns: repeat(3, 1fr); gap: 10px;">
            <div style="background: #ffffff; border: 1px solid #e6ded1; border-radius: 10px; padding: 12px; text-align: center;">
              <div style="font-size: 11px; font-weight: 700; color: #685951;">BAZAL METABOLİZMA (BMR)</div>
              <div id="sol-bmr-val" style="font-size: 20px; font-weight: 900; color: #163b2c; margin-top: 2px;">1.438 kcal</div>
            </div>
            <div style="background: #ffffff; border: 1px solid #e6ded1; border-radius: 10px; padding: 12px; text-align: center;">
              <div style="font-size: 11px; font-weight: 700; color: #685951;">GÜNLÜK İHTİYAÇ (TDEE)</div>
              <div id="sol-tdee-val" style="font-size: 20px; font-weight: 900; color: #170c07; margin-top: 2px;">2.229 kcal</div>
            </div>
            <div style="background: #ffffff; border: 1px solid #e6ded1; border-radius: 10px; padding: 12px; text-align: center;">
              <div style="font-size: 11px; font-weight: 700; color: #685951;">KİLO VERME HEDEFİ</div>
              <div id="sol-diet-cal-val" style="font-size: 20px; font-weight: 900; color: #94593f; margin-top: 2px;">1.729 kcal</div>
            </div>
          </div>
        </div>
      `;
    }
  },

  'branches': {
    icon: '🩺',
    title: 'DiyetKalfa Klinik: Diğer Branşlar',
    desc: 'Fonksiyonel tıp, sporcu beslenmesi, bariatrik cerrahi ve pediatrik beslenme modülleri',
    render: function() {
      return `
        <div style="background: #faf8f4; border: 1.5px solid #e6ded1; border-radius: 16px; padding: 16px;">
          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 10px;">
            <div style="background: #fff; border: 1px solid #e6ded1; border-radius: 10px; padding: 12px;">
              <strong style="font-size: 13px; color: #163b2c;">🌿 Fonksiyonel Tıp & Eliminasyon</strong>
              <p style="font-size: 11.5px; color: #685951; margin: 4px 0 0;">Geçirgen bağırsak, SIBO, histamin intoleransı ve otoimmün hastalık protokolleri.</p>
            </div>
            <div style="background: #fff; border: 1px solid #e6ded1; border-radius: 10px; padding: 12px;">
              <strong style="font-size: 13px; color: #163b2c;">🏃 Sporcu Beslenmesi & Hipertrofi</strong>
              <p style="font-size: 11.5px; color: #685951; margin: 4px 0 0;">Antrenman öncesi/sonrası beslenme, kreatin/protein zamanlaması ve hidrasyon.</p>
            </div>
            <div style="background: #fff; border: 1px solid #e6ded1; border-radius: 10px; padding: 12px;">
              <strong style="font-size: 13px; color: #163b2c;">⚖️ Bariatrik Cerrahi Beslenmesi</strong>
              <p style="font-size: 11.5px; color: #685951; margin: 4px 0 0;">Tüp mide ve gastrik bypass sonrası berrak sıvı, püre ve katı geçiş evreleri.</p>
            </div>
            <div style="background: #fff; border: 1px solid #e6ded1; border-radius: 10px; padding: 12px;">
              <strong style="font-size: 13px; color: #163b2c;">👶 Pediatri & Çocuk Beslenmesi</strong>
              <p style="font-size: 11.5px; color: #685951; margin: 4px 0 0;">Persentil eğrileri, okul çağı çocuklarda büyüme-gelişme ve iştahsızlık takibi.</p>
            </div>
          </div>
        </div>
      `;
    }
  },

  'experts': {
    icon: '🔍',
    title: 'Tüm Uzmanlar & Diyetisyen Ağı',
    desc: 'Türkiye geneli akredite diyetisyenler ve klinik dizini',
    render: function() {
      return `
        <div style="background: #faf8f4; border: 1.5px solid #e6ded1; border-radius: 16px; padding: 16px;">
          <div style="display: flex; gap: 8px; margin-bottom: 12px;">
            <input type="text" placeholder="Şehir veya Uzman Adı ile Arayın..." style="flex: 1; padding: 9px 12px; border-radius: 8px; border: 1.5px solid #d8cdbc; font-size: 13px; outline: none;">
            <select style="padding: 9px; border-radius: 8px; border: 1.5px solid #d8cdbc; font-size: 12.5px; font-weight: 700;">
              <option>Tüm Şehirler</option>
              <option>İstanbul</option>
              <option>Ankara</option>
              <option>İzmir</option>
            </select>
          </div>
          <div style="display: flex; flex-direction: column; gap: 8px;">
            <div style="background: #fff; border: 1px solid #e6ded1; border-radius: 10px; padding: 10px 14px; display: flex; justify-content: space-between; align-items: center;">
              <div>
                <strong style="font-size: 13px; color: #170c07;">Uzm. Dyt. Selin Yılmaz</strong>
                <div style="font-size: 11.5px; color: #685951;">İstanbul • Fonksiyonel Tıp & İnsülin Direnci</div>
              </div>
              <span style="background: #edf5f0; color: #163b2c; font-size: 11px; font-weight: 800; padding: 4px 8px; border-radius: 6px;">Doğrulanmış Klinik</span>
            </div>
            <div style="background: #fff; border: 1px solid #e6ded1; border-radius: 10px; padding: 10px 14px; display: flex; justify-content: space-between; align-items: center;">
              <div>
                <strong style="font-size: 13px; color: #170c07;">Dyt. Mert Çelik</strong>
                <div style="font-size: 11.5px; color: #685951;">Ankara • Sporcu Beslenmesi & Vücut Geliştirme</div>
              </div>
              <span style="background: #edf5f0; color: #163b2c; font-size: 11px; font-weight: 800; padding: 4px 8px; border-radius: 6px;">Doğrulanmış Klinik</span>
            </div>
          </div>
        </div>
      `;
    }
  },

  'blog': {
    icon: '📚',
    title: 'Bilimsel Klinik Blog',
    desc: 'Dünya Sağlık Örgütü ve ESPEN kanıta dayalı klinik beslenme yayınları',
    render: function() {
      return `
        <div style="background: #faf8f4; border: 1.5px solid #e6ded1; border-radius: 16px; padding: 16px;">
          <div style="display: flex; flex-direction: column; gap: 10px;">
            <div style="background: #ffffff; border: 1px solid #e6ded1; border-radius: 10px; padding: 12px;">
              <span style="font-size: 10.5px; font-weight: 800; color: #94593f; text-transform: uppercase;">KLİNİK MAKALE • 2024</span>
              <h4 style="font-size: 14px; font-weight: 800; color: #170c07; margin: 3px 0 5px;">HOMA-IR > 2.5 Vakalarında Krononütrisyon ve Sirkadiyen Ritim Yönetimi</h4>
              <p style="font-size: 12px; color: #685951; line-height: 1.5; margin: 0;">Son ESPEN kılavuzlarına göre akşam yemeğinde yüksek yağ ve basit karbonhidrat kısıtlaması, insülin duyarlılığını %34 oranında artırmaktadır.</p>
            </div>
            <div style="background: #ffffff; border: 1px solid #e6ded1; border-radius: 10px; padding: 12px;">
              <span style="font-size: 10.5px; font-weight: 800; color: #163b2c; text-transform: uppercase;">DSÖ RAPORU</span>
              <h4 style="font-size: 14px; font-weight: 800; color: #170c07; margin: 3px 0 5px;">Serbest Şeker Tüketiminin Günlük Kalorinin %5'i ile Sınırlandırılması</h4>
              <p style="font-size: 12px; color: #685951; line-height: 1.5; margin: 0;">DSÖ'nün kronik inflamasyon ve karaciğer yağlanmasını önleme yönergeleri çerçevesinde rafine şeker oranı 0 olan örnek menü modelleri.</p>
            </div>
          </div>
        </div>
      `;
    }
  },

  'recipes': {
    icon: '🍲',
    title: 'Türkomp Onaylı Sağlıklı Tarifler',
    desc: 'Makroları ve porsiyon değişimleri bilimsel olarak hesaplanmış 100+ klinik tarif',
    render: function() {
      return `
        <div style="background: #faf8f4; border: 1.5px solid #e6ded1; border-radius: 16px; padding: 16px;">
          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 10px;">
            <div style="background: #fff; border: 1px solid #e6ded1; border-radius: 10px; padding: 12px;">
              <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 4px;">
                <strong style="font-size: 13px; color: #170c07;">Fırında Somon & Kuşkonmaz</strong>
                <span style="background: #edf5f0; color: #163b2c; font-size: 11px; font-weight: 800; padding: 2px 6px; border-radius: 4px;">420 kcal</span>
              </div>
              <p style="font-size: 11.5px; color: #685951; margin: 0 0 4px;">P: 38g • K: 12g • Y: 24g</p>
              <div style="font-size: 11px; color: #94593f; font-weight: 700;">Değişim: 4 Et + 1 Sebze + 2 Yağ</div>
            </div>
            <div style="background: #fff; border: 1px solid #e6ded1; border-radius: 10px; padding: 12px;">
              <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 4px;">
                <strong style="font-size: 13px; color: #170c07;">Chia & Yaban Mersinli Gece Lapası</strong>
                <span style="background: #edf5f0; color: #163b2c; font-size: 11px; font-weight: 800; padding: 2px 6px; border-radius: 4px;">280 kcal</span>
              </div>
              <p style="font-size: 11.5px; color: #685951; margin: 0 0 4px;">P: 14g • K: 32g • Y: 8g</p>
              <div style="font-size: 11px; color: #94593f; font-weight: 700;">Değişim: 1 Süt + 1 Meyve + 1 Ekmek</div>
            </div>
            <div style="background: #fff; border: 1px solid #e6ded1; border-radius: 10px; padding: 12px;">
              <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 4px;">
                <strong style="font-size: 13px; color: #170c07;">Kinoa & Avokadolu Yeşil Detoks</strong>
                <span style="background: #edf5f0; color: #163b2c; font-size: 11px; font-weight: 800; padding: 2px 6px; border-radius: 4px;">340 kcal</span>
              </div>
              <p style="font-size: 11.5px; color: #685951; margin: 0 0 4px;">P: 11g • K: 36g • Y: 16g</p>
              <div style="font-size: 11px; color: #94593f; font-weight: 700;">Değişim: 2 Ekmek + 2 Yağ + 1 Sebze</div>
            </div>
            <div style="background: #fff; border: 1px solid #e6ded1; border-radius: 10px; padding: 12px;">
              <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 4px;">
                <strong style="font-size: 13px; color: #170c07;">Mercimek & Zerdeçallı Çorba</strong>
                <span style="background: #edf5f0; color: #163b2c; font-size: 11px; font-weight: 800; padding: 2px 6px; border-radius: 4px;">210 kcal</span>
              </div>
              <p style="font-size: 11.5px; color: #685951; margin: 0 0 4px;">P: 13g • K: 30g • Y: 3g</p>
              <div style="font-size: 11px; color: #94593f; font-weight: 700;">Değişim: 1 Et + 1.5 Ekmek + İltihap Karşıtı</div>
            </div>
          </div>
        </div>
      `;
    }
  }
};

function openSolutionModal(key) {
  var panel = document.getElementById('solutions-dropdown-panel');
  if (panel) panel.style.display = 'none';

  var data = SOLUTIONS_DATA[key];
  if (!data) return;

  var modal = document.getElementById('modal-solution-viewer');
  if (!modal) return;

  var iconBadge = document.getElementById('sol-modal-icon-badge');
  var title = document.getElementById('sol-modal-title');
  var desc = document.getElementById('sol-modal-desc');
  var body = document.getElementById('sol-modal-body');

  if (iconBadge) iconBadge.textContent = data.icon;
  if (title) title.textContent = data.title;
  if (desc) desc.textContent = data.desc;
  if (body) body.innerHTML = data.render();

  modal.style.display = 'flex';
}

function closeSolutionModal() {
  var modal = document.getElementById('modal-solution-viewer');
  if (modal) modal.style.display = 'none';
}

// Kalori Hesaplama Fonksiyonu
function runSolCalorieCalc() {
  var gender = document.getElementById('sol-calc-gender') ? document.getElementById('sol-calc-gender').value : 'k';
  var age = parseFloat(document.getElementById('sol-calc-age').value) || 30;
  var height = parseFloat(document.getElementById('sol-calc-height').value) || 168;
  var weight = parseFloat(document.getElementById('sol-calc-weight').value) || 68;
  var pal = parseFloat(document.getElementById('sol-calc-pal').value) || 1.55;

  // Mifflin-St Jeor
  var bmr = (10 * weight) + (6.25 * height) - (5 * age);
  bmr = (gender === 'e') ? (bmr + 5) : (bmr - 161);
  var tdee = Math.round(bmr * pal);
  var dietCal = Math.round(tdee - 500);

  var bmrEl = document.getElementById('sol-bmr-val');
  var tdeeEl = document.getElementById('sol-tdee-val');
  var dietEl = document.getElementById('sol-diet-cal-val');

  if (bmrEl) bmrEl.textContent = Math.round(bmr) + " kcal";
  if (tdeeEl) tdeeEl.textContent = tdee + " kcal";
  if (dietEl) dietEl.textContent = dietCal + " kcal";
}

// e-Nabız HOMA-IR Hesaplama Fonksiyonu
function calcSolEnabizHoma() {
  var g = parseFloat(document.getElementById('sol-enabiz-glikoz').value) || 108;
  var ins = parseFloat(document.getElementById('sol-enabiz-insulin').value) || 16.5;
  var homa = (g * ins) / 405;
  var homaFormatted = homa.toFixed(2);

  var resBox = document.getElementById('sol-enabiz-homa-val');
  if (resBox) {
    if (homa > 2.5) {
      resBox.textContent = homaFormatted + " (Yüksek İnsülin Direnci)";
      resBox.style.background = "#fbf4f0";
      resBox.style.color = "#94593f";
    } else {
      resBox.textContent = homaFormatted + " (Normal / Optimal Değer)";
      resBox.style.background = "#edf5f0";
      resBox.style.color = "#163b2c";
    }
  }
}

// AI Asistan Fonksiyonları (Çözümler Simülatörü)
function askAiAssistant(question) {
  var inp = document.getElementById('ai-sim-input');
  if (inp) inp.value = question;
  sendLegacyAiSimulationMessage();
}

function sendLegacyAiSimulationMessage() {
  var inp = document.getElementById('ai-sim-input');
  if (!inp || !inp.value.trim()) return;
  var q = inp.value.trim();
  inp.value = '';

  var hist = document.getElementById('ai-chat-history');
  if (!hist) return;

  var userMsg = document.createElement('div');
  userMsg.style.cssText = "background: #f4efe6; border-radius: 10px; padding: 8px 12px; color: #170c07; margin-bottom: 8px; text-align: right; font-weight: 700;";
  userMsg.textContent = "Siz: " + q;
  hist.appendChild(userMsg);

  var aiThinking = document.createElement('div');
  aiThinking.style.cssText = "background: #edf5f0; border: 1px solid #2e5e4b; border-radius: 10px; padding: 10px 12px; color: #163b2c; margin-bottom: 8px;";
  aiThinking.textContent = "🤖 DiyetKalfa AI: Analiz ediliyor...";
  hist.appendChild(aiThinking);
  hist.scrollTop = hist.scrollHeight;

  setTimeout(function() {
    var reply = "DSÖ ve klinik beslenme kılavuzlarına göre bu vakada önerilen yaklaşım: Düşük glisemik indeksli tam tahıllar, günlük lif miktarının 30g üzerine çıkarılması ve akşam öğününün 20:00'den önce sonlandırılmasıdır. Diyet planlayıcı modülünden tek tıkla reçeteye dökebilirsiniz.";
    if (q.toLowerCase().indexOf('homa') >= 0 || q.toLowerCase().indexOf('insülin') >= 0) {
      reply = "🩸 İnsülin Direnci Analizi: HOMA-IR > 2.5 değerinde serbest şekerler %0 olmalı, ara öğünde 1 porsiyon az şekerli meyve (yeşil elma/yaban mersini) çiğ ceviz veya probiyotik yoğurtla eşleştirilmelidir.";
    } else if (q.toLowerCase().indexOf('hashimoto') >= 0) {
      reply = "🥑 Hashimoto Protokolü: Çiğ turpgiller (brokoli, karnabahar) pişirilerek tüketilmelidir (ısıl işlem guatrojenleri inaktive eder). Selenyum ve çinko desteğiyle fonksiyonel tıp menüsü hazırlanmalıdır.";
    } else if (q.toLowerCase().indexOf('maraton') >= 0 || q.toLowerCase().indexOf('spor') >= 0) {
      reply = "🏃 Sporcu Protokolü: Yarıştan 36-48 saat önce kg başına 8-10g kompleks karbonhidrat yüklemesi önerilir. Sindirim konforu için lif ve yağ oranı kontrollü tutulmalıdır.";
    }
    aiThinking.innerHTML = "<strong>🤖 DiyetKalfa AI:</strong> " + reply;
    hist.scrollTop = hist.scrollHeight;
  }, 700);
}

// Menü Üretici
function runSolDietGen() {
  var box = document.getElementById('sol-diet-preview-box');
  if (box) {
    box.style.opacity = '0.5';
    setTimeout(function() {
      box.style.opacity = '1';
    }, 200);
  }
}

