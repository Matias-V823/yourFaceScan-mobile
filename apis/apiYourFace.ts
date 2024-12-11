import AsyncStorage from '@react-native-async-storage/async-storage';

const apiUrl = process.env.EXPO_PUBLIC_API_URL;

// Función para obtener el token de acceso
export const getAccessToken = async (): Promise<string | null> => {
  try {
    const token = await AsyncStorage.getItem('access');
    return token;
  } catch (error) {
    console.error('Error al obtener el token de acceso:', error);
    return null;
  }
};

// Función de inicio de sesión
export const getLogin = async (username: string, password: string) => {
  try {
    const response = await fetch(`${apiUrl}/api/auth/token/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    console.log('Datos recibidos de la API al iniciar sesión:', data); 

    if (data.access) {
      await AsyncStorage.setItem('access', data.access);
      console.log('Token guardado en AsyncStorage:', data.access); 

    }

    return data;
  } catch (error) {
    console.error('Error en getLogin:', error);
    throw error;
  }
};

// Función para enviar una imagen
export const postImage = async (imageUri: string) => {
  try {
    const accessToken = await getAccessToken();
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

// Función para obtener el perfil del usuario
export const getProfile = async () => {
  try {
    const accessToken = await getAccessToken();
    if (!accessToken) {
      throw new Error('No se encontró el token de acceso.');
    }

    const response = await fetch(`${apiUrl}/api/users/me/`, {
      method: 'GET',
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
