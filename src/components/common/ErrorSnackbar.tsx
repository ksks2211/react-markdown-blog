import Snackbar, { SnackbarOrigin } from "@mui/material/Snackbar";
import Slide, { SlideProps } from "@mui/material/Slide";
import Alert, { AlertColor } from "@mui/material/Alert";

function SlideTransition(props: SlideProps) {
  return <Slide {...props} direction="up" />;
}

interface ErrorSnackbarProps {
  snackbarState: {
    open: boolean;
    severity: AlertColor;
    msg: string;
  };
  onClose: () => void;
}

const ANCHOR_ORIGIN: SnackbarOrigin = {
  vertical: "bottom",
  horizontal: "center",
};

export default function SnackbarAlert({
  snackbarState,
  onClose,
}: ErrorSnackbarProps) {
  return (
    <Snackbar
      open={snackbarState.open}
      autoHideDuration={4000}
      TransitionComponent={SlideTransition}
      onClose={onClose}
      anchorOrigin={ANCHOR_ORIGIN}
    >
      <Alert
        onClose={onClose}
        variant="filled"
        severity={snackbarState.severity}
      >
        {snackbarState.msg}
      </Alert>
    </Snackbar>
  );
}
