import { Box, Grid, Slider, Typography } from "@mui/material";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Filter } from "src/models/tmdb/commun/Filter";

interface Props {
  filter: Filter;
  onChange: (filter: Filter) => void;
}
export const RuntimeFilter = ({ filter, onChange }: Props) => {
  const { t } = useTranslation();

  const MIN = 0;
  const MAX = 400;
  const STEP = 15;
  const [value, setValue] = useState<number[]>([0, 400]);
  const marks = [0, 60, 120, 180, 240, 320, 400];

  const handleChange = (event: Event, value: number | number[]) => {
    const newValue = value as number[];
    const over = newValue[0];
    const under = newValue[1];
    setValue(newValue);

    let newFilter = {
      ...filter,
      runtime: {
        ...filter.runtime,
        under: under !== MAX ? under : undefined,
        over: over !== MIN ? over : undefined,
      },
    };
    onChange(newFilter);
  };

  const valuetext = (value: number) => `${value} ${t("commun.min")}`;

  return (
    <Grid container spacing={1} alignItems="center">
      <Grid item xs={2}>
        <Typography variant="h2">{t("commun.runtime")}</Typography>
      </Grid>
      <Grid item xs={10}>
        <Box sx={{ marginTop: 4, marginRight: 4, marginLeft: 4 }}>
          <Slider
            getAriaLabel={() => "Vote range"}
            value={value}
            onChange={handleChange}
            valueLabelDisplay="on"
            valueLabelFormat={valuetext}
            getAriaValueText={valuetext}
            min={MIN}
            max={MAX}
            marks={marks.map((el) => ({
              label: valuetext(el),
              value: el,
            }))}
            step={STEP}
            color="secondary"
          />
        </Box>
      </Grid>
    </Grid>
  );
};
