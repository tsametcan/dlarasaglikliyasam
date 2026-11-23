# 🩺 VitaLife Pro - DSÖ Standartlarında Klinik Diyetisyen & 7 Günlük Beslenme İşletim Sistemi
## Kapsamlı Klinik Metrikler, Besin Değişim Sistemi ve 7 Günlük Reçete Mimarisi

---

### 1. Ekrandaki Tasarım Hatasının Çözümü (Neden Oldu ve Nasıl Düzeltildi?)

Önceki ekranda sayfanın ham (stilsiz / düz metin) görünmesinin sebebi; tarayıcınızın dosyayı yerel bilgisayardan (`file://`) açarken harici **Tailwind CSS CDN** kütüphanesini güvenlik veya bağlantı kısıtlaması nedeniyle yükleyememesidir.

**Kalıcı & Kusursuz Çözüm:**
- Sayfanın tüm tasarım sistemi **%100 yerleşik, saf ve bağımsız CSS** olarak dosyanın içine entegre edildi.
- Sıfır harici CDN bağımlılığı sağlandı.
- Artık bilgisayarınız internetsiz dahi olsa, dosyayı nerede açarsanız açın Apple / Stripe / Linear kalitesinde ultra premium, akıcı ve pırıl pırıl bir klinik arayüz çalışır.

---

### 2. Klinik Metrikler ve Matematiksel Enerji Motoru

#### 2.1. Mifflin-St Jeor BMR (Bazal Metabolizma Hızı) Formülü
Dünya Sağlık Örgütü ve klinik beslenme komitelerinin altın standardı:
$$\text{BMR}_{\text{Erkek}} = (10 \times \text{Kilo}) + (6.25 \times \text{Boy}) - (5 \times \text{Yaş}) + 5$$
$$\text{BMR}_{\text{Kadın}} = (10 \times \text{Kilo}) + (6.25 \times \text{Boy}) - (5 \times \text{Yaş}) - 161$$

#### 2.2. PAL (Fiziksel Aktivite Düzeyi) ve TDEE (Toplam Günlük Enerji Harcaması)
$$\text{TDEE} = \text{BMR} \times \text{PAL}$$
- **1.20**: Sedanter / Masa Başı Hareketsiz
- **1.375**: Hafif Hareketli (Haftada 1-3 gün yürüyüş)
- **1.55**: Orta Derece Hareketli (Haftada 3-5 gün spor)
- **1.725**: Çok Hareketli (Haftada 6-7 gün ağır antrenman)
- **1.90**: Ağır İş / Profesyonel Sporcu

#### 2.3. DSÖ Hidrasyon Formülü
$$\text{Zorunlu Günlük Su (ml)} = \text{Vücut Ağırlığı (kg)} \times 35\text{ ml}$$

---

### 3. Klinik Besin Değişim Listesi Hesabı (Food Exchange System)

Örneğin **1600 kcal** hedefi için klinik besin değişim dağılımı:

| Değişim Grubu | Porsiyon / Değişim Adedi | Enerji Değeri | Karbonhidrat | Protein | Yağ |
|---|---|---|---|---|---|
| **🥛 Süt Grubu** | 2.5 Değişim | 285 kcal | 22.5g | 15g | 15g |
| **🥩 Et / Yumurta Grubu** | 5.0 Değişim | 345 kcal | 0g | 30g | 25g |
| **🍞 Ekmek / Tahıl Grubu** | 6.0 Değişim | 408 kcal | 90g | 12g | 0g |
| **🥦 Sebze Grubu** | 4.0 Değişim | 112 kcal | 24g | 4g | 0g |
| **🍎 Meyve Grubu** | 3.0 Değişim | 180 kcal | 45g | 0g | 0g |
| **🫒 Yağ Grubu** | 4.0 Değişim | 180 kcal | 0g | 0g | 20g |
| **TOPLAM** | **24.5 Değişim** | **1,510 - 1,600 kcal** | **181.5g (%48)** | **61g (%20)** | **60g (%32)** |

---

### 4. 7 Günlük Eksiksiz Reçete Mimarisi (Hiçbiri Baştan Savma Olmayan)

Her gün (Pazartesi'den Pazar'a kadar) şu 8 bileşeni eksiksiz barındırır:
1. 🥒🍋 **Günün Fonksiyonel Detoks Suyu** (Demleme yöntemi, içim saati, DSÖ ödem atıcı etki notu)
2. 🍳 **Kahvaltı (08:30)** (Gramajlar, evden kullanılan malzemeler, tarif ve biyoyararlanım)
3. ☕ **1. Ara Öğün / Kuşluk (10:30)** (Metabolizma hızlandırıcı ara öğün)
4. 🥗 **Öğle Yemeği (13:00)** (Doyurucu, dengeli ana öğün)
5. 🍏 **2. Ara Öğün / İkindi (16:30)** (İnsülin dengesi ve tatlı krizini önleyici ara öğün)
6. 🍲 **Akşam Yemeği (19:30)** (Sindirimi kolay, karaciğer koruyucu ana öğün)
7. 🌙 **3. Ara Öğün / Gece (21:30 - 22:00)** (Melatonin ve magnezyum destekli gece açlığı engelleyici öğün)
8. 🍓🍫 **Günün Pratik Sağlıklı Tatlısı** (Rafine şekersiz, fruktoz şurupsuz, trans yağsız 5-10 dakikalık tatlı)

---

### 5. Yazdırılabilir & WhatsApp İletişim Altyapısı

- **Tek Tıkla WhatsApp:** Seçili günün tüm öğünleri, detoks suyu ve sağlıklı tatlısı danışanın WhatsApp sohbetine formatlı mesaj olarak gönderilir.
- **7 Günlük PDF / Yazdır:** Resmi antetli antet tasarımıyla klinikte hastaya elden verilebilecek dosya oluşturulur.
