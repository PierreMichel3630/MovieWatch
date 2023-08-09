import {
  Chip,
  Grid,
  ImageList,
  ImageListItem,
  Typography,
} from "@mui/material";
import { useTranslation } from "react-i18next";
import { useState } from "react";
import { SeeMoreButton } from "./button/Button";
import { getBreakpoint } from "src/utils/mediaQuery";
import { ImageDialog } from "./commun/dialog/ImageDialog";
import { style } from "typestyle";
import { Image } from "src/models/tmdb/commun/Image";

const divFilterCss = style({ marginLeft: 15, display: "flex", gap: 10 });

enum Filter {
  all = "all",
  poster = "poster",
  logo = "logo",
  backdrop = "backdrop",
  profile = "profile",
}

interface Props {
  images: Array<Image>;
  hasFilter?: boolean;
}

export const PhotosBlock = ({ images, hasFilter = false }: Props) => {
  const NUMBERLINESHOW = 2;
  const FILTERFALSE = {
    all: false,
    poster: false,
    logo: false,
    backdrop: false,
    profile: false,
  };

  const { t } = useTranslation();

  const [seeMore, setSeeMore] = useState(false);
  const [open, setOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(0);
  const [filter, setFilter] = useState({
    all: true,
    poster: false,
    logo: false,
    backdrop: false,
    profile: false,
  });

  const breakpoint = getBreakpoint();
  const cols = {
    xs: 1,
    sm: 2,
    md: 2,
    lg: 3,
    xl: 3,
  }[breakpoint];

  const filterPhotos = (a: Image) => {
    let res = false;
    if (filter[Filter.all]) {
      res = true;
    } else if (filter[Filter.backdrop]) {
      res = a.type === Filter.backdrop.toString();
    } else if (filter[Filter.logo]) {
      res = a.type === Filter.logo.toString();
    } else if (filter[Filter.poster]) {
      res = a.type === Filter.poster.toString();
    }
    return res;
  };

  const selectImage = (index: number) => {
    setSelectedImage(index);
    setOpen(true);
  };

  const selectFilter = (value: Filter) => {
    setFilter({ ...FILTERFALSE, [value]: !filter[value] });
  };

  const imagesFilter = images.filter(filterPhotos);

  const imagesDisplay = seeMore
    ? imagesFilter
    : imagesFilter.slice(0, cols * NUMBERLINESHOW);

  return (
    images.length > 0 && (
      <Grid container spacing={2}>
        <Grid item xs={12} sx={{ display: "flex", alignItems: "center" }}>
          <Typography variant="h2">{t("commun.photos")}</Typography>
          {hasFilter && (
            <div className={divFilterCss}>
              <Chip
                label={t("commun.all")}
                variant={filter.all ? "filled" : "outlined"}
                onClick={() => selectFilter(Filter.all)}
              />
              <Chip
                label={t("commun.backdrop")}
                variant={filter.backdrop ? "filled" : "outlined"}
                onClick={() => selectFilter(Filter.backdrop)}
              />
              <Chip
                label={t("commun.logo")}
                variant={filter.logo ? "filled" : "outlined"}
                onClick={() => selectFilter(Filter.logo)}
              />
              <Chip
                label={t("commun.poster")}
                variant={filter.poster ? "filled" : "outlined"}
                onClick={() => selectFilter(Filter.poster)}
              />
            </div>
          )}
        </Grid>
        <Grid item xs={12}>
          <ImageList variant="masonry" cols={cols} gap={5}>
            {imagesDisplay.map((image, index) => (
              <ImageListItem
                key={index}
                onClick={() => selectImage(index)}
                sx={{ cursor: "pointer" }}
              >
                <img
                  src={`https://image.tmdb.org/t/p/original${image.file_path}`}
                  srcSet={`https://image.tmdb.org/t/p/original${image.file_path}`}
                  loading="lazy"
                />
              </ImageListItem>
            ))}
          </ImageList>
        </Grid>
        {imagesFilter.length > cols * NUMBERLINESHOW && (
          <Grid
            item
            xs={12}
            sx={{
              display: "flex",
              justifyContent: "center",
            }}
          >
            <SeeMoreButton
              seeMore={seeMore}
              onClick={() => setSeeMore(!seeMore)}
            />
          </Grid>
        )}
        {imagesDisplay.length > 0 && (
          <ImageDialog
            image={`https://image.tmdb.org/t/p/original${imagesDisplay[selectedImage].file_path}`}
            onClose={() => setOpen(false)}
            open={open}
          />
        )}
      </Grid>
    )
  );
};
