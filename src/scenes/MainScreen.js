import React, {useState} from 'react';
import {
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  ScrollView,
  TextInput,
} from 'react-native';
import {View, Text, Icon, Button, Badge} from 'native-base';
import ProductsService from '../services/productsService';
import ProductListItem from '../components/ProductListItem';
import BrandColors from '../utils/BrandColors';
import UserCart from '../components/UserCart';

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;
const PRICE_ASCENDING = 'PRICE_ASCENDING';
const PRICE_DESCENDING = 'PRICE_DESCENDING';
const CLEAN = 'CLEAN';

const MainScreen = (props) => {
  props.navigation.setOptions({
    headerRight: () => (
      <Button
        style={{marginRight: 20}}
        transparent
        onPress={() => props.navigation.navigate('Cart')}>
        <Icon name="cart" style={styles.cartHeadreIcon} />
        {UserCart.cartItens && UserCart.cartItens.length > 0 && (
          <Badge style={styles.cartItensBadge}>
            <Text style={{color: BrandColors.brandActionColor}}>
              {UserCart.cartItens.length}
            </Text>
          </Badge>
        )}
      </Button>
    ),
  });

  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);
  const [refreshAfterCart, setRefreshAfterCart] = useState(false);
  const [filterProducts, setFilterProducts] = useState([]);
  const [showReorderModal, setShowReorderModal] = useState(false);
  const [reorderAcending, setReorderAcending] = useState(false);
  const [reorderDescending, setReorderDescending] = useState(false);
  const productsToSort = [...products];

  React.useEffect(() => {
    const unsubscribe = props.navigation.addListener('focus', () => {
      setRefreshAfterCart(!refreshAfterCart);
    });
    return unsubscribe;
  });

  React.useLayoutEffect(() => {
    ProductsService.getProducts().then((result) => {
      setProducts(result);
      const productsPagination = (allProducts, pageToShow) => {
        const productsLength = allProducts.length;

        if (productsLength <= 10) {
          return allProducts;
        } else {
          const startPoint = (pageToShow - 1) * 10;
          const stopPoint = pageToShow * 10;

          return allProducts.slice(startPoint, stopPoint);
        }
      };
      setFilterProducts(productsPagination(result, page));
    });
  }, [page]);

  const addItemToCart = (item) => {
    UserCart.addProduct(item);
    props.navigation.navigate('Cart');
  };

  const removeItemToCart = (item) => {
    UserCart.removeProduct(item);
    setRefreshAfterCart(!refreshAfterCart);
  };

  const onChangeSearchText = (text) => {
    if (!text && text.length === 0) {
      setFilterProducts(products);
    }

    setFilterProducts(
      products.filter((product) =>
        product.name.toLowerCase().includes(text.toLowerCase()),
      ),
    );
  };

  const reorderProductsByPrice = (type) => {
    if (type === CLEAN) {
      setFilterProducts(products);
      setReorderAcending(false);
      setReorderDescending(false);
      return;
    }

    if (type === PRICE_DESCENDING) {
      productsToSort.sort(function (a, b) {
        return (
          parseFloat(
            a?.discount?.replace('R$', '').replace(',', '.') ||
              a.price.replace('R$', '').replace(',', '.'),
          ) -
          parseFloat(
            b?.discount?.replace('R$', '').replace(',', '.') ||
              b.price.replace('R$', '').replace(',', '.'),
          )
        );
      });
      setReorderDescending(true);
      setReorderAcending(false);
    } else {
      productsToSort.sort(function (a, b) {
        return (
          parseFloat(
            b.discount.replace('R$', '').replace(',', '.') ||
              b.price.replace('R$', '').replace(',', '.'),
          ) -
          parseFloat(
            a.discount.replace('R$', '').replace(',', '.') ||
              a.price.replace('R$', '').replace(',', '.'),
          )
        );
      });
      setReorderAcending(true);
      setReorderDescending(false);
    }

    setFilterProducts(productsToSort);
  };

  const changePage = (page) => {
    setPage(page);
  };

  const renderPagination = () => {
    const totalPages = Math.ceil(products.length / 10);
    let pageItens = [];

    for (let count = 1; count <= totalPages; count++) {
      pageItens.push(
        <TouchableOpacity
          key={'page' + count}
          style={page === count ? styles.actualPage : styles.otherPages}
          onPress={() => changePage(count)}>
          <Text
            style={
              page === count ? styles.actualPageText : styles.otherPagesText
            }>
            {count}
          </Text>
        </TouchableOpacity>,
      );
    }

    return (
      <View style={styles.paginationContainer}>
        <Text>{'Página(s): '}</Text>
        {pageItens}
      </View>
    );
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.searchAndReorderArea}>
        <View style={styles.searchView}>
          <Icon style={styles.searchIcon} name="search" />
          <TextInput
            style={styles.searchInput}
            onChangeText={(text) => onChangeSearchText(text)}
          />
        </View>
        <TouchableOpacity
          style={styles.reorderOption}
          onPress={() => setShowReorderModal(!showReorderModal)}>
          <Icon name="reorder" style={{fontSize: 30}} />
          <Text style={styles.reorderLabel}>Ordenar</Text>
        </TouchableOpacity>
      </View>
      {showReorderModal && (
        <View style={styles.reorderOptionView}>
          <TouchableOpacity
            style={
              reorderDescending
                ? styles.reoderSelectedOption
                : styles.reorderNotSelectedOption
            }
            onPress={() => reorderProductsByPrice(PRICE_DESCENDING)}>
            <Text
              style={
                reorderDescending
                  ? styles.reoderSelectedOptionText
                  : styles.reoderNotSelectedOptionText
              }>
              Menor Preço
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={
              reorderAcending
                ? styles.reoderSelectedOption
                : styles.reorderNotSelectedOption
            }
            onPress={() => reorderProductsByPrice(PRICE_ASCENDING)}>
            <Text
              style={
                reorderAcending
                  ? styles.reoderSelectedOptionText
                  : styles.reoderNotSelectedOptionText
              }>
              Maior Preço
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.reorderCleanOption}
            onPress={() => reorderProductsByPrice(CLEAN)}>
            <Text>Limpar</Text>
          </TouchableOpacity>
        </View>
      )}
      <View>
        {filterProducts.map((product) => (
          <ProductListItem
            key={product.name}
            product={product}
            navigation={props.navigation}
            addItemToCart={(item) => addItemToCart(item)}
            removeItemToCart={(item) => removeItemToCart(item)}
          />
        ))}
      </View>
      <View style={{paddingBottom: 20}}>{renderPagination()}</View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: BrandColors.grayBackground,
    paddingTop: 10,
    paddingBottom: 50,
    height: screenHeight - 50,
  },
  searchAndReorderArea: {
    width: screenWidth - 20,
    flexDirection: 'row',
    marginLeft: 10,
    justifyContent: 'space-between',
    alignContent: 'center',
  },
  searchView: {
    flex: 1,
    borderWidth: 1,
    borderRadius: 25,
    marginRight: 20,
    marginBottom: 10,
    flexDirection: 'row',
    justifyContent: 'center',
    height: 40,
    backgroundColor: 'white',
    alignContent: 'center',
    alignSelf: 'center',
  },
  searchInput: {
    flex: 1,
    marginHorizontal: 15,
  },
  searchIcon: {
    alignSelf: 'center',
    marginLeft: 10,
  },
  reorderOption: {
    flexDirection: 'column',
    alignItems: 'center',
    marginRight: 20,
    backgroundColor: 'white',
    borderWidth: 0.5,
    borderRadius: 10,
    marginBottom: 5,
    width: 65,
    height: 50,
  },
  reorderLabel: {
    fontSize: 14,
    marginTop: -5,
  },
  reorderOptionView: {
    flex: 0,
    width: screenWidth - 20,
    flexDirection: 'row',
    borderWidth: 0.5,
    borderRadius: 10,
    alignSelf: 'flex-end',
    marginRight: 10,
    marginBottom: 5,
    justifyContent: 'center',
    backgroundColor: 'white',
  },
  reorderNotSelectedOption: {
    borderWidth: 1,
    borderColor: BrandColors.brandActionColor,
    borderRadius: 5,
    margin: 10,
    height: 40,
    width: 100,
    alignItems: 'center',
    justifyContent: 'center',
  },
  reoderNotSelectedOptionText: {
    color: BrandColors.brandActionColor,
    fontSize: 16,
  },
  reoderSelectedOption: {
    borderColor: BrandColors.brandActionColor,
    borderRadius: 5,
    margin: 10,
    height: 40,
    width: 100,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: BrandColors.brandActionColor,
  },
  reoderSelectedOptionText: {
    color: 'white',
    fontSize: 16,
  },
  reorderCleanOption: {
    margin: 10,
    height: 40,
    width: 100,
    alignItems: 'center',
    justifyContent: 'center',
  },
  paginationContainer: {
    flexDirection: 'row',
    width: screenWidth,
    justifyContent: 'center',
  },
  actualPage: {
    borderRadius: 25,
    backgroundColor: BrandColors.brandActionColor,
    width: 30,
    height: 30,
    marginHorizontal: 5,
    justifyContent: 'center',
  },
  actualPageText: {
    color: 'white',
    alignSelf: 'center',
    fontSize: 15,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  otherPages: {
    borderRadius: 25,
    borderWidth: 0.8,
    borderColor: BrandColors.brandActionColor,
    backgroundColor: 'white',
    width: 30,
    height: 30,
    marginHorizontal: 5,
    justifyContent: 'center',
  },
  otherPagesText: {
    color: BrandColors.brandActionColor,
    alignSelf: 'center',
    fontSize: 15,
    fontWeight: 'bold',
  },
  cartItensBadge: {
    position: 'absolute',
    left: 30,
    top: -5,
    backgroundColor: 'white',
    borderWidth: 0.5,
    borderColor: BrandColors.brandActionColor,
    height: 25,
    width: 25,
  },
  cartHeadreIcon: {
    fontSize: 35,
    color: BrandColors.brandActionColor,
  },
});

export default MainScreen;
