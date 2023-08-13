import { configureStore } from "@reduxjs/toolkit";
import quizReducer from "./features/quiz/quizSlice";
import { openTriviaApi } from "./api/api";

export const store = configureStore({
  reducer: {
    quiz: quizReducer,
    [openTriviaApi.reducerPath]: openTriviaApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(openTriviaApi.middleware),
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
