export default class ProductsService {
  static getProducts() {
    return fetch('https://davisena.github.io/assets/products/products.json', {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((json) => {
        return json.products;
      })
      .catch((error) => {
        console.log(error);
        return [];
      });
  }
}
