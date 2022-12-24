import { fireEvent, screen } from '@testing-library/react-native';
import { getBooksResponseMock, renderWithProviders } from '../../../../__mocks__';
import BookList from '../BookList';
import * as hooks from '../../../../services/query';
import {
  QueryDefinition,
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryError,
  FetchBaseQueryMeta,
} from '@reduxjs/toolkit/dist/query';
import { QueryActionCreatorResult } from '@reduxjs/toolkit/dist/query/core/buildInitiate';
import { SubjectsResponse } from '../../../../redux/books';

const mockedNavigate = jest.fn();

jest.mock('@react-navigation/native', () => {
  const actualNav = jest.requireActual('@react-navigation/native');
  return {
    ...actualNav,
    useNavigation: () => ({
      navigate: mockedNavigate,
    }),
  };
});

const spyOnHooks = () => {
  jest.spyOn(hooks, 'useGetLoveSubjectsQuery').mockReturnValue({
    data: getBooksResponseMock,
    isError: false,
    isLoading: false,
    refetch: function (): QueryActionCreatorResult<
      QueryDefinition<
        void,
        BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError, {}, FetchBaseQueryMeta>,
        never,
        SubjectsResponse,
        'booksapi'
      >
    > {
      throw new Error('Function not implemented.');
    },
  });
};

describe('BookList', () => {
  it('match snapshot', () => {
    spyOnHooks();
    renderWithProviders(<BookList />);
    expect(screen.toJSON()).toMatchSnapshot();
  });

  it('has 1 item', async () => {
    spyOnHooks();
    renderWithProviders(<BookList />);
    const items = await screen.findAllByTestId('book_item');

    expect(items.length).toBe(1);
  });

  it('can press book button', async () => {
    spyOnHooks();
    renderWithProviders(<BookList />);
    fireEvent.press(await screen.findByTestId('button_book_item_testing'));
    expect(mockedNavigate).toHaveBeenCalledWith('Modal', getBooksResponseMock.works[0]);
  });
});
