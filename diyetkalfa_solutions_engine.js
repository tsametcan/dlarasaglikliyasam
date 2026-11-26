/* ========================================================================== */
/* DIYETKALFA - 15 KLİNİK ÇÖZÜM MOTORU, SONSUZ MENÜ ÜRETİCİ & AI SİMÜLATÖRÜ  */
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

document.addEventListener('click', function(e) {
  var container = document.querySelector('.dropdown-solutions-container');
  var panel = document.getElementById('solutions-dropdown-panel');
  var chevron = document.getElementById('solutions-chevron');
  if (panel && container && !container.contains(e.target)) {
    panel.style.display = 'none';
    if (chevron) chevron.style.transform = 'rotate(0deg)';
  }
});

// ============================================================================
// SONSUZ VE TEKRARSIZ KLİNİK MENÜ HAVUZU (15+ YEMEK / ÖĞÜN KOMBİNASYONU)
// ============================================================================
var SOL_INFINITE_MEAL_POOLS = {
  breakfast: [
    "2 adet haşlanmış organik yumurta, 60g az tuzlu lor peyniri, bol roka-maydanoz (limonlu), 5 adet zeytin, 1 dilim ekşi mayalı siyez ekmeği",
    "Ispanaklı ve mantarlı 2 yumurtalı tava omlet (1 tatlı kaşığı sızma zeytinyağı ile), 40g keçi peyniri, 2 tam ceviz, 1 dilim karabuğday ekmeği",
    "4 yemek kaşığı yulaf ezmesi, 1 kase laktozsuz probiyotik yoğurt, 1 tatlı kaşığı chia tohumu, yarım yeşil elma ve Seylan tarçını",
    "Yarım olgun avokado ezmesi (limon & çörek otlu), 2 adet poşe yumurta, 50g Ezine peyniri, cherry domates, salatalık, 1 dilim tam çavdar ekmeği",
    "3 yemek kaşığı kinoa gevreği veya karabuğday patlağı, 200 ml badem sütü/kefir, 8 adet çiğ badem, 1 porsiyon yaban mersini",
    "Menemen (2 yumurta, bol kapya biber, domates, 1 tatlı kaşığı zeytinyağı), 45g tulum/lor peyniri, dereotu, 1 dilim tam buğday ekmeği",
    "2 adet yumurta ile dereotlu & lor peynirli krep (yulaf unundan), 6 adet yeşil zeytin, salatalık-biber söğüş, 1 fincan şekersiz yeşil çay",
    "Sebzeli fırın mücver (kabak, havuç, dereotu, 1 yumurta, lor peyniri), 2 tam ceviz içi, 1 su bardağı sade probiyotik kefir",
    "1 dilim kızarmış siyez ekmeği üzerine 2 yemek kaşığı şekersiz fıstık ezmesi veya tahin, yanında 2 haşlanmış yumurta ve bol yeşillik",
    "50g hindi füme + 2 yumurtalı sahanda yumurta, 40g süzme beyaz peynir, yarım avokado dilimleri, roka ve tere yaprakları",
    "Chia puding (200 ml Hindistan cevizi/laktozsuz süt, 2 yemek kaşığı chia, 5 adet çilek, 6 adet çiğ fındık) + 1 adet haşlanmış yumurta",
    "Çörek otlu lor salatası (80g lor, zeytinyağı, ceviz, kırmızı kapya biber, maydanoz), 1 adet rafadan yumurta, 1 dilim glütensiz karabuğday ekmeği",
    "2 yumurtalı kabaklı & taze soğanlı frittata, 5 adet siyah zeytin, 1 kase ev yoğurdu (üzerine keten tohumu ilaveli)",
    "3 yemek kaşığı haşlanmış karabuğdaylı & peynirli sıcak kahvaltı kasesi, 1 adet haşlanmış yumurta, 2 tam ceviz, bol taze nane-roka",
    "2 adet yumurta beyazı + 1 tam yumurtadan semizotlu omlet, 50g dil peyniri, 6 adet çiğ badem, 1 dilim ekşi mayalı tam tahıl ekmeği"
  ],
  snack1: [
    "1 fincan taze demlenmiş yeşil çay + 10 adet çiğ badem (E vitamini & antioksidan desteği)",
    "1 su bardağı sade probiyotik kefir + 1 çay kaşığı toz Seylan tarçını",
    "1 adet küçük boy yeşil elma (Granny Smith) + 2 tam ceviz içi (Glisemik dengeleme)",
    "1 fincan sade filtre kahve + 2 kare (%85 kakao) şekersiz bitter çikolata + 6 adet çiğ fındık",
    "1 kase doğranmış salatalık & kereviz sapı söğüş + 1 yemek kaşığı humus",
    "1 fincan tıbbi nane veya beyaz çay + 1 yemek kaşığı çiğ kabak çekirdeği içi (Çinko & Magnezyum)",
    "Yarım su bardağı yaban mersini veya böğürtlen + 8 adet çiğ kaju/badem",
    "1 adet kivi + 3 yemek kaşığı laktozsuz probiyotik yoğurt (C vitamini & kolajen sentezi)",
    "1 su bardağı tarçınlı & karanfilli ılık bitki çayı + 2 adet kuru kayısı + 2 tam ceviz",
    "1 ince dilim ananas + 1 tatlı kaşığı chia tohumlu 100g süzme yoğurt",
    "1 fincan matcha çayı + 1 adet ev yapımı şekersiz yulaflı hurmalı enerji topu",
    "1 avuç (25g) tuzsuz sarı leblebi + 6 adet çiğ badem + 1 fincan rezene çayı",
    "1 küçük boy armut + 1 dilim (30g) az tuzlu beyaz peynir (Lif + Protein eşleşmesi)",
    "1 şişe düşük sodyumlu doğal maden suyu (yarım limon sıkılmış) + 3 tam ceviz içi",
    "3 yemek kaşığı lor peynirli & dereotlu salatalık sandviçleri + 1 fincan zeytin yaprağı çayı"
  ],
  lunch: [
    "150g fırında levrek fileto, zeytinyağlı ızgara brokoli & 4 yemek kaşığı kinoa salatası",
    "160g ızgara tavuk göğsü (kekikli & zerdeçallı), 4 yemek kaşığı karabuğday (greçka) pilavı, bol mevsim salatası",
    "8 yemek kaşığı kıymalı yeşil mercimek yemeği, 1 kase sarımsaklı-naneli ev yoğurdu, roka salatası",
    "150g ızgara dana bonfile veya yağsız köfte, közlenmiş kapya biber & patlıcan söğüş, 1 kase semizotu cacığı",
    "160g fırında somon dilimi (kuşkonmaz ve dereotu yatağında), 1 büyük kase avokadolu Akdeniz salatası",
    "150g sote hindi kuşbaşı (mantar, renkli biber ve kabak ile), 4 yemek kaşığı siyez bulgur pilavı, ayran",
    "8 yemek kaşığı zeytinyağlı nohut yemeği, 3 yemek kaşığı haşlanmış esmer pirinç, turpsuz limonlu çoban salata",
    "Ton balıklı (120g suda) veya ızgara hellimli büyük kinoa & maş fasulyesi salatası (zeytinyağı-limon soslu)",
    "5 adet fırınlanmış kabaklı hindi köftesi, 1 kepçe zerdeçallı mercimek çorbası, mevsim yeşillikleri",
    "160g ızgara çipura, zeytinyağlı şevketibostan veya deniz börülcesi, 1 dilim tam çavdar ekmeği",
    "8 yemek kaşığı etli taze fasulye veya bamya yemeği, 1 kase probiyotik kefir, cevizli gavurdağı salatası",
    "150g ızgara kuzu küşleme veya yağsız biftek, fırınlanmış tatlı patates (100g), bol limonlu maydanoz salatası",
    "Falafel kasesi (5 adet fırınlanmış nohut köftesi, tahinli yoğurt sos, 3 kaşık karabuğday, mor lahana salatası)",
    "150g tavuk şiş, 1 kase naneli ayran aşı çorbası (buğday ve nohutlu), zeytinyağlı ızgara sebzeler",
    "8 yemek kaşığı kıymalı ıspanak veya pazı yemeği (üzerine 1 yumurta kırılmış), 1 kase sarımsaklı ev yoğurdu"
  ],
  snack2: [
    "1 kase laktozsuz probiyotik yoğurt + 1 tatlı kaşığı chia tohumu + toz tarçın",
    "1 adet orta boy yeşil elma + 1 tatlı kaşığı şekersiz yer fıstığı ezmesi",
    "1 su bardağı kefir + 5 adet çilek + 1 tatlı kaşığı öğütülmüş keten tohumu",
    "2 adet karabuğday patlağı üzerine 40g labne/lor peyniri ve çörek otu + 1 fincan yeşil çay",
    "1 porsiyon (12 adet) kiraz veya vişne + 8 adet çiğ badem + 1 fincan beyaz çay",
    "1 küçük kase (150g) yaban mersinli & cevizli süzme yoğurt kasesi",
    "1 adet haşlanmış yumurta beyazı + 40g dil peyniri + cherry domates & fesleğen",
    "1 su bardağı tarçınlı badem sütü (veya laktozsuz süt) + 6 adet çiğ fındık",
    "Yarım avokado (limon ve pul biberli) + 1 dilim etimek veya siyez galetası",
    "1 orta boy şeftali veya nektarin + 3 tam ceviz içi",
    "1 kase naneli-salatalıklı soğuk cacık + 1 yemek kaşığı çiğ ay çekirdeği içi",
    "1 fincan rooibos (kırmızı) çay + 1 adet kuru incir + 2 tam ceviz",
    "100g lor peyniri + yarım rendelenmiş yeşil elma + tarçın + 5 adet çiğ badem",
    "1 su bardağı yeşil detoks smoothie (ıspanak, salatalık, yarım yeşil elma, limon, zencefil, su)",
    "6 yemek kaşığı haşlanmış edamame veya nohut (kimyonlu & kırmızı biberli fırınlanmış)"
  ],
  dinner: [
    "Fırında Somon & Kuşkonmazlı Roka Salatası (Hafif akşam sindirimi, yüksek Omega-3)",
    "8 yemek kaşığı zeytinyağlı kabak kalye (dereotlu), 1 kase sarımsaklı-cevizli probiyotik yoğurt",
    "140g ızgara hindi bonfile, buharda pişmiş brokoli & karnabahar (zeytinyağı-limon-sarımsak soslu)",
    "1 büyük kase zerdeçallı & kemik sulu sebze çorbası + 120g ızgara tavuk dilimlerili Akdeniz salatası",
    "8 yemek kaşığı zeytinyağlı enginar veya kereviz yemeği, 1 kase naneli cacık, mevsim yeşillikleri",
    "150g fırında sarımsaklı & biberiyeli alabalık veya levrek, közlenmiş kırmızı biberli semizotu salatası",
    "8 yemek kaşığı zeytinyağlı pırasa veya taze fasulye, 1 kase kefir, 2 tam cevizli roka salatası",
    "Fırında lor peynirli & ıspanaklı mantar dolması (6 adet), 1 kase mercimek çorbası, yeşil salata",
    "140g ızgara köfte (4 adet), zeytinyağlı fırın brüksel lahanası ve havuç, 1 kase ev yoğurdu",
    "8 yemek kaşığı zeytinyağlı barbunya veya börülce (az yağlı), bol dereotlu-limonlu marul salatası",
    "Sebze spagetti (kabak ve havuçtan jülyen sote, üzerinde 100g yağsız kıyma sosu ve fesleğen)",
    "150g buğulama morina veya mezgit fileto, haşlanmış kuşkonmaz ve taze fasulye salatası",
    "8 yemek kaşığı zeytinyağlı bamya yemeği, 1 kase chia tohumlu yoğurt, çoban salata",
    "130g ızgara tavuk şiş, közlenmiş patlıcanlı & kapya biberli yoğurtlama, roka-tere söğüş",
    "Kinoalı & avokadolu ılık sebze kasesi (ızgara kabak, mantar, brokoli, 60g keçi peyniri, zeytinyağı)"
  ],
  night: [
    "1 bardak ılık rezene & papatya çayı (Melatonin, sindirim konforu ve uyku protokolü)",
    "1 fincan taze demlenmiş melisa & lavanta çayı (Gece kortizol düşürücü & parasempatik aktivasyon)",
    "1 litre alkali suya yarım demet maydanoz + yarım limon + 1 çubuk tarçın (Ertesi gün için gece detoks demlemesi)",
    "1 fincan taze zencefilli & limonlu ılık su (Sabah açlık kan şekeri regülasyonu için)",
    "1 fincan tıbbi nane (spearmint) & ıhlamur çayı (Hormonal denge ve derin uyku desteği)",
    "1 bardak ılık su + 1 tatlı kaşığı organik elma sirkesi (Yemekten 2 saat sonra glisemik denge kürü)",
    "1 fincan kiraz sapı & mısır püskülü & beyaz çay karışımı (Gece lenfatik ödem atım desteği)",
    "1 fincan zeytin yaprağı & tarçın çayı (Gece insülin duyarlılığı ve antioksidan onarım)"
  ]
};

window._solDietGenCounter = 1;
window._solLastMealPicks = [0, 0, 0, 0, 0, 0];
window._solDeckQueues = {};

// Her öğün havuzunun gerçekçi baz kalori tablosu (Türkomp standartları)
var SOL_MEAL_BASE_CALORIES = {
  breakfast: [380, 420, 340, 410, 330, 390, 360, 370, 430, 400, 320, 370, 380, 390, 350],
  snack1:    [140, 160, 150, 170,  95, 130, 140, 155, 165, 150, 135, 120, 145, 110, 125],
  lunch:     [510, 490, 520, 540, 560, 480, 470, 460, 495, 515, 485, 550, 505, 510, 490],
  snack2:    [150, 165, 170, 140, 130, 160, 140, 155, 135, 145, 125, 115, 150, 120, 135],
  dinner:    [440, 410, 430, 420, 395, 465, 400, 425, 470, 435, 450, 440, 395, 455, 420],
  night:     [0, 0, 0, 0, 0, 0, 0, 0]
};

var SOL_PROTO_TARGETS = {
  'insulin': 1680,
  'kilo': 1420,
  'sporcu': 2340,
  'pcos': 1560,
  'if': 1520,
  'hashimoto': 1620,
  'keto': 1850,
  'akdeniz': 1750
};

window._solCurrentMeals = [
  SOL_INFINITE_MEAL_POOLS.breakfast[0],
  SOL_INFINITE_MEAL_POOLS.snack1[0],
  SOL_INFINITE_MEAL_POOLS.lunch[0],
  SOL_INFINITE_MEAL_POOLS.snack2[0],
  SOL_INFINITE_MEAL_POOLS.dinner[0],
  SOL_INFINITE_MEAL_POOLS.night[0]
];

window._solCurrentMealKcals = [380, 140, 510, 150, 440, 0];

function getNextNonRepeatingPoolIndex(slotKey, poolLen, lastIdx) {
  if (poolLen <= 1) return 0;
  if (!window._solDeckQueues[slotKey] || window._solDeckQueues[slotKey].length === 0) {
    var indices = [];
    for (var i = 0; i < poolLen; i++) {
      indices.push(i);
    }
    // Fisher-Yates Shuffle
    for (var j = indices.length - 1; j > 0; j--) {
      var r = Math.floor(Math.random() * (j + 1));
      var tmp = indices[j];
      indices[j] = indices[r];
      indices[r] = tmp;
    }
    // Eğer yeni destenin ilk elemanı bir önceki seçilenle aynıysa sona al
    if (indices[0] === lastIdx && indices.length > 1) {
      var first = indices.shift();
      indices.push(first);
    }
    window._solDeckQueues[slotKey] = indices;
  }
  var nextIdx = window._solDeckQueues[slotKey].shift();
  if (nextIdx === lastIdx && window._solDeckQueues[slotKey].length > 0) {
    var altIdx = window._solDeckQueues[slotKey].shift();
    window._solDeckQueues[slotKey].push(nextIdx);
    return altIdx;
  }
  return nextIdx;
}

function getProtocolLabelAndMacros(protoKey, totalCal) {
  var cal = parseInt(totalCal) || 1680;
  var map = {
    'insulin': { name: 'İnsülin Direnci & Düşük GI Protokolü', pPct: 0.25, cPct: 0.40, fPct: 0.35, fiber: '34g' },
    'kilo': { name: 'Yağ Yakımı & Metabolik Defisit Menüsü', pPct: 0.30, cPct: 0.40, fPct: 0.30, fiber: '32g' },
    'sporcu': { name: 'Sporcu Hipertrofi & Yüksek Protein Menüsü', pPct: 0.35, cPct: 0.45, fPct: 0.20, fiber: '30g' },
    'pcos': { name: 'PCOS Anti-İnflamatuar Hormon Protokolü', pPct: 0.26, cPct: 0.38, fPct: 0.36, fiber: '35g' },
    'if': { name: 'Aralıklı Oruç (IF 16:8) Otofaik Beslenme', pPct: 0.28, cPct: 0.37, fPct: 0.35, fiber: '29g' },
    'hashimoto': { name: 'Hashimoto Tiroid Selenyum/Çinko Menüsü', pPct: 0.26, cPct: 0.42, fPct: 0.32, fiber: '31g' },
    'keto': { name: 'Klinik Ketojenik & Lipödem Menüsü', pPct: 0.23, cPct: 0.07, fPct: 0.70, fiber: '26g' },
    'akdeniz': { name: 'Akdeniz Longevity & Kardiyovasküler Menü', pPct: 0.22, cPct: 0.45, fPct: 0.33, fiber: '36g' }
  };
  var cfg = map[protoKey] || map['insulin'];
  return {
    title: cfg.name,
    cal: cal,
    prot: Math.round((cal * cfg.pPct) / 4),
    carb: Math.round((cal * cfg.cPct) / 4),
    fat: Math.round((cal * cfg.fPct) / 9),
    fiber: cfg.fiber
  };
}

function renderSolDietPreviewBox() {
  var box = document.getElementById('sol-diet-preview-box');
  if (!box) return;

  var protoEl = document.getElementById('sol-diet-proto');
  var protoKey = protoEl ? protoEl.value : 'insulin';

  // 5 öğünün toplamını dinamik olarak topla
  var sumCal = 0;
  for (var i = 0; i < 5; i++) {
    sumCal += (window._solCurrentMealKcals[i] || 0);
  }

  // Kalori inputunu gerçek dinamik toplam ile güncelle
  var calEl = document.getElementById('sol-diet-cal');
  if (calEl && document.activeElement !== calEl) {
    calEl.value = sumCal;
  }

  var meta = getProtocolLabelAndMacros(protoKey, sumCal);
  var slots = [
    { label: '🍳 Kahvaltı (08:30)', kcal: window._solCurrentMealKcals[0], text: window._solCurrentMeals[0] },
    { label: '☕ 1. Ara Öğün (11:00)', kcal: window._solCurrentMealKcals[1], text: window._solCurrentMeals[1] },
    { label: '🥗 Öğle Yemeği (13:30)', kcal: window._solCurrentMealKcals[2], text: window._solCurrentMeals[2] },
    { label: '🍏 İkindi Ara Öğün (16:30)', kcal: window._solCurrentMealKcals[3], text: window._solCurrentMeals[3] },
    { label: '🍲 Akşam Yemeği (19:30)', kcal: window._solCurrentMealKcals[4], text: window._solCurrentMeals[4] },
    { label: '🌿 Gece & Detoks Kürü (21:30)', kcal: 0, text: window._solCurrentMeals[5] }
  ];

  var listHtml = slots.map(function(s, idx) {
    var calBadge = s.kcal > 0
      ? '<span style="color:#0284c7; background:#e0f2fe; border:1px solid #bae6fd; font-weight:800; font-size:11.5px; padding:2px 8px; border-radius:6px; min-width:68px; text-align:center;">' + s.kcal + ' kcal</span>'
      : '<span style="color:#10b981; background:#ecfdf5; border:1px solid #a7f3d0; font-weight:800; font-size:11px; padding:2px 8px; border-radius:6px;">0 kcal • Detoks</span>';
    return '<li style="padding: 9px 0; border-bottom: 1px dashed #cbd5e1; display: flex; justify-content: space-between; align-items: flex-start; gap: 12px;">' +
      '<div style="flex: 1;"><strong style="color:#0f172a;">' + s.label + ':</strong> <span style="color:#334155;">' + s.text + '</span></div>' +
      '<div style="display: flex; align-items: center; gap: 6px; flex-shrink: 0;">' +
        calBadge +
        '<button type="button" onclick="swapSingleSolMeal(' + idx + ')" title="Sadece bu öğünü değiştir ve kaloriyi güncelle" style="background:#eff6ff; color:#1e3a8a; border:1px solid #3b82f6; border-radius:6px; padding:3px 8px; font-size:11px; font-weight:800; cursor:pointer; transition:all 0.15s;">🔄 Değiştir</button>' +
      '</div>' +
    '</li>';
  }).join('');

  box.innerHTML =
    '<div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 8px; margin-bottom: 12px; padding-bottom: 10px; border-bottom: 1.5px solid #e2e8f0;">' +
      '<div>' +
        '<span style="background: #1e3a8a; color: #d4af37; font-size: 10.5px; font-weight: 900; padding: 2px 8px; border-radius: 999px; margin-right: 6px;">REÇETE VARYASYONU #' + window._solDietGenCounter + '</span>' +
        '<strong style="color: #0f172a; font-size: 14px;">' + meta.title + '</strong>' +
      '</div>' +
      '<span id="sol-diet-summary-badge" style="background: linear-gradient(135deg, #eff6ff 0%, #e0f2fe 100%); color: #0369a1; font-size: 12px; font-weight: 900; padding: 4px 12px; border-radius: 8px; border: 1.5px solid #38bdf8; box-shadow: 0 2px 6px rgba(2, 132, 199, 0.15);">' +
        '⚡ ' + meta.cal + ' kcal • P: ' + meta.prot + 'g | K: ' + meta.carb + 'g | Y: ' + meta.fat + 'g | Lif: ' + meta.fiber +
      '</span>' +
    '</div>' +
    '<ul style="font-size: 12.5px; line-height: 1.55; list-style: none; padding: 0; margin: 0;">' +
      listHtml +
    '</ul>' +
    '<div style="margin-top: 12px; padding-top: 8px; border-top: 1px solid #e2e8f0; display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 8px; font-size: 11px; color: #0284c7; font-weight: 700;">' +
      '<span>✓ DSÖ 2024 & TÜBER Tam Uyumlu • Serbest Şeker %0 • Sodyum <2g</span>' +
      '<span style="color: #10b981;">✓ Menü değiştikçe toplam kalori ve makrolar anlık yeniden hesaplanır</span>' +
    '</div>';
}

function runSolDietGen() {
  window._solDietGenCounter = (window._solDietGenCounter || 1) + 1;
  var protoEl = document.getElementById('sol-diet-proto');
  var protoKey = protoEl ? protoEl.value : 'insulin';
  var targetBase = SOL_PROTO_TARGETS[protoKey] || 1680;
  var ratio = targetBase / 1680.0;

  var keys = ['breakfast', 'snack1', 'lunch', 'snack2', 'dinner', 'night'];
  for (var i = 0; i < keys.length; i++) {
    var pool = SOL_INFINITE_MEAL_POOLS[keys[i]];
    var newIdx = getNextNonRepeatingPoolIndex(keys[i], pool.length, window._solLastMealPicks[i]);
    window._solLastMealPicks[i] = newIdx;
    window._solCurrentMeals[i] = pool[newIdx];

    if (keys[i] === 'night') {
      window._solCurrentMealKcals[i] = 0;
    } else {
      var baseKcal = SOL_MEAL_BASE_CALORIES[keys[i]][newIdx] || 250;
      // Protokol oranına ve yemek çeşitliliğine göre hassas dinamik kalori
      var adjustedKcal = Math.round(baseKcal * ratio);
      window._solCurrentMealKcals[i] = adjustedKcal;
    }
  }

  var box = document.getElementById('sol-diet-preview-box');
  if (box) {
    box.style.transition = 'all 0.18s ease';
    box.style.transform = 'scale(0.985)';
    box.style.background = '#eff6ff';
    renderSolDietPreviewBox();
    setTimeout(function() {
      box.style.transform = 'scale(1)';
      box.style.background = '#ffffff';
    }, 180);
  }
}

function swapSingleSolMeal(slotIndex) {
  var keys = ['breakfast', 'snack1', 'lunch', 'snack2', 'dinner', 'night'];
  var key = keys[slotIndex];
  if (!key) return;

  var protoEl = document.getElementById('sol-diet-proto');
  var protoKey = protoEl ? protoEl.value : 'insulin';
  var targetBase = SOL_PROTO_TARGETS[protoKey] || 1680;
  var ratio = targetBase / 1680.0;

  var pool = SOL_INFINITE_MEAL_POOLS[key];
  var newIdx = getNextNonRepeatingPoolIndex(key, pool.length, window._solLastMealPicks[slotIndex]);
  window._solLastMealPicks[slotIndex] = newIdx;
  window._solCurrentMeals[slotIndex] = pool[newIdx];

  if (key === 'night') {
    window._solCurrentMealKcals[slotIndex] = 0;
  } else {
    var baseKcal = SOL_MEAL_BASE_CALORIES[key][newIdx] || 250;
    window._solCurrentMealKcals[slotIndex] = Math.round(baseKcal * ratio);
  }

  window._solDietGenCounter = (window._solDietGenCounter || 1) + 1;
  renderSolDietPreviewBox();
}

// ============================================================================
// KLİNİĞİMDE BAŞLAT (0 TL) -> KAYIT OLMA & 7 GÜNLÜK DENEME YÖNLENDİRİCİSİ
// ============================================================================
function startClinicTrialOrRegister(planName) {
  try {
    closeSolutionModal();
  } catch(e) {}

  var selectedPlan = planName || 'Profesyonel Paket';
  try {
    localStorage.setItem('diyetkalfa_selected_trial_plan', selectedPlan);
  } catch(e) {}

  // Eğer zaten kayit.html sayfasındaysak doğrudan kayıt formuna kaydır ve odakla
  if (window.location.pathname.toLowerCase().indexOf('kayit.html') >= 0) {
    var regForm = document.getElementById('reg-form');
    var regName = document.getElementById('reg-name');
    var planSelect = document.getElementById('reg-package');
    if (planSelect) {
      for (var i = 0; i < planSelect.options.length; i++) {
        if (planSelect.options[i].value.indexOf(selectedPlan) >= 0) {
          planSelect.selectedIndex = i;
          break;
        }
      }
    }
    if (regForm) regForm.scrollIntoView({ behavior: 'smooth', block: 'center' });
    if (regName) setTimeout(function() { regName.focus(); }, 300);
    return;
  }

  // Diğer tüm sayfalardan kayit.html sayfasına yönlendir
  window.location.href = 'kayit.html?trial=1&plan=' + encodeURIComponent(selectedPlan);
}

var SOLUTIONS_DATA = {
  'diet_program': {
    icon: '🥗',
    title: 'Diyet Programı Hazırlama',
    desc: 'Kişiye özel 7 günlük reçeteler, DSÖ 2024 standartları ve sonsuz akıllı besin değişim modeli',
    render: function() {
      setTimeout(renderSolDietPreviewBox, 20);
      return `
        <div style="background: #f4f7fb; border: 1.5px solid #cbd5e1; border-radius: 16px; padding: 18px; margin-bottom: 16px;">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 10px; flex-wrap: wrap; gap: 8px;">
            <h4 style="font-size: 15px; font-weight: 800; color: #1e3a8a; margin: 0;">⚡ Hızlı Klinik Reçete Simülatörü (Sonsuz Menü Motoru)</h4>
            <span style="font-size: 11px; background: #e0f2fe; color: #1e3a8a; font-weight: 800; padding: 3px 10px; border-radius: 999px;">∞ Tekrarsız Kombinasyon</span>
          </div>
          <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(150px, 1fr)); gap: 10px; margin-bottom: 12px;">
            <div>
              <label style="font-size: 11px; font-weight: 700; color: #475569;">Hedef Klinik Protokol</label>
              <select id="sol-diet-proto" onchange="runSolDietGen()" style="width: 100%; padding: 8px; border-radius: 8px; border: 1.5px solid #94a3b8; font-size: 12.5px; font-weight: 700;">
                <option value="insulin">İnsülin Direnci (HOMA-IR > 2.5)</option>
                <option value="kilo">Kilo Verme & Yağ Yakımı</option>
                <option value="sporcu">Sporcu Hipertrofi (Yüksek Protein)</option>
                <option value="pcos">PCOS Hormonal Denge</option>
                <option value="if">Aralıklı Oruç (IF 16:8)</option>
                <option value="hashimoto">Hashimoto & Tiroid Protokolü</option>
                <option value="keto">Ketojenik & Lipödem Protokolü</option>
                <option value="akdeniz">Akdeniz Longevity Protokolü</option>
              </select>
            </div>
            <div>
              <label style="font-size: 11px; font-weight: 700; color: #475569;">Günlük Kalori Hedefi (kcal)</label>
              <input type="number" id="sol-diet-cal" value="1650" onchange="renderSolDietPreviewBox()" style="width: 100%; padding: 8px; border-radius: 8px; border: 1.5px solid #94a3b8; font-size: 12.5px; font-weight: 700;">
            </div>
          </div>
          <button type="button" onclick="runSolDietGen()" style="background: linear-gradient(135deg, #1e3a8a 0%, #0284c7 100%); color: #ffffff; border: none; padding: 10px 18px; border-radius: 10px; font-weight: 800; font-size: 13px; cursor: pointer; display: inline-flex; align-items: center; gap: 8px; box-shadow: 0 4px 12px rgba(30, 58, 138, 0.25);">
            <span>🔄</span>
            <span>Kişiselleştirilmiş Menü Üret / Sonsuz Yenile</span>
          </button>
          
          <div id="sol-diet-preview-box" style="margin-top: 14px; background: #ffffff; border: 1.5px solid #cbd5e1; border-radius: 12px; padding: 14px;">
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
        <div style="background: #f4f7fb; border: 1.5px solid #cbd5e1; border-radius: 16px; padding: 16px;">
          <div style="margin-bottom: 12px; display: flex; flex-wrap: wrap; gap: 6px;">
            <span style="font-size: 11px; font-weight: 800; color: #475569; width: 100%; margin-bottom: 2px;">ÖNERİLEN KLİNİK SORULAR (Tıklayın veya Aşağıya Manuel Sorunuzu Yazın):</span>
            <button type="button" onclick="askAiAssistant('HOMA-IR 3.2 olan 34 yaş kadın danışana ara öğün ne yazmalıyım?')" style="background: #ffffff; border: 1px solid #94a3b8; padding: 4px 10px; border-radius: 999px; font-size: 11.5px; color: #0f172a; font-weight: 700; cursor: pointer;">🩸 HOMA-IR 3.2 Ara Öğün</button>
            <button type="button" onclick="askAiAssistant('Hashimoto tiroiditi olan hastada brokoli ve karnabahar tüketimi nasıl olmalı?')" style="background: #ffffff; border: 1px solid #94a3b8; padding: 4px 10px; border-radius: 999px; font-size: 11.5px; color: #0f172a; font-weight: 700; cursor: pointer;">🥑 Hashimoto Guatrojenler</button>
            <button type="button" onclick="askAiAssistant('80 kg maraton sporcusu için yarış öncesi glikojen yükleme makroları')" style="background: #ffffff; border: 1px solid #94a3b8; padding: 4px 10px; border-radius: 999px; font-size: 11.5px; color: #0f172a; font-weight: 700; cursor: pointer;">🏃 Maratoncu Makroları</button>
            <button type="button" onclick="askAiAssistant('PCOS için en iyi inositol dozu ve kullanımı nasıldır?')" style="background: #ffffff; border: 1px solid #94a3b8; padding: 4px 10px; border-radius: 999px; font-size: 11.5px; color: #0f172a; font-weight: 700; cursor: pointer;">🌸 PCOS İnositol Dozu</button>
            <button type="button" onclick="askAiAssistant('Demir eksikliği ve ferritin düşüklüğünde beslenme nasıl olmalı?')" style="background: #ffffff; border: 1px solid #94a3b8; padding: 4px 10px; border-radius: 999px; font-size: 11.5px; color: #0f172a; font-weight: 700; cursor: pointer;">🩸 Ferritin & Demir</button>
          </div>

          <div id="ai-chat-history" style="background: #ffffff; border: 1px solid #cbd5e1; border-radius: 12px; padding: 14px; min-height: 170px; max-height: 260px; overflow-y: auto; font-size: 13px; margin-bottom: 12px;">
            <div style="background: #eff6ff; border: 1px solid #3b82f6; border-radius: 10px; padding: 10px 12px; color: #1e3a8a; margin-bottom: 8px;">
              <strong>🤖 DiyetKalfa AI:</strong> Merhaba Meslektaşım! Danışanlarınızın tahlil değerleri, kronik hastalık protokolleri, kalori/makro hesapları veya özel besin etkileşimleri hakkında bana dilediğiniz soruyu manuel olarak yazabilirsiniz. Her sorunuzu ayrı ayrı analiz ederek yanıtlıyorum.
            </div>
          </div>

          <div style="display: flex; gap: 8px;">
            <input type="text" id="ai-sim-input" placeholder="Herhangi bir klinik soru yazın (Gut hastası ne yememeli, 75 kg su ihtiyacı...)" style="flex: 1; padding: 10px 14px; border-radius: 10px; border: 1.5px solid #94a3b8; font-size: 13px; outline: none;" onkeydown="if(event.key==='Enter') sendLegacyAiSimulationMessage();">
            <button type="button" onclick="sendLegacyAiSimulationMessage()" style="background: #1e3a8a; color: #ffffff; border: none; padding: 10px 18px; border-radius: 10px; font-weight: 800; font-size: 13px; cursor: pointer;">Gönder</button>
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
        <div style="background: #f4f7fb; border: 1.5px solid #cbd5e1; border-radius: 16px; padding: 18px;">
          <h4 style="font-size: 15px; font-weight: 800; color: #0f172a; margin-bottom: 12px;">Kurumsal Marka ve White-Label Kimliği</h4>
          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 12px; margin-bottom: 14px;">
            <div>
              <label style="font-size: 11.5px; font-weight: 700; color: #475569;">Klinik / Merkez Adı</label>
              <input type="text" id="demo-clinic-name" value="DiyetKalfa Sağlıklı Yaşam Merkezi" style="width: 100%; padding: 9px 12px; border-radius: 8px; border: 1.5px solid #94a3b8; font-size: 13px; font-weight: 700;">
            </div>
            <div>
              <label style="font-size: 11.5px; font-weight: 700; color: #475569;">Yetkili Diyetisyen & Unvan</label>
              <input type="text" id="demo-dietitian-name" value="Uzm. Dyt. Selin Yılmaz" style="width: 100%; padding: 9px 12px; border-radius: 8px; border: 1.5px solid #94a3b8; font-size: 13px; font-weight: 700;">
            </div>
          </div>
          <div style="background: #ffffff; border: 1.5px dashed #1e3a8a; border-radius: 12px; padding: 14px; text-align: center; margin-bottom: 14px;">
            <span style="font-size: 24px;">🏷️</span>
            <div style="font-size: 13px; font-weight: 800; color: #1e3a8a; margin-top: 4px;">Kendi Logonuzla PDF Reçete ve WhatsApp Başlığı</div>
            <p style="font-size: 11.5px; color: #475569; margin: 2px 0 0;">Yazdırdığınız tüm diyet reçetelerinin ve WhatsApp mesajlarının başında kendi logonuz ve unvanınız yer alır.</p>
          </div>
          <div style="display: flex; align-items: center; gap: 10px; flex-wrap: wrap;">
            <button type="button" onclick="saveSolClinicBrandPreview()" style="background: #1e3a8a; color: #fff; border: none; padding: 10px 18px; border-radius: 10px; font-weight: 800; font-size: 13px; cursor: pointer;">✓ Klinik Markasını Kaydet</button>
            <span id="sol-clinic-brand-saved-msg" style="font-size: 12px; font-weight: 800; color: #2563eb; display: none;">✅ Marka kimliğiniz kaydedildi!</span>
          </div>
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
        <div style="background: #f4f7fb; border: 1.5px solid #cbd5e1; border-radius: 16px; padding: 16px;">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 14px;">
            <div style="display: flex; align-items: center; gap: 10px;">
              <div style="width: 40px; height: 40px; border-radius: 50%; background: #1e3a8a; color: #fff; display: flex; align-items: center; justify-content: center; font-weight: 900;">AY</div>
              <div>
                <strong style="font-size: 14px; color: #0f172a;">Ahmet Yılmaz (32 Yaş)</strong>
                <div style="font-size: 11.5px; color: #475569;">Hedef: Kilo Verme & İnsülin Direnci • 4. Hafta</div>
              </div>
            </div>
            <span style="background: #eff6ff; color: #1e3a8a; font-size: 12px; font-weight: 800; padding: 4px 10px; border-radius: 8px;">Uyum: %94</span>
          </div>

          <div style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 8px; margin-bottom: 14px; text-align: center;">
            <div style="background: #fff; border: 1px solid #cbd5e1; border-radius: 10px; padding: 10px;">
              <div style="font-size: 10.5px; color: #475569; font-weight: 700;">BAŞLANGIÇ</div>
              <div style="font-size: 16px; font-weight: 900; color: #0f172a;">88.5 kg</div>
            </div>
            <div style="background: #fff; border: 1px solid #cbd5e1; border-radius: 10px; padding: 10px;">
              <div style="font-size: 10.5px; color: #475569; font-weight: 700;">GÜNCEL</div>
              <div style="font-size: 16px; font-weight: 900; color: #1e3a8a;">81.2 kg</div>
            </div>
            <div style="background: #fff; border: 1px solid #cbd5e1; border-radius: 10px; padding: 10px;">
              <div style="font-size: 10.5px; color: #475569; font-weight: 700;">VERİLEN KİLO</div>
              <div style="font-size: 16px; font-weight: 900; color: #4f46e5;">-7.3 kg</div>
            </div>
            <div style="background: #fff; border: 1px solid #cbd5e1; border-radius: 10px; padding: 10px;">
              <div style="font-size: 10.5px; color: #475569; font-weight: 700;">HEDEF</div>
              <div style="font-size: 16px; font-weight: 900; color: #0f172a;">75.0 kg</div>
            </div>
          </div>

          <div style="background: #ffffff; border: 1px solid #cbd5e1; border-radius: 12px; padding: 12px; font-size: 12px; color: #475569;">
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
        <div style="background: #f4f7fb; border: 1.5px solid #cbd5e1; border-radius: 16px; padding: 18px;">
          <h4 style="font-size: 14.5px; font-weight: 800; color: #0f172a; margin-bottom: 12px;">🌐 Uzaktan Danışan & Video Seans Konsolu</h4>
          <div style="display: flex; flex-direction: column; gap: 10px; margin-bottom: 14px;">
            <div style="background: #ffffff; border: 1px solid #cbd5e1; border-radius: 10px; padding: 12px; display: flex; justify-content: space-between; align-items: center;">
              <div>
                <strong style="font-size: 13px; color: #0f172a;">📱 Tek Tıkla WhatsApp Diyet Gönderimi</strong>
                <div style="font-size: 11.5px; color: #475569;">Hazırladığınız 7 günlük liste danışanın telefonuna şık formatta iletilir.</div>
              </div>
              <span style="background: #eff6ff; color: #1e3a8a; font-size: 11px; font-weight: 800; padding: 4px 8px; border-radius: 6px;">Aktif</span>
            </div>
            <div style="background: #ffffff; border: 1px solid #cbd5e1; border-radius: 10px; padding: 12px; display: flex; justify-content: space-between; align-items: center;">
              <div>
                <strong style="font-size: 13px; color: #0f172a;">🎥 Google Meet / Zoom Entegrasyonu</strong>
                <div style="font-size: 11.5px; color: #475569;">Randevu saatinde danışana otomatik görüntülü görüşme linki SMS gider.</div>
              </div>
              <span style="background: #eff6ff; color: #1e3a8a; font-size: 11px; font-weight: 800; padding: 4px 8px; border-radius: 6px;">Aktif</span>
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
        <div style="background: #f4f7fb; border: 1.5px solid #cbd5e1; border-radius: 16px; padding: 16px;">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px;">
            <strong style="font-size: 14px; color: #0f172a;">📊 Excel Danışan Çizelgesi (Önizleme)</strong>
            <span style="background: #e0f2fe; color: #1e3a8a; font-size: 11px; font-weight: 800; padding: 3px 8px; border-radius: 6px;">Excel/CSV Uyumlu</span>
          </div>
          <div style="overflow-x: auto; background: #ffffff; border: 1px solid #cbd5e1; border-radius: 8px; margin-bottom: 10px;">
            <table style="width: 100%; border-collapse: collapse; font-size: 11.5px;">
              <tr style="background: #1e3a8a; color: #fff; font-weight: 800;">
                <th style="padding: 6px 10px;">Danışan</th>
                <th style="padding: 6px 10px;">Telefon</th>
                <th style="padding: 6px 10px;">Başlangıç</th>
                <th style="padding: 6px 10px;">Güncel</th>
                <th style="padding: 6px 10px;">Fark</th>
                <th style="padding: 6px 10px;">Protokol</th>
              </tr>
              <tr style="border-bottom: 1px solid #e2e8f0;">
                <td style="padding: 6px 10px; font-weight: 800; color: #1e3a8a;">Zehra Bölük</td>
                <td style="padding: 6px 10px;">0555 123 45 67</td>
                <td style="padding: 6px 10px;">78.5 kg</td>
                <td style="padding: 6px 10px; font-weight: 800;">72.8 kg</td>
                <td style="padding: 6px 10px;"><span style="color:#1e3a8a; font-weight:800;">-5.7 kg 🔻</span></td>
                <td style="padding: 6px 10px;">HOMA-IR / Düşük GI</td>
              </tr>
              <tr>
                <td style="padding: 6px 10px; font-weight: 800; color: #1e3a8a;">Murat Korkmaz</td>
                <td style="padding: 6px 10px;">0555 987 65 43</td>
                <td style="padding: 6px 10px;">96.0 kg</td>
                <td style="padding: 6px 10px; font-weight: 800;">91.2 kg</td>
                <td style="padding: 6px 10px;"><span style="color:#1e3a8a; font-weight:800;">-4.8 kg 🔻</span></td>
                <td style="padding: 6px 10px;">Akdeniz & Defisit</td>
              </tr>
            </table>
          </div>
          <p style="font-size: 12px; color: #475569; line-height: 1.5; margin: 0;">
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
        <div style="background: #f4f7fb; border: 1.5px solid #cbd5e1; border-radius: 16px; padding: 16px;">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px;">
            <strong style="font-size: 14px; color: #0f172a;">📅 Akıllı Randevu & Seans Ajandası</strong>
            <span style="background: #e0f2fe; color: #1e3a8a; font-size: 11px; font-weight: 800; padding: 3px 8px; border-radius: 6px;">SMS Onayı Aktif</span>
          </div>
          <div style="display: flex; flex-direction: column; gap: 8px;">
            <div style="background: #ffffff; border-left: 4px solid #1e3a8a; border-radius: 8px; padding: 10px 14px; display: flex; justify-content: space-between; align-items: center; border-top: 1px solid #cbd5e1; border-right: 1px solid #cbd5e1; border-bottom: 1px solid #cbd5e1;">
              <div>
                <strong style="font-size: 13px; color: #0f172a;">10:00 - Zeynep Kaya (Online)</strong>
                <div style="font-size: 11.5px; color: #475569;">2. Kontrol Seansı • SMS Bildirimi İletildi (✓)</div>
              </div>
              <span style="background: #eff6ff; color: #1e3a8a; font-size: 11px; font-weight: 800; padding: 3px 8px; border-radius: 6px;">SMS İletildi</span>
            </div>
            <div style="background: #ffffff; border-left: 4px solid #4f46e5; border-radius: 8px; padding: 10px 14px; display: flex; justify-content: space-between; align-items: center; border-top: 1px solid #cbd5e1; border-right: 1px solid #cbd5e1; border-bottom: 1px solid #cbd5e1;">
              <div>
                <strong style="font-size: 13px; color: #0f172a;">14:30 - Caner Demir (Yüz Yüze)</strong>
                <div style="font-size: 11.5px; color: #475569;">İlk Görüşme & Anamnez • Rehberden Aktarıldı</div>
              </div>
              <span style="background: #eef2ff; color: #4f46e5; font-size: 11px; font-weight: 800; padding: 3px 8px; border-radius: 6px;">Onay Bekliyor</span>
            </div>
          </div>
          <div style="margin-top: 10px; font-size: 11.5px; color: #1e3a8a; font-weight: 700;">
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
        <div style="background: #f4f7fb; border: 1.5px solid #cbd5e1; border-radius: 16px; padding: 18px;">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 10px; flex-wrap: wrap; gap: 8px;">
            <h4 style="font-size: 15px; font-weight: 800; color: #1e3a8a; margin: 0;">🩸 e-Nabız Biyokimya Tahlil Analizörü & HOMA-IR Simülatörü</h4>
            <span style="font-size: 11px; background: #ecfdf5; color: #059669; font-weight: 800; padding: 3px 10px; border-radius: 999px; border: 1px solid #a7f3d0;">✓ Sağlık Bakanlığı Tetkik Uyumlu</span>
          </div>
          <p style="font-size: 12px; color: #475569; margin-bottom: 12px;">Danışanın e-Nabız laboratuvar tahlil sonuçlarını saniyeler içinde analiz eder, HOMA-IR ve metabolik risk skorlarını kanıta dayalı klinik protokollerle raporlar.</p>

          <!-- Hazır Klinik Vaka Seçicileri -->
          <div style="margin-bottom: 12px; display: flex; flex-wrap: wrap; gap: 6px; align-items: center;">
            <span style="font-size: 11px; font-weight: 800; color: #475569;">HAZIR VAKA SEÇ:</span>
            <button type="button" onclick="setEnabizPreset(108, 16.5)" style="background: #ffffff; border: 1px solid #3b82f6; color: #1e3a8a; padding: 3px 9px; border-radius: 999px; font-size: 11px; font-weight: 700; cursor: pointer;">Vaka 1: İnsülin Direnci (108/16.5)</button>
            <button type="button" onclick="setEnabizPreset(126, 22.0)" style="background: #ffffff; border: 1px solid #ef4444; color: #b91c1c; padding: 3px 9px; border-radius: 999px; font-size: 11px; font-weight: 700; cursor: pointer;">Vaka 2: Pre-Diyabet (126/22.0)</button>
            <button type="button" onclick="setEnabizPreset(86, 5.8)" style="background: #ffffff; border: 1px solid #10b981; color: #047857; padding: 3px 9px; border-radius: 999px; font-size: 11px; font-weight: 700; cursor: pointer;">Vaka 3: Optimal (86/5.8)</button>
          </div>
          
          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 12px; margin-bottom: 12px;">
            <div>
              <label style="font-size: 11.5px; font-weight: 800; color: #334155;">Açlık Kan Glikozu (mg/dL)</label>
              <input type="number" id="sol-enabiz-glikoz" value="108" oninput="calcSolEnabizHoma()" style="width: 100%; padding: 9px 12px; border-radius: 8px; border: 1.5px solid #94a3b8; font-size: 13.5px; font-weight: 800; outline: none; margin-top: 4px;">
            </div>
            <div>
              <label style="font-size: 11.5px; font-weight: 800; color: #334155;">Açlık İnsülini (µIU/mL)</label>
              <input type="number" id="sol-enabiz-insulin" value="16.5" step="0.5" oninput="calcSolEnabizHoma()" style="width: 100%; padding: 9px 12px; border-radius: 8px; border: 1.5px solid #94a3b8; font-size: 13.5px; font-weight: 800; outline: none; margin-top: 4px;">
            </div>
          </div>

          <div style="display: flex; gap: 8px; margin-bottom: 14px; flex-wrap: wrap;">
            <button type="button" id="btn-run-enabiz-analysis" onclick="calcSolEnabizHoma(true)" style="background: linear-gradient(135deg, #1e3a8a 0%, #0284c7 100%); color: #ffffff; border: none; padding: 10px 20px; border-radius: 10px; font-weight: 800; font-size: 13px; cursor: pointer; display: inline-flex; align-items: center; gap: 6px; box-shadow: 0 4px 12px rgba(30, 58, 138, 0.25);">
              <span>⚡</span> <span>e-Nabız Analizi Yap & Raporla</span>
            </button>
            <button type="button" onclick="loadSimulatedLabReport()" style="background: #ffffff; color: #1e3a8a; border: 1.5px solid #3b82f6; padding: 10px 16px; border-radius: 10px; font-weight: 800; font-size: 13px; cursor: pointer;">
              <span>📋</span> <span>Otomatik Laboratuvar Verisi Çek</span>
            </button>
          </div>

          <div id="sol-enabiz-result" style="background: #ffffff; border: 1.5px solid #cbd5e1; border-radius: 14px; padding: 16px; box-shadow: 0 4px 14px rgba(15, 23, 42, 0.05); transition: all 0.25s ease;">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 10px; padding-bottom: 8px; border-bottom: 1px solid #e2e8f0; flex-wrap: wrap; gap: 8px;">
              <div>
                <span style="font-size: 11px; font-weight: 800; color: #64748b; text-transform: uppercase;">ANALİZ BULGUSU</span>
                <div style="font-size: 13.5px; font-weight: 900; color: #0f172a;">Matematiksel HOMA-IR ve Metabolik Skor</div>
              </div>
              <span id="sol-enabiz-homa-val" style="background: #fee2e2; color: #991b1b; font-weight: 900; font-size: 14px; padding: 5px 14px; border-radius: 8px; border: 1.5px solid #f87171;">4.40 (Yüksek İnsülin Direnci)</span>
            </div>

            <!-- Parametreler Grid -->
            <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 8px; margin-bottom: 12px; text-align: center;">
              <div style="background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px; padding: 8px;">
                <div style="font-size: 10.5px; color: #64748b; font-weight: 700;">TAHMİNİ HbA1c</div>
                <div id="sol-enabiz-hba1c" style="font-size: 14px; font-weight: 900; color: #0f172a;">%5.4</div>
              </div>
              <div style="background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px; padding: 8px;">
                <div style="font-size: 10.5px; color: #64748b; font-weight: 700;">GLİKOZ/İNSÜLİN</div>
                <div id="sol-enabiz-ratio" style="font-size: 14px; font-weight: 900; color: #0f172a;">6.55</div>
              </div>
              <div style="background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px; padding: 8px;">
                <div style="font-size: 10.5px; color: #64748b; font-weight: 700;">METABOLİK RİSK</div>
                <div id="sol-enabiz-risk" style="font-size: 14px; font-weight: 900; color: #dc2626;">Yüksek Risk</div>
              </div>
            </div>

            <div id="sol-enabiz-comment" style="font-size: 12px; color: #334155; line-height: 1.55; background: #eff6ff; border-left: 4px solid #3b82f6; padding: 10px 12px; border-radius: 6px;">
              <strong>Klinik Yorum:</strong> HOMA-IR > 2.5 eşiği aşılmıştır. Danışanda belirgin hiperinsülinemi mevcuttur. Düşük glisemik indeksli fonksiyonel beslenme, krom desteği ve akşam öğününde hafif sebze protokolü önerilir.
            </div>
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
        <div style="background: #f4f7fb; border: 1.5px solid #cbd5e1; border-radius: 16px; padding: 18px;">
          <h4 style="font-size: 14.5px; font-weight: 800; color: #0f172a; margin-bottom: 12px;">📱 Danışan Dijital Anamnez Formu</h4>
          <div style="display: flex; flex-direction: column; gap: 10px; margin-bottom: 14px;">
            <div style="background: #ffffff; border: 1px solid #cbd5e1; border-radius: 10px; padding: 12px;">
              <strong style="font-size: 12.5px; color: #0f172a;">1. Sağlık ve Tıbbi Geçmiş</strong>
              <div style="font-size: 11.5px; color: #475569; margin-top: 2px;">Tansiyon, tiroid, diyabet, gıda alerjileri ve kullanılan ilaçlar</div>
            </div>
            <div style="background: #ffffff; border: 1px solid #cbd5e1; border-radius: 10px; padding: 12px;">
              <strong style="font-size: 12.5px; color: #0f172a;">2. Beslenme Alışkanlıkları & Uyku</strong>
              <div style="font-size: 11.5px; color: #475569; margin-top: 2px;">Su tüketimi, öğün saatleri, tatlı krizleri ve gastrointestinal şikayetler</div>
            </div>
            <div style="background: #ffffff; border: 1px solid #cbd5e1; border-radius: 10px; padding: 12px;">
              <strong style="font-size: 12.5px; color: #0f172a;">3. KVKK & Açık Rıza Dijital İmzası</strong>
              <div style="font-size: 11.5px; color: #475569; margin-top: 2px;">SMS doğrulamalı zaman damgalı yasal onam belgesi</div>
            </div>
          </div>
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
        <div style="background: #f4f7fb; border: 1.5px solid #cbd5e1; border-radius: 16px; padding: 18px;">
          <h4 style="font-size: 14.5px; font-weight: 800; color: #0f172a; margin-bottom: 12px;">Kliniğinize Özel Canlı BioLink Vitrini</h4>
          <div style="background: #ffffff; border: 1.5px solid #cbd5e1; border-radius: 16px; padding: 18px; max-width: 380px; margin: 0 auto 14px; text-align: center; box-shadow: 0 4px 15px rgba(0,0,0,0.05);">
            <div style="width: 64px; height: 64px; border-radius: 50%; background: #1e3a8a; color: #fff; display: flex; align-items: center; justify-content: center; font-size: 26px; margin: 0 auto 10px;">🩺</div>
            <h3 style="font-size: 16px; font-weight: 900; color: #0f172a; margin: 0;">Uzm. Dyt. Selin Yılmaz</h3>
            <p style="font-size: 12px; color: #475569; margin: 4px 0 14px;">Klinik & Fonksiyonel Beslenme Uzmanı</p>
            
            <div style="display: flex; flex-direction: column; gap: 8px;">
              <a href="javascript:void(0)" onclick="startClinicTrialOrRegister('Profesyonel Paket')" style="background: #eff6ff; border: 1px solid #3b82f6; color: #1e3a8a; padding: 10px; border-radius: 10px; text-decoration: none; font-weight: 800; font-size: 12.5px;">📅 Online Randevu Al</a>
              <a href="https://wa.me/905321202846" target="_blank" style="background: #eef2ff; border: 1px solid #e6d3c9; color: #4f46e5; padding: 10px; border-radius: 10px; text-decoration: none; font-weight: 800; font-size: 12.5px;">💬 WhatsApp ile Danış</a>
              <a href="javascript:void(0)" onclick="openSolutionModal('diet_program')" style="background: #f4f7fb; border: 1px solid #cbd5e1; color: #0f172a; padding: 10px; border-radius: 10px; text-decoration: none; font-weight: 800; font-size: 12.5px;">🥗 7 Günlük Klinik Diyet Listesi</a>
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
        <div style="background: #f4f7fb; border: 1.5px solid #cbd5e1; border-radius: 16px; padding: 18px;">
          <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(110px, 1fr)); gap: 10px; margin-bottom: 12px;">
            <div>
              <label style="font-size: 11px; font-weight: 700; color: #475569;">Cinsiyet</label>
              <select id="sol-calc-gender" style="width: 100%; padding: 8px; border-radius: 8px; border: 1.5px solid #94a3b8; font-size: 12.5px; font-weight: 700;">
                <option value="k">Kadın</option>
                <option value="e">Erkek</option>
              </select>
            </div>
            <div>
              <label style="font-size: 11px; font-weight: 700; color: #475569;">Yaş</label>
              <input type="number" id="sol-calc-age" value="30" style="width: 100%; padding: 8px; border-radius: 8px; border: 1.5px solid #94a3b8; font-size: 12.5px; font-weight: 700;">
            </div>
            <div>
              <label style="font-size: 11px; font-weight: 700; color: #475569;">Boy (cm)</label>
              <input type="number" id="sol-calc-height" value="168" style="width: 100%; padding: 8px; border-radius: 8px; border: 1.5px solid #94a3b8; font-size: 12.5px; font-weight: 700;">
            </div>
            <div>
              <label style="font-size: 11px; font-weight: 700; color: #475569;">Kilo (kg)</label>
              <input type="number" id="sol-calc-weight" value="68" style="width: 100%; padding: 8px; border-radius: 8px; border: 1.5px solid #94a3b8; font-size: 12.5px; font-weight: 700;">
            </div>
            <div>
              <label style="font-size: 11px; font-weight: 700; color: #475569;">Fiziksel Aktivite</label>
              <select id="sol-calc-pal" style="width: 100%; padding: 8px; border-radius: 8px; border: 1.5px solid #94a3b8; font-size: 12.5px; font-weight: 700;">
                <option value="1.2">Masa Başı (Sedanter 1.2)</option>
                <option value="1.375">Hafif Egzersiz (1.375)</option>
                <option value="1.55" selected>Orta Düzey (1.55)</option>
                <option value="1.725">Ağır Sporcu (1.725)</option>
              </select>
            </div>
          </div>

          <button type="button" onclick="runSolCalorieCalc()" style="background: #1e3a8a; color: #ffffff; border: none; padding: 10px 20px; border-radius: 8px; font-weight: 800; font-size: 13px; cursor: pointer;">Metrikleri Hesapla</button>

          <div id="sol-calc-result" style="margin-top: 14px; display: grid; grid-template-columns: repeat(3, 1fr); gap: 10px;">
            <div style="background: #ffffff; border: 1px solid #cbd5e1; border-radius: 10px; padding: 12px; text-align: center;">
              <div style="font-size: 11px; font-weight: 700; color: #475569;">BAZAL METABOLİZMA (BMR)</div>
              <div id="sol-bmr-val" style="font-size: 20px; font-weight: 900; color: #1e3a8a; margin-top: 2px;">1.438 kcal</div>
            </div>
            <div style="background: #ffffff; border: 1px solid #cbd5e1; border-radius: 10px; padding: 12px; text-align: center;">
              <div style="font-size: 11px; font-weight: 700; color: #475569;">GÜNLÜK İHTİYAÇ (TDEE)</div>
              <div id="sol-tdee-val" style="font-size: 20px; font-weight: 900; color: #0f172a; margin-top: 2px;">2.229 kcal</div>
            </div>
            <div style="background: #ffffff; border: 1px solid #cbd5e1; border-radius: 10px; padding: 12px; text-align: center;">
              <div style="font-size: 11px; font-weight: 700; color: #475569;">KİLO VERME HEDEFİ</div>
              <div id="sol-diet-cal-val" style="font-size: 20px; font-weight: 900; color: #4f46e5; margin-top: 2px;">1.729 kcal</div>
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
        <div style="background: #f4f7fb; border: 1.5px solid #cbd5e1; border-radius: 16px; padding: 16px;">
          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 10px;">
            <div style="background: #fff; border: 1px solid #cbd5e1; border-radius: 10px; padding: 12px;">
              <strong style="font-size: 13px; color: #1e3a8a;">🌿 Fonksiyonel Tıp & Eliminasyon</strong>
              <p style="font-size: 11.5px; color: #475569; margin: 4px 0 0;">Geçirgen bağırsak, SIBO, histamin intoleransı ve otoimmün hastalık protokolleri.</p>
            </div>
            <div style="background: #fff; border: 1px solid #cbd5e1; border-radius: 10px; padding: 12px;">
              <strong style="font-size: 13px; color: #1e3a8a;">🏃 Sporcu Beslenmesi & Hipertrofi</strong>
              <p style="font-size: 11.5px; color: #475569; margin: 4px 0 0;">Antrenman öncesi/sonrası beslenme, kreatin/protein zamanlaması ve hidrasyon.</p>
            </div>
            <div style="background: #fff; border: 1px solid #cbd5e1; border-radius: 10px; padding: 12px;">
              <strong style="font-size: 13px; color: #1e3a8a;">⚖️ Bariatrik Cerrahi Beslenmesi</strong>
              <p style="font-size: 11.5px; color: #475569; margin: 4px 0 0;">Tüp mide ve gastrik bypass sonrası berrak sıvı, püre ve katı geçiş evreleri.</p>
            </div>
            <div style="background: #fff; border: 1px solid #cbd5e1; border-radius: 10px; padding: 12px;">
              <strong style="font-size: 13px; color: #1e3a8a;">👶 Pediatri & Çocuk Beslenmesi</strong>
              <p style="font-size: 11.5px; color: #475569; margin: 4px 0 0;">Persentil eğrileri, okul çağı çocuklarda büyüme-gelişme ve iştahsızlık takibi.</p>
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
        <div style="background: #f4f7fb; border: 1.5px solid #cbd5e1; border-radius: 16px; padding: 16px;">
          <div style="display: flex; gap: 8px; margin-bottom: 12px;">
            <input type="text" placeholder="Şehir veya Uzman Adı ile Arayın..." style="flex: 1; padding: 9px 12px; border-radius: 8px; border: 1.5px solid #94a3b8; font-size: 13px; outline: none;">
            <select style="padding: 9px; border-radius: 8px; border: 1.5px solid #94a3b8; font-size: 12.5px; font-weight: 700;">
              <option>Tüm Şehirler</option>
              <option>İstanbul</option>
              <option>Ankara</option>
              <option>İzmir</option>
            </select>
          </div>
          <div style="display: flex; flex-direction: column; gap: 8px;">
            <div style="background: #fff; border: 1px solid #cbd5e1; border-radius: 10px; padding: 10px 14px; display: flex; justify-content: space-between; align-items: center;">
              <div>
                <strong style="font-size: 13px; color: #0f172a;">Uzm. Dyt. Selin Yılmaz</strong>
                <div style="font-size: 11.5px; color: #475569;">İstanbul • Fonksiyonel Tıp & İnsülin Direnci</div>
              </div>
              <span style="background: #eff6ff; color: #1e3a8a; font-size: 11px; font-weight: 800; padding: 4px 8px; border-radius: 6px;">Doğrulanmış Klinik</span>
            </div>
            <div style="background: #fff; border: 1px solid #cbd5e1; border-radius: 10px; padding: 10px 14px; display: flex; justify-content: space-between; align-items: center;">
              <div>
                <strong style="font-size: 13px; color: #0f172a;">Dyt. Mert Çelik</strong>
                <div style="font-size: 11.5px; color: #475569;">Ankara • Sporcu Beslenmesi & Vücut Geliştirme</div>
              </div>
              <span style="background: #eff6ff; color: #1e3a8a; font-size: 11px; font-weight: 800; padding: 4px 8px; border-radius: 6px;">Doğrulanmış Klinik</span>
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
        <div style="background: #f4f7fb; border: 1.5px solid #cbd5e1; border-radius: 16px; padding: 16px;">
          <div style="display: flex; flex-direction: column; gap: 10px;">
            <div style="background: #ffffff; border: 1px solid #cbd5e1; border-radius: 10px; padding: 12px;">
              <span style="font-size: 10.5px; font-weight: 800; color: #4f46e5; text-transform: uppercase;">KLİNİK MAKALE • 2024</span>
              <h4 style="font-size: 14px; font-weight: 800; color: #0f172a; margin: 3px 0 5px;">HOMA-IR > 2.5 Vakalarında Krononütrisyon ve Sirkadiyen Ritim Yönetimi</h4>
              <p style="font-size: 12px; color: #475569; line-height: 1.5; margin: 0;">Son ESPEN kılavuzlarına göre akşam yemeğinde yüksek yağ ve basit karbonhidrat kısıtlaması, insülin duyarlılığını %34 oranında artırmaktadır.</p>
            </div>
            <div style="background: #ffffff; border: 1px solid #cbd5e1; border-radius: 10px; padding: 12px;">
              <span style="font-size: 10.5px; font-weight: 800; color: #1e3a8a; text-transform: uppercase;">DSÖ RAPORU</span>
              <h4 style="font-size: 14px; font-weight: 800; color: #0f172a; margin: 3px 0 5px;">Serbest Şeker Tüketiminin Günlük Kalorinin %5'i ile Sınırlandırılması</h4>
              <p style="font-size: 12px; color: #475569; line-height: 1.5; margin: 0;">DSÖ'nün kronik inflamasyon ve karaciğer yağlanmasını önleme yönergeleri çerçevesinde rafine şeker oranı 0 olan klinik beslenme modelleri.</p>
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
        <div style="background: #f4f7fb; border: 1.5px solid #cbd5e1; border-radius: 16px; padding: 16px;">
          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 10px;">
            <div style="background: #fff; border: 1px solid #cbd5e1; border-radius: 10px; padding: 12px;">
              <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 4px;">
                <strong style="font-size: 13px; color: #0f172a;">Fırında Somon & Kuşkonmaz</strong>
                <span style="background: #eff6ff; color: #1e3a8a; font-size: 11px; font-weight: 800; padding: 2px 6px; border-radius: 4px;">420 kcal</span>
              </div>
              <p style="font-size: 11.5px; color: #475569; margin: 0 0 4px;">P: 38g • K: 12g • Y: 24g</p>
              <div style="font-size: 11px; color: #4f46e5; font-weight: 700;">Değişim: 4 Et + 1 Sebze + 2 Yağ</div>
            </div>
            <div style="background: #fff; border: 1px solid #cbd5e1; border-radius: 10px; padding: 12px;">
              <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 4px;">
                <strong style="font-size: 13px; color: #0f172a;">Chia & Yaban Mersinli Gece Lapası</strong>
                <span style="background: #eff6ff; color: #1e3a8a; font-size: 11px; font-weight: 800; padding: 2px 6px; border-radius: 4px;">280 kcal</span>
              </div>
              <p style="font-size: 11.5px; color: #475569; margin: 0 0 4px;">P: 14g • K: 32g • Y: 8g</p>
              <div style="font-size: 11px; color: #4f46e5; font-weight: 700;">Değişim: 1 Süt + 1 Meyve + 1 Ekmek</div>
            </div>
            <div style="background: #fff; border: 1px solid #cbd5e1; border-radius: 10px; padding: 12px;">
              <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 4px;">
                <strong style="font-size: 13px; color: #0f172a;">Kinoa & Avokadolu Yeşil Detoks</strong>
                <span style="background: #eff6ff; color: #1e3a8a; font-size: 11px; font-weight: 800; padding: 2px 6px; border-radius: 4px;">340 kcal</span>
              </div>
              <p style="font-size: 11.5px; color: #475569; margin: 0 0 4px;">P: 11g • K: 36g • Y: 16g</p>
              <div style="font-size: 11px; color: #4f46e5; font-weight: 700;">Değişim: 2 Ekmek + 2 Yağ + 1 Sebze</div>
            </div>
            <div style="background: #fff; border: 1px solid #cbd5e1; border-radius: 10px; padding: 12px;">
              <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 4px;">
                <strong style="font-size: 13px; color: #0f172a;">Mercimek & Zerdeçallı Çorba</strong>
                <span style="background: #eff6ff; color: #1e3a8a; font-size: 11px; font-weight: 800; padding: 2px 6px; border-radius: 4px;">210 kcal</span>
              </div>
              <p style="font-size: 11.5px; color: #475569; margin: 0 0 4px;">P: 13g • K: 30g • Y: 3g</p>
              <div style="font-size: 11px; color: #4f46e5; font-weight: 700;">Değişim: 1 Et + 1.5 Ekmek + İltihap Karşıtı</div>
            </div>
          </div>
        </div>
      `;
    }
  }
};

function saveSolClinicBrandPreview() {
  var cEl = document.getElementById('demo-clinic-name');
  var dEl = document.getElementById('demo-dietitian-name');
  var msgEl = document.getElementById('sol-clinic-brand-saved-msg');
  try {
    if (cEl && cEl.value) localStorage.setItem('diyetkalfa_clinic_name', cEl.value.trim());
    if (dEl && dEl.value) localStorage.setItem('diyetkalfa_dietitian_name', dEl.value.trim());
  } catch(e) {}
  if (msgEl) {
    msgEl.style.display = 'inline';
    setTimeout(function() { msgEl.style.display = 'none'; }, 3500);
  }
}

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

  if (iconBadge) {
    iconBadge.textContent = data.icon;
    if (window.DiyetKalfaLuxuryUI && window.DiyetKalfaLuxuryUI.SVG_ICONS) {
      var mapKey = {
        'diet_program': 'diet', 'ai_assistant': 'ai', 'clinic_mgmt': 'clinic',
        'client_tracking': 'users', 'excel_tracking': 'excel', 'online_diet': 'demo',
        'appointments': 'calendar', 'enabiz': 'lab', 'anamnez': 'doc',
        'website': 'globe', 'calorie': 'calc', 'branches': 'shield',
        'experts': 'features', 'blog': 'doc', 'recipes': 'diet'
      }[key] || 'features';
      iconBadge.innerHTML = window.DiyetKalfaLuxuryUI.SVG_ICONS[mapKey];
      iconBadge.style.background = 'linear-gradient(145deg, #1e3a8a, #0f172a)';
      iconBadge.style.color = '#38bdf8';
      iconBadge.style.boxShadow = 'inset 0 2px 3px rgba(255,255,255,0.35), 0 6px 14px rgba(15,23,42,0.35)';
    }
  }
  if (title) title.textContent = data.title;
  if (desc) desc.textContent = data.desc;
  if (body) body.innerHTML = data.render();

  modal.style.display = 'flex';
  if (window.DiyetKalfaLuxuryUI && typeof window.DiyetKalfaLuxuryUI.upgradeButtonsAndIconsTo3DEmbossed === 'function') {
    window.DiyetKalfaLuxuryUI.upgradeButtonsAndIconsTo3DEmbossed();
  }
}

function closeSolutionModal() {
  var modal = document.getElementById('modal-solution-viewer');
  if (modal) modal.style.display = 'none';
}

function runSolCalorieCalc() {
  var gender = document.getElementById('sol-calc-gender') ? document.getElementById('sol-calc-gender').value : 'k';
  var age = parseFloat(document.getElementById('sol-calc-age').value) || 30;
  var height = parseFloat(document.getElementById('sol-calc-height').value) || 168;
  var weight = parseFloat(document.getElementById('sol-calc-weight').value) || 68;
  var pal = parseFloat(document.getElementById('sol-calc-pal').value) || 1.55;

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

function setEnabizPreset(glikoz, insulin) {
  var gEl = document.getElementById('sol-enabiz-glikoz');
  var iEl = document.getElementById('sol-enabiz-insulin');
  if (gEl) gEl.value = glikoz;
  if (iEl) iEl.value = insulin;
  calcSolEnabizHoma(true);
}

function loadSimulatedLabReport() {
  var sampleCases = [
    { g: 114, ins: 18.2, label: 'e-Nabız Laboratuvar ID #94821 (Açlık Kan Sayımı)' },
    { g: 132, ins: 24.5, label: 'e-Nabız Laboratuvar ID #77103 (Endokrin Paneli)' },
    { g: 91,  ins: 6.2,  label: 'e-Nabız Laboratuvar ID #33149 (Rutin Kontrol)' }
  ];
  var chosen = sampleCases[Math.floor(Math.random() * sampleCases.length)];
  setEnabizPreset(chosen.g, chosen.ins);
}

function calcSolEnabizHoma(isUserAction) {
  var gEl = document.getElementById('sol-enabiz-glikoz');
  var iEl = document.getElementById('sol-enabiz-insulin');
  var g = parseFloat(gEl ? gEl.value : 108) || 108;
  var ins = parseFloat(iEl ? iEl.value : 16.5) || 16.5;
  var homa = (g * ins) / 405.0;
  var homaFormatted = homa.toFixed(2);

  // Tahmini HbA1c ve Glikoz/İnsülin oranı
  var estHbA1c = ((g + 46.7) / 28.7).toFixed(1);
  var giRatio = (g / (ins || 1)).toFixed(2);

  var resBox = document.getElementById('sol-enabiz-homa-val');
  var hba1cBox = document.getElementById('sol-enabiz-hba1c');
  var ratioBox = document.getElementById('sol-enabiz-ratio');
  var riskBox = document.getElementById('sol-enabiz-risk');
  var commentBox = document.getElementById('sol-enabiz-comment');
  var mainResult = document.getElementById('sol-enabiz-result');

  if (hba1cBox) hba1cBox.textContent = '%' + estHbA1c;
  if (ratioBox) ratioBox.textContent = giRatio;

  if (resBox && riskBox && commentBox) {
    if (homa >= 3.5) {
      resBox.textContent = homaFormatted + ' (Ciddi İnsülin Direnci)';
      resBox.style.background = '#fee2e2';
      resBox.style.color = '#991b1b';
      resBox.style.borderColor = '#f87171';
      riskBox.textContent = 'Yüksek Risk';
      riskBox.style.color = '#dc2626';
      commentBox.innerHTML = '<strong>Klinik Yorum:</strong> HOMA-IR (' + homaFormatted + ') kritik eşiğin oldukça üzerindedir. Ciddi periferik doku insülin direnci ve kompansatuvar hiperinsülinemi mevcuttur. <strong>Önerilen Reçete:</strong> Rafine karbonhidratlar tamamen sıfırlanmalı, 16:8 Aralıklı Oruç protokolü uygulanmalı, öğünlerde çözünür lif (chia, yulaf kepeği) ve hekim kontrolünde berberin/krom pikolinat takviyesi değerlendirilmelidir.';
      commentBox.style.background = '#fef2f2';
      commentBox.style.borderLeftColor = '#ef4444';
    } else if (homa > 2.5) {
      resBox.textContent = homaFormatted + ' (Orta Düzey İnsülin Direnci)';
      resBox.style.background = '#fef3c7';
      resBox.style.color = '#92400e';
      resBox.style.borderColor = '#fcd34d';
      riskBox.textContent = 'Orta Risk';
      riskBox.style.color = '#d97706';
      commentBox.innerHTML = '<strong>Klinik Yorum:</strong> HOMA-IR (' + homaFormatted + ') 2.5 sınırını aşmıştır. Erken evre insülin duyarsızlığı başlamıştır. <strong>Önerilen Reçete:</strong> Düşük glisemik indeksli Akdeniz modeli, akşam yemeklerinin hafif sebze ve balık ağırlıklı kurgulanması, yemek sonrası 20 dakikalık tempolu yürüyüş protokolü tavsiye edilir.';
      commentBox.style.background = '#fffbeb';
      commentBox.style.borderLeftColor = '#f59e0b';
    } else {
      resBox.textContent = homaFormatted + ' (Optimal / Sağlıklı)';
      resBox.style.background = '#ecfdf5';
      resBox.style.color = '#065f46';
      resBox.style.borderColor = '#6ee7b7';
      riskBox.textContent = 'Normal';
      riskBox.style.color = '#10b981';
      commentBox.innerHTML = '<strong>Klinik Yorum:</strong> HOMA-IR (' + homaFormatted + ') ve açlık glikoz metabolizması tam fizyolojik referans aralığındadır. Hücresel insülin duyarlılığı yüksektir. Mevcut dengeli beslenme modeli ve sirkadiyen ritim korunmalıdır.';
      commentBox.style.background = '#f0fdf4';
      commentBox.style.borderLeftColor = '#10b981';
    }
  }

  // Tıklama görsel geribildirimi
  if (isUserAction && mainResult) {
    mainResult.style.transform = 'scale(0.98)';
    setTimeout(function() {
      mainResult.style.transform = 'scale(1)';
    }, 150);
  }
}

// ============================================================================
// ÇÖZÜMLER -> YAPAY ZEKA ASİSTANI MODALI (DİYETKALFA AI ENGINE İLE TAM ENTEGRE)
// ============================================================================
function askAiAssistant(question) {
  var inp = document.getElementById('ai-sim-input');
  if (inp) inp.value = question;
  sendLegacyAiSimulationMessage();
}

async function sendLegacyAiSimulationMessage() {
  var inp = document.getElementById('ai-sim-input');
  if (!inp || !inp.value.trim()) return;
  var q = inp.value.trim();
  inp.value = '';

  var hist = document.getElementById('ai-chat-history');
  if (!hist) return;

  var userMsg = document.createElement('div');
  userMsg.style.cssText = "background: #e2e8f0; border-radius: 10px; padding: 8px 12px; color: #0f172a; margin-bottom: 8px; text-align: right; font-weight: 700;";
  userMsg.textContent = "Siz: " + q;
  hist.appendChild(userMsg);

  var aiThinking = document.createElement('div');
  aiThinking.style.cssText = "background: #eff6ff; border: 1px solid #3b82f6; border-radius: 10px; padding: 10px 12px; color: #1e3a8a; margin-bottom: 8px;";
  aiThinking.innerHTML = "<strong>🤖 DiyetKalfa AI:</strong> <em>Sorunuz klinik olarak analiz ediliyor...</em>";
  hist.appendChild(aiThinking);
  hist.scrollTop = hist.scrollHeight;

  try {
    var replyHtml = '';
    if (window.DiyetKalfaAI && typeof window.DiyetKalfaAI.getAiResponseAsync === 'function') {
      replyHtml = await window.DiyetKalfaAI.getAiResponseAsync(q);
    } else if (typeof window.getAiResponse === 'function') {
      replyHtml = window.getAiResponse(q);
    }
    aiThinking.innerHTML = '<div style="margin-bottom:4px;"><strong>🤖 DiyetKalfa AI:</strong></div>' + replyHtml;
    hist.scrollTop = hist.scrollHeight;
  } catch (err) {
    var fallback = (window.DiyetKalfaAI && window.DiyetKalfaAI.getNativeClinicalAiResponse) ? window.DiyetKalfaAI.getNativeClinicalAiResponse(q) : 'Sorunuz analiz edildi.';
    aiThinking.innerHTML = '<div style="margin-bottom:4px;"><strong>🤖 DiyetKalfa AI:</strong></div>' + fallback;
    hist.scrollTop = hist.scrollHeight;
  }
}


