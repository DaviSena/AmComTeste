import React from 'react';
import {View, Text, Icon} from 'native-base';
import {StyleSheet} from 'react-native';
import BrandColors from '../utils/BrandColors';

const StarRating = ({rating = 0}) => {
  let stars = [];

  for (let rate = 1; rate <= 5; rate++) {
    if (rate > rating) {
      stars.push(<Icon key={rate} name="star" style={styles.emptyStar} />);
    } else {
      stars.push(<Icon key={rate} name="star" style={styles.fullStar} />);
    }
  }

  return (
    <View style={styles.container}>
      {stars}
      <Text style={styles.rateText}>{rating}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {flexDirection: 'row', paddingBottom: 10},
  rateText: {
    fontSize: 12,
    marginLeft: 5,
  },
  fullStar: {
    fontSize: 15,
    color: BrandColors.starRateYellow,
  },
  emptyStar: {fontSize: 15, color: BrandColors.starRateGray},
});

export default StarRating;
