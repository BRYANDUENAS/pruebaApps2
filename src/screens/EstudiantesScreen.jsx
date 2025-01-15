import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Card } from 'react-native'; 
import { getFirestore, collection, getDocs } from 'firebase/firestore'; 
import { app } from '../firebase/credenciales'; 

export default function EstudiantesScreen() {
  const [students, setStudents] = useState([]);

  useEffect(() => {
    const fetchStudents = async () => {
      const db = getFirestore(app); // Inicializa Firestore
      const studentsCollection = collection(db, 'students'); // Colección de estudiantes
      const studentsSnapshot = await getDocs(studentsCollection); // Obtener todos los documentos
      const studentsList = studentsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })); // Mapear los documentos a un array
      setStudents(studentsList); // Actualizar el estado con los estudiantes
    };

    fetchStudents(); // Llamar la función al cargar el componente
  }, []); // El array vacío significa que solo se ejecutará una vez al montar el componente

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Estudiantes Registrados</Text>

      {students.length > 0 ? (
        students.map((student) => (
          <View key={student.id} style={styles.card}>
            <Text style={styles.cardTitle}>{student.nombreEstudiante}</Text>
            <Text>Cédula: {student.cedula}</Text>
            <Text>Edad: {student.edad}</Text>
            <Text>Curso: {student.curso}</Text>
          </View>
        ))
      ) : (
        <Text>No hay estudiantes registrados.</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f8f9fa',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
  },
  card: {
    backgroundColor: '#fff',
    padding: 15,
    marginVertical: 10,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3, // Para Android
    width: '100%',
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
});
