import React from 'react';
import { Text, View } from '../Themed';
import { renderWithProviders } from '../../../../__mocks__';

describe(`Themed test`, () => {
  describe('Text', () => {
    it(`match snapshot`, () => {
      const tree = renderWithProviders(<Text>Snapshot test!</Text>).toJSON();

      expect(tree).toMatchSnapshot();
    });
  });

  describe('View', () => {
    it(`match snapshot`, () => {
      const tree = renderWithProviders(<View>Snapshot test!</View>).toJSON();

      expect(tree).toMatchSnapshot();
    });
  });
});
