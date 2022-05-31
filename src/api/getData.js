import axios from "axios";

const CURRENCY_URL =
  "https://www.cbr-xml-daily.ru/archive/2022/05/25/daily_json.js";

export const getData = () => {
  return axios.get(CURRENCY_URL).then((res) => {
    return Object.values(res.data.Valute);
  });
};
