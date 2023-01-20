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
const ratioText = document.getElementById("ratio");
const normalTextRatioAAIcon = document.getElementById("normalTextAAIcon");
const normalTextRatioAAAIcon = document.getElementById("normalTextAAAIcon");
const largeTextRatioAAIcon = document.getElementById("largeTextAAIcon");
const largeTextRatioAAAIcon = document.getElementById("largeTextAAAIcon");
const graphicObjectRatioAAIcon = document.getElementById("graphicObjectAAIcon");

const normalTextRatioAA = 4.5;
const normalTextRatioAAA = 7.0;
const largeTextRatioAA = 3.0;
const largeTextRatioAAA = 4.5;
const graphicObjectRatioAA = 3.0;

let ratio = "";

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
  calculateRatio();
  changeIcons()
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

function hexToRgb(hex) {
  var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16),
      }
    : null;
}

function luminance(r, g, b) {
  var a = [r, g, b].map(function (v) {
    v /= 255;
    return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
  });
  return a[0] * 0.2126 + a[1] * 0.7152 + a[2] * 0.0722;
}

function calculateRatio() {
  let color1rgb = hexToRgb(colorPickerBackground.value);
  let color1luminance = luminance(color1rgb.r, color1rgb.g, color1rgb.b);
  let color2rgb = hexToRgb(colorPickerForeground.value);
  let color2luminance = luminance(color2rgb.r, color2rgb.g, color2rgb.b);
  if (color1luminance > color2luminance) {
    ratio = (color1luminance + 0.05) / (color2luminance + 0.05);
  } else {
    ratio = (color2luminance + 0.05) / (color1luminance + 0.05);
  }
  ratioText.innerHTML = ratio;
}

function changeIcons() {
  if (ratio >= normalTextRatioAA) {
    normalTextRatioAAIcon.className = "fa-solid fa-check";
  } else {
    normalTextRatioAAIcon.className = "fa-solid fa-xmark";
  }


  if (ratio >= normalTextRatioAAA) {
    normalTextRatioAAAIcon.className = "fa-solid fa-check";
  } else {
    normalTextRatioAAAIcon.className = "fa-solid fa-xmark";
  }


  if (ratio >= largeTextRatioAA) {
    largeTextRatioAAIcon.className = "fa-solid fa-check";
  } else {
    largeTextRatioAAIcon.className = "fa-solid fa-xmark";
  }


  if (ratio >= largeTextRatioAAA) {
    largeTextRatioAAAIcon.className = "fa-solid fa-check";
  } else {
    largeTextRatioAAAIcon.className = "fa-solid fa-xmark";
  }


  if (ratio >= graphicObjectRatioAA) {
    graphicObjectRatioAAIcon.className = "fa-solid fa-check";
  } else {
    graphicObjectRatioAAIcon.className = "fa-solid fa-xmark";
  }
}
