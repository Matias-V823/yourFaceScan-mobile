import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Colors from '@/constants/Colors';
import { useColorScheme } from 'react-native';

interface AcercaModalProps {
  closeModal: () => void;
}

const AcercaModal: React.FC<AcercaModalProps> = ({ closeModal }) => {
  const colorScheme = useColorScheme();
  const theme = Colors[colorScheme || 'light'];

  return (
    <View style={[styles.container, { backgroundColor: 'rgba(0, 0, 0, 0.5)' }]}>
      <View style={[styles.modal, { backgroundColor: theme.newsButtonBackground }]}>
        <Ionicons name="information-circle-outline" size={60} color={theme.tint} style={styles.icon} />
        <Text style={[styles.title, { color: theme.text }]}>Acerca de</Text>
        <Text style={[styles.subtitle, { color: theme.text }]}>
          Información sobre la aplicación, su funcionalidad y desarrolladores.
        </Text>
        
        {/* Botones */}
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={[styles.button, { borderColor: theme.buttonBorder }]}
            onPress={closeModal}
          >
            <Text style={[styles.cancelText, { color: theme.text }]}>Cerrar</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default AcercaModal;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  modal: {
    width: '100%',
    maxWidth: 400,
    padding: 20,
    borderRadius: 20,
    alignItems: 'center',
  },
  icon: {
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 30,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    width: '100%',
  },
  button: {
    flex: 1,
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginHorizontal: 5,
    borderWidth: 1,
  },
  cancelText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});
