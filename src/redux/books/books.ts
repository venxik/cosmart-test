import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { BookingInformation, InitialState } from './types';

const initialState: InitialState = {
  bookingInformation: [],
};

const reducerName = 'books';

const slice = createSlice({
  name: reducerName,
  initialState,
  reducers: {
    addBookingInformation(state: InitialState, action: PayloadAction<BookingInformation>) {
      state.bookingInformation = [...state.bookingInformation, action.payload];
    },
  },
});

export const booksReducer = { [reducerName]: slice.reducer };

export const { addBookingInformation } = slice.actions;
