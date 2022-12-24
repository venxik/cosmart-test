import { screen } from '@testing-library/react-native';
import { renderWithProviders } from '../../../__mocks__';
import TabTwoScreen from '../TabTwoScreen';

describe('TabTwoScreen', () => {
  it('match snapshot', async () => {
    renderWithProviders(<TabTwoScreen />);
    expect(screen.toJSON()).toMatchSnapshot();
  });
});
