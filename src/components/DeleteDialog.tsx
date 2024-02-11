import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
} from "@mui/material";

interface Props {
  open: boolean;
  title: string;
  text: string;
  onConfirm: (isConfirmed: boolean) => void;
}

export default function DeleteDialog({ open, title, text, onConfirm }: Props) {
  return (
    <Dialog
      open={open}
      onClose={() => onConfirm(false)}
      aria-labelledby="delete-dialog"
      aria-describedby="delete-dialog-description"
    >
      <DialogTitle id="delete-dialog-title">{title}</DialogTitle>
      <DialogContent>
        <DialogContentText id="delete-dialog-description">
          {text}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => onConfirm(true)} color="primary" autoFocus>
          Ok
        </Button>
        <Button onClick={() => onConfirm(false)} color="secondary">
          Cancel
        </Button>
      </DialogActions>
    </Dialog>
  );
}
