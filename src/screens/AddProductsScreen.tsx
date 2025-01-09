// Importa las funciones necesarias de Firebase
import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert, Modal, TouchableOpacity } from 'react-native';
import { getFirestore, collection, addDoc } from 'firebase/firestore';
import app from '../firebase/credenciales';


const db = getFirestore(app);

export default function AddProductsScreen() {
  const [productName, setProductName] = useState('');
  const [productCategory, setProductCategory] = useState('');
  const [productPrice, setProductPrice] = useState('');
  const [productDescription, setProductDescription] = useState('');
  const [isModalVisible, setIsModalVisible] = useState(false);

  const handleAddProduct = async () => {
    if (productName && productCategory && productPrice && productDescription) {
      try {
        // Agregar el producto a la colección "productos" en Firestore
        await addDoc(collection(db, 'productos'), {
          name: productName,
          category: productCategory,
          price: parseFloat(productPrice), // Convertir precio a número
          description: productDescription,
          createdAt: new Date() // Añadir fecha de creación
        });

        console.log(`Producto agregado: El producto "${productName}" se registró exitosamente.`);
        
        // Mostrar modal
        setIsModalVisible(true);

        // Limpiar los campos
        setProductName('');
        setProductCategory('');
        setProductPrice('');
        setProductDescription('');
      } catch (error) {
        console.error('Error al agregar el producto:', error);
        Alert.alert('Error', 'No se pudo registrar el producto. Intente nuevamente.');
      }
    } else {
      Alert.alert('Error', 'Por favor, complete todos los campos.');
    }
  };

  const closeModal = () => {
    setIsModalVisible(false);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Agregar Producto Tecnológico</Text>
      <TextInput
        style={styles.input}
        placeholder="Nombre del producto"
        value={productName}
        onChangeText={setProductName}
      />
      <TextInput
        style={styles.input}
        placeholder="Categoría"
        value={productCategory}
        onChangeText={setProductCategory}
      />
      <TextInput
        style={styles.input}
        placeholder="Precio"
        value={productPrice}
        onChangeText={setProductPrice}
        keyboardType="numeric"
      />
      <TextInput
        style={styles.input}
        placeholder="Descripción"
        value={productDescription}
        onChangeText={setProductDescription}
        multiline
      />
      <Button title="Registrar Producto" onPress={handleAddProduct} />

      {/* Modal */}
      <Modal
        visible={isModalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={closeModal}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalText}>¡Tu producto se agregó con éxito!</Text>
            <TouchableOpacity style={styles.closeButton} onPress={closeModal}>
              <Text style={styles.closeButtonText}>Cerrar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
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
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#333',
  },
  input: {
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 15,
    backgroundColor: '#fff',
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContainer: {
    width: 300,
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: 10,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  modalText: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  closeButton: {
    backgroundColor: '#2196F3',
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  closeButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
