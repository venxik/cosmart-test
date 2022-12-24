import React from 'react';
import { MonoText } from '../StyledText';
import { renderWithProviders } from '../../../../__mocks__';

describe('StyledText', () => {
  it(`match snapshot`, () => {
    const tree = renderWithProviders(<MonoText>Snapshot test!</MonoText>).toJSON();

    expect(tree).toMatchSnapshot();
  });
});
