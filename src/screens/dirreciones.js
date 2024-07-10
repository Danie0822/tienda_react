import React, { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Alert } from 'react-native';
import { useNavigation, useIsFocused } from '@react-navigation/native';
import CustomFlecha from '../components/regresar';
import CardAddress from '../components/CardAddress';
import { fetchInfoCliente } from '../controller/publica/dirreciones';

const AddressesScreen = () => {
  const [addresses, setAddresses] = useState([]);
  const { infoCliente } = fetchInfoCliente();
  const navigation = useNavigation();
  const isFocused = useIsFocused();

  const fetchData = async () => {
    try {
      const response = await infoCliente();
      if (response.success) {
        const filteredData = response.data.map(address => ({
          id: address.id_direccion,
          title: address.nombre_direccion,
          address: address.direccion_cliente
        }));
        setAddresses(filteredData);
      } else {
        Alert.alert('Error al cargar:', 'No se pudo cargar la información del cliente.');
      }
    } catch (error) {
      Alert.alert('Error al cargar', error.message);
    }
  };

  useEffect(() => {
    if (isFocused) {
      fetchData();
    }
  }, [isFocused]);

  const handleDirreciones = () => {
    navigation.navigate('RegistrarDirreciones');
  };

  const handleEdit = async (id) => {
    await AsyncStorage.setItem("id_direccion", id.toString());
    navigation.navigate('EditDirrecion');
  };

  const renderAddress = ({ item }) => (
    <CardAddress
      title={item.title}
      address={item.address}
      onEdit={() => handleEdit(item.id)}
    />
  );


  return (
    <View style={styles.container}>
      <CustomFlecha />
      <Text style={styles.title}>Direcciones</Text>
      <FlatList
        data={addresses}
        renderItem={renderAddress}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.list}
        ListFooterComponent={
          <TouchableOpacity style={styles.addButton} onPress={handleDirreciones}>
            <Text style={styles.addButtonText}>Agregar dirección</Text>
          </TouchableOpacity>
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 20,
  },
  title: {
    marginTop: 95,
    alignSelf: 'flex-start',
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#000',
  },
  list: {
    flexGrow: 1,
  },
  addButton: {
    alignItems: 'center',
    marginTop: 20,
  },
  addButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
  },
});

export default AddressesScreen;
