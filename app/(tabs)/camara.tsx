import React, { useState } from 'react';
import { StyleSheet, Text, View, Button, Image, Alert } from 'react-native';
import { Camera } from 'expo-camera';
import * as ImagePicker from 'expo-image-picker';
import { postImage } from '@/apis/apiYourFace';

type Props = {};
const Camara = (props: Props) => {
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  const [imageUri, setImageUri] = useState<string | null>(null);

  const requestPermission = async () => {
    const { status } = await Camera.requestCameraPermissionsAsync();
    setHasPermission(status === 'granted');
  };

  const openCamera = async () => {
    if (hasPermission === null) {
      await requestPermission();
    }
    if (hasPermission === false) {
      Alert.alert('Error', 'Se requiere permiso para acceder a la cámara');
      return;
    }

    const result = await ImagePicker.launchCameraAsync({
      mediaTypes: ['images'],
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImageUri(result.assets[0].uri);
    }
  };

  const sendImage = async () => {
    if (!imageUri) {
      Alert.alert('Error', 'No hay imagen seleccionada para enviar');
      return;
    }
    try {
      const response = await postImage(imageUri);
      Alert.alert('Éxito', 'Imagen enviada correctamente');
      console.log('Respuesta de la API:', response);
    } catch (error) {
      Alert.alert('Error', 'No se pudo enviar la imagen');
      console.error('Error al enviar la imagen:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Camara</Text>
      <Button title="Abrir Cámara" onPress={openCamera} />
      {imageUri && (
        <>
          <Image source={{ uri: imageUri }} style={styles.preview} />
          <Button title="Enviar Imagen" onPress={sendImage} />
        </>
      )}
    </View>
  );
};

export default Camara;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  title: {
    fontSize: 20,
    marginBottom: 16,
  },
  preview: {
    width: 200,
    height: 200,
    marginVertical: 16,
    borderRadius: 10,
  },
});
