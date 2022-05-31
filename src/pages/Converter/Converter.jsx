import React, { useState, useEffect } from "react";
import CurrencyExchangeIcon from "@mui/icons-material/CurrencyExchange";
import { useSelector, useDispatch } from "react-redux";
import { TextField, Select, MenuItem, FormLabel } from "@mui/material";
import { getCharCodes } from "../../utils/getCharCodes";
import { setValutes } from "../../redux/features/currencySlice";
import { getData } from "../../api/getData";

import classes from "./Converter.module.css";
import { getNameFromCharCode } from "../../utils/getNameFromCharCode";
import { calculateConvertedValue } from "../../utils/calculateCovertedValue";

function Converter() {
  const currencyList = useSelector((state) => state.currency.value);
  const dispatch = useDispatch();
  const arrOfCurrencies = getCharCodes(currencyList);
  const [base, setBase] = useState({
    CharCode: "USD",
    value: 0,
  });
  const [convert, setConvert] = useState({
    CharCode: "KGS",
    value: 0,
  });
  arrOfCurrencies.push("RUB");
  arrOfCurrencies.sort();
  console.log(base);

  useEffect(() => {
    getData().then((res) => {
      dispatch(setValutes(res));
    });
  }, [dispatch]);

  useEffect(() => {
    setConvert({
      ...convert,
      value: calculateConvertedValue(
        currencyList,
        base.CharCode,
        convert.CharCode,
        base.value
      ),
    });
  }, [base.value, convert.CharCode, base.CharCode]);

  const handleChangeBase = (e) => {
    if (isNaN(e.target.value)) {
      setBase({ ...base, CharCode: e.target.value });
    } else {
      setBase({ ...base, value: e.target.value });
    }
  };

  const handleChangeConvert = (e) => {
    if (isNaN(e.target.value)) {
      setConvert({ ...convert, CharCode: e.target.value });
    }
  };

  const handleChange = (e) => {
    let tempObj = {
      CharCode: base.CharCode,
      value: base.value,
    };

    setBase({ ...convert });
    setConvert({ ...tempObj });
  };

  return (
    <div className={classes.container}>
      {currencyList.length < 1 ? (
        <h2>Loading</h2>
      ) : (
        <>
          <div className={classes.left_container}>
            <FormLabel sx={{ marginTop: "-20px" }}>
              {getNameFromCharCode(currencyList, base.CharCode)}
            </FormLabel>
            <div className={classes.left}>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                label="Age"
                variant="standard"
                value={base.CharCode}
                onChange={handleChangeBase}
              >
                {arrOfCurrencies.map((item, index) => (
                  <MenuItem key={index} value={item}>
                    {item}
                  </MenuItem>
                ))}
              </Select>
              <TextField
                type="number"
                sx={{ width: "100px", marginLeft: "20px", textAlign: "center" }}
                variant="standard"
                value={base.value}
                onChange={handleChangeBase}
              />
            </div>
          </div>

          <div className={classes.change}>
            <CurrencyExchangeIcon onClick={handleChange} />
          </div>
          <div className={classes.right_container}>
            <FormLabel>
              {getNameFromCharCode(currencyList, convert.CharCode)}
            </FormLabel>
            <div className={classes.right}>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                label="Age"
                variant="standard"
                value={convert.CharCode}
                onChange={handleChangeConvert}
              >
                {arrOfCurrencies.map((item, index) => (
                  <MenuItem key={index} value={item}>
                    {item}
                  </MenuItem>
                ))}
              </Select>
              <TextField
                sx={{ width: "100px", marginLeft: "20px" }}
                variant="standard"
                value={convert.value}
              />
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default Converter;
