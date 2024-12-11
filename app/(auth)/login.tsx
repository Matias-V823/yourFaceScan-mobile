import React, { useState } from 'react';
import { View, TextInput, Text, TouchableOpacity, ActivityIndicator, Alert, StyleSheet, Image } from 'react-native';
import { getLogin } from '@/apis/apiYourFace';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';
import { useColorScheme } from 'react-native';
import Colors from '../../constants/Colors';
import Logo from '../../assets/images/Logo.png';

export default function Login() {
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const systemTheme = useColorScheme();
  const theme = systemTheme === 'dark' ? Colors.dark : Colors.light;

  const handleLogin = async () => {
    if (!username || !password) {
      Alert.alert('Error', 'Por favor ingresa tu usuario y contraseña');
      return;
    }

    setLoading(true);

    try {
      const data = { access: 'fakeToken' }; // Simulación de respuesta

      if (data?.access) {
        Alert.alert('Éxito', 'Inicio de sesión exitoso');
        router.replace('/(tabs)/inicio');
      } else {
        Alert.alert('Error', 'Usuario o contraseña inválidos');
      }
    } catch (error) {
      Alert.alert('Error', 'Ocurrió un error al iniciar sesión');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <View style={styles.content}>
        <Image source={Logo} style={styles.logo} />
        <TextInput
          style={[
            styles.input,
            {
              backgroundColor: theme.statButtonBackground,
              color: theme.text,
              borderColor: theme.buttonBorder,
            },
          ]}
          placeholder="Correo Electrónico"
          placeholderTextColor={theme.text === '#fff' ? '#aaa' : '#666'} // Placeholder neutral
          value={username}
          onChangeText={setUsername}
          autoCapitalize="none"
          keyboardType="email-address"
        />
        <TextInput
          style={[
            styles.input,
            {
              backgroundColor: theme.statButtonBackground,
              color: theme.text,
              borderColor: theme.buttonBorder,
            },
          ]}
          placeholder="Clave"
          placeholderTextColor={theme.text === '#fff' ? '#aaa' : '#666'} // Placeholder neutral
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />
        <TouchableOpacity
          style={[styles.button, { backgroundColor: theme.tint }, loading && { opacity: 0.7 }]}
          onPress={handleLogin}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.buttonText}>Iniciar Sesión</Text>
          )}
        </TouchableOpacity>
        <TouchableOpacity onPress={() => Alert.alert('Recuperar clave')}>
          <Text style={[styles.forgotPassword, { color: theme.tint }]}>¿Olvidaste la clave?</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.footerContainer}>
        <Text style={[styles.footer, { color: theme.tint }]}>YourFace Scan</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between', // Distribuye contenido entre la parte superior y la inferior
    alignItems: 'center',
    padding: 20,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  logo: {
    width: 100,
    height: 100,
    marginBottom: 30,
  },
  input: {
    width: '100%',
    padding: 15,
    borderRadius: 10,
    marginBottom: 20,
    fontSize: 16,
    borderWidth: 1,
  },
  button: {
    width: '100%',
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  forgotPassword: {
    fontSize: 14,
    marginTop: 15,
    textAlign: 'center',
  },
  footerContainer: {
    alignItems: 'center',
    paddingVertical: 20,
  },
  footer: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});
