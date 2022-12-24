import { combineReducers, configureStore } from "@reduxjs/toolkit";
import rowDataSlice from "./slices/rowDataSlice";


const rootReducer = combineReducers({
  rowData: rowDataSlice,
})

export const store = configureStore({
  reducer: rootReducer,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;