import { Provider } from 'react-redux';
import { AppStore, RootState, setupStore } from '../redux';
import { PreloadedState } from '@reduxjs/toolkit';
import { PropsWithChildren } from 'react';
import { render } from '@testing-library/react-native';

interface ExtendedRenderOptions {
  preloadedState?: PreloadedState<RootState>;
  store?: AppStore;
}

export function AllTheProviders({ children }: { children: JSX.Element }) {
  return <Provider store={setupStore()}>{children}</Provider>;
}

export function renderWithProviders(
  ui: React.ReactElement,
  {
    preloadedState = {},
    store = setupStore(preloadedState),
    ...renderOptions
  }: ExtendedRenderOptions = {}
) {
  function Wrapper({ children }: PropsWithChildren<{}>): JSX.Element {
    return <Provider store={store}>{children}</Provider>;
  }
  return { store, ...render(ui, { wrapper: Wrapper, ...renderOptions }) };
}
