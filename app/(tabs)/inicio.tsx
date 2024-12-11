import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, ScrollView, Image } from 'react-native';
import { useColorScheme } from 'react-native';
import Logo from '../../assets/images/Logo.png';
import Colors from '../../constants/Colors';
import { router } from 'expo-router';

export default function InicioScreen() {
  const systemTheme = useColorScheme();
  const theme = systemTheme === 'dark' ? Colors.dark : Colors.light;

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <ScrollView
        contentContainerStyle={[
          styles.content,
          { paddingBottom: 80 }, // Espacio adicional para evitar superposición con el Tab Bar
        ]}
      >
        {/* Encabezado */}
        <View style={styles.header}>
          <Text style={[styles.welcomeText, { color: theme.text }]}>Bienvenido</Text>
          <Text style={[styles.userName, { color: theme.text }]}>Matias!</Text>
          <Image source={Logo} style={styles.logo} />
        </View>

        {/* Descripción */}
        <Text style={[styles.title, { color: theme.text }]}>
          ¿Qué es <Text style={[styles.highlight, { color: theme.tint }]}>YourFace</Text> Scan?
        </Text>
        <Text style={[styles.description, { color: theme.text }]}>
          YourFaceScan es una herramienta de reconocimiento facial diseñada para ayudar a las organizaciones a verificar
          la identidad de personas y consultar sus antecedentes de manera rápida y segura. A través de un escaneo facial,
          puedes identificar personas en segundos y acceder a la información relevante registrada en el sistema.
        </Text>

        {/* Estadísticas */}
        <View style={styles.statsContainer}>
          <View style={[styles.statBoxSquare, { backgroundColor: theme.statButtonBackground }]}>
            <Text style={[styles.statTitle, { color: theme.text }]}>Escaneos</Text>
            <Text style={[styles.statValue, { color: theme.tint }]}>12</Text>
          </View>
          <View style={[styles.statBoxWide, { backgroundColor: theme.statButtonBackground }]}>
            <Text style={[styles.statTitle, { color: theme.text }]}>Notificaciones</Text>
            <Text style={[styles.statValue, { color: theme.tint }]}>3</Text>
          </View>
        </View>

        {/* Atajos rápidos */}
        <View style={styles.quickAccessContainer}>
          <Text style={[styles.sectionTitle, { color: theme.text }]}>Acceso Rápido</Text>
          <View style={styles.buttonRow}>
            <TouchableOpacity style={[styles.primaryButton, { backgroundColor: theme.tint }]} onPress={() => router.replace('/(tabs)/camara')}>
              <Text style={styles.buttonTextPrimary}>Iniciar Escaneo</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.secondaryButton, { borderColor: theme.tint }]}>
              <Text style={[styles.buttonTextSecondary, { color: theme.tint }]}>Ayuda y Soporte</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.buttonRow}>
            <TouchableOpacity style={[styles.secondaryButton, { borderColor: theme.tint }]}>
              <Text style={[styles.buttonTextSecondary, { color: theme.tint }]}>Historial</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.primaryButton, { backgroundColor: theme.tint }]}>
              <Text style={styles.buttonTextPrimary}>Notificaciones</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Noticias */}
        <View style={styles.newsContainer}>
        <Text style={[styles.sectionTitle, { color: theme.text }]}>Noticias</Text>
  <View style={[styles.newsItem, { backgroundColor: theme.newsButtonBackground, borderColor: theme.buttonBorder }]}>
    <Text style={[styles.newsText, { color: theme.text }]}>Actualizaciones de Seguridad</Text>
    <TouchableOpacity style={[styles.detailsButtonLarge, { backgroundColor: theme.tint }]}>
      <Text style={styles.detailsButtonText}>Detalles</Text>
    </TouchableOpacity>
  </View>
          <View style={[styles.newsItem, { backgroundColor: theme.newsButtonBackground, borderColor: theme.buttonBorder }]}>
    <Text style={[styles.newsText, { color: theme.text }]}>Mejoras en la Funcionalidad de escaneo</Text>
    <TouchableOpacity style={[styles.detailsButtonLarge, { backgroundColor: theme.tint }]}>
      <Text style={styles.detailsButtonText}>Detalles</Text>
    </TouchableOpacity>
  </View>
  </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    padding: 20,
    flexGrow: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 30,
  },
  welcomeText: {
    fontSize: 18,
    fontWeight: '600',
  },
  userName: {
    fontSize: 24,
    fontWeight: 'bold',
    marginLeft: 5,
  },
  logo: {
    width: 40,
    height: 40,
    marginLeft: 'auto',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  highlight: {
    color: '#007AFF',
  },
  description: {
    fontSize: 16,
    textAlign: 'left',
    marginBottom: 10,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 10,
  },
  statBoxSquare: {
    width: 80,
    height: 80,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20,
  },
  statBoxWide: {
    flex: 1,
    height: 80,
    marginLeft: 10,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 15,
  },
  statTitle: {
    fontSize: 16,
    fontWeight: '600',
  },
  statValue: {
    fontSize: 22,
    fontWeight: 'bold',
  },
  quickAccessContainer: {
    marginBottom: 10,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  primaryButton: {
    flex: 1,
    paddingVertical: 20,
    marginHorizontal: 5,
    borderRadius: 15,
    alignItems: 'center',
  },
  buttonTextPrimary: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  secondaryButton: {
    flex: 1,
    borderWidth: 1,
    paddingVertical: 20,
    marginHorizontal: 5,
    borderRadius: 15,
    alignItems: 'center',
  },
  buttonTextSecondary: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  newsContainer: {
    marginBottom: 20,
  },
  newsItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    height: 80,
    borderRadius: 20,
    marginBottom: 10,
    borderWidth: 1,
  },
  newsText: {
    fontSize: 16,
    flex: 1,
  },
  detailsButtonLarge: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
  },
  detailsButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
