import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TextInput, Button, Alert, StyleSheet } from 'react-native';
import { getFirestore, collection, doc, getDoc, getDocs } from 'firebase/firestore';
import Informacion from '../components/informacion'; // Componente funcional para renderizar los elementos
import app from '../firebase/credenciales';

const db = getFirestore(app);

// Interfaz opcional para el producto (puedes ajustar según tus datos en Firestore)
interface Product {
  name: string;
  price: number;
  description: string;
  [key: string]: any; // Si hay otros campos opcionales
}

export default function ProductListScreen() {
  const [productId, setProductId] = useState('');
  const [productInfo, setProductInfo] = useState<Product | null>(null); // Ajusta el tipo aquí
  const [productsList, setProductsList] = useState<Product[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null); // Estado para producto seleccionado

  // Obtener todos los productos (solo un campo de cada registro, por ejemplo, el nombre)
  const fetchProductsList = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, 'productos'));
      const data = querySnapshot.docs.map(doc => ({
        id: doc.id,
        name: doc.data().name, // Solo se toma el campo "name"
        price: doc.data().price, // Incluye otros campos necesarios
        description: doc.data().description, // Incluye otros campos necesarios
      })) as Product[];
      setProductsList(data);
    } catch (error) {
      console.error('Error al obtener la lista de productos:', error);
      Alert.alert('Error', 'Hubo un problema al obtener la lista de productos.');
    }
  };

  const navigation = useNavigation();

  const handleEditPress = (productId) => {
      // Navegar a la pantalla de edición y pasar el productId
      navigation.navigate('EditProductsScreen', { productId });
  };

  useEffect(() => {
    fetchProductsList(); // Cargar la lista de productos al cargar la pantalla
  }, []);

  return (
    <View style={styles.container}>
      {/* Sección 2: Lista de productos */}
      <Text style={styles.title}>Lista de Productos</Text>
      <FlatList
        data={productsList}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Informacion product={item} onPress={() => handleEditPress(item.id)} // Pasar el productId />
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f9f9f9',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 15,
    backgroundColor: '#fff',
  },
  productInfo: {
    padding: 10,
    backgroundColor: '#e0f7fa',
    borderRadius: 8,
    marginBottom: 20,
  },
  infoText: {
    fontSize: 16,
    color: '#333',
  },
  selectedProductInfo: {
    marginTop: 20,
    padding: 10,
    backgroundColor: '#e0f7fa',
    borderRadius: 8,
  },
});

