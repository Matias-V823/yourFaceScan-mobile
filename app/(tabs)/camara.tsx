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

