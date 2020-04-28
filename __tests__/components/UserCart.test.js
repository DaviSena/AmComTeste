import React from 'react';
import AsyncStorage from '@react-native-community/async-storage';
jest.mock('@react-native-community/async-storage');
import UserCart from '../../src/components/UserCart';

const product_01 = {
  name: 'Xadrez',
  price: 'R$ 104,50',
  discount: '',
  rateAverage: '3.5',
};
const product_02 = {
  name: 'War',
  price: 'R$ 104,50',
  discount: 'R$ 80,50',
  rateAverage: '3.5',
};

test('Init UserCart', () => {
  UserCart.init();
  expect(UserCart.cartItens.length).toBe(0);
});

test('First access products, has to be 0 itens', () => {
  return UserCart.getData().then((products) => {
    expect(products.length).toBe(0);
  });
});

test('Adding product undefined, the result after has to be 0 itens', () => {
  UserCart.addProduct(undefined);
  return UserCart.getData().then((products) => {
    expect(products.length).toBe(0);
  });
});

test('Getting cart amount from empty cart', () => {
  const amount = UserCart.getUserCartAmount();
  expect(amount).toBe(0);
});

test('Remove product undefined, length must return 0', () => {
  UserCart.removeProduct(undefined);
  return UserCart.getData().then((products) => {
    expect(products.length).toBe(0);
  });
});

test('Adding one product, length must return 1', () => {
  UserCart.addProduct(product_01);
  return UserCart.getData().then((products) => {
    expect(products.length).toBe(1);
  });
});

test('Is product one UserCart, product name has to be equal product.name', () => {
  expect(UserCart.isProductInCart(product_01.name)).toBe(true);
});

test('Get all products in cart', () => {
  UserCart.addProduct(product_02);
  expect(UserCart.cartItens.length).toBe(2);
});

test('Getting cart amount from cart with 1 product', () => {
  const amount = UserCart.getUserCartAmount();
  expect(amount).toBe(185);
});

test('Remove one product', () => {
  UserCart.removeProduct(product_01);
  return UserCart.getData().then((products) => {
    expect(products.length).toBe(1);
  });
});

test('Clear all products, length must return 0', () => {
  UserCart.clearUserCart();
  return UserCart.getData().then((products) => {
    expect(products.length).toBe(1);
  });
});
