"""
VitaLife WHO Clinical AI - FastAPI & Gemini Entegrasyon Servisi
Dünya Sağlık Örgütü (WHO) ve EFSA Beslenme Standartlarında Klinik Beslenme Motoru
"""

from typing import List, Optional, Dict
from pydantic import BaseModel, Field

# 1. DSÖ Klinik Uyumluluk Modelleri
class WHOComplianceScore(BaseModel):
    sodium_mg: int = Field(description="Günlük toplam sodyum (Hedef: < 2000 mg / 5g tuz)")
    free_sugar_grams: int = Field(description="İlave serbest şeker (Hedef: < %5 toplam kalori)")
    fiber_grams: int = Field(description="Diyet lifi/posa (Hedef: > 25-35g)")
    saturated_fat_percent: float = Field(description="Doymuş yağ enerji oranı (Hedef: < %10)")
    trans_fat_grams: float = Field(default=0.0, description="Endüstriyel trans yağ (Hedef: Kesinlikle 0g)")
    fruits_vegetables_grams: int = Field(description="Toplam meyve ve sebze (Hedef: > 400g / 5 porsiyon)")
    water_target_ml: int = Field(description="DSÖ formülü: Vücut Ağırlığı (kg) x 35 ml")
    who_score: int = Field(ge=0, le=100, description="100 üzerinden DSÖ Klinik Uyumluluk Skoru")

class ClinicalMealItem(BaseModel):
    meal_type: str = Field(description="Öğün adı: KAHVALTI, OGLE_YEMEGI, AKSAM_YEMEGI, ARA_OGUN")
    recipe_name: str = Field(description="Reçete / Yemek adı")
    calories: int
    prep_time_minutes: int
    sodium_mg: int
    fiber_grams: int
    used_pantry_ingredients: List[str]
    missing_ingredients: List[str]
    bioavailability_synergy_note: str = Field(description="DSÖ Biyoyararlanım & Sinerji notu (Örn: C vitamini + Demir emilimi)")
    instructions: str

class WHODailyDietResponse(BaseModel):
    client_name: str
    clinical_diagnosis: str
    target_calories: int
    calculated_calories: int
    total_protein_grams: int
    total_carbs_grams: int
    total_fat_grams: int
    who_compliance: WHOComplianceScore
    dietitian_clinical_note: str
    meals: List[ClinicalMealItem]

# 2. DSÖ Standartlarında Gemini Sistem Promptu
WHO_SYSTEM_PROMPT = """
Sen Dünya Sağlık Örgütü (WHO) ve EFSA standartlarına bağlı çalışan kıdemli bir klinik diyetisyen yapay zekâ asistanısın.

Görevin:
Danışanın evinde bulunan mevcut yemekleri, sebzeleri, meyveleri, içecekleri ve tükettiği su miktarını en ince ayrıntısına kadar elemek;
danışanın klinik teşhisine, kan değerlerine (AKŞ, HbA1c, Ferritin vb.) ve kalori hedefine tam uyumlu,
sıfır atık prensibiyle 1 günlük klinik beslenme reçetesi üretmektir.

Zorunlu DSÖ Kriterleri:
1. SODYUM / TUZ KURALI: Günlük sodyum tüketimi 2.000 mg'ı (5 gram sofra tuzu) ASLA aşamaz.
2. İLAVE SERBEST ŞEKER: Rafine şeker, glikoz şurubu, paketli meyve suyu yasaktır. Meyvelerin kendi doğal lifli yapısı korunur.
3. TRANS YAĞ: Kesinlikle %0 olmalıdır.
4. DİYET LİFİ (POSA): Günde en az 25 - 35 gram posa sağlanmalıdır.
5. MEYVE & SEBZE: Günlük en az 400 gram (5 porsiyon) renkli sebze ve meyve içermelidir.
6. HİDRASYON: Danışanın kilosu başına 35 ml su içmesi zorunludur.
7. BİYOYARARLANIM: Bitkisel demir kaynakları (ıspanak, mercimek) mutlaka C vitamini (limon, biber) ile eşleştirilmelidir. Demir emilimini engelleyen süt/çay tüketimi bu öğünlerden en az 2 saat ayrılmalıdır.
"""

def calculate_who_water_need(weight_kg: float, workout_hours: float = 0.0) -> int:
    """DSÖ formülü ile günlük zorunlu su ihtiyacını hesaplar (ml)."""
    base_water = weight_kg * 35.0
    extra_workout_water = workout_hours * 500.0
    return int(base_water + extra_workout_water)

if __name__ == "__main__":
    print("VitaLife WHO Clinical AI Servisi Hazır.")
    print("DSÖ (WHO) ve EFSA standartlarında mikro besin ve hidrasyon motoru aktif.")
    sample_water = calculate_who_water_need(68.0, 0.5)
    print(f"Örnek Danışan (68 kg, 30 dk yürüyüş) Günlük Su İhtiyacı: {sample_water} ml")
