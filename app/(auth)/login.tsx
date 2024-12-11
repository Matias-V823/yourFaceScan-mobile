import React, { useState } from 'react';
import { View, TextInput, Text, TouchableOpacity, ActivityIndicator, Alert, StyleSheet } from 'react-native';
import { getLogin } from '@/apis/apiYourFace';
import { useRouter } from 'expo-router';

export default function Login() {
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!username || !password) {
      Alert.alert('Error', 'Por favor ingresa tu usuario y contraseña');
      return;
    }
    setLoading(true);
    try {
      const response = await getLogin(username, password);
      if (!response) {
        setLoading(false);
        Alert.alert('Error', 'No se pudo obtener respuesta del servidor');
        return;
      }

      const data = await response.json();
      if (data?.access) {
        setLoading(false);
        router.replace('/(tabs)/inicio');
      } else {
        setLoading(false);
        Alert.alert('Error', 'Usuario o contraseña inválidos');
      }
    } catch (error) {
      setLoading(false);
      Alert.alert('Error', 'Ocurrió un error al iniciar sesión');
      console.error(error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Iniciar Sesión</Text>
      <TextInput
        style={styles.input}
        placeholder="Usuario"
        placeholderTextColor="#888"
        value={username}
        onChangeText={setUsername}
        autoCapitalize="none"
      />
      <TextInput
        style={styles.input}
        placeholder="Contraseña"
        placeholderTextColor="#888"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      <TouchableOpacity 
        style={[styles.button, loading && { opacity: 0.7 }]} 
        onPress={handleLogin}
        disabled={loading}
      >
        {loading ? <ActivityIndicator color="#fff" /> : <Text style={styles.buttonText}>Entrar</Text>}
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1B1B1B',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    color: '#fff',
    fontSize: 32,
    textAlign: 'center',
    marginBottom: 50,
    fontWeight: 'bold',
  },
  input: {
    backgroundColor: '#2A2A2A',
    color: '#fff',
    padding: 12,
    borderRadius: 8,
    marginBottom: 20,
    fontSize: 16,
  },
  button: {
    backgroundColor: '#3A8DFF',
    paddingVertical: 15,
    borderRadius: 8,
    marginTop: 10,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
