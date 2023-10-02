import { Grid, Typography } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { UserContext } from "src/App";
import { getCountries } from "src/api/country";
import { Country } from "src/models/Country";
import { Filter } from "src/models/commun/Filter";
import { sortByNativeName } from "src/utils/sort";
import { ChipLanguageOriginFilter } from "../Chip";
import { AutocompleteInputCountries } from "../Input";

interface Props {
  filter: Filter;
  onChange: (filter: Filter) => void;
}
export const OriginCountryFilter = ({ filter, onChange }: Props) => {
  const { t } = useTranslation();

  const { language } = useContext(UserContext);

  const [search, setSearch] = useState("");
  const [countries, setCountries] = useState<Array<Country>>([]);
  const [results, setResults] = useState<Array<Country>>([]);

  useEffect(() => {
    getCountries(language.iso_639_1).then((res) => {
      const resSort = res.sort(sortByNativeName);
      setCountries(resSort);
      setResults(resSort);
    });
  }, [language]);

  useEffect(() => {
    if (search !== "") {
      setResults(
        [...countries].filter((el) => el.native_name.includes(search))
      );
    } else {
      setResults([...countries]);
    }
  }, [search]);

  const deleteCountry = (id: string) => {
    let newValue: Array<string> = [...filter.origincountry];
    newValue = newValue.filter((el) => el !== id);
    onChange({ ...filter, origincountry: newValue });
  };

  const onSelectCountry = (value: Country) => {
    console.log(value);
    let newValue: Array<string> = [...filter.origincountry];
    if (!newValue.includes(value.iso_3166_1)) {
      newValue.push(value.iso_3166_1);
      onChange({ ...filter, origincountry: newValue });
    }
    setSearch("");
  };

  return (
    <Grid container spacing={1} alignItems="center">
      <Grid item xs={12} sm={3}>
        <Typography variant="h2">{t("commun.origincountry")}</Typography>
      </Grid>
      <Grid item xs={12} sm={9}>
        <AutocompleteInputCountries
          clear={() => setSearch("")}
          value={search}
          onChange={(value) => setSearch(value)}
          placeholder={t("commun.searchorigincountry")}
          results={results}
          onSelect={(value) => onSelectCountry(value)}
        />
      </Grid>

      {filter.origincountry.map((iso) => (
        <Grid item key={iso}>
          <ChipLanguageOriginFilter
            iso={iso}
            onDelete={() => deleteCountry(iso)}
          />
        </Grid>
      ))}
    </Grid>
  );
};
