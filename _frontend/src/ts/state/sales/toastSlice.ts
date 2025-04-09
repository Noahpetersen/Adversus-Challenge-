import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ToastSale {
    id: number;
    user: string;
    product: string;
    value: number;
}
  
interface ToastState {
    queue: ToastSale[];
    current: ToastSale | null;
}

const initialState: ToastState = {
    queue: [],
    current: null,
};

const toastSlice = createSlice({
    name: 'toast',
    initialState,
    reducers: {
      enqueueSale(state, action: PayloadAction<ToastSale>) {
        state.queue.push(action.payload);
        
      },
      showNextToast(state) {
        state.current = state.queue.shift() ?? null;
      },
      clearSale(state) {
        state.current = null;
      }
    }
  });
  
  export const { enqueueSale, showNextToast, clearSale } = toastSlice.actions;
  export default toastSlice.reducer;
  