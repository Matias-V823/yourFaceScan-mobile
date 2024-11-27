import { StyleSheet, View, Text, TouchableOpacity, ScrollView } from 'react-native';

export default function inicioScreen() {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>¿Qué es YourFace Scan?</Text>
      <Text style={styles.description}>
        YourFaceScan es una herramienta de reconocimiento facial diseñada para ayudar a las organizaciones a verificar la identidad de personas y consultar sus antecedentes de manera rápida y segura. 
        A través de un escaneo facial, puedes identificar personas en segundos y acceder a la información relevante registrada en el sistema.
      </Text>

      <View style={styles.quickAccessContainer}>
        <Text style={styles.sectionTitle}>Acceso Rápido</Text>
        <View style={styles.buttonRow}>
          <TouchableOpacity style={styles.quickButton}>
            <Text style={styles.buttonText}>Iniciar Escaneo</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.quickButton}>
            <Text style={styles.buttonText}>Ayuda y Soporte</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.buttonRow}>
          <TouchableOpacity style={styles.quickButton}>
            <Text style={styles.buttonText}>Historial</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.quickButton}>
            <Text style={styles.buttonText}>Notificaciones</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.newsContainer}>
        <Text style={styles.sectionTitle}>Noticias</Text>
        <TouchableOpacity style={styles.newsItem}>
          <Text style={styles.newsText}>Actualizaciones de Seguridad</Text>
          <TouchableOpacity style={styles.detailsButton}>
            <Text style={styles.detailsText}>Detalles</Text>
          </TouchableOpacity>
        </TouchableOpacity>
        <TouchableOpacity style={styles.newsItem}>
          <Text style={styles.newsText}>Mejoras en la Funcionalidad de escaneo</Text>
          <TouchableOpacity style={styles.detailsButton}>
            <Text style={styles.detailsText}>Detalles</Text>
          </TouchableOpacity>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    textAlign: 'justify',
    marginBottom: 20,
    color: '#444',
  },
  quickAccessContainer: {
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  quickButton: {
    flex: 1,
    marginHorizontal: 5,
    paddingVertical: 10,
    backgroundColor: '#007AFF',
    borderRadius: 10,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '500',
  },
  newsContainer: {
    marginBottom: 20,
  },
  newsItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
    padding: 10,
    borderRadius: 8,
    marginBottom: 10,
  },
  newsText: {
    fontSize: 16,
    flex: 1,
  },
  detailsButton: {
    backgroundColor: '#007AFF',
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  detailsText: {
    color: '#fff',
    fontSize: 14,
  },
});
