import {
  Alert,
  Button,
  Container,
  Grid,
  IconButton,
  Tooltip,
  Typography,
} from "@mui/material";
import { BasicSearchInput } from "src/components/commun/Input";
import { useContext, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { getThemes } from "src/api/supabase/theme";
import { CardTheme } from "src/components/commun/Card";
import { UserContext } from "src/App";
import { ThemeView } from "src/models/Theme";
import { CardSkeleton } from "src/components/commun/skeleton/Skeleton";
import { CreateThemeDialog } from "src/components/dialog/CreateThemeDialog";

import AddIcon from "@mui/icons-material/Add";

export const SearchThemePage = () => {
  const ITEMPERPAGE = 20;
  const { t } = useTranslation();
  const { language } = useContext(UserContext);

  const [themes, setThemes] = useState<Array<ThemeView>>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [openModal, setOpenModal] = useState(false);

  const [search, setSearch] = useState("");

  const searchTheme = async () => {
    if (language) {
      const { data } = await getThemes(search, language.iso);
      setThemes(data as Array<ThemeView>);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    setIsLoading(true);
    const timeout = setTimeout(() => {
      searchTheme();
    }, 200);
    return () => clearTimeout(timeout);
  }, [search, language]);

  return (
    <Container maxWidth="lg">
      <Grid container spacing={1}>
        <Grid item xs={12} sx={{ textAlign: "center" }}>
          <Typography variant="h2">{t("pages.home.searchtitle")}</Typography>
        </Grid>
        <Grid item xs={12}>
          <Grid
            container
            spacing={3}
            justifyContent="flex-end"
            alignItems="center"
          >
            <Grid item xs>
              <BasicSearchInput
                label={t("pages.home.search")}
                onChange={(value) => setSearch(value)}
                value={search}
                clear={() => setSearch("")}
              />
            </Grid>
            {/*<Grid item>
              <Tooltip title={t("commun.addtheme")} placement="top">
                <IconButton
                  type="button"
                  size="large"
                  aria-label={t("commun.addtheme")}
                  onClick={() => setOpenModal(true)}
                >
                  <AddIcon fontSize="large" />
                </IconButton>
              </Tooltip>
  </Grid>*/}
          </Grid>
        </Grid>
        {isLoading ? (
          Array.from(new Array(ITEMPERPAGE)).map((_, index) => (
            <Grid key={index} item xs={6} sm={3} md={3} lg={2} xl={2}>
              <CardSkeleton />
            </Grid>
          ))
        ) : themes.length > 0 ? (
          themes.map((theme) => (
            <Grid key={theme.id} item xs={6} sm={3} md={3} lg={2} xl={2}>
              <CardTheme value={theme} />
            </Grid>
          ))
        ) : (
          <>
            <Grid item xs={12} sx={{ marginTop: 2 }}>
              <Alert severity="warning">{t("commun.noresult")}</Alert>
            </Grid>
            <Grid item xs={12}>
              <Button
                disableElevation
                fullWidth
                size="large"
                type="submit"
                variant="contained"
                color="secondary"
                onClick={() => setOpenModal(true)}
              >
                {t("commun.addtheme")}
              </Button>
            </Grid>
          </>
        )}
      </Grid>
      <CreateThemeDialog open={openModal} close={() => setOpenModal(false)} />
    </Container>
  );
};