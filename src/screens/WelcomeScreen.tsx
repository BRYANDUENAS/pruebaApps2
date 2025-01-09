import React from 'react';
import { View, Text, Button, StyleSheet, ImageBackground } from 'react-native';

export default function WelcomeScreen({ navigation }: any) {
  return (
    <ImageBackground
      source={require('../../assets/logoreact.jpeg')} // Ruta de la imagen en la carpeta assets
      style={styles.container}
      resizeMode="cover" 
    >
      <Text style={styles.text}>¡Bienvenido!</Text>
      <Button
        title="Entrar"
        onPress={() => navigation.navigate('BottomTabs')} // Cambia a 'TopTabs' si usas el TopTabNavigator
      />
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 20,
    marginBottom: 20,
    color: '#fff', // El color blanco es mejor para resaltar sobre imágenes oscuras
  },
});
