import React, { useEffect, useState } from 'react';
import { getAuth } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../firebase/credenciales';

export default function PerfilScreen() {
  const [userData, setUserData] = useState({ username: '', email: '', score: 0 });
  const auth = getAuth();

  useEffect(() => {
    const fetchUserData = async () => {
      const user = auth.currentUser;
      if (user) {
        try {
          // Obtén los datos del usuario desde Firestore
          const userDoc = doc(db, 'users', user.uid);
          const docSnapshot = await getDoc(userDoc);
          if (docSnapshot.exists()) {
            const data = docSnapshot.data();
            setUserData({
              username: data.username || 'Usuario sin nombre',
              email: data.email || 'Correo no disponible',
              score: data.score || 0,
            });
          } else {
            console.log('No se encontraron datos para este usuario.');
          }
        } catch (error) {
          console.error('Error al obtener los datos del usuario:', error);
        }
      }
    };

    fetchUserData();
  }, [userData]);

  return (
    <div>
      <h1>Perfil del Usuario</h1>
      <p><strong>Nombre:</strong> {userData.username}</p>
      <p><strong>Correo:</strong> {userData.email}</p>
      <p><strong>Puntaje más reciente:</strong> {userData.score}</p>
    </div>
  );
}
