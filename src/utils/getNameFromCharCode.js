export function getNameFromCharCode(currensyList, CharCode) {
  let Name = "";
  if (CharCode === "RUB") {
    Name = "Рубль";
    return Name;
  }
  currensyList.forEach((item) => {
    if (item.CharCode === CharCode) {
      Name = item.Name;
    }
  });
  return Name;
}
