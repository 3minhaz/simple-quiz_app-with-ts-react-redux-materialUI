import Typography from "@mui/material/Typography";
import QuestionCard from "./components/QuestionCard";
import { Box } from "@mui/material";

function App() {
  return (
    <Box sx={{ mt: "40px" }}>
      <Typography sx={{ textAlign: "center" }} variant="h3">
        Quiz App
      </Typography>
      <QuestionCard></QuestionCard>
    </Box>
  );
}

export default App;
