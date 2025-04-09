import { configureStore } from "@reduxjs/toolkit";
import salesReducer from "./sales/salesSlice";
import toastReducer from "./sales/toastSlice";

export const store = configureStore({
    reducer: {
        sales: salesReducer,
        toast: toastReducer,
    }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;