import { createSlice } from "@reduxjs/toolkit";

type QuizState = {
  loading: boolean;
  question: string[];
  number: number;
  userAnswer: AnswerObject[];
  score: number;
  gameOver: boolean;
};

export type AnswerObject = {
  question: string;
  // answer: string;
  correctAnswer: string;
  correct: boolean;
  selectedAnswer?: string;
};

const initialState: QuizState = {
  loading: true,
  question: [],
  number: 0,
  userAnswer: [],
  score: 0,
  gameOver: true,
};

export const quizSlice = createSlice({
  name: "quiz",
  initialState,
  reducers: {
    startTrivia: (state, action) => {
      state.loading = false;
      state.gameOver = false;
      state.question = action.payload;
      state.score = 0;
      state.userAnswer = [];
      state.number = 0;
    },
    nextQuestion: (state) => {
      if (state.number === 10) {
        state.gameOver = true;
      } else {
        state.number = state.number + 1;
      }
    },
    setUserAnswer: (state, action) => {
      const exist = state.userAnswer.find(
        (ele) => ele.question === action.payload.question
      );
      if (exist) {
        const filter = state.userAnswer.filter(
          (ele) => ele.question !== action.payload.question
        );
        state.userAnswer = [...filter, action.payload];
      } else {
        state.userAnswer = [...state.userAnswer, action.payload];
      }
    },
    finishQuiz: (state) => {
      state.loading = true;
      state.gameOver = true;
      state.question = [];
      state.score = 0;
      state.userAnswer = [];
      state.number = 0;
    },
  },
});

export const { startTrivia, nextQuestion, setUserAnswer, finishQuiz } =
  quizSlice.actions;

export default quizSlice.reducer;
