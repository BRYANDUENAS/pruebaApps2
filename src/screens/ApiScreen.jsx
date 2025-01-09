import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, Image, StyleSheet } from 'react-native';

const ApiScreen = () => {
  const [videojuegos, setVideojuegos] = useState([]);

  useEffect(() => {
    // Fetching data from the API
    fetch('https://jritsqmet.github.io/web-api/video_juegos.json')
      .then(response => response.json())
      .then(data => {
        setVideojuegos(data.videojuegos);
      })
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <Image source={{ uri: item.imagen }} style={styles.image} />
      <Text style={styles.title}>{item.titulo}</Text>
      <Text style={styles.description}>{item.descripcion}</Text>
      <Text style={styles.text}>Plataformas: {item.plataforma.join(', ')}</Text>
      <Text style={styles.text}>Géneros: {item.genero.join(', ')}</Text>
      <Text style={styles.text}>Precio: ${item.precio}</Text>
      <Text style={styles.text}>Lanzamiento: {item.lanzamiento}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={videojuegos}
        renderItem={renderItem}
        keyExtractor={(item) => item.titulo}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  card: {
    backgroundColor: '#fff',
    marginBottom: 20,
    borderRadius: 8,
    padding: 15,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
  },
  image: {
    width: '100%',
    height: 200,
    borderRadius: 8,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 10,
  },
  description: {
    fontSize: 14,
    color: '#555',
    marginTop: 5,
  },
  text: {
    fontSize: 12,
    color: '#333',
    marginTop: 3,
  },
});

export default ApiScreen;
