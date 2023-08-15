import { Typography } from "@mui/material";
import { Colors } from "src/style/Colors";
import { percent, px } from "csx";
import { style } from "typestyle";
import { CircleArc } from "./svg/CircleArc";

const divCss = style({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  backgroundColor: Colors.black,
  borderRadius: percent(50),
  height: px(48),
  width: px(48),
});

interface Props {
  value: number;
}

export const VoteBadge = ({ value }: Props) => {
  const rating = Number(value).toFixed(2);
  const ratingNumber = Number(rating);
  const percent = value / 10;

  let color: string = Colors.green;
  if (ratingNumber < 8) {
    color = Colors.yellow;
  }
  if (ratingNumber < 6) {
    color = Colors.orange;
  }
  if (ratingNumber < 4) {
    color = Colors.red;
  }

  return (
    <div className={divCss}>
      <div>
        <CircleArc percent={percent} fill="none" size={40} color={color} />
      </div>
      <Typography variant="body2" sx={{ position: "absolute" }}>
        {rating}
      </Typography>
    </div>
  );
};
