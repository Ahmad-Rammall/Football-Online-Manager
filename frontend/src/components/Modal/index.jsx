import * as React from "react";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Typography from "@mui/material/Typography";
import { TextField } from "@mui/material";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

export default function CustomizedDialogs({
  open,
  handleClose,
  text,
  btnText,
  onSubmit,
  title,
  withInput,
  inputLabel,
  inputType = "text",
  onInputChange,
  inputValue = "",
}) {
  return (
    <React.Fragment>
      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
          {title}
        </DialogTitle>
        <IconButton
          onClick={handleClose}
          sx={(theme) => ({
            position: "absolute",
            right: 8,
            top: 0,
          })}
        >
          <CloseIcon />
        </IconButton>

        <DialogContent dividers>
          <Typography gutterBottom>{text}</Typography>
          {withInput && (
            <TextField
              id="outlined-basic"
              label={inputLabel}
              variant="outlined"
              sx={{ margin: "10px 0", width: "100%" }}
              type={inputType}
              onChange={onInputChange}
              value={inputValue}
            />
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={onSubmit}>{btnText}</Button>
        </DialogActions>
      </BootstrapDialog>
    </React.Fragment>
  );
}
