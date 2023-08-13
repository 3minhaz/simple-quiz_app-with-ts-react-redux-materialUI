/* eslint-disable @typescript-eslint/no-explicit-any */

import React, { useState } from "react";
import { Box, Button, CircularProgress, Typography } from "@mui/material";
import {
  Difficulty,
  QuizQuestion,
  useFetchQuizQuestionQuery,
} from "../redux/api/api";
import { useAppDispatch, useAppSelector } from "../redux/hook";
import {
  finishQuiz,
  nextQuestion,
  setUserAnswer,
  startTrivia,
} from "../redux/features/quiz/quizSlice";
import CustomizedDialogs from "./modal";

const multipleChoiceSelect = {
  backgroundColor: "green",
  color: "white",
};

const QuestionCard: React.FC = () => {
  const dispatch = useAppDispatch();
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const { loading, gameOver, question, number, userAnswer } = useAppSelector(
    (state) => state.quiz
  );
  const questions2: any = question;

  const arg = {
    amount: 10,
    difficulty: Difficulty.EASY,
  };

  const { data, isLoading, refetch } = useFetchQuizQuestionQuery(arg, {
    refetchOnMountOrArgChange: true,
  });
  const newData = data?.results.map((question: QuizQuestion) => {
    const shuffledAnswers = [
      ...question.incorrect_answers,
      question.correct_answer,
    ];
    // const randomIndex = Math.floor(Math.random() * shuffledAnswers.length);
    // const shuffledArray = [...shuffledAnswers].sort(() => Math.random() - 0.5);
    function fisherYatesShuffle(array: string[]) {
      for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
      }
      return array;
    }

    const shuffledArray = fisherYatesShuffle([...shuffledAnswers]);

    const result: QuizQuestion = {
      ...question,

      incorrect_answers: shuffledArray,
    };
    return result;
  });

  if (isLoading) {
    return <CircularProgress color="secondary" />;
  }

  return (
    <Box component="span">
      <Box>
        {/* QuestionCard */}

        {!gameOver && !loading && (
          <>
            {" "}
            <Typography variant="body1" gutterBottom>
              Question: {number + 1} / 10
            </Typography>
            <Typography variant="body1" gutterBottom>
              Score
            </Typography>
            <Typography variant="h5" gutterBottom>
              {questions2[number]?.question}
            </Typography>
            {questions2[number]?.incorrect_answers?.map(
              (question: string, index: number) => (
                <Typography
                  onClick={() => {
                    setSelectedAnswer(question);
                    dispatch(
                      setUserAnswer({
                        question: questions2[number]?.question,
                        selectedAnswer: question,
                        correctAnswer: questions2[number]?.correct_answer,
                        correct:
                          questions2[number]?.correct_answer === question,
                      })
                    );
                  }}
                  style={
                    selectedAnswer === question ? multipleChoiceSelect : {}
                  }
                  key={index}
                  variant="body1"
                  gutterBottom
                >
                  {question}
                </Typography>
              )
            )}
            {/* <Typography variant="body1">Loading Questions</Typography> */}
            {!gameOver && !loading && userAnswer?.length !== 10 && (
              <Button
                onClick={() => dispatch(nextQuestion())}
                variant="contained"
                disabled={!userAnswer[number]?.selectedAnswer}
              >
                Next Question
              </Button>
            )}
            {!gameOver && !loading && userAnswer?.length === 10 && (
              <Box sx={{ display: "flex" }}>
                <Button
                  onClick={() => {
                    dispatch(finishQuiz());
                    refetch();
                  }}
                  sx={{ marginRight: "10px" }}
                  variant="outlined"
                >
                  Play again{" "}
                </Button>

                <CustomizedDialogs userAnswer={userAnswer}></CustomizedDialogs>
              </Box>
            )}
          </>
        )}
      </Box>
      {gameOver && loading && (
        <Button onClick={() => dispatch(startTrivia(newData))}>Start</Button>
      )}
    </Box>
  );
};

export default QuestionCard;
