import { addBookingInformation, booksReducer } from '../books';

const initialState = {
  bookingInformation: [],
};

const mockData = {
  authors: [{ key: '/authors/OL4327048A', name: 'Emily Brontë' }],
  key: 'testing',
  title: 'testing',
  edition_count: 123,
  has_fulltext: true,
  ia: 'testing',
  bookingDate: '1234',
};

describe('books reducer', () => {
  test('addBookingInformation action is save correct data', () => {
    expect(booksReducer.books(initialState, addBookingInformation(mockData))).toEqual({
      bookingInformation: [
        {
          authors: [{ key: '/authors/OL4327048A', name: 'Emily Brontë' }],
          key: 'testing',
          title: 'testing',
          edition_count: 123,
          has_fulltext: true,
          ia: 'testing',
          bookingDate: '1234',
        },
      ],
    });
  });
});
