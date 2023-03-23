import { Close } from "@mui/icons-material";
import { Dialog, DialogTitle, IconButton, DialogContent, DialogActions, Button } from "@mui/material";
import { PropsWithChildren } from "react";

interface SimpleDialogProps extends PropsWithChildren {
  title: string;
  open: boolean;
  onClose: () => void;
  confirmButtonText?: string;
}
export default function ConfirmDialog({ onClose, open, title, confirmButtonText, children }: SimpleDialogProps) {
  return (
    <Dialog onClose={onClose} open={open} maxWidth="lg">
      <DialogTitle>
        {title}
        {onClose ? (
          <IconButton
            aria-label="close"
            onClick={onClose}
            sx={{
              position: "absolute",
              right: 8,
              top: 8,
            }}
          >
            <Close />
          </IconButton>
        ) : null}
      </DialogTitle>
      <DialogContent sx={{ maxWidth: "800px" }} dividers>
        {children}
      </DialogContent>
      {confirmButtonText ? (
        <DialogActions>
          <Button onClick={onClose}>{confirmButtonText}</Button>
        </DialogActions>
      ) : null}
    </Dialog>
  );
}
