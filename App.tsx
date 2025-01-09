import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'; // Para Bottom Tabs
import WelcomeScreen from './src/screens/WelcomeScreen';
import ProductosScreen from './src/screens/ProductosScreen';
import AddProductsScreen from './src/screens/AddProductsScreen';
import ApiScreen from './src/screens/ApiScreen';
import EditProductsScreen from './src/screens/EditProductsScreen';
import ProductsListScreen from './src/screens/ProductListScreen';

const Stack = createNativeStackNavigator();
const BottomTabs = createBottomTabNavigator();

// Bottom Tab Navigator
function BottomTabNavigator() {
  return (
    <BottomTabs.Navigator>
      <BottomTabs.Screen name="Productos" component={ProductosScreen} />
      <BottomTabs.Screen name="AgregarProductos" component={AddProductsScreen} />
      <BottomTabs.Screen name="ListaApi" component={ApiScreen} />
    </BottomTabs.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Welcome">
        <Stack.Screen name="Welcome" component={WelcomeScreen} />
        <Stack.Screen
          name="BottomTabs"
          component={BottomTabNavigator} // Cambia a TopTabNavigator si lo prefieres
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
