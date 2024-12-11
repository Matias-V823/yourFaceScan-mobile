import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Modal,
  useWindowDimensions,
} from 'react-native';
import { useColorScheme } from 'react-native';
import Colors from '@/constants/Colors';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
// Importar los modales
import PerfilModal from '../(modal)/perfil';
import PrivacidadModal from '../(modal)/privacidad';
import AcercaModal from '../(modal)/acerca';

const Perfil = () => {
  const colorScheme = useColorScheme();
  const theme = Colors[colorScheme || 'light'];
  const { width } = useWindowDimensions();

  const [modalVisible, setModalVisible] = useState<string | null>(null);

  const closeModal = () => setModalVisible(null);

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      {/* Avatar (Ícono) */}
      <View style={styles.avatarContainer}>
        <Ionicons
          name="person-circle"
          size={width * 0.4}
          color={theme.tint}
          style={styles.avatarIcon}
        />
        <Text style={[styles.userName, { color: theme.text }]}>Matías Jesús Varas Aquín</Text>
      </View>

      {/* Opciones */}
      <View style={styles.optionsContainer}>
        <TouchableOpacity
          style={[
            styles.option,
            { backgroundColor: theme.newsButtonBackground, borderColor: theme.buttonBorder },
          ]}
          onPress={() => setModalVisible('perfil')}
          accessibilityLabel="Configuración de perfil, ve y modifica tu usuario"
        >
          <Ionicons name="person-circle-outline" size={30} color={theme.tint} style={styles.icon} />
          <View style={styles.textContainer}>
            <Text style={[styles.optionTitle, { color: theme.text }]}>Configuración de Perfil</Text>
            <Text style={[styles.optionSubtitle, { color: theme.text }]}>Ve y modifica tu usuario</Text>
          </View>
          <Ionicons name="chevron-forward" size={24} color={theme.tint} />
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.option,
            { backgroundColor: theme.newsButtonBackground, borderColor: theme.buttonBorder },
          ]}
          onPress={() => setModalVisible('privacidad')}
          accessibilityLabel="Privacidad, cambia tu contraseña"
        >
          <MaterialIcons name="privacy-tip" size={30} color={theme.tint} style={styles.icon} />
          <View style={styles.textContainer}>
            <Text style={[styles.optionTitle, { color: theme.text }]}>Privacidad</Text>
            <Text style={[styles.optionSubtitle, { color: theme.text }]}>Cambia tu contraseña</Text>
          </View>
          <Ionicons name="chevron-forward" size={24} color={theme.tint} />
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.option,
            { backgroundColor: theme.newsButtonBackground, borderColor: theme.buttonBorder },
          ]}
          onPress={() => setModalVisible('acerca')}
          accessibilityLabel="Acerca de, datos de la aplicación"
        >
          <Ionicons name="information-circle-outline" size={30} color={theme.tint} style={styles.icon} />
          <View style={styles.textContainer}>
            <Text style={[styles.optionTitle, { color: theme.text }]}>Acerca de</Text>
            <Text style={[styles.optionSubtitle, { color: theme.text }]}>Datos de la aplicación</Text>
          </View>
          <Ionicons name="chevron-forward" size={24} color={theme.tint} />
        </TouchableOpacity>
      </View>

      {/* Botón Cerrar Sesión */}
      <TouchableOpacity
        style={[
          styles.option,
          { backgroundColor: theme.tint, borderColor: theme.tint },
        ]}
        accessibilityLabel="Cerrar sesión"
      >
        <Ionicons name="log-out-outline" size={22} color={theme.background} style={styles.icon} />
        <View style={styles.textContainer}>
          <Text style={[styles.optionTitle, { color: theme.background }]}>Cerrar Sesión</Text>
          <Text style={[styles.optionSubtitle, { color: theme.background }]}>
            Sal de tu cuenta actual
          </Text>
        </View>
      </TouchableOpacity>

      {/* Modales */}
      <Modal
        visible={modalVisible === 'perfil'}
        animationType="slide"
        transparent={true}
        onRequestClose={closeModal}
      >
        <PerfilModal closeModal={closeModal} />
      </Modal>
      <Modal
        visible={modalVisible === 'privacidad'}
        animationType="slide"
        transparent={true}
        onRequestClose={closeModal}
      >
        <PrivacidadModal closeModal={closeModal} />
      </Modal>
      <Modal
        visible={modalVisible === 'acerca'}
        animationType="slide"
        transparent={true}
        onRequestClose={closeModal}
      >
        <AcercaModal closeModal={closeModal} />
      </Modal>
    </View>
  );
};

export default Perfil;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    padding: 20,
    paddingTop: 50,
  },
  avatarContainer: {
    alignItems: 'center',
    marginBottom: 30,
  },
  avatarIcon: {
    marginBottom: 10,
  },
  userName: {
    fontSize: 24,
    paddingTop: 20,
    fontWeight: 'bold',
  },
  optionsContainer: {
    width: '100%',
    marginBottom: 10,
  },
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    borderRadius: 20,
    marginBottom: 10,
    borderWidth: 1,
  },
  icon: {
    marginRight: 15,
  },
  textContainer: {
    flex: 1,
  },
  optionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  optionSubtitle: {
    fontSize: 14,
  },
});
