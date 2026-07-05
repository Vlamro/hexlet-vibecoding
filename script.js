const form = document.getElementById("calc-form");
const results = document.getElementById("results");

const bmiValueEl = document.getElementById("bmi-value");
const bmiCategoryEl = document.getElementById("bmi-category");
const bmiHintEl = document.getElementById("bmi-hint");
const caloriesValueEl = document.getElementById("calories-value");
const waterValueEl = document.getElementById("water-value");

const WATER_ML_PER_KG = 30;

function getBmiCategory(bmi) {
  if (bmi < 18.5) {
    return {
      label: "Недостаток веса",
      hint: "Стоит увеличить калорийность рациона и проконсультироваться с врачом.",
    };
  }
  if (bmi < 25) {
    return {
      label: "Норма",
      hint: "Отличный результат — поддерживайте текущий образ жизни.",
    };
  }
  if (bmi < 30) {
    return {
      label: "Избыточный вес",
      hint: "Стоит обратить внимание на питание и физическую активность.",
    };
  }
  return {
    label: "Ожирение",
    hint: "Рекомендуется консультация врача для подбора программы снижения веса.",
  };
}

function calculateBmr({ weight, height, age, sex }) {
  const base = 10 * weight + 6.25 * height - 5 * age;
  return sex === "male" ? base + 5 : base - 161;
}

form.addEventListener("submit", (event) => {
  event.preventDefault();

  const height = Number(form.height.value);
  const weight = Number(form.weight.value);
  const age = Number(form.age.value);
  const sex = form.sex.value;
  const activity = Number(form.activity.value);

  const heightMeters = height / 100;
  const bmi = weight / (heightMeters * heightMeters);
  const category = getBmiCategory(bmi);

  const bmr = calculateBmr({ weight, height, age, sex });
  const calories = Math.round(bmr * activity);

  const waterLiters = (weight * WATER_ML_PER_KG) / 1000;

  bmiValueEl.textContent = bmi.toFixed(1);
  bmiCategoryEl.textContent = category.label;
  bmiHintEl.textContent = category.hint;
  caloriesValueEl.textContent = calories.toLocaleString("ru-RU");
  waterValueEl.textContent = waterLiters.toFixed(1);

  results.hidden = false;
});
