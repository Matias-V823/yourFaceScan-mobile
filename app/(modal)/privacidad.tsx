import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, View, TouchableOpacity } from 'react-native';
import Colors from '@/constants/Colors';
import { useColorScheme } from 'react-native';

interface PrivacidadModalProps {
  closeModal: () => void;
}

const PrivacidadModal: React.FC<PrivacidadModalProps> = ({ closeModal }) => {
  const colorScheme = useColorScheme();
  const theme = Colors[colorScheme || 'light'];

  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  return (
    <View style={[styles.container, { backgroundColor: 'rgba(0, 0, 0, 0.5)' }]}>
      <View style={[styles.modal, { backgroundColor: theme.newsButtonBackground }]}>
        <Text style={[styles.title, { color: theme.tint }]}>Privacidad</Text>

        {/* Campos de entrada */}
        <TextInput
          style={[styles.input, { borderColor: theme.buttonBorder, color: theme.text }]}
          placeholder="Nueva Contraseña"
          placeholderTextColor={theme.tabIconDefault}
          secureTextEntry={true}
          value={newPassword}
          onChangeText={setNewPassword}
        />
        <TextInput
          style={[styles.input, { borderColor: theme.buttonBorder, color: theme.text }]}
          placeholder="Repetir Contraseña"
          placeholderTextColor={theme.tabIconDefault}
          secureTextEntry={true}
          value={confirmPassword}
          onChangeText={setConfirmPassword}
        />

        {/* Botones */}
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={[styles.button, { borderColor: theme.buttonBorder }]}
            onPress={closeModal}
          >
            <Text style={[styles.cancelText, { color: theme.text }]}>Cancelar</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.button, { backgroundColor: theme.tint }]}>
            <Text style={[styles.editText, { color: theme.background }]}>Guardar</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default PrivacidadModal;

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
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    width: '100%',
    padding: 15,
    borderRadius: 10,
    borderWidth: 1,
    marginBottom: 15,
    fontSize: 16,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginTop: 20,
  },
  button: {
    flex: 1,
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginHorizontal: 5,
  },
  cancelText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  editText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});
