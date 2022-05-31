import React, { useState } from "react";
import CurrencyExchangeIcon from "@mui/icons-material/CurrencyExchange";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import classes from "./style.module.css";

function CurrencyBlock({
  Name,
  ID,
  CharCode,
  Nominal,
  Previous,
  Value,
  NumCode,
}) {
  const [isRub, setIsRub] = useState(true);

  return (
    <div className={classes.block}>
      <p className={classes.title}>{Name}</p>
      <div className={classes.content}>
        <div className={classes.valutes}>
          <span className={classes.span1}>
            {isRub ? `${Nominal} RUB` : `1 ${CharCode}`}
          </span>
          <span className={classes.exchange_span}>
            {<CurrencyExchangeIcon onClick={() => setIsRub(!isRub)} />}
          </span>
          <span className={classes.span2}>
            {isRub
              ? `${Value} ${CharCode}`
              : `${(Nominal / Value).toFixed(4)} RUB`}
          </span>
        </div>
        <div
          className={
            isRub
              ? Previous - Value < 0
                ? classes.growth_rate_up
                : classes.growth_rate_down
              : Nominal / Previous - Nominal / Value < 0
              ? classes.growth_rate_up
              : classes.growth_rate_down
          }
        >
          {isRub ? (
            Previous - Value < 0 ? (
              <ArrowUpwardIcon sx={{ color: "green" }} />
            ) : (
              <ArrowDownwardIcon sx={{ color: "red" }} />
            )
          ) : Nominal / Previous - Nominal / Value < 0 ? (
            <ArrowUpwardIcon sx={{ color: "green" }} />
          ) : (
            <ArrowDownwardIcon sx={{ color: "red" }} />
          )}
          {isRub
            ? Math.abs((Value - Previous).toFixed(4))
            : Math.abs((Nominal / Value - Nominal / Previous).toFixed(4))}
        </div>
      </div>
    </div>
  );
}

export default CurrencyBlock;
