import { createSlice } from '@reduxjs/toolkit';

interface SalesState {
    sales: any[];
}

const initialState: SalesState = {
    sales: [],
};

const salesSlice = createSlice({
    name: 'sales',
    initialState,
    reducers: {
        addSale: (state, action) => {
            state.sales.push(action.payload);
        }
    },
});

export const { addSale } = salesSlice.actions;
export default salesSlice.reducer;