import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import { getFirestore, collection, addDoc } from 'firebase/firestore'; // Importa Firestore
import { getAuth } from 'firebase/auth'; // Para obtener el usuario autenticado si lo necesitas
import { app } from '../firebase/credenciales'; // Tu configuración de Firebase

export default function OperacionesScreen({ navigation }: any) {
  const [cedula, setCedula] = useState('');
  const [nombreEstudiante, setNombreEstudiante] = useState('');
  const [edad, setEdad] = useState('');
  const [curso, setCurso] = useState('');

  const handleSave = async () => {
    if (cedula && nombreEstudiante && edad && curso) {
      try {
        const db = getFirestore(app); // Inicializa Firestore
        const studentsCollection = collection(db, 'students'); // Crea referencia a la colección 'students'

        // Agregar el documento con los datos del estudiante
        await addDoc(studentsCollection, {
          cedula,
          nombreEstudiante,
          edad,
          curso,
          createdAt: new Date(), // Agregar un campo de fecha
        });

        console.log(`Datos guardados Estudiante: ${nombreEstudiante}`);
        // Limpiar los campos después de guardar
        setCedula('');
        setNombreEstudiante('');
        setEdad('');
        setCurso('');
        navigation.navigate('EstudiantesScreen');
      } catch (error) {
        console.error('Error al guardar los datos: ', error);
        Alert.alert('Error', 'Hubo un problema al guardar los datos.');
      }
    } else {
        console.log('Por favor, completa todos los campos.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Operaciones</Text>

      <TextInput
        style={styles.input}
        placeholder="Cédula"
        value={cedula}
        onChangeText={setCedula}
        keyboardType="numeric"
      />

      <TextInput
        style={styles.input}
        placeholder="Nombre Estudiante"
        value={nombreEstudiante}
        onChangeText={setNombreEstudiante}
      />

      <TextInput
        style={styles.input}
        placeholder="Edad"
        value={edad}
        onChangeText={setEdad}
        keyboardType="numeric"
      />

      <TextInput
        style={styles.input}
        placeholder="Curso"
        value={curso}
        onChangeText={setCurso}
      />

      <Button title="Guardar" onPress={handleSave} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f8f9fa',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
  },
  input: {
    width: '80%',
    padding: 10,
    marginVertical: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    backgroundColor: '#fff',
  },
});
