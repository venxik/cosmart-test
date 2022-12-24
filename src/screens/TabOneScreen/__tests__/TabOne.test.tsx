import { screen } from '@testing-library/react-native';
import { getBooksResponseMock, renderWithProviders } from '../../../__mocks__';
import * as hooks from '../../../services/query';
import TabOneScreen from '../TabOneScreen';
import { QueryActionCreatorResult } from '@reduxjs/toolkit/dist/query/core/buildInitiate';
import {
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryError,
  FetchBaseQueryMeta,
  QueryDefinition,
} from '@reduxjs/toolkit/dist/query';
import { SubjectsResponse } from '../../../redux/books';

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

describe('TabOneScreen', () => {
  it('match snapshot', async () => {
    spyOnHooks();
    renderWithProviders(<TabOneScreen />);
    expect(screen.toJSON()).toMatchSnapshot();
  });
});
