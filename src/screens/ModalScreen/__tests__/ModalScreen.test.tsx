import { fireEvent, screen } from '@testing-library/react-native';
import { renderWithProviders } from '../../../__mocks__';
import ModalScreen from '../ModalScreen';
import DateTimePicker, { DateTimePickerEvent } from '@react-native-community/datetimepicker';
import { setupStore } from '../../../redux';

const mockedNavigate = jest.fn();

jest.mock('@react-navigation/native', () => {
  const actualNav = jest.requireActual('@react-navigation/native');
  return {
    ...actualNav,
    useNavigation: () => ({
      goBack: mockedNavigate,
    }),
    useRoute: () => ({
      params: {
        authors: [{ key: '/authors/OL4327048A', name: 'Emily Brontë' }],
        key: 'testing',
        title: 'testing',
        edition_count: 123,
        has_fulltext: true,
        ia: 'testing',
        bookingDate: '1234',
      },
    }),
  };
});

export const createDateTimeSetEvtParams = (date: Date): [DateTimePickerEvent, Date] => {
  return [
    {
      type: 'set',
      nativeEvent: {
        timestamp: date.getTime(),
      },
    },
    date,
  ];
};

describe('ModalScreen', () => {
  const date = new Date('2022-12-12T00:00:00.000Z');
  const store = setupStore();

  it('can render correctly', async () => {
    renderWithProviders(<ModalScreen />);
    expect(screen).toBeDefined();
  });

  it('have correct values', async () => {
    renderWithProviders(<ModalScreen />);
    expect(screen.getByTestId('text_title')).toHaveTextContent('testing');
    expect(screen.getByTestId('text_author')).toHaveTextContent('Emily Brontë');
    expect(screen.getByTestId('text_edition')).toHaveTextContent('123');
  });

  it('can change date', () => {
    renderWithProviders(<ModalScreen />);
    fireEvent.press(screen.getByTestId('button_show_date_picker'));
    fireEvent(
      screen.UNSAFE_getByType(DateTimePicker),
      'onChange',
      ...createDateTimeSetEvtParams(date)
    );
    expect(screen.getByTestId('text_date')).toHaveTextContent('12/12/2022');
  });

  it('can change time', () => {
    renderWithProviders(<ModalScreen />);
    fireEvent.press(screen.getByTestId('button_show_date_picker'));
    fireEvent(
      screen.UNSAFE_getByType(DateTimePicker),
      'onChange',
      ...createDateTimeSetEvtParams(date)
    );
    expect(screen.getByTestId('text_time')).toHaveTextContent('07.00');
  });

  it('can press add to booking button', () => {
    renderWithProviders(<ModalScreen />, { store: store });
    fireEvent.press(screen.getByTestId('button_add'));
    expect(mockedNavigate).toHaveBeenCalledTimes(1);

    const { bookingInformation } = store.getState().books;

    expect(bookingInformation.length).toEqual(1);

    expect(bookingInformation).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          key: 'testing',
          title: 'testing',
        }),
      ])
    );
  });
});
