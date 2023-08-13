// import './App.css'
// import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import QuestionCard from "./components/QuestionCard";
// import { useAppSelector } from "./redux/hook";
// import React from "react";
// import { Modal } from "@mui/material";
// import CustomizedDialogs from "./components/modal";

function App() {
  // const testValue = useAppSelector((state) => state.quiz);
  // console.log(testValue);
  // const [open, setOpen] = React.useState(false);
  // const handleClickOpen = () => {
  //   setOpen(true);
  // };
  // const handleClose = () => {
  //   setOpen(false);
  // };
  return (
    <>
      <Typography variant="h3">Quiz App</Typography>
      {/* <Button variant="contained">Start</Button> */}

      <QuestionCard></QuestionCard>
      {/* <CustomizedDialogs></CustomizedDialogs> */}
    </>
  );
}

export default App;
