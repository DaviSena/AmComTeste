import React from 'react';
import {View, Text, Icon, Button} from 'native-base';
import {StyleSheet, TouchableOpacity, Image, Dimensions} from 'react-native';
import StarRating from './StarRating';
import UserCart from './UserCart';
import {noImageBase64} from '../utils/constants';
import BrandColors from '../utils/BrandColors';

const screenWidth = Dimensions.get('window').width;

const ProductListItem = ({
  navigation,
  product,
  addItemToCart,
  removeItemToCart,
}) => {
  if (!product) {
    return null;
  }

  const hasDiscount = product.discount || product.discount.length !== 0;
  const productIsInCart = UserCart.isProductInCart(product.name);

  return (
    <TouchableOpacity
      style={styles.productCardView}
      onPress={() => {
        navigation.navigate('Detail', {
          product: product,
        });
      }}>
      <View>
        <Image
          style={styles.productImage}
          source={{
            uri: product.image || noImageBase64,
          }}
          resizeMode={'contain'}
        />
      </View>
      <View style={styles.productInfoView}>
        <Text numberOfLines={2} style={styles.productName}>
          {product.name}
        </Text>
        <StarRating rating={product.rateAverage} />
        {!hasDiscount && (
          <Text style={styles.productPrice}>{product.price}</Text>
        )}
        {hasDiscount && (
          <View>
            <Text style={styles.productPriceWithDiscount}>{product.price}</Text>
            <Text style={styles.productPrice}>{product.discount}</Text>
          </View>
        )}
      </View>
      <View style={styles.buyButtonView}>
        {productIsInCart && (
          <Button
            style={styles.cartButtonRemove}
            iconLeft
            bordered
            danger
            onPress={() => removeItemToCart(product)}>
            <Icon name="trash" style={{fontSize: 17}} />
            <Text style={{fontSize: 14, fontWeight: 'bold', marginLeft: -10}}>
              Remover
            </Text>
          </Button>
        )}
        {!productIsInCart && (
          <Button
            style={styles.cartButton}
            iconLeft
            onPress={() => addItemToCart(product)}>
            <Icon name="cart" style={{fontSize: 17}} />
            <Text style={{fontSize: 14, fontWeight: 'bold', marginLeft: -10}}>
              Comprar
            </Text>
          </Button>
        )}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
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
    backgroundColor: BrandColors.brandActionColor,
    borderRadius: 15,
  },
  cartButtonRemove: {
    borderRadius: 15,
  },
});
export default ProductListItem;
