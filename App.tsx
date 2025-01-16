import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'; // Para Bottom Tabs
import WelcomeScreen from './src/screens/WelcomeScreen';
import ProductosScreen from './src/screens/ProductosScreen';
import LoginScreen from './src/screens/LoginScreen';
import RegisterScreen from './src/screens/RegisterScreen';
import PlayScreen from './src/screens/PlayScreen';
import PerfilScreen from './src/screens/PerfilScreen';

const Stack = createNativeStackNavigator();
const BottomTabs = createBottomTabNavigator();

// Bottom Tab Navigator
function BottomTabNavigator() {
  return (
    <BottomTabs.Navigator>
      <BottomTabs.Screen name="Productos" component={ProductosScreen} />
    </BottomTabs.Navigator>
  );
}


export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="WelcomeScreen">
      <Stack.Screen name="WelcomeScreen" component={WelcomeScreen} options={{ headerShown: false }} />
      <Stack.Screen name="LoginScreen" component={LoginScreen} />
      <Stack.Screen name="RegisterScreen" component={RegisterScreen} />  
      <Stack.Screen name="PlayScreen" component={PlayScreen} />  
      <Stack.Screen name="PerfilScreen" component={PerfilScreen} />

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
