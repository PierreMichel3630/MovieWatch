import { Container, Grid, Tab, Tabs } from "@mui/material";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";
import { getThemeById } from "src/api/supabase/theme";
import { ThemeView } from "src/models/Theme";
import { TitleTheme } from "src/components/commun/Title";
import { BlockThemeOverview } from "src/components/theme/BlockThemeOverview";
import { BlockThemeRanking } from "src/components/theme/BlockThemeRanking";

export const ThemePage = () => {
  const { t } = useTranslation();
  let { id } = useParams();

  const [tab, setTab] = useState(0);

  const handleChangeTab = (_: React.SyntheticEvent, newValue: number) => {
    setTab(newValue);
  };

  const [theme, setTheme] = useState<ThemeView | undefined>(undefined);

  const getTheme = async () => {
    if (id) {
      const { data } = await getThemeById(Number(id));
      setTheme(data as ThemeView);
    }
  };

  useEffect(() => {
    getTheme();
  }, [id]);

  return (
    <Container maxWidth="lg">
      <Grid container spacing={2} alignItems="center">
        {theme && (
          <>
            <Grid item xs={12} sx={{ textAlign: "center" }}>
              <TitleTheme value={theme} />
            </Grid>
            <Grid item xs={12}>
              <Tabs
                value={tab}
                onChange={handleChangeTab}
                centered
                color="secondary"
              >
                <Tab label={t("commun.overview")} />
                <Tab label={t("commun.ranking")} />
              </Tabs>
            </Grid>
            <Grid item xs={12}>
              {tab === 0 ? (
                <BlockThemeOverview theme={theme} />
              ) : (
                <BlockThemeRanking theme={theme} />
              )}
            </Grid>
          </>
        )}
      </Grid>
    </Container>
  );
};
