import { Alert, AlertColor, Snackbar } from "@mui/material";

interface Props {
  message: string;
  open: boolean;
  handleClose: () => void;
  severity?: AlertColor;
}
export const MessageSnackbar = ({
  open,
  message,
  handleClose,
  severity = "error",
}: Props) => {
  return (
    <Snackbar
      open={open}
      autoHideDuration={6000}
      onClose={handleClose}
      anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
    >
      <Alert onClose={handleClose} severity={severity} sx={{ width: "100%" }}>
        {message}
      </Alert>
    </Snackbar>
  );
};
