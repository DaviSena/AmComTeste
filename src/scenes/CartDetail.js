import React, {useState} from 'react';
import {Image, StyleSheet, Dimensions} from 'react-native';
import {View, Text, Button, Icon} from 'native-base';
import {ScrollView} from 'react-native-gesture-handler';
import UserCart from '../components/UserCart';
import StarRating from '../components/StarRating';
import {noImageBase64} from '../utils/constants';
import BrandColors from '../utils/BrandColors';

const screenWidth = Dimensions.get('window').width;

const CartDetail = (props) => {
  const [totalPrice, setTotalPrice] = useState(UserCart.getUserCartAmount());

  const formatPriceToShow = (price) => {
    if (!price) {
      return 'R$ 0,00';
    }
    price = price.toFixed(2);
    price = '' + price;

    if (!price.includes('R$')) {
      price = 'R$ ' + price;
    }

    if (!price.includes('.')) {
      price = price + ',00';
    }

    price = price.replace('.', ',');

    return price;
  };

  const removeItemFromCart = (item) => {
    UserCart.removeProduct(item);
    setTotalPrice(UserCart.getUserCartAmount());
  };

  const renderCartItem = (item) => {
    const hasDiscount = item.discount || item.discount.length !== 0;
    return (
      <View key={item.name} style={styles.productCardView}>
        <View>
          <Image
            style={styles.productImage}
            source={{
              uri: item.image || noImageBase64,
            }}
            resizeMode={'contain'}
          />
        </View>
        <View style={styles.productInfoView}>
          <Text numberOfLines={2} style={styles.productName}>
            {item.name}
          </Text>
          <StarRating rating={item.rateAverage} />
          {!hasDiscount && (
            <Text style={styles.productPrice}>{item.price}</Text>
          )}
          {hasDiscount && (
            <View>
              <Text style={styles.productPriceWithDiscount}>{item.price}</Text>
              <Text style={styles.productPrice}>{item.discount}</Text>
            </View>
          )}
        </View>
        <View style={styles.buyButtonView}>
          <Button
            style={styles.cartButton}
            iconLeft
            bordered
            danger
            onPress={() => removeItemFromCart(item)}>
            <Icon name="trash" style={{fontSize: 17}} />
            <Text style={{fontSize: 14, fontWeight: 'bold', marginLeft: -10}}>
              Remover
            </Text>
          </Button>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      {UserCart.cartItens && UserCart.cartItens.length === 0 && (
        <Text style={styles.emptyCartText}>Seu carrinho está vazio!</Text>
      )}
      <ScrollView style={styles.scrollViewWithMarging}>
        {UserCart.cartItens.map((item) => renderCartItem(item))}
      </ScrollView>
      <View style={styles.totalPriceView}>
        <Text style={styles.totalPriceText}>{'Total: '}</Text>
        <Text style={styles.totalPriceText}>
          {formatPriceToShow(totalPrice)}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollViewWithMarging: {
    paddingTop: 10,
    marginBottom: 60,
  },
  productCardView: {
    width: screenWidth - 20,
    height: 120,
    flexDirection: 'row',
    marginLeft: 10,
    marginRight: 10,
    backgroundColor: 'white',
    borderWidth: 0.5,
    justifyContent: 'space-between',
    marginBottom: 5,
    shadowColor: 'gray',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 1.5,
    elevation: 3,
    borderRadius: 10,
  },
  productName: {
    fontSize: 15,
    fontWeight: '300',
    letterSpacing: 1,
  },
  productPrice: {
    fontSize: 17,
    fontWeight: 'bold',
    letterSpacing: 0.5,
  },
  productPriceWithDiscount: {
    fontSize: 13,
    fontWeight: 'bold',
    letterSpacing: 0.5,
    textDecorationLine: 'line-through',
  },
  productInfoView: {
    flex: 1,
    margin: 5,
    marginTop: 10,
  },
  buyButtonView: {
    alignSelf: 'center',
    marginRight: 10,
  },
  productImage: {
    margin: 5,
    height: 100,
    width: 100,
  },
  cartButton: {
    borderRadius: 15,
  },
  totalPriceView: {
    flexDirection: 'row',
    position: 'absolute',
    bottom: 0,
    backgroundColor: BrandColors.brandActionColor,
    width: screenWidth,
    height: 60,
    justifyContent: 'flex-end',
    marginRight: 10,
  },
  totalPriceTitleText: {
    fontSize: 20,
    color: 'white',
    fontWeight: '300',
  },
  totalPriceText: {
    fontSize: 30,
    color: 'white',
    fontWeight: 'bold',
    marginRight: 10,
  },
  emptyCartText: {
    fontSize: 27,
    fontWeight: 'bold',
    alignSelf: 'center',
  },
});

export default CartDetail;
