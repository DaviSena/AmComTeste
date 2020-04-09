import React from 'react';
import {View, Text, Icon} from 'native-base';
import {StyleSheet} from 'react-native';

const StarRating = ({rating}) => {
  let stars = [];

  for (let rate = 1; rate <= 5; rate++) {
    if (rate > rating) {
      stars.push(<Icon key={rate} name="star" style={styles.emptyStar} />);
    } else {
      stars.push(<Icon key={rate} name="star" style={styles.fullStar} />);
    }
  }

  return (
    <View style={{flexDirection: 'row', paddingBottom: 10}}>
      {stars}
      <Text style={styles.rateText}>{rating}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  rateText: {
    fontSize: 12,
    marginLeft: 5,
  },
  fullStar: {
    fontSize: 15,
    color: '#ecc953',
  },
  emptyStar: {fontSize: 15, color: '#cccccc'},
});

export default StarRating;
