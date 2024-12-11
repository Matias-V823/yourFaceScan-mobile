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
  const [analysisResult, setAnalysisResult] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

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
      aspect: [1, 1], // Forzar recorte cuadrado
      quality: 1,
    });

    if (!result.canceled) {
      setImageUri(result.assets[0].uri);
    }
  };

  const analyzeImage = async () => {
    if (!imageUri) {
      Alert.alert('Error', 'No hay imagen seleccionada para analizar');
      return;
    }
    setLoading(true);
    try {
      const response = await postImage(imageUri);
      setAnalysisResult(response.result || 'Análisis completo.');
    } catch (error) {
      setAnalysisResult('Error al analizar la imagen.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      {/* Encabezado */}
      <View style={styles.header}>
        <Ionicons name="camera-outline" size={28} color={theme.tint} />
        <Text style={[styles.title, { color: theme.tint }]}>Escaneo Facial</Text>
      </View>

      {/* Contenedor de Cámara */}
      <View style={styles.cameraContainer}>
        {imageUri ? (
          <Image source={{ uri: imageUri }} style={styles.preview} />
        ) : (
          <View style={styles.placeholder} />
        )}
      </View>

      {/* Botón Escanear */}
      <TouchableOpacity
        style={[styles.scanButton, { backgroundColor: theme.tint }]}
        onPress={openCamera}
      >
        <Text style={[styles.scanButtonText, { color: theme.background }]}>
          Escanear
        </Text>
      </TouchableOpacity>

      {/* Resultado */}
      <View style={[styles.resultContainer, { borderColor: theme.buttonBorder }]}>
        {loading ? (
          <Text style={[styles.resultText, { color: theme.text }]}>
            Analizando imagen...
          </Text>
        ) : analysisResult ? (
          <Text style={[styles.resultText, { color: theme.text }]}>
            {analysisResult}
          </Text>
        ) : (
          <Text style={[styles.resultPlaceholder, { color: theme.text }]}>
            El resultado del análisis aparecerá aquí.
          </Text>
        )}
      </View>
    </View>
  );
};

export default Camara;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginLeft: 10,
  },
  cameraContainer: {
    width: '100%',
    height: 200,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  placeholder: {
    width: '80%',
    height: '100%',
    backgroundColor: '#E0E0E0',
    borderRadius: 20,
  },
  preview: {
    width: '80%',
    height: '100%',
    borderRadius: 20,
    resizeMode: 'cover',
  },
  scanButton: {
    paddingVertical: 15,
    paddingHorizontal: 60,
    borderRadius: 10,
    marginBottom: 20,
    alignSelf: 'center',
  },
  scanButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  resultContainer: {
    width: '90%',
    height: 150,
    borderWidth: 1,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    alignSelf: 'center',
  },
  resultText: {
    fontSize: 16,
    textAlign: 'center',
  },
  resultPlaceholder: {
    fontSize: 14,
    textAlign: 'center',
    opacity: 0.5,
  },
});
