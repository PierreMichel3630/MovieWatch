import { Dialog, IconButton, ImageListItemBar, Skeleton } from "@mui/material";
import { saveAs } from "file-saver";
import { percent, viewHeight } from "csx";

import { Image } from "src/models/tmdb/commun/Image";

import FileDownloadIcon from "@mui/icons-material/FileDownload";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { useEffect, useState } from "react";

interface Props {
  images: Array<Image>;
  selected: Image;
  open: boolean;
  name: string;
  onClose: () => void;
}

export const ImageDialog = ({
  name,
  images,
  selected,
  open,
  onClose,
}: Props) => {
  const [index, setIndex] = useState<undefined | number>(
    images.findIndex((el) => el.file_path === selected.file_path)
  );
  const image = index !== undefined ? images[index] : undefined;
  const isMultipleImage = images.length > 1;

  useEffect(() => {
    setIndex(images.findIndex((el) => el.file_path === selected.file_path));
  }, [selected]);

  const imageName = image
    ? `${name ? `${name} - ` : ""} ${image.type.toString()} ${index}`
    : "";
  const url = image
    ? `https://image.tmdb.org/t/p/original${image.file_path}`
    : "";

  const downloadImage = () => {
    saveAs(url, imageName);
  };

  const navigateImage = (value: number) => {
    if (index !== undefined) {
      let newIndex = index + value;
      setIndex(
        newIndex >= images.length
          ? 0
          : newIndex < 0
          ? images.length - 1
          : newIndex
      );
    }
  };

  return (
    <Dialog
      onClose={() => {
        onClose();
        setIndex(undefined);
      }}
      open={open}
      maxWidth="lg"
    >
      {image ? (
        <>
          <div
            style={{
              position: "relative",
              maxHeight: viewHeight(80),
              display: "flex",
              maxWidth: percent(100),
              alignItems: "center",
            }}
          >
            {isMultipleImage && (
              <IconButton
                aria-label="previous image"
                sx={{ position: "absolute", left: 10 }}
                size="small"
                onClick={() => navigateImage(-1)}
              >
                <ArrowBackIosIcon fontSize="large" />
              </IconButton>
            )}
            <img
              src={`https://image.tmdb.org/t/p/original${image.file_path}`}
              style={{ maxHeight: viewHeight(80), maxWidth: percent(100) }}
            />
            {isMultipleImage && (
              <IconButton
                aria-label="next image"
                sx={{ position: "absolute", right: 10 }}
                size="small"
                onClick={() => navigateImage(+1)}
              >
                <ArrowForwardIosIcon fontSize="large" />
              </IconButton>
            )}
          </div>
          <ImageListItemBar
            title={imageName}
            subtitle={`${image.width}px x ${image.height}px`}
            actionIcon={
              <IconButton
                aria-label="download image"
                size="large"
                sx={{ marginRight: 2 }}
                onClick={downloadImage}
              >
                <FileDownloadIcon />
              </IconButton>
            }
          />
        </>
      ) : (
        <Skeleton
          variant="rectangular"
          sx={{ width: percent(100), height: viewHeight(40) }}
        />
      )}
    </Dialog>
  );
};
