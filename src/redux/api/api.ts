import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export enum Difficulty {
  EASY = "easy",
  MEDIUM = "medium",
  HARD = "hard",
}
export interface QuizQuestion {
  category: string;
  correct_answer: string;
  difficulty: string;
  incorrect_answers: string[];
  question: string;
  type: string;
}

export interface QuizResponse extends QuizQuestion {
  results: QuizQuestion[];
}

interface QuizQuestionArgs {
  amount: number;
  difficulty: Difficulty;
}

export const openTriviaApi = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({ baseUrl: "https://opentdb.com" }),
  tagTypes: ["Post"],
  endpoints: (builder) => ({
    fetchQuizQuestion: builder.query<QuizResponse, QuizQuestionArgs>({
      query: ({ amount, difficulty }) =>
        `/api.php?amount=${amount}&difficulty=${difficulty}&type=multiple`,
    }),
  }),
});

export const { useFetchQuizQuestionQuery } = openTriviaApi;
