import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Image,
  ActivityIndicator,
  useWindowDimensions,
  Modal,
} from 'react-native';
import { useColorScheme } from 'react-native';
import Colors from '../../constants/Colors';
import Logo from '../../assets/images/Logo.png';
import { MaterialIcons } from '@expo/vector-icons';
import { router } from 'expo-router';
import NoticiasModal from '../(modal)/detalles';

export default function InicioScreen() {
  const systemTheme = useColorScheme();
  const theme = systemTheme === 'dark' ? Colors.dark : Colors.light;
  const { width } = useWindowDimensions();
  const [loadingNoticias, setLoadingNoticias] = useState(false);
  const [selectedNoticia, setSelectedNoticia] = useState<{
    titulo: string;
    imagen: string;
    contenido: string;
  } | null>(null);

  const noticias = [
    {
      titulo: 'Actualizaciones de Seguridad',
      imagen: 'https://via.placeholder.com/300',
      contenido:
        'Se han implementado nuevas actualizaciones de seguridad para proteger tu información y mejorar la confiabilidad del sistema.',
    },
    {
      titulo: 'Mejoras en la Funcionalidad de Escaneo',
      imagen: 'https://via.placeholder.com/300',
      contenido:
        'El sistema de escaneo facial ahora es más rápido y preciso, gracias a los avances en nuestro algoritmo de reconocimiento.',
    },
  ];

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <ScrollView
        contentContainerStyle={[
          styles.content,
          { paddingBottom: 100 },
        ]}
      >
        {/* Encabezado */}
        <View style={styles.header}>
          <View>
            <Text style={[styles.welcomeText, { color: theme.text }]}>
              Bienvenido
            </Text>
            <Text style={[styles.userName, { color: theme.tint }]}>Matias!</Text>
          </View>
          <Image source={Logo} style={[styles.logo, { width: width * 0.15, height: width * 0.15 }]} />
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
          <TouchableOpacity style={[styles.statBox, { backgroundColor: theme.statButtonBackground }]}>
            <MaterialIcons name="remove-red-eye" size={32} color={theme.tint} />
            <Text style={[styles.statTitle, { color: theme.text }]}>Escaneos</Text>
            <Text style={[styles.statValue, { color: theme.tint }]}>12</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.statBox, { backgroundColor: theme.statButtonBackground }]}>
            <MaterialIcons name="notifications" size={32} color={theme.tint} />
            <Text style={[styles.statTitle, { color: theme.text }]}>Notificaciones</Text>
            <Text style={[styles.statValue, { color: theme.tint }]}>3</Text>
          </TouchableOpacity>
        </View>

        {/* Atajos rápidos */}
        <View style={styles.quickAccessContainer}>
          <Text style={[styles.sectionTitle, { color: theme.text }]}>
            Acceso Rápido
          </Text>
          <View style={styles.buttonRow}>
            <TouchableOpacity
              style={[styles.primaryButton, { backgroundColor: theme.tint }]}
              onPress={() => router.replace('/(tabs)/camara')}
            >
              <Text style={styles.buttonTextPrimary}>Iniciar Escaneo</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.secondaryButton, { borderColor: theme.tint }]}
            >
              <Text style={[styles.buttonTextSecondary, { color: theme.tint }]}>
                Ayuda y Soporte
              </Text>
            </TouchableOpacity>
          </View>
          <View style={styles.buttonRow}>
            <TouchableOpacity
              style={[styles.secondaryButton, { borderColor: theme.tint }]}
            >
              <Text style={[styles.buttonTextSecondary, { color: theme.tint }]}>
                Historial
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.primaryButton, { backgroundColor: theme.tint }]}
            >
              <Text style={styles.buttonTextPrimary}>Notificaciones</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Noticias */}
        <View style={styles.newsContainer}>
          <Text style={[styles.sectionTitle, { color: theme.text }]}>
            Noticias
          </Text>
          {loadingNoticias ? (
            <ActivityIndicator size="large" color={theme.tint} />
          ) : (
            noticias.map((noticia, index) => (
              <View
                key={index}
                style={[
                  styles.newsItem,
                  { backgroundColor: theme.newsButtonBackground, borderColor: theme.buttonBorder },
                ]}
              >
                <Text style={[styles.newsText, { color: theme.text }]}>
                  {noticia.titulo}
                </Text>
                <TouchableOpacity
                  style={[styles.detailsButton, { backgroundColor: theme.tint }]}
                  onPress={() => setSelectedNoticia(noticia)}
                >
                  <Text style={styles.detailsButtonText}>Detalles</Text>
                </TouchableOpacity>
              </View>
            ))
          )}
        </View>
      </ScrollView>

      {/* Modal de Noticias */}
      {selectedNoticia && (
        <Modal
          visible={!!selectedNoticia}
          animationType="slide"
          transparent={true}
          onRequestClose={() => setSelectedNoticia(null)}
        >
          <NoticiasModal
            closeModal={() => setSelectedNoticia(null)}
            data={selectedNoticia}
          />
        </Modal>
      )}
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
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  welcomeText: {
    fontSize: 24,
    fontWeight: '600',
  },
  userName: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 5,
  },
  logo: {
    resizeMode: 'contain',
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
    marginBottom: 20,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  statBox: {
    flex: 1,
    height: 100,
    marginHorizontal: 5,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 15,
  },
  statTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginTop: 5,
  },
  statValue: {
    fontSize: 22,
    fontWeight: 'bold',
  },
  quickAccessContainer: {
    marginBottom: 20,
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
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
    borderWidth: 1,
  },
  newsText: {
    fontSize: 16,
    flex: 1,
    marginRight: 10,
  },
  detailsButton: {
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 10,
  },
  detailsButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
  },
});
