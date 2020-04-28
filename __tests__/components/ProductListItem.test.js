import React from 'react';
import {create} from 'react-test-renderer';
import ProductListItem from '../../src/components/ProductListItem';

test('Component is rendering correctly for rating = 3', () => {
  const component = create(
    <ProductListItem
      product={undefined}
      navigation={undefined}
      addItemToCart={() => {}}
      removeItemToCart={() => {}}
    />,
  ); //Create the ProductListItem component
  expect(component.toJSON()).toBeNull();
});
