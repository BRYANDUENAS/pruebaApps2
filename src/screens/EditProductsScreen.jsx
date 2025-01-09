import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, Alert } from 'react-native';
import { getDatabase, ref, get, update, remove } from 'firebase/database';
import { useNavigation } from '@react-navigation/native';
import app from '../firebase/credenciales'; // Importa tu configuración de Firebase

const EditProductsScreen = ({ route }) => {
    const [product, setProduct] = useState({
        titulo: '',
        plataforma: '',
        genero: '',
        descripcion: '',
        precio: '',
    });
    const [message, setMessage] = useState('');
    const navigation = useNavigation();

    const { productId } = route.params; // Acceder al productId desde route.params

    // Obtener el producto de Firebase
    useEffect(() => {
        const getProduct = async () => {
            const dbRef = ref(getDatabase(app), 'productos/' + productId);
            const snapshot = await get(dbRef);
            if (snapshot.exists()) {
                setProduct(snapshot.val());
            } else {
                console.log('No product data available');
            }
        };
        getProduct();
    }, [productId]);

    // Editar producto en Firebase
    const handleEdit = async () => {
        const dbRef = ref(getDatabase(app), 'productos/' + productId);
        await update(dbRef, {
            titulo: product.titulo,
            plataforma: product.plataforma,
            genero: product.genero,
            descripcion: product.descripcion,
            precio: product.precio,
        }).then(() => {
            setMessage('Producto editado exitosamente');
            setTimeout(() => {
                setMessage('');
                navigation.goBack();
            }, 2000);
        });
    };

    // Eliminar producto en Firebase
    const handleDelete = () => {
        Alert.alert(
            'Confirmación',
            '¿Estás seguro de que deseas eliminar este producto?',
            [
                {
                    text: 'Cancelar',
                    style: 'cancel',
                },
                {
                    text: 'Eliminar',
                    onPress: async () => {
                        const dbRef = ref(getDatabase(app), 'productos/' + productId);
                        await remove(dbRef)
                            .then(() => {
                                setMessage('Producto eliminado exitosamente');
                                setTimeout(() => {
                                    setMessage('');
                                    navigation.goBack();
                                }, 2000);
                            })
                            .catch((error) => {
                                console.error(error);
                                setMessage('Hubo un error al eliminar el producto');
                            });
                    },
                },
            ]
        );
    };

    return (
        <View style={{ flex: 1, padding: 20 }}>
            <Text>Editar Producto</Text>
            {message ? <Text style={{ color: 'green', marginBottom: 10 }}>{message}</Text> : null}
            
            <TextInput
                placeholder="Título"
                value={product.titulo}
                onChangeText={(text) => setProduct({ ...product, titulo: text })}
                style={{ borderWidth: 1, marginBottom: 10, padding: 10 }}
            />
            <TextInput
                placeholder="Plataforma"
                value={product.plataforma}
                onChangeText={(text) => setProduct({ ...product, plataforma: text })}
                style={{ borderWidth: 1, marginBottom: 10, padding: 10 }}
            />
            <TextInput
                placeholder="Género"
                value={product.genero}
                onChangeText={(text) => setProduct({ ...product, genero: text })}
                style={{ borderWidth: 1, marginBottom: 10, padding: 10 }}
            />
            <TextInput
                placeholder="Descripción"
                value={product.descripcion}
                onChangeText={(text) => setProduct({ ...product, descripcion: text })}
                style={{ borderWidth: 1, marginBottom: 10, padding: 10 }}
            />
            <TextInput
                placeholder="Precio"
                value={product.precio}
                onChangeText={(text) => setProduct({ ...product, precio: text })}
                style={{ borderWidth: 1, marginBottom: 20, padding: 10 }}
            />

            <Button title="Guardar Cambios" onPress={handleEdit} />
            <Button title="Eliminar Producto" color="red" onPress={handleDelete} />
        </View>
    );
};

export default EditProductsScreen;
