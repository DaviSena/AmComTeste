import React from 'react';
import 'react-native-gesture-handler';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {StyleSheet, StatusBar} from 'react-native';
import MainScreen from './src/scenes/MainScreen';
import ProductDetail from './src/scenes/ProductDetail';
import CartDetail from './src/scenes/CartDetail';
import UserCart from './src/components/UserCart';

const App: () => React$Node = () => {
  const Stack = createStackNavigator();
  UserCart.init();
  return (
    <SafeAreaProvider>
      <StatusBar backgroundColor={'white'} barStyle={'dark-content'} />
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Home">
          <Stack.Screen
            name="Home"
            options={{title: ''}}
            component={MainScreen}
          />
          <Stack.Screen
            name="Detail"
            options={({route}) => ({
              title: route.params.product.name,
              headerTitleAlign: 'center',
            })}
            component={ProductDetail}
          />
          <Stack.Screen
            name="Cart"
            options={({route}) => ({
              title: 'Seu Carrinho',
              headerTitleAlign: 'center',
            })}
            component={CartDetail}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: 'white',
  },
});

export default App;
