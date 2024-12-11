import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  FlatList,
  Image,
  TextInput,
  Modal,
} from 'react-native';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { useColorScheme } from 'react-native';
import Colors from '@/constants/Colors';
import VerMasModal from '../(modal)/historial'; // Importar el modal

// Definición de tipos para los elementos del historial
interface Consulta {
  id: string;
  nombre: string;
  apellidoPaterno: string;
  apellidoMaterno: string;
  rut: string;
  fechaNacimiento: string;
  genero: string;
  foto: string;
}

// Datos de ejemplo para la lista
const data: Consulta[] = [
  {
    id: '1',
    nombre: 'Tomas',
    apellidoPaterno: 'Poblete',
    apellidoMaterno: 'Chamorro',
    rut: '18.123.456-7',
    fechaNacimiento: '18/10/2001',
    genero: 'Masculino',
    foto: 'https://via.placeholder.com/100',
  },
  {
    id: '2',
    nombre: 'María',
    apellidoPaterno: 'González',
    apellidoMaterno: 'Soto',
    rut: '12.345.678-9',
    fechaNacimiento: '12/07/1995',
    genero: 'Femenino',
    foto: 'https://via.placeholder.com/100',
  },
  {
    id: '3',
    nombre: 'Juan',
    apellidoPaterno: 'Pérez',
    apellidoMaterno: 'López',
    rut: '9.876.543-2',
    fechaNacimiento: '25/12/1980',
    genero: 'Masculino',
    foto: 'https://via.placeholder.com/100',
  },
];

const Historial = () => {
  const colorScheme = useColorScheme();
  const theme = Colors[colorScheme || 'light'];

  const [selectedData, setSelectedData] = useState<Consulta | null>(null);

  const renderItem = ({ item }: { item: Consulta }) => (
    <View
      style={[
        styles.card,
        { backgroundColor: theme.newsButtonBackground, borderColor: theme.buttonBorder },
      ]}
    >
      <Image source={{ uri: item.foto }} style={styles.image} />
      <View style={styles.cardContent}>
        <Text style={[styles.name, { color: theme.text }]}>
          {item.nombre} {item.apellidoPaterno}
        </Text>
        <Text style={[styles.birthdate, { color: theme.text }]}>
          Fecha de nacimiento: {item.fechaNacimiento}
        </Text>
        <TouchableOpacity
          style={[styles.button, { backgroundColor: theme.tint }]}
          onPress={() => setSelectedData(item)} // Almacena los datos en el estado
        >
          <Text style={[styles.buttonText, { color: theme.background }]}>Ver más</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      {/* Encabezado */}
      <View style={styles.header}>
        <Ionicons name="time-outline" size={28} color={theme.tint} />
        <Text style={[styles.title, { color: theme.tint }]}>Historial de consultas</Text>
      </View>

      {/* Barra de búsqueda */}
      <TextInput
        style={[
          styles.searchBar,
          { backgroundColor: theme.newsButtonBackground, color: theme.text, borderColor: theme.buttonBorder },
        ]}
        placeholder="Buscar..."
        placeholderTextColor={theme.tabIconDefault}
      />

      {/* Botones de filtro y orden */}
      <View style={styles.filterContainer}>
        <TouchableOpacity style={[styles.button, { backgroundColor: theme.tint }]}>
          <MaterialIcons name="filter-list" size={20} color={theme.background} />
          <Text style={[styles.buttonText, { color: theme.background }]}>Filtrar por</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.button, { backgroundColor: theme.tint }]}>
          <MaterialIcons name="sort" size={20} color={theme.background} />
          <Text style={[styles.buttonText, { color: theme.background }]}>Ordenar por</Text>
        </TouchableOpacity>
      </View>

      {/* Lista de consultas recientes */}
      <Text style={[styles.sectionTitle, { color: theme.text }]}>Consultas Recientes</Text>
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
      />

      {/* Modal */}
      {selectedData && (
        <Modal
          visible={!!selectedData}
          animationType="slide"
          transparent={true}
          onRequestClose={() => setSelectedData(null)}
        >
          <VerMasModal closeModal={() => setSelectedData(null)} data={selectedData} />
        </Modal>
      )}
    </View>
  );
};

export default Historial;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginLeft: 10,
  },
  searchBar: {
    height: 50,
    borderRadius: 10,
    paddingHorizontal: 10,
    marginBottom: 20,
    borderWidth: 1,
  },
  filterContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 10,
  },
  buttonText: {
    marginLeft: 5,
    fontSize: 14,
    fontWeight: 'bold',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  card: {
    flexDirection: 'row',
    borderRadius: 15,
    marginBottom: 15,
    borderWidth: 1,
    overflow: 'hidden',
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 10,
    margin: 10,
  },
  cardContent: {
    flex: 1,
    padding: 10,
    justifyContent: 'center',
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  birthdate: {
    fontSize: 14,
    marginBottom: 10,
  },
});
