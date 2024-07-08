import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, Alert } from 'react-native';
import CardOrder from '../components/cardOrder';
import { estados } from '../controller/publica/estadoPedidos';

const PedidosScreen = () => {
  const [selectedTab, setSelectedTab] = useState('Preparándose');
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetchOrders(selectedTab);
  }, [selectedTab]);

  const fetchOrders = async (estado) => {
    const fetchedOrders = await estados(estado);
    setOrders(fetchedOrders);
  };

  const renderItem = ({ item }) => (
    <CardOrder
      orderNumber={item.id_pedido}
      orderDate={item.fecha_pedido}
      onPress={() => alert('Detalles del pedido')}
    />
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Pedidos</Text>
      <View style={styles.tabContainer}>
        <TouchableOpacity
          style={[styles.tab, selectedTab === 'Preparándose' && styles.activeTab]}
          onPress={() => setSelectedTab('Preparándose')}
        >
          <Text style={[styles.tabText, selectedTab === 'Preparándose' && styles.activeTabText]}>Preparándose</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, selectedTab === 'Enviando' && styles.activeTab]}
          onPress={() => setSelectedTab('Enviando')}
        >
          <Text style={[styles.tabText, selectedTab === 'Enviando' && styles.activeTabText]}>Enviando</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, selectedTab === 'Finalizados' && styles.activeTab]}
          onPress={() => setSelectedTab('Finalizados')}
        >
          <Text style={[styles.tabText, selectedTab === 'Finalizados' && styles.activeTabText]}>Finalizados</Text>
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
