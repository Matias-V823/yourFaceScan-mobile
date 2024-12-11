import AsyncStorage from '@react-native-async-storage/async-storage';

const apiUrl = process.env.EXPO_PUBLIC_API_URL;

export const getLogin = async (username: string, password: string) => {
  try {
    const response = await fetch(`${apiUrl}/api/auth/token/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password }),
    });

    // Valida que la respuesta sea válida
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    // Asegúrate de que la respuesta sea JSON
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error en getLogin:', error);
    throw error;
  }
};

export const postImage = async (imageUri: string) => {
  try {
    const accessToken = await AsyncStorage.getItem('accessToken');
    if (!accessToken) {
      throw new Error('No se encontró el token de acceso.');
    }

    const formData = new FormData();
    formData.append('image', {
      uri: imageUri,
      type: 'image/jpeg',
      name: 'image.jpg',
    } as unknown as Blob);

    const response = await fetch(`${apiUrl}/api/recognition/`, {
      method: 'POST',
      body: formData,
      headers: {
        'Accept': 'application/json',
        'Authorization': `Bearer ${accessToken}`,
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    console.log('Respuesta del servidor:', data);
    return data;
  } catch (error) {
    console.error('Error al enviar la imagen:', error);
    throw error;
  }
};

export const getProfile = async () => {
  try {
    const accessToken = await AsyncStorage.getItem('accessToken');
    if (!accessToken) {
      throw new Error('No se encontró el token de acceso.');
    }

    const response = await fetch(`${apiUrl}/api/users/me/`, {
      method: 'GET', // Cambié el método a GET porque típicamente "me" es una consulta
      headers: {
        'Accept': 'application/json',
        'Authorization': `Bearer ${accessToken}`,
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    console.log('Respuesta del servidor:', data);
    return data;
  } catch (error) {
    console.error('Error al consultar datos usuario:', error);
    throw error;
  }
};
