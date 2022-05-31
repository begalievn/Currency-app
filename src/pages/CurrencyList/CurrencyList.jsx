import { TextField, InputAdornment } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getData } from "../../api/getData";
import CurrencyBlock from "../../components/CurrencyBlock/CurrencyBlock";
import { setValutes } from "../../redux/features/currencySlice";
import classes from "./CurrencyList.module.css";

function CurrencyList() {
  const currencyList = useSelector((state) => state.currency.value);
  const dispatch = useDispatch();

  const [searchText, setSearchText] = useState("");
  const re = new RegExp("^" + searchText + ".*", "i");

  useEffect(() => {
    getData().then((res) => {
      dispatch(setValutes(res));
    });
  }, [dispatch]);

  console.log(currencyList);

  return (
    <div className={classes.container}>
      <div className={classes.top_bar}>
        <TextField
          value={searchText}
          onChange={(e) => {
            setSearchText(e.target.value);
            console.log(searchText);
          }}
          variant="standard"
          sx={{ width: "350px" }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
        />
      </div>
      {currencyList.length < 1 ? (
        <p>Loading</p>
      ) : searchText.length > 0 ? (
        currencyList
          .filter((item) => item.CharCode.match(re) || item.Name.match(re))
          .map((item, index) => (
            <CurrencyBlock
              key={index}
              Name={item.Name}
              ID={item.ID}
              CharCode={item.CharCode}
              Nominal={item.Nominal}
              Previous={item.Previous}
              Value={item.Value}
              NumCode={item.NumCode}
            />
          ))
      ) : (
        currencyList.map((item, index) => (
          <CurrencyBlock
            key={index}
            Name={item.Name}
            ID={item.ID}
            CharCode={item.CharCode}
            Nominal={item.Nominal}
            Previous={item.Previous}
            Value={item.Value}
            NumCode={item.NumCode}
          />
        ))
      )}
    </div>
  );
}

export default CurrencyList;
