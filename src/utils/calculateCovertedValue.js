export function calculateConvertedValue(
  currensyList,
  baseCharCode,
  convertCharCode,
  value
) {
  let convertedValue = 0;
  let baseCurrencyValue = 0;
  let convertCurrencyValue = 0;
  let baseNominal = 1;
  let convertNominal = 1;

  if (baseCharCode === "RUB") {
    baseCurrencyValue = 1;
  } else if (convertCharCode === "RUB") {
    convertCurrencyValue = 1;
  }

  currensyList.forEach((item) => {
    if (item.CharCode === baseCharCode) {
      baseCurrencyValue = item.Value;
      baseNominal = item.Nominal;
    }
    if (item.CharCode === convertCharCode) {
      convertCurrencyValue = item.Value;
      convertNominal = item.Nominal;
    }
  });

  baseCurrencyValue = baseCurrencyValue / baseNominal;
  convertCurrencyValue = convertCurrencyValue / convertNominal;

  convertCurrencyValue = baseCurrencyValue / convertCurrencyValue;
  convertedValue = value * convertCurrencyValue;
  return convertedValue.toFixed(2);
}
