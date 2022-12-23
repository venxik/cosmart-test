import React from 'react';
import renderer from 'react-test-renderer';
import { Text, View } from '../Themed';

describe(`Themed test`, () => {
  it(`renders Text correctly`, () => {
    const tree = renderer.create(<Text>Snapshot test!</Text>).toJSON();

    expect(tree).toMatchSnapshot();
  });

  it(`renders View correctly`, () => {
    const tree = renderer.create(<View>Snapshot test!</View>).toJSON();

    expect(tree).toMatchSnapshot();
  });
});
