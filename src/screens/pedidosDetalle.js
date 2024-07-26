import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { MaterialIcons } from '@expo/vector-icons';
import ProductCard from '../components/cardProductOrder';
import { fetchOrderInfo } from '../controller/publica/detalleProductoPedido';
import useApi from '../controller/utilis/useApi';

//Funcion para setear datos de detalle orden
const DetalleOrden = ({ }) => {
  const { fetchData } = useApi();
  const [products, setProducts] = useState([]);
  const [pago, setTotalPago] = useState(0);
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();

  //Funcion que se ejecuta al cargar la pantalla
  useEffect(() => {
    const loadOrderInfo = async () => {
      try {
        const { products, total_pago } = await fetchOrderInfo(fetchData);
        setProducts(products);
        setTotalPago(total_pago);
      } catch (error) {
        Alert.alert('Error al cargar', error.message);
      } finally {
        setLoading(false);
      }
    };

    loadOrderInfo();
  }, []);

  //Renderizamos las tarjetas 
  const renderItem = ({ item }) => (
    <ProductCard
      image={item.ruta_imagen}
      name={item.nombre_inventario}
      brand={item.nombre_marca}
      price={item.precio_inventario}
      quantity={item.cantidad_producto}
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
          <View style={styles.espacioTexto}>
            <View style={styles.fila}>
              <Text style={styles.label}>Costo de envío</Text>
              <Text style={styles.valor}>$0.00</Text>
            </View>
            <View style={styles.fila}>
              <Text style={styles.label}>Total</Text>
              <Text style={styles.valor}>${pago}</Text>
            </View>
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
  espacioTexto: {
    marginTop: 20,
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
    paddingTop: 20,
  },
  fila: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 5,
  },
  label: {
    fontWeight: '600',
    fontSize: 16,
  },
  valor: {
    fontSize: 16,
  },
});

export default DetalleOrden;
