import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import { getFirestore, doc, setDoc } from 'firebase/firestore';
import { app } from '../firebase/credenciales';

export default function RegisterScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [phone, setPhone] = useState('');

  const handleRegister = async () => {
    if (!email || !password || !username || !phone) {
      Alert.alert('Error', 'Por favor, completa todos los campos.');
      return;
    }

    if (password.length < 6) {
      Alert.alert('Error', 'La contraseña debe tener al menos 6 caracteres.');
      return;
    }

    const auth = getAuth(app);
    const db = getFirestore(app);

    try {
      // Registra al usuario en Firebase Authentication
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Crea un documento con los datos del usuario en Firestore
      await setDoc(doc(db, 'users', user.uid), {
        username: username,
        email: email,
        phone: phone,
        score: 0, // Puntaje inicial
      });

      Alert.alert('Registro exitoso', `¡Bienvenido, ${username}!`);
    } catch (error: any) {
      let errorMessage = 'Error al registrar usuario.';
      if (error.code === 'auth/email-already-in-use') {
        errorMessage = 'Este correo ya está en uso.';
      } else if (error.code === 'auth/invalid-email') {
        errorMessage = 'El correo electrónico no es válido.';
      } else if (error.code === 'auth/weak-password') {
        errorMessage = 'La contraseña es demasiado débil.';
      }
      Alert.alert('Error', errorMessage);
      console.error('Error:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Registro</Text>

      <TextInput
        style={styles.input}
        placeholder="Correo Electrónico"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />

      <TextInput
        style={styles.input}
        placeholder="Contraseña"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />

      <TextInput
        style={styles.input}
        placeholder="Usuario"
        value={username}
        onChangeText={setUsername}
      />

      <TextInput
        style={styles.input}
        placeholder="Teléfono"
        value={phone}
        onChangeText={setPhone}
        keyboardType="phone-pad"
      />

      <Button title="Registrarse" onPress={handleRegister} />
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
