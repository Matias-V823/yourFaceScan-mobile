import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  Alert,
  Modal,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Camera } from 'expo-camera';
import * as ImagePicker from 'expo-image-picker';
import Colors from '@/constants/Colors';
import { useColorScheme } from 'react-native';
import { postImage } from '@/apis/apiYourFace';

const Camara = () => {
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  const [imageUri, setImageUri] = useState<string | null>(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalMessage, setModalMessage] = useState<string>('');

  const colorScheme = useColorScheme();
  const theme = Colors[colorScheme || 'light'];

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
      setModalMessage('Imagen enviada correctamente. Respuesta de la API: ' + JSON.stringify(response));
      setModalVisible(true);
    } catch (error) {
      setModalMessage('Error al enviar la imagen: ' + error.message);
      setModalVisible(true);
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      {/* Título */}
      <Text style={[styles.title, { color: theme.text }]}>Cámara</Text>

      {/* Botón de Cámara */}
      <TouchableOpacity
        style={[styles.button, { backgroundColor: theme.tint }]}
        onPress={openCamera}
      >
        <Ionicons name="camera" size={20} color={theme.background} style={styles.icon} />
        <Text style={[styles.buttonText, { color: theme.background }]}>Abrir Cámara</Text>
      </TouchableOpacity>

      {/* Imagen Capturada */}
      {imageUri && (
        <View style={styles.imageContainer}>
          <Image source={{ uri: imageUri }} style={styles.preview} />
          <TouchableOpacity
            style={[styles.button, { backgroundColor: theme.tint }]}
            onPress={sendImage}
          >
            <Ionicons name="send" size={20} color={theme.background} style={styles.icon} />
            <Text style={[styles.buttonText, { color: theme.background }]}>Enviar Imagen</Text>
          </TouchableOpacity>
        </View>
      )}

      {/* Modal de Mensaje */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(!modalVisible)}
      >
        <View style={styles.modalBackground}>
          <View style={[styles.modalContent, { backgroundColor: theme.newsButtonBackground }]}>
            <Text style={[styles.modalText, { color: theme.text }]}>{modalMessage}</Text>
            <TouchableOpacity
              style={[styles.buttonClose, { backgroundColor: theme.tint }]}
              onPress={() => setModalVisible(!modalVisible)}
            >
              <Text style={[styles.buttonCloseText, { color: theme.background }]}>Cerrar</Text>
            </TouchableOpacity>
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
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 10,
    marginVertical: 10,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 10,
  },
  icon: {
    marginRight: 5,
  },
  imageContainer: {
    marginVertical: 20,
    alignItems: 'center',
  },
  preview: {
    width: 250,
    height: 250,
    borderRadius: 10,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#CCC',
  },
  modalBackground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: '80%',
    padding: 20,
    borderRadius: 15,
    alignItems: 'center',
  },
  modalText: {
    fontSize: 16,
    marginBottom: 20,
    textAlign: 'center',
  },
  buttonClose: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
  },
  buttonCloseText: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
