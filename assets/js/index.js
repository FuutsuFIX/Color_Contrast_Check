const bg = document.getElementById("background-color");
const result = document.getElementById("result");
const fg = document.getElementById("foreground-color");
const bgHexcode = document.getElementById("bg-hexcode");
const fgHexcode = document.getElementById("fg-hexcode");
const colorPickerBackground = document.getElementById(
  "background-color-picker"
);
const colorPickerForeground = document.getElementById(
  "foreground-color-picker"
);

colorPickerBackground.addEventListener("input", changeColorsToValues, false);
colorPickerForeground.addEventListener("input", changeColorsToValues, false);
bgHexcode.addEventListener("input", changeValuesToColors, false);
fgHexcode.addEventListener("input", changeValuesToColors, false);

function changeColorsToValues() {
  bgHexcode.value = colorPickerBackground.value;
  fgHexcode.value = colorPickerForeground.value;
  changeActualColors();
}

function changeValuesToColors() {
  colorPickerBackground.value = bgHexcode.value;
  colorPickerForeground.value = fgHexcode.value;
  changeActualColors();
}

function changeActualColors() {
  bg.style.backgroundColor = colorPickerBackground.value;
  fg.style.backgroundColor = colorPickerForeground.value;
  result.style.backgroundColor = colorPickerBackground.value;
  result.style.color = colorPickerForeground.value;
}

/*
manca la funzione che da inserire dopo i change actual colors che
deve fare le seguenti cose:
comprendere quale valore è più alto per preparare la divisione
fare la divisione per trovare il ratio
confrontare questi ratio per vedere se rispettano i valori di
accessibilità
modificare le icone per dare feedback all'utente
*/