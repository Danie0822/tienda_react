import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { MaterialIcons } from '@expo/vector-icons';
import ProductCard from '../components/cardProductOrder';
import { fetchOrderInfo } from '../controller/publica/detalleProductoPedido';
import useApi from '../controller/utilis/useApi';

const DetalleOrden = ({}) => {
  const { fetchData } = useApi(); // Correctamente usando el hook dentro del componente
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();

  useEffect(() => {
    const loadOrderInfo = async () => {
      try {
        const fetchedProducts = await fetchOrderInfo(fetchData);
        setProducts(fetchedProducts);
      } catch (error) {
        Alert.alert('Error al cargar', error.message);
      } finally {
        setLoading(false);
      }
    };

    loadOrderInfo();
  }, []);

  const renderItem = ({ item }) => (
    <ProductCard
      image={item.ruta_imagen}
      name={item.nombre_producto}
      brand={item.marca}
      price={item.precio}
      quantity={item.cantidad}
    />
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <MaterialIcons name="arrow-back" size={24} color="#000" />
        </TouchableOpacity>
        <Text style={styles.title}>Detalle pedido</Text>
        <View style={styles.spacer} />
      </View>
      {loading ? (
        <Text>Cargando...</Text>
      ) : (
        <>
          <FlatList
            data={products}
            renderItem={renderItem}
            keyExtractor={(item, index) => index.toString()}
            contentContainerStyle={styles.listContainer}
          />
          <View style={styles.summary}>
            <Text style={styles.sub}>Subtotal 
              <Text style={styles.text}> $155.95</Text>
            </Text>
            <Text style={styles.sub}>Costo de envío 
              <Text style={styles.text}> $0.00</Text>
            </Text>
            <Text style={styles.sub}>Total 
              <Text style={styles.text}> $155.95</Text>
            </Text>
          </View>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
  header: {
    marginTop: 20,
    marginBottom: 30
  },
  backButton: {
    position: 'absolute',
    borderWidth: 0,
    backgroundColor: '#f0f0f0',
    borderRadius: 20,
    padding: 10,
    marginTop: 20,
    marginRight: 10
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    justifyContent: "center",
    marginTop: 20,
    alignSelf: 'center'

  },
  listContainer: {
    paddingBottom: 20,
  },
  summary: {
    marginTop: 20,
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
    paddingTop: 20,
  },
  sub: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 5,
    fontWeight: '600'
  },
  text: {
    fontSize: 16
  },
});

export default DetalleOrden;
