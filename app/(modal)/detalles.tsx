import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, ScrollView } from 'react-native';
import Colors from '@/constants/Colors';
import { useColorScheme } from 'react-native';

interface NoticiasModalProps {
  closeModal: () => void;
  data: {
    titulo: string;
    imagen: string;
    contenido: string;
  };
}

const NoticiasModal: React.FC<NoticiasModalProps> = ({ closeModal, data }) => {
  const colorScheme = useColorScheme();
  const theme = Colors[colorScheme || 'light'];

  return (
    <View style={[styles.container, { backgroundColor: 'rgba(0, 0, 0, 0.6)' }]}>
      <View style={[styles.modal, { backgroundColor: theme.newsButtonBackground }]}>
        {/* Imagen Destacada */}
        <Image source={{ uri: data.imagen }} style={styles.image} />

        {/* Título de la Noticia */}
        <Text style={[styles.title, { color: theme.tint }]}>{data.titulo}</Text>

        {/* Contenido de la Noticia */}
        <ScrollView style={styles.contentContainer}>
          <Text style={[styles.content, { color: theme.text }]}>{data.contenido}</Text>
        </ScrollView>

        {/* Botón para Cerrar */}
        <TouchableOpacity
          style={[styles.button, { backgroundColor: theme.tint }]}
          onPress={closeModal}
        >
          <Text style={[styles.buttonText, { color: theme.background }]}>Cerrar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default NoticiasModal;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  modal: {
    width: '90%',
    height: '80%',
    padding: 20,
    borderRadius: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 5,
  },
  image: {
    width: '100%',
    height: 200,
    borderRadius: 15,
    marginBottom: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 15,
  },
  contentContainer: {
    flex: 1,
    width: '100%',
    marginBottom: 15,
  },
  content: {
    fontSize: 16,
    lineHeight: 22,
    textAlign: 'justify',
  },
  button: {
    marginTop: 10,
    paddingVertical: 10,
    paddingHorizontal: 40,
    borderRadius: 10,
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});
