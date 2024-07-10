import React, { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import CardOrder from '../components/cardOrder';
import { fetchOrders } from '../controller/publica/estadoPedidos';
import useApi from '../controller/utilis/useApi';

const PedidosScreen = ({ }) => {
  const { fetchData } = useApi();
  const [selectedTab, setSelectedTab] = useState('Preparandose');
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const navigation = useNavigation();

  const handleTabClick = async (estado) => {
    setSelectedTab(estado);
    setIsLoading(true);
    try {
      const fetchedOrders = await fetchOrders(fetchData, estado);
      setOrders(fetchedOrders);
    } catch (error) {
      Alert.alert('Error al cargar', error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handlePress = async (id_pedido) => {
    try {
      await AsyncStorage.setItem("id_pedido", id_pedido.toString());
      navigation.navigate('DetalleOrden');
    } catch (error) {
      Alert.alert('Error:', error.message);
    }
  };

  useEffect(() => {
    handleTabClick('Preparandose');
  }, []);

  const renderItem = ({ item }) => (
    <CardOrder
      orderNumber={item.id_pedido}
      orderDate={item.fecha_pedido}
      onPress={() => handlePress(item.id_pedido)}
    />
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Pedidos</Text>
      <View style={styles.tabContainer}>
        <TouchableOpacity
          style={[styles.tab, selectedTab === 'Preparandose' && styles.activeTab]}
          onPress={() => handleTabClick('Preparandose')}
          disabled={isLoading}
        >
          <Text style={[styles.tabText, selectedTab === 'Preparandose' && styles.activeTabText]}>Preparandose</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, selectedTab === 'Enviando' && styles.activeTab]}
          onPress={() => handleTabClick('Enviando')}
          disabled={isLoading}
        >
          <Text style={[styles.tabText, selectedTab === 'Enviando' && styles.activeTabText]}>Enviando</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, selectedTab === 'Finalizado' && styles.activeTab]}
          onPress={() => handleTabClick('Finalizado')}
          disabled={isLoading}
        >
          <Text style={[styles.tabText, selectedTab === 'Finalizado' && styles.activeTabText]}>Finalizados</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        data={orders}
        renderItem={renderItem}
        keyExtractor={item => item.id_pedido.toString()}
        contentContainerStyle={styles.listContainer}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    marginTop: 30
  },
  tabContainer: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  tab: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#e0e0e0',
    marginHorizontal: 5,
  },
  activeTab: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  tabText: {
    color: '#000',
    fontWeight: 'bold',
  },
  activeTabText: {
    color: '#000',
  },
  listContainer: {
    paddingBottom: 100,
  },
});

export default PedidosScreen;
