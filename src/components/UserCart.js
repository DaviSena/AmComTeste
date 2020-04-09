import AsyncStorage from '@react-native-community/async-storage';

let cartItens = [];
const STORE_CART_KEY = 'STORE_CART_KEY';
const USERID = '1';

class UserCart {
  static get cartItens() {
    return cartItens;
  }

  static async init() {
    cartItens = (await UserCart.getData()) || [];
  }

  static addProduct(product) {
    if (cartItens && !cartItens.some((item) => item.name === product.name)) {
      cartItens.push(product);
      UserCart.storeData(cartItens);
      return true;
    }
    return false;
  }

  static removeProduct(product) {
    cartItens = cartItens.filter((item) => item.name !== product.name);
    UserCart.storeData(cartItens);
  }

  static clearUserCart() {
    cartItens = [];
  }

  static isProductInCart(productName) {
    if (cartItens) {
      return cartItens.some((item) => item.name === productName);
    }

    return false;
  }

  static getUserCartAmount() {
    if (cartItens) {
      return cartItens.reduce(
        (a, b) =>
          a +
          parseFloat(
            b?.discount?.replace('R$', '').replace(',', '.') ||
              b.price.replace('R$', '').replace(',', '.'),
          ),
        0,
      );
    } else {
      return 0;
    }
  }

  static storeData = async (itensToStore) => {
    try {
      await AsyncStorage.setItem(
        STORE_CART_KEY + USERID,
        JSON.stringify(itensToStore),
      );
    } catch (e) {}
  };

  static getData = async () => {
    try {
      const value = await AsyncStorage.getItem(STORE_CART_KEY + USERID);
      if (value !== null) {
        return JSON.parse(value);
      } else {
        return [];
      }
    } catch (e) {
      console.log(e);
    }
  };
}

export default UserCart;
