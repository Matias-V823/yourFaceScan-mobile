<<<<<<< HEAD
import React, { useState } from 'react';
import { 
  StyleSheet, 
  Text, 
  View, 
  Button, 
  Image, 
  Alert, 
  Modal, 
  Pressable 
} from 'react-native';
import { Camera } from 'expo-camera';
import * as ImagePicker from 'expo-image-picker';
import { postImage } from '@/apis/apiYourFace';

type Props = {};
const Camara = (props: Props) => {
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  const [imageUri, setImageUri] = useState<string | null>(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalMessage, setModalMessage] = useState<string>('');

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
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
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
      // Aquí puedes adaptar el mensaje según la respuesta de tu API
      setModalMessage('Imagen enviada correctamente. Respuesta de la API: ' + JSON.stringify(response));
      setModalVisible(true);
    } catch (error) {
      setModalMessage('Error al enviar la imagen: ' + error.message);
      setModalVisible(true);
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

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.modalBackground}>
          <View style={styles.modalContent}>
            <Text style={{ marginBottom: 20 }}>{modalMessage}</Text>
            <Pressable
              style={styles.buttonClose}
              onPress={() => setModalVisible(!modalVisible)}
            >
              <Text style={{ color: 'white' }}>Cerrar</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
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
  modalBackground: {
    flex: 1,
    justifyContent: 'center', 
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)'
  },
  modalContent: {
    backgroundColor: 'white', 
    padding: 20,
    borderRadius: 10,
    width: '80%',
    alignItems: 'center'
  },
  buttonClose: {
    backgroundColor: '#2196F3',
    padding: 10,
    borderRadius: 5,
  },
});
=======
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image, Alert, ActivityIndicator } from 'react-native';
import { Camera } from 'expo-camera';
import * as ImagePicker from 'expo-image-picker';
import { postImage } from '@/apis/apiYourFace';

const Camara = () => {
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  const [imageUri, setImageUri] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const requestPermission = async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === 'granted');
    };
    requestPermission();
  }, []);

  const openCamera = async () => {
    if (hasPermission === false) {
      Alert.alert('Permiso denegado', 'Se requiere permiso para acceder a la cámara');
      return;
    }

    try {
      const result = await ImagePicker.launchCameraAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });

      if (!result.canceled) {
        setImageUri(result.assets[0].uri);
      }
    } catch (error) {
      Alert.alert('Error', 'No se pudo abrir la cámara');
      console.error('Error al abrir la cámara:', error);
    }
  };

  const sendImage = async () => {
    if (!imageUri) {
      Alert.alert('Error', 'No hay imagen seleccionada para enviar');
      return;
    }

    setIsLoading(true);
    try {
      const response = await postImage(imageUri);
      Alert.alert('Éxito', 'Imagen enviada correctamente');
      console.log('Respuesta de la API:', response);
    } catch (error) {
      Alert.alert('Error', 'No se pudo enviar la imagen');
      console.error('Error al enviar la imagen:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Cámara</Text>
      <TouchableOpacity style={styles.button} onPress={openCamera}>
        <Text style={styles.buttonText}>Abrir Cámara</Text>
      </TouchableOpacity>
      {imageUri && (
        <View style={styles.imageContainer}>
          <Image source={{ uri: imageUri }} style={styles.preview} />
          <TouchableOpacity style={styles.button} onPress={sendImage}>
            <Text style={styles.buttonText}>Enviar Imagen</Text>
          </TouchableOpacity>
        </View>
      )}
      {isLoading && <ActivityIndicator size="large" color="#6200ea" />}
    </View>
  );
};

export default Camara;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#f9f9f9',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 24,
  },
  button: {
    backgroundColor: '#6200ea',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
    marginVertical: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  imageContainer: {
    alignItems: 'center',
    marginTop: 20,
  },
  preview: {
    width: 250,
    height: 250,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#6200ea',
    marginBottom: 16,
  },
});
>>>>>>> 24f8dd32577795d638d96cf04eededdd353027bb
