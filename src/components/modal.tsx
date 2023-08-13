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
import { AnswerObject } from "../redux/features/quiz/quizSlice";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

export interface DialogTitleProps {
  id: string;
  children?: React.ReactNode;
  onClose: () => void;
}

interface PropsObject {
  userAnswer: AnswerObject[];
}

function BootstrapDialogTitle(props: DialogTitleProps) {
  const { children, onClose, ...other } = props;

  return (
    <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
      {children}
      {onClose ? (
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </DialogTitle>
  );
}

export default function CustomizedDialogs(props: PropsObject) {
  const [open, setOpen] = React.useState(false);
  const [number, setNumber] = React.useState(0);
  const { userAnswer } = props;
  console.log(userAnswer);
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button variant="outlined" onClick={handleClickOpen}>
        Check Answer
      </Button>
      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <BootstrapDialogTitle
          id="customized-dialog-title"
          onClose={handleClose}
        >
          Your answer details
        </BootstrapDialogTitle>
        <DialogContent dividers>
          <Typography gutterBottom>
            Question: {number + 1} {userAnswer[number]?.question}
          </Typography>
          <Typography
            sx={{
              color: userAnswer[number]?.correct === true ? "green" : "red",
            }}
            gutterBottom
          >
            Selected Answer: {userAnswer[number]?.selectedAnswer}
          </Typography>
          <Typography
            sx={{
              color: userAnswer[number]?.correct === true ? "green" : "red",
            }}
            gutterBottom
          >
            CorrectAnswer: {userAnswer[number]?.correctAnswer}
          </Typography>
          {number !== 0 && (
            <Button onClick={() => setNumber((prev) => prev - 1)}>
              Previous
            </Button>
          )}
          {number !== 9 && (
            <Button onClick={() => setNumber((prev) => prev + 1)}>Next</Button>
          )}
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleClose}>
            Close
          </Button>
        </DialogActions>
      </BootstrapDialog>
    </div>
  );
}
