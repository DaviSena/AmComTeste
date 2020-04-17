import React from 'react';
import {create} from 'react-test-renderer';
import StarRating from 'components/StarRating';
import BrandColors from 'utils/BrandColors';

test('Component is rendering correctly for rating = 3', () => {
  const component = create(<StarRating rating={3} />); //Create the StarRating component
  const yellowColorregex = new RegExp(BrandColors.starRateYellow, 'g'); //Create a regex looking for the yellow color definition in component Json
  const yellowStarCount = (
    JSON.stringify(component.toJSON().children).match(yellowColorregex) || []
  ).length;
  expect(yellowStarCount).toBe(3);
});

test('Component is rendering correctly for rating = 0', () => {
  const component = create(<StarRating rating={0} />); //Create the StarRating component
  const yellowColorregex = new RegExp(BrandColors.starRateGray, 'g'); //Create a regex looking for the yellow color definition in component Json
  const yellowStarCount = (
    JSON.stringify(component.toJSON().children).match(yellowColorregex) || []
  ).length;
  expect(yellowStarCount).toBe(5);
});

test('Component is rendering correctly for rating = undefined', () => {
  const component = create(<StarRating rating={undefined} />); //Create the StarRating component
  const yellowColorregex = new RegExp(BrandColors.starRateGray, 'g'); //Create a regex looking for the yellow color definition in component Json
  const yellowStarCount = (
    JSON.stringify(component.toJSON().children).match(yellowColorregex) || []
  ).length;
  expect(yellowStarCount).toBe(5);
});
