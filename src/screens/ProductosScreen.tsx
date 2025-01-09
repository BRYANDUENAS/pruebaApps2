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

export default function ProductsScreen() {
  const [productId, setProductId] = useState('');
  const [productInfo, setProductInfo] = useState<Product | null>(null); // Ajusta el tipo aquí
  const [productsList, setProductsList] = useState<Product[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null); // Estado para producto seleccionado

  // Obtener un solo producto por ID
  const fetchProductById = async () => {
    if (!productId) {
      Alert.alert('Error', 'Por favor ingresa un ID.');
      return;
    }

    try {
      const docRef = doc(db, 'productos', productId);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        setProductInfo(docSnap.data() as Product); // Asegúrate de tipar los datos
      } else {
        Alert.alert('Error', 'No se encontró ningún producto con este ID.');
      }
    } catch (error) {
      console.error('Error al obtener el producto:', error);
      Alert.alert('Error', 'Hubo un problema al obtener el producto.');
    }
  };

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

  // Mostrar alerta con más información
  const handlePress = (item: Product) => {
    setSelectedProduct(item); // Al seleccionar un item, guardar su información en el estado
  };

  useEffect(() => {
    fetchProductsList(); // Cargar la lista de productos al cargar la pantalla
  }, []);

  return (
    <View style={styles.container}>
      {/* Sección 1: Buscar producto por ID */}
      <Text style={styles.title}>Buscar Producto por ID</Text>
      <TextInput
        style={styles.input}
        placeholder="Ingresa el ID del producto"
        value={productId}
        onChangeText={setProductId}
      />
      <Button title="Buscar Producto" onPress={fetchProductById} />
      {productInfo && (
        <View style={styles.productInfo}>
          <Text style={styles.infoText}>Nombre: {productInfo.name}</Text>
          <Text style={styles.infoText}>Precio: ${productInfo.price}</Text>
          <Text style={styles.infoText}>Descripción: {productInfo.description}</Text>
        </View>
      )}

      {/* Sección 2: Lista de productos */}
      <Text style={styles.title}>Lista de Productos</Text>
      <FlatList
        data={productsList}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Informacion product={item} onPress={() => handlePress(item)} />
        )}
      />

      {/* Mostrar información del producto seleccionado */}
      {selectedProduct && (
        <View style={styles.selectedProductInfo}>          
          <Text style={styles.infoText}>ID: {selectedProduct.id}</Text>
          <Text style={styles.infoText}>Nombre: {selectedProduct.name}</Text>
          <Text style={styles.infoText}>Precio: ${selectedProduct.price}</Text>
          <Text style={styles.infoText}>Descripción: {selectedProduct.description}</Text>
        </View>
      )}
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
