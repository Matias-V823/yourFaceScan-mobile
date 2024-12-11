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
import { useGlobalState } from '@/GlobalState';

const Historial = () => {
  const colorScheme = useColorScheme();
  const theme = Colors[colorScheme || 'light'];

  const { scans } = useGlobalState(); // Obtener los datos del contexto global
  const [selectedData, setSelectedData] = useState(null);

  const renderItem = ({ item }) => (
    <View
      style={[
        styles.card,
        { backgroundColor: theme.newsButtonBackground, borderColor: theme.buttonBorder },
      ]}
    >
      {/* Muestra la imagen capturada */}
      <Image source={{ uri: item.data.capturedImage || item.data.Person.photo }} style={styles.image} />
      <View style={styles.cardContent}>
        <Text style={[styles.name, { color: theme.text }]}>
          {item.data.Person.first_name} {item.data.Person.last_name}
        </Text>
        <Text style={[styles.birthdate, { color: theme.text }]}>
          Fecha de nacimiento: {item.data.Person.birth_date}
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
        data={scans}
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
          <View style={styles.modalBackground}>
            <View style={[styles.modalContent, { backgroundColor: theme.newsButtonBackground }]}>
              {/* Imagen capturada */}
              <Image
                source={{ uri: selectedData.data.capturedImage || selectedData.data.Person.photo }}
                style={styles.modalImage}
              />
              <Text style={[styles.modalText, { color: theme.text }]}>
                <Text style={styles.bold}>Nombre:</Text> {selectedData.data.Person.first_name}{' '}
                {selectedData.data.Person.last_name}
              </Text>
              <Text style={[styles.modalText, { color: theme.text }]}>
                <Text style={styles.bold}>Identificación:</Text> {selectedData.data.Person.identification}
              </Text>
              <Text style={[styles.modalText, { color: theme.text }]}>
                <Text style={styles.bold}>Fecha de nacimiento:</Text> {selectedData.data.Person.birth_date}
              </Text>
              <Text style={[styles.modalText, { color: theme.text }]}>
                <Text style={styles.bold}>Género:</Text> {selectedData.data.Person.gender}
              </Text>
              {selectedData.data.Records?.map((record, index) => (
                <View key={index}>
                  <Text style={[styles.modalText, { color: theme.text }]}>
                    <Text style={styles.bold}>Tipo de registro:</Text> {record.record_type}
                  </Text>
                  <Text style={[styles.modalText, { color: theme.text }]}>
                    <Text style={styles.bold}>Descripción:</Text> {record.description}
                  </Text>
                </View>
              ))}
              <TouchableOpacity
                style={[styles.buttonClose, { backgroundColor: theme.tint }]}
                onPress={() => setSelectedData(null)}
              >
                <Text style={[styles.buttonCloseText, { color: theme.background }]}>Cerrar</Text>
              </TouchableOpacity>
            </View>
          </View>
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
  modalBackground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: '90%',
    padding: 20,
    borderRadius: 15,
    alignItems: 'center',
  },
  modalImage: {
    width: 150,
    height: 150,
    borderRadius: 10,
    marginBottom: 10,
  },
  modalText: {
    fontSize: 16,
    marginBottom: 10,
  },
  bold: {
    fontWeight: 'bold',
  },
  buttonClose: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    marginTop: 20,
  },
  buttonCloseText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});
