import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import Colors from '@/constants/Colors';
import { useColorScheme } from 'react-native';

interface VerMasModalProps {
  closeModal: () => void;
  data: {
    nombre: string;
    apellidoPaterno: string;
    apellidoMaterno: string;
    rut: string;
    fechaNacimiento: string;
    genero: string;
    foto: string;
  };
}

const VerMasModal: React.FC<VerMasModalProps> = ({ closeModal, data }) => {
  const colorScheme = useColorScheme();
  const theme = Colors[colorScheme || 'light'];

  return (
    <View style={[styles.container, { backgroundColor: 'rgba(0, 0, 0, 0.6)' }]}>
      <View style={[styles.modal, { backgroundColor: theme.newsButtonBackground }]}>
        {/* Imagen del usuario */}
        <Image source={{ uri: data.foto }} style={styles.image} />
        
        {/* Título */}
        <Text style={[styles.title, { color: theme.tint }]}>Detalles de la Consulta</Text>

        {/* Detalles */}
        <View style={styles.detailGroup}>
          <Text style={[styles.label, { color: theme.tint }]}>Nombre Completo</Text>
          <Text style={[styles.detail, { color: theme.text }]}>
            {data.nombre} {data.apellidoPaterno} {data.apellidoMaterno}
          </Text>
        </View>
        <View style={styles.detailGroup}>
          <Text style={[styles.label, { color: theme.tint }]}>RUT</Text>
          <Text style={[styles.detail, { color: theme.text }]}>{data.rut}</Text>
        </View>
        <View style={styles.detailGroup}>
          <Text style={[styles.label, { color: theme.tint }]}>Fecha de Nacimiento</Text>
          <Text style={[styles.detail, { color: theme.text }]}>{data.fechaNacimiento}</Text>
        </View>
        <View style={styles.detailGroup}>
          <Text style={[styles.label, { color: theme.tint }]}>Género</Text>
          <Text style={[styles.detail, { color: theme.text }]}>{data.genero}</Text>
        </View>

        {/* Botón */}
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

export default VerMasModal;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  modal: {
    width: '90%',
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
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 20,
    borderWidth: 2,
    borderColor: '#ddd',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  detailGroup: {
    width: '100%',
    marginBottom: 15,
    borderBottomWidth: 1,
    borderColor: '#ccc',
    paddingBottom: 10,
  },
  label: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  detail: {
    fontSize: 16,
  },
  button: {
    marginTop: 20,
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
