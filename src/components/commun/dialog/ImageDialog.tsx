import { Dialog } from "@mui/material";

interface Props {
  image: string;
  open: boolean;
  onClose: () => void;
}

export const ImageDialog = ({ image, open, onClose }: Props) => {
  return (
    <Dialog onClose={onClose} open={open} maxWidth="lg">
      <img src={image} />
    </Dialog>
  );
};
