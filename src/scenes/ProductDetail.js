import React, {useState} from 'react';
import {Image, Dimensions, StyleSheet} from 'react-native';
import {View, Text, Button, Icon} from 'native-base';
import Swiper from 'react-native-swiper';
import {ScrollView} from 'react-native-gesture-handler';
import StarRating from '../components/StarRating';
import UserCart from '../components/UserCart';
import {noImageBase64} from '../utils/constants';
import BrandColors from '../utils/BrandColors';

const screenWidth = Dimensions.get('window').width;

const ProductDetail = (props) => {
  const {product} = props.route.params;
  const [productToCart, setProductToCart] = useState(false);
  const hasDiscount = product.discount || product.discount.length !== 0;
  const productIsInCart = UserCart.isProductInCart(product.name);

  React.useEffect(() => {
    const unsubscribe = props.navigation.addListener('focus', () => {
      setProductToCart(!productToCart);
    });

    return unsubscribe;
  });

  const addItemToCart = (item) => {
    UserCart.addProduct(item);
    props.navigation.navigate('Cart');
  };

  const removeItemToCart = (item) => {
    UserCart.removeProduct(item);
    setProductToCart(!productToCart);
  };

  const renderComment = (comment) => {
    return (
      <View key={comment.username.replace(' ', '')}>
        <Text>{comment.username}</Text>
        <View>
          <Text>{'"' + comment.comment + '"'}</Text>
          <StarRating rating={comment.rate} />
        </View>
        <View style={styles.commentSeparator} />
      </View>
    );
  };

  const renderImagesSwipe = (principalImage, detailImages) => {
    let imageComponentArray = [];

    imageComponentArray.push(
      <View key={'principalImage'} style={{flex: 1, backgroundColor: 'white'}}>
        <Image
          source={{uri: principalImage || noImageBase64}}
          style={{height: 200, width: 200, alignSelf: 'center'}}
          resizeMode={'contain'}
        />
      </View>,
    );

    let secondaryImageCount = 0;
    if (detailImages) {
      detailImages.forEach((image) => {
        imageComponentArray.push(
          <View
            key={'secondaryImage' + secondaryImageCount++}
            style={{flex: 1, backgroundColor: 'white'}}>
            <Image
              source={{uri: image}}
              style={{height: 200, width: 200, alignSelf: 'center'}}
              resizeMode={'contain'}
            />
          </View>,
        );
      });
    }

    return (
      <Swiper
        paginationStyle={{
          bottom: -10,
        }}>
        {imageComponentArray}
      </Swiper>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.swiperContainer}>
        {renderImagesSwipe(product.image, product.imagesDetail)}
      </View>
      <View style={styles.productInfoContainer}>
        <View style={styles.productInfo}>
          <Text style={styles.productName}>{product.name}</Text>
          <StarRating rating={product.rateAverage} />
          {!hasDiscount && (
            <View style={{alignSelf: 'center', paddingTop: 25}}>
              <Text style={styles.productPrice}>{product.price}</Text>
            </View>
          )}
          {hasDiscount && (
            <View style={{alignSelf: 'center', paddingTop: 25}}>
              <Text style={styles.productPriceWithDiscount}>
                {'De: ' + product.price}
              </Text>
              <Text style={styles.productPrice}>
                {'Por: ' + product.discount}
              </Text>
            </View>
          )}
          {productIsInCart && (
            <Button
              style={styles.cartButtonRemove}
              iconLeft
              bordered
              danger
              onPress={() => removeItemToCart(product)}>
              <Icon name="trash" style={{fontSize: 20}} />
              <Text style={{fontSize: 20, fontWeight: 'bold'}}>
                Remover do Carrinho
              </Text>
            </Button>
          )}
          {!productIsInCart && (
            <Button
              style={styles.cartButton}
              iconLeft
              onPress={() => addItemToCart(product)}>
              <Icon name="cart" style={{fontSize: 20}} />
              <Text style={{fontSize: 20, fontWeight: 'bold'}}>Comprar</Text>
            </Button>
          )}
        </View>
      </View>
      <ScrollView style={styles.commentsArea}>
        <Text style={styles.commentsTitle}>Comentários:</Text>
        {!product?.comments && (
          <Text style={styles.noComments}>
            O produto ainda não recebeu nenhum comentário.
          </Text>
        )}
        {product?.comments?.map((comment) => renderComment(comment))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'white',
  },
  swiperContainer: {
    height: 200,
    width: screenWidth,
    marginBottom: 15,
    backgroundColor: 'white',
  },
  productInfoContainer: {
    flex: 1,
    backgroundColor: 'white',
    borderTopColor: '#cccccc',
    borderTopWidth: 1,
  },
  productInfo: {
    marginLeft: 20,
    marginRight: 20,
    marginTop: 10,
  },
  productName: {
    fontSize: 25,
    fontWeight: 'bold',
    letterSpacing: 1,
  },
  productPrice: {
    fontSize: 30,
    fontWeight: 'bold',
    letterSpacing: 0.3,
  },
  productPriceWithDiscount: {
    fontSize: 15,
    fontWeight: 'bold',
    letterSpacing: 0.5,
    textDecorationLine: 'line-through',
  },
  cartButton: {
    backgroundColor: BrandColors.brandActionColor,
    borderRadius: 15,
    justifyContent: 'center',
    marginTop: 15,
  },
  cartButtonRemove: {
    borderRadius: 15,
    justifyContent: 'center',
    marginTop: 15,
  },
  commentsArea: {
    flex: 1,
    borderTopColor: '#cccccc',
    borderTopWidth: 1,
    paddingLeft: 20,
    paddingRight: 10,
  },
  commentsTitle: {
    fontSize: 20,
    fontWeight: '500',
  },
  commentSeparator: {
    borderWidth: 0.2,
    marginBottom: 5,
  },
  noComments: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 10,
    textAlign: 'center',
  },
});

export default ProductDetail;
