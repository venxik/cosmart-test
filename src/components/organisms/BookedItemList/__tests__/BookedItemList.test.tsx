import { screen } from '@testing-library/react-native';
import { renderWithProviders } from '../../../../__mocks__';
import BookedItemList from '../BookedItemList';

describe(`BookedItemList`, () => {
  it('match snapshot', () => {
    const screen = renderWithProviders(<BookedItemList />).toJSON();

    expect(screen).toMatchSnapshot();
  });

  it('shows empty container', () => {
    renderWithProviders(<BookedItemList />);
    expect(screen.getByTestId('empty_container')).toBeDefined();
  });

  it('shows 1 item on the list', () => {
    renderWithProviders(<BookedItemList />, {
      preloadedState: {
        books: {
          bookingInformation: [
            {
              authors: [{ key: 'test', name: 'test' }],
              bookingDate: 'test',
              edition_count: 123,
              has_fulltext: true,
              ia: 'tesst',
              key: 'test',
              title: 'test',
            },
          ],
        },
      },
    });
    const items = screen.getAllByTestId('booking_item_list');
    expect(items.length).toBe(1);
  });
});
