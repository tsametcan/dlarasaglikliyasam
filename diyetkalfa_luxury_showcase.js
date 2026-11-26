/* ========================================================================== */
/* DIYETKALFA - LUXURY SHOWCASE CONTROLLER & INTERACTIVE SUITE                */
/* ========================================================================== */

(function () {
  // 1. WATER TRACKER STATE
  var currentWaterMl = 1875;
  var targetWaterMl = 2500;
  var circleCircumference = 408; // 2 * PI * 65

  window.addWaterIntake = function (amount) {
    currentWaterMl += amount;
    if (currentWaterMl > targetWaterMl) {
      currentWaterMl = targetWaterMl;
    }

    var pct = Math.round((currentWaterMl / targetWaterMl) * 100);
    var offset = circleCircumference - (circleCircumference * (pct / 100));

    var fillEl = document.getElementById('dk-water-fill');
    var pctEl = document.getElementById('dk-water-pct-num');
    var amtEl = document.getElementById('dk-water-amt-text');
    var btnEl = document.getElementById('dk-water-add-btn');

    if (fillEl) fillEl.style.strokeDashoffset = offset;
    if (pctEl) pctEl.textContent = pct + '%';
    if (amtEl) amtEl.textContent = currentWaterMl.toLocaleString('tr-TR') + ' / ' + targetWaterMl.toLocaleString('tr-TR') + ' ml';

    if (btnEl) {
      var origText = btnEl.innerHTML;
      btnEl.innerHTML = '💧 +250ml Eklendi!';
      setTimeout(function () {
        btnEl.innerHTML = origText;
      }, 1000);
    }
  };

  // 2. MEAL CHECKBOX TOGGLE
  window.toggleMealCheck = function (el) {
    if (!el) return;
    el.classList.toggle('checked');
    var icon = el.querySelector('.dk-meal-checkbox');
    if (icon) {
      icon.innerHTML = el.classList.contains('checked') ? '✓' : '';
    }

    // Update checked count badge
    var totalMeals = document.querySelectorAll('.dk-meal-item').length;
    var checkedMeals = document.querySelectorAll('.dk-meal-item.checked').length;
    var badge = document.getElementById('dk-meal-badge-count');
    if (badge) {
      badge.textContent = checkedMeals + '/' + totalMeals + ' Tamamlandı';
    }
  };

  // 3. REVENUE BAR CHART INTERACTIVITY
  window.selectRevenueBar = function (day, amount, element) {
    var bars = document.querySelectorAll('.dk-bar');
    bars.forEach(function (b) { b.classList.remove('active'); });
    if (element) element.classList.add('active');

    var valEl = document.getElementById('dk-chart-rev-number');
    var lblEl = document.getElementById('dk-chart-rev-day');
    if (valEl) valEl.textContent = '₺' + amount.toLocaleString('tr-TR');
    if (lblEl) lblEl.textContent = day + ' Geliri';
  };

  // 4. PRICING CYCLE TOGGLE (MONTHLY / YEARLY)
  window.togglePricingCycle = function (checkbox) {
    var isYearly = checkbox.checked;
    var cards = document.querySelectorAll('.dk-pcard');

    cards.forEach(function (card) {
      var priceEl = card.querySelector('.dk-pcard-price');
      var kdvEl = card.querySelector('.dk-pcard-kdv');
      if (!priceEl) return;

      var monthlyPrice = priceEl.getAttribute('data-monthly');
      var yearlyPrice = priceEl.getAttribute('data-yearly');

      if (monthlyPrice && yearlyPrice) {
        priceEl.textContent = isYearly ? yearlyPrice : monthlyPrice;
      }

      if (kdvEl) {
        if (isYearly) {
          var billedYearly = kdvEl.getAttribute('data-yearly-note');
          if (billedYearly) kdvEl.textContent = billedYearly;
        } else {
          kdvEl.textContent = '* KDV Dahildir';
        }
      }
    });

    // Also update any direct checkout listeners if present
    if (typeof activeCheckoutCycle !== 'undefined') {
      activeCheckoutCycle = isYearly ? '12' : '1';
    }
  };

  // 5. PRICING MATRIX TABLE TOGGLE
  window.togglePricingMatrix = function () {
    var matrix = document.getElementById('dk-pricing-matrix-table');
    var btn = document.getElementById('dk-details-trigger-btn');
    if (!matrix) return;

    var isHidden = matrix.style.display === 'none' || matrix.style.display === '';
    matrix.style.display = isHidden ? 'block' : 'none';

    if (btn) {
      btn.innerHTML = isHidden
        ? '△ Paket detaylarını gizle △'
        : '▽ Paket detaylarını görüntüle ▽';
    }

    if (isHidden) {
      matrix.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
  };

  // 6. 3D FEATURE MODAL OPENER
  window.openDkFeatureDetail = function (key) {
    // Map to existing solutions engine modal
    var keyMap = {
      'sms': 'appointments',
      'randevu': 'appointments',
      'adisyon': 'excel_tracking',
      'stok': 'recipes',
      'muhasebe': 'excel_tracking',
      'mobil': 'online_diet'
    };

    var targetKey = keyMap[key] || 'clinic_mgmt';
    if (typeof openSolutionModal === 'function') {
      openSolutionModal(targetKey);
    } else {
      var contactModal = document.getElementById('modal-contact');
      if (contactModal) contactModal.style.display = 'flex';
    }
  };
})();
