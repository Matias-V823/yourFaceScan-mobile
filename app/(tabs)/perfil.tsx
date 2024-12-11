import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { useColorScheme } from 'react-native';
import Colors from '@/constants/Colors';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';

const Perfil = () => {
  const colorScheme = useColorScheme();
  const theme = Colors[colorScheme || 'light'];

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      {/* Avatar */}
      <View style={styles.avatarContainer}>
        <View style={[styles.avatarPlaceholder, { backgroundColor: theme.tabIconDefault }]}></View>
        <Text style={[styles.userName, { color: theme.text }]}>Matías Jesús Varas Aquín</Text>
      </View>

      {/* Opciones */}
      <View style={styles.optionsContainer}>
        <TouchableOpacity
          style={[
            styles.option,
            { backgroundColor: theme.newsButtonBackground, borderColor: theme.buttonBorder },
          ]}
        >
          <Ionicons name="person-circle-outline" size={30} color={theme.tint} style={styles.icon} />
          <View style={styles.textContainer}>
            <Text style={[styles.optionTitle, { color: theme.text }]}>Configuración de Perfil</Text>
            <Text style={[styles.optionSubtitle, { color: theme.text }]}>Ve y modifica tu usuario</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.option,
            { backgroundColor: theme.newsButtonBackground, borderColor: theme.buttonBorder },
          ]}
        >
          <MaterialIcons name="privacy-tip" size={30} color={theme.tint} style={styles.icon} />
          <View style={styles.textContainer}>
            <Text style={[styles.optionTitle, { color: theme.text }]}>Privacidad</Text>
            <Text style={[styles.optionSubtitle, { color: theme.text }]}>Cambia tu contraseña</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.option,
            { backgroundColor: theme.newsButtonBackground, borderColor: theme.buttonBorder },
          ]}
        >
          <Ionicons name="information-circle-outline" size={30} color={theme.tint} style={styles.icon} />
          <View style={styles.textContainer}>
            <Text style={[styles.optionTitle, { color: theme.text }]}>Acerca de</Text>
            <Text style={[styles.optionSubtitle, { color: theme.text }]}>Datos de la aplicación</Text>
          </View>
        </TouchableOpacity>
      </View>

      {/* Botón Cerrar Sesión */}
      <TouchableOpacity
        style={[
          styles.logoutButton,
          { backgroundColor: theme.tint, borderColor: theme.tint },
        ]}
      >
        <Ionicons name="log-out-outline" size={24} color={theme.background} style={styles.icon} />
        <Text style={[styles.logoutButtonText, { color: theme.background }]}>Cerrar Sesión</Text>
      </TouchableOpacity>
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
  avatarPlaceholder: {
    width: 200,
    height: 200,
    borderRadius: 100,
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
  logoutButton: {
    width: '100%',
    paddingVertical: 20,
    borderRadius: 20,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    borderWidth: 1,
  },
  logoutButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 8,
  },
});

